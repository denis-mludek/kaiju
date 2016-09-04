
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
export function startApp<S>(options: {
  app: Vnode
  snabbdomModules: any[]
  elm: Element
}): void


// Observables

import { Observable, ObservableWithInitialValue } from './observable'


// Components


interface RegisterMessages<S> {
  /**
   * Registers an Observable<Value> and call the handler function every time the observable has a new value.
   * The handler is called with the current component state and the new value of the observable.
   * Returning undefined or the current state in the handler is a no-op.
   */
  <T>(observable: Observable<T>, handler: (state: S, value: T) => S|void): void

  /**
   * Registers a Message and call the handler function every time the message is sent.
   * The handler is called with the current component state.
   * Returning undefined or the current state in the handler is a no-op.
   */
  (message: NoArgMessage, handler: (state: S) => S|void): void

  /**
   * Registers a Message and call the handler function every time the message is sent.
   * The handler is called with the current component state and the payload of the message.
   * Returning undefined or the current state in the handler is a no-op.
   */
  <P>(message: Message<P>, handler: (state: S, payload: P) => S|void): void
}

export interface ConnectParams<P, S> {
  on: RegisterMessages<S>
  props: ObservableWithInitialValue<P>
  msg: Messages
}

export interface RenderParams<P, S> {
  props: P
  state: S
  msg: Messages
}

/**
 * Creates a Vnode that has a Component lifecycle.
 */
export function Component<P, S>(options: {
  name: string
  props?: P
  initState: (initProps: P) => S
  connect: (params: ConnectParams<P, S>) => void
  render: (params: RenderParams<P, S>) => Vnode
}): Vnode

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
  (): MessagePayload<void>
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
   * Used in events: { handlers } to pre-bind the payload of that Message in a memory efficient and typesafe way.
   */
  with(payload: P): [Message<P>, P]
}

/**
 * Creates a new Message type with a debug name. The message carry no payload.
 */
export function Message(name: string): NoArgMessage

/**
 * Creates a new Message type with a debug name. The message carry one payload.
 */
export function Message<P>(name: string): Message<P>

/**
 * The payload of a Message.
 */
interface MessagePayload<P> {
  _id: number
  _name: string
  payload: P
}

interface Messages {
  /**
   * Listens for a message sent from immediate Vnodes or component children
   */
  listen<P>(message: Message<P>): Observable<P>

  /**
   * Listens for a message sent from immediate Vnodes or component children
   */
  listen(message: NoArgMessage): Observable<void>

  /**
   * Listens for messages bubbling up to a particular DOM node
   *
   * Example:
   * const clicks = msg.listenAt('#page .button', Click)
   */
  listenAt<P>(selector: string, message: Message<P>): Observable<P>

  /**
   * Listens for messages bubbling up to a particular DOM node
   *
   * Example:
   * const clicks = msg.listenAt('#page .button', Click)
   */
  listenAt(selector: string, message: NoArgMessage): Observable<void>

  /**
   * Sends a message to self. Note: Messages should not be sent synchronously from an on() handler.
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

/**
 * Patches the right Vnode into the left Vnode or Element (if it's the first patch)
 */
export type PatchFunction = (target: Element | Vnode, vnode: Vnode) => Vnode


type EventHandler = NoArgMessage | Message<Event> | [ Message<any>, any ]

interface VnodeData {
	[s: string]: any
  hook?: Hooks
	events?: { [s: string]: EventHandler }
}

export interface Vnode {
  sel: string
  data: VnodeData
  children?: Array<Vnode>
  text?: string
  elm: HTMLElement
  key?: string
}

type Node = Vnode | string

interface Hooks {
  pre?: () => void
  init?: (node: Vnode) => void
  create?: (emptyNode: any, node: Vnode) => void
  insert?: (node: Vnode) => void
  prepatch?: (oldVnode: Vnode, node: Vnode) => void
  update?: (oldVnode: Vnode, node: Vnode) => void
  postpatch?: (oldVnode: Vnode, node: Vnode) => void
  destroy?: (node: Vnode) => void
  remove?: (node: Vnode, cb: () => void) => void
  post?: () => void
}

export function h(sel: string): Vnode
export function h(sel: string, dataOrChildren: VnodeData | Array<Node> | string): Vnode
export function h(sel: string, data: VnodeData, children: Array<Node> | string): Vnode

export var patch: PatchFunction

export function isFirstRender(): boolean
