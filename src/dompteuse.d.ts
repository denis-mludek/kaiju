
// startApp

export function startApp<S>(options: {
  app: Vnode
  snabbdomModules: any[]
  elm: Element
}): void

// Observables

import { ObservableObject, Observable, ObservableWithInitialValue } from './observable'
export var Observable: ObservableObject

// Components

interface RegisterMessages<S> {
  <T>(observable: Observable<T>, handler: (state: S, value: T) => S|void): void
  (message: NoArgMessage, handler: (state: S) => S|void): void
  <P>(message: Message<P>, handler: (state: S, payload: P) => S|void): void
}

export interface ConnectParams<P, S> {
  on: RegisterMessages<S>
  props: ObservableWithInitialValue<P>
  msg: Messages
}

export function Component<P, S>(options: {
  key: string
  props?: P
  defaultProps?: any // :-(    https://github.com/Microsoft/TypeScript/issues/4889
  initState: (initProps: P) => S
  connect: (params: ConnectParams<P, S>) => void
  render: (props: P, state: S) => Vnode
}): Vnode

// dompteuse internals

export var log: {
  render: boolean | string
  message: boolean | string
}

// Messages

export interface NoArgMessage {
  (): MessagePayload<void>
}

export interface Message<P> {
  (payload: P): MessagePayload<P>
  with(payload: P): [Message<P>, P]
}

export function Message(name: string): NoArgMessage
export function Message<P>(name: string): Message<P>

interface MessagePayload<P> {
  _id: number
  _name: string
  payload: P
}

interface Messages {
  listen<P>(message: Message<P>): Observable<P>
  listen(message: NoArgMessage): Observable<void>
  listenAt<P>(selector: string, message: Message<P>): Observable<P>
  listenAt(selector: string, message: NoArgMessage): Observable<void>
  send<P>(payload: MessagePayload<P>): void
  sendToParent<P>(payload: MessagePayload<P>): void
}

// snabbdom

export type PatchFunction = (target: Element | Vnode, vnode: Vnode) => Vnode

export var snabbdom: { init: (modules: any[]) => PatchFunction }


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
  elm?: HTMLElement
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
