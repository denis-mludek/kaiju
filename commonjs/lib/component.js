'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Component;

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _render = require('./render');

var _util = require('./util');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _observable = require('../observable');

var _store = require('../store');

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var empty = {};

function Component(options) {
  var name = options.name,
      _options$props = options.props,
      props = _options$props === undefined ? empty : _options$props,
      _options$sel = options.sel,
      sel = _options$sel === undefined ? 'component' : _options$sel,
      initState = options.initState,
      connect = options.connect,
      render = options.render,
      _options$log = options.log,
      log = _options$log === undefined ? true : _options$log;


  var key = props.key === undefined ? name : name + '_' + props.key;

  var data = {
    key: key,
    hook: { insert: insert, postpatch: postpatch, destroy: destroy },
    component: { props: props, initState: initState, connect: connect, render: render, key: name, log: log },
    attrs: { name: name }

    // An empty placeholder is returned, and that's all our parent is going to see.
    // Each component handles its own internal rendering.
  };var compVnode = (0, _h2.default)(sel, data);
  data.component.compVnode = compVnode;
  return compVnode;
}

function insert(vnode) {
  var component = vnode.data.component;
  var props = component.props,
      initState = component.initState,
      connect = component.connect;


  var connected = false;

  // Lookup from HTML Element to component, used in DOM-based messaging
  vnode.elm.__comp__ = component;

  // Store the component depth once it's attached to the DOM so we can render
  // component hierarchies in a predictive (top -> down) manner.
  component.depth = getDepth(vnode.elm);

  // Internal callbacks
  component.lifecycle = {
    rendered: rendered
  };

  var messages = new _messages2.default(vnode.elm);

  component.elm = vnode.elm;
  component.messages = messages;

  var propsObservable = (0, _observable.Observable)(function (add) {
    add(component.props);
    component.lifecycle.propsChanged = add;
  }).named('props');

  // Eagerly subscribe so that the observable get its first value and we honour
  // the ObservableWithInitialValue interface contract.
  propsObservable.subscribe(function (x) {
    return x;
  });

  component.store = (0, _store.Store)(initState(props), function (_ref) {
    var on = _ref.on,
        msg = _ref.msg,
        state = _ref.state;

    messages.storeMsg = msg;

    var connectParams = {
      on: on,
      state: state,
      props: propsObservable,
      msg: messages
    };

    connect(connectParams);
    connected = true;

    // First render.
    // Render right after our parent (which is in the middle of a patch)
    // so that we honour the snabbdom's insert hook,
    // e.g we get patched into our parent after our parent was added to the document.
    (0, _render.renderNewComponentNow)(component);
  }, {
    name: component.key,
    log: (0, _log.shouldLog)(_log2.default.message, component)
  });

  component.store.state.sliding2().subscribe(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        newState = _ref3[0],
        oldState = _ref3[1];

    var shouldRender =
    // Skip the first notification (hot observable)
    oldState &&
    // synchronous observables triggering before the first render should just be accumulated
    connected &&
    // the props observable triggered, a synchronous render is made right after so skip
    !component.lifecycle.propsChanging &&
    // null update
    !(0, _util.shallowEqual)(oldState, newState);

    if (shouldRender) (0, _render.renderComponentNextFrame)(component);
  });
}

// Called on every parent re-render, this is where the props passed by the component's parent may have changed.
function postpatch(oldVnode, vnode) {
  var oldData = oldVnode.data;
  var newData = vnode.data;

  // Server side rendering: Reconcilating with a server-rendered node will have skipped calling insert()
  if (!oldData.component) {
    insert(vnode);
  }

  // oldData wouldn't have a component reference set if it came from the server (it's first set in insert())
  var component = oldData.component || newData.component;
  var oldProps = component.props;
  var newProps = newData.component.props;

  // Update the original component with any property that may have changed during this render pass
  component.props = newProps;

  newData.component = component;

  // If the props changed, render immediately as we are already
  // in the render context of our parent
  if (!(0, _util.shallowEqual)(oldProps, newProps)) {

    component.lifecycle.propsChanging = true;
    component.lifecycle.propsChanged(newProps);
    component.lifecycle.propsChanging = false;

    (0, _render.renderComponentNow)(component);
  }
}

function rendered(component, newVnode) {
  // Store the new vnode inside the component so we can diff it next render
  component.vnode = newVnode;

  // For now, only lift the hook of non Array render outputs
  if (newVnode && !Array.isArray(newVnode)) {
    // Lift any 'remove' hook to our placeholder vnode for it to be called
    // as the placeholder is all our parent vnode knows about.
    // TODO: Call all the hooks of an Array VNode?
    var hook = newVnode.data.hook && newVnode.data.hook.remove;
    if (hook) component.compVnode.data.hook.remove = hook;
  }
}

function destroy(vnode) {
  var comp = vnode.data.component;
  comp.vnode.elm.__comp__ = null;

  Array.isArray(comp.vnode) ? comp.vnode.forEach(destroyVnode) : destroyVnode(comp.vnode);

  comp.store.destroy();

  comp.destroyed = true;
}

// Destroy our vnode recursively
// Note: Can't invoke modules' destroy hook as they're hidden in snabbdom's closure.
// The default modules don't do anything in destroy() anyway.
function destroyVnode(vnode) {
  if (!vnode) return;

  var data = vnode.data;

  if (!data) return;

  if (data.hook && data.hook.destroy) data.hook.destroy(vnode);
  if (vnode.children) vnode.children.forEach(destroyVnode);
}

function getDepth(elm) {
  var depth = 0;
  var parent = elm.parentElement;
  while (parent) {
    depth++;
    parent = parent.parentElement;
  }
  return depth;
}