
// startApp

/**
 * Starts the app with a synchronous first rendering.
 *
 * Example:
 *   const app = h('div', 'hello')
 *
 *   const snabbdomModules = [
 *     require('snabbdom/modules/class'),
 *     require('snabbdom/modules/props'),
 *     require('snabbdom/modules/attributes'),
 *     require('snabbdom/modules/style')
 *   ]
 *
 *  startApp({ app, snabbdomModules, elm: document.body })
 */
export function startApp(options: {
  app: VNode
  snabbdomModules: Array<{}>
  elm: Element
  replaceElm?: boolean
}): void


// Observables

import { Observable, ObservableWithInitialValue } from './observable'


// Components

import { RegisterMessages } from './store'

export interface ConnectParams<P, S> {
  on: RegisterMessages<S>
  props: ObservableWithInitialValue<P>
  state: ObservableWithInitialValue<S>
  msg: Messages
  context: {}
}

export interface RenderParams<P, S> {
  props: P
  state: S
  msg: Messages
  context: {}
}

interface Props {
  key?: string | number
  [key: string]: any
}

interface ComponentOptions<P extends Props, S extends {}> {
  name: string
  sel?: string
  props?: P
  initState: (initProps: P) => S
  connect: (params: ConnectParams<P, S>) => void
  render: (params: RenderParams<P, S>) => Node | Node[]
}

/**
 * Creates a VNode that has a Component lifecycle.
 */
export function Component<P extends Props, S extends {}>(options: ComponentOptions<P, S>): VNode

// Internals

export var log: {

  /**
   * If true, logs all component render timings and props/state at render time.
   * If a string, logs only the render timings of the components with a matching name.
   */
  render: boolean | string

  /**
   * If true, logs all component connect() Message/Observable changes.
   * If a string, logs only the changes of the components with a matching name.
   */
  message: boolean | string
}

// Messages

export namespace Message {

  /**
   * A Message taking no payload
   */
  export type NoPayload = {
    /**
     * Creates a new (empty) message payload, ready to be sent.
     */
    (): MessagePayload<never>
  }

  /**
   * A Message taking one payload
   */
  export type OnePayload<P> = {
    /**
     * Creates a new message payload, ready to be sent.
     */
    (p: P): MessagePayload<[P]>

    /**
     * Creates a new Message that aleady has its payload set.
     * The created Message can not be used with on().
     */
    with(p: P): Message.NoPayload
  }

  /**
   * A Message taking two payloads
   */
  export type TwoPayloads<P1, P2> = {

    /**
     * Creates a new message payload, ready to be sent.
     */
    (p1: P1, p2: P2): MessagePayload<[P1, P2]>

    /**
     * Creates a new Message that has part of its payload set.
     * The created Message can not be used with on().
     * Note: A partially applied message originally taking a scalar payload cannot be used as a DOM handler as an Event is always passed.
     */
    with(p1: P1): Message.OnePayload<P2>
  }
}

interface MessageFactory {
  /**
   * Creates a new Message type with a debug name. The message carries no payload.
   */
  (name: string): Message.NoPayload

  /**
   * Creates a new Message type with a debug name. The message carries one payload.
   */
  <P>(name: string): Message.OnePayload<P>

  /**
   * Creates a new Message type with a debug name. The message carries two payloads.
   */
  <P1, P2>(name: string): Message.TwoPayloads<P1, P2>

  /**
   * A special message sent when another message was not handled
   */
  unhandled: Message.OnePayload<MessagePayload<{}>>
}

export var Message: MessageFactory


/**
 * The payload of a Message.
 */
export interface MessagePayload<P> {
  _id: number
  _name: string
  payload: P

  /**
   * Returns whether this payload was created using the given message
   */
  is<T>(message: Message.NoPayload): this is MessagePayload<never>

  /**
   * Returns whether this payload was created using the given message
   */
  is<T>(message: Message.OnePayload<T>): this is MessagePayload<[T]>

  /**
   * Returns whether this payload was created using the given message
   */
  is<T1, T2>(message: Message.TwoPayloads<T1, T2>): this is MessagePayload<[T1, T2]>
}

