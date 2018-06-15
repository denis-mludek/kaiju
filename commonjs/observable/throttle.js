'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;
exports.throttleFunction = throttleFunction;

var _observable = require('./observable');

function throttle(wait, source) {
  return (0, _observable.Observable)(function (add) {
    var throttledAdd = throttleFunction(wait, add);
    var unsubscribe = source.subscribe(throttledAdd);

    return function () {
      unsubscribe();
      throttledAdd.cancel();
    };
  });
}

function throttleFunction(wait, func) {
  var lastCallTime = void 0;
  var timeout = void 0;
  var args = void 0;

  var throttled = function throttled() {
    // Always use the latest arguments, even in an already scheduled call
    args = arguments;

    // A throttled call is already scheduled, noop
    if (timeout !== undefined) return;

    var delta = lastCallTime ? wait - Date.now() + lastCallTime : 0;

    timeout = setTimeout(function () {
      timeout = undefined;
      lastCallTime = Date.now();
      func.apply(null, args);
    }, delta);
  };

  throttled.cancel = function () {
    return clearTimeout(timeout);
  };
  return throttled;
}