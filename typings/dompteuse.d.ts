
// dompteuse internals

export function startApp<S>(options: {
  app: Vnode;
  elm: HTMLElement;
}): void;

export function Component<P, S>(options: {
  key: string;
  props?: P;
  state: (api: StateApi, props: Property<P>) => Property<S>;
  render: (state: S) => Vnode;
}): Vnode;

export var log: {
  render: boolean;
  stream: boolean;
}

export interface StateApi {
  onEvent(selector: string, eventName: string): Stream<Event>
  emit: any; // TODO: type this
}

// Kefir

import { Stream, Property } from './kefir';
export { Stream, Property } from './kefir';

import * as Kefir from './kefir';
export var kefir: typeof Kefir;

// snabbdom

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

// This weird union type is here to differentiate from the Array children type.
// If an empty object was allowed, [vnode, wrongValue] could be assigned to it as it's a valid object.
type VnodeData = { key?: string } & (
  { class: {} } |
  { attrs: {} } |
  { on: {} } |
  { props: {} } |
  { style: {} } |
  { hook: Hooks } |
  { liveProps: {} }
);

export function h(sel: string): Vnode;
export function h(sel: string, dataOrChildren: VnodeData | Array<Node> | string): Vnode;
export function h(sel: string, data: VnodeData, children: Array<Node> | string): Vnode;

// Actions & PushStream

interface OnAction<S> {
  (action: NoArgAction, handler: (state: S) => S): void;
  <P>(action: Action<P>, handler: (state: S, payload: P) => S): void;
}

type NoArgAction = () => void;
type Action<P> = (payload: P) => void;

export function Action(name: string): NoArgAction;
export function Action<P>(name: string): Action<P>;
export function ActionStream<S>(initialState: S, registerActions: (on: OnAction<S>) => void): Property<S>;
