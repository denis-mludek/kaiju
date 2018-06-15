'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pure;

var _observable = require('./observable');

function pure(value) {
  return (0, _observable.Observable)(function (add) {
    return add(value);
  }).named('pure');
}