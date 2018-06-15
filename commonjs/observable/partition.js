'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = partition;

var _observable = require('./observable');

function partition(predicate, source) {
  return [(0, _observable.Observable)(function (add) {
    return source.subscribe(function (value, name) {
      if (predicate(value)) add(value, name);
    });
  }), (0, _observable.Observable)(function (add) {
    return source.subscribe(function (value, name) {
      if (!predicate(value)) add(value, name);
    });
  })];
}