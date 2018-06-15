'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;

var _observable = require('./observable');

function map(mapper, source) {
  return (0, _observable.Observable)(function (add) {
    return source.subscribe(function (val, name) {
      return add(mapper(val), name);
    });
  });
}