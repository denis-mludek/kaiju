
import { DefaultMessage, DefaultNoArgMessage, MessagePayload } from '../main'
import { ObservableWithInitialValue, Observable } from '../observable'


export interface RegisterMessages<S> {
  /**
   * Registers an Observable and call the handler function every time the observable has a new value.
   * The handler is called with the current state and the new value of the observable.
   * Returning undefined or the current state in the handler is a no-op.
   */
  <T>(observable: Observable<T>, handler: (state: S, value: T) => S|void): void

  /**
   * Registers a Message and call the handler function every time the message is sent.
   * The handler is called with the current state.
   * Returning undefined or the current state in the handler is a no-op.
   */
  (message: DefaultNoArgMessage, handler: (state: S) => S|void): void

  /**
   * Registers a Message and call the handler function every time the message is sent.
   * The handler is called with the current state and the payload of the message.
   * Returning undefined or the current state in the handler is a no-op.
   */
  <P>(message: DefaultMessage<P>, handler: (state: S, payload: P) => S|void): void
}

export interface Messages {
  /**
   * Listens for a particular message. This is used to create a new Observable.
   */
  listen<P>(message: DefaultMessage<P>): Observable<P>

  /**
   * Listens for a particular message. This is used to create a new Observable.
   */
  listen(message: DefaultNoArgMessage): Observable<undefined>

  /**
   * Sends a message to self.
   *
   * Example:
   * msg.send(AjaxSuccess([1, 2]))
   */
  send<P>(payload: MessagePayload<P>): void
}

export interface Store<S> {
  /**
   * The observable of this store's state.
   * This observable always have a value.
   */
  state: ObservableWithInitialValue<S>

  /**
   * Sends a message to this store.
   */
  send: <P>(payload: MessagePayload<P>) => void

  /**
   * Destroys this transient store
   */
  destroy(): void
}

interface StoreOptions {
  name?: string
  log?: boolean
}

/**
 * Creates a new store.
 */
export default function Store<S>(
  initialState: S,
  registerHandlers: (on: RegisterMessages<S>, msg: Messages) => void,
  options?: StoreOptions
): Store<S>
