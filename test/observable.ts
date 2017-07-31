import * as expect from 'expect'
import { Observable } from '..'


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

    let pushToObservable: Function | undefined
    const obs = Observable<number>(add => {
      pushToObservable = add
    })

    // The observable body is executed only when the first subscription is created
    expect(pushToObservable).toBe(undefined)

    let subscribedValue = undefined as number | undefined
    const unsub = obs.subscribe(val => subscribedValue = val)
    expect(subscribedValue).toBe(undefined)

    pushToObservable!(10)
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

    let pushToObservable: Function = () => {}
    let activations = 0
    let deactivationFunction = expect.createSpy<Function0<void>>()
    const obs = Observable<number>(add => {
      pushToObservable = add
      activations++
      return deactivationFunction
    })

    const subValues: {}[] = []
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

    const obs = Observable<number>(add => {
      add(10)
    }).named('YEAH')

    obs.subscribe(function(value) { expect(arguments[1]).toBe('YEAH') })
  })


  it('can be created with a constant value', () => {

    const obs = Observable.pure(100)
    obs.subscribe(x => x)
    expect(obs()).toBe(100)
  })


  it('can be delayed', done => {

    const obs = Observable<number>(add => {
      add(10)
    })
    .delay(20)

    let observedValue: number | undefined
    obs.subscribe(value => observedValue = value)

    function valueIs(value: typeof observedValue) {
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

    let pushToObservable: Function = () => {}
    const obs = Observable<number>(add => {
      pushToObservable = add
      add(10)
    })
    .flatMapLatest(x => Observable.pure(x * 2))

    let observedValue: number | undefined
    obs.subscribe(value => observedValue = value)

    function valueIs(value: typeof observedValue) {
      expect(observedValue).toBe(value)
      expect(obs()).toBe(value)
    }

    valueIs(20)
    pushToObservable(15)
    valueIs(30)
  })


  it('can drop some of its values', () => {

    const sourceValues: number[] = []
    const drop1Values: number[] = []
    const drop2Values: number[] = []
    const drop3Values: number[] = []
    const drop1AfterTheFactValues: number[] = []

    let addToSource: (value: number) => void = undefined!
    const source = Observable<number>(add => {
      addToSource = add
    })

    const drop1 = source.drop(1)
    const drop2 = source.drop(2)
    const drop3 = source.drop(3)

    source.subscribe(val => sourceValues.push(val))
    drop1.subscribe(val => drop1Values.push(val))
    drop2.subscribe(val => drop2Values.push(val))
    drop3.subscribe(val => drop3Values.push(val))

    addToSource(1)
    addToSource(2)
    addToSource(3)
    addToSource(4)
    addToSource(5)

    expect(sourceValues).toEqual([1, 2, 3, 4, 5])
    expect(drop1Values).toEqual([2, 3, 4, 5])
    expect(drop2Values).toEqual([3, 4, 5])
    expect(drop3Values).toEqual([4, 5])

    const drop1AfterTheFact = source.drop(1)

    drop1AfterTheFact.subscribe(val => drop1AfterTheFactValues.push(val))

    addToSource(6)
    addToSource(7)

    // Should drop only the value received at subscription time
    expect(drop1AfterTheFactValues).toEqual([6, 7])
  })

})