export interface Messages {
  /**
   * Listens to a message sent from immediate VNodes or component children
   */
  listen<P1, P2>(message: Message.TwoPayloads<P1, P2>): Observable<[P1, P2]>

  /**
   * Listens to a message sent from immediate VNodes or component children
   */
  listen<P>(message: Message.OnePayload<P>): Observable<P>

  /**
   * Listens to a message sent from immediate VNodes or component children
   */
  listen(message: Message.NoPayload): Observable<undefined>

  /**
   * Listens to all messages bubbling up to a particular DOM node
   *
   * Example:
   * const clicks = msg.listenAt('#page .button')
   * 
   * Note: The DOM Element must be available at the time the function is called.
   */
  listenAt(target: string | Element): Observable<MessagePayload<{}>>

  /**
   * Sends a message to self.
   *
   * Example:
   * msg.send(AjaxSuccess([1, 2]))
   */
  send<P>(payload: MessagePayload<P>): void

  /**
   * Sends a message to this component's nearest parent.
   *
   * Example:
   * msg.sendToParent(ItemSelected(item))
   */
  sendToParent<P>(payload: MessagePayload<P>): void
}

// snabbdom

type EventHandler<E> =
  Message.NoPayload |
  Message.OnePayload<E>

interface VNodeData {
  /* Work around structural typing */
  reduceRight?: 'VNodeData should not be an Array'

  key?: string | number
  hook?: Hook
  class?: { [index: string]: boolean }
  style?: { [index: string]: string }
  props?: {
    name?: string
    value?: string
    [index: string]: any
  }
  attrs?: {
    id?: string
    href?: string
    placeholder?: string
    type?: string
    disabled?: boolean
    checked?: boolean
    autofocus?: boolean
    readonly?: boolean
    src?: string
    srcset?: string
    tabindex?: number
    spellcheck?: boolean
    [index: string]: any
  }
  events?: { [K in keyof HTMLElementEventMap]?: EventHandler<HTMLElementEventMap[K]> }
  [s: string]: any
}

/** The VNode interface, as constructed by h() */
export interface VNode {
  sel: string
  data: VNodeData
  children: Array<VNode> | undefined
  text: string | undefined
  elm: Element | undefined
  key: string | undefined
}

export namespace VNode {
  /** An Assigned VNode is a node that went through the patching process and got assigned a DOM Element */
  interface Assigned extends VNode {
    elm: Element
  }
}

export type Node = VNode | string | null | undefined

export interface Hook {
  pre?: () => void
  init?: (node: VNode) => void
  create?: (emptyNode: {}, node: VNode.Assigned) => void
  insert?: (node: VNode.Assigned) => void
  prepatch?: (oldVNode: VNode.Assigned, node: VNode.Assigned) => void
  update?: (oldVNode: VNode.Assigned, node: VNode.Assigned) => void
  postpatch?: (oldVNode: VNode.Assigned, node: VNode.Assigned) => void
  destroy?: (node: VNode.Assigned) => void
  remove?: (node: VNode.Assigned, cb: () => void) => void
  post?: () => void
}

export function h(sel: string): VNode
export function h(sel: string, children: string | VNode | Node[]): VNode
export function h(sel: string, data: VNodeData): VNode
export function h(sel: string, data: VNodeData, children: string | VNode | Node[]): VNode


export const Render: {
  /** Renders a VNode into an element or a previous VNode's elm. Returns a cancellation function. */
  into(
    target: Element | VNode | Node[],
    vnode: VNode | Node[],
    onComplete?: Function): Function

  /** Returns whether this is the first time the app renders */
  isFirst(): boolean

  /** Schedules a DOM read operation to be batched with all the other reads at the end of next frame's render. Prevents layout trashing. **/
  scheduleDOMRead(callback: () => void): void

  /** Schedules a DOM write operation to be batched with all the other writes at the end of next frame's render. Prevents layout trashing. **/
  scheduleDOMWrite(callback: () => void): void
}

export { Observable } from './observable'
export { Store } from './store'