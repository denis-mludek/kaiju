
import { GlobalStore, LocalStore } from 'fluxx';


export function startApp<S>(options: {
  app: Vnode;
  store: GlobalStore<S>;
  elm: HTMLElement;
}): void;


interface RenderOptions<P, PS, LS, AS> {
  props?: P;
  state?: PS;
  localState?: LS;
  actions?: AS;
}

export function component<P extends DP, DP, PS, LS, AS>(options: {
  key: string;
  props?: P;
  defaultProps?: DP;
  localStore?: (props: P) => { store: LocalStore<LS>, actions: AS };
  pullState?: <S>(state: S) => PS;
  render: (options: RenderOptions<P, PS, LS, AS>) => Vnode;
}): Vnode;

export var Render: {
  log: boolean;
}

interface Vnode {
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
// If an empty object was allowed, [vnode, wrongValue] could be assigned to it.
type VnodeData = { key?: string } & (
  { class: {} } |
  { attrs: {} } |
  { on: {} } |
  { props: {} } |
  { style: {} } |
  { hook: Hooks }
);

export function h(sel: string): Vnode;
export function h(sel: string, dataOrChildren: VnodeData | Array<Node> | string): Vnode;
export function h(sel: string, data: VnodeData, children: Array<Node> | string): Vnode;
