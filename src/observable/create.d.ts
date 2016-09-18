

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

export interface ObservableObject {
  <T>(activate: (add: (t: T) => void) => () => void): Observable<T>
}

declare const create: ObservableObject

/**
 * Creates a new observable.
 *
 * The fist argument function is called every time the observable goes
 * from inactive (no subscribers) to active (the first subscriber just registered)
 *
 * This function must return a function that will be called when the last subscriber unregisters itself from the observable.
 * Use this as an opportunity to clean up the observable.
 */
export default create
