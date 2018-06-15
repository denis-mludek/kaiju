'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = drop;

var _observable = require('./observable');

function drop(count, source) {
  return (0, _observable.Observable)(function (add) {
    var dropped = 0;
    return source.subscribe(function (val, name) {
      if (dropped++ >= count) add(val, name);
    });
  });
}