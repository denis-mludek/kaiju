/**
 * Either a Promise value or an Error thrown by the promise.
 */
export type PromiseResult<T> =
  { type: 'success', value: T } |
  { type: 'failure', error: {} }


export interface Observable<T> {
  /**
   * Subscribes to this observable values and returns a function that may be used to unsubscribe.
   */
  subscribe: (onValue: (val: T) => void) => () => void | void
  /**
   * Gives a debug name to the observable.
   * names are inherited by observable transforms unless a new name is defined downstream.
   */
  named: (name: string) => this

  /**
   * Reads the current value of the observable or returns undefined if no value was ever pushed in the observable.
   */
  (): T | void

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

interface SourceObservable<T> extends Observable<T> {
  /**
   * Sets the value of this observable.
   * The observable is returned for convenient construction with an initial value.
   */
  (value: T): SourceObservable<T>
}

/**
 * A special observable that is garanteed to have an initial value.
 */
export interface ObservableWithInitialValue<T> extends Observable<T> {
  /**
   * Reads the current value of the observable.
   */
  (): T
}

type UnsubFunction = void | (() => void)

export interface ObservableObject {
  /** Creates a new Observable */
  <T>(activate?: (add: (t: T) => void) => UnsubFunction): SourceObservable<T>

  /**
   * Listens for DOM events at the specified parent element.
   * a childSelector can optionally be passed to listen to delegated events instead of direct events.
   */
  fromEvent(name: 'blur', el: Element | EventTarget, childSelector?: string): Observable<FocusEvent>
  fromEvent(name: 'click', el: Element | EventTarget, childSelector?: string): Observable<MouseEvent>
  fromEvent(name: 'dblclick', el: Element | EventTarget, childSelector?: string): Observable<MouseEvent>
  fromEvent(name: 'drag', el: Element | EventTarget, childSelector?: string): Observable<DragEvent>
  fromEvent(name: 'dragend', el: Element | EventTarget, childSelector?: string): Observable<DragEvent>
  fromEvent(name: 'dragenter', el: Element | EventTarget, childSelector?: string): Observable<DragEvent>
  fromEvent(name: 'dragexit', el: Element | EventTarget, childSelector?: string): Observable<DragEvent>
  fromEvent(name: 'dragleave', el: Element | EventTarget, childSelector?: string): Observable<DragEvent>
  fromEvent(name: 'dragover', el: Element | EventTarget, childSelector?: string): Observable<DragEvent>
  fromEvent(name: 'dragstart', el: Element | EventTarget, childSelector?: string): Observable<DragEvent>
  fromEvent(name: 'drop', el: Element | EventTarget, childSelector?: string): Observable<DragEvent>
  fromEvent(name: 'focus', el: Element | EventTarget, childSelector?: string): Observable<FocusEvent>
  fromEvent(name: 'keydown', el: Element | EventTarget, childSelector?: string): Observable<KeyboardEvent>
  fromEvent(name: 'keyup', el: Element | EventTarget, childSelector?: string): Observable<KeyboardEvent>
  fromEvent(name: 'mousedown', el: Element | EventTarget, childSelector?: string): Observable<MouseEvent>
  fromEvent(name: 'mouseenter', el: Element | EventTarget, childSelector?: string): Observable<MouseEvent>
  fromEvent(name: 'mouseleave', el: Element | EventTarget, childSelector?: string): Observable<MouseEvent>
  fromEvent(name: 'mousemove', el: Element | EventTarget, childSelector?: string): Observable<MouseEvent>
  fromEvent(name: 'mouseout', el: Element | EventTarget, childSelector?: string): Observable<MouseEvent>
  fromEvent(name: 'mouseup', el: Element | EventTarget, childSelector?: string): Observable<MouseEvent>
  fromEvent(name: 'mousewheel', el: Element | EventTarget, childSelector?: string): Observable<MouseWheelEvent>
  fromEvent(name: 'scroll', el: Element | EventTarget, childSelector?: string): Observable<UIEvent>
  fromEvent(name: 'touchcancel', el: Element | EventTarget, childSelector?: string): Observable<TouchEvent>
  fromEvent(name: 'touchend', el: Element | EventTarget, childSelector?: string): Observable<TouchEvent>
  fromEvent(name: 'touchmove', el: Element | EventTarget, childSelector?: string): Observable<TouchEvent>
  fromEvent(name: 'touchstart', el: Element | EventTarget, childSelector?: string): Observable<TouchEvent>
  fromEvent(name: string, el: Element | EventTarget, childSelector?: string): Observable<Event>

  /**
   * Creates a new Observable from a Promise. The observable will produce only one value:
   * Either a { value: T } or an { error: any } object based on the result of the Promise.
   */
  fromPromise<T>(promise: Promise<T>): Observable<PromiseResult<T>>

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
