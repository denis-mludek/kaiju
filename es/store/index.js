import { Observable } from '../observable';
import Message from '../lib/message';
import log from '../lib/log';

/*
 * A Store is an Observable that is guaranteed to have an initial value
 * and can be modified from the outside by messages.
 */
export function Store(initialState, registerHandlers) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : empty;

  var store = {};

  // Message handlers for the on(message) syntax
  var handlers = {};
  // unsubscribe functions created by the on(observable) syntax
  var subscriptions = [];
  // List of the messages that are listened to in order to create observables
  var listened = {};
  // Dispatching queue, when a message handler sends additional messages
  var queue = [];
  // Stack size while receiving a message
  var stack = 0;

  var receiving = false;

  var name = options.name;
  var shouldLog = options.log !== undefined ? options.log : log.message === true;
  var storeName = name || (registerHandlers.name ? registerHandlers.name + ' store' : 'Store');

  var msg = {
    send: function send(m) {
      return store.send(m);
    }, // Late binding as store.send is not yet defined
    listen: function listen(message) {
      var observable = Observable(function () {
        var obss = listened[message._id];
        if (!obss) obss = listened[message._id] = [];
        obss.push(observable);

        return function () {
          obss.splice(obss.indexOf(observable), 1);
        };
      }).named(message._name);

      return observable;
    }
  };

  function on(src, fn) {
    if (src._isMessage) {
      if (src.type === 'partiallyAppliedMessage') {
        console.error('You should not use on() with a partially applied message - Ignoring "' + src._name + '"');
        return;
      }

      handlers[src._id] = fn;
    } else {
      var unsubscribe = src.subscribe(function (val, name) {
        receive(name, fn, [val]);
      });

      subscriptions.push(unsubscribe);
    }
  }

  function receive(sourceName, handler, arg) {
    queue.push({ sourceName: sourceName, handler: handler, arg: arg });

    if (stack >= 10) throw new Error('Infinite loop while handling ' + sourceName);
    if (receiving) return;

    receiving = true;

    var state = store.state();

    try {
      // This loop is used in case a change in the store.state actually triggers more state changes
      while (queue.length) {
        var _queue$shift = queue.shift(),
            _sourceName = _queue$shift.sourceName,
            _handler = _queue$shift.handler,
            _arg = _queue$shift.arg;

        stack++;

        if (shouldLog) console.log('%c' + _sourceName + ' %creceived by %c' + storeName, 'color: #B31EA6', 'color: black', 'font-weight: bold', 'with', _arg);

        var result = _handler.apply(null, _arg);
        if (result !== undefined) state = result;

        if (state !== store.state() && state !== undefined) store.state(state);
      }
    } finally {
      receiving = false;
      queue.length = 0;
      stack = 0;
    }
  }

  store.state = Observable()(initialState).named(storeName + '.state');
  // Eagerly activate so that any backing resource is involved now.
  store.state.subscribe(function (x) {
    return x;
  });

  store.send = function (message) {
    var _id = message._id,
        _name = message._name,
        payload = message.payload;

    var handler = handlers[_id];
    var handled = false;

    if (handler) {
      receive(_name, handler, payload);
      handled = true;
    }

    var obss = listened[_id];

    if (obss) {
      obss.forEach(function (obs) {
        return obs(unpackPayload(payload));
      });
      handled = true;
    }

    if (handled) return;

    var unhandled = handlers[Message.unhandled._id];

    if (unhandled) {
      receive(Message.unhandled._name, unhandled, [message]);
      return;
    }

    console.warn('Unhandled message "' + _name + '" at %c' + storeName, 'font-weight: bold');
  };

  store.destroy = function () {
    store.state._subscribers.length = 0;
    store.state.subscribe = noop;
    store.send = noop;
    subscriptions.forEach(function (fn) {
      return fn();
    });
    subscriptions.length = 0;
  };

  registerHandlers({ on: on, msg: msg, state: store.state });

  return store;
}

function unpackPayload(payload) {
  if (payload.length === 0) return undefined;
  if (payload.length === 1) return payload[0];
  return payload;
}

var empty = {};
function noop() {}