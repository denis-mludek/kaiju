import h from 'snabbdom/h';
import kefir from 'kefir';

import { renderComponentNow, renderComponent } from './render';
import shallowEqual from './shallowEqual';
import DomAPi from './domApi';


const empty = {};

export default function Component(options) {
  const { key, props = empty, state, render } = options;

  const compProps = {
    key,
    hook: { create, insert, postpatch, destroy },
    component: { props, stateFn: state, render, key }
  };

  return h('div', compProps);
};

// Called when the component is created but isn't yet attached to the DOM
function create(_, vnode) {
  const { component } = vnode.data;
  const { props, stateFn } = component;

  component.lifecycle = {};

  // A stream which only produces one value at component destruction time
  const componentDestruction = kefir.stream(emitter => {
    component.lifecycle.destroyed = () => {
      emitter.emit();
      emitter.end();
    }
  });

  // The stream of changing props given by the component's parent
  const propStream = kefir.stream(emitter => {
    component.lifecycle.propsChanged = newProps => emitter.emit(newProps)
  }).toProperty(() => props);

  const domApi = new DomAPi(componentDestruction);

  const state = stateFn(domApi, propStream).takeUntilBy(componentDestruction);
  let stateCalled = false;

  component.elm = vnode.elm;
  component.onRender = onRender;
  component.placeholder = vnode;

  state.onValue(state => {
    stateCalled = true;

    const oldState = component.state;
    component.state = state;

    // First render:
    // Create and insert the component's content
    // while its parent is still unattached for better perfs.
    if (oldState === undefined) {
      renderComponentNow(component);
      component.placeholder.elm = component.vnode.elm;
      domApi._activate(component.vnode.elm);
    }

    else if (!shallowEqual(oldState, state))
      renderComponent(component);
  });

  if (!stateCalled)
    console.error('state() returned a Property without an initial value for component',
      component.elm, component.key);
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
  component.placeholder = vnode;
  newData.component = component;

  if (!shallowEqual(newData.props, oldData.props))
    component.lifecycle.propsChanged(newData.props);
}

function onRender(component, newVnode) {
  let i;

  // Store the new vnode inside the component so we can diff it next render
  component.vnode = newVnode;

  // Lift any 'remove' hook to our placeholder vnode for it to be called
  // as the placeholder is all our parent vnode knows about.
  if ((i = newVnode.data.hook) && (i = i.remove))
    component.placeholder.data.hook.remove = i;
}

function destroy(vnode) {
  const comp = vnode.data.component;
  destroyVnode(comp.vnode);
  comp.destroyed = true;
  comp.lifecycle.destroyed();
}

// Destroy our vnode recursively
function destroyVnode(vnode) {
  const data = vnode.data;

  if (!data) return;
  if (data.hook && data.hook.destroy) data.hook.destroy(vnode);
  // Can't invoke modules' destroy hook as they're hidden in snabbdom's closure
  if (vnode.children) vnode.children.forEach(destroyVnode);
  if (data.vnode) destroyVnode(data.vnode);
}

function getDepth(elm) {
  let parent = elm.parentElement;

  while (parent) {
    if (parent.__depth__ !== undefined) return parent.__depth__ + 1;
    parent = parent.parentElement;
  }

  return 0;
}
