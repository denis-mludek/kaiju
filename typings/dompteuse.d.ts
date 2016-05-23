
// dompteuse internals

export function startApp<S>(options: {
  app: Vnode;
  patch: PatchFunction;
  elm: HTMLElement;
}): void;

export type StreamSub<S> = <A>(stream: Stream<A>, cb: (state: S, value: A) => S) => void;

export function Component<DP extends P, P, S>(options: {
  key: string;
  props?: P;
  defaultProps?: DP;
  initState: (props: P) => S;
  connect: (on: StreamSub<S>, events: Events) => void;
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

export interface Events {
  listen(selector: string, eventName: string): Stream<Event>
  listen<P>(selector: string, message: Message<P>): Stream<P>
  emit<P>(event: MessagePayload<P>): void
}

// most

import { Stream } from 'most';

// snabbdom

interface PatchFunction {
  _isPatchFunction: any;
}

export var snabbdom: { init: (modules: any[]) => PatchFunction }

export interface Vnode {
  sel: string;
  data: any;
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
export function h(sel: string, dataOrChildren: any): Vnode;
export function h(sel: string, data: any, children: Array<Node> | string): Vnode;

// GlobalStream

interface OnMessage<S> {
  (message: NoArgMessage, handler: (state: S) => S): void;
  <P>(message: Message<P>, handler: (state: S, payload: P) => S): void;
}

type GlobalStream<S> = Stream<S> & {
  value: S
  emit: <P>(payload: MessagePayload<P>) => void
}

export function GlobalStream<S>(
  initialState: S,
  registerHandlers: (on: OnMessage<S>) => void): GlobalStream<S>;
