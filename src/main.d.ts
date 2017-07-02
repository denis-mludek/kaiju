
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

/**
 * A Message taking a payload
 */
export interface Message<P> {
  /**
   * Creates a new message payload, ready to be sent.
   */
  (payload: P): MessagePayload<P>
}

/**
 * A Message taking no payload
 */
export interface NoArgMessage {
  (): MessagePayload<undefined>
}

interface DefaultNoArgMessage extends NoArgMessage {
  type: 'defaultNoArgMessage'
}

interface DefaultMessage<P> extends Message<P> {
  type: 'defaultMessage'

  /**
   * Creates a new Message that has part of its payload set.
   * The created Message can not be used with on().
   * Note: A partially applied message originally taking a scalar payload cannot be used as a DOM handler as an Event is always passed.
   */
  with<P1, P2>(this: Message<[P1, P2]>, partOfThePayload: P1): PartiallyAppliedMessage<P2>

  /**
   * Creates a new Message that aleady has its payload set.
   * The created Message can not be used with on().
   */
  with<P1>(this: Message<P1>, payload: P1): PartiallyAppliedNoArgMessage
}

// Alias so we get more context in compilation errors.
interface PartiallyAppliedMessage<P> extends Message<P> {}
interface PartiallyAppliedNoArgMessage extends NoArgMessage {}

interface MessageObject {
  /**
   * Creates a new Message type with a debug name. The message carry no payload.
   */
  (name: string): DefaultNoArgMessage

  /**
   * Creates a new Message type with a debug name. The message carry one payload.
   */
  <P>(name: string): DefaultMessage<P>

  /**
   * A special message sent when another message was not handled
   */
  unhandled: DefaultMessage<MessagePayload<{}>>
}

export var Message: MessageObject


/**
 * The payload of a Message.
 */
interface MessagePayload<P> {
  _id: number
  _name: string
  payload: P

  /**
   * Returns whether this payload was created using the given message
   */
  is<T>(message: NoArgMessage): this is MessagePayload<undefined>

  /**
   * Returns whether this payload was created using the given message
   */
  is<T>(message: Message<T>): this is MessagePayload<T>
}

interface Messages {
  /**
   * Listens to a message sent from immediate VNodes or component children
   */
  listen<P>(message: DefaultMessage<P>): Observable<P>

  /**
   * Listens to a message sent from immediate VNodes or component children
   */
  listen(message: DefaultNoArgMessage): Observable<undefined>

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
  // Either A new created Message<Event>
  DefaultMessage<E> |
  // or a Message<[X, Event]> that was partially applied
  PartiallyAppliedMessage<E> |
  // or a NoArgMessage that was not partially applied.
  DefaultNoArgMessage

interface VNodeData {
  /* Work around structural typing */
  reduceRight?: 'VNodeData should not be an Array'

  key?: string | number
  hook?: Hook
  class?: { [index: string]: boolean }
  styles?: { [index: string]: string }
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
