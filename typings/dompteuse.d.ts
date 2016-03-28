
import { GlobalStore, LocalStore } from 'fluxx';


export function startApp<S>(options: {
  app: () => any; // TODO: type this as a vnode
  patch: any; // TODO: Reuse snabbdom's patch type
  store: GlobalStore<S>;
  elm: HTMLElement;
}): any;


interface RenderOptions<P, PS, LS, AS> {
  props?: P;
  state?: PS;
  localState?: LS;
  actions?: AS;
}

interface Hooks {
  create?: (emptyNode: any, vnode: any) => void;
  remove?: (vnode: any, removeCb: () => void) => void;
}

export function component<P, PS, LS, AS>(options: {
  key: string;
  tag?: string;
  props?: P;
  localStore?: (props: P) => { store: LocalStore<LS>, actions: AS };
  pullState?: <S>(state: S) => PS;
  render: (options: RenderOptions<P, PS, LS, AS>) => any; // TODO: type this as a vnode
  hook?: Hooks;
}): any; // TODO: type this as a vnode


export var Render: {
  log: boolean;
}
