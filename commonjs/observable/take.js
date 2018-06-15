'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = take;

var _observable = require('./observable');

function take(count, source) {
  return (0, _observable.Observable)(function (add) {
    var taken = 0;
    return source.subscribe(function (val, name) {
      if (taken++ < count) add(val, name);
    });
  });
}