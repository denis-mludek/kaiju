import { Set } from './util';
import { _sendToElement } from './messages';

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
        return _sendToElement(evt.currentTarget, message(evt));
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

export var eventsModule = {
  create: updateEventListeners,
  update: updateEventListeners
};