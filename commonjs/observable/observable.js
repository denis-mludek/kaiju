"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observable = Observable;
function Observable(activate) {

  function obs(val) {
    return arguments.length === 0 ? obs._lastValue === UNSET ? undefined : obs._lastValue : obs._add(val);
  }

  obs._subscribers = [];
  obs._activate = activate;
  obs._lastValue = UNSET;

  // Pre-bind _add as it's called as a detached function
  obs._add = function (val, name) {
    obs._lastValue = val;
    obs._parentName = name;

    pushNewValue(val, obs._subscribers, obs._name || name);

    return obs;
  };

  var protoKeys = Object.keys(proto);
  for (var i = 0; i < protoKeys.length; i++) {
    obs[protoKeys[i]] = proto[protoKeys[i]];
  }

  return obs;
}

var proto = exports.proto = {

  subscribe: function subscribe(cb) {
    var self = this;
    var _subscribers = this._subscribers,
        _add = this._add,
        _activate = this._activate,
        _name = this._name;


    if (_subscribers.length === 0) if (_activate) this._unsubscribe = _activate(_add);

    _subscribers.push(cb);

    if (this._lastValue !== UNSET) cb(this._lastValue, _name || this._parentName);

    return function _unsubscribe() {
      var index = _subscribers.indexOf(cb);

      if (index > -1) {
        _subscribers.splice(index, 1);

        if (_subscribers.length === 0) self._unsubscribe && self._unsubscribe();
      }
    };
  },

  named: function named(name) {
    this._name = name;
    return this;
  }

};

function pushNewValue(value, subscribers, name) {
  for (var i = 0; i < subscribers.length; i++) {
    subscribers[i](value, name);
  }
}

// Internal marker
var UNSET = {};