
import { Message, NoArgMessage, MessagePayload } from '../main'
import { ObservableWithInitialValue, Observable } from '../observable'


interface RegisterMessages<S> {
  /**
   * Registers an Observable and call the handler function every time the observable has a new value.
   * The handler is called with the current state and the new value of the observable.
   * Returning undefined or the current state in the handler is a no-op.
   */
  <T>(observable: Observable<T>, handler: (state: S, value: T) => S|void): void

  /**
   * Registers a Message and call the handler function every time the message is sent.
   * The handler is called with the current state and the original message (ready to be forwarded, etc)
   * Returning undefined or the current state in the handler is a no-op.
   */
  (message: NoArgMessage, handler: (state: S, message: MessagePayload<undefined>) => S|void): void

  /**
   * Registers a Message and call the handler function every time the message is sent.
   * The handler is called with the current state, the payload of the message and the original message (ready to be forwarded, etc)
   * Returning undefined or the current state in the handler is a no-op.
   */
  <P>(message: Message<P>, handler: (state: S, payload: P, message: MessagePayload<P>) => S|void): void
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
  registerHandlers: (on: RegisterMessages<S>) => void,
  options?: StoreOptions
): Store<S>
