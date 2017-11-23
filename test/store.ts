import * as expect from 'expect'
import { Message, Observable, Store } from '..'


describe('Store', () => {

  it('can be created and updated', () => {

    const increaseBy = Message<number>('increaseBy')

    const initState = { num: 10 }
    const store = Store(initState, ({ on, state }) => {
      on(increaseBy, by => ({ num: state().num + by }))
    })

    expect(store.state()).toEqual({ num: 10 })

    store.send(increaseBy(5))
    expect(store.state()).toEqual({ num: 15 })
    store.send(increaseBy(5))
    expect(store.state()).toEqual({ num: 20 })

    store.destroy()

    store.send(increaseBy(1000))
    expect(store.state()).toEqual({ num: 20 })
  })


  it('can be modified by subscribing to an observable', done => {

    const increaseBy = Message<number>('increaseBy')
    const observableNum = Observable<number>()(30)

    const initState = { num: 10 }
    const store = Store(initState, ({ on, msg, state }) => {
      on(observableNum, by => ({ num: state().num + by }))

      on(observableNum.map(x => x * 2), by => ({ num: state().num + by }))

      on(increaseBy, by => ({ num: state().num + by }))

      // Alternatively, we can listen to a Message to create an observable out of it
      on(msg.listen(increaseBy).delay(20).map(x => x * 2), by => ({ num: state().num + by }))

      on(msg.listen(increaseBy), by => ({ num: state().num + by }))
    })

    // Observables fire synchronously
    expect(store.state()).toEqual({ num: 100 }) // 10+30 + 30*2

    observableNum(5)
    expect(store.state()).toEqual({ num: 115 })
    observableNum(5)
    expect(store.state()).toEqual({ num: 130 })

    store.send(increaseBy(5))
    expect(store.state()).toEqual({ num: 140 })
    store.send(increaseBy(5))
    expect(store.state()).toEqual({ num: 150 })

    setTimeout(() => {
      // Two delayed 'increaseBy' messages should have been received by now
      expect(store.state()).toEqual({ num: 170 })

      store.destroy()

      observableNum(1000)
      store.send(increaseBy(1000))
      expect(store.state()).toEqual({ num: 170 })

      done()
    }, 35)
  })


  it('supports messages sent from within message handlers', () => {

    const increaseBy = Message<number>('increaseBy')
    const pleaseIncreaseBy = Message<number>('pleaseIncreaseBy')
    const pleaseIncreaseByObservable = Observable<number>().named('pleaseIncreaseBy')

    const initState = { num: 10 }
    const store = Store(initState, ({on, msg, state}) => {
      on(pleaseIncreaseBy, by => store.send(increaseBy(by)))
      on(pleaseIncreaseByObservable, by => store.send(increaseBy(by)))
      on(increaseBy, by => ({ num: state().num + by }))
    })

    store.send(pleaseIncreaseBy(5))
    expect(store.state()).toEqual({ num: 15 })

    pleaseIncreaseByObservable(5)
    expect(store.state()).toEqual({ num: 20 })
  })


  it('can abort message infinite loops and notify us about it', () => {

    let pingCount = 0

    const ping = Message('ping')
    const pong = Message('pong')

    const store = Store({}, ({on, state}) => {
      on(ping, () => {
        pingCount++
        store.send(pong())
      })
      on(pong, () => store.send(ping()))
    })

    function sendPing() {
      store.send(ping())
    }

    expect(sendPing).toThrow()

    // Some cycles are allowed
    expect(pingCount).toBe(5)
  })


  it('can derive a state piece from another', () => {

    const setList = Message<number[]>('setList')

    const initState: { list: number[], filteredList: number[] } = { list: [], filteredList: [] }

    const store = Store(initState, ({on, state}) => {

      on(setList, newList => {
        return Object.assign({}, state(), { list: newList })
      })

      on(state.map(s => s.list).distinct(), newList => {
        return Object.assign({}, state(), { filteredList: newList.filter(n => n > 100) })
      })

    }, { name: 'number' })

    expect(store.state()).toEqual({ list: [], filteredList: [] })

    store.send(setList([1, 10, 100, 1000, 10000]))

    expect(store.state()).toEqual({
      list: [1, 10, 100, 1000, 10000],
      filteredList: [1000, 10000]
    })
  })


  it('can work with multiple msg.listen for the same Message', () => {

    const click = Message('click')

    const toggleObs = Observable()(true)

    let clicks = 0

    const store = Store({}, ({ on, msg }) => {

      on(msg.listen(click), () => {
        clicks++
      })

      on(msg.listen(click), () => {
        clicks++
      })

      on(toggleObs.flatMapLatest(t => t ? msg.listen(click) : Observable()), () => {
        clicks++
      })

    })

    expect(clicks).toBe(0)

    store.send(click())

    expect(clicks).toBe(3)

    toggleObs(false)

    expect(clicks).toBe(3)

    store.send(click())

    expect(clicks).toBe(5)

    toggleObs(true)

    store.send(click())

    expect(clicks).toBe(8)
  })


  it('can send partially applied messages', () => {

    const message = Message<string, number>('message')

    let received: [string, number] | undefined

    const store = Store({}, ({ on, msg }) => {
      on(message, (str, num) => {
        received = [str, num]
      })
    })

    store.send(message.with('hey')(10))

    expect(received).toEqual(['hey', 10])

    store.send(message.with('oh').with(20)())

    expect(received).toEqual(['oh', 20])
  })


})
