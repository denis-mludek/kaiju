
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
  connect: (on: StreamSub<S>, dom: DomEvents) => void;
  render: (props: P, state: S) => Vnode;
}): Vnode;

export var log: {
  render: boolean;
  stream: boolean;
}

export type NoArgCustomEvent = () => EventPayload<void>;
export type CustomEvent<P> = (payload: P) => EventPayload<P>;

export function Event(name: string): NoArgCustomEvent;
export function Event<P>(name: string): CustomEvent<P>;

interface EventPayload<P> {
  _id: number;
  payload: P;
}

export interface DomEvents {
  events(selector: string, eventName: string): Stream<Event>
  events<P>(selector: string, customEvent: CustomEvent<P>): Stream<P>
  emit<P>(event: EventPayload<P>): void
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

// Actions & ActionStream

interface OnAction<S> {
  (action: NoArgAction, handler: (state: S) => S): void;
  <P>(action: Action<P>, handler: (state: S, payload: P) => S): void;
}

type NoArgAction = () => void;
type Action<P> = (payload: P) => void;

export function Action(name: string): NoArgAction;
export function Action<P>(name: string): Action<P>;
export function ActionStream<S>(
  initialState: S,
  registerActions: (on: OnAction<S>) => void): Stream<S> & { value: S };
