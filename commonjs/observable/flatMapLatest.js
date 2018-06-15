'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatMapLatest;

var _observable = require('./observable');

function flatMapLatest(mapper, source) {
  return (0, _observable.Observable)(function (add) {
    var currentUnsub = void 0;

    var unsubSource = source.subscribe(function (val) {
      currentUnsub && currentUnsub();
      var mappedObs = mapper(val);
      currentUnsub = mappedObs.subscribe(add);
    });

    return function () {
      currentUnsub && currentUnsub();
      unsubSource();
    };
  });
}