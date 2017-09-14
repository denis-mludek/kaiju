import { Observable, proto } from './observable'
import _debounce from './debounce'
import _delay from './delay'
import _drop from './drop'
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


// Enrich the Observable "prototype" till (maybe) we have the |> operator!
proto.debounce = function(time) { return _debounce(time, this) }
proto.delay = function(time) { return _delay(time, this) }
proto.drop = function(count) { return _drop(count, this) }
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

export { Observable }