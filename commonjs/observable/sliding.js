'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sliding2 = sliding2;
exports.default = sliding;

var _observable = require('./observable');

function sliding2(source) {
  return sliding(2, source);
}

function sliding(size, source) {
  var window = [];

  return (0, _observable.Observable)(function (add) {
    return source.subscribe(function (val, name) {
      window = [val].concat(window);
      window = window.slice(0, size);
      add(window, name);
    });
  });
}