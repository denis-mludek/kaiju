import expect from 'expect'
import Observable from '../src/observable/create'
import { Message } from '../src/main'
import Store from '../src/store'


describe('Store', () => {

  it('can be created and updated', () => {

    const increaseBy = Message('increaseBy')

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


  it('can be modified by subscribing to an observable', () => {

    const increaseBy = Message('increaseBy')
    const observableNum = Observable()(30)

    const initState = { num: 10 }
    const store = Store(initState, (on, msg) => {
      on(observableNum, (state, by) => ({ num: state.num + by }))

      // Alternatively, we can listen to a Message and create an observable out of it
      on(msg.listen(increaseBy).map(x => x * 2), (state, by) => ({ num: state.num + by }))
    })

    // Observables fire synchronously
    expect(store.state()).toEqual({ num: 40 })

    observableNum(5)
    expect(store.state()).toEqual({ num: 45 })
    observableNum(5)
    expect(store.state()).toEqual({ num: 50 })

    store.send(increaseBy(5))
    expect(store.state()).toEqual({ num: 60 })
    store.send(increaseBy(5))
    expect(store.state()).toEqual({ num: 70 })

    store.destroy()

    observableNum(1000)
    store.send(increaseBy(1000))
    expect(store.state()).toEqual({ num: 70 })
  })


  it('supports messages sent from within message handlers', () => {

    const increaseBy = Message('increaseBy')
    const pleaseIncreaseBy = Message('pleaseIncreaseBy')
    const pleaseIncreaseBy2 = Message('pleaseIncreaseBy2')
    const pleaseIncreaseByObservable = Observable().named('pleaseIncreaseBy')

    const initState = { num: 10 }
    const store = Store(initState, (on, msg) => {
      on(pleaseIncreaseBy, (state, by) => store.send(increaseBy(by)))
      on(pleaseIncreaseBy2, (state, by) => msg.send(increaseBy(by)))
      on(pleaseIncreaseByObservable, (state, by) => store.send(increaseBy(by)))
      on(increaseBy, (state, by) => ({ num: state.num + by }))
    })

    store.send(pleaseIncreaseBy(5))
    expect(store.state()).toEqual({ num: 15 })

    pleaseIncreaseByObservable(5)
    expect(store.state()).toEqual({ num: 20 })

    store.send(pleaseIncreaseBy2(5))
    expect(store.state()).toEqual({ num: 25 })
  })


  it('can abort message infinite loops and notify us about it', () => {

    const ping = Message('ping')
    const pong = Message('pong')

    const store = Store({}, on => {
      on(ping, state => store.send(pong()))
      on(pong, state => store.send(ping()))
    })

    expect(() => store.send(ping())).toThrow()
  })


})
