
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

interface ComponentOptions<P, S> {
  name: string
  sel?: string
  props?: P
  initState: (initProps: P) => S
  connect: (params: ConnectParams<P, S>) => void
  render: (params: RenderParams<P, S>) => VNode | Node[]
}

/**
 * Creates a VNode that has a Component lifecycle.
 */
export function Component<P, S>(options: ComponentOptions<P, S>): VNode

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
 * A Message taking no payload
 */
export interface NoArgMessage {
  (): MessagePayload<undefined>
  type: 'NoArgMessage'
}

/**
 * A message taking no payload as its payload was previously bound.
 */
export interface BoundNoArgMessage {
  (): MessagePayload<undefined>
  type: 'BoundNoArgMessage'
}

/**
 * A Message taking a payload
 */
export interface Message<P> {
  /**
   * Creates a new message payload, ready to be sent.
   */
  (payload: P): MessagePayload<P>

  /**
   * Pre-binds the payload's data for that Message.
   */
  with<Data, E extends Event>(this: Message<[E, Data]>, data: Data): Message<E>

  /**
   * Pre-binds the payload's data for that Message.
   * Note: A bound message originally taking a single type cannot be used as a DOM handler as an Event is always passed.
   */
  with<Data>(this: Message<Data>, data: Data): BoundNoArgMessage

  type: 'Message'
}


interface MessageObject {
  /**
   * Creates a new Message type with a debug name. The message carry no payload.
   */
  (name: string): NoArgMessage

  /**
   * Creates a new Message type with a debug name. The message carry one payload.
   */
  <P>(name: string): Message<P>

  /**
   * A special message sent when another message was not handled
   */
  unhandled: Message<MessagePayload<{}>>
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
  listen<P>(message: Message<P>): Observable<P>

  /**
   * Listens to a message sent from immediate VNodes or component children
   */
  listen(message: NoArgMessage): Observable<undefined>

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

type EventHandler = Message<Event> | NoArgMessage


interface VNodeData {
  /* Tricks structural typing */
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
    readOnly?: boolean
    src?: string
    srcset?: string
    tabIndex?: number
    spellcheck?: boolean
    [index: string]: any
  }
	events?: {
    'blur'?: EventHandler
    'change'?: EventHandler
    'click'?: EventHandler
    'dblclick'?: EventHandler
    'drag'?: EventHandler
    'dragend'?: EventHandler
    'dragenter'?: EventHandler
    'dragexit'?: EventHandler
    'dragleave'?: EventHandler
    'dragover'?: EventHandler
    'dragstart'?: EventHandler
    'drop'?: EventHandler
    'focus'?: EventHandler
    'input'?: EventHandler
    'keydown'?: EventHandler
    'keypress'?: EventHandler
    'keyup'?: EventHandler
    'load'?: EventHandler
    'mousedown'?: EventHandler
    'mouseenter'?: EventHandler
    'mouseleave'?: EventHandler
    'mousemove'?: EventHandler
    'mouseout'?: EventHandler
    'mouseover'?: EventHandler
    'mouseup'?: EventHandler
    'mousewheel'?: EventHandler
    'scroll'?: EventHandler
    'submit'?: EventHandler
    'touchcancel'?: EventHandler
    'touchend'?: EventHandler
    'touchmove'?: EventHandler
    'touchstart'?: EventHandler
  }
  [s: string]: any
}

/** The VNode interface, as constructed by h() */
export interface VNode {
  sel: string
  data: VNodeData
  children: Array<VNode> | undefined
  text: string | undefined

  /*
   * Technically, elm can actually be undefined in two scenarios:
   * 1) If we access it on a VNode that was never used for patching
   * 2) From a init() hook
   * Since these are very marginal uses, make it non nullable for convenience in all the other cases.
   */
  elm: Element
  key: string | undefined
}

export type Node = VNode | string | null | undefined

export interface Hook {
  pre?: () => void
  init?: (node: VNode) => void
  create?: (emptyNode: any, node: VNode) => void
  insert?: (node: VNode) => void
  prepatch?: (oldVNode: VNode, node: VNode) => void
  update?: (oldVNode: VNode, node: VNode) => void
  postpatch?: (oldVNode: VNode, node: VNode) => void
  destroy?: (node: VNode) => void
  remove?: (node: VNode, cb: () => void) => void
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
