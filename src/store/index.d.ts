
import { Message, NoArgMessage, MessagePayload } from '../dompteuse'
import { ObservableWithInitialValue, Observable } from '../observable'


interface OnGlobalMessage<S> {
  /**
   * Registers an Observable<Value> and call the handler function every time the observable has a new value.
   * The handler is called with the current store state and the new value of the observable.
   * Returning the current state in the handler is a no-op.
   */
  <T>(observable: Observable<T>, handler: (state: S, value: T) => S): void

  /**
   * Registers a Message and call the handler function every time the message is sent.
   * The handler is called with the current store state.
   * Returning the current state in the handler is a no-op.
   */
  (message: NoArgMessage, handler: (state: S) => S): void

  /**
   * Registers a Message and call the handler function every time the message is sent.
   * The handler is called with the current store state and the payload of the message.
   * Returning the current state in the handler is a no-op.
   */
  <P>(message: Message<P>, handler: (state: S, payload: P) => S): void
}

interface GlobalStore<S> {
  /**
   * The observable of this global store's state.
   * This observable always have a value.
   */
  state: ObservableWithInitialValue<S>

  /**
   * Sends a message to this global store.
   */
  send: <P>(payload: MessagePayload<P>) => void
}

/**
 * Creates a new global store.
 */
export default function GlobalStore<S>(
  initialState: S,
  registerHandlers: (on: OnGlobalMessage<S>) => void
): GlobalStore<S>
