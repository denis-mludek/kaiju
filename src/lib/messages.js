import { Observable } from '../observable'

/* Message sending between components, through the DOM */

export default function Messages(el) { this.el = el }

Messages.prototype.listen = function(messageType) {
  return this.storeMsg.listen(messageType)
}

Messages.prototype.listenAt = function(selectorOrEl, messageType) {
  return Observable(add => {
    const el = selectorOrEl instanceof Element
      ? selectorOrEl
      : document.querySelector(selectorOrEl)

    if (!el) return

    el.__subs__ = el.__subs__ || []
    const subs = el.__subs__
    const sub = {
      messageType,
      observableAdd: add
    }

    subs.push(sub)

    return () => {
      subs.splice(subs.indexOf(sub), 1)
      if (subs.length === 0) el.__subs__ = undefined
    }
  }).named(messageType._name)
}

Messages.prototype.send = function(msg) {
  this.storeMsg.send(msg)
}

Messages.prototype.sendToParent = function(msg) {
  _sendToElement(this.el.parentElement, msg)
}

export function _sendToElement(el, msg) {
  while (el) {
    // Classic component's listen
    if (el.__comp__)
      return el.__comp__.messages.send(msg)
    // listenAt
    else if (el.__subs__)
      return el.__subs__
        .filter(sub => sub.messageType._id === msg._id)
        .forEach(sub => sub.observableAdd(msg.payload))

    el = el.parentElement
  }
}
