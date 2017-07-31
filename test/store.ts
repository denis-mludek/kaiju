import * as expect from 'expect'
import { Message, Observable, Store } from '..'


describe('Store', () => {

  it('can be created and updated', () => {

    const increaseBy = Message<number>('increaseBy')

    const initState = { num: 10 }
    const store = Store(initState, on => {
      on(increaseBy, (state, by) => ({ num: state.num + by }))
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
    const store = Store(initState, (on, msg) => {
      on(observableNum, (state, by) => ({ num: state.num + by }))

      on(observableNum.map(x => x * 2), (state, by) => ({ num: state.num + by }))

      on(increaseBy, (state, by) => ({ num: state.num + by }))

      // Alternatively, we can listen to a Message to create an observable out of it
      on(msg.listen(increaseBy).delay(20).map(x => x * 2), (state, by) => ({ num: state.num + by }))

      on(msg.listen(increaseBy), (state, by) => ({ num: state.num + by }))
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
    const store = Store(initState, (on, msg) => {
      on(pleaseIncreaseBy, (state, by) => store.send(increaseBy(by)))
      on(pleaseIncreaseByObservable, (state, by) => store.send(increaseBy(by)))
      on(increaseBy, (state, by) => ({ num: state.num + by }))
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

    const store = Store({}, on => {
      on(ping, state => {
        pingCount++
        store.send(pong())
      })
      on(pong, state => store.send(ping()))
    })

    function sendPing() {
      store.send(ping())
    }

    expect(sendPing).toThrow()

    // Some cycles are allowed
    expect(pingCount).toBe(5)
  })


})
