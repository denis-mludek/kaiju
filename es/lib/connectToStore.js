import h from 'snabbdom/h';
import Component from './component';
import Message from './message';
import { assign } from './util';

export default function connectToStore() {
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

        return assign({}, state(), { externalProps: externalProps });
      });

      on(store.state, function (storeState) {
        var mappedProps = mapStoreToProps(store);
        return assign({}, state(), { mappedProps: mappedProps });
      });

      on(Message.unhandled, function (m) {
        return msg.sendToParent(m);
      });
    }

    function render(_ref2) {
      var state = _ref2.state;

      var props = assign({}, state.externalProps, state.mappedProps);
      return baseComponent(props);
    }

    return function connectComponent(props) {
      return Component({ name: 'connect-' + baseComponent.name, log: false, initState: initState, props: props, connect: connect, render: render });
    };
  };
}