import most from 'most';


export default function Messages(componentDestruction) {
  this.componentDestruction = componentDestruction;
};

Messages.prototype.listen = function(messageType) {
  this.subs = this.subs || [];

  const stream = most.create(add => {
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

  return stream;
};

Messages.prototype.send = function(msg) {
  if (!this.el)
    throw new Error('Messages.send cannot be called synchronously in connect()');

  let parentEl = this.el.parentElement;

  while (parentEl) {
    if (parentEl.__comp__)
      return parentEl.__comp__.messages._receive(msg);

    parentEl = parentEl.parentElement;
  }
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
