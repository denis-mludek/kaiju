import h from 'snabbdom/h';

import { createComponent, renderComponent } from './render';
import shallowEqual from './shallowEqual';


export default function component(options) {
  const { sel, key, store, readState, render, hook } = options;

  const compProps = {
    key,
    hook: { create, insert, postpatch, remove, destroy },
    component: { store, readState, render, key, hook, stateful: false }
  };

  return h('div' || sel, compProps);
};

function create(_, vnode) {
  const { component } = vnode.data;
  const { store, readState } = component;

  component.unsubFromStore = store.subscribe(state => onStoreChange(component, state));
  component.state = readState(store.state);
  component.elm = vnode.elm;

  // Create the component while it's still out of the DOM tree
  createComponent(component);

  const hook =
    vnode.data.component.hook &&
    vnode.data.component.hook.create;

  if (hook) hook(_, vnode);
}

// Store the component depth once it's attached to the DOM so we can render
// component hierarchies in a predictive manner.
function insert(vnode) {
  vnode.data.component.depth = vnode.elm.__depth__ = getDepth(vnode.elm);
}

// Called on every re-render, this is where the props passed by the component's parents may have changed.
function postpatch(oldVnode, vnode) {
  const oldData = oldVnode.data;
  const newData = vnode.data;

  // Pass on the component instance for the entirety of its lifecycle,
  // But update any property that can change over time.
  const component = oldData.component;
  component.props = newData.component.props;
  component.render = newData.component.render;
  newData.component = component;

  if (!component.stateful) return;

  // if the props changed, schedule a re-render
  if (!shallowEqual(newData.props, oldData.props))
    renderComponent(component);
}

function remove(vnode, removeCb) {
  const hook =
    vnode.data.component.hook &&
    vnode.data.component.hook.remove;

  if (hook) hook(vnode, removeCb);
  else removeCb();
}

function destroy(vnode) {
  const comp = vnode.data.component;
  comp.unsubFromStore();
  destroyVnode(comp.vnode);
  comp.destroyed = true;
}

function destroyVnode(vnode) {
  const data = vnode.data;

  if (!data) return;
  if (data.hook && data.hook.destroy) data.hook.destroy(vnode);
  // Can't invoke modules' destroy hook as they're hidden in snabbdom's closure
  if (vnode.children) vnode.children.forEach(destroyVnode);
  if (data.vnode) destroyVnode(data.vnode);
}

function onStoreChange(component, newState) {
  const oldStateSlice = component.state;
  const newStateSlice = component.readState(newState);

  component.state = newStateSlice;

  if (!shallowEqual(newStateSlice, oldStateSlice))
    renderComponent(component);
}

function getDepth(self) {
  let parent = self.parentElement;

  while (parent) {
    if (parent.__depth__ !== undefined) return parent.__depth__ + 1;
    parent = parent.parentElement;
  }

  return 0;
}
