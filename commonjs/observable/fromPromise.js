'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fromPromise;

var _observable = require('./observable');

var _spaceLift = require('space-lift');

function fromPromise(promise) {
  return (0, _observable.Observable)(function (add) {
    var active = true;

    promise.then(function (value) {
      if (active) add((0, _spaceLift.Ok)(value));
    }, function (error) {
      if (active) add((0, _spaceLift.Err)(error));
    });

    return function () {
      active = false;
    };
  }).named('fromPromise');
}