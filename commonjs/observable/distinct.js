'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = distinct;

var _observable = require('./observable');

var UNSET = {};

function distinct(compareFunction, source) {
  var previousValue = UNSET;

  return (0, _observable.Observable)(function (add) {
    return source.subscribe(function (val, name) {
      var shouldAdd = previousValue === UNSET || (compareFunction ? compareFunction(val, previousValue) === false : val !== previousValue);

      previousValue = val;
      if (shouldAdd) add(val, name);
    });
  });
}