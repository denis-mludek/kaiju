import most from 'most';

import { Set } from './util';


export default function DomEvents(componentDestruction) {
  this.componentDestruction = componentDestruction;
  componentDestruction.observe(this._destroy);
};

DomEvents.prototype.events = function(selector, evt) {
  this.eventSubs = this.eventSubs || [];

  const stream = most.create(add => sub.streamAdd = add)
    .until(this.componentDestruction);

  const sub = { selector, evt, isCustomEvent: evt._isCustomEvent };
  this.eventSubs.push(sub);
  if (this.el) subscribe(sub, this.el);

  return stream;
};

DomEvents.prototype.emit = function(event) {
  if (!this.eventSubs) return;

  let parentEl = this.el.parentElement;

  event.targetComponent = this.el;

  while (parentEl) {
    if (parentEl.__comp__)
      parentEl.__comp__.domEvents._handleEmit(event);

    parentEl = parentEl.parentElement;
  }
};

DomEvents.prototype._activate = function(el) {
  if (!this.eventSubs) return;

  this.el = el;
  this.eventSubs.forEach(sub => subscribe(sub, el));
};

DomEvents.prototype._destroy = function() {
  if (!this.eventSubs) return;

  this.eventSubs.forEach(sub => {
    if (sub.isCustomEvent) return;
    const { evt, listener: { fn, useCapture }} = sub;
    this.el.removeEventListener(evt, fn, useCapture);
  });

  this.eventSubs = null;
};

DomEvents.prototype._handleEmit = function(event) {
  const subs = this.eventSubs;
  if (!subs) return;

  for (let i = 0; i < subs.length; i++) {
    const sub = subs[i];
    if (sub.isCustomEvent && matches(event.targetComponent, sub.selector))
      sub.streamAdd(event.payload);
  }
};

function subscribe(sub, el) {
  if (sub.isCustomEvent) return;

  const listener = evt => {
    if (targetMatches(evt.target, sub.selector, el))
      sub.streamAdd(evt);
  }
  const useCapture = sub.evt in nonBubblingEvents;
  el.addEventListener(sub.evt, listener, useCapture);
  sub.listener = { fn: listener, useCapture };
}


const proto = Element.prototype;
const nativeMatches = proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;
function matches(el, selector) {
  return nativeMatches.call(el, selector);
}

const nonBubblingEvents = Set(
  'load',
  'unload',
  'focus',
  'blur',
  'mouseenter',
  'mouseleave',
  'submit',
  'change',
  'reset',
  'timeupdate',
  'playing',
  'waiting',
  'seeking',
  'seeked',
  'ended',
  'loadedmetadata',
  'loadeddata',
  'canplay',
  'canplaythrough',
  'durationchange',
  'play',
  'pause',
  'ratechange',
  'volumechange',
  'suspend',
  'emptied',
  'stalled',
);

function targetMatches(target, selector, root) {
  for (let el = target; el && el !== root; el = el.parentElement) {
    if (matches(el, selector)) return true;
  }
  return false;
}
