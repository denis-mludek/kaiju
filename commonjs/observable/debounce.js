'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
exports.debounceFunction = debounceFunction;

var _observable = require('./observable');

function debounce(wait, source) {
  return (0, _observable.Observable)(function (add) {
    var debouncedAdd = debounceFunction(wait, add);
    var unsubscribe = source.subscribe(debouncedAdd);

    return function () {
      unsubscribe();
      debouncedAdd.cancel();
    };
  });
}

function debounceFunction(wait, func) {
  var timeout = void 0;

  var debounced = function debounced() {
    var args = arguments;

    var later = function later() {
      timeout = undefined;
      func.apply(null, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debounced.cancel = function () {
    return clearTimeout(timeout);
  };
  return debounced;
}