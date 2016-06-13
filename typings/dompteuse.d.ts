
// startApp

export function startApp<S>(options: {
  app: Vnode;
  snabbdomModules: any[];
  elm: Element;
}): void;

// Components

interface StreamSub<S> {
  <A>(stream: Stream<A>, cb: (state: S, value: A) => S|void): Stream<A>;
  (message: NoArgMessage, cb: (state: S) => S|void): Stream<void>;
  <P>(message: Message<P>, cb: (state: S, payload: P) => S|void): Stream<P>;
}

export interface ConnectParams<P, S> {
  on: StreamSub<S>;
  props: () => P;
  messages: Messages;
}

export function Component<P, S>(options: {
  key: string;
  props?: P;
  defaultProps?: any; // :-(    https://github.com/Microsoft/TypeScript/issues/4889
  initState: (props: P) => S;
  connect: (params: ConnectParams<P, S>) => void;
  render: (props: P, state: S) => Vnode;
}): Vnode;

// dompteuse internals

export var log: {
  render: boolean;
  stream: boolean;
}

// Messages & Events

export interface NoArgMessage {
  (): MessagePayload<void>;
}

export interface Message<P> {
  (payload: P): MessagePayload<P>;
  with(payload: P): [Message<P>, P]
}

export function Message(name: string): NoArgMessage;
export function Message<P>(name: string): Message<P>;

interface MessagePayload<P> {
  _id: number;
  _name: string;
  payload: P;
}

interface Messages {
  listen<P>(message: Message<P>): Stream<P>;
  listen(message: NoArgMessage): Stream<void>;
  listenAt<P>(selector: string, message: Message<P>): Stream<P>;
  listenAt(selector: string, message: NoArgMessage): Stream<void>;
  send<P>(payload: MessagePayload<P>): void;
}

export var Events: {
  listenAt(node: Element, targetSelector: string, eventName: string): Stream<Event>
}

// Global stream

interface OnMessage<S> {
  (message: NoArgMessage, handler: (state: S) => S): void;
  <P>(message: Message<P>, handler: (state: S, payload: P) => S): void;
}

type GlobalStream<S> = Stream<S> & {
  value: S
  send: <P>(payload: MessagePayload<P>) => void
}

export function GlobalStream<S>(
  initialState: S,
  registerHandlers: (on: OnMessage<S>) => void): GlobalStream<S>;


// most

import { Stream } from 'most';

// snabbdom

export type PatchFunction = (target: Element | Vnode, vnode: Vnode) => Vnode;

export var snabbdom: { init: (modules: any[]) => PatchFunction };


type EventHandler = NoArgMessage | Message<Event> | [ Message<any>, any ]

interface VnodeData {
	[s: string]: any;
  hook?: Hooks;
	events?: { [s: string]: EventHandler };
}

export interface Vnode {
  sel: string;
  data: VnodeData;
  children?: Array<Vnode>;
  text?: string;
  elm?: HTMLElement;
  key?: string;
}

type Node = Vnode | string;

interface Hooks {
  pre?: () => void;
  init?: (node: Vnode) => void;
  create?: (emptyNode: any, node: Vnode) => void;
  insert?: (node: Vnode) => void;
  prepatch?: (oldVnode: Vnode, node: Vnode) => void;
  update?: (oldVnode: Vnode, node: Vnode) => void;
  postpatch?: (oldVnode: Vnode, node: Vnode) => void;
  destroy?: (node: Vnode) => void;
  remove?: (node: Vnode, cb: () => void) => void;
  post?: () => void;
}

export function h(sel: string): Vnode;
export function h(sel: string, dataOrChildren: VnodeData | Array<Node> | string): Vnode;
export function h(sel: string, data: VnodeData, children: Array<Node> | string): Vnode;

export var patch: PatchFunction;
