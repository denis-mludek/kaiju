import h from 'snabbdom/h';
import { globalStore } from 'fluxx';

import { createComponent, renderComponent } from './render';
import shallowEqual from './shallowEqual';


const empty = {};

export default function component(options) {
  const { tag, key, props = empty, pullState, localStore, render, hook } = options;

  const compProps = {
    key,
    hook: { create, insert, postpatch, remove, destroy },
    component: { props, pullState, localStoreFn: localStore, render, key, hook }
  };

  return h('div' || tag, compProps);
};

function create(_, vnode) {
  const { component } = vnode.data;
  const { props, pullState, localStoreFn } = component;

  // This component pulls state from the global store
  if (pullState) {
    const store = globalStore();
    component.unsubFromStores = store.subscribe(state => onGlobalStoreChange(component, state));
    component.state = pullState(store.state);
  }

  // This component maintains local state
  if (localStoreFn) {
    const localStore = localStoreFn(props);
    const { store, actions } = localStore;

    Object.keys(actions).forEach(name => actions[name]._store = store);

    const unsubFromGlobalStore = component.unsubFromStores;
    const unsubFromLocalStore = store.subscribe(state => onLocalStoreChange(component, state));

    component.unsubFromStores = () => {
      unsubFromLocalStore();
      if (unsubFromGlobalStore) unsubFromGlobalStore();
    };

    component.actions = actions;
    component.localState = store.state;
  }

  component.elm = vnode.elm;

  // Create and insert the component's content
  // while its parent is still unattached for better perfs.
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

// Called on every re-render, this is where the props passed by the component's parent may have changed.
function postpatch(oldVnode, vnode) {
  const oldData = oldVnode.data;
  const newData = vnode.data;

  // Pass on the component instance everytime a new Vnode instance is created,
  // but update any important property that can change over time.
  const component = oldData.component;
  component.props = newData.component.props;
  component.render = newData.component.render;
  newData.component = component;

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
  comp.unsubFromStores();
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

function onGlobalStoreChange(component, newState) {
  const oldStateSlice = component.state;
  const newStateSlice = component.pullState(newState);

  component.state = newStateSlice;

  if (!shallowEqual(newStateSlice, oldStateSlice))
    renderComponent(component);
}

function onLocalStoreChange(component, newState) {
  component.localState = newState;
  renderComponent(component);
}

function getDepth(elm) {
  let parent = elm.parentElement;

  while (parent) {
    if (parent.__depth__ !== undefined) return parent.__depth__ + 1;
    parent = parent.parentElement;
  }

  return 0;
}
