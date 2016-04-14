
// dompteuse internals

export function startApp<S>(options: {
  app: Vnode;
  patch: PatchFunction;
  elm: HTMLElement;
}): void;

export function Component<P, S>(options: {
  key: string;
  props?: P;
  connect: (dom: DomApi, props: Property<P>) => Property<S>;
  render: (state: S) => Vnode;
}): Vnode;

export var log: {
  render: boolean;
  stream: boolean;
}

export interface DomApi {
  onEvent(selector: string, eventName: string): Stream<Event>
  emit: any; // TODO: type this
}

// Kefir

import { Stream, Property } from './kefir';
export { Stream, Property } from './kefir';

import * as Kefir from './kefir';
export var kefir: typeof Kefir;

export function makeState<A, B, R>(
  obss: [Property<A>, Property<B>],
  fn: (a: A, b: B) => R): Property<R>;
export function makeState<A, B, C, R>(
  obss: [Property<A>, Property<B>, Property<C>],
  fn: (a: A, b: B, c: C) => R): Property<R>;
export function makeState<A, B, C, D, R>(
  obss: [Property<A>, Property<B>, Property<C>, Property<D>],
  fn: (a: A, b: B, c: C, d: D) => R): Property<R>;
export function makeState<A, B, C, D, E, R>(
  obss: [Property<A>, Property<B>, Property<C>, Property<D>, Property<E>],
  fn: (a: A, b: B, c: C, d: D, e: E) => R): Property<R>;
export function makeState<A, B, C, D, E, F, R>(
  obss: [Property<A>, Property<B>, Property<C>, Property<D>, Property<E>, Property<F>],
  fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R): Property<R>;
export function makeState<A, B, C, D, E, F, G, R>(
  obss: [Property<A>, Property<B>, Property<C>, Property<D>, Property<E>, Property<F>, Property<G>],
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => R): Property<R>;
export function makeState<A, B, C, D, E, F, G, H, R>(
  obss: [Property<A>, Property<B>, Property<C>, Property<D>, Property<E>, Property<F>, Property<G>, Property<H>],
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => R): Property<R>;


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
export function ActionStream<S>(initialState: S, registerActions: (on: OnAction<S>) => void): Property<S>;
