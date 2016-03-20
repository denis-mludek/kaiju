
import { Store } from 'fluxx';

export var startApp: any;


export function component<A, B>(options: {
  key: string,
  sel?: string,
  store: Store<A>,
  readState: (state: A) => B,
  render: (state: B) => any,
  hook?: { create?: (emptyNode: any, vnode: any) => void, remove?: (vnode: any, removeCb: () => void) => void }
}): any;


export var render: any;
