import most from 'most';


export default function Messages(componentDestruction) {
  this.componentDestruction = componentDestruction;
};

Messages.prototype.listen = function(messageType) {
  this.subs = this.subs || [];

  return most.create(add => {
    const sub = {
      messageType,
      streamAdd: add
    };

    this.subs.push(sub);

    return () => {
      this.subs.splice(this.subs.indexOf(sub), 1);
    }
  })
  .until(this.componentDestruction);
};

Messages.prototype.listenAt = function(nodeSelector, messageType) {
  return most.create(add => {
    const el = document.querySelector(nodeSelector);
    if (!el) return;

    el.__subs__ = el.__subs__ || [];
    const subs = el.__subs__;
    const sub = {
      messageType,
      streamAdd: add
    }

    subs.push(sub);

    return () => {
      subs.splice(subs.indexOf(sub), 1);
      if (subs.length === 0) el.__subs__ = undefined;
    }
  })
  .until(this.componentDestruction);
};

Messages.prototype.send = function(msg) {
  if (!this.el)
    throw new Error('Messages.send cannot be called synchronously in connect()');

  _sendToNode(this.el, msg);
};

Messages.prototype._activate = function(el) {
  this.el = el;
};

Messages.prototype._receive = function(msg) {
  const subs = this.subs;
  if (!subs) return;

  for (let i = 0; i < subs.length; i++) {
    const sub = subs[i];
    if (sub.messageType._id === msg._id)
      sub.streamAdd(msg.payload);
  }
};

export function _sendToNode(node, msg) {
  let parentEl = node.parentElement;

  while (parentEl) {
    // Classic component's listen
    if (parentEl.__comp__)
      return parentEl.__comp__.messages._receive(msg);
    // listenAt
    else if (parentEl.__subs__)
      return parentEl.__subs__
        .filter(sub => sub.messageType._id === msg._id)
        .forEach(sub => sub.streamAdd(msg.payload));

    parentEl = parentEl.parentElement;
  }
};
