import expect from 'expect'
import Observable from '../src/observable/create'
import delay from '../src/observable/delay'
import flatMapLatest from '../src/observable/flatMapLatest'
import pure from '../src/observable/pure'
import { Observable as FullObservable } from '../src/observable'


describe('Observable', () => {

  it('can be created', () => {

    const emptyObs = Observable(add => {})

    expect(emptyObs()).toBe(undefined)

    const obs = Observable(add => {
      add(10)
    })

    // Nobody activated the observable yet
    expect(obs()).toBe(undefined)
  })


  it('can be subscribed to', () => {

    let pushToObservable
    const obs = Observable(add => {
      pushToObservable = add
    })

    // The observable body is executed only when the first subscription is created
    expect(pushToObservable).toBe(undefined)

    let subscribedValue = null
    const unsub = obs.subscribe(val => subscribedValue = val)
    expect(subscribedValue).toBe(null)

    pushToObservable(10)
    expect(subscribedValue).toBe(10)

    obs(20)
    expect(subscribedValue).toBe(20)

    unsub()

    obs(30)
    expect(subscribedValue).toBe(20)
    expect(obs()).toBe(30)

    // Observable that already hold a value immediately calls its subscriber's callbacks
    obs.subscribe(val => subscribedValue = val)
    expect(subscribedValue).toBe(30)
  })


  it('can have multiple subscribers', () => {

    let pushToObservable
    let activations = 0
    let deactivationFunction = expect.createSpy()
    const obs = Observable(add => {
      pushToObservable = add
      activations++
      return deactivationFunction
    })

    const subValues = []
    const unsub1 = obs.subscribe(x => subValues.push({ 1: x }))
    const unsub2 = obs.subscribe(x => subValues.push({ 2: x }))

    expect(activations).toBe(1)
    expect(deactivationFunction.calls.length).toBe(0)
    expect(subValues).toEqual([])

    pushToObservable(10)
    expect(subValues).toEqual([{ 1: 10 }, { 2: 10 }])
    pushToObservable(20)
    expect(subValues).toEqual([{ 1: 10 }, { 2: 10 }, { 1: 20 }, { 2: 20 }])

    unsub1()
    expect(deactivationFunction.calls.length).toBe(0)
    unsub2()
    expect(deactivationFunction.calls.length).toBe(1)
    expect(activations).toBe(1)

    obs.subscribe(x => x)
    obs.subscribe(x => x)
    expect(activations).toBe(2)
  })


  it('can be named', () => {

    const obs = Observable(add => {
      add(10)
    }).named('YEAH')

    obs.subscribe((value, name) => expect(name).toBe('YEAH'))
  })


  it('can be created with a constant value', () => {

    const obs = FullObservable.pure(100)
    obs.subscribe(x => x)
    expect(obs()).toBe(100)
  })


  it('can be delayed', done => {

    const obs = delay(20, Observable(add => {
      add(10)
    }))

    let observedValue
    obs.subscribe(value => observedValue = value)

    function valueIs(value) {
      expect(observedValue).toBe(value)
      expect(obs()).toBe(value)
    }

    valueIs(undefined)

    setTimeout(() => valueIs(undefined), 10)
    setTimeout(() => {
      valueIs(10)
      done()
    }, 30)
  })


  it("can be flatMapLatest'ed", () => {

    let pushToObservable
    const obs = flatMapLatest(x => pure(x * 2), Observable(add => {
      pushToObservable = add
      add(10)
    }))

    let observedValue
    obs.subscribe(value => observedValue = value)

    function valueIs(value) {
      expect(observedValue).toBe(value)
      expect(obs()).toBe(value)
    }

    valueIs(20)
    pushToObservable(15)
    valueIs(30)
  })


  it("can be flatMapLatest'ed, using OO style", () => {

    let pushToObservable
    const obs = FullObservable(add => {
      pushToObservable = add
      add(10)
    })
    .flatMapLatest(x => pure(x * 2))

    let observedValue
    obs.subscribe(value => observedValue = value)

    function valueIs(value) {
      expect(observedValue).toBe(value)
      expect(obs()).toBe(value)
    }

    valueIs(20)
    pushToObservable(15)
    valueIs(30)
  })


})
