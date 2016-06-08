import h from 'snabbdom/h';
import most from 'most';

import { renderComponentSync, renderComponentAsync } from './render';
import shallowEqual from './shallowEqual';
import Messages from './messages';
import log from './log';


const empty = {};

export default function Component(options) {
  const { key, props = empty, defaultProps, initState, connect, render } = options;

  if (defaultProps)
    Object.keys(defaultProps).forEach(key => {
      if (props[key] === undefined) props[key] = defaultProps[key]});

  const compProps = {
    key,
    hook: { create, postpatch, destroy },
    component: { props, initState, connect, render, key }
  };

  // An empty placeholder is returned, and that's all our parent is going to see.
  // Components handle their own internal rendering.
  return h('div', compProps);
};

// Called when the component is created but isn't yet attached to the DOM
function create(_, vnode) {
  const { component } = vnode.data;
  const { props, initState, connect } = component;

  // Internal callbacks
  component.lifecycle = {
    inserted,
    rendered
  };

  // A stream which only produces one value at component destruction time
  const componentDestruction = most.create(add => {
    component.lifecycle.destroyed = add;
  });

  const messages = new Messages(componentDestruction);

  component.state = initState(props);
  component.elm = vnode.elm;
  component.placeholder = vnode;
  component.messages = messages;

  // First render:
  // Create and insert the component's content
  // while its parent is still unattached for better perfs.
  renderComponentSync(component);
  component.placeholder.elm = component.vnode.elm;
  component.placeholder.elm.__comp__ = component;

  // Subsequent renders following a state update
  const onStream = function(streamOrMessage, fn) {

    const stream = streamOrMessage._isMessage
      ? messages.listen(streamOrMessage)
      : streamOrMessage.until(componentDestruction);

    stream.observe(val => {
      const oldState = component.state;
      const newState = fn(oldState, val);

      if (newState === undefined) return;

      component.state = newState;

      if (!shallowEqual(oldState, newState)) {
        if (log.stream)
          console.log(`Component state updated %c${component.key}`, 'font-weight: bold', component.state);
        renderComponentAsync(component);
      }
    });

    return stream;
  };

  const connectParams = {
    on: onStream,
    props: () => component.props,
    messages
  };

  connect(connectParams);
  messages._activate(component.vnode.elm);
}

// Store the component depth once it's attached to the DOM so we can render
// component hierarchies in a predictive manner.
function inserted(component) {
  component.depth = getDepth(component.vnode.elm);
}

// Called on every re-render, this is where the props passed by the component's parent may have changed.
function postpatch(oldVnode, vnode) {
  const oldData = oldVnode.data;
  const newData = vnode.data;

  const component = oldData.component;
  const oldProps = component.props;
  const newProps = newData.component.props;

  // Pass on the component instance everytime a new Vnode instance is created,
  // but update any important property that can change over time.
  component.props = newProps;
  component.placeholder = vnode;

  newData.component = component;

  // If the props changed, render immediately as we are already
  // in the render context of our parent
  if (!shallowEqual(oldProps, newProps))
    renderComponentSync(component);
}

function rendered(component, newVnode) {
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
  comp.vnode.elm.__comp__ = null;

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
  let depth = 0;
  let parent = elm.parentElement;
  while (parent) {
    depth++;
    parent = parent.parentElement;
  }
  return depth;
}
