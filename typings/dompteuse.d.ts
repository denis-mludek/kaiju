
// dompteuse internals

export function startApp<S>(options: {
  app: Vnode;
  snabbdomModules: any[];
  elm: Element;
}): void;

interface StreamSub<S> {
  <A>(stream: Stream<A>, cb: (state: S, value: A) => S): Stream<A>;
  (message: NoArgMessage, cb: (state: S) => S): Stream<void>;
  <P>(message: Message<P>, cb: (state: S, payload: P) => S): Stream<P>;
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

export var log: {
  render: boolean;
  stream: boolean;
}

export type NoArgMessage = () => MessagePayload<void>;
export type Message<P> = (payload: P) => MessagePayload<P>;

export function Message(name: string): NoArgMessage;
export function Message<P>(name: string): Message<P>;

interface MessagePayload<P> {
  _id: number;
  _name: string;
  payload: P;
}

interface Messages {
  listen<P>(message: Message<P>): Stream<P>;
  send<P>(payload: MessagePayload<P>): void;
}

export var Events: {
  listenAt(node: Element, targetSelector: string, eventName: string): Stream<Event>
}

// most

import { Stream } from 'most';

// snabbdom

interface PatchFunction {
  _isPatchFunction: any;
}

export var snabbdom: { init: (modules: any[]) => PatchFunction }

interface VnodeData {
	[s: string]: any;
	events?: { [s: string]: NoArgMessage | Message<Event> }
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

// GlobalStream

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
