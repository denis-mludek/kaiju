'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _observable = require('./observable');

function filter(predicate, source) {
  return (0, _observable.Observable)(function (add) {
    return source.subscribe(function (val, name) {
      if (predicate(val)) add(val, name);
    });
  });
}