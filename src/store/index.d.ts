
import { Message, NoArgMessage, MessagePayload } from '../dompteuse'
import { ObservableWithInitialValue, Observable } from '../observable'


interface OnGlobalMessage<S> {
  <T>(observable: Observable<T>, handler: (state: S, value: T) => S|void): void
  (message: NoArgMessage, handler: (state: S) => S): void
  <P>(message: Message<P>, handler: (state: S, payload: P) => S): void
}

interface GlobalStore<S> {
  state: ObservableWithInitialValue<S>
  send: <P>(payload: MessagePayload<P>) => void
}

export default function GlobalStore<S>(
  initialState: S,
  registerHandlers: (on: OnGlobalMessage<S>) => void
): GlobalStore<S>
