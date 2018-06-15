import h from 'snabbdom/h';
import { vnode as VNode } from 'snabbdom/vnode';
import log, { shouldLog } from './log';

var componentsToRender = [];
var nodesToRender = [];
var scheduledDOMReads = [];
var scheduledDOMWrites = [];
var rendering = false;
var nextRender = undefined;
var renderBeginTime = undefined;
var _isFirstRender = true;
var patch = void 0;

export function setPatchFunction(value) {
  patch = value;
}

export var Render = {
  into: renderInto,
  isFirst: isFirstRender,
  scheduleDOMRead: scheduleDOMRead,
  scheduleDOMWrite: scheduleDOMWrite
};

export function isFirstRender() {
  return _isFirstRender;
}

/**
 * Generic render function for arbitrary VDOM rendering
 */
export function renderInto(target, vdom, onComplete) {
  var task = {
    target: target,
    vdom: vdom,
    onComplete: onComplete,
    cancelled: false
  };

  nodesToRender.push(task);

  renderNextFrame();

  return function cancel() {
    task.cancelled = true;
  };
}

// Used by startApp
export function renderSync(target, vdom, replace) {
  var task = {
    target: target,
    vdom: vdom,
    replace: replace
  };

  nodesToRender.push(task);

  renderNow();
}

/* Render a component immediately. This is used internally and it is assumed a render phase is already ongoing */
export function renderComponentNow(component) {
  if (componentsToRender.indexOf(component) === -1) componentsToRender.push(component);
}

/* Optimization of the above function: A new component cannot be possibly found in the render queue */
export function renderNewComponentNow(component) {
  componentsToRender.push(component);
}

export function renderComponentNextFrame(component) {
  if (rendering) {
    // This is pretty bad but not breaking: It means the developer
    // synchronously send a message inside a render() function.
    // Probably just a mistake.
    console.warn('A component tried to re-render while a rendering was already ongoing', component.elm);
    return;
  }

  // This component is already scheduled for the next redraw.
  // For instance, this can happen while the app's tab is inactive,
  // or when synchronously sending a few messages.
  // Avoids doing more work than necessary when re-activating it.
  if (componentsToRender.indexOf(component) !== -1) return;

  componentsToRender.push(component);

  renderNextFrame();
}

function renderNextFrame() {
  if (!nextRender && !rendering) nextRender = requestAnimationFrame(renderNow);
}

function renderComponent(component) {
  var props = component.props,
      store = component.store,
      messages = component.messages,
      elm = component.elm,
      render = component.render,
      vnode = component.vnode,
      destroyed = component.destroyed;

  // Bail if the component is already destroyed.
  // This can happen if the parent renders first and decide a child component should be removed.

  if (destroyed) return;

  var beforeRender = void 0;

  if (log.render) beforeRender = performance.now();

  var target = vnode || elm;
  var newVNode = render({ props: props, state: store.state(), msg: messages }) || emptyNode();

  patchInto(target, newVNode);

  if (shouldLog(log.render, component)) {
    var renderTime = Math.round((performance.now() - beforeRender) * 100) / 100;
    console.log('Render component %c' + component.key, 'font-weight: bold', renderTime + ' ms', '| props: ', props, '| state: ', store.state());
  }

  component.lifecycle.rendered(component, newVNode);
}

function renderNow() {
  rendering = true;
  nextRender = undefined;

  logBeginRender();

  // Render components in a top-down fashion.
  // This ensures the rendering order is predictive and props/states are consistent.
  // If we didn't do that, a component could first be rendered following a state change
  // but then miss out on a props change from its parent.
  componentsToRender.sort(function (compA, compB) {
    return compA.depth - compB.depth;
  });

  processRenderQueue();

  processDOMReadsWrites();

  rendering = false;
  _isFirstRender = false;

  logEndRender();
}

function processRenderQueue() {
  var completeCallbacks = [];

  while (nodesToRender.length || componentsToRender.length) {
    while (nodesToRender.length) {
      var _nodesToRender$shift = nodesToRender.shift(),
          target = _nodesToRender$shift.target,
          vdom = _nodesToRender$shift.vdom,
          replace = _nodesToRender$shift.replace,
          onComplete = _nodesToRender$shift.onComplete,
          cancelled = _nodesToRender$shift.cancelled;

      if (cancelled) continue;
      replace ? patch(target, vdom) : patchInto(target, vdom);
      if (onComplete) completeCallbacks.push(onComplete);
    }

    while (componentsToRender.length) {
      var component = componentsToRender.shift();
      renderComponent(component);
    }

    // Wait for the components indirectly introduced via renderInto to be rendered
    while (completeCallbacks.length) {
      completeCallbacks.shift()();
    }
  }
}

function processDOMReadsWrites() {
  while (scheduledDOMReads.length || scheduledDOMWrites.length) {

    while (scheduledDOMReads.length) {
      scheduledDOMReads.shift()();
    }

    while (scheduledDOMWrites.length) {
      scheduledDOMWrites.shift()();
    }
  }
}

function scheduleDOMRead(callback) {
  scheduledDOMReads.push(callback);
  renderNextFrame();
}

function scheduleDOMWrite(callback) {
  scheduledDOMWrites.push(callback);
  renderNextFrame();
}

function logBeginRender() {
  if (log.render) {
    renderBeginTime = performance.now();
    console.log('%cRender - begin', 'color: orange');
  }
}

function logEndRender() {
  if (log.render) {
    var time = Math.round((performance.now() - renderBeginTime) * 100) / 100;
    console.log('%cRender - end (' + time + 'ms)\n\n\n', 'color: orange');
  }
}

function patchInto(target, node) {
  var targetIsArray = Array.isArray(target);
  var nodeIsArray = Array.isArray(node);

  if (nodeIsArray) mapPrimitiveNodes(node);

  // First render inside an Element
  if (target.elm === undefined) {
    patch(VNode('dummy', {}, [], undefined, target), VNode('dummy', {}, nodeIsArray ? node : [node]));

    if (nodeIsArray) node.elm = target;
  }
  // Update using a previous VNode or VNode[] to patch against
  else {
      if (targetIsArray) {
        patch(VNode('dummy', {}, target, undefined, target.elm), VNode('dummy', {}, nodeIsArray ? node : [node]));
      } else {
        patch(target, node);
      }

      if (nodeIsArray) node.elm = target.elm;
    }
}

/*
  Similar to what h() does for its children. We have to do it here ourselves
  when we are passed an Array of Nodes as it didn't go through the h() transformation.
  The operation is mutative, so that the Array of Nodes can later be reused for patching.
  This is consistent with the snabbdom's way.
*/
function mapPrimitiveNodes(arr) {
  for (var i = 0; i < arr.length; ++i) {
    var node = arr[i];
    if (typeof node === 'string' || typeof node === 'number') arr[i] = VNode(undefined, undefined, undefined, node);
  }
}

var emptyNode = function emptyNode() {
  return VNode('!', {}, [], undefined, undefined);
};