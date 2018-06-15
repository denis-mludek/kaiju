'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = interval;

var _observable = require('./observable');

function interval(time) {
  return (0, _observable.Observable)(function (add) {
    var intervalId = setInterval(add, time);
    return function () {
      return clearInterval(intervalId);
    };
  }).named('interval');
}