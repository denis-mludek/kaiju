'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventsModule = undefined;

var _util = require('./util');

var _messages = require('./messages');

/* snabbdom module extension used to register Messages as event listeners */

function updateEventListeners(oldVnode, vnode) {
  var oldEvents = oldVnode.data.events;
  var events = vnode.data.events;

  if (!events) return;

  var listeners = oldEvents ? oldEvents.listeners : {};
  events.listeners = listeners;

  var _loop = function _loop() {
    var message = events[name];
    var oldMessage = oldEvents && oldEvents[name];

    if (message && message !== oldMessage) {

      if (oldMessage && isSameMessageAndPayload(message, oldMessage)) return 'continue';

      if (listeners[name]) vnode.elm.removeEventListener(name, listeners[name]);

      listeners[name] = function (evt) {
        return (0, _messages._sendToElement)(evt.currentTarget, message(evt));
      };
      vnode.elm.addEventListener(name, listeners[name]);
    }
  };

  for (name in events) {
    var _ret = _loop();

    if (_ret === 'continue') continue;
  }

  if (!oldEvents) return;

  for (name in oldEvents) {
    if (events[name] === undefined) vnode.elm.removeEventListener(name, listeners[name]);
  }
}

function isSameMessageAndPayload(message, oldMessage) {
  return message._id === oldMessage._id && message.payload === oldMessage.payload;
}

var eventsModule = exports.eventsModule = {
  create: updateEventListeners,
  update: updateEventListeners
};