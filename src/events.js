import most from 'most';
import { Set } from './util';
import { _sendToNode } from './messages';


/* snabbdom module extension used to register Messages as event listeners */

function updateEventListeners(oldVnode, vnode) {
  const oldEvents = oldVnode.data.events;
  const events = vnode.data.events;

  if (!events) return;

  for (name in events) {
    const current = events[name];
    const old = oldEvents && oldEvents[name];

    if (old !== current)
      vnode.elm[name.toLowerCase()] = function(evt) {
        const payload = current(evt);
        _sendToNode(evt.target, payload);
      };
  }

  if (!oldEvents) return;

  for (name in oldEvents) {
    if (events[name] == null)
      vnode.elm[name.toLowerCase()] = null;
  }
}

export const snabbdomModule = {
  create: updateEventListeners,
  update: updateEventListeners
}

/* Listens to a DOM Event using delegation */
export default {
  listenAt: function(el, sel, name) {
    return most.create(add => {

      const listener = evt => {
        if (targetMatches(evt.target, sel, el)) add(evt);
      }

      const useCapture = name in nonBubblingEvents;
      el.addEventListener(name, listener, useCapture);

      return function unsub() {
        el.removeEventListener(name, listener, useCapture);
      };
    })
  }
};


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
