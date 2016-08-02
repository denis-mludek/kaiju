
import Observable from '../observable/create'


export default function Messages() {}

Messages.prototype.listen = function(messageType) {
  this.subs = this.subs || []

  return Observable(add => {
    const sub = {
      messageType,
      observableAdd: add
    }

    this.subs.push(sub)

    return () => {
      this.subs.splice(this.subs.indexOf(sub), 1)
    }
  }).named(messageType._name)
}

Messages.prototype.listenAt = function(nodeSelector, messageType) {
  return Observable(add => {
    const el = document.querySelector(nodeSelector)
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
  this._receive(msg)
}

Messages.prototype.sendToParent = function(msg) {
  if (!this.el) throw new Error('Messages.send cannot be called synchronously in connect()')
  _sendToElement(this.el.parentElement, msg)
}

Messages.prototype._activate = function(el) {
  this.el = el
}

Messages.prototype._receive = function(msg) {
  const subs = this.subs
  if (!subs) return

  for (let i = 0; i < subs.length; i++) {
    const sub = subs[i]
    if (sub.messageType._id === msg._id)
      sub.observableAdd(msg.payload)
  }
}

export function _sendToElement(el, msg) {
  while (el) {
    // Classic component's listen
    if (el.__comp__)
      return el.__comp__.messages._receive(msg)
    // listenAt
    else if (el.__subs__)
      return el.__subs__
        .filter(sub => sub.messageType._id === msg._id)
        .forEach(sub => sub.observableAdd(msg.payload))

    el = el.parentElement
  }
}
