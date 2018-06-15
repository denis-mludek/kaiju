'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h = exports.Render = exports.log = exports.startApp = exports.Store = exports.Observable = exports.Message = exports.connectToStore = exports.Component = undefined;

var _snabbdom = require('snabbdom');

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _tovnode = require('snabbdom/tovnode');

var _tovnode2 = _interopRequireDefault(_tovnode);

var _render = require('./lib/render');

var _component = require('./lib/component');

var _component2 = _interopRequireDefault(_component);

var _connectToStore = require('./lib/connectToStore');

var _connectToStore2 = _interopRequireDefault(_connectToStore);

var _message = require('./lib/message');

var _message2 = _interopRequireDefault(_message);

var _events = require('./lib/events');

var _observable = require('./observable');

var _store = require('./store');

var _log = require('./lib/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startApp(_ref) {
  var app = _ref.app,
      elm = _ref.elm,
      replaceElm = _ref.replaceElm,
      snabbdomModules = _ref.snabbdomModules;

  var modules = snabbdomModules.concat(_events.eventsModule);
  (0, _render.setPatchFunction)((0, _snabbdom.init)(modules));
  (0, _render.renderSync)(replaceElm ? (0, _tovnode2.default)(elm) : elm, app, replaceElm);
}

exports.Component = _component2.default;
exports.connectToStore = _connectToStore2.default;
exports.Message = _message2.default;
exports.Observable = _observable.Observable;
exports.Store = _store.Store;
exports.startApp = startApp;
exports.log = _log2.default;
exports.Render = _render.Render;
exports.h = _h2.default;