
import debounce from './debounce'
import delay from './delay'
import filter from './filter'
import flatMapLatest from './flatMapLatest'
import fromEvent from './fromEvent'
import fromPromise, { Result } from './fromPromise'
import interval from './interval'
import map from './map'
import merge from './merge'
import partition from './partition'
import pure from './pure'
import sliding from './sliding'
import throttle from './throttle'


// Re-open the module and add new definitions
declare module './create' {

  interface Observable<T> {

    /**
     * Delays values until a certain amount of silence has passed.
     * Values in between silence periods are discarded.
     */
    debounce(wait: number): Observable<T>

    /**
     * Delays all values by a fixed time offset
     */
    delay(delay: number): Observable<T>

    /**
     * Filters the values of this observable.
     */
    filter<T>(predicate: (t: T) => boolean): Observable<T>

    /*
     * Maps and flattens this observable then only publish values from the observable mapped last.
     */
    flatMapLatest<B>(mapFn: (t: T) => Observable<B>): Observable<B>

    /**
     * Maps the values of this observable.
     */
    map<B>(mapFn: (t: T) => B): Observable<B>

    /**
     * Partitions this observable into two observables based on a predicate
     */
    partition<T>(predicate: (value: T) => boolean): [Observable<T>, Observable<T>]

    /**
     * Groups values in fixed size blocks (of size 2) by passing a "sliding window" over them.
     * An array becomes the value of the new observable. It will have a size of 1 the first time a value is produced,
     * then a size of 2 for subsequent values.
     * The newest value is always found at the index 0 of the Array for convenience and type safety.
     */
    sliding2(): Observable<[T, T | void]>

    /**
     * Groups values in fixed size blocks by passing a "sliding window" over them.
     * An array becomes the value of the new observable. It will have a size of 1 the first time a value is produced,
     * then an increasing size of max (maxWindowSize parameter) for subsequent values.
     * The newest value is always found at the index 0 of the Array for convenience (...rest parameters).
     */
    sliding(maxWindowSize: number): Observable<Array<T>>

    /**
     * Delays values so that values are produced at most once per every 'time' milliseconds
     */
    throttle(time: number): Observable<T>
  }

  interface ObservableObject {

    /*
     * Listens for DOM events at the specified element.
     */
    fromEvent(name: string, el: Element): Observable<Event>

    /*
     * Listens for delegated DOM events at the specified parent element
     * and for child targets matching the passed CSS selector.
     */
    fromEvent(name: string, el: Element, childSelector: string): Observable<Event>

    /**
     * Creates a new Observable from a Promise. The observable will produce only one value:
     * Either a { value: T } or an { error: any } object based on the result of the Promise.
     */
    fromPromise<T>(promise: Promise<T>): Observable<Result<T>>

    /**
     * Creates a new observable that produces undefined values at the provided interval in milliseconds.
     */
     interval(time: number): Observable<void>

     /**
      * Merges all the observables into one
      */
     merge<T>(...obss: Array<Observable<T>>): Observable<T>

     /**
      * Creates a new observable that produces one value immediately.
      */
     pure<A>(value: A): Observable<A>
  }
}

import { Observable as ObservableInterface, ObservableObject } from './create'

export type Observable<T> = ObservableInterface<T>
export { ObservableWithInitialValue } from './create'


/**
 * Creates a new observable.
 *
 * The fist argument function is called every time the observable goes
 * from inactive (no subscribers) to active (the first subscriber just registered)
 *
 * This function can optionally return a function that will be called when the last subscriber unregisters itself from the observable.
 * Use this as an opportunity to clean up the observable.
 */
export const Observable: ObservableObject
