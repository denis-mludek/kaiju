import Observable from '../create'
import { Set } from '../../lib/util'


export default function fromEvent(name, el, childSelector) {
  return Observable(add => {

    const obsName = childSelector
      ? `fromEvent[type=${name}, selector=${childSelector}]`
      : `fromEvent[type=${name}]`

    const handler = childSelector
      ? evt => { if (targetMatches(evt.target, childSelector, el)) add(evt, obsName) }
      : evt => add(evt, obsName)

    const useCapture = childSelector && (name in nonBubblingEvents)

    el.addEventListener(name, handler, useCapture)
    return () => el.removeEventListener(name, handler, useCapture)
  })
}


const nonBubblingEvents = Set(
  'blur',
  'canplay',
  'canplaythrough',
  'change',
  'durationchange',
  'emptied',
  'ended',
  'focus',
  'load',
  'loadeddata',
  'loadedmetadata',
  'mouseenter',
  'mouseleave',
  'pause',
  'play',
  'playing',
  'ratechange',
  'reset',
  'scroll',
  'seeked',
  'seeking',
  'stalled',
  'submit',
  'suspend',
  'timeupdate',
  'unload',
  'volumechange',
  'waiting',
)

const proto = Element.prototype
const nativeMatches = proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector

function matches(el, selector) {
  return nativeMatches.call(el, selector)
}

function targetMatches(target, selector, root) {
  for (let el = target; el && el !== root; el = el.parentElement) {
    if (matches(el, selector)) return true
  }
  return false
}
