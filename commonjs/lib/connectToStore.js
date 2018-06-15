'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectToStore;

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectToStore() {
  return function (baseComponent, mapStoreToProps) {

    function initState() {
      return {};
    }

    function connect(_ref) {
      var on = _ref.on,
          props = _ref.props,
          state = _ref.state,
          msg = _ref.msg;

      var _props = props(),
          store = _props.store;

      on(props, function (unfilteredExternalProps) {
        var externalProps = {};

        Object.keys(unfilteredExternalProps).forEach(function (key) {
          if (key !== 'store') externalProps[key] = unfilteredExternalProps[key];
        });

        return (0, _util.assign)({}, state(), { externalProps: externalProps });
      });

      on(store.state, function (storeState) {
        var mappedProps = mapStoreToProps(store);
        return (0, _util.assign)({}, state(), { mappedProps: mappedProps });
      });

      on(_message2.default.unhandled, function (m) {
        return msg.sendToParent(m);
      });
    }

    function render(_ref2) {
      var state = _ref2.state;

      var props = (0, _util.assign)({}, state.externalProps, state.mappedProps);
      return baseComponent(props);
    }

    return function connectComponent(props) {
      return (0, _component2.default)({ name: 'connect-' + baseComponent.name, log: false, initState: initState, props: props, connect: connect, render: render });
    };
  };
}