'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observable = undefined;

var _observable = require('./observable');

var _debounce2 = require('./debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _delay2 = require('./delay');

var _delay3 = _interopRequireDefault(_delay2);

var _distinct2 = require('./distinct');

var _distinct3 = _interopRequireDefault(_distinct2);

var _drop2 = require('./drop');

var _drop3 = _interopRequireDefault(_drop2);

var _filter2 = require('./filter');

var _filter3 = _interopRequireDefault(_filter2);

var _flatMapLatest2 = require('./flatMapLatest');

var _flatMapLatest3 = _interopRequireDefault(_flatMapLatest2);

var _fromEvent2 = require('./fromEvent');

var _fromEvent3 = _interopRequireDefault(_fromEvent2);

var _fromPromise2 = require('./fromPromise');

var _fromPromise3 = _interopRequireDefault(_fromPromise2);

var _interval2 = require('./interval');

var _interval3 = _interopRequireDefault(_interval2);

var _map2 = require('./map');

var _map3 = _interopRequireDefault(_map2);

var _merge2 = require('./merge');

var _merge3 = _interopRequireDefault(_merge2);

var _partition2 = require('./partition');

var _partition3 = _interopRequireDefault(_partition2);

var _pure2 = require('./pure');

var _pure3 = _interopRequireDefault(_pure2);

var _sliding2 = require('./sliding');

var _sliding3 = _interopRequireDefault(_sliding2);

var _take2 = require('./take');

var _take3 = _interopRequireDefault(_take2);

var _throttle2 = require('./throttle');

var _throttle3 = _interopRequireDefault(_throttle2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Enrich the Observable "prototype" till (maybe) we have the |> operator!
_observable.proto.debounce = function (time) {
  return (0, _debounce3.default)(time, this);
};
_observable.proto.delay = function (time) {
  return (0, _delay3.default)(time, this);
};
_observable.proto.distinct = function (fn) {
  return (0, _distinct3.default)(fn, this);
};
_observable.proto.drop = function (count) {
  return (0, _drop3.default)(count, this);
};
_observable.proto.filter = function (fn) {
  return (0, _filter3.default)(fn, this);
};
_observable.proto.flatMapLatest = function (fn) {
  return (0, _flatMapLatest3.default)(fn, this);
};
_observable.proto.map = function (fn) {
  return (0, _map3.default)(fn, this);
};
_observable.proto.partition = function (predicate) {
  return (0, _partition3.default)(predicate, this);
};
_observable.proto.sliding = function (num) {
  return (0, _sliding3.default)(num, this);
};
_observable.proto.sliding2 = function () {
  return (0, _sliding2.sliding2)(this);
};
_observable.proto.take = function (count) {
  return (0, _take3.default)(count, this);
};
_observable.proto.throttle = function (time) {
  return (0, _throttle3.default)(time, this);
};

// Enrich the Observable object
_observable.Observable.pure = _pure3.default;
_observable.Observable.fromEvent = _fromEvent3.default;
_observable.Observable.fromPromise = _fromPromise3.default;
_observable.Observable.interval = _interval3.default;
_observable.Observable.merge = _merge3.default;

exports.Observable = _observable.Observable;