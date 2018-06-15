'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Messages;
exports._sendToElement = _sendToElement;

var _observable = require('../observable');

/* Message sending between components, through the DOM */

function Messages(el) {
  this.el = el;
}

Messages.prototype.listen = function (messageType) {
  return this.storeMsg.listen(messageType);
};

Messages.prototype.send = function (msg) {
  this.storeMsg.send(msg);
};

Messages.prototype.sendToParent = function (msg) {
  _sendToElement(this.el.parentElement, msg);
};

Messages.prototype.listenAt = function (selectorOrEl) {
  var el = selectorOrEl instanceof Element ? selectorOrEl : document.querySelector(selectorOrEl);

  if (!el) return;

  var debugName = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className : '');

  return (0, _observable.Observable)(function (add) {
    el.__subs__ = el.__subs__ || [];
    var subs = el.__subs__;
    subs.push(add);

    return function () {
      subs.splice(subs.indexOf(add), 1);
      if (subs.length === 0) el.__subs__ = undefined;
    };
  }).named('listenAt(' + debugName + ')');
};

/** Sends a Message to a DOM Element that will be received by the nearest component */
function _sendToElement(el, msg) {
  var handled = false;

  while (el && !handled) {

    // Classic component's listen
    if (el.__comp__) {
      handled = true;
      el.__comp__.messages.send(msg);
    }

    // listenAt
    if (el.__subs__) {
      handled = true;
      el.__subs__.forEach(function (add) {
        return add(msg);
      });
    }

    el = el.parentElement;
  }
}