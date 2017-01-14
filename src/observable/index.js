
import _debounce from './debounce'
import _delay from './delay'
import _filter from './filter'
import _flatMapLatest from './flatMapLatest'
import _fromEvent from './fromEvent'
import _fromPromise from './fromPromise'
import _interval from './interval'
import _map from './map'
import _merge from './merge'
import _partition from './partition'
import _pure from './pure'
import _sliding, { sliding2 } from './sliding'
import _throttle from './throttle'


export function Observable(activate) {

  function obs(val) {
    return arguments.length === 0
      ? (obs._lastValue === UNSET ? undefined : obs._lastValue)
      : obs._add(val)
  }

  obs._subscribers = []
  obs._activate = activate
  obs._lastValue = UNSET

  // Pre-bind _add as it's called as a detached function
  obs._add = (val, name) => {
    obs._lastValue = val
    obs._parentName = name

    pushNewValue(val, obs._subscribers, obs._name || name)

    return obs
  }

  const protoKeys = Object.keys(proto)
  for (let i = 0; i < protoKeys.length; i++) {
    obs[protoKeys[i]] = proto[protoKeys[i]]
  }

  return obs
}

const proto = {

  subscribe: function(cb) {
    const self = this
    const { _subscribers, _add, _activate, _name, _parentName } = this

    if (_subscribers.length === 0)
      if (_activate) this._unsubscribe = _activate(_add)

    _subscribers.push(cb)

    if (this._lastValue !== UNSET)
      cb(this._lastValue, _name || _parentName)

    return function _unsubscribe() {
      const index = _subscribers.indexOf(cb)

      if (index > -1) {
        _subscribers.splice(index, 1)

        if (_subscribers.length === 0)
          self._unsubscribe && self._unsubscribe()
      }
    }
  },

  named: function(name) {
    this._name = name
    return this
  }

}


function pushNewValue(value, subscribers, name) {
  for (let i = 0; i < subscribers.length; i++) {
    subscribers[i](value, name)
  }
}

// Internal marker
const UNSET = {}


// Enrich the Observable "prototype" till (maybe) we have the |> operator!
proto.debounce = function(time) { return _debounce(time, this) }
proto.delay = function(time) { return _delay(time, this) }
proto.filter = function(fn) { return _filter(fn, this) }
proto.flatMapLatest = function(fn) { return _flatMapLatest(fn, this) }
proto.map = function(fn) { return _map(fn, this) }
proto.partition = function(predicate) { return _partition(predicate, this) }
proto.sliding = function(num) { return _sliding(num, this) }
proto.sliding2 = function() { return sliding2(this) }
proto.throttle = function(time) { return _throttle(time, this) }

// Enrich the Observable object
Observable.pure = _pure
Observable.fromEvent = _fromEvent
Observable.fromPromise = _fromPromise
Observable.interval = _interval
Observable.merge = _merge
