import { Observable } from './observable';
import { Set } from '../lib/util';

export default function fromEvent(name, el, childSelector) {
  return Observable(function (add) {

    var obsName = childSelector ? 'fromEvent[type=' + name + ', selector=' + childSelector + ']' : 'fromEvent[type=' + name + ']';

    var handler = childSelector ? function (evt) {
      if (targetMatches(evt.target, childSelector, el)) add(evt, obsName);
    } : function (evt) {
      return add(evt, obsName);
    };

    var useCapture = childSelector && name in nonBubblingEvents;

    el.addEventListener(name, handler, useCapture);
    return function () {
      return el.removeEventListener(name, handler, useCapture);
    };
  });
}

var nonBubblingEvents = Set('blur', 'canplay', 'canplaythrough', 'change', 'durationchange', 'emptied', 'ended', 'focus', 'load', 'loadeddata', 'loadedmetadata', 'mouseenter', 'mouseleave', 'pause', 'play', 'playing', 'ratechange', 'reset', 'scroll', 'seeked', 'seeking', 'stalled', 'submit', 'suspend', 'timeupdate', 'unload', 'volumechange', 'waiting');

var proto = typeof window !== 'undefined' && Element ? Element.prototype : {};
var nativeMatches = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

function matches(el, selector) {
  return nativeMatches.call(el, selector);
}

function targetMatches(target, selector, root) {
  for (var el = target; el && el !== root; el = el.parentElement) {
    if (matches(el, selector)) return true;
  }
  return false;
}