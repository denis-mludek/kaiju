/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 140);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var lift = function (obj) {
    if (obj instanceof Array)
        return new ArrayOps(obj);
    if (typeof obj === 'string')
        return new StringOps(obj);
    if (typeof obj === 'number')
        return new NumberOps(obj);
    if (obj === true || obj === false)
        return new BoolOps(obj);
    return new ObjectOps(obj);
};
exports["default"] = lift;
//--------------------------------------
//  Array
//--------------------------------------
var ArrayOps = (function () {
    function ArrayOps(array) {
        this._isLiftWrapper = true;
        this._value = array;
    }
    ArrayOps.prototype.value = function () { return this._value; };
    return ArrayOps;
}());
exports.ArrayOps = ArrayOps;
//--------------------------------------
//  Object
//--------------------------------------
var ObjectOps = (function () {
    function ObjectOps(object) {
        this._isLiftWrapper = true;
        this._value = object;
    }
    ObjectOps.prototype.value = function () { return this._value; };
    return ObjectOps;
}());
exports.ObjectOps = ObjectOps;
//--------------------------------------
//  Number
//--------------------------------------
var NumberOps = (function () {
    function NumberOps(num) {
        this._isLiftWrapper = true;
        this._value = num;
    }
    NumberOps.prototype.value = function () { return this._value; };
    return NumberOps;
}());
exports.NumberOps = NumberOps;
//--------------------------------------
//  String
//--------------------------------------
var StringOps = (function () {
    function StringOps(str) {
        this._isLiftWrapper = true;
        this._value = str;
    }
    StringOps.prototype.value = function () { return this._value; };
    return StringOps;
}());
exports.StringOps = StringOps;
//--------------------------------------
//  Boolean
//--------------------------------------
// Not that we expect to expand on the boolean capabilities... But for completeness sake.
var BoolOps = (function () {
    function BoolOps(value) {
        this._isLiftWrapper = true;
        this._value = value;
    }
    BoolOps.prototype.value = function () { return this._value; };
    return BoolOps;
}());
exports.BoolOps = BoolOps;
function getValue(input) {
    return input['_isLiftWrapper']
        ? input.value()
        : input;
}
exports.getValue = getValue;
//--------------------------------------
//  Re-exported
//--------------------------------------
var immupdate_1 = __webpack_require__(9);
exports.update = immupdate_1.update;
exports.DELETE = immupdate_1.DELETE;
var option_ts_1 = __webpack_require__(3);
exports.Option = option_ts_1.Option;
exports.None = option_ts_1.None;
exports.Some = option_ts_1.Some;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Observable = Observable;

var _debounce2 = __webpack_require__(47);

var _debounce3 = _interopRequireDefault(_debounce2);

var _delay2 = __webpack_require__(48);

var _delay3 = _interopRequireDefault(_delay2);

var _drop2 = __webpack_require__(49);

var _drop3 = _interopRequireDefault(_drop2);

var _filter2 = __webpack_require__(50);

var _filter3 = _interopRequireDefault(_filter2);

var _flatMapLatest2 = __webpack_require__(51);

var _flatMapLatest3 = _interopRequireDefault(_flatMapLatest2);

var _fromEvent2 = __webpack_require__(52);

var _fromEvent3 = _interopRequireDefault(_fromEvent2);

var _fromPromise2 = __webpack_require__(53);

var _fromPromise3 = _interopRequireDefault(_fromPromise2);

var _interval2 = __webpack_require__(54);

var _interval3 = _interopRequireDefault(_interval2);

var _map2 = __webpack_require__(55);

var _map3 = _interopRequireDefault(_map2);

var _merge2 = __webpack_require__(56);

var _merge3 = _interopRequireDefault(_merge2);

var _partition2 = __webpack_require__(57);

var _partition3 = _interopRequireDefault(_partition2);

var _pure2 = __webpack_require__(58);

var _pure3 = _interopRequireDefault(_pure2);

var _sliding2 = __webpack_require__(59);

var _sliding3 = _interopRequireDefault(_sliding2);

var _throttle2 = __webpack_require__(60);

var _throttle3 = _interopRequireDefault(_throttle2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var proto = {

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

// Enrich the Observable "prototype" till (maybe) we have the |> operator!
proto.debounce = function (time) {
  return (0, _debounce3.default)(time, this);
};
proto.delay = function (time) {
  return (0, _delay3.default)(time, this);
};
proto.drop = function (count) {
  return (0, _drop3.default)(count, this);
};
proto.filter = function (fn) {
  return (0, _filter3.default)(fn, this);
};
proto.flatMapLatest = function (fn) {
  return (0, _flatMapLatest3.default)(fn, this);
};
proto.map = function (fn) {
  return (0, _map3.default)(fn, this);
};
proto.partition = function (predicate) {
  return (0, _partition3.default)(predicate, this);
};
proto.sliding = function (num) {
  return (0, _sliding3.default)(num, this);
};
proto.sliding2 = function () {
  return (0, _sliding2.sliding2)(this);
};
proto.throttle = function (time) {
  return (0, _throttle3.default)(time, this);
};

// Enrich the Observable object
Observable.pure = _pure3.default;
Observable.fromEvent = _fromEvent3.default;
Observable.fromPromise = _fromPromise3.default;
Observable.interval = _interval3.default;
Observable.merge = _merge3.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.h = exports.Render = exports.log = exports.startApp = exports.Message = exports.Component = undefined;

var _snabbdom = __webpack_require__(64);

var _snabbdom2 = _interopRequireDefault(_snabbdom);

var _h = __webpack_require__(5);

var _h2 = _interopRequireDefault(_h);

var _tovnode = __webpack_require__(66);

var _tovnode2 = _interopRequireDefault(_tovnode);

var _render = __webpack_require__(17);

var _component = __webpack_require__(45);

var _component2 = _interopRequireDefault(_component);

var _message = __webpack_require__(15);

var _message2 = _interopRequireDefault(_message);

var _events = __webpack_require__(46);

var _log = __webpack_require__(6);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startApp(_ref) {
  var app = _ref.app,
      elm = _ref.elm,
      replaceElm = _ref.replaceElm,
      snabbdomModules = _ref.snabbdomModules;

  var modules = snabbdomModules.concat(_events.eventsModule);
  (0, _render.setPatchFunction)(_snabbdom2.default.init(modules));
  (0, _render.renderSync)(replaceElm ? (0, _tovnode2.default)(elm) : elm, app, replaceElm);
}

exports.Component = _component2.default;
exports.Message = _message2.default;
exports.startApp = startApp;
exports.log = _log2.default;
exports.Render = _render.Render;
exports.h = _h2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
// The Option factory / static object
var OptionObject = function OptionObject(value) {
    return isDef(value) ? Some(value) : exports.None;
};
OptionObject.all = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var values = [];
    for (var i = 0; i < args.length; i++) {
        var value = args[i];
        if (exports.Option.isOption(value))
            value = value.get();
        if (!isDef(value))
            break;
        values.push(value);
    }
    return (values.length === args.length) ? Some(values) : exports.None;
};
OptionObject.isOption = function (value) {
    return !!value && (value._isSome === true || value._isNone === true);
};
function makeNone() {
    var self = {};
    function returnNone() { return exports.None; }
    self._isNone = true;
    self.get = function () { return undefined; };
    self.isDefined = function () { return false; };
    self.forEach = function () { };
    self.map = returnNone;
    self.flatMap = returnNone;
    self.filter = returnNone;
    self.orElse = function (alt) { return alt(); };
    self.getOrElse = function (alt) { return alt; };
    self.match = function (matcher) { return matcher.None(); };
    self.toString = function () { return 'None'; };
    self.toJSON = function () { return null; };
    return self;
}
function _Some(value) {
    this.value = value;
}
_Some.prototype = {
    _isSome: true,
    get: function () {
        return this.value;
    },
    isDefined: function () {
        return true;
    },
    forEach: function (fn) {
        fn(this.value);
    },
    map: function (fn) {
        var result = fn(this.value);
        if (result && result['_isLiftWrapper'])
            result = result.value();
        return exports.Option(result);
    },
    flatMap: function (fn) {
        return fn(this.value);
    },
    filter: function (fn) {
        return fn(this.value) ? this : exports.None;
    },
    orElse: function () {
        return this;
    },
    getOrElse: function () {
        return this.value;
    },
    match: function (matcher) {
        return matcher.Some(this.value);
    },
    toString: function () {
        return "Some(" + this.value + ")";
    },
    toJSON: function () {
        return this.value;
    }
};
function isDef(value) {
    return value !== null && value !== undefined;
}
exports.Option = OptionObject;
/** Creates a new Some instance using a non nullable value */
function Some(value) {
    return new _Some(value);
}
exports.Some = Some;
exports.None = makeNone();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = __webpack_require__(62);
var props_1 = __webpack_require__(63);
var attributes_1 = __webpack_require__(61);
var router_1 = __webpack_require__(113);
exports.Router = router_1.Router;
exports.RouteDef = router_1.RouteDef;
var app_1 = __webpack_require__(116);
var snabbdomModules = [
    class_1.default,
    props_1.default,
    attributes_1.default
];
var app = app_1.default();
var router = router_1.Router({
    routes: { app: app },
    elm: document.querySelector('#screenLayer'),
    snabbdomModules: snabbdomModules,
    urlSync: 'hash',
    notFound: app.notFound
});
// Skip the first level so that we don't have to write 'app.' everytime
exports.routes = router.routes.app;
router.init();


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var vnode_1 = __webpack_require__(7);
var is = __webpack_require__(19);
function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i]))
                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i]);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return vnode_1.vnode(sel, data, children, text, undefined);
}
exports.h = h;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = h;
//# sourceMappingURL=h.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.shouldLog = shouldLog;
exports.default = {
  render: false,
  message: false
};
function shouldLog(log, key) {
  return log === true || log === key;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = vnode;
//# sourceMappingURL=vnode.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.noop = noop;
exports.arrayToObject = arrayToObject;
exports.objectToArray = objectToArray;
exports.copyObject = copyObject;
exports.mergeObjects = mergeObjects;
exports.mapValues = mapValues;
exports.objectDiff = objectDiff;
exports.makeMessage = makeMessage;
exports.parsePaths = parsePaths;
exports.parseQueryParams = parseQueryParams;
exports.normalizePathQuery = normalizePathQuery;
exports.stateShorthand = stateShorthand;
function noop() {}

function arrayToObject(array) {
  return array.reduce(function (obj, item) {
    obj[item] = 1;
    return obj;
  }, {});
}

function objectToArray(obj) {
  var array = [];
  for (var key in obj) {
    array.push(obj[key]);
  }return array;
}

function copyObject(obj) {
  var copy = {};
  for (var key in obj) {
    copy[key] = obj[key];
  }return copy;
}

function mergeObjects(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }return to;
}

function mapValues(obj, fn) {
  var result = {};
  for (var key in obj) {
    result[key] = fn(obj[key]);
  }return result;
}

/*
* Return the set of all the keys that changed (either added, removed or modified).
*/
function objectDiff(obj1, obj2) {
  var update = {};
  var enter = {};
  var exit = {};
  var all = {};

  obj1 = obj1 || {};

  for (var name in obj1) {
    if (!(name in obj2)) exit[name] = all[name] = true;else if (obj1[name] != obj2[name]) update[name] = all[name] = true;
  }

  for (var name in obj2) {
    if (!(name in obj1)) enter[name] = all[name] = true;
  }

  return { all: all, update: update, enter: enter, exit: exit };
}

function makeMessage() {
  var message = arguments[0];
  var tokens = Array.prototype.slice.call(arguments, 1);

  for (var i = 0, l = tokens.length; i < l; i++) {
    message = message.replace('{' + i + '}', tokens[i]);
  }return message;
}

function parsePaths(path) {
  return path.split('/').filter(function (str) {
    return str.length;
  }).map(function (str) {
    return decodeURIComponent(str);
  });
}

function parseQueryParams(query) {
  return query ? query.split('&').reduce(function (res, paramValue) {
    var _paramValue$split = paramValue.split('=');

    var param = _paramValue$split[0];
    var value = _paramValue$split[1];

    res[param] = decodeURIComponent(value);
    return res;
  }, {}) : {};
}

var LEADING_SLASHES = /^\/+/;
var TRAILING_SLASHES = /^([^?]*?)\/+$/;
var TRAILING_SLASHES_BEFORE_QUERY = /\/+\?/;
function normalizePathQuery(pathQuery) {
  return '/' + pathQuery.replace(LEADING_SLASHES, '').replace(TRAILING_SLASHES, '$1').replace(TRAILING_SLASHES_BEFORE_QUERY, '?');
}

function stateShorthand(uri, options, children) {
  return mergeObjects({ uri: uri, children: children || {} }, options);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/** Performs a shallow update of an object using a partial object of the same shape. A new object is returned. */
function update(host, spec) {
    var result = {};
    Object.keys(host).forEach(function (key) { result[key] = host[key]; });
    for (var key in spec) {
        var specValue = spec[key];
        if (specValue === exports.DELETE) {
            delete result[key];
        }
        else {
            result[key] = specValue;
        }
    }
    return result;
}
exports.update = update;
// We lie about the public type so that only a property that is optional or that can be assigned to undefined can be DELETE'd
/** Marker used to delete a key */
exports.DELETE = {};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Set = Set;
exports.shallowEqual = shallowEqual;
function Set() {
  var set = {};
  for (var i = 0; i < arguments.length; i++) {
    set[arguments[i]] = 1;
  }
  return set;
}

/* Efficient shallow comparison of two objects */

function shallowEqual(objA, objB) {
  if (objA === objB) return true;

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return;

  // Test for A's keys different from B's.
  for (var i = 0; i < keysA.length; i++) {
    var valA = objA[keysA[i]];
    var valB = objB[keysA[i]];

    if (valA !== valB) {
      if (valA && valA.type === 'partiallyAppliedMessage') {
        // A partially applied message will always have a new reference,
        // so compare the references of the payloads instead.
        // It is assumed Messages are stable for a given key.
        if (valA.payload !== valB.payload) return false;
      } else return false;
    }
  }

  return true;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = Store;

var _observable = __webpack_require__(1);

var _message = __webpack_require__(15);

var _message2 = _interopRequireDefault(_message);

var _log = __webpack_require__(6);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * A Store is an Observable that is guaranteed to have an initial value
 * and can be modified from the outside by type-safe messages.
 */
function Store(initialState, registerHandlers) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : empty;

  var store = {};

  // Message handlers for the on(message) syntax
  var handlers = {};
  // unsubscribe functions created by the on(observable) syntax
  var subscriptions = [];
  // List of the messages that are listened to in order to create observables
  var listened = {};
  // Dispatching queue, when a message handler sends additional messages
  var queue = [];
  // Stack size while receiving a message
  var stack = 0;

  var receiving = false;

  var name = options.name;
  var shouldLog = options.log !== undefined ? options.log : _log2.default.message === true;
  var storeName = name || (registerHandlers.name ? registerHandlers.name + ' store' : 'Store');

  var msg = {
    send: function send(m) {
      return store.send(m);
    }, // Late binding as store.send is not yet defined
    listen: function listen(message) {
      var observable = (0, _observable.Observable)().named(message._name);
      var obss = listened[message._id];
      if (!obss) obss = listened[message._id] = [];
      obss.push(observable);
      return observable;
    }
  };

  function on(src, fn) {
    if (src._isMessage) {
      handlers[src._id] = fn;
    } else {
      var unsubscribe = src.subscribe(function (val, name) {
        receive(name, fn, val);
      });

      subscriptions.push(unsubscribe);
    }
  }

  function receive(sourceName, handler, arg) {
    queue.push({ sourceName: sourceName, handler: handler, arg: arg });

    if (stack >= 10) throw new Error('Infinite loop while handling ' + sourceName);
    if (receiving) return;

    receiving = true;

    var state = store.state();

    try {
      while (queue.length) {
        var _queue$shift = queue.shift(),
            _sourceName = _queue$shift.sourceName,
            _handler = _queue$shift.handler,
            _arg = _queue$shift.arg;

        stack++;

        if (shouldLog) console.log('%c' + _sourceName + ' %creceived by %c' + storeName, 'color: #B31EA6', 'color: black', 'font-weight: bold', 'with', _arg);

        var result = _handler(state, _arg);
        if (result !== undefined) state = result;
      }
    } finally {
      receiving = false;
      queue.length = 0;
      stack = 0;
    }

    if (state !== store.state() && state !== undefined) store.state(state);
  }

  store.state = (0, _observable.Observable)()(initialState).named(storeName + '.state');
  // Eagerly activate (hot)
  store.state.subscribe(function (x) {
    return x;
  });

  registerHandlers(on, msg);

  store.send = function (message) {
    var _id = message._id,
        _name = message._name,
        payload = message.payload;

    var handler = handlers[_id];
    var handled = false;

    if (handler) {
      receive(_name, handler, payload);
      handled = true;
    }

    var obss = listened[_id];

    if (obss) {
      obss.forEach(function (obs) {
        return obs(payload);
      });
      handled = true;
    }

    if (handled) return;

    var unhandled = handlers[_message2.default.unhandled._id];

    if (unhandled) {
      receive(_message2.default.unhandled._name, unhandled, message);
      return;
    }

    console.warn('Unhandled message "' + _name + '" at %c' + storeName, 'font-weight: bold');
  };

  store.destroy = function () {
    store.state._subscribers.length = 0;
    store.state.subscribe = noop;
    store.send = noop;
    subscriptions.forEach(function (fn) {
      return fn();
    });
    subscriptions.length = 0;
  };

  return store;
}

var empty = {};
function noop() {}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* tslint:disable:no-any */

Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAsked = { type: 'notAsked' };
exports.Loading = { type: 'loading' };
exports.Refreshing = function (data) { return ({ type: 'refreshing', data: data }); };
exports.Success = function (data) { return ({ type: 'success', data: data }); };
exports.Failure = function (error) { return ({ type: 'failure', error: error }); };
/**
 * Transforms a RemoteData union object to data/error/loading primitives
 * which are sometimes more convenient to manipulate.
 */
function unpack(data) {
    switch (data.type) {
        case 'notAsked': return { loading: false };
        case 'loading': return { loading: true };
        case 'refreshing': return { loading: true, data: data.data };
        case 'success': return { data: data.data, loading: false };
        case 'failure': return { error: data.error, loading: false };
    }
}
exports.unpack = unpack;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

/* Represents the public API of the last instanciated router; Useful to break circular dependencies between router and its states */
var api = {};
exports.default = api;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.util = exports.State = exports.api = exports.Router = undefined;

var _util = __webpack_require__(8);

var util = _interopRequireWildcard(_util);

var _Router = __webpack_require__(26);

var _Router2 = _interopRequireDefault(_Router);

var _api = __webpack_require__(13);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var State = util.stateShorthand;

exports.Router = _Router2.default;
exports.api = _api2.default;
exports.State = State;
exports.util = util;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = Message;

var messageId = 1;

/** User-defined component message factory */
function Message(name) {
  var _id = messageId++;

  function message(payload) {
    var result = { _id: _id, _name: name, payload: payload };
    result.is = messageIs;
    return result;
  }

  message._id = _id;
  message._name = name;
  message._isMessage = true;
  message.with = withPayload;

  return message;
}

function withPayload(payload) {
  return PartiallyAppliedMessage(this, payload);
}

function messageIs(ofType) {
  return this._id === ofType._id;
}

/** Creates a new Message type that is partially applied with a payload */
function PartiallyAppliedMessage(message, payload) {

  function result(maybeOtherPayload) {
    return message(maybeOtherPayload ? [payload, maybeOtherPayload] : payload);
  }

  result.type = 'partiallyAppliedMessage';
  result.payload = payload;

  return result;
}

Message.unhandled = Message('unhandled');

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = Messages;
exports._sendToElement = _sendToElement;

var _observable = __webpack_require__(1);

/* Message sending between components, through the DOM */

function Messages(el) {
  this.el = el;
}

Messages.prototype.listen = function (messageType) {
  return this.storeMsg.listen(messageType);
};

Messages.prototype.send = function (msg) {
  this.storeMsg.send(msg);
};

Messages.prototype.sendToParent = function (msg) {
  _sendToElement(this.el.parentElement, msg);
};

Messages.prototype.listenAt = function (selectorOrEl) {
  var el = selectorOrEl instanceof Element ? selectorOrEl : document.querySelector(selectorOrEl);

  if (!el) return;

  var debugName = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className : '');

  return (0, _observable.Observable)(function (add) {
    el.__subs__ = el.__subs__ || [];
    var subs = el.__subs__;
    subs.push(add);

    return function () {
      subs.splice(subs.indexOf(add), 1);
      if (subs.length === 0) el.__subs__ = undefined;
    };
  }).named('listenAt(' + debugName + ')');
};

/** Sends a Message to a DOM Element that will be received by the nearest component */
function _sendToElement(el, msg) {
  var handled = false;

  while (el && !handled) {

    // Classic component's listen
    if (el.__comp__) {
      handled = true;
      el.__comp__.messages.send(msg);
    }

    // listenAt
    if (el.__subs__) {
      handled = true;
      el.__subs__.forEach(function (add) {
        return add(msg);
      });
    }

    el = el.parentElement;
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Render = undefined;
exports.setPatchFunction = setPatchFunction;
exports.isFirstRender = isFirstRender;
exports.renderInto = renderInto;
exports.renderSync = renderSync;
exports.renderComponentNow = renderComponentNow;
exports.renderNewComponentNow = renderNewComponentNow;
exports.renderComponentNextFrame = renderComponentNextFrame;

var _h = __webpack_require__(5);

var _h2 = _interopRequireDefault(_h);

var _vnode = __webpack_require__(7);

var _log = __webpack_require__(6);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentsToRender = [];
var nodesToRender = [];
var scheduledDOMReads = [];
var scheduledDOMWrites = [];
var rendering = false;
var nextRender = undefined;
var renderBeginTime = undefined;
var _isFirstRender = true;
var patch = void 0;

function setPatchFunction(value) {
  patch = value;
}

var Render = exports.Render = {
  into: renderInto,
  isFirst: isFirstRender,
  scheduleDOMRead: scheduleDOMRead,
  scheduleDOMWrite: scheduleDOMWrite
};

function isFirstRender() {
  return _isFirstRender;
}

/**
 * Generic render function for arbitrary VDOM rendering
 */
function renderInto(target, vdom, onComplete) {
  var task = {
    target: target,
    vdom: vdom,
    onComplete: onComplete,
    cancelled: false
  };

  nodesToRender.push(task);

  renderNextFrame();

  return function cancel() {
    task.cancelled = true;
  };
}

// Used by startApp
function renderSync(target, vdom, replace) {
  var task = {
    target: target,
    vdom: vdom,
    replace: replace
  };

  nodesToRender.push(task);

  renderNow();
}

/* Render a component immediately. This is used internally and it is assumed a render phase is already ongoing */
function renderComponentNow(component) {
  if (componentsToRender.indexOf(component) === -1) componentsToRender.push(component);
}

/* Optimization of the above function: A new component cannot be possibly found in the render queue */
function renderNewComponentNow(component) {
  componentsToRender.push(component);
}

function renderComponentNextFrame(component) {
  if (rendering) {
    // This is pretty bad but not breaking: It means the developer
    // synchronously send a message inside a render() function.
    // Probably just a mistake.
    console.warn('A component tried to re-render while a rendering was already ongoing', component.elm);
    return;
  }

  // This component is already scheduled for the next redraw.
  // For instance, this can happen while the app's tab is inactive,
  // or when synchronously sending a few messages.
  // Avoids doing more work than necessary when re-activating it.
  if (componentsToRender.indexOf(component) !== -1) return;

  componentsToRender.push(component);

  renderNextFrame();
}

function renderNextFrame() {
  if (!nextRender && !rendering) nextRender = requestAnimationFrame(renderNow);
}

function renderComponent(component) {
  var props = component.props,
      store = component.store,
      messages = component.messages,
      elm = component.elm,
      render = component.render,
      vnode = component.vnode,
      destroyed = component.destroyed;

  // Bail if the component is already destroyed.
  // This can happen if the parent renders first and decide a child component should be removed.

  if (destroyed) return;

  var isNew = vnode === undefined;

  var beforeRender = void 0;

  if (_log2.default.render) beforeRender = performance.now();

  var newVNode = render({ props: props, state: store.state(), msg: messages });
  patchInto(vnode || elm, newVNode);

  if ((0, _log.shouldLog)(_log2.default.render, component.key)) {
    var renderTime = Math.round((performance.now() - beforeRender) * 100) / 100;
    console.log('Render component %c' + component.key, 'font-weight: bold', renderTime + ' ms', '| props: ', props, '| state: ', store.state());
  }

  component.lifecycle.rendered(component, newVNode);
}

function renderNow() {
  rendering = true;
  nextRender = undefined;

  logBeginRender();

  // Render components in a top-down fashion.
  // This ensures the rendering order is predictive and props/states are consistent.
  // If we didn't do that, a component could first be rendered following a state change
  // but then miss out on a props change from its parent.
  componentsToRender.sort(function (compA, compB) {
    return compA.depth - compB.depth;
  });

  processRenderQueue();

  processDOMReadsWrites();

  rendering = false;
  _isFirstRender = false;

  logEndRender();
}

function processRenderQueue() {
  var completeCallbacks = [];

  while (nodesToRender.length || componentsToRender.length) {
    while (nodesToRender.length) {
      var _nodesToRender$shift = nodesToRender.shift(),
          target = _nodesToRender$shift.target,
          vdom = _nodesToRender$shift.vdom,
          replace = _nodesToRender$shift.replace,
          onComplete = _nodesToRender$shift.onComplete,
          cancelled = _nodesToRender$shift.cancelled;

      if (cancelled) continue;
      replace ? patch(target, vdom) : patchInto(target, vdom);
      if (onComplete) completeCallbacks.push(onComplete);
    }

    while (componentsToRender.length) {
      var component = componentsToRender.shift();
      renderComponent(component);
    }

    // Wait for the components indirectly introduced via renderInto to be rendered
    while (completeCallbacks.length) {
      completeCallbacks.shift()();
    }
  }
}

function processDOMReadsWrites() {
  while (scheduledDOMReads.length || scheduledDOMWrites.length) {

    while (scheduledDOMReads.length) {
      scheduledDOMReads.shift()();
    }

    while (scheduledDOMWrites.length) {
      scheduledDOMWrites.shift()();
    }
  }
}

function scheduleDOMRead(callback) {
  scheduledDOMReads.push(callback);
  renderNextFrame();
}

function scheduleDOMWrite(callback) {
  scheduledDOMWrites.push(callback);
  renderNextFrame();
}

function logBeginRender() {
  if (_log2.default.render) {
    renderBeginTime = performance.now();
    console.log('%cRender - begin', 'color: orange');
  }
}

function logEndRender() {
  if (_log2.default.render) {
    var time = Math.round((performance.now() - renderBeginTime) * 100) / 100;
    console.log('%cRender - end (' + time + 'ms)\n\n\n', 'color: orange');
  }
}

function patchInto(target, node) {
  var targetIsArray = Array.isArray(target);
  var nodeIsArray = Array.isArray(node);

  if (nodeIsArray) mapPrimitiveNodes(node);

  // First render inside an Element
  if (target.elm === undefined) {
    patch((0, _vnode.vnode)('dummy', {}, [], undefined, target), (0, _vnode.vnode)('dummy', {}, nodeIsArray ? node : [node]));

    if (nodeIsArray) node.elm = target;
  }
  // Update using a previous VNode or VNode[] to patch against
  else {
      if (targetIsArray) {
        patch((0, _vnode.vnode)('dummy', {}, target, undefined, target.elm), (0, _vnode.vnode)('dummy', {}, nodeIsArray ? node : [node]));
      } else {
        patch(target, node);
      }

      if (nodeIsArray) node.elm = target.elm;
    }
}

/*
  Similar to what h() does for its children. We have to do it here ourselves
  when we are passed an Array of Nodes as it didn't go through the h() transformation.
  The operation is mutative, so that the Array of Nodes can later be reused for patching.
  This is consistent with the snabbdom's way.
*/
function mapPrimitiveNodes(arr) {
  for (var i = 0; i < arr.length; ++i) {
    var node = arr[i];
    if (typeof node === 'string' || typeof node === 'number') arr[i] = (0, _vnode.vnode)(undefined, undefined, undefined, node);
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.htmlDomApi;
//# sourceMappingURL=htmldomapi.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;
//# sourceMappingURL=is.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var space_lift_1 = __webpack_require__(0);
var kaiju_1 = __webpack_require__(2);
var store_1 = __webpack_require__(11);
exports.incrementCounter = kaiju_1.Message('incrementCounter');
var initState = {
    blue: { count: 0 }
};
function default_1() {
    return store_1.default(initState, function (on) {
        on(exports.incrementCounter, function (state) {
            var count = state.blue.count;
            return space_lift_1.update(state, { blue: { count: count + 1 } });
        });
    }, { name: 'appStore' });
}
exports.default = default_1;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var space_lift_1 = __webpack_require__(0);
var store_1 = __webpack_require__(11);
var kaiju_1 = __webpack_require__(2);
var ajax_1 = __webpack_require__(110);
var remoteData_1 = __webpack_require__(12);
var promise = __webpack_require__(112);
exports.loadNextUserPage = kaiju_1.Message('loadNextUserPage');
exports.reloadUsers = kaiju_1.Message('reloadUsers');
function UserStore() {
    var initState = {
        users: remoteData_1.NotAsked,
        pagination: {
            hasMore: true,
            loadMore: exports.loadNextUserPage
        }
    };
    return store_1.default(initState, function (on) {
        var initialUsers = initialUserData();
        var nextUserPage = pagedUserData();
        on(initialUsers.data, function (state, data) {
            var pagination = space_lift_1.update(initState.pagination, {
                hasMore: data.type === 'success'
            });
            return space_lift_1.update(state, {
                users: data,
                pagination: pagination
            });
        });
        on(exports.reloadUsers, function () { return initialUsers.call(); });
        // We could also write an abstraction that merges the initial + paged data Observables
        on(nextUserPage.data, function (state, newPage) {
            if (state.users.type !== 'success' &&
                state.users.type !== 'refreshing')
                return;
            if (newPage.type === 'success') {
                var newUsers = state.users.data.concat(newPage.data);
                var newPagination = space_lift_1.update(initState.pagination, { hasMore: newUsers.length < 100 });
                return space_lift_1.update(state, {
                    users: remoteData_1.Success(newUsers),
                    pagination: newPagination
                });
            }
            else if (newPage.type === 'loading') {
                return space_lift_1.update(state, { users: remoteData_1.Refreshing(state.users.data) });
            }
        });
        on(exports.loadNextUserPage, function () { return nextUserPage.call(); });
    }, { name: 'userStore' });
}
exports.UserStore = UserStore;
function getUsers() {
    return promise.delay(2000)
        .then(function (_) { return fetch('https://randomuser.me/api/?results=20')
        .then(function (res) { return res.json(); })
        .then(function (json) { return json.results.map(function (user) {
        return user.name.first + " " + user.name.last;
    }); }); });
}
function initialUserData() {
    return ajax_1.default({
        name: 'initialUsers',
        ajax: getUsers,
        callNow: true
    });
}
function pagedUserData() {
    return ajax_1.default({
        name: 'pagedUsers',
        ajax: getUsers
    });
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var kaiju_1 = __webpack_require__(2);
var space_lift_1 = __webpack_require__(0);
/**
 * Component wrapper for simple swap transitions (ONE item is replaced by another, be it another Element or undefined)
 * The entering element is not added to the DOM till the exiting element completely finished its animation.
 * This has a few benefits:
 *  - There is no need to bother with changing the entering node's display to 'none' since it's not in the DOM yet
 *  - More performant: Only one VDOM tree rendered at any given time; particularly noticeable at animation time
 *  - This is less work and is thus less confusing for browsers (fixes a rendering bug with Chrome 46)
 */
function animate(animations) {
    return function (child, sel) {
        if (sel === void 0) { sel = 'component'; }
        var props = { child: child, animations: animations };
        return kaiju_1.Component({ sel: sel, name: 'singleElementAnimation', initState: initState, props: props, connect: connect, render: render });
    };
}
exports.default = animate;
function initState(props) {
    return {
        activeChild: props.child
    };
}
var setActiveChild = kaiju_1.Message('setActiveChild');
function connect(_a) {
    var on = _a.on, msg = _a.msg, props = _a.props;
    var isPlayingRemoveAnimation = false;
    on(props.sliding2(), function (state, _a) {
        var newProps = _a[0], oldProps = _a[1];
        // First render, no animation
        if (!oldProps)
            return state;
        var newChild = newProps.child;
        var oldChild = oldProps.child;
        var newKey = keyOf(newProps.child);
        var oldKey = keyOf(oldProps.child);
        // A remove animation is already playing, leave it and rely on it to then introduce the most recent child
        if (isPlayingRemoveAnimation)
            return;
        // Stable child; nothing to do but update with the new reference
        if (newKey === oldKey)
            return space_lift_1.update(state, { activeChild: newProps.child });
        // Child changed: Play animations
        if (oldChild && oldChild.elm) {
            isPlayingRemoveAnimation = true;
            props().animations.remove(oldChild.elm, function () {
                msg.send(setActiveChild(props().child));
                isPlayingRemoveAnimation = false;
            });
        }
        else {
            msg.send(setActiveChild(newChild));
        }
    });
    on(setActiveChild, function (state, node) {
        kaiju_1.Render.scheduleDOMWrite(function () {
            if (node && node.elm)
                props().animations.create(node.elm);
        });
        return space_lift_1.update(state, { activeChild: node });
    });
}
function render(_a) {
    var state = _a.state;
    return state.activeChild;
}
function keyOf(node) {
    return node && (node.key || node.sel);
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = __webpack_require__(131);
exports.default = link_1.default;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(107);
//--------------------------------------
//  Array
//--------------------------------------
__webpack_require__(67);
__webpack_require__(68);
__webpack_require__(69);
__webpack_require__(70);
__webpack_require__(71);
__webpack_require__(72);
__webpack_require__(73);
__webpack_require__(74);
__webpack_require__(75);
__webpack_require__(76);
__webpack_require__(77);
__webpack_require__(78);
__webpack_require__(79);
__webpack_require__(80);
__webpack_require__(81);
__webpack_require__(82);
__webpack_require__(83);
__webpack_require__(84);
__webpack_require__(85);
__webpack_require__(86);
__webpack_require__(87);
__webpack_require__(88);
__webpack_require__(89);
__webpack_require__(90);
__webpack_require__(91);
__webpack_require__(92);
__webpack_require__(93);
__webpack_require__(94);
__webpack_require__(95);
__webpack_require__(96);
__webpack_require__(97);
//--------------------------------------
//  Object
//--------------------------------------
__webpack_require__(98);
__webpack_require__(99);
__webpack_require__(100);
__webpack_require__(101);
__webpack_require__(102);
__webpack_require__(103);
__webpack_require__(104);
__webpack_require__(105);
__webpack_require__(106);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var kaiju_1 = __webpack_require__(2);
var abyssa_1 = __webpack_require__(14);
abyssa_1.Router.log = false;
kaiju_1.log.render = true;
kaiju_1.log.message = true;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _anchors = __webpack_require__(30);

var _anchors2 = _interopRequireDefault(_anchors);

var _StateWithParams = __webpack_require__(28);

var _StateWithParams2 = _interopRequireDefault(_StateWithParams);

var _Transition = __webpack_require__(29);

var _Transition2 = _interopRequireDefault(_Transition);

var _util = __webpack_require__(8);

var util = _interopRequireWildcard(_util);

var _State = __webpack_require__(27);

var _State2 = _interopRequireDefault(_State);

var _api = __webpack_require__(13);

var _api2 = _interopRequireDefault(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Create a new Router instance, passing any state defined declaratively.
* More states can be added using addState().
*
* Because a router manages global state (the URL), only one instance of Router
* should be used inside an application.
*/
function Router(declarativeStates) {
  var router = {};
  var states = stateTrees(declarativeStates);
  var options = {
    enableLogs: false,
    interceptAnchors: true,
    notFound: null,
    urlSync: 'history',
    hashPrefix: ''
  };
  var eventCallbacks = {};

  var firstTransition = true;
  var ignoreNextURLChange = false;
  var currentPathQuery = undefined;
  var currentParamsDiff = {};
  var currentState = undefined;
  var previousState = undefined;
  var transition = undefined;
  var leafStates = undefined;
  var urlChanged = undefined;
  var initialized = undefined;
  var hashSlashString = undefined;

  /*
  * Setting a new state will start a transition from the current state to the target state.
  * A successful transition will result in the URL being changed.
  * A failed transition will leave the router in its current state.
  */
  function setState(state, params, acc) {
    var fromState = transition ? (0, _StateWithParams2.default)(transition.currentState, transition.toParams) : currentState;

    var diff = util.objectDiff(fromState && fromState.params, params);

    var toState = (0, _StateWithParams2.default)(state, params, currentPathQuery, diff);

    if (preventTransition(fromState, toState, diff)) {
      if (transition && transition.exiting) cancelTransition();
      return;
    }

    if (transition) cancelTransition();

    // While the transition is running, any code asking the router about the previous/current state should
    // get the end result state.
    previousState = currentState;
    currentState = toState;
    currentParamsDiff = diff;

    transition = (0, _Transition2.default)(fromState, toState, diff, acc, router, logger);

    startingTransition(fromState, toState);

    // In case of a redirect() called from 'startingTransition', the transition already ended.
    if (transition) transition.run();

    // In case of a redirect() called from the transition itself, the transition already ended
    if (transition) {
      if (transition.cancelled) currentState = fromState;else endingTransition(fromState, toState);
    }

    transition = null;
  }

  function cancelTransition() {
    logger.log('Cancelling existing transition from {0} to {1}', transition.from, transition.to);

    transition.cancel();

    firstTransition = false;
  }

  function startingTransition(fromState, toState) {
    logger.log('Starting transition from {0} to {1}', fromState, toState);

    var from = fromState ? fromState.asPublic : null;
    var to = toState.asPublic;

    eventCallbacks.started && eventCallbacks.started(to, from);
  }

  function endingTransition(fromState, toState) {
    if (!urlChanged && !firstTransition) {
      logger.log('Updating URL: {0}', currentPathQuery);
      updateURLFromState(currentPathQuery, document.title, currentPathQuery);
    }

    firstTransition = false;

    logger.log('Transition from {0} to {1} ended', fromState, toState);

    toState.state.lastParams = toState.params;

    var from = fromState ? fromState.asPublic : null;
    var to = toState.asPublic;
    eventCallbacks.ended && eventCallbacks.ended(to, from);
  }

  function updateURLFromState(state, title, url) {
    if (isHashMode()) {
      ignoreNextURLChange = true;
      location.hash = options.hashPrefix + url;
    } else history.pushState(state, title, url);
  }

  /*
  * Return whether the passed state is the same as the current one
  * in which case the router can ignore the change.
  */
  function preventTransition(current, newState, diff) {
    if (!current) return false;

    return newState.state == current.state && Object.keys(diff.all).length == 0;
  }

  /*
  * The state wasn't found
  * Transition to the 'notFound' state if the developer specified it or else throw an error.
  */
  function notFound(state) {
    logger.log('State not found: {0}', state);

    if (options.notFound) return setState(leafStates[options.notFound], {});else throw new Error('State "' + state + '" could not be found');
  }

  /*
  * Configure the router before its initialization.
  * The available options are:
  *   enableLogs: Whether (debug and error) console logs should be enabled. Defaults to false.
  *   interceptAnchors: Whether anchor mousedown/clicks should be intercepted and trigger a state change. Defaults to true.
  *   notFound: The State to enter when no state matching the current path query or name could be found. Defaults to null.
  *   urlSync: How should the router maintain the current state and the url in sync. Defaults to true (history API).
  *   hashPrefix: Customize the hash separator. Set to '!' in order to have a hashbang like '/#!/'. Defaults to empty string.
  */
  function configure(withOptions) {
    util.mergeObjects(options, withOptions);
    return router;
  }

  /*
  * Initialize the router.
  * The router will immediately initiate a transition to, in order of priority:
  * 1) The init state passed as an argument
  * 2) The state captured by the current URL
  */
  function init(initState, initParams) {
    if (options.enableLogs || Router.log) Router.enableLogs();

    if (options.interceptAnchors) (0, _anchors2.default)(router);

    hashSlashString = '#' + options.hashPrefix + '/';

    logger.log('Router init');

    initStates();
    logStateTree();

    initState = initState !== undefined ? initState : urlPathQuery();

    logger.log('Initializing to state {0}', initState || '""');
    transitionTo(initState, initParams);

    listenToURLChanges();

    initialized = true;
    return router;
  }

  /*
  * Remove any possibility of side effect this router instance might cause.
  * Used for testing purposes.
  */
  function terminate() {
    window.onhashchange = null;
    window.onpopstate = null;
  }

  function listenToURLChanges() {

    function onURLChange(evt) {
      if (ignoreNextURLChange) {
        ignoreNextURLChange = false;
        return;
      }

      var newState = evt.state || urlPathQuery();

      logger.log('URL changed: {0}', newState);
      urlChanged = true;
      setStateForPathQuery(newState);
    }

    window[isHashMode() ? 'onhashchange' : 'onpopstate'] = onURLChange;
  }

  function initStates() {
    var stateArray = util.objectToArray(states);

    addDefaultStates(stateArray);

    eachRootState(function (name, state) {
      state.init(router, name);
    });

    assertPathUniqueness(stateArray);

    leafStates = registerLeafStates(stateArray, {});

    assertNoAmbiguousPaths();
  }

  function assertPathUniqueness(states) {
    var paths = {};

    states.forEach(function (state) {
      if (paths[state.path]) {
        var fullPaths = states.map(function (s) {
          return s.fullPath() || 'empty';
        });
        throw new Error('Two sibling states have the same path (' + fullPaths + ')');
      }

      paths[state.path] = 1;
      assertPathUniqueness(state.children);
    });
  }

  function assertNoAmbiguousPaths() {
    var paths = {};

    for (var name in leafStates) {
      var path = util.normalizePathQuery(leafStates[name].fullPath());
      if (paths[path]) throw new Error('Ambiguous state paths: ' + path);
      paths[path] = 1;
    }
  }

  function addDefaultStates(states) {
    states.forEach(function (state) {
      var children = util.objectToArray(state.states);

      // This is a parent state: Add a default state to it if there isn't already one
      if (children.length) {
        addDefaultStates(children);

        var hasDefaultState = children.reduce(function (result, state) {
          return state.path == '' || result;
        }, false);

        if (hasDefaultState) return;

        var defaultState = (0, _State2.default)({ uri: '' });
        state.states._default_ = defaultState;
      }
    });
  }

  function eachRootState(callback) {
    for (var name in states) {
      callback(name, states[name]);
    }
  }

  function registerLeafStates(states, leafStates) {
    return states.reduce(function (leafStates, state) {
      if (state.children.length) return registerLeafStates(state.children, leafStates);else {
        leafStates[state.fullName] = state;
        state.paths = util.parsePaths(state.fullPath());
        return leafStates;
      }
    }, leafStates);
  }

  /*
  * Request a programmatic state change.
  *
  * Two notations are supported:
  * transitionTo('my.target.state', {id: 33, filter: 'desc'})
  * transitionTo('target/33?filter=desc')
  */
  function transitionTo(pathQueryOrName) {
    var name = leafStates[pathQueryOrName];
    var params = (name ? arguments[1] : null) || {};
    var acc = name ? arguments[2] : arguments[1];

    logger.log('Changing state to {0}', pathQueryOrName || '""');

    urlChanged = false;

    if (name) setStateByName(name, params, acc);else setStateForPathQuery(pathQueryOrName, acc);
  }

  /*
   * Replaces the current state's params in the history with new params.
   * The state is NOT exited/re-entered.
   */
  function replaceParams(newParams) {
    if (!currentState) return;

    var newUri = router.link(currentState.state.fullName, newParams);

    currentState = (0, _StateWithParams2.default)(currentState.state, newParams, newUri);

    history.replaceState(newUri, document.title, newUri);
  }

  /*
  * Attempt to navigate to 'stateName' with its previous params or
  * fallback to the defaultParams parameter if the state was never entered.
  */
  function backTo(stateName, defaultParams, acc) {
    var params = leafStates[stateName].lastParams || defaultParams;
    transitionTo(stateName, params, acc);
  }

  function setStateForPathQuery(pathQuery, acc) {
    var state = undefined,
        params = undefined,
        _state = undefined,
        _params = undefined;

    currentPathQuery = util.normalizePathQuery(pathQuery);

    var pq = currentPathQuery.split('?');
    var path = pq[0];
    var query = pq[1];
    var paths = util.parsePaths(path);
    var queryParams = util.parseQueryParams(query);

    for (var name in leafStates) {
      _state = leafStates[name];
      _params = _state.matches(paths);

      if (_params) {
        state = _state;
        params = util.mergeObjects(_params, queryParams);
        break;
      }
    }

    if (state) setState(state, params, acc);else notFound(currentPathQuery);
  }

  function setStateByName(name, params, acc) {
    var state = leafStates[name];

    if (!state) return notFound(name);

    var pathQuery = interpolate(state, params);
    setStateForPathQuery(pathQuery, acc);
  }

  /*
  * Add a new root state to the router.
  * The name must be unique among root states.
  */
  function addState(name, state) {
    if (states[name]) throw new Error('A state already exist in the router with the name ' + name);

    state = stateTree(state);

    states[name] = state;

    // The router is already initialized: Hot patch this state in.
    if (initialized) {
      state.init(router, name);
      registerLeafStates([state], leafStates);
    }

    return router;
  }

  /*
  * Read the path/query from the URL.
  */
  function urlPathQuery() {
    var hashSlash = location.href.indexOf(hashSlashString);
    var pathQuery = undefined;

    if (hashSlash > -1) pathQuery = location.href.slice(hashSlash + hashSlashString.length);else if (isHashMode()) pathQuery = '/';else pathQuery = (location.pathname + location.search).slice(1);

    return util.normalizePathQuery(pathQuery);
  }

  function isHashMode() {
    return options.urlSync == 'hash';
  }

  /*
  * Compute a link that can be used in anchors' href attributes
  * from a state name and a list of params, a.k.a reverse routing.
  */
  function link(stateName, params) {
    var state = leafStates[stateName];
    if (!state) throw new Error('Cannot find state ' + stateName);

    var interpolated = interpolate(state, params);
    var uri = util.normalizePathQuery(interpolated);

    return isHashMode() ? '#' + options.hashPrefix + uri : uri;
  }

  function interpolate(state, params) {
    var encodedParams = {};

    for (var key in params) {
      if (params[key] !== undefined) encodedParams[key] = encodeURIComponent(params[key]);
    }

    return state.interpolate(encodedParams);
  }

  /*
  * Returns an object representing the current state of the router.
  */
  function getCurrent() {
    return currentState && currentState.asPublic;
  }

  /*
  * Returns an object representing the previous state of the router
  * or null if the router is still in its initial state.
  */
  function getPrevious() {
    return previousState && previousState.asPublic;
  }

  /*
  * Returns the diff between the current params and the previous ones.
  */
  function getParamsDiff() {
    return currentParamsDiff;
  }

  function allStatesRec(states, acc) {
    acc.push.apply(acc, states);
    states.forEach(function (state) {
      return allStatesRec(state.children, acc);
    });
    return acc;
  }

  function allStates() {
    return allStatesRec(util.objectToArray(states), []);
  }

  /*
  * Returns the state object that was built with the given options object or that has the given fullName.
  * Returns undefined if the state doesn't exist.
  */
  function findState(by) {
    var filterFn = (typeof by === 'undefined' ? 'undefined' : _typeof(by)) === 'object' ? function (state) {
      return by === state.options;
    } : function (state) {
      return by === state.fullName;
    };

    var state = allStates().filter(filterFn)[0];
    return state && state.asPublic;
  }

  /*
  * Returns whether the router is executing its first transition.
  */
  function isFirstTransition() {
    return previousState == null;
  }

  function on(eventName, cb) {
    eventCallbacks[eventName] = cb;
    return router;
  }

  function stateTrees(states) {
    return util.mapValues(states, stateTree);
  }

  /*
  * Creates an internal State object from a specification POJO.
  */
  function stateTree(state) {
    if (state.children) state.children = stateTrees(state.children);
    return (0, _State2.default)(state);
  }

  function logStateTree() {
    if (!logger.enabled) return;

    function indent(level) {
      if (level == 0) return '';
      return new Array(2 + (level - 1) * 4).join(' ') + '── ';
    }

    var stateTree = function stateTree(state) {
      var path = util.normalizePathQuery(state.fullPath());
      var pathStr = state.children.length == 0 ? ' (@ path)'.replace('path', path) : '';
      var str = indent(state.parents.length) + state.name + pathStr + '\n';
      return str + state.children.map(stateTree).join('');
    };

    var msg = '\nState tree\n\n';
    msg += util.objectToArray(states).map(stateTree).join('');
    msg += '\n';

    logger.log(msg);
  }

  // Public methods

  router.configure = configure;
  router.init = init;
  router.transitionTo = transitionTo;
  router.replaceParams = replaceParams;
  router.backTo = backTo;
  router.addState = addState;
  router.link = link;
  router.current = getCurrent;
  router.previous = getPrevious;
  router.findState = findState;
  router.isFirstTransition = isFirstTransition;
  router.paramsDiff = getParamsDiff;
  router.options = options;
  router.on = on;

  // Used for testing purposes only
  router.urlPathQuery = urlPathQuery;
  router.terminate = terminate;

  util.mergeObjects(_api2.default, router);

  return router;
}

// Logging

var logger = {
  log: util.noop,
  error: util.noop,
  enabled: false
};

Router.enableLogs = function () {
  logger.enabled = true;

  logger.log = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var message = util.makeMessage.apply(null, args);
    console.log(message);
  };

  logger.error = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var message = util.makeMessage.apply(null, args);
    console.error(message);
  };
};

exports.default = Router;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _util = __webpack_require__(8);

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PARAMS = /:[^\\?\/]*/g;

/*
* Creates a new State instance from a {uri, enter, exit, update, children} object.
* This is the internal representation of a state used by the router.
*/
function State(options) {
  var state = { options: options };
  var states = options.children;

  state.path = pathFromURI(options.uri);
  state.params = paramsFromURI(options.uri);
  state.queryParams = queryParamsFromURI(options.uri);
  state.states = states;
  state.data = options.data;

  state.enter = options.enter || util.noop;
  state.update = options.update;
  state.exit = options.exit || util.noop;

  /*
  * Initialize and freeze this state.
  */
  function init(router, name, parent) {
    state.router = router;
    state.name = name;
    state.isDefault = name == '_default_';
    state.parent = parent;
    state.parents = getParents();
    state.root = state.parent ? state.parents[state.parents.length - 1] : state;
    state.children = util.objectToArray(states);
    state.fullName = getFullName();
    state.asPublic = makePublicAPI();

    eachChildState(function (name, childState) {
      childState.init(router, name, state);
    });
  }

  /*
  * The full path, composed of all the individual paths of this state and its parents.
  */
  function fullPath() {
    var result = state.path;
    var stateParent = state.parent;

    while (stateParent) {
      if (stateParent.path) result = stateParent.path + '/' + result;
      stateParent = stateParent.parent;
    }

    return result;
  }

  /*
  * The list of all parents, starting from the closest ones.
  */
  function getParents() {
    var parents = [];
    var parent = state.parent;

    while (parent) {
      parents.push(parent);
      parent = parent.parent;
    }

    return parents;
  }

  /*
  * The fully qualified name of this state.
  * e.g granparentName.parentName.name
  */
  function getFullName() {
    var result = state.parents.reduceRight(function (acc, parent) {
      return acc + parent.name + '.';
    }, '') + state.name;

    return state.isDefault ? result.replace('._default_', '') : result;
  }

  function allQueryParams() {
    return state.parents.reduce(function (acc, parent) {
      return util.mergeObjects(acc, parent.queryParams);
    }, util.copyObject(state.queryParams));
  }

  function makePublicAPI() {
    return {
      name: state.name,
      fullName: state.fullName,
      data: options.data || {},
      parent: state.parent && state.parent.asPublic
    };
  }

  function eachChildState(callback) {
    for (var name in states) {
      callback(name, states[name]);
    }
  }

  /*
  * Returns whether this state matches the passed path Array.
  * In case of a match, the actual param values are returned.
  */
  function matches(paths) {
    var params = {};
    var nonRestStatePaths = state.paths.filter(function (p) {
      return p[p.length - 1] !== '*';
    });

    /* This state has more paths than the passed paths, it cannot be a match */
    if (nonRestStatePaths.length > paths.length) return false;

    /* Checks if the paths match one by one */
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      var thatPath = state.paths[i];

      /* This state has less paths than the passed paths, it cannot be a match */
      if (!thatPath) return false;

      var isRest = thatPath[thatPath.length - 1] === '*';
      if (isRest) {
        var name = paramName(thatPath);
        params[name] = paths.slice(i).join('/');
        return params;
      }

      var isDynamic = thatPath[0] === ':';
      if (isDynamic) {
        var name = paramName(thatPath);
        params[name] = path;
      } else if (thatPath != path) return false;
    }

    return params;
  }

  /*
  * Returns a URI built from this state and the passed params.
  */
  function interpolate(params) {
    var path = state.fullPath().replace(PARAMS, function (p) {
      return params[paramName(p)] || '';
    });

    var queryParams = allQueryParams();
    var passedQueryParams = Object.keys(params).filter(function (p) {
      return queryParams[p];
    });

    var query = passedQueryParams.map(function (p) {
      return p + '=' + params[p];
    }).join('&');

    return path + (query.length ? '?' + query : '');
  }

  function toString() {
    return state.fullName;
  }

  state.init = init;
  state.fullPath = fullPath;
  state.allQueryParams = allQueryParams;
  state.matches = matches;
  state.interpolate = interpolate;
  state.toString = toString;

  return state;
}

function paramName(param) {
  return param[param.length - 1] === '*' ? param.substr(1).slice(0, -1) : param.substr(1);
}

function pathFromURI(uri) {
  return (uri || '').split('?')[0];
}

function paramsFromURI(uri) {
  var matches = PARAMS.exec(uri);
  return matches ? util.arrayToObject(matches.map(paramName)) : {};
}

function queryParamsFromURI(uri) {
  var query = (uri || '').split('?')[1];
  return query ? util.arrayToObject(query.split('&')) : {};
}

exports.default = State;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = StateWithParams;
/*
* Creates a new StateWithParams instance.
*
* StateWithParams is the merge between a State object (created and added to the router before init)
* and params (both path and query params, extracted from the URL after init)
*
* This is an internal model The public model is the asPublic property.
*/
function StateWithParams(state, params, pathQuery, diff) {
  return {
    state: state,
    params: params,
    toString: toString,
    asPublic: makePublicAPI(state, params, pathQuery, diff)
  };
}

function makePublicAPI(state, params, pathQuery, paramsDiff) {

  /*
  * Returns whether this state or any of its parents has the given fullName.
  */
  function isIn(fullStateName) {
    var current = state;
    while (current) {
      if (current.fullName == fullStateName) return true;
      current = current.parent;
    }
    return false;
  }

  return {
    uri: pathQuery,
    params: params,
    paramsDiff: paramsDiff,
    name: state ? state.name : '',
    fullName: state ? state.fullName : '',
    data: state ? state.data : {},
    isIn: isIn
  };
}

function toString() {
  var name = this.state && this.state.fullName;
  return name + ':' + JSON.stringify(this.params);
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/*
* Create a new Transition instance.
*/
function Transition(fromStateWithParams, toStateWithParams, paramsDiff, acc, router, logger) {
  var root = { root: null, inclusive: true };
  var enters = undefined;
  var exits = undefined;

  var fromState = fromStateWithParams && fromStateWithParams.state;
  var toState = toStateWithParams.state;
  var params = toStateWithParams.params;
  var isUpdate = fromState == toState;

  var transition = {
    from: fromState,
    to: toState,
    toParams: params,
    cancel: cancel,
    run: run,
    cancelled: false,
    currentState: fromState
  };

  // The first transition has no fromState.
  if (fromState) root = transitionRoot(fromState, toState, isUpdate, paramsDiff);

  exits = fromState ? transitionStates(fromState, root) : [];
  enters = transitionStates(toState, root).reverse();

  function run() {
    startTransition(enters, exits, params, transition, isUpdate, acc, router, logger);
  }

  function cancel() {
    transition.cancelled = true;
  }

  return transition;
}

function startTransition(enters, exits, params, transition, isUpdate, acc, router, logger) {
  acc = acc || {};

  transition.exiting = true;
  exits.forEach(function (state) {
    if (isUpdate && state.update) return;
    runStep(state, 'exit', params, transition, acc, router, logger);
  });
  transition.exiting = false;

  enters.forEach(function (state) {
    var fn = isUpdate && state.update ? 'update' : 'enter';
    runStep(state, fn, params, transition, acc, router, logger);
  });
}

function runStep(state, stepFn, params, transition, acc, router, logger) {
  if (transition.cancelled) return;

  if (logger.enabled) {
    var capitalizedStep = stepFn[0].toUpperCase() + stepFn.slice(1);
    logger.log(capitalizedStep + ' ' + state.fullName);
  }

  var result = state[stepFn](params, acc, router);

  if (transition.cancelled) return;

  transition.currentState = stepFn == 'exit' ? state.parent : state;

  return result;
}

/*
* The top-most fromState's parent that must be exited
* or undefined if the two states are in distinct branches of the tree.
*/
function transitionRoot(fromState, toState, isUpdate, paramsDiff) {
  var closestCommonParent = undefined;

  var parents = [fromState].concat(fromState.parents).reverse();

  // Find the closest common parent of the from/to states, if any.
  if (!isUpdate) {
    for (var i = 0; i < fromState.parents.length; i++) {
      var parent = fromState.parents[i];

      if (toState.parents.indexOf(parent) > -1) {
        closestCommonParent = parent;
        break;
      }
    }
  }

  // Find the top-most parent owning some updated param(s) or bail if we first reach the closestCommonParent
  for (var i = 0; i < parents.length; i++) {
    var parent = parents[i];

    for (var param in paramsDiff.all) {
      if (parent.params[param] || parent.queryParams[param]) return { root: parent, inclusive: true };
    }

    if (parent === closestCommonParent) return { root: closestCommonParent, inclusive: false };
  }

  return closestCommonParent ? { root: closestCommonParent, inclusive: false } : { inclusive: true };
}

function transitionStates(state, _ref) {
  var root = _ref.root;
  var inclusive = _ref.inclusive;

  root = root || state.root;

  var p = state.parents;
  var end = Math.min(p.length, p.indexOf(root) + (inclusive ? 1 : 0));

  return [state].concat(p.slice(0, end));
}

exports.default = Transition;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = interceptAnchors;

var router = undefined;

function onMouseDown(evt) {
  var href = hrefForEvent(evt);

  if (href !== undefined) router.transitionTo(href);
}

function onMouseClick(evt) {
  var href = hrefForEvent(evt);

  if (href !== undefined) {
    evt.preventDefault();
    router.transitionTo(href);
  }
}

function hrefForEvent(evt) {
  if (evt.defaultPrevented || evt.metaKey || evt.ctrlKey || !isLeftButton(evt)) return;

  var target = evt.target;
  var anchor = anchorTarget(target);
  if (!anchor) return;

  var dataNav = anchor.getAttribute('data-nav');

  if (dataNav == 'ignore') return;
  if (evt.type == 'mousedown' && dataNav != 'mousedown') return;

  var href = anchor.getAttribute('href');

  if (!href) return;
  if (href.charAt(0) == '#') {
    if (router.options.urlSync != 'hash') return;
    href = href.slice(1);
  }
  if (anchor.getAttribute('target') == '_blank') return;
  if (!isLocalLink(anchor)) return;

  // At this point, we have a valid href to follow.
  // Did the navigation already occur on mousedown though?
  if (evt.type == 'click' && dataNav == 'mousedown') {
    evt.preventDefault();
    return;
  }

  return href;
}

function isLeftButton(evt) {
  return evt.which == 1;
}

function anchorTarget(target) {
  while (target) {
    if (target.nodeName == 'A') return target;
    target = target.parentNode;
  }
}

function isLocalLink(anchor) {
  var hostname = anchor.hostname;
  var port = anchor.port;

  // IE10 can lose the hostname/port property when setting a relative href from JS
  if (!hostname) {
    var tempAnchor = document.createElement("a");
    tempAnchor.href = anchor.href;
    hostname = tempAnchor.hostname;
    port = tempAnchor.port;
  }

  var sameHostname = hostname == location.hostname;
  var samePort = (port || '80') == (location.port || '80');

  return sameHostname && samePort;
}

function interceptAnchors(forRouter) {
  router = forRouter;

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('click', onMouseClick);
}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"icon":"icon-icon-3r0Lq"};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"increment":"blue-increment-3iUag"};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"input":"green-input-5eg1C","popupButton":"green-popupButton-Ajq6P"};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"list":"list-list-3-_up"};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"red":"red-red-2BgdA"};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"fadeScaleIn":"fadeScale-fadeScaleIn-AohB7","fadeScaleOut":"fadeScale-fadeScaleOut-1CU8l"};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"fadein":"fade-fadein-3c-V0","fadeout":"fade-fadeout-3E8pi"};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"slideDown":"slideDown-slideDown-3BiP5"};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"icon":"button-icon-2UP4I"};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"link":"link-link-30G3W","active":"link-active-LUcc-"};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"loader":"loader-loader-1Rxxh","spin":"loader-spin-2JA5R"};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"overlay":"popup-overlay-2_aAp","popup":"popup-popup-2rIS8","insertAnimation":"popup-insertAnimation-p2776","removeAnimation":"popup-removeAnimation-34fmA"};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"dropdown":"select-dropdown-2PBt2","li":"select-li-gWjPG","scroller":"select-scroller-BIHkj","loaderContainer":"select-loaderContainer-2OUFf","insertAnimation":"select-insertAnimation-35zh-","removeAnimation":"select-removeAnimation-1HR6Z"};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = Component;

var _h = __webpack_require__(5);

var _h2 = _interopRequireDefault(_h);

var _render = __webpack_require__(17);

var _util = __webpack_require__(10);

var _messages = __webpack_require__(16);

var _messages2 = _interopRequireDefault(_messages);

var _observable = __webpack_require__(1);

var _store = __webpack_require__(11);

var _store2 = _interopRequireDefault(_store);

var _log = __webpack_require__(6);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var empty = {};

function Component(options) {
  var name = options.name,
      _options$props = options.props,
      props = _options$props === undefined ? empty : _options$props,
      _options$sel = options.sel,
      sel = _options$sel === undefined ? 'component' : _options$sel,
      initState = options.initState,
      connect = options.connect,
      render = options.render;


  var key = props.key === undefined ? name : name + '_' + props.key;

  var data = {
    key: key,
    hook: { insert: insert, postpatch: postpatch, destroy: destroy },
    component: { props: props, initState: initState, connect: connect, render: render, key: name },
    attrs: { name: name }
  };

  // An empty placeholder is returned, and that's all our parent is going to see.
  // Each component handles its own internal rendering.
  var compVnode = (0, _h2.default)(sel, data);
  data.component.compVnode = compVnode;
  return compVnode;
}

function insert(vnode) {
  var component = vnode.data.component;
  var props = component.props,
      initState = component.initState,
      connect = component.connect;


  var connected = false;

  // Lookup from HTML Element to component, used in DOM-based messaging
  vnode.elm.__comp__ = component;

  // Store the component depth once it's attached to the DOM so we can render
  // component hierarchies in a predictive (top -> down) manner.
  component.depth = getDepth(vnode.elm);

  // Internal callbacks
  component.lifecycle = {
    rendered: rendered
  };

  var messages = new _messages2.default(vnode.elm);

  component.elm = vnode.elm;
  component.messages = messages;

  var propsObservable = (0, _observable.Observable)(function (add) {
    add(component.props);
    component.lifecycle.propsChanged = add;
  }).named('props');

  // Eagerly subscribe so that the observable get its first value and we honour
  // the ObservableWithInitialValue interface contract.
  propsObservable.subscribe(function (x) {
    return x;
  });

  component.store = (0, _store2.default)(initState(props), function (on, msg) {
    messages.storeMsg = msg;

    var connectParams = {
      on: on,
      props: propsObservable,
      msg: messages
    };

    connect(connectParams);
    connected = true;

    // First render.
    // Render right after our parent (which is in the middle of a patch)
    // so that we honour the snabbdom's insert hook,
    // e.g we get patched into our parent after our parent was added to the document.
    (0, _render.renderNewComponentNow)(component);
  }, {
    name: component.key,
    log: (0, _log.shouldLog)(_log2.default.message, component.key)
  });

  component.store.state.sliding2().subscribe(function (_ref) {
    var newState = _ref[0],
        oldState = _ref[1];


    var shouldRender =
    // Skip the first notification (hot observable)
    oldState &&
    // synchronous observables triggering before the first render should just be accumulated
    connected &&
    // the props observable triggered, a synchronous render is made right after so skip
    !component.lifecycle.propsChanging &&
    // null update
    !(0, _util.shallowEqual)(oldState, newState);

    if (shouldRender) (0, _render.renderComponentNextFrame)(component);
  });
}

// Called on every parent re-render, this is where the props passed by the component's parent may have changed.
function postpatch(oldVnode, vnode) {
  var oldData = oldVnode.data;
  var newData = vnode.data;

  // Server side rendering: Reconcilating with a server-rendered node will have skipped calling insert()
  if (!oldData.component) {
    insert(vnode);
  }

  // oldData wouldn't have a component reference set if it came from the server (it's first set in insert())
  var component = oldData.component || newData.component;
  var oldProps = component.props;
  var newProps = newData.component.props;

  // Update the original component with any property that may have changed during this render pass
  component.props = newProps;

  newData.component = component;

  // If the props changed, render immediately as we are already
  // in the render context of our parent
  if (!(0, _util.shallowEqual)(oldProps, newProps)) {

    component.lifecycle.propsChanging = true;
    component.lifecycle.propsChanged(newProps);
    component.lifecycle.propsChanging = false;

    (0, _render.renderComponentNow)(component);
  }
}

function rendered(component, newVnode) {
  // Store the new vnode inside the component so we can diff it next render
  component.vnode = newVnode;

  // For now, only lift the hook of non Array render outputs
  if (newVnode && !Array.isArray(newVnode)) {
    // Lift any 'remove' hook to our placeholder vnode for it to be called
    // as the placeholder is all our parent vnode knows about.
    // TODO: Call all the hooks of an Array VNode?
    var hook = newVnode.data.hook && newVnode.data.hook.remove;
    if (hook) component.compVnode.data.hook.remove = hook;
  }
}

function destroy(vnode) {
  var comp = vnode.data.component;
  comp.vnode.elm.__comp__ = null;

  Array.isArray(comp.vnode) ? comp.vnode.forEach(destroyVnode) : destroyVnode(comp.vnode);

  comp.store.destroy();

  comp.destroyed = true;
}

// Destroy our vnode recursively
// Note: Can't invoke modules' destroy hook as they're hidden in snabbdom's closure.
// The default modules don't do anything in destroy() anyway.
function destroyVnode(vnode) {
  if (!vnode) return;

  var data = vnode.data;

  if (!data) return;

  if (data.hook && data.hook.destroy) data.hook.destroy(vnode);
  if (vnode.children) vnode.children.forEach(destroyVnode);
}

function getDepth(elm) {
  var depth = 0;
  var parent = elm.parentElement;
  while (parent) {
    depth++;
    parent = parent.parentElement;
  }
  return depth;
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.eventsModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = __webpack_require__(10);

var _messages = __webpack_require__(16);

/* snabbdom module extension used to register Messages as event listeners */

function updateEventListeners(oldVnode, vnode) {
  var oldEvents = oldVnode.data.events;
  var events = vnode.data.events;

  if (!events) return;

  var _loop = function _loop() {
    var current = events[name];
    var old = oldEvents && oldEvents[name];

    if (old !== current) {

      if (old && current && isSameMessageAndPayload(current, current.payload, old, old.payload)) return {
          v: void 0
        };

      vnode.elm['on' + name] = current ? function (evt) {
        return (0, _messages._sendToElement)(evt.currentTarget, current(evt));
      } : null;
    }
  };

  for (name in events) {
    var _ret = _loop();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  if (!oldEvents) return;

  for (name in oldEvents) {
    if (events[name] == null) vnode.elm['on' + name] = null;
  }
}

function isSameMessageAndPayload(message, payload, oldMessage, oldPayload) {
  return message._id === oldMessage._id && payload === oldPayload;
}

var eventsModule = exports.eventsModule = {
  create: updateEventListeners,
  update: updateEventListeners
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = debounce;
exports.debounceFunction = debounceFunction;

var _ = __webpack_require__(1);

function debounce(wait, source) {
  return (0, _.Observable)(function (add) {
    var debouncedAdd = debounceFunction(wait, add);
    var unsubscribe = source.subscribe(debouncedAdd);

    return function () {
      unsubscribe();
      debouncedAdd.cancel();
    };
  });
}

function debounceFunction(wait, func) {
  var timeout = void 0;

  var debounced = function debounced() {
    var args = arguments;

    var later = function later() {
      timeout = undefined;
      func.apply(null, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debounced.cancel = function () {
    return clearTimeout(timeout);
  };
  return debounced;
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = delay;

var _ = __webpack_require__(1);

function delay(delayValue, source) {
  return (0, _.Observable)(function (add) {
    var currentTimeouts = [];

    var unsubSource = source.subscribe(function (val, name) {

      var timeout = setTimeout(function () {
        var index = currentTimeouts.indexOf(timeout);
        currentTimeouts.splice(index, 1);
        add(val, name);
      }, delayValue);

      currentTimeouts.push(timeout);
    });

    return function () {
      currentTimeouts.forEach(function (timeout) {
        return clearTimeout(timeout);
      });
      unsubSource();
    };
  });
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = drop;

var _ = __webpack_require__(1);

function drop(count, source) {
  return (0, _.Observable)(function (add) {
    var dropped = 0;
    return source.subscribe(function (val, name) {
      if (dropped++ >= count) add(val, name);
    });
  });
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = filter;

var _ = __webpack_require__(1);

function filter(predicate, source) {
  return (0, _.Observable)(function (add) {
    return source.subscribe(function (val, name) {
      if (predicate(val)) add(val, name);
    });
  });
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = flatMapLatest;

var _ = __webpack_require__(1);

function flatMapLatest(mapper, source) {
  return (0, _.Observable)(function (add) {
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

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = fromEvent;

var _ = __webpack_require__(1);

var _util = __webpack_require__(10);

function fromEvent(name, el, childSelector) {
  return (0, _.Observable)(function (add) {

    var obsName = childSelector ? 'fromEvent[type=' + name + ', selector=' + childSelector + ']' : 'fromEvent[type=' + name + ']';

    var handler = childSelector ? function (evt) {
      if (targetMatches(evt.target, childSelector, el)) add(evt, obsName);
    } : function (evt) {
      return add(evt, obsName);
    };

    var useCapture = childSelector && name in nonBubblingEvents;

    el.addEventListener(name, handler, useCapture);
    return function () {
      return el.removeEventListener(name, handler, useCapture);
    };
  });
}

var nonBubblingEvents = (0, _util.Set)('blur', 'canplay', 'canplaythrough', 'change', 'durationchange', 'emptied', 'ended', 'focus', 'load', 'loadeddata', 'loadedmetadata', 'mouseenter', 'mouseleave', 'pause', 'play', 'playing', 'ratechange', 'reset', 'scroll', 'seeked', 'seeking', 'stalled', 'submit', 'suspend', 'timeupdate', 'unload', 'volumechange', 'waiting');

var proto = typeof window !== 'undefined' && Element ? Element.prototype : {};
var nativeMatches = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

function matches(el, selector) {
  return nativeMatches.call(el, selector);
}

function targetMatches(target, selector, root) {
  for (var el = target; el && el !== root; el = el.parentElement) {
    if (matches(el, selector)) return true;
  }
  return false;
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = fromPromise;

var _ = __webpack_require__(1);

function fromPromise(promise) {
  return (0, _.Observable)(function (add) {
    var active = true;

    promise.then(function (value) {
      if (active) add({ type: 'success', value: value });
    }, function (error) {
      if (active) add({ type: 'failure', error: error });
    });

    return function () {
      active = false;
    };
  }).named('fromPromise');
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = interval;

var _ = __webpack_require__(1);

function interval(time) {
  return (0, _.Observable)(function (add) {
    var intervalId = setInterval(add, time);
    return function () {
      return clearInterval(intervalId);
    };
  }).named('interval');
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = map;

var _ = __webpack_require__(1);

function map(mapper, source) {
  return (0, _.Observable)(function (add) {
    return source.subscribe(function (val, name) {
      return add(mapper(val), name);
    });
  });
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = merge;

var _ = __webpack_require__(1);

function merge() {
  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return (0, _.Observable)(function (add) {
    var unsubs = sources.map(function (obs) {
      return obs.subscribe(add);
    });
    return function () {
      return unsubs.forEach(function (unsub) {
        return unsub();
      });
    };
  });
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = partition;

var _ = __webpack_require__(1);

function partition(predicate, source) {
  return [(0, _.Observable)(function (add) {
    return source.subscribe(function (value, name) {
      if (predicate(value)) add(value, name);
    });
  }), (0, _.Observable)(function (add) {
    return source.subscribe(function (value, name) {
      if (!predicate(value)) add(value, name);
    });
  })];
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = pure;

var _ = __webpack_require__(1);

function pure(value) {
  return (0, _.Observable)(function (add) {
    return add(value);
  }).named('pure');
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.sliding2 = sliding2;
exports.default = sliding;

var _ = __webpack_require__(1);

function sliding2(source) {
  return sliding(2, source);
}

function sliding(size, source) {
  var window = [];

  return (0, _.Observable)(function (add) {
    return source.subscribe(function (val, name) {
      window = [val].concat(window);
      window = window.slice(0, size);
      add(window, name);
    });
  });
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = throttle;
exports.throttleFunction = throttleFunction;

var _ = __webpack_require__(1);

function throttle(wait, source) {
  return (0, _.Observable)(function (add) {
    var throttledAdd = throttleFunction(wait, add);
    var unsubscribe = source.subscribe(throttledAdd);

    return function () {
      unsubscribe();
      throttledAdd.cancel();
    };
  });
}

function throttleFunction(wait, func) {
  var lastCallTime = void 0;
  var timeout = void 0;
  var args = void 0;

  var throttled = function throttled() {
    // Always use the latest arguments, even in an already scheduled call
    args = arguments;

    // A throttled call is already scheduled, noop
    if (timeout !== undefined) return;

    var delta = lastCallTime ? wait - Date.now() + lastCallTime : 0;

    timeout = setTimeout(function () {
      timeout = undefined;
      lastCallTime = Date.now();
      func.apply(null, args);
    }, delta);
  };

  throttled.cancel = function () {
    return clearTimeout(timeout);
  };
  return throttled;
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NamespaceURIs = {
    "xlink": "http://www.w3.org/1999/xlink"
};
var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare",
    "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable",
    "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple",
    "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly",
    "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate",
    "truespeed", "typemustmatch", "visible"];
var booleanAttrsDict = Object.create(null);
for (var i = 0, len = booleanAttrs.length; i < len; i++) {
    booleanAttrsDict[booleanAttrs[i]] = true;
}
function updateAttrs(oldVnode, vnode) {
    var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs, namespaceSplit;
    if (!oldAttrs && !attrs)
        return;
    if (oldAttrs === attrs)
        return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];
        if (old !== cur) {
            if (booleanAttrsDict[key]) {
                if (cur) {
                    elm.setAttribute(key, "");
                }
                else {
                    elm.removeAttribute(key);
                }
            }
            else {
                namespaceSplit = key.split(":");
                if (namespaceSplit.length > 1 && NamespaceURIs.hasOwnProperty(namespaceSplit[0])) {
                    elm.setAttributeNS(NamespaceURIs[namespaceSplit[0]], key, cur);
                }
                else {
                    elm.setAttribute(key, cur);
                }
            }
        }
    }
    // remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
exports.attributesModule = { create: updateAttrs, update: updateAttrs };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.attributesModule;
//# sourceMappingURL=attributes.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function updateClass(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
exports.classModule = { create: updateClass, update: updateClass };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.classModule;
//# sourceMappingURL=class.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function updateProps(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;
    if (!oldProps && !props)
        return;
    if (oldProps === props)
        return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
exports.propsModule = { create: updateProps, update: updateProps };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.propsModule;
//# sourceMappingURL=props.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var vnode_1 = __webpack_require__(7);
var is = __webpack_require__(19);
var htmldomapi_1 = __webpack_require__(18);
function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = vnode_1.default('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
var h_1 = __webpack_require__(5);
exports.h = h_1.h;
var thunk_1 = __webpack_require__(65);
exports.thunk = thunk_1.thunk;
function init(modules, domApi) {
    var i, j, cbs = {};
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return vnode_1.default(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.id = sel.slice(hash + 1, dot);
            if (dotIdx > 0)
                elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode);
            if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create)
                    i.create(emptyNode, vnode);
                if (i.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i, j, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
            if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i = vnode.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode)
            return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode;
    };
}
exports.init = init;
//# sourceMappingURL=snabbdom.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var h_1 = __webpack_require__(5);
function copyToThunk(vnode, thunk) {
    thunk.elm = vnode.elm;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vnode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    var i, old = oldVnode.data, cur = thunk.data;
    var oldArgs = old.args, args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
exports.thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return h_1.h(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.thunk;
//# sourceMappingURL=thunk.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var vnode_1 = __webpack_require__(7);
var htmldomapi_1 = __webpack_require__(18);
function toVNode(node, domApi) {
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    var text;
    if (api.isElement(node)) {
        var id = node.id ? '#' + node.id : '';
        var cn = node.getAttribute('class');
        var c = cn ? '.' + cn.split(' ').join('.') : '';
        var sel = api.tagName(node).toLowerCase() + id + c;
        var attrs = {};
        var children = [];
        var name_1;
        var i = void 0, n = void 0;
        var elmAttrs = node.attributes;
        var elmChildren = node.childNodes;
        for (i = 0, n = elmAttrs.length; i < n; i++) {
            name_1 = elmAttrs[i].nodeName;
            if (name_1 !== 'id' && name_1 !== 'class') {
                attrs[name_1] = elmAttrs[i].nodeValue;
            }
        }
        for (i = 0, n = elmChildren.length; i < n; i++) {
            children.push(toVNode(elmChildren[i]));
        }
        return vnode_1.default(sel, { attrs: attrs }, children, undefined, node);
    }
    else if (api.isText(node)) {
        text = api.getTextContent(node);
        return vnode_1.default(undefined, undefined, undefined, text, node);
    }
    else if (api.isComment(node)) {
        text = api.getTextContent(node);
        return vnode_1.default('!', undefined, undefined, text, undefined);
    }
    else {
        return vnode_1.default('', {}, [], undefined, undefined);
    }
}
exports.toVNode = toVNode;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = toVNode;
//# sourceMappingURL=tovnode.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Appends one item at the end of the Array.
 */
function append(item) {
    return new _1.ArrayOps(this.value().concat(item));
}
exports.append = append;
_1.ArrayOps.prototype.append = append;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Appends an Array of items at the end of the Array.
 */
function appendAll(items) {
    return new _1.ArrayOps(this.value().concat(items));
}
exports.appendAll = appendAll;
_1.ArrayOps.prototype.appendAll = appendAll;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Filters all the falsy elements out of this Array.
 * All occurences of false, null, undefined, 0, "" will be removed.
 */
function compact() {
    return this.filter(function (x) { return !!x; });
}
exports.compact = compact;
_1.ArrayOps.prototype.compact = compact;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Counts the items satisfying a predicate.
 */
function count(predicate) {
    var arr = this.value(), result = 0;
    for (var i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i))
            result++;
    }
    return new _1.NumberOps(result);
}
exports.count = count;
_1.ArrayOps.prototype.count = count;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Creates an array without any duplicate item.
 * If a key function is passed, items will be compared based on the result of that function;
 * if not, they will be compared using strict equality.
 */
function distinct(getKey) {
    var arr = this.value(), result = [];
    var keySet;
    var refList;
    if (getKey)
        keySet = {};
    else
        refList = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (getKey) {
            var key = getKey(item, i);
            if (!keySet[key]) {
                keySet[key] = 1;
                result.push(item);
            }
        }
        else {
            if (refList.indexOf(item) === -1) {
                refList.push(item);
                result.push(item);
            }
        }
    }
    return new _1.ArrayOps(result);
}
exports.distinct = distinct;
_1.ArrayOps.prototype.distinct = distinct;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Drops the first 'count' items from this Array.
 */
function drop(count) {
    return new _1.ArrayOps(this.value().slice(count));
}
exports.drop = drop;
_1.ArrayOps.prototype.drop = drop;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Drops the last 'count' items from this Array.
 */
function dropRight(count) {
    return new _1.ArrayOps(this.value().slice(0, -count));
}
exports.dropRight = dropRight;
_1.ArrayOps.prototype.dropRight = dropRight;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Returns whether all items satisfies the predicate.
 */
function every(predicate) {
    var arr = this.value();
    for (var i = 0; i < arr.length; i++) {
        if (!predicate(arr[i], i))
            return new _1.BoolOps(false);
    }
    return new _1.BoolOps(true);
}
exports.every = every;
_1.ArrayOps.prototype.every = every;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Filters this array by aplying a predicate to all items.
 */
function filter(predicate) {
    var arr = this.value(), result = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate(item, i))
            result.push(item);
    }
    return new _1.ArrayOps(result);
}
exports.filter = filter;
_1.ArrayOps.prototype.filter = filter;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var option_ts_1 = __webpack_require__(3);
var _1 = __webpack_require__(0);
/**
 * Finds the first item in this Array satisfying a predicate.
 */
function find(predicate) {
    var arr = this.value();
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate(item, i))
            return option_ts_1.Option(item);
    }
    return option_ts_1.None;
}
exports.find = find;
_1.ArrayOps.prototype.find = find;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var option_ts_1 = __webpack_require__(3);
var _1 = __webpack_require__(0);
/**
 * Finds the first item index in this Array satisfying a predicate.
 */
function findIndex(predicate) {
    var arr = this.value();
    for (var i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i))
            return option_ts_1.Option(i);
    }
    return option_ts_1.None;
}
exports.findIndex = findIndex;
_1.ArrayOps.prototype.findIndex = findIndex;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var option_ts_1 = __webpack_require__(3);
var _1 = __webpack_require__(0);
/**
 * Returns the first item of this Array, as an Option.
 */
function first() {
    return option_ts_1.Option(this.value()[0]);
}
exports.first = first;
_1.ArrayOps.prototype.first = first;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var option_ts_1 = __webpack_require__(3);
var _1 = __webpack_require__(0);
/**
 * Maps this Array to an Array of Array | Option | Wrapper using a mapper function then flattens it.
 */
function flatMap(fun) {
    var arr = this.value(), result = [];
    for (var i = 0; i < arr.length; i++) {
        var item = fun(arr[i], i);
        if (option_ts_1.Option.isOption(item))
            item.isDefined() && result.push(item.get());
        else
            result.push.apply(result, _1.getValue(item));
    }
    return new _1.ArrayOps(result);
}
exports.flatMap = flatMap;
_1.ArrayOps.prototype.flatMap = flatMap;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var option_ts_1 = __webpack_require__(3);
var _1 = __webpack_require__(0);
/**
 * Flattens this Array of Arrays/Options.
 */
function flatten() {
    var arr = this.value(), result = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (option_ts_1.Option.isOption(item))
            item.isDefined() && result.push(item.get());
        else
            result.push.apply(result, item);
    }
    return new _1.ArrayOps(result);
}
exports.flatten = flatten;
_1.ArrayOps.prototype.flatten = flatten;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Folds this Array into a single value, using a starting value.
 */
function fold(startValue, func) {
    var arr = this.value(), result = startValue;
    for (var i = 0; i < arr.length; i++) {
        result = func(result, arr[i], i);
    }
    return _1["default"](result);
}
exports.fold = fold;
_1.ArrayOps.prototype.fold = fold;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Folds this Array into a single value, using a starting value, from the right.
 */
function foldRight(startValue, func) {
    var arr = this.value(), result = startValue, i = arr.length;
    while (i--) {
        result = func(result, arr[i], i);
    }
    return _1["default"](result);
}
exports.foldRight = foldRight;
_1.ArrayOps.prototype.foldRight = foldRight;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var option_ts_1 = __webpack_require__(3);
var _1 = __webpack_require__(0);
/**
 * Returns the item found at the provided index, as an Option.
 */
function get(index) {
    return option_ts_1.Option(this.value()[index]);
}
exports.get = get;
_1.ArrayOps.prototype.get = get;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
* Creates an object composed of keys generated from the results of running each element through a discriminator function.
* The corresponding value of each key is an array of the elements responsible for generating the key.
*/
function groupBy(discriminator) {
    var arr = this.value(), groups = {};
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var key = discriminator(item, i);
        if (!groups[key])
            groups[key] = [];
        groups[key].push(item);
    }
    return new _1.ObjectOps(groups);
}
exports.groupBy = groupBy;
_1.ArrayOps.prototype.groupBy = groupBy;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Insert an item at a specified index.
 */
function insert(index, item) {
    var result = this.value().slice();
    result.splice(index, 0, item);
    return new _1.ArrayOps(result);
}
exports.insert = insert;
_1.ArrayOps.prototype.insert = insert;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Insert an Array of items at a specified index.
 */
function insertAll(index, items) {
    var result = this.value().slice();
    result.splice.apply(result, [index, 0].concat(items));
    return new _1.ArrayOps(result);
}
exports.insertAll = insertAll;
_1.ArrayOps.prototype.insertAll = insertAll;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Joins the items into a string, using a separator.
 */
function join(separator) {
    if (separator === void 0) { separator = ','; }
    return new _1.StringOps(this.value().join(separator));
}
exports.join = join;
_1.ArrayOps.prototype.join = join;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var option_ts_1 = __webpack_require__(3);
var _1 = __webpack_require__(0);
/**
 * Returns the last item of this Array, as an Option.
 */
function last() {
    var arr = this.value();
    return option_ts_1.Option(arr[arr.length - 1]);
}
exports.last = last;
_1.ArrayOps.prototype.last = last;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Maps this Array using a mapper function.
 */
function map(fun) {
    var arr = this.value(), result = [];
    for (var i = 0; i < arr.length; i++) {
        result[i] = _1.getValue(fun(arr[i], i));
    }
    return new _1.ArrayOps(result);
}
exports.map = map;
_1.ArrayOps.prototype.map = map;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Removes the item found at the specified index.
 */
function removeAt(index) {
    var result = this.value().slice();
    result.splice(index, 1);
    return new _1.ArrayOps(result);
}
exports.removeAt = removeAt;
_1.ArrayOps.prototype.removeAt = removeAt;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Reverses the Array.
 */
function reverse() {
    return new _1.ArrayOps(this.value().slice().reverse());
}
exports.reverse = reverse;
_1.ArrayOps.prototype.reverse = reverse;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Returns whether at least one item satisfies the predicate.
 */
function some(predicate) {
    var arr = this.value();
    for (var i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i))
            return new _1.BoolOps(true);
    }
    return new _1.BoolOps(false);
}
exports.some = some;
_1.ArrayOps.prototype.some = some;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
* Sorts the Array. The sort is stable.
* If you want to sort on field "a" then on field "b", just chain a sort on "b" then a sort on "a".
*
* An option Object can be passed to modify the sort behavior.
* The supported options are:
*
* ignoreCase: Assuming strings are going to be sorted, ignore their cases. Defaults to false.
*
* localCompare: Assuming strings are going to be sorted,
*   handle locale-specific characters correctly at the cost of reduced sort speed. Defaults to false.
*
* by: Assuming objects are being sorted, a function either pointing to or computing the value
*   that should be used for the sort. Defaults to undefined.
*
* reverse: Reverses the sort. Defaults to false.
*/
function sort(options) {
    var arr = this.value();
    var o = options || {};
    var mapped = [];
    var missingData = [];
    var result = [];
    var sortFunction;
    for (var i = 0, length = arr.length; i < length; i++) {
        var item = arr[i];
        var originalItem = item;
        if (o.by && item)
            item = o.by(item);
        if (item === null || item === undefined || item === '') {
            missingData.push(originalItem);
            continue;
        }
        mapped.push({
            index: i,
            value: o.ignoreCase ? item.toUpperCase() : item
        });
    }
    if (o.localeCompare) {
        sortFunction = function (a, b) {
            if (a.value !== b.value)
                return a.value.localeCompare(b.value);
            else
                return a.index < b.index ? -1 : 1;
        };
    }
    else {
        sortFunction = function (a, b) {
            if (a.value !== b.value)
                return a.value < b.value ? -1 : 1;
            else
                return a.index < b.index ? -1 : 1;
        };
    }
    mapped.sort(sortFunction);
    for (var i = 0, length = mapped.length; i < length; i++) {
        result.push(arr[mapped[i].index]);
    }
    if (missingData.length)
        result = result.concat(missingData);
    if (o.reverse)
        result.reverse();
    return new _1.ArrayOps(result);
}
exports.sort = sort;
_1.ArrayOps.prototype.sort = sort;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Takes the first 'count' items from this Array.
 */
function take(count) {
    return new _1.ArrayOps(this.value().slice(0, count));
}
exports.take = take;
_1.ArrayOps.prototype.take = take;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Takes the last 'count' items from this Array.
 */
function takeRight(count) {
    var arr = this.value();
    return new _1.ArrayOps((arr.length < count)
        ? arr.slice(0)
        : arr.slice(arr.length - count));
}
exports.takeRight = takeRight;
_1.ArrayOps.prototype.takeRight = takeRight;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Converts this Array of numbers or strings to a Set-like object where values are all truthy.
 */
function toSet() {
    var arr = this.value(), result = {};
    for (var i = 0; i < arr.length; i++) {
        result[arr[i]] = true;
    }
    return new _1.ObjectOps(result);
}
exports.toSet = toSet;
_1.ArrayOps.prototype.toSet = toSet;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Updates an item at the specified index.
 */
function updateAt(index, updater) {
    var result = this.value().slice();
    if (result.length > index)
        result[index] = _1.getValue(updater(result[index]));
    return new _1.ArrayOps(result);
}
exports.updateAt = updateAt;
_1.ArrayOps.prototype.updateAt = updateAt;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Adds a key/value to this "Map" object.
 * To update an object while preserving its type, use "update()" instead.
 */
function add(key, value) {
    var obj = this.value(), result = {};
    Object.keys(obj).forEach(function (key) { result[key] = obj[key]; });
    result[key] = value;
    return new _1.ObjectOps(result);
}
exports.add = add;
_1.ObjectOps.prototype.add = add;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Filter keys/values of a "Map" object
 */
function filter(predicate) {
    var obj = this.value(), result = {};
    Object.keys(obj).forEach(function (key) {
        var value = obj[key];
        if (predicate(key, value))
            result[key] = value;
    });
    return new _1.ObjectOps(result);
}
exports.filter = filter;
_1.ObjectOps.prototype.filter = filter;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var option_ts_1 = __webpack_require__(3);
var _1 = __webpack_require__(0);
/**
 * Returns the value found at the provided key, as an Option.
 * Usage 1: read a value from a "Map" object
 * Usage 2: read an optional value from a domain object
 */
function get(key) {
    return option_ts_1.Option(this.value()[key]);
}
exports.get = get;
_1.ObjectOps.prototype.get = get;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Creates an Array of all this object's keys, in no particular order.
 */
function keys() {
    return new _1.ArrayOps(Object.keys(this.value()));
}
exports.keys = keys;
_1.ObjectOps.prototype.keys = keys;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Maps all the values of this object.
 */
function mapValues(mapper) {
    var obj = this.value(), result = {};
    Object.keys(obj).forEach(function (key) {
        var value = mapper(key, obj[key]);
        result[key] = value;
    });
    return new _1.ObjectOps(result);
}
exports.mapValues = mapValues;
_1.ObjectOps.prototype.mapValues = mapValues;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Returns an Object where the given keys are removed.
 * To delete a nullable key from an object while preserving its type, use "update()"
 */
function remove() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    var obj = this.value(), result = {};
    Object.keys(obj).forEach(function (key) { if (keys.indexOf(key) === -1)
        result[key] = obj[key]; });
    return new _1.ObjectOps(result);
}
exports.remove = remove;
_1.ObjectOps.prototype.remove = remove;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Converts this object to an Array of tuples.
 */
function toArray() {
    var obj = this.value(), result = [];
    Object.keys(obj).forEach(function (key) {
        result.push([key, obj[key]]);
    });
    return new _1.ArrayOps(result);
}
exports.toArray = toArray;
_1.ObjectOps.prototype.toArray = toArray;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var immupdate_1 = __webpack_require__(9);
var _1 = __webpack_require__(0);
/**
 * Updates an object properties shallowly.
 * This delegates to "immupdate", see https://github.com/AlexGalays/immupdate
 */
function update(spec) {
    return new _1.ObjectOps(immupdate_1.update(this.value(), spec));
}
exports.update = update;
_1.ObjectOps.prototype.update = update;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Creates an Array of all this object's values.
 */
function values() {
    var obj = this.value(), result = [];
    Object.keys(obj).forEach(function (key) {
        result.push(obj[key]);
    });
    return new _1.ArrayOps(result);
}
exports.values = values;
_1.ObjectOps.prototype.values = values;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
/**
 * Runs an arbitrary transformation.
 */
function transform(func) {
    return _1["default"](func(this.value()));
}
exports.transform = transform;
_1.NumberOps.prototype.transform = transform;
_1.StringOps.prototype.transform = transform;
_1.BoolOps.prototype.transform = transform;
_1.ArrayOps.prototype.transform = transform;
_1.ObjectOps.prototype.transform = transform;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(31);
var kaiju_1 = __webpack_require__(2);
exports.editIcon = function () { return (kaiju_1.h('svg', { attrs: { class: styles.icon, viewBox: '0 0 24 24' } }, [
    kaiju_1.h('path', { attrs: { d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02\n      0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" } })
])); };


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(108));


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* tslint:disable:no-any */

Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = __webpack_require__(1);
var remoteData_1 = __webpack_require__(12);
/**
 * Creates a data, error and loading observables out of a one-off or recurrent ajax call
 */
function observeAjax(options) {
    var name = options.name, ajax = options.ajax;
    var call = observable_1.Observable();
    var hasCallNowWith = ('callNowWith' in options) || ('callNow' in options);
    var trigger = hasCallNowWith
        ? observable_1.Observable.merge(call, observable_1.Observable.pure(options.callNowWith))
        : call;
    var result = trigger.flatMapLatest(function (arg) { return observable_1.Observable.fromPromise(ajax(arg)); }).map(function (r) {
        return r.type === 'success' ? remoteData_1.Success(r.value) : remoteData_1.Failure(r.error);
    });
    var loading = trigger.map(function (_) { return remoteData_1.Loading; });
    var notAsked = hasCallNowWith ? observable_1.Observable() : observable_1.Observable.pure(remoteData_1.NotAsked);
    var data = observable_1.Observable.merge(notAsked, loading, result);
    return {
        data: data.named(name + '_remoteData'),
        call: function (value) { call(value); } // We want call() to return undefined so it can easily be used inside Store handlers.
    };
}
exports.default = observeAjax;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function findParentByAttr(attr, from) {
    while (from && from.getAttribute) {
        if (from.getAttribute(attr))
            return from;
        from = from.parentElement;
    }
}
exports.findParentByAttr = findParentByAttr;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function delay(value) {
    return new Promise(function (resolve) {
        setTimeout(resolve, value);
    });
}
exports.delay = delay;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var abyssa_1 = __webpack_require__(14);
var kaiju_1 = __webpack_require__(2);
var space_lift_1 = __webpack_require__(0);
/* Creates a new Route definition */
function RouteDef(uri, 
    // Only here to capture the type
    _params, options) {
    var children = options.children || {};
    return Object.assign({
        def: __assign({ uri: uri, fullName: undefined, parent: undefined }, options),
        params: undefined
    }, children);
}
exports.RouteDef = RouteDef;
/* Creates the router and starts the application */
function Router(options) {
    // The lookup of our custom route objects by full name
    var routeByName = {};
    // The components currently mounted, top-down
    var components = [];
    // The current route in the transition
    var currentRoute;
    // The current app VNode
    var currentVNode;
    var typedRouter;
    // Translate our RouteDefs into abyssa States
    function transformRouteTree(name, route, parent) {
        if (parent === void 0) { parent = undefined; }
        routeByName[name] = route;
        route.def.parent = parent;
        route.def.fullName = name;
        var children = route.def.children
            ? space_lift_1.default(route.def.children)
                .mapValues(function (childName, childRoute) { return transformRouteTree(name + "." + childName, childRoute, route); })
                .value()
            : {};
        return abyssa_1.State(route.def.uri, {
            enter: function () {
                components.push(route.def.enter(typedRouter, currentRoute));
            },
            update: function () {
                if (route.def.update)
                    route.def.update(currentRoute);
            },
            exit: function () {
                components.pop();
                if (route.def.exit)
                    route.def.exit();
            }
        }, children);
    }
    var rootStates = space_lift_1.default(options.routes).mapValues(transformRouteTree).value();
    var router = abyssa_1.Router(rootStates);
    var abyssaOptions = Object.assign({}, options, {
        notFound: options.notFound && options.notFound.def.fullName
    });
    router.configure(abyssaOptions);
    router.on('started', function (newState) {
        var routeDef = routeByName[newState.fullName];
        currentRoute = makeRoute(routeDef, newState.params, newState.paramsDiff);
    });
    router.on('ended', function () {
        var newAppNode = components.reduceRight(function (previous, current) {
            return current(currentRoute, previous);
        }, emptyVNode());
        if (currentVNode) {
            kaiju_1.Render.into(currentVNode, newAppNode);
        }
        else {
            kaiju_1.startApp({
                app: newAppNode,
                elm: options.elm,
                replaceElm: options.replaceElm,
                snabbdomModules: options.snabbdomModules
            });
        }
        currentVNode = newAppNode;
    });
    var routerApi = router;
    function transitionTo(route, params) {
        return routerApi.transitionTo(route.def.fullName, params);
    }
    function link(route, params) {
        return routerApi.link(route.def.fullName, params);
    }
    function replaceParams(params) {
        return routerApi.replaceParams(params);
    }
    function init() {
        router.init();
    }
    typedRouter = {
        routes: options.routes,
        transitionTo: transitionTo,
        replaceParams: replaceParams,
        link: link,
        init: init
    };
    return typedRouter;
}
exports.Router = Router;
function makeRoute(route, params, paramsDiff) {
    return {
        route: route,
        params: params,
        paramsDiff: paramsDiff,
        is: function (otherRoute) {
            return route.def.fullName === otherRoute.def.fullName;
        },
        isIn: function (parentRoute) {
            var parent = route;
            while (parent) {
                if (parent === parentRoute)
                    return true;
                parent = parent.def.parent;
            }
            return false;
        }
    };
}
var emptyVNode = function () { return kaiju_1.h('div', { key: '_emptyVNode' }); };


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* Adds an extra classname to an VNode not created by the code wanting to add the classname */
function addClassName(node, classname) {
    var attrs = node.data.attrs || (node.data.attrs = {});
    attrs.class = attrs.class ? attrs.class + ' ' + classname : classname;
    return node;
}
exports.addClassName = addClassName;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(32);
var kaiju_1 = __webpack_require__(2);
var space_lift_1 = __webpack_require__(0);
var fade_1 = __webpack_require__(127);
var link_1 = __webpack_require__(23);
var index_1 = __webpack_require__(124);
var blue_1 = __webpack_require__(121);
var routeNotFound_1 = __webpack_require__(117);
var store_1 = __webpack_require__(20);
var router_1 = __webpack_require__(4);
function route() {
    var appStore = store_1.default();
    return router_1.RouteDef('', {}, {
        enter: function (router) { return function (route, child) { return app({ appStore: appStore, child: child, router: router, route: route }); }; },
        children: {
            index: index_1.default(),
            blue: blue_1.default(function () { return appStore; }),
            notFound: routeNotFound_1.default()
        }
    });
}
exports.default = route;
function app(props) {
    return kaiju_1.Component({ name: 'app', props: props, initState: initState, connect: connect, render: render });
}
function initState() {
    return {};
}
function connect(_a) {
    var on = _a.on, props = _a.props;
    var store = props().appStore;
    on(store.state, function (state, app) { return space_lift_1.update(state, { count: app.blue.count }); });
}
function render(_a) {
    var props = _a.props, state = _a.state;
    var router = props.router, route = props.route, child = props.child;
    return [
        kaiju_1.h('header', [
            link_1.default({
                router: router,
                route: router_1.routes.index,
                label: 'Index',
                isActive: route.isIn(router_1.routes.index)
            }),
            link_1.default({
                router: router,
                route: router_1.routes.blue,
                params: { id: '33' },
                label: 'Blue',
                isActive: route.isIn(router_1.routes.blue)
            }),
            String(state.count)
        ]),
        fade_1.default(child, 'main')
    ];
}


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(115);
exports.default = app_1.default;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var kaiju_1 = __webpack_require__(2);
var router_1 = __webpack_require__(4);
function route() {
    return router_1.RouteDef('notFound', {}, {
        enter: function () { return function () { return kaiju_1.h('h1', { key: 'notFound' }, '404 :-('); }; },
        children: {}
    });
}
exports.default = route;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(33);
var kaiju_1 = __webpack_require__(2);
var space_lift_1 = __webpack_require__(0);
var slideDown_1 = __webpack_require__(128);
var green_1 = __webpack_require__(120);
var red_1 = __webpack_require__(122);
var store_1 = __webpack_require__(20);
var router_1 = __webpack_require__(4);
var link_1 = __webpack_require__(23);
var userStore_1 = __webpack_require__(21);
function blueRoute(appStore) {
    var userStore;
    return router_1.RouteDef('blue/:id', {}, {
        enter: function (router) {
            userStore = userStore_1.UserStore();
            return function (route, child) { return blue({ appStore: appStore(), router: router, route: route, child: child }); };
        },
        exit: function () {
            userStore.destroy();
        },
        children: {
            green: green_1.default(),
            red: red_1.default(function () { return userStore; })
        }
    });
}
exports.default = blueRoute;
function blue(props) {
    return kaiju_1.Component({ name: 'blue', props: props, initState: initState, connect: connect, render: render });
}
function initState() {
    return {
        count: undefined
    };
}
function connect(_a) {
    var on = _a.on, props = _a.props;
    var appStore = props().appStore;
    on(store_1.incrementCounter, function (_) { return appStore.send(store_1.incrementCounter()); });
    on(appStore.state, function (state, appState) { return space_lift_1.update(state, { count: appState.blue.count }); });
}
function render(_a) {
    var props = _a.props, state = _a.state;
    var router = props.router, route = props.route, child = props.child;
    var id = route.params.id;
    return [
        kaiju_1.h('h1', 'Blue screen'),
        link_1.default({
            router: router,
            route: router_1.routes.blue.green,
            params: { id: id },
            label: 'Green',
            isActive: route.isIn(router_1.routes.blue.green)
        }),
        link_1.default({
            router: router,
            route: router_1.routes.blue.red,
            params: { id: id },
            label: 'Red',
            isActive: route.isIn(router_1.routes.blue.red)
        }),
        kaiju_1.h("div." + styles.increment, [
            'Count: ' + state.count,
            kaiju_1.h('button', { events: { click: store_1.incrementCounter } }, 'Increment')
        ]),
        slideDown_1.default(child, 'section')
    ];
}


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(34);
var listStyles = __webpack_require__(35);
var kaiju_1 = __webpack_require__(2);
var space_lift_1 = __webpack_require__(0);
var icon_1 = __webpack_require__(109);
var popup_1 = __webpack_require__(134), Popup = popup_1;
var button_1 = __webpack_require__(130);
var fadeScale_1 = __webpack_require__(125);
var router_1 = __webpack_require__(4);
function route() {
    return router_1.RouteDef('green?popup', {}, {
        enter: function (router) { return function (route) { return green({ router: router, route: route }); }; },
        children: {}
    });
}
exports.default = route;
function green(props) {
    return kaiju_1.Component({ name: 'green', props: props, initState: initState, connect: connect, render: render });
}
function initState(props) {
    return {
        form: {},
        popupOpened: !!props.route.params.popup
    };
}
var inputChanged = kaiju_1.Message('inputChanged');
var showPopup = kaiju_1.Message('showPopup');
var hidePopup = kaiju_1.Message('hidePopup');
function connect(_a) {
    var on = _a.on, props = _a.props;
    var router = props().router;
    on(inputChanged, function (state, evt) {
        var _a = evt.target, name = _a.name, value = _a.value;
        var newForm = space_lift_1.update(state.form, (_b = {}, _b[name] = value, _b));
        return space_lift_1.update(state, { form: newForm });
        var _b;
    });
    on(showPopup, function (state) {
        var params = space_lift_1.update(props().route.params, { popup: 'true' });
        router.replaceParams(params);
        return space_lift_1.update(state, { popupOpened: true });
    });
    on(hidePopup, function (state) {
        var params = space_lift_1.update(props().route.params, { popup: undefined });
        router.replaceParams(params);
        return space_lift_1.update(state, { popupOpened: false });
    });
}
function render(_a) {
    var props = _a.props, state = _a.state;
    var route = props.route;
    var form = state.form, popupOpened = state.popupOpened;
    var firstName = form.firstName, lastName = form.lastName;
    var popupEl = popupOpened ? helloPopup() : '';
    return [
        "Green (route id = " + route.params.id + ")",
        kaiju_1.h('form', [
            input('firstName', firstName, true),
            input('lastName', lastName)
        ]),
        button_1.default({
            className: styles.popupButton,
            icon: icon_1.editIcon(),
            label: 'Open popup',
            events: { mousedown: showPopup }
        }),
        popupEl
    ];
}
function input(name, value, shouldAutoFocus) {
    if (shouldAutoFocus === void 0) { shouldAutoFocus = false; }
    var hook = shouldAutoFocus
        ? { insert: function (node) { return node.elm.focus(); } }
        : undefined;
    return (kaiju_1.h('label', [
        name,
        kaiju_1.h("input." + styles.input, {
            props: { name: name, value: value },
            hook: hook,
            events: { input: inputChanged }
        }, '')
    ]));
}
function helloPopup() {
    var content = [
        kaiju_1.h('h2', 'Hello'),
        list({ initialItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }),
        kaiju_1.h('button', { events: { click: Popup.close } }, 'Close')
    ];
    return popup_1.default({ content: content, onClose: hidePopup });
}
var list = (function () {
    function initState(props) {
        return { items: props.initialItems };
    }
    var deleteRow = kaiju_1.Message('deleteRow');
    function connect(_a) {
        var on = _a.on;
        on(deleteRow, function (state, _a) {
            var row = _a[0];
            return ({ items: state.items.filter(function (r) { return r !== row; }) });
        });
    }
    function render(_a) {
        var state = _a.state;
        var itemEls = state.items.map(function (item) { return (kaiju_1.h('li', { key: item }, [
            kaiju_1.h('span', String(item)),
            kaiju_1.h('input', { props: { value: 'bla' } }),
            kaiju_1.h('button', { events: { click: deleteRow.with(item) } }, '✕')
        ])); });
        return fadeScale_1.default(itemEls, "ul." + listStyles.list);
    }
    return function (props) {
        return kaiju_1.Component({ name: 'list', initState: initState, connect: connect, props: props, render: render });
    };
})();


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var green_1 = __webpack_require__(119);
exports.default = green_1.default;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var blue_1 = __webpack_require__(118);
exports.default = blue_1.default;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var red_1 = __webpack_require__(123);
exports.default = red_1.default;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(36);
var space_lift_1 = __webpack_require__(0);
var kaiju_1 = __webpack_require__(2);
var router_1 = __webpack_require__(4);
var userStore_1 = __webpack_require__(21);
var select_1 = __webpack_require__(138);
var remoteData_1 = __webpack_require__(12);
function route(userStore) {
    return router_1.RouteDef('red', {}, {
        enter: function () { return function () { return red({ userStore: userStore() }); }; },
        children: {}
    });
}
exports.default = route;
function red(props) {
    return kaiju_1.Component({ sel: "component." + styles.red, name: 'red', props: props, initState: initState, connect: connect, render: render });
}
function initState() {
    return {
        users: undefined,
        pagination: undefined,
        selectedUser: undefined
    };
}
var userChange = kaiju_1.Message('userChange');
function connect(_a) {
    var on = _a.on, props = _a.props;
    var userStore = props().userStore;
    on(userStore.state, function (state, _a) {
        var users = _a.users, pagination = _a.pagination;
        return space_lift_1.update(state, { users: users, pagination: pagination });
    });
    on(userStore_1.reloadUsers, function (_) { return userStore.send(userStore_1.reloadUsers()); });
    on(userStore_1.loadNextUserPage, function (_) { return userStore.send(userStore_1.loadNextUserPage()); });
    on(userChange, function (state, user) { return space_lift_1.update(state, { selectedUser: user }); });
}
function render(_a) {
    var state = _a.state;
    var selectedUser = state.selectedUser, users = state.users, pagination = state.pagination;
    var _b = remoteData_1.unpack(users), _c = _b.data, data = _c === void 0 ? [] : _c, loading = _b.loading;
    return [
        kaiju_1.h('button', { events: { click: userStore_1.reloadUsers } }, 'Refresh select list'),
        kaiju_1.h('br'),
        select_1.default({
            items: data,
            selectedItem: selectedUser,
            onChange: userChange,
            loading: loading,
            pagination: pagination
        })
    ];
}


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var kaiju_1 = __webpack_require__(2);
var router_1 = __webpack_require__(4);
function route() {
    return router_1.RouteDef('', {}, {
        enter: function () { return function () { return kaiju_1.h('h1', 'Index'); }; },
        children: {}
    });
}
exports.default = route;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(37);
var groupAnimation_1 = __webpack_require__(126);
var fadeScale = {
    create: function (elm) {
        elm.classList.remove(styles.fadeScaleOut);
        elm.classList.remove(styles.fadeScaleIn);
    },
    remove: function (elm, cb) {
        elm.classList.remove(styles.fadeScaleIn);
        elm.classList.add(styles.fadeScaleOut);
        elm.addEventListener('animationend', cb);
    }
};
exports.default = groupAnimation_1.default(fadeScale);


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var kaiju_1 = __webpack_require__(2);
var space_lift_1 = __webpack_require__(0);
/**
 * Container animating its children in and out.
 * children must have keys to be properly differentiated.
 * The exit and enter animations run in parallel.
 */
function animate(animations) {
    return function (children, sel) {
        var props = {
            key: 'groupAnimation',
            animations: animations,
            hook: { prepatch: prepatch }
        };
        return kaiju_1.h(sel, props, children);
    };
}
exports.default = animate;
function prepatch(oldVNode, newVNode) {
    var animations = newVNode.data.animations;
    var oldChildren = oldVNode.children || [];
    var newChildren = newVNode.children || [];
    var oldKeys = space_lift_1.default(oldChildren).map(function (c) { return c.key || ''; }).toSet().value();
    var newKeys = space_lift_1.default(newChildren).map(function (c) { return c.key || ''; }).toSet().value();
    // children making an exit
    oldChildren.forEach(function (child) {
        if (newKeys[child.key || ''])
            return;
        child.data.hook = child.data.hook || {};
        var otherHook = child.data.hook.remove;
        child.data.hook.remove = function (vnode, cb) {
            if (otherHook)
                otherHook(vnode, noop);
            animations.remove(vnode.elm, cb);
        };
    });
    // children making an entrance
    newChildren.forEach(function (child) {
        if (oldKeys[child.key || ''])
            return;
        child.data.hook = child.data.hook || {};
        var otherHook = child.data.hook.create;
        child.data.hook.create = function (emptyNode, vnode) {
            if (otherHook)
                otherHook(emptyNode, vnode);
            animations.create(vnode.elm);
        };
    });
}
function noop() { }


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(38);
var singleAnimation_1 = __webpack_require__(22);
var fade = {
    create: function (elm) {
        elm.classList.remove(styles.fadeout);
        elm.classList.add(styles.fadein);
    },
    remove: function (elm, cb) {
        elm.classList.remove(styles.fadein);
        elm.classList.add(styles.fadeout);
        elm.addEventListener('animationend', cb);
    }
};
exports.default = singleAnimation_1.default(fade);


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(39);
var singleAnimation_1 = __webpack_require__(22);
var slideDown = {
    create: function (elm) {
        elm.classList.add(styles.slideDown);
    },
    remove: function (_, cb) {
        cb();
    }
};
exports.default = singleAnimation_1.default(slideDown);


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(40);
var kaiju_1 = __webpack_require__(2);
var vnode_1 = __webpack_require__(114);
function button(_a) {
    var icon = _a.icon, label = _a.label, _b = _a.className, className = _b === void 0 ? '' : _b, events = _a.events;
    return kaiju_1.h("button." + className, { events: events }, [
        icon && vnode_1.addClassName(icon, styles.icon) || '',
        label || ''
    ]);
}
exports.default = button;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(129);
exports.default = button_1.default;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(41);
var kaiju_1 = __webpack_require__(2);
function link(_a) {
    var router = _a.router, route = _a.route, params = _a.params, label = _a.label, _b = _a.isActive, isActive = _b === void 0 ? false : _b;
    var href = router.link(route, params);
    return (kaiju_1.h('a', {
        class: (_c = {}, _c[styles.link] = true, _c[styles.active] = isActive, _c),
        attrs: { href: href, 'data-nav': 'mousedown' }
    }, label));
    var _c;
}
exports.default = link;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var loader_1 = __webpack_require__(133);
exports.default = loader_1.default;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(42);
var kaiju_1 = __webpack_require__(2);
var sel = "div." + styles.loader;
function default_1() {
    return kaiju_1.h(sel);
}
exports.default = default_1;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var popup_1 = __webpack_require__(135);
exports.default = popup_1.default;
exports.close = popup_1.close;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(43);
var kaiju_1 = __webpack_require__(2);
var observable_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(111);
// Popups are rendered in their own top-level container for clean separation of layers.
var popupLayer = document.getElementById('popupLayer');
function default_1(props) {
    return kaiju_1.Component({ name: 'popup', props: props, initState: initState, connect: connect, render: render });
}
exports.default = default_1;
function initState() {
    return {};
}
/** Used in the popup DOM content. Requests the popup's parent to close it */
exports.close = kaiju_1.Message('close');
var overlayClick = kaiju_1.Message('overlayClick');
// Listen for messages inside the popup container, and redispatch at the Popup launcher level.
function connect(_a) {
    var on = _a.on, props = _a.props, msg = _a.msg;
    var requestClose = function () { return msg.sendToParent(props().onClose()); };
    on(msg.listenAt(popupLayer), function (_, message) {
        if (message.is(exports.close))
            requestClose();
        if (message.is(overlayClick)) {
            if (!dom_1.findParentByAttr('data-popup', message.payload.target))
                requestClose();
        }
    });
    on(observable_1.Observable.fromEvent('keydown', window), function (_, evt) {
        if (evt.keyCode === 27)
            requestClose();
    });
}
function render(_a) {
    var props = _a.props;
    var content = props.content;
    return (kaiju_1.h('div', {
        content: content,
        hook: { insert: insert, postpatch: postpatch, destroy: destroy }
    }));
}
function insert(vnode) {
    var popup = vnode.data._popup = popupWithContent(vnode.data.content);
    kaiju_1.Render.into(popupLayer, popup);
}
function postpatch(oldVNode, vnode) {
    var oldPopup = oldVNode.data._popup;
    var newPopup = popupWithContent(vnode.data.content);
    vnode.data._popup = newPopup;
    kaiju_1.Render.into(oldPopup, newPopup);
}
var emptyVNode = kaiju_1.h('div');
function destroy(vnode) {
    kaiju_1.Render.into(vnode.data._popup, emptyVNode);
}
function popupWithContent(content) {
    return (kaiju_1.h("div." + styles.overlay, {
        key: 'popup-content',
        hook: { insert: kaiju_1.Render.isFirst() ? undefined : insertAnimation, remove: removeAnimation },
        events: { click: overlayClick }
    }, [
        kaiju_1.h("div." + styles.popup, {
            attrs: { 'data-popup': true }
        }, content)
    ]));
}
var insertAnimation = function (vnode) {
    var popup = vnode.elm.firstChild;
    popup.classList.add(styles.insertAnimation);
};
var removeAnimation = function (vnode, cb) {
    var overlay = vnode.elm;
    overlay.classList.add(styles.removeAnimation);
    overlay.addEventListener('animationend', function () {
        cb();
        popupLayer.removeChild(popupLayer.firstChild);
    });
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var scroller_1 = __webpack_require__(137);
exports.default = scroller_1.default;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var kaiju_1 = __webpack_require__(2);
var observable_1 = __webpack_require__(1);
var option_ts_1 = __webpack_require__(3);
function default_1(props) {
    return kaiju_1.Component({ name: 'infiniteScroll', props: props, initState: initState, connect: connect, render: render });
}
exports.default = default_1;
function initState() {
    return {};
}
var setScroller = kaiju_1.Message('setScroller');
var locallyScrolled = kaiju_1.Message('locallyScrolled');
var scrollChanged = kaiju_1.Message('scrollChanged');
function connect(_a) {
    var on = _a.on, props = _a.props, msg = _a.msg;
    var scroller;
    var onScrollChanged = function () { return msg.send(scrollChanged()); };
    option_ts_1.Option(props().scrollOwner).match({
        Some: function (scrollOwner) {
            scroller = scrollOwner;
            onScrollChanged();
            on(observable_1.Observable.fromEvent('scroll', scrollOwner).debounce(60), onScrollChanged);
        },
        None: function () {
            on(setScroller, function (_, localScroller) {
                scroller = localScroller;
                onScrollChanged();
            });
            on(msg.listen(locallyScrolled).debounce(60), onScrollChanged);
        }
    });
    on(observable_1.Observable.fromEvent('resize', window).debounce(600), onScrollChanged);
    on(scrollChanged, function (_) {
        var _a = props(), _b = _a.treshold, treshold = _b === void 0 ? 200 : _b, hasMore = _a.hasMore, isLoadingMore = _a.isLoadingMore, loadMore = _a.loadMore;
        if (!scroller)
            return;
        if (!hasMore || isLoadingMore)
            return;
        var reachedBottom = (scroller.scrollTop + scroller.clientHeight + treshold) > scroller.scrollHeight;
        if (reachedBottom)
            msg.sendToParent(loadMore());
    });
    on(kaiju_1.Message.unhandled, function (_, m) { return msg.sendToParent(m); });
}
function render(_a) {
    var props = _a.props, msg = _a.msg;
    var scrollOwner = props.scrollOwner, list = props.list, styleName = props.styleName;
    var attrs = styleName ? { class: styleName } : undefined;
    var events = scrollOwner ? undefined : { scroll: locallyScrolled };
    var hook = scrollOwner ? undefined : { insert: function (vnode) { return msg.send(setScroller(vnode.elm)); } };
    return (kaiju_1.h('div', {
        attrs: attrs,
        events: events,
        hook: hook
    }, list));
}


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var select_1 = __webpack_require__(139);
exports.default = select_1.default;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var styles = __webpack_require__(44);
var immupdate_1 = __webpack_require__(9);
var kaiju_1 = __webpack_require__(2);
var option_ts_1 = __webpack_require__(3);
var scroller_1 = __webpack_require__(136);
var loader_1 = __webpack_require__(132);
/** A select component that can optionally display paginated data */
function default_1(props) {
    return kaiju_1.Component({ name: 'select', props: props, initState: initState, connect: connect, render: render });
}
exports.default = default_1;
function initState() {
    return { opened: false };
}
var open = kaiju_1.Message('open');
var close = kaiju_1.Message('close');
var itemSelected = kaiju_1.Message('itemSelected');
var requestLoadMore = kaiju_1.Message('requestLoadMore');
function connect(_a) {
    var on = _a.on, props = _a.props, msg = _a.msg;
    on(open, function (state) { return immupdate_1.update(state, { opened: true }); });
    on(close, function (state) { return immupdate_1.update(state, { opened: false }); });
    on(itemSelected, function (_, _a) {
        var item = _a[0];
        return msg.sendToParent(props().onChange(item));
    });
    option_ts_1.Option(props().pagination).map(function (pagination) {
        on(requestLoadMore, function (_) { return msg.sendToParent(pagination.loadMore()); });
    });
}
function render(_a) {
    var props = _a.props, state = _a.state;
    var items = props.items, selectedItem = props.selectedItem, itemRenderer = props.itemRenderer;
    var opened = state.opened;
    var text = items.indexOf(selectedItem) > -1
        ? itemRenderer ? itemRenderer(selectedItem) : selectedItem.toString()
        : '';
    var dropdownEl = renderDropdownEl(props, opened);
    return [
        kaiju_1.h('input', {
            props: { value: text },
            attrs: { readonly: true, placeholder: 'click me' },
            events: { click: open, blur: close }
        }),
        dropdownEl
    ];
}
function renderDropdownEl(props, opened) {
    var items = props.items, loading = props.loading, itemRenderer = props.itemRenderer, pagination = props.pagination;
    var itemEls = opened
        ? (itemRenderer ? items.map(itemRenderer) : items).map(renderItem)
        : undefined;
    if (!itemEls)
        return '';
    var itemsWithLoaderEl = loading
        ? itemEls.concat(kaiju_1.h("li." + styles.loaderContainer, loader_1.default()))
        : itemEls;
    var listEl = pagination ? (scroller_1.default({
        styleName: styles.scroller,
        list: itemsWithLoaderEl,
        hasMore: pagination.hasMore,
        loadMore: requestLoadMore,
        isLoadingMore: loading
    })) : itemsWithLoaderEl;
    return kaiju_1.h("ul." + styles.dropdown, { hook: animationHook }, listEl);
}
function renderItem(item) {
    return kaiju_1.h("li." + styles.li, { events: { mousedown: itemSelected.with(item) } }, item);
}
var animationHook = {
    insert: function (vnode) {
        vnode.elm.classList.add(styles.insertAnimation);
    },
    remove: function (vnode, cb) {
        vnode.elm.classList.add(styles.removeAnimation);
        vnode.elm.addEventListener('animationend', cb);
    }
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWU2ODU1MzFiYzlkYTZiMWRhZjgiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L2luZGV4LmpzIiwid2VicGFjazovLy8uL34va2FpanUvb2JzZXJ2YWJsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9vcHRpb24udHMvbGliL29wdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVyLnRzIiwid2VicGFjazovLy8uL34vc25hYmJkb20vaC5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L2xpYi9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zbmFiYmRvbS92bm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2FieXNzYS9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2ltbXVwZGF0ZS9saWIvaW1tdXBkYXRlLmpzIiwid2VicGFjazovLy8uL34va2FpanUvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9rYWlqdS9zdG9yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9yZW1vdGVEYXRhLnRzIiwid2VicGFjazovLy8uL34vYWJ5c3NhL2xpYi9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9hYnlzc2EvbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9rYWlqdS9saWIvbWVzc2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L2xpYi9tZXNzYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L2xpYi9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zbmFiYmRvbS9odG1sZG9tYXBpLmpzIiwid2VicGFjazovLy8uL34vc25hYmJkb20vaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvYXBwL3N0b3JlLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L2JsdWUvdXNlclN0b3JlLnRzIiwid2VicGFjazovLy8uL3NyYy93aWRnZXQvYW5pbWF0aW9uL3NpbmdsZS9zaW5nbGVBbmltYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9saW5rL2luZGV4LnRzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9+L2FieXNzYS9saWIvUm91dGVyLmpzIiwid2VicGFjazovLy8uL34vYWJ5c3NhL2xpYi9TdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2FieXNzYS9saWIvU3RhdGVXaXRoUGFyYW1zLmpzIiwid2VicGFjazovLy8uL34vYWJ5c3NhL2xpYi9UcmFuc2l0aW9uLmpzIiwid2VicGFjazovLy8uL34vYWJ5c3NhL2xpYi9hbmNob3JzLmpzIiwid2VicGFjazovLy8uL3NyYy9pY29uL2ljb24uc3R5bCIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9hcHAvYXBwLnN0eWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvYmx1ZS9ibHVlLnN0eWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvYmx1ZS9ncmVlbi9ncmVlbi5zdHlsIiwid2VicGFjazovLy8uL3NyYy92aWV3L2JsdWUvZ3JlZW4vbGlzdC5zdHlsIiwid2VicGFjazovLy8uL3NyYy92aWV3L2JsdWUvcmVkL3JlZC5zdHlsIiwid2VicGFjazovLy8uL3NyYy93aWRnZXQvYW5pbWF0aW9uL2dyb3VwL2ZhZGVTY2FsZS9mYWRlU2NhbGUuc3R5bCIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0L2FuaW1hdGlvbi9zaW5nbGUvZmFkZS9mYWRlLnN0eWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9hbmltYXRpb24vc2luZ2xlL3NsaWRlRG93bi9zbGlkZURvd24uc3R5bCIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0L2J1dHRvbi9idXR0b24uc3R5bCIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0L2xpbmsvbGluay5zdHlsIiwid2VicGFjazovLy8uL3NyYy93aWRnZXQvbG9hZGVyL2xvYWRlci5zdHlsIiwid2VicGFjazovLy8uL3NyYy93aWRnZXQvcG9wdXAvcG9wdXAuc3R5bCIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0L3NlbGVjdC9zZWxlY3Quc3R5bCIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L2xpYi9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9rYWlqdS9saWIvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL34va2FpanUvb2JzZXJ2YWJsZS9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L29ic2VydmFibGUvZGVsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9rYWlqdS9vYnNlcnZhYmxlL2Ryb3AuanMiLCJ3ZWJwYWNrOi8vLy4vfi9rYWlqdS9vYnNlcnZhYmxlL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L29ic2VydmFibGUvZmxhdE1hcExhdGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L29ic2VydmFibGUvZnJvbUV2ZW50LmpzIiwid2VicGFjazovLy8uL34va2FpanUvb2JzZXJ2YWJsZS9mcm9tUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L29ic2VydmFibGUvaW50ZXJ2YWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9rYWlqdS9vYnNlcnZhYmxlL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L29ic2VydmFibGUvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9rYWlqdS9vYnNlcnZhYmxlL3BhcnRpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L29ic2VydmFibGUvcHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L29ic2VydmFibGUvc2xpZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2thaWp1L29ic2VydmFibGUvdGhyb3R0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zbmFiYmRvbS9tb2R1bGVzL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zbmFiYmRvbS9tb2R1bGVzL2NsYXNzLmpzIiwid2VicGFjazovLy8uL34vc25hYmJkb20vbW9kdWxlcy9wcm9wcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3NuYWJiZG9tL3NuYWJiZG9tLmpzIiwid2VicGFjazovLy8uL34vc25hYmJkb20vdGh1bmsuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zbmFiYmRvbS90b3Zub2RlLmpzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9hcnJheS9hcHBlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L2FycmF5L2FwcGVuZEFsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvY29tcGFjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvY291bnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L2FycmF5L2Rpc3RpbmN0LmpzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9hcnJheS9kcm9wLmpzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9hcnJheS9kcm9wUmlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L2FycmF5L2V2ZXJ5LmpzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9hcnJheS9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L2FycmF5L2ZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L2FycmF5L2ZpbmRJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvZmlyc3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L2FycmF5L2ZsYXRNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L2FycmF5L2ZsYXR0ZW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L2FycmF5L2ZvbGQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L2FycmF5L2ZvbGRSaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvZ2V0LmpzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9hcnJheS9ncm91cEJ5LmpzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9hcnJheS9pbnNlcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L2FycmF5L2luc2VydEFsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvam9pbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvbGFzdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvbWFwLmpzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9hcnJheS9yZW1vdmVBdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvcmV2ZXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvc29tZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvc29ydC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvdGFrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvdGFrZVJpZ2h0LmpzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9hcnJheS90b1NldC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvYXJyYXkvdXBkYXRlQXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L29iamVjdC9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L29iamVjdC9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L29iamVjdC9nZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zcGFjZS1saWZ0L29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9vYmplY3QvbWFwVmFsdWVzLmpzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9vYmplY3QvcmVtb3ZlLmpzIiwid2VicGFjazovLy8uL34vc3BhY2UtbGlmdC9vYmplY3QvdG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvb2JqZWN0L3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvb2JqZWN0L3ZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3NwYWNlLWxpZnQvdHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9pY29uL2ljb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ljb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvYWpheC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9kb20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvcHJvbWlzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdm5vZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9hcHAvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvYXBwL3JvdXRlTm90Rm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvYmx1ZS9ibHVlLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L2JsdWUvZ3JlZW4vZ3JlZW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcvYmx1ZS9ncmVlbi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9ibHVlL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L2JsdWUvcmVkL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L2JsdWUvcmVkL3JlZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0L2FuaW1hdGlvbi9ncm91cC9mYWRlU2NhbGUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9hbmltYXRpb24vZ3JvdXAvZ3JvdXBBbmltYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9hbmltYXRpb24vc2luZ2xlL2ZhZGUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9hbmltYXRpb24vc2luZ2xlL3NsaWRlRG93bi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0L2J1dHRvbi9idXR0b24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9idXR0b24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9saW5rL2xpbmsudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9sb2FkZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9sb2FkZXIvbG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy93aWRnZXQvcG9wdXAvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9wb3B1cC9wb3B1cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0L3Njcm9sbGVyL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy93aWRnZXQvc2Nyb2xsZXIvc2Nyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9zZWxlY3QvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldC9zZWxlY3Qvc2VsZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGdDQUFnQyxFQUFFO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUEsa0RBQWtEOztBQUVsRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUEsaURBQWlELFVBQVU7QUFDM0Q7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RkFBdUY7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsdUJBQXVCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMsRUFBRTs7QUFFckM7O0FBRUEsZ0RBQWdEO0FBQ2hEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNENBQTRDO0FBQzVDOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRGQUE0Rix1Q0FBdUM7O0FBRW5JO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1FQUFtRSxhQUFhO0FBQ2hGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0VBQXNFLGVBQWU7QUFDckY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Qjs7Ozs7OztB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LElBQUk7QUFDbEY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw2Qjs7Ozs7OztBQzNIQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQzs7Ozs7O0FDeEZBO0FBQ0Esa0JBQWtCLDBCOzs7Ozs7QUNEbEIseUM7Ozs7OztBQ0FBO0FBQ0Esa0JBQWtCLG9DOzs7Ozs7QUNEbEI7QUFDQSxrQkFBa0IscUU7Ozs7OztBQ0RsQjtBQUNBLGtCQUFrQiwwQjs7Ozs7O0FDRGxCO0FBQ0Esa0JBQWtCLHVCOzs7Ozs7QUNEbEI7QUFDQSxrQkFBa0IsMkY7Ozs7OztBQ0RsQjtBQUNBLGtCQUFrQiw2RDs7Ozs7O0FDRGxCO0FBQ0Esa0JBQWtCLHlDOzs7Ozs7QUNEbEI7QUFDQSxrQkFBa0IsNEI7Ozs7OztBQ0RsQjtBQUNBLGtCQUFrQix1RDs7Ozs7O0FDRGxCO0FBQ0Esa0JBQWtCLDJEOzs7Ozs7QUNEbEI7QUFDQSxrQkFBa0IsNko7Ozs7OztBQ0RsQjtBQUNBLGtCQUFrQixpUDs7Ozs7OztBQ0RsQjs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3Rjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLHlEQUF5RDtBQUNwRSxnQkFBZ0Isa0ZBQWtGO0FBQ2xHLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7OztBQ3ZOQTs7QUFFQTtBQUNBOztBQUVBLG9HQUFvRyxtQkFBbUIsRUFBRSxtQkFBbUIsOEhBQThIOztBQUUxUTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDdkRBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7OztBQ3ZDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNILEM7Ozs7Ozs7QUM3QkE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxDOzs7Ozs7O0FDZEE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQzs7Ozs7OztBQ2JBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDOzs7Ozs7O0FDdEJBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGlCQUFpQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsWUFBWTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxZQUFZO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZD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QUE0QztBQUM1QywwQ0FBMEMsMkJBQTJCLHlDQUF5QyxFQUFFO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7OztBQ3pEQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7Ozs7Ozs7O0FDSEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHVGQUF1RjtBQUNySDtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbUNBQW1DLGVBQWUsRUFBRSxFQUFFO0FBQ3JGLGdDQUFnQyxtQ0FBbUMsZ0JBQWdCLEVBQUUsRUFBRTtBQUN2RjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwwQ0FBMEMsZ0RBQWdELEVBQUU7QUFDNUYsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYztBQUNsQyxvQkFBb0IsMENBQTBDO0FBQzlELHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsK0NBQStDLHNCQUFzQjtBQUNyRTtBQUNBO0FBQ0EseUNBQXlDLFVBQVUscUNBQXFDLEVBQUU7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvRUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE0MCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWU2ODU1MzFiYzlkYTZiMWRhZjgiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgbGlmdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlPcHMob2JqKTtcbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpXG4gICAgICAgIHJldHVybiBuZXcgU3RyaW5nT3BzKG9iaik7XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInKVxuICAgICAgICByZXR1cm4gbmV3IE51bWJlck9wcyhvYmopO1xuICAgIGlmIChvYmogPT09IHRydWUgfHwgb2JqID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuIG5ldyBCb29sT3BzKG9iaik7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RPcHMob2JqKTtcbn07XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGxpZnQ7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgQXJyYXlcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnZhciBBcnJheU9wcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXJyYXlPcHMoYXJyYXkpIHtcbiAgICAgICAgdGhpcy5faXNMaWZ0V3JhcHBlciA9IHRydWU7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gYXJyYXk7XG4gICAgfVxuICAgIEFycmF5T3BzLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9O1xuICAgIHJldHVybiBBcnJheU9wcztcbn0oKSk7XG5leHBvcnRzLkFycmF5T3BzID0gQXJyYXlPcHM7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgT2JqZWN0XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG52YXIgT2JqZWN0T3BzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYmplY3RPcHMob2JqZWN0KSB7XG4gICAgICAgIHRoaXMuX2lzTGlmdFdyYXBwZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IG9iamVjdDtcbiAgICB9XG4gICAgT2JqZWN0T3BzLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9O1xuICAgIHJldHVybiBPYmplY3RPcHM7XG59KCkpO1xuZXhwb3J0cy5PYmplY3RPcHMgPSBPYmplY3RPcHM7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgTnVtYmVyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG52YXIgTnVtYmVyT3BzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOdW1iZXJPcHMobnVtKSB7XG4gICAgICAgIHRoaXMuX2lzTGlmdFdyYXBwZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IG51bTtcbiAgICB9XG4gICAgTnVtYmVyT3BzLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9O1xuICAgIHJldHVybiBOdW1iZXJPcHM7XG59KCkpO1xuZXhwb3J0cy5OdW1iZXJPcHMgPSBOdW1iZXJPcHM7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgU3RyaW5nXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG52YXIgU3RyaW5nT3BzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdHJpbmdPcHMoc3RyKSB7XG4gICAgICAgIHRoaXMuX2lzTGlmdFdyYXBwZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHN0cjtcbiAgICB9XG4gICAgU3RyaW5nT3BzLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9O1xuICAgIHJldHVybiBTdHJpbmdPcHM7XG59KCkpO1xuZXhwb3J0cy5TdHJpbmdPcHMgPSBTdHJpbmdPcHM7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgQm9vbGVhblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTm90IHRoYXQgd2UgZXhwZWN0IHRvIGV4cGFuZCBvbiB0aGUgYm9vbGVhbiBjYXBhYmlsaXRpZXMuLi4gQnV0IGZvciBjb21wbGV0ZW5lc3Mgc2FrZS5cbnZhciBCb29sT3BzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCb29sT3BzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2lzTGlmdFdyYXBwZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBCb29sT3BzLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9O1xuICAgIHJldHVybiBCb29sT3BzO1xufSgpKTtcbmV4cG9ydHMuQm9vbE9wcyA9IEJvb2xPcHM7XG5mdW5jdGlvbiBnZXRWYWx1ZShpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dFsnX2lzTGlmdFdyYXBwZXInXVxuICAgICAgICA/IGlucHV0LnZhbHVlKClcbiAgICAgICAgOiBpbnB1dDtcbn1cbmV4cG9ydHMuZ2V0VmFsdWUgPSBnZXRWYWx1ZTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICBSZS1leHBvcnRlZFxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudmFyIGltbXVwZGF0ZV8xID0gcmVxdWlyZShcImltbXVwZGF0ZVwiKTtcbmV4cG9ydHMudXBkYXRlID0gaW1tdXBkYXRlXzEudXBkYXRlO1xuZXhwb3J0cy5ERUxFVEUgPSBpbW11cGRhdGVfMS5ERUxFVEU7XG52YXIgb3B0aW9uX3RzXzEgPSByZXF1aXJlKFwib3B0aW9uLnRzXCIpO1xuZXhwb3J0cy5PcHRpb24gPSBvcHRpb25fdHNfMS5PcHRpb247XG5leHBvcnRzLk5vbmUgPSBvcHRpb25fdHNfMS5Ob25lO1xuZXhwb3J0cy5Tb21lID0gb3B0aW9uX3RzXzEuU29tZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zcGFjZS1saWZ0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG5cbnZhciBfZGVib3VuY2UyID0gcmVxdWlyZSgnLi9kZWJvdW5jZScpO1xuXG52YXIgX2RlYm91bmNlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlYm91bmNlMik7XG5cbnZhciBfZGVsYXkyID0gcmVxdWlyZSgnLi9kZWxheScpO1xuXG52YXIgX2RlbGF5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlbGF5Mik7XG5cbnZhciBfZHJvcDIgPSByZXF1aXJlKCcuL2Ryb3AnKTtcblxudmFyIF9kcm9wMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Ryb3AyKTtcblxudmFyIF9maWx0ZXIyID0gcmVxdWlyZSgnLi9maWx0ZXInKTtcblxudmFyIF9maWx0ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmlsdGVyMik7XG5cbnZhciBfZmxhdE1hcExhdGVzdDIgPSByZXF1aXJlKCcuL2ZsYXRNYXBMYXRlc3QnKTtcblxudmFyIF9mbGF0TWFwTGF0ZXN0MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZsYXRNYXBMYXRlc3QyKTtcblxudmFyIF9mcm9tRXZlbnQyID0gcmVxdWlyZSgnLi9mcm9tRXZlbnQnKTtcblxudmFyIF9mcm9tRXZlbnQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbUV2ZW50Mik7XG5cbnZhciBfZnJvbVByb21pc2UyID0gcmVxdWlyZSgnLi9mcm9tUHJvbWlzZScpO1xuXG52YXIgX2Zyb21Qcm9taXNlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb21Qcm9taXNlMik7XG5cbnZhciBfaW50ZXJ2YWwyID0gcmVxdWlyZSgnLi9pbnRlcnZhbCcpO1xuXG52YXIgX2ludGVydmFsMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludGVydmFsMik7XG5cbnZhciBfbWFwMiA9IHJlcXVpcmUoJy4vbWFwJyk7XG5cbnZhciBfbWFwMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21hcDIpO1xuXG52YXIgX21lcmdlMiA9IHJlcXVpcmUoJy4vbWVyZ2UnKTtcblxudmFyIF9tZXJnZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXJnZTIpO1xuXG52YXIgX3BhcnRpdGlvbjIgPSByZXF1aXJlKCcuL3BhcnRpdGlvbicpO1xuXG52YXIgX3BhcnRpdGlvbjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJ0aXRpb24yKTtcblxudmFyIF9wdXJlMiA9IHJlcXVpcmUoJy4vcHVyZScpO1xuXG52YXIgX3B1cmUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHVyZTIpO1xuXG52YXIgX3NsaWRpbmcyID0gcmVxdWlyZSgnLi9zbGlkaW5nJyk7XG5cbnZhciBfc2xpZGluZzMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zbGlkaW5nMik7XG5cbnZhciBfdGhyb3R0bGUyID0gcmVxdWlyZSgnLi90aHJvdHRsZScpO1xuXG52YXIgX3Rocm90dGxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Rocm90dGxlMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIE9ic2VydmFibGUoYWN0aXZhdGUpIHtcblxuICBmdW5jdGlvbiBvYnModmFsKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDAgPyBvYnMuX2xhc3RWYWx1ZSA9PT0gVU5TRVQgPyB1bmRlZmluZWQgOiBvYnMuX2xhc3RWYWx1ZSA6IG9icy5fYWRkKHZhbCk7XG4gIH1cblxuICBvYnMuX3N1YnNjcmliZXJzID0gW107XG4gIG9icy5fYWN0aXZhdGUgPSBhY3RpdmF0ZTtcbiAgb2JzLl9sYXN0VmFsdWUgPSBVTlNFVDtcblxuICAvLyBQcmUtYmluZCBfYWRkIGFzIGl0J3MgY2FsbGVkIGFzIGEgZGV0YWNoZWQgZnVuY3Rpb25cbiAgb2JzLl9hZGQgPSBmdW5jdGlvbiAodmFsLCBuYW1lKSB7XG4gICAgb2JzLl9sYXN0VmFsdWUgPSB2YWw7XG4gICAgb2JzLl9wYXJlbnROYW1lID0gbmFtZTtcblxuICAgIHB1c2hOZXdWYWx1ZSh2YWwsIG9icy5fc3Vic2NyaWJlcnMsIG9icy5fbmFtZSB8fCBuYW1lKTtcblxuICAgIHJldHVybiBvYnM7XG4gIH07XG5cbiAgdmFyIHByb3RvS2V5cyA9IE9iamVjdC5rZXlzKHByb3RvKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm90b0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICBvYnNbcHJvdG9LZXlzW2ldXSA9IHByb3RvW3Byb3RvS2V5c1tpXV07XG4gIH1cblxuICByZXR1cm4gb2JzO1xufVxuXG52YXIgcHJvdG8gPSB7XG5cbiAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUoY2IpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIF9zdWJzY3JpYmVycyA9IHRoaXMuX3N1YnNjcmliZXJzLFxuICAgICAgICBfYWRkID0gdGhpcy5fYWRkLFxuICAgICAgICBfYWN0aXZhdGUgPSB0aGlzLl9hY3RpdmF0ZSxcbiAgICAgICAgX25hbWUgPSB0aGlzLl9uYW1lO1xuXG5cbiAgICBpZiAoX3N1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkgaWYgKF9hY3RpdmF0ZSkgdGhpcy5fdW5zdWJzY3JpYmUgPSBfYWN0aXZhdGUoX2FkZCk7XG5cbiAgICBfc3Vic2NyaWJlcnMucHVzaChjYik7XG5cbiAgICBpZiAodGhpcy5fbGFzdFZhbHVlICE9PSBVTlNFVCkgY2IodGhpcy5fbGFzdFZhbHVlLCBfbmFtZSB8fCB0aGlzLl9wYXJlbnROYW1lKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBfdW5zdWJzY3JpYmUoKSB7XG4gICAgICB2YXIgaW5kZXggPSBfc3Vic2NyaWJlcnMuaW5kZXhPZihjYik7XG5cbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIF9zdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgIGlmIChfc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSBzZWxmLl91bnN1YnNjcmliZSAmJiBzZWxmLl91bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgbmFtZWQ6IGZ1bmN0aW9uIG5hbWVkKG5hbWUpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG59O1xuXG5mdW5jdGlvbiBwdXNoTmV3VmFsdWUodmFsdWUsIHN1YnNjcmliZXJzLCBuYW1lKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBzdWJzY3JpYmVyc1tpXSh2YWx1ZSwgbmFtZSk7XG4gIH1cbn1cblxuLy8gSW50ZXJuYWwgbWFya2VyXG52YXIgVU5TRVQgPSB7fTtcblxuLy8gRW5yaWNoIHRoZSBPYnNlcnZhYmxlIFwicHJvdG90eXBlXCIgdGlsbCAobWF5YmUpIHdlIGhhdmUgdGhlIHw+IG9wZXJhdG9yIVxucHJvdG8uZGVib3VuY2UgPSBmdW5jdGlvbiAodGltZSkge1xuICByZXR1cm4gKDAsIF9kZWJvdW5jZTMuZGVmYXVsdCkodGltZSwgdGhpcyk7XG59O1xucHJvdG8uZGVsYXkgPSBmdW5jdGlvbiAodGltZSkge1xuICByZXR1cm4gKDAsIF9kZWxheTMuZGVmYXVsdCkodGltZSwgdGhpcyk7XG59O1xucHJvdG8uZHJvcCA9IGZ1bmN0aW9uIChjb3VudCkge1xuICByZXR1cm4gKDAsIF9kcm9wMy5kZWZhdWx0KShjb3VudCwgdGhpcyk7XG59O1xucHJvdG8uZmlsdGVyID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiAoMCwgX2ZpbHRlcjMuZGVmYXVsdCkoZm4sIHRoaXMpO1xufTtcbnByb3RvLmZsYXRNYXBMYXRlc3QgPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuICgwLCBfZmxhdE1hcExhdGVzdDMuZGVmYXVsdCkoZm4sIHRoaXMpO1xufTtcbnByb3RvLm1hcCA9IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gKDAsIF9tYXAzLmRlZmF1bHQpKGZuLCB0aGlzKTtcbn07XG5wcm90by5wYXJ0aXRpb24gPSBmdW5jdGlvbiAocHJlZGljYXRlKSB7XG4gIHJldHVybiAoMCwgX3BhcnRpdGlvbjMuZGVmYXVsdCkocHJlZGljYXRlLCB0aGlzKTtcbn07XG5wcm90by5zbGlkaW5nID0gZnVuY3Rpb24gKG51bSkge1xuICByZXR1cm4gKDAsIF9zbGlkaW5nMy5kZWZhdWx0KShudW0sIHRoaXMpO1xufTtcbnByb3RvLnNsaWRpbmcyID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gKDAsIF9zbGlkaW5nMi5zbGlkaW5nMikodGhpcyk7XG59O1xucHJvdG8udGhyb3R0bGUgPSBmdW5jdGlvbiAodGltZSkge1xuICByZXR1cm4gKDAsIF90aHJvdHRsZTMuZGVmYXVsdCkodGltZSwgdGhpcyk7XG59O1xuXG4vLyBFbnJpY2ggdGhlIE9ic2VydmFibGUgb2JqZWN0XG5PYnNlcnZhYmxlLnB1cmUgPSBfcHVyZTMuZGVmYXVsdDtcbk9ic2VydmFibGUuZnJvbUV2ZW50ID0gX2Zyb21FdmVudDMuZGVmYXVsdDtcbk9ic2VydmFibGUuZnJvbVByb21pc2UgPSBfZnJvbVByb21pc2UzLmRlZmF1bHQ7XG5PYnNlcnZhYmxlLmludGVydmFsID0gX2ludGVydmFsMy5kZWZhdWx0O1xuT2JzZXJ2YWJsZS5tZXJnZSA9IF9tZXJnZTMuZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34va2FpanUvb2JzZXJ2YWJsZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmggPSBleHBvcnRzLlJlbmRlciA9IGV4cG9ydHMubG9nID0gZXhwb3J0cy5zdGFydEFwcCA9IGV4cG9ydHMuTWVzc2FnZSA9IGV4cG9ydHMuQ29tcG9uZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX3NuYWJiZG9tID0gcmVxdWlyZSgnc25hYmJkb20nKTtcblxudmFyIF9zbmFiYmRvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zbmFiYmRvbSk7XG5cbnZhciBfaCA9IHJlcXVpcmUoJ3NuYWJiZG9tL2gnKTtcblxudmFyIF9oMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2gpO1xuXG52YXIgX3Rvdm5vZGUgPSByZXF1aXJlKCdzbmFiYmRvbS90b3Zub2RlJyk7XG5cbnZhciBfdG92bm9kZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b3Zub2RlKTtcblxudmFyIF9yZW5kZXIgPSByZXF1aXJlKCcuL2xpYi9yZW5kZXInKTtcblxudmFyIF9jb21wb25lbnQgPSByZXF1aXJlKCcuL2xpYi9jb21wb25lbnQnKTtcblxudmFyIF9jb21wb25lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9uZW50KTtcblxudmFyIF9tZXNzYWdlID0gcmVxdWlyZSgnLi9saWIvbWVzc2FnZScpO1xuXG52YXIgX21lc3NhZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzc2FnZSk7XG5cbnZhciBfZXZlbnRzID0gcmVxdWlyZSgnLi9saWIvZXZlbnRzJyk7XG5cbnZhciBfbG9nID0gcmVxdWlyZSgnLi9saWIvbG9nJyk7XG5cbnZhciBfbG9nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xvZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHN0YXJ0QXBwKF9yZWYpIHtcbiAgdmFyIGFwcCA9IF9yZWYuYXBwLFxuICAgICAgZWxtID0gX3JlZi5lbG0sXG4gICAgICByZXBsYWNlRWxtID0gX3JlZi5yZXBsYWNlRWxtLFxuICAgICAgc25hYmJkb21Nb2R1bGVzID0gX3JlZi5zbmFiYmRvbU1vZHVsZXM7XG5cbiAgdmFyIG1vZHVsZXMgPSBzbmFiYmRvbU1vZHVsZXMuY29uY2F0KF9ldmVudHMuZXZlbnRzTW9kdWxlKTtcbiAgKDAsIF9yZW5kZXIuc2V0UGF0Y2hGdW5jdGlvbikoX3NuYWJiZG9tMi5kZWZhdWx0LmluaXQobW9kdWxlcykpO1xuICAoMCwgX3JlbmRlci5yZW5kZXJTeW5jKShyZXBsYWNlRWxtID8gKDAsIF90b3Zub2RlMi5kZWZhdWx0KShlbG0pIDogZWxtLCBhcHAsIHJlcGxhY2VFbG0pO1xufVxuXG5leHBvcnRzLkNvbXBvbmVudCA9IF9jb21wb25lbnQyLmRlZmF1bHQ7XG5leHBvcnRzLk1lc3NhZ2UgPSBfbWVzc2FnZTIuZGVmYXVsdDtcbmV4cG9ydHMuc3RhcnRBcHAgPSBzdGFydEFwcDtcbmV4cG9ydHMubG9nID0gX2xvZzIuZGVmYXVsdDtcbmV4cG9ydHMuUmVuZGVyID0gX3JlbmRlci5SZW5kZXI7XG5leHBvcnRzLmggPSBfaDIuZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34va2FpanUvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4vLyBUaGUgT3B0aW9uIGZhY3RvcnkgLyBzdGF0aWMgb2JqZWN0XG52YXIgT3B0aW9uT2JqZWN0ID0gZnVuY3Rpb24gT3B0aW9uT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzRGVmKHZhbHVlKSA/IFNvbWUodmFsdWUpIDogZXhwb3J0cy5Ob25lO1xufTtcbk9wdGlvbk9iamVjdC5hbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHZhbHVlID0gYXJnc1tpXTtcbiAgICAgICAgaWYgKGV4cG9ydHMuT3B0aW9uLmlzT3B0aW9uKHZhbHVlKSlcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuZ2V0KCk7XG4gICAgICAgIGlmICghaXNEZWYodmFsdWUpKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuICh2YWx1ZXMubGVuZ3RoID09PSBhcmdzLmxlbmd0aCkgPyBTb21lKHZhbHVlcykgOiBleHBvcnRzLk5vbmU7XG59O1xuT3B0aW9uT2JqZWN0LmlzT3B0aW9uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuICEhdmFsdWUgJiYgKHZhbHVlLl9pc1NvbWUgPT09IHRydWUgfHwgdmFsdWUuX2lzTm9uZSA9PT0gdHJ1ZSk7XG59O1xuZnVuY3Rpb24gbWFrZU5vbmUoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICBmdW5jdGlvbiByZXR1cm5Ob25lKCkgeyByZXR1cm4gZXhwb3J0cy5Ob25lOyB9XG4gICAgc2VsZi5faXNOb25lID0gdHJ1ZTtcbiAgICBzZWxmLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfTtcbiAgICBzZWxmLmlzRGVmaW5lZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9O1xuICAgIHNlbGYuZm9yRWFjaCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBzZWxmLm1hcCA9IHJldHVybk5vbmU7XG4gICAgc2VsZi5mbGF0TWFwID0gcmV0dXJuTm9uZTtcbiAgICBzZWxmLmZpbHRlciA9IHJldHVybk5vbmU7XG4gICAgc2VsZi5vckVsc2UgPSBmdW5jdGlvbiAoYWx0KSB7IHJldHVybiBhbHQoKTsgfTtcbiAgICBzZWxmLmdldE9yRWxzZSA9IGZ1bmN0aW9uIChhbHQpIHsgcmV0dXJuIGFsdDsgfTtcbiAgICBzZWxmLm1hdGNoID0gZnVuY3Rpb24gKG1hdGNoZXIpIHsgcmV0dXJuIG1hdGNoZXIuTm9uZSgpOyB9O1xuICAgIHNlbGYudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnTm9uZSc7IH07XG4gICAgc2VsZi50b0pTT04gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9O1xuICAgIHJldHVybiBzZWxmO1xufVxuZnVuY3Rpb24gX1NvbWUodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG59XG5fU29tZS5wcm90b3R5cGUgPSB7XG4gICAgX2lzU29tZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfSxcbiAgICBpc0RlZmluZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgZm4odGhpcy52YWx1ZSk7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZm4odGhpcy52YWx1ZSk7XG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0WydfaXNMaWZ0V3JhcHBlciddKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnZhbHVlKCk7XG4gICAgICAgIHJldHVybiBleHBvcnRzLk9wdGlvbihyZXN1bHQpO1xuICAgIH0sXG4gICAgZmxhdE1hcDogZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHJldHVybiBmbih0aGlzLnZhbHVlKTtcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHJldHVybiBmbih0aGlzLnZhbHVlKSA/IHRoaXMgOiBleHBvcnRzLk5vbmU7XG4gICAgfSxcbiAgICBvckVsc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBnZXRPckVsc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfSxcbiAgICBtYXRjaDogZnVuY3Rpb24gKG1hdGNoZXIpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXIuU29tZSh0aGlzLnZhbHVlKTtcbiAgICB9LFxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBcIlNvbWUoXCIgKyB0aGlzLnZhbHVlICsgXCIpXCI7XG4gICAgfSxcbiAgICB0b0pTT046IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxufTtcbmZ1bmN0aW9uIGlzRGVmKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG5leHBvcnRzLk9wdGlvbiA9IE9wdGlvbk9iamVjdDtcbi8qKiBDcmVhdGVzIGEgbmV3IFNvbWUgaW5zdGFuY2UgdXNpbmcgYSBub24gbnVsbGFibGUgdmFsdWUgKi9cbmZ1bmN0aW9uIFNvbWUodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9Tb21lKHZhbHVlKTtcbn1cbmV4cG9ydHMuU29tZSA9IFNvbWU7XG5leHBvcnRzLk5vbmUgPSBtYWtlTm9uZSgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L29wdGlvbi50cy9saWIvb3B0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNsYXNzXzEgPSByZXF1aXJlKFwic25hYmJkb20vbW9kdWxlcy9jbGFzc1wiKTtcbnZhciBwcm9wc18xID0gcmVxdWlyZShcInNuYWJiZG9tL21vZHVsZXMvcHJvcHNcIik7XG52YXIgYXR0cmlidXRlc18xID0gcmVxdWlyZShcInNuYWJiZG9tL21vZHVsZXMvYXR0cmlidXRlc1wiKTtcbnZhciByb3V0ZXJfMSA9IHJlcXVpcmUoXCJ1dGlsL3JvdXRlclwiKTtcbmV4cG9ydHMuUm91dGVyID0gcm91dGVyXzEuUm91dGVyO1xuZXhwb3J0cy5Sb3V0ZURlZiA9IHJvdXRlcl8xLlJvdXRlRGVmO1xudmFyIGFwcF8xID0gcmVxdWlyZShcInZpZXcvYXBwXCIpO1xudmFyIHNuYWJiZG9tTW9kdWxlcyA9IFtcbiAgICBjbGFzc18xLmRlZmF1bHQsXG4gICAgcHJvcHNfMS5kZWZhdWx0LFxuICAgIGF0dHJpYnV0ZXNfMS5kZWZhdWx0XG5dO1xudmFyIGFwcCA9IGFwcF8xLmRlZmF1bHQoKTtcbnZhciByb3V0ZXIgPSByb3V0ZXJfMS5Sb3V0ZXIoe1xuICAgIHJvdXRlczogeyBhcHA6IGFwcCB9LFxuICAgIGVsbTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NjcmVlbkxheWVyJyksXG4gICAgc25hYmJkb21Nb2R1bGVzOiBzbmFiYmRvbU1vZHVsZXMsXG4gICAgdXJsU3luYzogJ2hhc2gnLFxuICAgIG5vdEZvdW5kOiBhcHAubm90Rm91bmRcbn0pO1xuLy8gU2tpcCB0aGUgZmlyc3QgbGV2ZWwgc28gdGhhdCB3ZSBkb24ndCBoYXZlIHRvIHdyaXRlICdhcHAuJyBldmVyeXRpbWVcbmV4cG9ydHMucm91dGVzID0gcm91dGVyLnJvdXRlcy5hcHA7XG5yb3V0ZXIuaW5pdCgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcm91dGVyLnRzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHZub2RlXzEgPSByZXF1aXJlKFwiLi92bm9kZVwiKTtcbnZhciBpcyA9IHJlcXVpcmUoXCIuL2lzXCIpO1xuZnVuY3Rpb24gYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCkge1xuICAgIGRhdGEubnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICAgIGlmIChzZWwgIT09ICdmb3JlaWduT2JqZWN0JyAmJiBjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZERhdGEgPSBjaGlsZHJlbltpXS5kYXRhO1xuICAgICAgICAgICAgaWYgKGNoaWxkRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYWRkTlMoY2hpbGREYXRhLCBjaGlsZHJlbltpXS5jaGlsZHJlbiwgY2hpbGRyZW5baV0uc2VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGgoc2VsLCBiLCBjKSB7XG4gICAgdmFyIGRhdGEgPSB7fSwgY2hpbGRyZW4sIHRleHQsIGk7XG4gICAgaWYgKGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgaWYgKGlzLmFycmF5KGMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGMpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjICYmIGMuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtjXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzLmFycmF5KGIpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGIpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiICYmIGIuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpcy5hcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoaXMucHJpbWl0aXZlKGNoaWxkcmVuW2ldKSlcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltpXSA9IHZub2RlXzEudm5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2hpbGRyZW5baV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxbMF0gPT09ICdzJyAmJiBzZWxbMV0gPT09ICd2JyAmJiBzZWxbMl0gPT09ICdnJyAmJlxuICAgICAgICAoc2VsLmxlbmd0aCA9PT0gMyB8fCBzZWxbM10gPT09ICcuJyB8fCBzZWxbM10gPT09ICcjJykpIHtcbiAgICAgICAgYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCk7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZV8xLnZub2RlKHNlbCwgZGF0YSwgY2hpbGRyZW4sIHRleHQsIHVuZGVmaW5lZCk7XG59XG5leHBvcnRzLmggPSBoO1xuO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWguanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NuYWJiZG9tL2guanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnNob3VsZExvZyA9IHNob3VsZExvZztcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgcmVuZGVyOiBmYWxzZSxcbiAgbWVzc2FnZTogZmFsc2Vcbn07XG5mdW5jdGlvbiBzaG91bGRMb2cobG9nLCBrZXkpIHtcbiAgcmV0dXJuIGxvZyA9PT0gdHJ1ZSB8fCBsb2cgPT09IGtleTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34va2FpanUvbGliL2xvZy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIHZub2RlKHNlbCwgZGF0YSwgY2hpbGRyZW4sIHRleHQsIGVsbSkge1xuICAgIHZhciBrZXkgPSBkYXRhID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBkYXRhLmtleTtcbiAgICByZXR1cm4geyBzZWw6IHNlbCwgZGF0YTogZGF0YSwgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgICAgICB0ZXh0OiB0ZXh0LCBlbG06IGVsbSwga2V5OiBrZXkgfTtcbn1cbmV4cG9ydHMudm5vZGUgPSB2bm9kZTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZub2RlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dm5vZGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NuYWJiZG9tL3Zub2RlLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMubm9vcCA9IG5vb3A7XG5leHBvcnRzLmFycmF5VG9PYmplY3QgPSBhcnJheVRvT2JqZWN0O1xuZXhwb3J0cy5vYmplY3RUb0FycmF5ID0gb2JqZWN0VG9BcnJheTtcbmV4cG9ydHMuY29weU9iamVjdCA9IGNvcHlPYmplY3Q7XG5leHBvcnRzLm1lcmdlT2JqZWN0cyA9IG1lcmdlT2JqZWN0cztcbmV4cG9ydHMubWFwVmFsdWVzID0gbWFwVmFsdWVzO1xuZXhwb3J0cy5vYmplY3REaWZmID0gb2JqZWN0RGlmZjtcbmV4cG9ydHMubWFrZU1lc3NhZ2UgPSBtYWtlTWVzc2FnZTtcbmV4cG9ydHMucGFyc2VQYXRocyA9IHBhcnNlUGF0aHM7XG5leHBvcnRzLnBhcnNlUXVlcnlQYXJhbXMgPSBwYXJzZVF1ZXJ5UGFyYW1zO1xuZXhwb3J0cy5ub3JtYWxpemVQYXRoUXVlcnkgPSBub3JtYWxpemVQYXRoUXVlcnk7XG5leHBvcnRzLnN0YXRlU2hvcnRoYW5kID0gc3RhdGVTaG9ydGhhbmQ7XG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnJheSkge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKGZ1bmN0aW9uIChvYmosIGl0ZW0pIHtcbiAgICBvYmpbaXRlbV0gPSAxO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gb2JqZWN0VG9BcnJheShvYmopIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBhcnJheS5wdXNoKG9ialtrZXldKTtcbiAgfXJldHVybiBhcnJheTtcbn1cblxuZnVuY3Rpb24gY29weU9iamVjdChvYmopIHtcbiAgdmFyIGNvcHkgPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGNvcHlba2V5XSA9IG9ialtrZXldO1xuICB9cmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0cyh0bywgZnJvbSkge1xuICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gIH1yZXR1cm4gdG87XG59XG5cbmZ1bmN0aW9uIG1hcFZhbHVlcyhvYmosIGZuKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIHJlc3VsdFtrZXldID0gZm4ob2JqW2tleV0pO1xuICB9cmV0dXJuIHJlc3VsdDtcbn1cblxuLypcbiogUmV0dXJuIHRoZSBzZXQgb2YgYWxsIHRoZSBrZXlzIHRoYXQgY2hhbmdlZCAoZWl0aGVyIGFkZGVkLCByZW1vdmVkIG9yIG1vZGlmaWVkKS5cbiovXG5mdW5jdGlvbiBvYmplY3REaWZmKG9iajEsIG9iajIpIHtcbiAgdmFyIHVwZGF0ZSA9IHt9O1xuICB2YXIgZW50ZXIgPSB7fTtcbiAgdmFyIGV4aXQgPSB7fTtcbiAgdmFyIGFsbCA9IHt9O1xuXG4gIG9iajEgPSBvYmoxIHx8IHt9O1xuXG4gIGZvciAodmFyIG5hbWUgaW4gb2JqMSkge1xuICAgIGlmICghKG5hbWUgaW4gb2JqMikpIGV4aXRbbmFtZV0gPSBhbGxbbmFtZV0gPSB0cnVlO2Vsc2UgaWYgKG9iajFbbmFtZV0gIT0gb2JqMltuYW1lXSkgdXBkYXRlW25hbWVdID0gYWxsW25hbWVdID0gdHJ1ZTtcbiAgfVxuXG4gIGZvciAodmFyIG5hbWUgaW4gb2JqMikge1xuICAgIGlmICghKG5hbWUgaW4gb2JqMSkpIGVudGVyW25hbWVdID0gYWxsW25hbWVdID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB7IGFsbDogYWxsLCB1cGRhdGU6IHVwZGF0ZSwgZW50ZXI6IGVudGVyLCBleGl0OiBleGl0IH07XG59XG5cbmZ1bmN0aW9uIG1ha2VNZXNzYWdlKCkge1xuICB2YXIgbWVzc2FnZSA9IGFyZ3VtZW50c1swXTtcbiAgdmFyIHRva2VucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZSgneycgKyBpICsgJ30nLCB0b2tlbnNbaV0pO1xuICB9cmV0dXJuIG1lc3NhZ2U7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGF0aHMocGF0aCkge1xuICByZXR1cm4gcGF0aC5zcGxpdCgnLycpLmZpbHRlcihmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5sZW5ndGg7XG4gIH0pLm1hcChmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VRdWVyeVBhcmFtcyhxdWVyeSkge1xuICByZXR1cm4gcXVlcnkgPyBxdWVyeS5zcGxpdCgnJicpLnJlZHVjZShmdW5jdGlvbiAocmVzLCBwYXJhbVZhbHVlKSB7XG4gICAgdmFyIF9wYXJhbVZhbHVlJHNwbGl0ID0gcGFyYW1WYWx1ZS5zcGxpdCgnPScpO1xuXG4gICAgdmFyIHBhcmFtID0gX3BhcmFtVmFsdWUkc3BsaXRbMF07XG4gICAgdmFyIHZhbHVlID0gX3BhcmFtVmFsdWUkc3BsaXRbMV07XG5cbiAgICByZXNbcGFyYW1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICByZXR1cm4gcmVzO1xuICB9LCB7fSkgOiB7fTtcbn1cblxudmFyIExFQURJTkdfU0xBU0hFUyA9IC9eXFwvKy87XG52YXIgVFJBSUxJTkdfU0xBU0hFUyA9IC9eKFteP10qPylcXC8rJC87XG52YXIgVFJBSUxJTkdfU0xBU0hFU19CRUZPUkVfUVVFUlkgPSAvXFwvK1xcPy87XG5mdW5jdGlvbiBub3JtYWxpemVQYXRoUXVlcnkocGF0aFF1ZXJ5KSB7XG4gIHJldHVybiAnLycgKyBwYXRoUXVlcnkucmVwbGFjZShMRUFESU5HX1NMQVNIRVMsICcnKS5yZXBsYWNlKFRSQUlMSU5HX1NMQVNIRVMsICckMScpLnJlcGxhY2UoVFJBSUxJTkdfU0xBU0hFU19CRUZPUkVfUVVFUlksICc/Jyk7XG59XG5cbmZ1bmN0aW9uIHN0YXRlU2hvcnRoYW5kKHVyaSwgb3B0aW9ucywgY2hpbGRyZW4pIHtcbiAgcmV0dXJuIG1lcmdlT2JqZWN0cyh7IHVyaTogdXJpLCBjaGlsZHJlbjogY2hpbGRyZW4gfHwge30gfSwgb3B0aW9ucyk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2FieXNzYS9saWIvdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4vKiogUGVyZm9ybXMgYSBzaGFsbG93IHVwZGF0ZSBvZiBhbiBvYmplY3QgdXNpbmcgYSBwYXJ0aWFsIG9iamVjdCBvZiB0aGUgc2FtZSBzaGFwZS4gQSBuZXcgb2JqZWN0IGlzIHJldHVybmVkLiAqL1xuZnVuY3Rpb24gdXBkYXRlKGhvc3QsIHNwZWMpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgT2JqZWN0LmtleXMoaG9zdCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IHJlc3VsdFtrZXldID0gaG9zdFtrZXldOyB9KTtcbiAgICBmb3IgKHZhciBrZXkgaW4gc3BlYykge1xuICAgICAgICB2YXIgc3BlY1ZhbHVlID0gc3BlY1trZXldO1xuICAgICAgICBpZiAoc3BlY1ZhbHVlID09PSBleHBvcnRzLkRFTEVURSkge1xuICAgICAgICAgICAgZGVsZXRlIHJlc3VsdFtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBzcGVjVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMudXBkYXRlID0gdXBkYXRlO1xuLy8gV2UgbGllIGFib3V0IHRoZSBwdWJsaWMgdHlwZSBzbyB0aGF0IG9ubHkgYSBwcm9wZXJ0eSB0aGF0IGlzIG9wdGlvbmFsIG9yIHRoYXQgY2FuIGJlIGFzc2lnbmVkIHRvIHVuZGVmaW5lZCBjYW4gYmUgREVMRVRFJ2Rcbi8qKiBNYXJrZXIgdXNlZCB0byBkZWxldGUgYSBrZXkgKi9cbmV4cG9ydHMuREVMRVRFID0ge307XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW1tdXBkYXRlL2xpYi9pbW11cGRhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5TZXQgPSBTZXQ7XG5leHBvcnRzLnNoYWxsb3dFcXVhbCA9IHNoYWxsb3dFcXVhbDtcbmZ1bmN0aW9uIFNldCgpIHtcbiAgdmFyIHNldCA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHNldFthcmd1bWVudHNbaV1dID0gMTtcbiAgfVxuICByZXR1cm4gc2V0O1xufVxuXG4vKiBFZmZpY2llbnQgc2hhbGxvdyBjb21wYXJpc29uIG9mIHR3byBvYmplY3RzICovXG5cbmZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIGlmIChvYmpBID09PSBvYmpCKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSByZXR1cm47XG5cbiAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQidzLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHZhbEEgPSBvYmpBW2tleXNBW2ldXTtcbiAgICB2YXIgdmFsQiA9IG9iakJba2V5c0FbaV1dO1xuXG4gICAgaWYgKHZhbEEgIT09IHZhbEIpIHtcbiAgICAgIGlmICh2YWxBICYmIHZhbEEudHlwZSA9PT0gJ3BhcnRpYWxseUFwcGxpZWRNZXNzYWdlJykge1xuICAgICAgICAvLyBBIHBhcnRpYWxseSBhcHBsaWVkIG1lc3NhZ2Ugd2lsbCBhbHdheXMgaGF2ZSBhIG5ldyByZWZlcmVuY2UsXG4gICAgICAgIC8vIHNvIGNvbXBhcmUgdGhlIHJlZmVyZW5jZXMgb2YgdGhlIHBheWxvYWRzIGluc3RlYWQuXG4gICAgICAgIC8vIEl0IGlzIGFzc3VtZWQgTWVzc2FnZXMgYXJlIHN0YWJsZSBmb3IgYSBnaXZlbiBrZXkuXG4gICAgICAgIGlmICh2YWxBLnBheWxvYWQgIT09IHZhbEIucGF5bG9hZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34va2FpanUvbGliL3V0aWwuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IFN0b3JlO1xuXG52YXIgX29ic2VydmFibGUgPSByZXF1aXJlKCcuLi9vYnNlcnZhYmxlJyk7XG5cbnZhciBfbWVzc2FnZSA9IHJlcXVpcmUoJy4uL2xpYi9tZXNzYWdlJyk7XG5cbnZhciBfbWVzc2FnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXNzYWdlKTtcblxudmFyIF9sb2cgPSByZXF1aXJlKCcuLi9saWIvbG9nJyk7XG5cbnZhciBfbG9nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xvZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qXG4gKiBBIFN0b3JlIGlzIGFuIE9ic2VydmFibGUgdGhhdCBpcyBndWFyYW50ZWVkIHRvIGhhdmUgYW4gaW5pdGlhbCB2YWx1ZVxuICogYW5kIGNhbiBiZSBtb2RpZmllZCBmcm9tIHRoZSBvdXRzaWRlIGJ5IHR5cGUtc2FmZSBtZXNzYWdlcy5cbiAqL1xuZnVuY3Rpb24gU3RvcmUoaW5pdGlhbFN0YXRlLCByZWdpc3RlckhhbmRsZXJzKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBlbXB0eTtcblxuICB2YXIgc3RvcmUgPSB7fTtcblxuICAvLyBNZXNzYWdlIGhhbmRsZXJzIGZvciB0aGUgb24obWVzc2FnZSkgc3ludGF4XG4gIHZhciBoYW5kbGVycyA9IHt9O1xuICAvLyB1bnN1YnNjcmliZSBmdW5jdGlvbnMgY3JlYXRlZCBieSB0aGUgb24ob2JzZXJ2YWJsZSkgc3ludGF4XG4gIHZhciBzdWJzY3JpcHRpb25zID0gW107XG4gIC8vIExpc3Qgb2YgdGhlIG1lc3NhZ2VzIHRoYXQgYXJlIGxpc3RlbmVkIHRvIGluIG9yZGVyIHRvIGNyZWF0ZSBvYnNlcnZhYmxlc1xuICB2YXIgbGlzdGVuZWQgPSB7fTtcbiAgLy8gRGlzcGF0Y2hpbmcgcXVldWUsIHdoZW4gYSBtZXNzYWdlIGhhbmRsZXIgc2VuZHMgYWRkaXRpb25hbCBtZXNzYWdlc1xuICB2YXIgcXVldWUgPSBbXTtcbiAgLy8gU3RhY2sgc2l6ZSB3aGlsZSByZWNlaXZpbmcgYSBtZXNzYWdlXG4gIHZhciBzdGFjayA9IDA7XG5cbiAgdmFyIHJlY2VpdmluZyA9IGZhbHNlO1xuXG4gIHZhciBuYW1lID0gb3B0aW9ucy5uYW1lO1xuICB2YXIgc2hvdWxkTG9nID0gb3B0aW9ucy5sb2cgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubG9nIDogX2xvZzIuZGVmYXVsdC5tZXNzYWdlID09PSB0cnVlO1xuICB2YXIgc3RvcmVOYW1lID0gbmFtZSB8fCAocmVnaXN0ZXJIYW5kbGVycy5uYW1lID8gcmVnaXN0ZXJIYW5kbGVycy5uYW1lICsgJyBzdG9yZScgOiAnU3RvcmUnKTtcblxuICB2YXIgbXNnID0ge1xuICAgIHNlbmQ6IGZ1bmN0aW9uIHNlbmQobSkge1xuICAgICAgcmV0dXJuIHN0b3JlLnNlbmQobSk7XG4gICAgfSwgLy8gTGF0ZSBiaW5kaW5nIGFzIHN0b3JlLnNlbmQgaXMgbm90IHlldCBkZWZpbmVkXG4gICAgbGlzdGVuOiBmdW5jdGlvbiBsaXN0ZW4obWVzc2FnZSkge1xuICAgICAgdmFyIG9ic2VydmFibGUgPSAoMCwgX29ic2VydmFibGUuT2JzZXJ2YWJsZSkoKS5uYW1lZChtZXNzYWdlLl9uYW1lKTtcbiAgICAgIHZhciBvYnNzID0gbGlzdGVuZWRbbWVzc2FnZS5faWRdO1xuICAgICAgaWYgKCFvYnNzKSBvYnNzID0gbGlzdGVuZWRbbWVzc2FnZS5faWRdID0gW107XG4gICAgICBvYnNzLnB1c2gob2JzZXJ2YWJsZSk7XG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gb24oc3JjLCBmbikge1xuICAgIGlmIChzcmMuX2lzTWVzc2FnZSkge1xuICAgICAgaGFuZGxlcnNbc3JjLl9pZF0gPSBmbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVuc3Vic2NyaWJlID0gc3JjLnN1YnNjcmliZShmdW5jdGlvbiAodmFsLCBuYW1lKSB7XG4gICAgICAgIHJlY2VpdmUobmFtZSwgZm4sIHZhbCk7XG4gICAgICB9KTtcblxuICAgICAgc3Vic2NyaXB0aW9ucy5wdXNoKHVuc3Vic2NyaWJlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlKHNvdXJjZU5hbWUsIGhhbmRsZXIsIGFyZykge1xuICAgIHF1ZXVlLnB1c2goeyBzb3VyY2VOYW1lOiBzb3VyY2VOYW1lLCBoYW5kbGVyOiBoYW5kbGVyLCBhcmc6IGFyZyB9KTtcblxuICAgIGlmIChzdGFjayA+PSAxMCkgdGhyb3cgbmV3IEVycm9yKCdJbmZpbml0ZSBsb29wIHdoaWxlIGhhbmRsaW5nICcgKyBzb3VyY2VOYW1lKTtcbiAgICBpZiAocmVjZWl2aW5nKSByZXR1cm47XG5cbiAgICByZWNlaXZpbmcgPSB0cnVlO1xuXG4gICAgdmFyIHN0YXRlID0gc3RvcmUuc3RhdGUoKTtcblxuICAgIHRyeSB7XG4gICAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHZhciBfcXVldWUkc2hpZnQgPSBxdWV1ZS5zaGlmdCgpLFxuICAgICAgICAgICAgX3NvdXJjZU5hbWUgPSBfcXVldWUkc2hpZnQuc291cmNlTmFtZSxcbiAgICAgICAgICAgIF9oYW5kbGVyID0gX3F1ZXVlJHNoaWZ0LmhhbmRsZXIsXG4gICAgICAgICAgICBfYXJnID0gX3F1ZXVlJHNoaWZ0LmFyZztcblxuICAgICAgICBzdGFjaysrO1xuXG4gICAgICAgIGlmIChzaG91bGRMb2cpIGNvbnNvbGUubG9nKCclYycgKyBfc291cmNlTmFtZSArICcgJWNyZWNlaXZlZCBieSAlYycgKyBzdG9yZU5hbWUsICdjb2xvcjogI0IzMUVBNicsICdjb2xvcjogYmxhY2snLCAnZm9udC13ZWlnaHQ6IGJvbGQnLCAnd2l0aCcsIF9hcmcpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBfaGFuZGxlcihzdGF0ZSwgX2FyZyk7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkgc3RhdGUgPSByZXN1bHQ7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHJlY2VpdmluZyA9IGZhbHNlO1xuICAgICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICAgIHN0YWNrID0gMDtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUgIT09IHN0b3JlLnN0YXRlKCkgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCkgc3RvcmUuc3RhdGUoc3RhdGUpO1xuICB9XG5cbiAgc3RvcmUuc3RhdGUgPSAoMCwgX29ic2VydmFibGUuT2JzZXJ2YWJsZSkoKShpbml0aWFsU3RhdGUpLm5hbWVkKHN0b3JlTmFtZSArICcuc3RhdGUnKTtcbiAgLy8gRWFnZXJseSBhY3RpdmF0ZSAoaG90KVxuICBzdG9yZS5zdGF0ZS5zdWJzY3JpYmUoZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4geDtcbiAgfSk7XG5cbiAgcmVnaXN0ZXJIYW5kbGVycyhvbiwgbXNnKTtcblxuICBzdG9yZS5zZW5kID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICB2YXIgX2lkID0gbWVzc2FnZS5faWQsXG4gICAgICAgIF9uYW1lID0gbWVzc2FnZS5fbmFtZSxcbiAgICAgICAgcGF5bG9hZCA9IG1lc3NhZ2UucGF5bG9hZDtcblxuICAgIHZhciBoYW5kbGVyID0gaGFuZGxlcnNbX2lkXTtcbiAgICB2YXIgaGFuZGxlZCA9IGZhbHNlO1xuXG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIHJlY2VpdmUoX25hbWUsIGhhbmRsZXIsIHBheWxvYWQpO1xuICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIG9ic3MgPSBsaXN0ZW5lZFtfaWRdO1xuXG4gICAgaWYgKG9ic3MpIHtcbiAgICAgIG9ic3MuZm9yRWFjaChmdW5jdGlvbiAob2JzKSB7XG4gICAgICAgIHJldHVybiBvYnMocGF5bG9hZCk7XG4gICAgICB9KTtcbiAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChoYW5kbGVkKSByZXR1cm47XG5cbiAgICB2YXIgdW5oYW5kbGVkID0gaGFuZGxlcnNbX21lc3NhZ2UyLmRlZmF1bHQudW5oYW5kbGVkLl9pZF07XG5cbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZWNlaXZlKF9tZXNzYWdlMi5kZWZhdWx0LnVuaGFuZGxlZC5fbmFtZSwgdW5oYW5kbGVkLCBtZXNzYWdlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLndhcm4oJ1VuaGFuZGxlZCBtZXNzYWdlIFwiJyArIF9uYW1lICsgJ1wiIGF0ICVjJyArIHN0b3JlTmFtZSwgJ2ZvbnQtd2VpZ2h0OiBib2xkJyk7XG4gIH07XG5cbiAgc3RvcmUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzdG9yZS5zdGF0ZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbiAgICBzdG9yZS5zdGF0ZS5zdWJzY3JpYmUgPSBub29wO1xuICAgIHN0b3JlLnNlbmQgPSBub29wO1xuICAgIHN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH0pO1xuICAgIHN1YnNjcmlwdGlvbnMubGVuZ3RoID0gMDtcbiAgfTtcblxuICByZXR1cm4gc3RvcmU7XG59XG5cbnZhciBlbXB0eSA9IHt9O1xuZnVuY3Rpb24gbm9vcCgpIHt9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2thaWp1L3N0b3JlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cblwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ob3RBc2tlZCA9IHsgdHlwZTogJ25vdEFza2VkJyB9O1xuZXhwb3J0cy5Mb2FkaW5nID0geyB0eXBlOiAnbG9hZGluZycgfTtcbmV4cG9ydHMuUmVmcmVzaGluZyA9IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiAoeyB0eXBlOiAncmVmcmVzaGluZycsIGRhdGE6IGRhdGEgfSk7IH07XG5leHBvcnRzLlN1Y2Nlc3MgPSBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gKHsgdHlwZTogJ3N1Y2Nlc3MnLCBkYXRhOiBkYXRhIH0pOyB9O1xuZXhwb3J0cy5GYWlsdXJlID0gZnVuY3Rpb24gKGVycm9yKSB7IHJldHVybiAoeyB0eXBlOiAnZmFpbHVyZScsIGVycm9yOiBlcnJvciB9KTsgfTtcbi8qKlxuICogVHJhbnNmb3JtcyBhIFJlbW90ZURhdGEgdW5pb24gb2JqZWN0IHRvIGRhdGEvZXJyb3IvbG9hZGluZyBwcmltaXRpdmVzXG4gKiB3aGljaCBhcmUgc29tZXRpbWVzIG1vcmUgY29udmVuaWVudCB0byBtYW5pcHVsYXRlLlxuICovXG5mdW5jdGlvbiB1bnBhY2soZGF0YSkge1xuICAgIHN3aXRjaCAoZGF0YS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ25vdEFza2VkJzogcmV0dXJuIHsgbG9hZGluZzogZmFsc2UgfTtcbiAgICAgICAgY2FzZSAnbG9hZGluZyc6IHJldHVybiB7IGxvYWRpbmc6IHRydWUgfTtcbiAgICAgICAgY2FzZSAncmVmcmVzaGluZyc6IHJldHVybiB7IGxvYWRpbmc6IHRydWUsIGRhdGE6IGRhdGEuZGF0YSB9O1xuICAgICAgICBjYXNlICdzdWNjZXNzJzogcmV0dXJuIHsgZGF0YTogZGF0YS5kYXRhLCBsb2FkaW5nOiBmYWxzZSB9O1xuICAgICAgICBjYXNlICdmYWlsdXJlJzogcmV0dXJuIHsgZXJyb3I6IGRhdGEuZXJyb3IsIGxvYWRpbmc6IGZhbHNlIH07XG4gICAgfVxufVxuZXhwb3J0cy51bnBhY2sgPSB1bnBhY2s7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlsL3JlbW90ZURhdGEudHNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG4vKiBSZXByZXNlbnRzIHRoZSBwdWJsaWMgQVBJIG9mIHRoZSBsYXN0IGluc3RhbmNpYXRlZCByb3V0ZXI7IFVzZWZ1bCB0byBicmVhayBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYmV0d2VlbiByb3V0ZXIgYW5kIGl0cyBzdGF0ZXMgKi9cbnZhciBhcGkgPSB7fTtcbmV4cG9ydHMuZGVmYXVsdCA9IGFwaTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYWJ5c3NhL2xpYi9hcGkuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMudXRpbCA9IGV4cG9ydHMuU3RhdGUgPSBleHBvcnRzLmFwaSA9IGV4cG9ydHMuUm91dGVyID0gdW5kZWZpbmVkO1xuXG52YXIgX3V0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxudmFyIHV0aWwgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbCk7XG5cbnZhciBfUm91dGVyID0gcmVxdWlyZSgnLi9Sb3V0ZXInKTtcblxudmFyIF9Sb3V0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUm91dGVyKTtcblxudmFyIF9hcGkgPSByZXF1aXJlKCcuL2FwaScpO1xuXG52YXIgX2FwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hcGkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG52YXIgU3RhdGUgPSB1dGlsLnN0YXRlU2hvcnRoYW5kO1xuXG5leHBvcnRzLlJvdXRlciA9IF9Sb3V0ZXIyLmRlZmF1bHQ7XG5leHBvcnRzLmFwaSA9IF9hcGkyLmRlZmF1bHQ7XG5leHBvcnRzLlN0YXRlID0gU3RhdGU7XG5leHBvcnRzLnV0aWwgPSB1dGlsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9hYnlzc2EvbGliL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IE1lc3NhZ2U7XG5cbnZhciBtZXNzYWdlSWQgPSAxO1xuXG4vKiogVXNlci1kZWZpbmVkIGNvbXBvbmVudCBtZXNzYWdlIGZhY3RvcnkgKi9cbmZ1bmN0aW9uIE1lc3NhZ2UobmFtZSkge1xuICB2YXIgX2lkID0gbWVzc2FnZUlkKys7XG5cbiAgZnVuY3Rpb24gbWVzc2FnZShwYXlsb2FkKSB7XG4gICAgdmFyIHJlc3VsdCA9IHsgX2lkOiBfaWQsIF9uYW1lOiBuYW1lLCBwYXlsb2FkOiBwYXlsb2FkIH07XG4gICAgcmVzdWx0LmlzID0gbWVzc2FnZUlzO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBtZXNzYWdlLl9pZCA9IF9pZDtcbiAgbWVzc2FnZS5fbmFtZSA9IG5hbWU7XG4gIG1lc3NhZ2UuX2lzTWVzc2FnZSA9IHRydWU7XG4gIG1lc3NhZ2Uud2l0aCA9IHdpdGhQYXlsb2FkO1xuXG4gIHJldHVybiBtZXNzYWdlO1xufVxuXG5mdW5jdGlvbiB3aXRoUGF5bG9hZChwYXlsb2FkKSB7XG4gIHJldHVybiBQYXJ0aWFsbHlBcHBsaWVkTWVzc2FnZSh0aGlzLCBwYXlsb2FkKTtcbn1cblxuZnVuY3Rpb24gbWVzc2FnZUlzKG9mVHlwZSkge1xuICByZXR1cm4gdGhpcy5faWQgPT09IG9mVHlwZS5faWQ7XG59XG5cbi8qKiBDcmVhdGVzIGEgbmV3IE1lc3NhZ2UgdHlwZSB0aGF0IGlzIHBhcnRpYWxseSBhcHBsaWVkIHdpdGggYSBwYXlsb2FkICovXG5mdW5jdGlvbiBQYXJ0aWFsbHlBcHBsaWVkTWVzc2FnZShtZXNzYWdlLCBwYXlsb2FkKSB7XG5cbiAgZnVuY3Rpb24gcmVzdWx0KG1heWJlT3RoZXJQYXlsb2FkKSB7XG4gICAgcmV0dXJuIG1lc3NhZ2UobWF5YmVPdGhlclBheWxvYWQgPyBbcGF5bG9hZCwgbWF5YmVPdGhlclBheWxvYWRdIDogcGF5bG9hZCk7XG4gIH1cblxuICByZXN1bHQudHlwZSA9ICdwYXJ0aWFsbHlBcHBsaWVkTWVzc2FnZSc7XG4gIHJlc3VsdC5wYXlsb2FkID0gcGF5bG9hZDtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5NZXNzYWdlLnVuaGFuZGxlZCA9IE1lc3NhZ2UoJ3VuaGFuZGxlZCcpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9rYWlqdS9saWIvbWVzc2FnZS5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gTWVzc2FnZXM7XG5leHBvcnRzLl9zZW5kVG9FbGVtZW50ID0gX3NlbmRUb0VsZW1lbnQ7XG5cbnZhciBfb2JzZXJ2YWJsZSA9IHJlcXVpcmUoJy4uL29ic2VydmFibGUnKTtcblxuLyogTWVzc2FnZSBzZW5kaW5nIGJldHdlZW4gY29tcG9uZW50cywgdGhyb3VnaCB0aGUgRE9NICovXG5cbmZ1bmN0aW9uIE1lc3NhZ2VzKGVsKSB7XG4gIHRoaXMuZWwgPSBlbDtcbn1cblxuTWVzc2FnZXMucHJvdG90eXBlLmxpc3RlbiA9IGZ1bmN0aW9uIChtZXNzYWdlVHlwZSkge1xuICByZXR1cm4gdGhpcy5zdG9yZU1zZy5saXN0ZW4obWVzc2FnZVR5cGUpO1xufTtcblxuTWVzc2FnZXMucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAobXNnKSB7XG4gIHRoaXMuc3RvcmVNc2cuc2VuZChtc2cpO1xufTtcblxuTWVzc2FnZXMucHJvdG90eXBlLnNlbmRUb1BhcmVudCA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgX3NlbmRUb0VsZW1lbnQodGhpcy5lbC5wYXJlbnRFbGVtZW50LCBtc2cpO1xufTtcblxuTWVzc2FnZXMucHJvdG90eXBlLmxpc3RlbkF0ID0gZnVuY3Rpb24gKHNlbGVjdG9yT3JFbCkge1xuICB2YXIgZWwgPSBzZWxlY3Rvck9yRWwgaW5zdGFuY2VvZiBFbGVtZW50ID8gc2VsZWN0b3JPckVsIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yRWwpO1xuXG4gIGlmICghZWwpIHJldHVybjtcblxuICB2YXIgZGVidWdOYW1lID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpICsgKGVsLmlkID8gJyMnICsgZWwuaWQgOiAnJykgKyAoZWwuY2xhc3NOYW1lID8gJy4nICsgZWwuY2xhc3NOYW1lIDogJycpO1xuXG4gIHJldHVybiAoMCwgX29ic2VydmFibGUuT2JzZXJ2YWJsZSkoZnVuY3Rpb24gKGFkZCkge1xuICAgIGVsLl9fc3Vic19fID0gZWwuX19zdWJzX18gfHwgW107XG4gICAgdmFyIHN1YnMgPSBlbC5fX3N1YnNfXztcbiAgICBzdWJzLnB1c2goYWRkKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBzdWJzLnNwbGljZShzdWJzLmluZGV4T2YoYWRkKSwgMSk7XG4gICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIGVsLl9fc3Vic19fID0gdW5kZWZpbmVkO1xuICAgIH07XG4gIH0pLm5hbWVkKCdsaXN0ZW5BdCgnICsgZGVidWdOYW1lICsgJyknKTtcbn07XG5cbi8qKiBTZW5kcyBhIE1lc3NhZ2UgdG8gYSBET00gRWxlbWVudCB0aGF0IHdpbGwgYmUgcmVjZWl2ZWQgYnkgdGhlIG5lYXJlc3QgY29tcG9uZW50ICovXG5mdW5jdGlvbiBfc2VuZFRvRWxlbWVudChlbCwgbXNnKSB7XG4gIHZhciBoYW5kbGVkID0gZmFsc2U7XG5cbiAgd2hpbGUgKGVsICYmICFoYW5kbGVkKSB7XG5cbiAgICAvLyBDbGFzc2ljIGNvbXBvbmVudCdzIGxpc3RlblxuICAgIGlmIChlbC5fX2NvbXBfXykge1xuICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICBlbC5fX2NvbXBfXy5tZXNzYWdlcy5zZW5kKG1zZyk7XG4gICAgfVxuXG4gICAgLy8gbGlzdGVuQXRcbiAgICBpZiAoZWwuX19zdWJzX18pIHtcbiAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgZWwuX19zdWJzX18uZm9yRWFjaChmdW5jdGlvbiAoYWRkKSB7XG4gICAgICAgIHJldHVybiBhZGQobXNnKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9rYWlqdS9saWIvbWVzc2FnZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuUmVuZGVyID0gdW5kZWZpbmVkO1xuZXhwb3J0cy5zZXRQYXRjaEZ1bmN0aW9uID0gc2V0UGF0Y2hGdW5jdGlvbjtcbmV4cG9ydHMuaXNGaXJzdFJlbmRlciA9IGlzRmlyc3RSZW5kZXI7XG5leHBvcnRzLnJlbmRlckludG8gPSByZW5kZXJJbnRvO1xuZXhwb3J0cy5yZW5kZXJTeW5jID0gcmVuZGVyU3luYztcbmV4cG9ydHMucmVuZGVyQ29tcG9uZW50Tm93ID0gcmVuZGVyQ29tcG9uZW50Tm93O1xuZXhwb3J0cy5yZW5kZXJOZXdDb21wb25lbnROb3cgPSByZW5kZXJOZXdDb21wb25lbnROb3c7XG5leHBvcnRzLnJlbmRlckNvbXBvbmVudE5leHRGcmFtZSA9IHJlbmRlckNvbXBvbmVudE5leHRGcmFtZTtcblxudmFyIF9oID0gcmVxdWlyZSgnc25hYmJkb20vaCcpO1xuXG52YXIgX2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaCk7XG5cbnZhciBfdm5vZGUgPSByZXF1aXJlKCdzbmFiYmRvbS92bm9kZScpO1xuXG52YXIgX2xvZyA9IHJlcXVpcmUoJy4vbG9nJyk7XG5cbnZhciBfbG9nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xvZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjb21wb25lbnRzVG9SZW5kZXIgPSBbXTtcbnZhciBub2Rlc1RvUmVuZGVyID0gW107XG52YXIgc2NoZWR1bGVkRE9NUmVhZHMgPSBbXTtcbnZhciBzY2hlZHVsZWRET01Xcml0ZXMgPSBbXTtcbnZhciByZW5kZXJpbmcgPSBmYWxzZTtcbnZhciBuZXh0UmVuZGVyID0gdW5kZWZpbmVkO1xudmFyIHJlbmRlckJlZ2luVGltZSA9IHVuZGVmaW5lZDtcbnZhciBfaXNGaXJzdFJlbmRlciA9IHRydWU7XG52YXIgcGF0Y2ggPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIHNldFBhdGNoRnVuY3Rpb24odmFsdWUpIHtcbiAgcGF0Y2ggPSB2YWx1ZTtcbn1cblxudmFyIFJlbmRlciA9IGV4cG9ydHMuUmVuZGVyID0ge1xuICBpbnRvOiByZW5kZXJJbnRvLFxuICBpc0ZpcnN0OiBpc0ZpcnN0UmVuZGVyLFxuICBzY2hlZHVsZURPTVJlYWQ6IHNjaGVkdWxlRE9NUmVhZCxcbiAgc2NoZWR1bGVET01Xcml0ZTogc2NoZWR1bGVET01Xcml0ZVxufTtcblxuZnVuY3Rpb24gaXNGaXJzdFJlbmRlcigpIHtcbiAgcmV0dXJuIF9pc0ZpcnN0UmVuZGVyO1xufVxuXG4vKipcbiAqIEdlbmVyaWMgcmVuZGVyIGZ1bmN0aW9uIGZvciBhcmJpdHJhcnkgVkRPTSByZW5kZXJpbmdcbiAqL1xuZnVuY3Rpb24gcmVuZGVySW50byh0YXJnZXQsIHZkb20sIG9uQ29tcGxldGUpIHtcbiAgdmFyIHRhc2sgPSB7XG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgdmRvbTogdmRvbSxcbiAgICBvbkNvbXBsZXRlOiBvbkNvbXBsZXRlLFxuICAgIGNhbmNlbGxlZDogZmFsc2VcbiAgfTtcblxuICBub2Rlc1RvUmVuZGVyLnB1c2godGFzayk7XG5cbiAgcmVuZGVyTmV4dEZyYW1lKCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICB0YXNrLmNhbmNlbGxlZCA9IHRydWU7XG4gIH07XG59XG5cbi8vIFVzZWQgYnkgc3RhcnRBcHBcbmZ1bmN0aW9uIHJlbmRlclN5bmModGFyZ2V0LCB2ZG9tLCByZXBsYWNlKSB7XG4gIHZhciB0YXNrID0ge1xuICAgIHRhcmdldDogdGFyZ2V0LFxuICAgIHZkb206IHZkb20sXG4gICAgcmVwbGFjZTogcmVwbGFjZVxuICB9O1xuXG4gIG5vZGVzVG9SZW5kZXIucHVzaCh0YXNrKTtcblxuICByZW5kZXJOb3coKTtcbn1cblxuLyogUmVuZGVyIGEgY29tcG9uZW50IGltbWVkaWF0ZWx5LiBUaGlzIGlzIHVzZWQgaW50ZXJuYWxseSBhbmQgaXQgaXMgYXNzdW1lZCBhIHJlbmRlciBwaGFzZSBpcyBhbHJlYWR5IG9uZ29pbmcgKi9cbmZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudE5vdyhjb21wb25lbnQpIHtcbiAgaWYgKGNvbXBvbmVudHNUb1JlbmRlci5pbmRleE9mKGNvbXBvbmVudCkgPT09IC0xKSBjb21wb25lbnRzVG9SZW5kZXIucHVzaChjb21wb25lbnQpO1xufVxuXG4vKiBPcHRpbWl6YXRpb24gb2YgdGhlIGFib3ZlIGZ1bmN0aW9uOiBBIG5ldyBjb21wb25lbnQgY2Fubm90IGJlIHBvc3NpYmx5IGZvdW5kIGluIHRoZSByZW5kZXIgcXVldWUgKi9cbmZ1bmN0aW9uIHJlbmRlck5ld0NvbXBvbmVudE5vdyhjb21wb25lbnQpIHtcbiAgY29tcG9uZW50c1RvUmVuZGVyLnB1c2goY29tcG9uZW50KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29tcG9uZW50TmV4dEZyYW1lKGNvbXBvbmVudCkge1xuICBpZiAocmVuZGVyaW5nKSB7XG4gICAgLy8gVGhpcyBpcyBwcmV0dHkgYmFkIGJ1dCBub3QgYnJlYWtpbmc6IEl0IG1lYW5zIHRoZSBkZXZlbG9wZXJcbiAgICAvLyBzeW5jaHJvbm91c2x5IHNlbmQgYSBtZXNzYWdlIGluc2lkZSBhIHJlbmRlcigpIGZ1bmN0aW9uLlxuICAgIC8vIFByb2JhYmx5IGp1c3QgYSBtaXN0YWtlLlxuICAgIGNvbnNvbGUud2FybignQSBjb21wb25lbnQgdHJpZWQgdG8gcmUtcmVuZGVyIHdoaWxlIGEgcmVuZGVyaW5nIHdhcyBhbHJlYWR5IG9uZ29pbmcnLCBjb21wb25lbnQuZWxtKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBUaGlzIGNvbXBvbmVudCBpcyBhbHJlYWR5IHNjaGVkdWxlZCBmb3IgdGhlIG5leHQgcmVkcmF3LlxuICAvLyBGb3IgaW5zdGFuY2UsIHRoaXMgY2FuIGhhcHBlbiB3aGlsZSB0aGUgYXBwJ3MgdGFiIGlzIGluYWN0aXZlLFxuICAvLyBvciB3aGVuIHN5bmNocm9ub3VzbHkgc2VuZGluZyBhIGZldyBtZXNzYWdlcy5cbiAgLy8gQXZvaWRzIGRvaW5nIG1vcmUgd29yayB0aGFuIG5lY2Vzc2FyeSB3aGVuIHJlLWFjdGl2YXRpbmcgaXQuXG4gIGlmIChjb21wb25lbnRzVG9SZW5kZXIuaW5kZXhPZihjb21wb25lbnQpICE9PSAtMSkgcmV0dXJuO1xuXG4gIGNvbXBvbmVudHNUb1JlbmRlci5wdXNoKGNvbXBvbmVudCk7XG5cbiAgcmVuZGVyTmV4dEZyYW1lKCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlck5leHRGcmFtZSgpIHtcbiAgaWYgKCFuZXh0UmVuZGVyICYmICFyZW5kZXJpbmcpIG5leHRSZW5kZXIgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyTm93KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICB2YXIgcHJvcHMgPSBjb21wb25lbnQucHJvcHMsXG4gICAgICBzdG9yZSA9IGNvbXBvbmVudC5zdG9yZSxcbiAgICAgIG1lc3NhZ2VzID0gY29tcG9uZW50Lm1lc3NhZ2VzLFxuICAgICAgZWxtID0gY29tcG9uZW50LmVsbSxcbiAgICAgIHJlbmRlciA9IGNvbXBvbmVudC5yZW5kZXIsXG4gICAgICB2bm9kZSA9IGNvbXBvbmVudC52bm9kZSxcbiAgICAgIGRlc3Ryb3llZCA9IGNvbXBvbmVudC5kZXN0cm95ZWQ7XG5cbiAgLy8gQmFpbCBpZiB0aGUgY29tcG9uZW50IGlzIGFscmVhZHkgZGVzdHJveWVkLlxuICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgdGhlIHBhcmVudCByZW5kZXJzIGZpcnN0IGFuZCBkZWNpZGUgYSBjaGlsZCBjb21wb25lbnQgc2hvdWxkIGJlIHJlbW92ZWQuXG5cbiAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuO1xuXG4gIHZhciBpc05ldyA9IHZub2RlID09PSB1bmRlZmluZWQ7XG5cbiAgdmFyIGJlZm9yZVJlbmRlciA9IHZvaWQgMDtcblxuICBpZiAoX2xvZzIuZGVmYXVsdC5yZW5kZXIpIGJlZm9yZVJlbmRlciA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gIHZhciBuZXdWTm9kZSA9IHJlbmRlcih7IHByb3BzOiBwcm9wcywgc3RhdGU6IHN0b3JlLnN0YXRlKCksIG1zZzogbWVzc2FnZXMgfSk7XG4gIHBhdGNoSW50byh2bm9kZSB8fCBlbG0sIG5ld1ZOb2RlKTtcblxuICBpZiAoKDAsIF9sb2cuc2hvdWxkTG9nKShfbG9nMi5kZWZhdWx0LnJlbmRlciwgY29tcG9uZW50LmtleSkpIHtcbiAgICB2YXIgcmVuZGVyVGltZSA9IE1hdGgucm91bmQoKHBlcmZvcm1hbmNlLm5vdygpIC0gYmVmb3JlUmVuZGVyKSAqIDEwMCkgLyAxMDA7XG4gICAgY29uc29sZS5sb2coJ1JlbmRlciBjb21wb25lbnQgJWMnICsgY29tcG9uZW50LmtleSwgJ2ZvbnQtd2VpZ2h0OiBib2xkJywgcmVuZGVyVGltZSArICcgbXMnLCAnfCBwcm9wczogJywgcHJvcHMsICd8IHN0YXRlOiAnLCBzdG9yZS5zdGF0ZSgpKTtcbiAgfVxuXG4gIGNvbXBvbmVudC5saWZlY3ljbGUucmVuZGVyZWQoY29tcG9uZW50LCBuZXdWTm9kZSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlck5vdygpIHtcbiAgcmVuZGVyaW5nID0gdHJ1ZTtcbiAgbmV4dFJlbmRlciA9IHVuZGVmaW5lZDtcblxuICBsb2dCZWdpblJlbmRlcigpO1xuXG4gIC8vIFJlbmRlciBjb21wb25lbnRzIGluIGEgdG9wLWRvd24gZmFzaGlvbi5cbiAgLy8gVGhpcyBlbnN1cmVzIHRoZSByZW5kZXJpbmcgb3JkZXIgaXMgcHJlZGljdGl2ZSBhbmQgcHJvcHMvc3RhdGVzIGFyZSBjb25zaXN0ZW50LlxuICAvLyBJZiB3ZSBkaWRuJ3QgZG8gdGhhdCwgYSBjb21wb25lbnQgY291bGQgZmlyc3QgYmUgcmVuZGVyZWQgZm9sbG93aW5nIGEgc3RhdGUgY2hhbmdlXG4gIC8vIGJ1dCB0aGVuIG1pc3Mgb3V0IG9uIGEgcHJvcHMgY2hhbmdlIGZyb20gaXRzIHBhcmVudC5cbiAgY29tcG9uZW50c1RvUmVuZGVyLnNvcnQoZnVuY3Rpb24gKGNvbXBBLCBjb21wQikge1xuICAgIHJldHVybiBjb21wQS5kZXB0aCAtIGNvbXBCLmRlcHRoO1xuICB9KTtcblxuICBwcm9jZXNzUmVuZGVyUXVldWUoKTtcblxuICBwcm9jZXNzRE9NUmVhZHNXcml0ZXMoKTtcblxuICByZW5kZXJpbmcgPSBmYWxzZTtcbiAgX2lzRmlyc3RSZW5kZXIgPSBmYWxzZTtcblxuICBsb2dFbmRSZW5kZXIoKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1JlbmRlclF1ZXVlKCkge1xuICB2YXIgY29tcGxldGVDYWxsYmFja3MgPSBbXTtcblxuICB3aGlsZSAobm9kZXNUb1JlbmRlci5sZW5ndGggfHwgY29tcG9uZW50c1RvUmVuZGVyLmxlbmd0aCkge1xuICAgIHdoaWxlIChub2Rlc1RvUmVuZGVyLmxlbmd0aCkge1xuICAgICAgdmFyIF9ub2Rlc1RvUmVuZGVyJHNoaWZ0ID0gbm9kZXNUb1JlbmRlci5zaGlmdCgpLFxuICAgICAgICAgIHRhcmdldCA9IF9ub2Rlc1RvUmVuZGVyJHNoaWZ0LnRhcmdldCxcbiAgICAgICAgICB2ZG9tID0gX25vZGVzVG9SZW5kZXIkc2hpZnQudmRvbSxcbiAgICAgICAgICByZXBsYWNlID0gX25vZGVzVG9SZW5kZXIkc2hpZnQucmVwbGFjZSxcbiAgICAgICAgICBvbkNvbXBsZXRlID0gX25vZGVzVG9SZW5kZXIkc2hpZnQub25Db21wbGV0ZSxcbiAgICAgICAgICBjYW5jZWxsZWQgPSBfbm9kZXNUb1JlbmRlciRzaGlmdC5jYW5jZWxsZWQ7XG5cbiAgICAgIGlmIChjYW5jZWxsZWQpIGNvbnRpbnVlO1xuICAgICAgcmVwbGFjZSA/IHBhdGNoKHRhcmdldCwgdmRvbSkgOiBwYXRjaEludG8odGFyZ2V0LCB2ZG9tKTtcbiAgICAgIGlmIChvbkNvbXBsZXRlKSBjb21wbGV0ZUNhbGxiYWNrcy5wdXNoKG9uQ29tcGxldGUpO1xuICAgIH1cblxuICAgIHdoaWxlIChjb21wb25lbnRzVG9SZW5kZXIubGVuZ3RoKSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gY29tcG9uZW50c1RvUmVuZGVyLnNoaWZ0KCk7XG4gICAgICByZW5kZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICAvLyBXYWl0IGZvciB0aGUgY29tcG9uZW50cyBpbmRpcmVjdGx5IGludHJvZHVjZWQgdmlhIHJlbmRlckludG8gdG8gYmUgcmVuZGVyZWRcbiAgICB3aGlsZSAoY29tcGxldGVDYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICBjb21wbGV0ZUNhbGxiYWNrcy5zaGlmdCgpKCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NET01SZWFkc1dyaXRlcygpIHtcbiAgd2hpbGUgKHNjaGVkdWxlZERPTVJlYWRzLmxlbmd0aCB8fCBzY2hlZHVsZWRET01Xcml0ZXMubGVuZ3RoKSB7XG5cbiAgICB3aGlsZSAoc2NoZWR1bGVkRE9NUmVhZHMubGVuZ3RoKSB7XG4gICAgICBzY2hlZHVsZWRET01SZWFkcy5zaGlmdCgpKCk7XG4gICAgfVxuXG4gICAgd2hpbGUgKHNjaGVkdWxlZERPTVdyaXRlcy5sZW5ndGgpIHtcbiAgICAgIHNjaGVkdWxlZERPTVdyaXRlcy5zaGlmdCgpKCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxlRE9NUmVhZChjYWxsYmFjaykge1xuICBzY2hlZHVsZWRET01SZWFkcy5wdXNoKGNhbGxiYWNrKTtcbiAgcmVuZGVyTmV4dEZyYW1lKCk7XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxlRE9NV3JpdGUoY2FsbGJhY2spIHtcbiAgc2NoZWR1bGVkRE9NV3JpdGVzLnB1c2goY2FsbGJhY2spO1xuICByZW5kZXJOZXh0RnJhbWUoKTtcbn1cblxuZnVuY3Rpb24gbG9nQmVnaW5SZW5kZXIoKSB7XG4gIGlmIChfbG9nMi5kZWZhdWx0LnJlbmRlcikge1xuICAgIHJlbmRlckJlZ2luVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGNvbnNvbGUubG9nKCclY1JlbmRlciAtIGJlZ2luJywgJ2NvbG9yOiBvcmFuZ2UnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsb2dFbmRSZW5kZXIoKSB7XG4gIGlmIChfbG9nMi5kZWZhdWx0LnJlbmRlcikge1xuICAgIHZhciB0aW1lID0gTWF0aC5yb3VuZCgocGVyZm9ybWFuY2Uubm93KCkgLSByZW5kZXJCZWdpblRpbWUpICogMTAwKSAvIDEwMDtcbiAgICBjb25zb2xlLmxvZygnJWNSZW5kZXIgLSBlbmQgKCcgKyB0aW1lICsgJ21zKVxcblxcblxcbicsICdjb2xvcjogb3JhbmdlJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hJbnRvKHRhcmdldCwgbm9kZSkge1xuICB2YXIgdGFyZ2V0SXNBcnJheSA9IEFycmF5LmlzQXJyYXkodGFyZ2V0KTtcbiAgdmFyIG5vZGVJc0FycmF5ID0gQXJyYXkuaXNBcnJheShub2RlKTtcblxuICBpZiAobm9kZUlzQXJyYXkpIG1hcFByaW1pdGl2ZU5vZGVzKG5vZGUpO1xuXG4gIC8vIEZpcnN0IHJlbmRlciBpbnNpZGUgYW4gRWxlbWVudFxuICBpZiAodGFyZ2V0LmVsbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcGF0Y2goKDAsIF92bm9kZS52bm9kZSkoJ2R1bW15Jywge30sIFtdLCB1bmRlZmluZWQsIHRhcmdldCksICgwLCBfdm5vZGUudm5vZGUpKCdkdW1teScsIHt9LCBub2RlSXNBcnJheSA/IG5vZGUgOiBbbm9kZV0pKTtcblxuICAgIGlmIChub2RlSXNBcnJheSkgbm9kZS5lbG0gPSB0YXJnZXQ7XG4gIH1cbiAgLy8gVXBkYXRlIHVzaW5nIGEgcHJldmlvdXMgVk5vZGUgb3IgVk5vZGVbXSB0byBwYXRjaCBhZ2FpbnN0XG4gIGVsc2Uge1xuICAgICAgaWYgKHRhcmdldElzQXJyYXkpIHtcbiAgICAgICAgcGF0Y2goKDAsIF92bm9kZS52bm9kZSkoJ2R1bW15Jywge30sIHRhcmdldCwgdW5kZWZpbmVkLCB0YXJnZXQuZWxtKSwgKDAsIF92bm9kZS52bm9kZSkoJ2R1bW15Jywge30sIG5vZGVJc0FycmF5ID8gbm9kZSA6IFtub2RlXSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGF0Y2godGFyZ2V0LCBub2RlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGVJc0FycmF5KSBub2RlLmVsbSA9IHRhcmdldC5lbG07XG4gICAgfVxufVxuXG4vKlxuICBTaW1pbGFyIHRvIHdoYXQgaCgpIGRvZXMgZm9yIGl0cyBjaGlsZHJlbi4gV2UgaGF2ZSB0byBkbyBpdCBoZXJlIG91cnNlbHZlc1xuICB3aGVuIHdlIGFyZSBwYXNzZWQgYW4gQXJyYXkgb2YgTm9kZXMgYXMgaXQgZGlkbid0IGdvIHRocm91Z2ggdGhlIGgoKSB0cmFuc2Zvcm1hdGlvbi5cbiAgVGhlIG9wZXJhdGlvbiBpcyBtdXRhdGl2ZSwgc28gdGhhdCB0aGUgQXJyYXkgb2YgTm9kZXMgY2FuIGxhdGVyIGJlIHJldXNlZCBmb3IgcGF0Y2hpbmcuXG4gIFRoaXMgaXMgY29uc2lzdGVudCB3aXRoIHRoZSBzbmFiYmRvbSdzIHdheS5cbiovXG5mdW5jdGlvbiBtYXBQcmltaXRpdmVOb2RlcyhhcnIpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgbm9kZSA9IGFycltpXTtcbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBub2RlID09PSAnbnVtYmVyJykgYXJyW2ldID0gKDAsIF92bm9kZS52bm9kZSkodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgbm9kZSk7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34va2FpanUvbGliL3JlbmRlci5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVUZXh0Tm9kZSh0ZXh0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29tbWVudCh0ZXh0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodGV4dCk7XG59XG5mdW5jdGlvbiBpbnNlcnRCZWZvcmUocGFyZW50Tm9kZSwgbmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpO1xufVxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZENoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBwYXJlbnROb2RlKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnROb2RlO1xufVxuZnVuY3Rpb24gbmV4dFNpYmxpbmcobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5leHRTaWJsaW5nO1xufVxuZnVuY3Rpb24gdGFnTmFtZShlbG0pIHtcbiAgICByZXR1cm4gZWxtLnRhZ05hbWU7XG59XG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudChub2RlLCB0ZXh0KSB7XG4gICAgbm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG59XG5mdW5jdGlvbiBnZXRUZXh0Q29udGVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUudGV4dENvbnRlbnQ7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAxO1xufVxuZnVuY3Rpb24gaXNUZXh0KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMztcbn1cbmZ1bmN0aW9uIGlzQ29tbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDg7XG59XG5leHBvcnRzLmh0bWxEb21BcGkgPSB7XG4gICAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgICBjcmVhdGVFbGVtZW50TlM6IGNyZWF0ZUVsZW1lbnROUyxcbiAgICBjcmVhdGVUZXh0Tm9kZTogY3JlYXRlVGV4dE5vZGUsXG4gICAgY3JlYXRlQ29tbWVudDogY3JlYXRlQ29tbWVudCxcbiAgICBpbnNlcnRCZWZvcmU6IGluc2VydEJlZm9yZSxcbiAgICByZW1vdmVDaGlsZDogcmVtb3ZlQ2hpbGQsXG4gICAgYXBwZW5kQ2hpbGQ6IGFwcGVuZENoaWxkLFxuICAgIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG4gICAgbmV4dFNpYmxpbmc6IG5leHRTaWJsaW5nLFxuICAgIHRhZ05hbWU6IHRhZ05hbWUsXG4gICAgc2V0VGV4dENvbnRlbnQ6IHNldFRleHRDb250ZW50LFxuICAgIGdldFRleHRDb250ZW50OiBnZXRUZXh0Q29udGVudCxcbiAgICBpc0VsZW1lbnQ6IGlzRWxlbWVudCxcbiAgICBpc1RleHQ6IGlzVGV4dCxcbiAgICBpc0NvbW1lbnQ6IGlzQ29tbWVudCxcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmh0bWxEb21BcGk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sZG9tYXBpLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zbmFiYmRvbS9odG1sZG9tYXBpLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuYXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZnVuY3Rpb24gcHJpbWl0aXZlKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMucHJpbWl0aXZlID0gcHJpbWl0aXZlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NuYWJiZG9tL2lzLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBzcGFjZV9saWZ0XzEgPSByZXF1aXJlKFwic3BhY2UtbGlmdFwiKTtcbnZhciBrYWlqdV8xID0gcmVxdWlyZShcImthaWp1XCIpO1xudmFyIHN0b3JlXzEgPSByZXF1aXJlKFwia2FpanUvc3RvcmVcIik7XG5leHBvcnRzLmluY3JlbWVudENvdW50ZXIgPSBrYWlqdV8xLk1lc3NhZ2UoJ2luY3JlbWVudENvdW50ZXInKTtcbnZhciBpbml0U3RhdGUgPSB7XG4gICAgYmx1ZTogeyBjb3VudDogMCB9XG59O1xuZnVuY3Rpb24gZGVmYXVsdF8xKCkge1xuICAgIHJldHVybiBzdG9yZV8xLmRlZmF1bHQoaW5pdFN0YXRlLCBmdW5jdGlvbiAob24pIHtcbiAgICAgICAgb24oZXhwb3J0cy5pbmNyZW1lbnRDb3VudGVyLCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IHN0YXRlLmJsdWUuY291bnQ7XG4gICAgICAgICAgICByZXR1cm4gc3BhY2VfbGlmdF8xLnVwZGF0ZShzdGF0ZSwgeyBibHVlOiB7IGNvdW50OiBjb3VudCArIDEgfSB9KTtcbiAgICAgICAgfSk7XG4gICAgfSwgeyBuYW1lOiAnYXBwU3RvcmUnIH0pO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmlldy9hcHAvc3RvcmUudHNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHNwYWNlX2xpZnRfMSA9IHJlcXVpcmUoXCJzcGFjZS1saWZ0XCIpO1xudmFyIHN0b3JlXzEgPSByZXF1aXJlKFwia2FpanUvc3RvcmVcIik7XG52YXIga2FpanVfMSA9IHJlcXVpcmUoXCJrYWlqdVwiKTtcbnZhciBhamF4XzEgPSByZXF1aXJlKFwidXRpbC9hamF4XCIpO1xudmFyIHJlbW90ZURhdGFfMSA9IHJlcXVpcmUoXCJ1dGlsL3JlbW90ZURhdGFcIik7XG52YXIgcHJvbWlzZSA9IHJlcXVpcmUoXCJ1dGlsL3Byb21pc2VcIik7XG5leHBvcnRzLmxvYWROZXh0VXNlclBhZ2UgPSBrYWlqdV8xLk1lc3NhZ2UoJ2xvYWROZXh0VXNlclBhZ2UnKTtcbmV4cG9ydHMucmVsb2FkVXNlcnMgPSBrYWlqdV8xLk1lc3NhZ2UoJ3JlbG9hZFVzZXJzJyk7XG5mdW5jdGlvbiBVc2VyU3RvcmUoKSB7XG4gICAgdmFyIGluaXRTdGF0ZSA9IHtcbiAgICAgICAgdXNlcnM6IHJlbW90ZURhdGFfMS5Ob3RBc2tlZCxcbiAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgaGFzTW9yZTogdHJ1ZSxcbiAgICAgICAgICAgIGxvYWRNb3JlOiBleHBvcnRzLmxvYWROZXh0VXNlclBhZ2VcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHN0b3JlXzEuZGVmYXVsdChpbml0U3RhdGUsIGZ1bmN0aW9uIChvbikge1xuICAgICAgICB2YXIgaW5pdGlhbFVzZXJzID0gaW5pdGlhbFVzZXJEYXRhKCk7XG4gICAgICAgIHZhciBuZXh0VXNlclBhZ2UgPSBwYWdlZFVzZXJEYXRhKCk7XG4gICAgICAgIG9uKGluaXRpYWxVc2Vycy5kYXRhLCBmdW5jdGlvbiAoc3RhdGUsIGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBwYWdpbmF0aW9uID0gc3BhY2VfbGlmdF8xLnVwZGF0ZShpbml0U3RhdGUucGFnaW5hdGlvbiwge1xuICAgICAgICAgICAgICAgIGhhc01vcmU6IGRhdGEudHlwZSA9PT0gJ3N1Y2Nlc3MnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzcGFjZV9saWZ0XzEudXBkYXRlKHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgdXNlcnM6IGRhdGEsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjogcGFnaW5hdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBvbihleHBvcnRzLnJlbG9hZFVzZXJzLCBmdW5jdGlvbiAoKSB7IHJldHVybiBpbml0aWFsVXNlcnMuY2FsbCgpOyB9KTtcbiAgICAgICAgLy8gV2UgY291bGQgYWxzbyB3cml0ZSBhbiBhYnN0cmFjdGlvbiB0aGF0IG1lcmdlcyB0aGUgaW5pdGlhbCArIHBhZ2VkIGRhdGEgT2JzZXJ2YWJsZXNcbiAgICAgICAgb24obmV4dFVzZXJQYWdlLmRhdGEsIGZ1bmN0aW9uIChzdGF0ZSwgbmV3UGFnZSkge1xuICAgICAgICAgICAgaWYgKHN0YXRlLnVzZXJzLnR5cGUgIT09ICdzdWNjZXNzJyAmJlxuICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzLnR5cGUgIT09ICdyZWZyZXNoaW5nJylcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAobmV3UGFnZS50eXBlID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VXNlcnMgPSBzdGF0ZS51c2Vycy5kYXRhLmNvbmNhdChuZXdQYWdlLmRhdGEpO1xuICAgICAgICAgICAgICAgIHZhciBuZXdQYWdpbmF0aW9uID0gc3BhY2VfbGlmdF8xLnVwZGF0ZShpbml0U3RhdGUucGFnaW5hdGlvbiwgeyBoYXNNb3JlOiBuZXdVc2Vycy5sZW5ndGggPCAxMDAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwYWNlX2xpZnRfMS51cGRhdGUoc3RhdGUsIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcnM6IHJlbW90ZURhdGFfMS5TdWNjZXNzKG5ld1VzZXJzKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjogbmV3UGFnaW5hdGlvblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3UGFnZS50eXBlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BhY2VfbGlmdF8xLnVwZGF0ZShzdGF0ZSwgeyB1c2VyczogcmVtb3RlRGF0YV8xLlJlZnJlc2hpbmcoc3RhdGUudXNlcnMuZGF0YSkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBvbihleHBvcnRzLmxvYWROZXh0VXNlclBhZ2UsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5leHRVc2VyUGFnZS5jYWxsKCk7IH0pO1xuICAgIH0sIHsgbmFtZTogJ3VzZXJTdG9yZScgfSk7XG59XG5leHBvcnRzLlVzZXJTdG9yZSA9IFVzZXJTdG9yZTtcbmZ1bmN0aW9uIGdldFVzZXJzKCkge1xuICAgIHJldHVybiBwcm9taXNlLmRlbGF5KDIwMDApXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChfKSB7IHJldHVybiBmZXRjaCgnaHR0cHM6Ly9yYW5kb211c2VyLm1lL2FwaS8/cmVzdWx0cz0yMCcpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5qc29uKCk7IH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChqc29uKSB7IHJldHVybiBqc29uLnJlc3VsdHMubWFwKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiB1c2VyLm5hbWUuZmlyc3QgKyBcIiBcIiArIHVzZXIubmFtZS5sYXN0O1xuICAgIH0pOyB9KTsgfSk7XG59XG5mdW5jdGlvbiBpbml0aWFsVXNlckRhdGEoKSB7XG4gICAgcmV0dXJuIGFqYXhfMS5kZWZhdWx0KHtcbiAgICAgICAgbmFtZTogJ2luaXRpYWxVc2VycycsXG4gICAgICAgIGFqYXg6IGdldFVzZXJzLFxuICAgICAgICBjYWxsTm93OiB0cnVlXG4gICAgfSk7XG59XG5mdW5jdGlvbiBwYWdlZFVzZXJEYXRhKCkge1xuICAgIHJldHVybiBhamF4XzEuZGVmYXVsdCh7XG4gICAgICAgIG5hbWU6ICdwYWdlZFVzZXJzJyxcbiAgICAgICAgYWpheDogZ2V0VXNlcnNcbiAgICB9KTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYmx1ZS91c2VyU3RvcmUudHNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGthaWp1XzEgPSByZXF1aXJlKFwia2FpanVcIik7XG52YXIgc3BhY2VfbGlmdF8xID0gcmVxdWlyZShcInNwYWNlLWxpZnRcIik7XG4vKipcbiAqIENvbXBvbmVudCB3cmFwcGVyIGZvciBzaW1wbGUgc3dhcCB0cmFuc2l0aW9ucyAoT05FIGl0ZW0gaXMgcmVwbGFjZWQgYnkgYW5vdGhlciwgYmUgaXQgYW5vdGhlciBFbGVtZW50IG9yIHVuZGVmaW5lZClcbiAqIFRoZSBlbnRlcmluZyBlbGVtZW50IGlzIG5vdCBhZGRlZCB0byB0aGUgRE9NIHRpbGwgdGhlIGV4aXRpbmcgZWxlbWVudCBjb21wbGV0ZWx5IGZpbmlzaGVkIGl0cyBhbmltYXRpb24uXG4gKiBUaGlzIGhhcyBhIGZldyBiZW5lZml0czpcbiAqICAtIFRoZXJlIGlzIG5vIG5lZWQgdG8gYm90aGVyIHdpdGggY2hhbmdpbmcgdGhlIGVudGVyaW5nIG5vZGUncyBkaXNwbGF5IHRvICdub25lJyBzaW5jZSBpdCdzIG5vdCBpbiB0aGUgRE9NIHlldFxuICogIC0gTW9yZSBwZXJmb3JtYW50OiBPbmx5IG9uZSBWRE9NIHRyZWUgcmVuZGVyZWQgYXQgYW55IGdpdmVuIHRpbWU7IHBhcnRpY3VsYXJseSBub3RpY2VhYmxlIGF0IGFuaW1hdGlvbiB0aW1lXG4gKiAgLSBUaGlzIGlzIGxlc3Mgd29yayBhbmQgaXMgdGh1cyBsZXNzIGNvbmZ1c2luZyBmb3IgYnJvd3NlcnMgKGZpeGVzIGEgcmVuZGVyaW5nIGJ1ZyB3aXRoIENocm9tZSA0NilcbiAqL1xuZnVuY3Rpb24gYW5pbWF0ZShhbmltYXRpb25zKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjaGlsZCwgc2VsKSB7XG4gICAgICAgIGlmIChzZWwgPT09IHZvaWQgMCkgeyBzZWwgPSAnY29tcG9uZW50JzsgfVxuICAgICAgICB2YXIgcHJvcHMgPSB7IGNoaWxkOiBjaGlsZCwgYW5pbWF0aW9uczogYW5pbWF0aW9ucyB9O1xuICAgICAgICByZXR1cm4ga2FpanVfMS5Db21wb25lbnQoeyBzZWw6IHNlbCwgbmFtZTogJ3NpbmdsZUVsZW1lbnRBbmltYXRpb24nLCBpbml0U3RhdGU6IGluaXRTdGF0ZSwgcHJvcHM6IHByb3BzLCBjb25uZWN0OiBjb25uZWN0LCByZW5kZXI6IHJlbmRlciB9KTtcbiAgICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gYW5pbWF0ZTtcbmZ1bmN0aW9uIGluaXRTdGF0ZShwcm9wcykge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjdGl2ZUNoaWxkOiBwcm9wcy5jaGlsZFxuICAgIH07XG59XG52YXIgc2V0QWN0aXZlQ2hpbGQgPSBrYWlqdV8xLk1lc3NhZ2UoJ3NldEFjdGl2ZUNoaWxkJyk7XG5mdW5jdGlvbiBjb25uZWN0KF9hKSB7XG4gICAgdmFyIG9uID0gX2Eub24sIG1zZyA9IF9hLm1zZywgcHJvcHMgPSBfYS5wcm9wcztcbiAgICB2YXIgaXNQbGF5aW5nUmVtb3ZlQW5pbWF0aW9uID0gZmFsc2U7XG4gICAgb24ocHJvcHMuc2xpZGluZzIoKSwgZnVuY3Rpb24gKHN0YXRlLCBfYSkge1xuICAgICAgICB2YXIgbmV3UHJvcHMgPSBfYVswXSwgb2xkUHJvcHMgPSBfYVsxXTtcbiAgICAgICAgLy8gRmlyc3QgcmVuZGVyLCBubyBhbmltYXRpb25cbiAgICAgICAgaWYgKCFvbGRQcm9wcylcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgdmFyIG5ld0NoaWxkID0gbmV3UHJvcHMuY2hpbGQ7XG4gICAgICAgIHZhciBvbGRDaGlsZCA9IG9sZFByb3BzLmNoaWxkO1xuICAgICAgICB2YXIgbmV3S2V5ID0ga2V5T2YobmV3UHJvcHMuY2hpbGQpO1xuICAgICAgICB2YXIgb2xkS2V5ID0ga2V5T2Yob2xkUHJvcHMuY2hpbGQpO1xuICAgICAgICAvLyBBIHJlbW92ZSBhbmltYXRpb24gaXMgYWxyZWFkeSBwbGF5aW5nLCBsZWF2ZSBpdCBhbmQgcmVseSBvbiBpdCB0byB0aGVuIGludHJvZHVjZSB0aGUgbW9zdCByZWNlbnQgY2hpbGRcbiAgICAgICAgaWYgKGlzUGxheWluZ1JlbW92ZUFuaW1hdGlvbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gU3RhYmxlIGNoaWxkOyBub3RoaW5nIHRvIGRvIGJ1dCB1cGRhdGUgd2l0aCB0aGUgbmV3IHJlZmVyZW5jZVxuICAgICAgICBpZiAobmV3S2V5ID09PSBvbGRLZXkpXG4gICAgICAgICAgICByZXR1cm4gc3BhY2VfbGlmdF8xLnVwZGF0ZShzdGF0ZSwgeyBhY3RpdmVDaGlsZDogbmV3UHJvcHMuY2hpbGQgfSk7XG4gICAgICAgIC8vIENoaWxkIGNoYW5nZWQ6IFBsYXkgYW5pbWF0aW9uc1xuICAgICAgICBpZiAob2xkQ2hpbGQgJiYgb2xkQ2hpbGQuZWxtKSB7XG4gICAgICAgICAgICBpc1BsYXlpbmdSZW1vdmVBbmltYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgcHJvcHMoKS5hbmltYXRpb25zLnJlbW92ZShvbGRDaGlsZC5lbG0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBtc2cuc2VuZChzZXRBY3RpdmVDaGlsZChwcm9wcygpLmNoaWxkKSk7XG4gICAgICAgICAgICAgICAgaXNQbGF5aW5nUmVtb3ZlQW5pbWF0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1zZy5zZW5kKHNldEFjdGl2ZUNoaWxkKG5ld0NoaWxkKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBvbihzZXRBY3RpdmVDaGlsZCwgZnVuY3Rpb24gKHN0YXRlLCBub2RlKSB7XG4gICAgICAgIGthaWp1XzEuUmVuZGVyLnNjaGVkdWxlRE9NV3JpdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5lbG0pXG4gICAgICAgICAgICAgICAgcHJvcHMoKS5hbmltYXRpb25zLmNyZWF0ZShub2RlLmVsbSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3BhY2VfbGlmdF8xLnVwZGF0ZShzdGF0ZSwgeyBhY3RpdmVDaGlsZDogbm9kZSB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlcihfYSkge1xuICAgIHZhciBzdGF0ZSA9IF9hLnN0YXRlO1xuICAgIHJldHVybiBzdGF0ZS5hY3RpdmVDaGlsZDtcbn1cbmZ1bmN0aW9uIGtleU9mKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZSAmJiAobm9kZS5rZXkgfHwgbm9kZS5zZWwpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2lkZ2V0L2FuaW1hdGlvbi9zaW5nbGUvc2luZ2xlQW5pbWF0aW9uLnRzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBsaW5rXzEgPSByZXF1aXJlKFwiLi9saW5rXCIpO1xuZXhwb3J0cy5kZWZhdWx0ID0gbGlua18xLmRlZmF1bHQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93aWRnZXQvbGluay9pbmRleC50c1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xucmVxdWlyZShcIi4vdHJhbnNmb3JtXCIpO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIEFycmF5XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5yZXF1aXJlKFwiLi9hcnJheS9hcHBlbmRcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9hcHBlbmRBbGxcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9jb21wYWN0XCIpO1xucmVxdWlyZShcIi4vYXJyYXkvY291bnRcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9kaXN0aW5jdFwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L2Ryb3BcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9kcm9wUmlnaHRcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9ldmVyeVwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L2ZpbHRlclwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L2ZpbmRcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9maW5kSW5kZXhcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9maXJzdFwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L2ZsYXRNYXBcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9mbGF0dGVuXCIpO1xucmVxdWlyZShcIi4vYXJyYXkvZm9sZFwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L2ZvbGRSaWdodFwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L2dldFwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L2dyb3VwQnlcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9pbnNlcnRcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9pbnNlcnRBbGxcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9qb2luXCIpO1xucmVxdWlyZShcIi4vYXJyYXkvbGFzdFwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L21hcFwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L3JlbW92ZUF0XCIpO1xucmVxdWlyZShcIi4vYXJyYXkvcmV2ZXJzZVwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L3NvbWVcIik7XG5yZXF1aXJlKFwiLi9hcnJheS9zb3J0XCIpO1xucmVxdWlyZShcIi4vYXJyYXkvdGFrZVwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L3Rha2VSaWdodFwiKTtcbnJlcXVpcmUoXCIuL2FycmF5L3RvU2V0XCIpO1xucmVxdWlyZShcIi4vYXJyYXkvdXBkYXRlQXRcIik7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgT2JqZWN0XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5yZXF1aXJlKFwiLi9vYmplY3QvYWRkXCIpO1xucmVxdWlyZShcIi4vb2JqZWN0L2ZpbHRlclwiKTtcbnJlcXVpcmUoXCIuL29iamVjdC9nZXRcIik7XG5yZXF1aXJlKFwiLi9vYmplY3Qva2V5c1wiKTtcbnJlcXVpcmUoXCIuL29iamVjdC9tYXBWYWx1ZXNcIik7XG5yZXF1aXJlKFwiLi9vYmplY3QvcmVtb3ZlXCIpO1xucmVxdWlyZShcIi4vb2JqZWN0L3RvQXJyYXlcIik7XG5yZXF1aXJlKFwiLi9vYmplY3QvdXBkYXRlXCIpO1xucmVxdWlyZShcIi4vb2JqZWN0L3ZhbHVlc1wiKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zcGFjZS1saWZ0L2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIga2FpanVfMSA9IHJlcXVpcmUoXCJrYWlqdVwiKTtcbnZhciBhYnlzc2FfMSA9IHJlcXVpcmUoXCJhYnlzc2FcIik7XG5hYnlzc2FfMS5Sb3V0ZXIubG9nID0gZmFsc2U7XG5rYWlqdV8xLmxvZy5yZW5kZXIgPSB0cnVlO1xua2FpanVfMS5sb2cubWVzc2FnZSA9IHRydWU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9sb2dnZXIudHNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfYW5jaG9ycyA9IHJlcXVpcmUoJy4vYW5jaG9ycycpO1xuXG52YXIgX2FuY2hvcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYW5jaG9ycyk7XG5cbnZhciBfU3RhdGVXaXRoUGFyYW1zID0gcmVxdWlyZSgnLi9TdGF0ZVdpdGhQYXJhbXMnKTtcblxudmFyIF9TdGF0ZVdpdGhQYXJhbXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3RhdGVXaXRoUGFyYW1zKTtcblxudmFyIF9UcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9UcmFuc2l0aW9uJyk7XG5cbnZhciBfVHJhbnNpdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9UcmFuc2l0aW9uKTtcblxudmFyIF91dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbnZhciB1dGlsID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWwpO1xuXG52YXIgX1N0YXRlID0gcmVxdWlyZSgnLi9TdGF0ZScpO1xuXG52YXIgX1N0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0YXRlKTtcblxudmFyIF9hcGkgPSByZXF1aXJlKCcuL2FwaScpO1xuXG52YXIgX2FwaTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hcGkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKlxuKiBDcmVhdGUgYSBuZXcgUm91dGVyIGluc3RhbmNlLCBwYXNzaW5nIGFueSBzdGF0ZSBkZWZpbmVkIGRlY2xhcmF0aXZlbHkuXG4qIE1vcmUgc3RhdGVzIGNhbiBiZSBhZGRlZCB1c2luZyBhZGRTdGF0ZSgpLlxuKlxuKiBCZWNhdXNlIGEgcm91dGVyIG1hbmFnZXMgZ2xvYmFsIHN0YXRlICh0aGUgVVJMKSwgb25seSBvbmUgaW5zdGFuY2Ugb2YgUm91dGVyXG4qIHNob3VsZCBiZSB1c2VkIGluc2lkZSBhbiBhcHBsaWNhdGlvbi5cbiovXG5mdW5jdGlvbiBSb3V0ZXIoZGVjbGFyYXRpdmVTdGF0ZXMpIHtcbiAgdmFyIHJvdXRlciA9IHt9O1xuICB2YXIgc3RhdGVzID0gc3RhdGVUcmVlcyhkZWNsYXJhdGl2ZVN0YXRlcyk7XG4gIHZhciBvcHRpb25zID0ge1xuICAgIGVuYWJsZUxvZ3M6IGZhbHNlLFxuICAgIGludGVyY2VwdEFuY2hvcnM6IHRydWUsXG4gICAgbm90Rm91bmQ6IG51bGwsXG4gICAgdXJsU3luYzogJ2hpc3RvcnknLFxuICAgIGhhc2hQcmVmaXg6ICcnXG4gIH07XG4gIHZhciBldmVudENhbGxiYWNrcyA9IHt9O1xuXG4gIHZhciBmaXJzdFRyYW5zaXRpb24gPSB0cnVlO1xuICB2YXIgaWdub3JlTmV4dFVSTENoYW5nZSA9IGZhbHNlO1xuICB2YXIgY3VycmVudFBhdGhRdWVyeSA9IHVuZGVmaW5lZDtcbiAgdmFyIGN1cnJlbnRQYXJhbXNEaWZmID0ge307XG4gIHZhciBjdXJyZW50U3RhdGUgPSB1bmRlZmluZWQ7XG4gIHZhciBwcmV2aW91c1N0YXRlID0gdW5kZWZpbmVkO1xuICB2YXIgdHJhbnNpdGlvbiA9IHVuZGVmaW5lZDtcbiAgdmFyIGxlYWZTdGF0ZXMgPSB1bmRlZmluZWQ7XG4gIHZhciB1cmxDaGFuZ2VkID0gdW5kZWZpbmVkO1xuICB2YXIgaW5pdGlhbGl6ZWQgPSB1bmRlZmluZWQ7XG4gIHZhciBoYXNoU2xhc2hTdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgLypcbiAgKiBTZXR0aW5nIGEgbmV3IHN0YXRlIHdpbGwgc3RhcnQgYSB0cmFuc2l0aW9uIGZyb20gdGhlIGN1cnJlbnQgc3RhdGUgdG8gdGhlIHRhcmdldCBzdGF0ZS5cbiAgKiBBIHN1Y2Nlc3NmdWwgdHJhbnNpdGlvbiB3aWxsIHJlc3VsdCBpbiB0aGUgVVJMIGJlaW5nIGNoYW5nZWQuXG4gICogQSBmYWlsZWQgdHJhbnNpdGlvbiB3aWxsIGxlYXZlIHRoZSByb3V0ZXIgaW4gaXRzIGN1cnJlbnQgc3RhdGUuXG4gICovXG4gIGZ1bmN0aW9uIHNldFN0YXRlKHN0YXRlLCBwYXJhbXMsIGFjYykge1xuICAgIHZhciBmcm9tU3RhdGUgPSB0cmFuc2l0aW9uID8gKDAsIF9TdGF0ZVdpdGhQYXJhbXMyLmRlZmF1bHQpKHRyYW5zaXRpb24uY3VycmVudFN0YXRlLCB0cmFuc2l0aW9uLnRvUGFyYW1zKSA6IGN1cnJlbnRTdGF0ZTtcblxuICAgIHZhciBkaWZmID0gdXRpbC5vYmplY3REaWZmKGZyb21TdGF0ZSAmJiBmcm9tU3RhdGUucGFyYW1zLCBwYXJhbXMpO1xuXG4gICAgdmFyIHRvU3RhdGUgPSAoMCwgX1N0YXRlV2l0aFBhcmFtczIuZGVmYXVsdCkoc3RhdGUsIHBhcmFtcywgY3VycmVudFBhdGhRdWVyeSwgZGlmZik7XG5cbiAgICBpZiAocHJldmVudFRyYW5zaXRpb24oZnJvbVN0YXRlLCB0b1N0YXRlLCBkaWZmKSkge1xuICAgICAgaWYgKHRyYW5zaXRpb24gJiYgdHJhbnNpdGlvbi5leGl0aW5nKSBjYW5jZWxUcmFuc2l0aW9uKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRyYW5zaXRpb24pIGNhbmNlbFRyYW5zaXRpb24oKTtcblxuICAgIC8vIFdoaWxlIHRoZSB0cmFuc2l0aW9uIGlzIHJ1bm5pbmcsIGFueSBjb2RlIGFza2luZyB0aGUgcm91dGVyIGFib3V0IHRoZSBwcmV2aW91cy9jdXJyZW50IHN0YXRlIHNob3VsZFxuICAgIC8vIGdldCB0aGUgZW5kIHJlc3VsdCBzdGF0ZS5cbiAgICBwcmV2aW91c1N0YXRlID0gY3VycmVudFN0YXRlO1xuICAgIGN1cnJlbnRTdGF0ZSA9IHRvU3RhdGU7XG4gICAgY3VycmVudFBhcmFtc0RpZmYgPSBkaWZmO1xuXG4gICAgdHJhbnNpdGlvbiA9ICgwLCBfVHJhbnNpdGlvbjIuZGVmYXVsdCkoZnJvbVN0YXRlLCB0b1N0YXRlLCBkaWZmLCBhY2MsIHJvdXRlciwgbG9nZ2VyKTtcblxuICAgIHN0YXJ0aW5nVHJhbnNpdGlvbihmcm9tU3RhdGUsIHRvU3RhdGUpO1xuXG4gICAgLy8gSW4gY2FzZSBvZiBhIHJlZGlyZWN0KCkgY2FsbGVkIGZyb20gJ3N0YXJ0aW5nVHJhbnNpdGlvbicsIHRoZSB0cmFuc2l0aW9uIGFscmVhZHkgZW5kZWQuXG4gICAgaWYgKHRyYW5zaXRpb24pIHRyYW5zaXRpb24ucnVuKCk7XG5cbiAgICAvLyBJbiBjYXNlIG9mIGEgcmVkaXJlY3QoKSBjYWxsZWQgZnJvbSB0aGUgdHJhbnNpdGlvbiBpdHNlbGYsIHRoZSB0cmFuc2l0aW9uIGFscmVhZHkgZW5kZWRcbiAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgaWYgKHRyYW5zaXRpb24uY2FuY2VsbGVkKSBjdXJyZW50U3RhdGUgPSBmcm9tU3RhdGU7ZWxzZSBlbmRpbmdUcmFuc2l0aW9uKGZyb21TdGF0ZSwgdG9TdGF0ZSk7XG4gICAgfVxuXG4gICAgdHJhbnNpdGlvbiA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWxUcmFuc2l0aW9uKCkge1xuICAgIGxvZ2dlci5sb2coJ0NhbmNlbGxpbmcgZXhpc3RpbmcgdHJhbnNpdGlvbiBmcm9tIHswfSB0byB7MX0nLCB0cmFuc2l0aW9uLmZyb20sIHRyYW5zaXRpb24udG8pO1xuXG4gICAgdHJhbnNpdGlvbi5jYW5jZWwoKTtcblxuICAgIGZpcnN0VHJhbnNpdGlvbiA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRpbmdUcmFuc2l0aW9uKGZyb21TdGF0ZSwgdG9TdGF0ZSkge1xuICAgIGxvZ2dlci5sb2coJ1N0YXJ0aW5nIHRyYW5zaXRpb24gZnJvbSB7MH0gdG8gezF9JywgZnJvbVN0YXRlLCB0b1N0YXRlKTtcblxuICAgIHZhciBmcm9tID0gZnJvbVN0YXRlID8gZnJvbVN0YXRlLmFzUHVibGljIDogbnVsbDtcbiAgICB2YXIgdG8gPSB0b1N0YXRlLmFzUHVibGljO1xuXG4gICAgZXZlbnRDYWxsYmFja3Muc3RhcnRlZCAmJiBldmVudENhbGxiYWNrcy5zdGFydGVkKHRvLCBmcm9tKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZGluZ1RyYW5zaXRpb24oZnJvbVN0YXRlLCB0b1N0YXRlKSB7XG4gICAgaWYgKCF1cmxDaGFuZ2VkICYmICFmaXJzdFRyYW5zaXRpb24pIHtcbiAgICAgIGxvZ2dlci5sb2coJ1VwZGF0aW5nIFVSTDogezB9JywgY3VycmVudFBhdGhRdWVyeSk7XG4gICAgICB1cGRhdGVVUkxGcm9tU3RhdGUoY3VycmVudFBhdGhRdWVyeSwgZG9jdW1lbnQudGl0bGUsIGN1cnJlbnRQYXRoUXVlcnkpO1xuICAgIH1cblxuICAgIGZpcnN0VHJhbnNpdGlvbiA9IGZhbHNlO1xuXG4gICAgbG9nZ2VyLmxvZygnVHJhbnNpdGlvbiBmcm9tIHswfSB0byB7MX0gZW5kZWQnLCBmcm9tU3RhdGUsIHRvU3RhdGUpO1xuXG4gICAgdG9TdGF0ZS5zdGF0ZS5sYXN0UGFyYW1zID0gdG9TdGF0ZS5wYXJhbXM7XG5cbiAgICB2YXIgZnJvbSA9IGZyb21TdGF0ZSA/IGZyb21TdGF0ZS5hc1B1YmxpYyA6IG51bGw7XG4gICAgdmFyIHRvID0gdG9TdGF0ZS5hc1B1YmxpYztcbiAgICBldmVudENhbGxiYWNrcy5lbmRlZCAmJiBldmVudENhbGxiYWNrcy5lbmRlZCh0bywgZnJvbSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVVUkxGcm9tU3RhdGUoc3RhdGUsIHRpdGxlLCB1cmwpIHtcbiAgICBpZiAoaXNIYXNoTW9kZSgpKSB7XG4gICAgICBpZ25vcmVOZXh0VVJMQ2hhbmdlID0gdHJ1ZTtcbiAgICAgIGxvY2F0aW9uLmhhc2ggPSBvcHRpb25zLmhhc2hQcmVmaXggKyB1cmw7XG4gICAgfSBlbHNlIGhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCB0aXRsZSwgdXJsKTtcbiAgfVxuXG4gIC8qXG4gICogUmV0dXJuIHdoZXRoZXIgdGhlIHBhc3NlZCBzdGF0ZSBpcyB0aGUgc2FtZSBhcyB0aGUgY3VycmVudCBvbmVcbiAgKiBpbiB3aGljaCBjYXNlIHRoZSByb3V0ZXIgY2FuIGlnbm9yZSB0aGUgY2hhbmdlLlxuICAqL1xuICBmdW5jdGlvbiBwcmV2ZW50VHJhbnNpdGlvbihjdXJyZW50LCBuZXdTdGF0ZSwgZGlmZikge1xuICAgIGlmICghY3VycmVudCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIG5ld1N0YXRlLnN0YXRlID09IGN1cnJlbnQuc3RhdGUgJiYgT2JqZWN0LmtleXMoZGlmZi5hbGwpLmxlbmd0aCA9PSAwO1xuICB9XG5cbiAgLypcbiAgKiBUaGUgc3RhdGUgd2Fzbid0IGZvdW5kXG4gICogVHJhbnNpdGlvbiB0byB0aGUgJ25vdEZvdW5kJyBzdGF0ZSBpZiB0aGUgZGV2ZWxvcGVyIHNwZWNpZmllZCBpdCBvciBlbHNlIHRocm93IGFuIGVycm9yLlxuICAqL1xuICBmdW5jdGlvbiBub3RGb3VuZChzdGF0ZSkge1xuICAgIGxvZ2dlci5sb2coJ1N0YXRlIG5vdCBmb3VuZDogezB9Jywgc3RhdGUpO1xuXG4gICAgaWYgKG9wdGlvbnMubm90Rm91bmQpIHJldHVybiBzZXRTdGF0ZShsZWFmU3RhdGVzW29wdGlvbnMubm90Rm91bmRdLCB7fSk7ZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1N0YXRlIFwiJyArIHN0YXRlICsgJ1wiIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICB9XG5cbiAgLypcbiAgKiBDb25maWd1cmUgdGhlIHJvdXRlciBiZWZvcmUgaXRzIGluaXRpYWxpemF0aW9uLlxuICAqIFRoZSBhdmFpbGFibGUgb3B0aW9ucyBhcmU6XG4gICogICBlbmFibGVMb2dzOiBXaGV0aGVyIChkZWJ1ZyBhbmQgZXJyb3IpIGNvbnNvbGUgbG9ncyBzaG91bGQgYmUgZW5hYmxlZC4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICogICBpbnRlcmNlcHRBbmNob3JzOiBXaGV0aGVyIGFuY2hvciBtb3VzZWRvd24vY2xpY2tzIHNob3VsZCBiZSBpbnRlcmNlcHRlZCBhbmQgdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgKiAgIG5vdEZvdW5kOiBUaGUgU3RhdGUgdG8gZW50ZXIgd2hlbiBubyBzdGF0ZSBtYXRjaGluZyB0aGUgY3VycmVudCBwYXRoIHF1ZXJ5IG9yIG5hbWUgY291bGQgYmUgZm91bmQuIERlZmF1bHRzIHRvIG51bGwuXG4gICogICB1cmxTeW5jOiBIb3cgc2hvdWxkIHRoZSByb3V0ZXIgbWFpbnRhaW4gdGhlIGN1cnJlbnQgc3RhdGUgYW5kIHRoZSB1cmwgaW4gc3luYy4gRGVmYXVsdHMgdG8gdHJ1ZSAoaGlzdG9yeSBBUEkpLlxuICAqICAgaGFzaFByZWZpeDogQ3VzdG9taXplIHRoZSBoYXNoIHNlcGFyYXRvci4gU2V0IHRvICchJyBpbiBvcmRlciB0byBoYXZlIGEgaGFzaGJhbmcgbGlrZSAnLyMhLycuIERlZmF1bHRzIHRvIGVtcHR5IHN0cmluZy5cbiAgKi9cbiAgZnVuY3Rpb24gY29uZmlndXJlKHdpdGhPcHRpb25zKSB7XG4gICAgdXRpbC5tZXJnZU9iamVjdHMob3B0aW9ucywgd2l0aE9wdGlvbnMpO1xuICAgIHJldHVybiByb3V0ZXI7XG4gIH1cblxuICAvKlxuICAqIEluaXRpYWxpemUgdGhlIHJvdXRlci5cbiAgKiBUaGUgcm91dGVyIHdpbGwgaW1tZWRpYXRlbHkgaW5pdGlhdGUgYSB0cmFuc2l0aW9uIHRvLCBpbiBvcmRlciBvZiBwcmlvcml0eTpcbiAgKiAxKSBUaGUgaW5pdCBzdGF0ZSBwYXNzZWQgYXMgYW4gYXJndW1lbnRcbiAgKiAyKSBUaGUgc3RhdGUgY2FwdHVyZWQgYnkgdGhlIGN1cnJlbnQgVVJMXG4gICovXG4gIGZ1bmN0aW9uIGluaXQoaW5pdFN0YXRlLCBpbml0UGFyYW1zKSB7XG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlTG9ncyB8fCBSb3V0ZXIubG9nKSBSb3V0ZXIuZW5hYmxlTG9ncygpO1xuXG4gICAgaWYgKG9wdGlvbnMuaW50ZXJjZXB0QW5jaG9ycykgKDAsIF9hbmNob3JzMi5kZWZhdWx0KShyb3V0ZXIpO1xuXG4gICAgaGFzaFNsYXNoU3RyaW5nID0gJyMnICsgb3B0aW9ucy5oYXNoUHJlZml4ICsgJy8nO1xuXG4gICAgbG9nZ2VyLmxvZygnUm91dGVyIGluaXQnKTtcblxuICAgIGluaXRTdGF0ZXMoKTtcbiAgICBsb2dTdGF0ZVRyZWUoKTtcblxuICAgIGluaXRTdGF0ZSA9IGluaXRTdGF0ZSAhPT0gdW5kZWZpbmVkID8gaW5pdFN0YXRlIDogdXJsUGF0aFF1ZXJ5KCk7XG5cbiAgICBsb2dnZXIubG9nKCdJbml0aWFsaXppbmcgdG8gc3RhdGUgezB9JywgaW5pdFN0YXRlIHx8ICdcIlwiJyk7XG4gICAgdHJhbnNpdGlvblRvKGluaXRTdGF0ZSwgaW5pdFBhcmFtcyk7XG5cbiAgICBsaXN0ZW5Ub1VSTENoYW5nZXMoKTtcblxuICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICByZXR1cm4gcm91dGVyO1xuICB9XG5cbiAgLypcbiAgKiBSZW1vdmUgYW55IHBvc3NpYmlsaXR5IG9mIHNpZGUgZWZmZWN0IHRoaXMgcm91dGVyIGluc3RhbmNlIG1pZ2h0IGNhdXNlLlxuICAqIFVzZWQgZm9yIHRlc3RpbmcgcHVycG9zZXMuXG4gICovXG4gIGZ1bmN0aW9uIHRlcm1pbmF0ZSgpIHtcbiAgICB3aW5kb3cub25oYXNoY2hhbmdlID0gbnVsbDtcbiAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5Ub1VSTENoYW5nZXMoKSB7XG5cbiAgICBmdW5jdGlvbiBvblVSTENoYW5nZShldnQpIHtcbiAgICAgIGlmIChpZ25vcmVOZXh0VVJMQ2hhbmdlKSB7XG4gICAgICAgIGlnbm9yZU5leHRVUkxDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbmV3U3RhdGUgPSBldnQuc3RhdGUgfHwgdXJsUGF0aFF1ZXJ5KCk7XG5cbiAgICAgIGxvZ2dlci5sb2coJ1VSTCBjaGFuZ2VkOiB7MH0nLCBuZXdTdGF0ZSk7XG4gICAgICB1cmxDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIHNldFN0YXRlRm9yUGF0aFF1ZXJ5KG5ld1N0YXRlKTtcbiAgICB9XG5cbiAgICB3aW5kb3dbaXNIYXNoTW9kZSgpID8gJ29uaGFzaGNoYW5nZScgOiAnb25wb3BzdGF0ZSddID0gb25VUkxDaGFuZ2U7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0U3RhdGVzKCkge1xuICAgIHZhciBzdGF0ZUFycmF5ID0gdXRpbC5vYmplY3RUb0FycmF5KHN0YXRlcyk7XG5cbiAgICBhZGREZWZhdWx0U3RhdGVzKHN0YXRlQXJyYXkpO1xuXG4gICAgZWFjaFJvb3RTdGF0ZShmdW5jdGlvbiAobmFtZSwgc3RhdGUpIHtcbiAgICAgIHN0YXRlLmluaXQocm91dGVyLCBuYW1lKTtcbiAgICB9KTtcblxuICAgIGFzc2VydFBhdGhVbmlxdWVuZXNzKHN0YXRlQXJyYXkpO1xuXG4gICAgbGVhZlN0YXRlcyA9IHJlZ2lzdGVyTGVhZlN0YXRlcyhzdGF0ZUFycmF5LCB7fSk7XG5cbiAgICBhc3NlcnROb0FtYmlndW91c1BhdGhzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBhc3NlcnRQYXRoVW5pcXVlbmVzcyhzdGF0ZXMpIHtcbiAgICB2YXIgcGF0aHMgPSB7fTtcblxuICAgIHN0YXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgaWYgKHBhdGhzW3N0YXRlLnBhdGhdKSB7XG4gICAgICAgIHZhciBmdWxsUGF0aHMgPSBzdGF0ZXMubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgcmV0dXJuIHMuZnVsbFBhdGgoKSB8fCAnZW1wdHknO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUd28gc2libGluZyBzdGF0ZXMgaGF2ZSB0aGUgc2FtZSBwYXRoICgnICsgZnVsbFBhdGhzICsgJyknKTtcbiAgICAgIH1cblxuICAgICAgcGF0aHNbc3RhdGUucGF0aF0gPSAxO1xuICAgICAgYXNzZXJ0UGF0aFVuaXF1ZW5lc3Moc3RhdGUuY2hpbGRyZW4pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYXNzZXJ0Tm9BbWJpZ3VvdXNQYXRocygpIHtcbiAgICB2YXIgcGF0aHMgPSB7fTtcblxuICAgIGZvciAodmFyIG5hbWUgaW4gbGVhZlN0YXRlcykge1xuICAgICAgdmFyIHBhdGggPSB1dGlsLm5vcm1hbGl6ZVBhdGhRdWVyeShsZWFmU3RhdGVzW25hbWVdLmZ1bGxQYXRoKCkpO1xuICAgICAgaWYgKHBhdGhzW3BhdGhdKSB0aHJvdyBuZXcgRXJyb3IoJ0FtYmlndW91cyBzdGF0ZSBwYXRoczogJyArIHBhdGgpO1xuICAgICAgcGF0aHNbcGF0aF0gPSAxO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZERlZmF1bHRTdGF0ZXMoc3RhdGVzKSB7XG4gICAgc3RhdGVzLmZvckVhY2goZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSB1dGlsLm9iamVjdFRvQXJyYXkoc3RhdGUuc3RhdGVzKTtcblxuICAgICAgLy8gVGhpcyBpcyBhIHBhcmVudCBzdGF0ZTogQWRkIGEgZGVmYXVsdCBzdGF0ZSB0byBpdCBpZiB0aGVyZSBpc24ndCBhbHJlYWR5IG9uZVxuICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICBhZGREZWZhdWx0U3RhdGVzKGNoaWxkcmVuKTtcblxuICAgICAgICB2YXIgaGFzRGVmYXVsdFN0YXRlID0gY2hpbGRyZW4ucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIHN0YXRlKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLnBhdGggPT0gJycgfHwgcmVzdWx0O1xuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgaWYgKGhhc0RlZmF1bHRTdGF0ZSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBkZWZhdWx0U3RhdGUgPSAoMCwgX1N0YXRlMi5kZWZhdWx0KSh7IHVyaTogJycgfSk7XG4gICAgICAgIHN0YXRlLnN0YXRlcy5fZGVmYXVsdF8gPSBkZWZhdWx0U3RhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBlYWNoUm9vdFN0YXRlKGNhbGxiYWNrKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBzdGF0ZXMpIHtcbiAgICAgIGNhbGxiYWNrKG5hbWUsIHN0YXRlc1tuYW1lXSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJMZWFmU3RhdGVzKHN0YXRlcywgbGVhZlN0YXRlcykge1xuICAgIHJldHVybiBzdGF0ZXMucmVkdWNlKGZ1bmN0aW9uIChsZWFmU3RhdGVzLCBzdGF0ZSkge1xuICAgICAgaWYgKHN0YXRlLmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuIHJlZ2lzdGVyTGVhZlN0YXRlcyhzdGF0ZS5jaGlsZHJlbiwgbGVhZlN0YXRlcyk7ZWxzZSB7XG4gICAgICAgIGxlYWZTdGF0ZXNbc3RhdGUuZnVsbE5hbWVdID0gc3RhdGU7XG4gICAgICAgIHN0YXRlLnBhdGhzID0gdXRpbC5wYXJzZVBhdGhzKHN0YXRlLmZ1bGxQYXRoKCkpO1xuICAgICAgICByZXR1cm4gbGVhZlN0YXRlcztcbiAgICAgIH1cbiAgICB9LCBsZWFmU3RhdGVzKTtcbiAgfVxuXG4gIC8qXG4gICogUmVxdWVzdCBhIHByb2dyYW1tYXRpYyBzdGF0ZSBjaGFuZ2UuXG4gICpcbiAgKiBUd28gbm90YXRpb25zIGFyZSBzdXBwb3J0ZWQ6XG4gICogdHJhbnNpdGlvblRvKCdteS50YXJnZXQuc3RhdGUnLCB7aWQ6IDMzLCBmaWx0ZXI6ICdkZXNjJ30pXG4gICogdHJhbnNpdGlvblRvKCd0YXJnZXQvMzM/ZmlsdGVyPWRlc2MnKVxuICAqL1xuICBmdW5jdGlvbiB0cmFuc2l0aW9uVG8ocGF0aFF1ZXJ5T3JOYW1lKSB7XG4gICAgdmFyIG5hbWUgPSBsZWFmU3RhdGVzW3BhdGhRdWVyeU9yTmFtZV07XG4gICAgdmFyIHBhcmFtcyA9IChuYW1lID8gYXJndW1lbnRzWzFdIDogbnVsbCkgfHwge307XG4gICAgdmFyIGFjYyA9IG5hbWUgPyBhcmd1bWVudHNbMl0gOiBhcmd1bWVudHNbMV07XG5cbiAgICBsb2dnZXIubG9nKCdDaGFuZ2luZyBzdGF0ZSB0byB7MH0nLCBwYXRoUXVlcnlPck5hbWUgfHwgJ1wiXCInKTtcblxuICAgIHVybENoYW5nZWQgPSBmYWxzZTtcblxuICAgIGlmIChuYW1lKSBzZXRTdGF0ZUJ5TmFtZShuYW1lLCBwYXJhbXMsIGFjYyk7ZWxzZSBzZXRTdGF0ZUZvclBhdGhRdWVyeShwYXRoUXVlcnlPck5hbWUsIGFjYyk7XG4gIH1cblxuICAvKlxuICAgKiBSZXBsYWNlcyB0aGUgY3VycmVudCBzdGF0ZSdzIHBhcmFtcyBpbiB0aGUgaGlzdG9yeSB3aXRoIG5ldyBwYXJhbXMuXG4gICAqIFRoZSBzdGF0ZSBpcyBOT1QgZXhpdGVkL3JlLWVudGVyZWQuXG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUGFyYW1zKG5ld1BhcmFtcykge1xuICAgIGlmICghY3VycmVudFN0YXRlKSByZXR1cm47XG5cbiAgICB2YXIgbmV3VXJpID0gcm91dGVyLmxpbmsoY3VycmVudFN0YXRlLnN0YXRlLmZ1bGxOYW1lLCBuZXdQYXJhbXMpO1xuXG4gICAgY3VycmVudFN0YXRlID0gKDAsIF9TdGF0ZVdpdGhQYXJhbXMyLmRlZmF1bHQpKGN1cnJlbnRTdGF0ZS5zdGF0ZSwgbmV3UGFyYW1zLCBuZXdVcmkpO1xuXG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobmV3VXJpLCBkb2N1bWVudC50aXRsZSwgbmV3VXJpKTtcbiAgfVxuXG4gIC8qXG4gICogQXR0ZW1wdCB0byBuYXZpZ2F0ZSB0byAnc3RhdGVOYW1lJyB3aXRoIGl0cyBwcmV2aW91cyBwYXJhbXMgb3JcbiAgKiBmYWxsYmFjayB0byB0aGUgZGVmYXVsdFBhcmFtcyBwYXJhbWV0ZXIgaWYgdGhlIHN0YXRlIHdhcyBuZXZlciBlbnRlcmVkLlxuICAqL1xuICBmdW5jdGlvbiBiYWNrVG8oc3RhdGVOYW1lLCBkZWZhdWx0UGFyYW1zLCBhY2MpIHtcbiAgICB2YXIgcGFyYW1zID0gbGVhZlN0YXRlc1tzdGF0ZU5hbWVdLmxhc3RQYXJhbXMgfHwgZGVmYXVsdFBhcmFtcztcbiAgICB0cmFuc2l0aW9uVG8oc3RhdGVOYW1lLCBwYXJhbXMsIGFjYyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRTdGF0ZUZvclBhdGhRdWVyeShwYXRoUXVlcnksIGFjYykge1xuICAgIHZhciBzdGF0ZSA9IHVuZGVmaW5lZCxcbiAgICAgICAgcGFyYW1zID0gdW5kZWZpbmVkLFxuICAgICAgICBfc3RhdGUgPSB1bmRlZmluZWQsXG4gICAgICAgIF9wYXJhbXMgPSB1bmRlZmluZWQ7XG5cbiAgICBjdXJyZW50UGF0aFF1ZXJ5ID0gdXRpbC5ub3JtYWxpemVQYXRoUXVlcnkocGF0aFF1ZXJ5KTtcblxuICAgIHZhciBwcSA9IGN1cnJlbnRQYXRoUXVlcnkuc3BsaXQoJz8nKTtcbiAgICB2YXIgcGF0aCA9IHBxWzBdO1xuICAgIHZhciBxdWVyeSA9IHBxWzFdO1xuICAgIHZhciBwYXRocyA9IHV0aWwucGFyc2VQYXRocyhwYXRoKTtcbiAgICB2YXIgcXVlcnlQYXJhbXMgPSB1dGlsLnBhcnNlUXVlcnlQYXJhbXMocXVlcnkpO1xuXG4gICAgZm9yICh2YXIgbmFtZSBpbiBsZWFmU3RhdGVzKSB7XG4gICAgICBfc3RhdGUgPSBsZWFmU3RhdGVzW25hbWVdO1xuICAgICAgX3BhcmFtcyA9IF9zdGF0ZS5tYXRjaGVzKHBhdGhzKTtcblxuICAgICAgaWYgKF9wYXJhbXMpIHtcbiAgICAgICAgc3RhdGUgPSBfc3RhdGU7XG4gICAgICAgIHBhcmFtcyA9IHV0aWwubWVyZ2VPYmplY3RzKF9wYXJhbXMsIHF1ZXJ5UGFyYW1zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlKSBzZXRTdGF0ZShzdGF0ZSwgcGFyYW1zLCBhY2MpO2Vsc2Ugbm90Rm91bmQoY3VycmVudFBhdGhRdWVyeSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRTdGF0ZUJ5TmFtZShuYW1lLCBwYXJhbXMsIGFjYykge1xuICAgIHZhciBzdGF0ZSA9IGxlYWZTdGF0ZXNbbmFtZV07XG5cbiAgICBpZiAoIXN0YXRlKSByZXR1cm4gbm90Rm91bmQobmFtZSk7XG5cbiAgICB2YXIgcGF0aFF1ZXJ5ID0gaW50ZXJwb2xhdGUoc3RhdGUsIHBhcmFtcyk7XG4gICAgc2V0U3RhdGVGb3JQYXRoUXVlcnkocGF0aFF1ZXJ5LCBhY2MpO1xuICB9XG5cbiAgLypcbiAgKiBBZGQgYSBuZXcgcm9vdCBzdGF0ZSB0byB0aGUgcm91dGVyLlxuICAqIFRoZSBuYW1lIG11c3QgYmUgdW5pcXVlIGFtb25nIHJvb3Qgc3RhdGVzLlxuICAqL1xuICBmdW5jdGlvbiBhZGRTdGF0ZShuYW1lLCBzdGF0ZSkge1xuICAgIGlmIChzdGF0ZXNbbmFtZV0pIHRocm93IG5ldyBFcnJvcignQSBzdGF0ZSBhbHJlYWR5IGV4aXN0IGluIHRoZSByb3V0ZXIgd2l0aCB0aGUgbmFtZSAnICsgbmFtZSk7XG5cbiAgICBzdGF0ZSA9IHN0YXRlVHJlZShzdGF0ZSk7XG5cbiAgICBzdGF0ZXNbbmFtZV0gPSBzdGF0ZTtcblxuICAgIC8vIFRoZSByb3V0ZXIgaXMgYWxyZWFkeSBpbml0aWFsaXplZDogSG90IHBhdGNoIHRoaXMgc3RhdGUgaW4uXG4gICAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgICBzdGF0ZS5pbml0KHJvdXRlciwgbmFtZSk7XG4gICAgICByZWdpc3RlckxlYWZTdGF0ZXMoW3N0YXRlXSwgbGVhZlN0YXRlcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvdXRlcjtcbiAgfVxuXG4gIC8qXG4gICogUmVhZCB0aGUgcGF0aC9xdWVyeSBmcm9tIHRoZSBVUkwuXG4gICovXG4gIGZ1bmN0aW9uIHVybFBhdGhRdWVyeSgpIHtcbiAgICB2YXIgaGFzaFNsYXNoID0gbG9jYXRpb24uaHJlZi5pbmRleE9mKGhhc2hTbGFzaFN0cmluZyk7XG4gICAgdmFyIHBhdGhRdWVyeSA9IHVuZGVmaW5lZDtcblxuICAgIGlmIChoYXNoU2xhc2ggPiAtMSkgcGF0aFF1ZXJ5ID0gbG9jYXRpb24uaHJlZi5zbGljZShoYXNoU2xhc2ggKyBoYXNoU2xhc2hTdHJpbmcubGVuZ3RoKTtlbHNlIGlmIChpc0hhc2hNb2RlKCkpIHBhdGhRdWVyeSA9ICcvJztlbHNlIHBhdGhRdWVyeSA9IChsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCkuc2xpY2UoMSk7XG5cbiAgICByZXR1cm4gdXRpbC5ub3JtYWxpemVQYXRoUXVlcnkocGF0aFF1ZXJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSGFzaE1vZGUoKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMudXJsU3luYyA9PSAnaGFzaCc7XG4gIH1cblxuICAvKlxuICAqIENvbXB1dGUgYSBsaW5rIHRoYXQgY2FuIGJlIHVzZWQgaW4gYW5jaG9ycycgaHJlZiBhdHRyaWJ1dGVzXG4gICogZnJvbSBhIHN0YXRlIG5hbWUgYW5kIGEgbGlzdCBvZiBwYXJhbXMsIGEuay5hIHJldmVyc2Ugcm91dGluZy5cbiAgKi9cbiAgZnVuY3Rpb24gbGluayhzdGF0ZU5hbWUsIHBhcmFtcykge1xuICAgIHZhciBzdGF0ZSA9IGxlYWZTdGF0ZXNbc3RhdGVOYW1lXTtcbiAgICBpZiAoIXN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIHN0YXRlICcgKyBzdGF0ZU5hbWUpO1xuXG4gICAgdmFyIGludGVycG9sYXRlZCA9IGludGVycG9sYXRlKHN0YXRlLCBwYXJhbXMpO1xuICAgIHZhciB1cmkgPSB1dGlsLm5vcm1hbGl6ZVBhdGhRdWVyeShpbnRlcnBvbGF0ZWQpO1xuXG4gICAgcmV0dXJuIGlzSGFzaE1vZGUoKSA/ICcjJyArIG9wdGlvbnMuaGFzaFByZWZpeCArIHVyaSA6IHVyaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGludGVycG9sYXRlKHN0YXRlLCBwYXJhbXMpIHtcbiAgICB2YXIgZW5jb2RlZFBhcmFtcyA9IHt9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xuICAgICAgaWYgKHBhcmFtc1trZXldICE9PSB1bmRlZmluZWQpIGVuY29kZWRQYXJhbXNba2V5XSA9IGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlLmludGVycG9sYXRlKGVuY29kZWRQYXJhbXMpO1xuICB9XG5cbiAgLypcbiAgKiBSZXR1cm5zIGFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHJvdXRlci5cbiAgKi9cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudCgpIHtcbiAgICByZXR1cm4gY3VycmVudFN0YXRlICYmIGN1cnJlbnRTdGF0ZS5hc1B1YmxpYztcbiAgfVxuXG4gIC8qXG4gICogUmV0dXJucyBhbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBwcmV2aW91cyBzdGF0ZSBvZiB0aGUgcm91dGVyXG4gICogb3IgbnVsbCBpZiB0aGUgcm91dGVyIGlzIHN0aWxsIGluIGl0cyBpbml0aWFsIHN0YXRlLlxuICAqL1xuICBmdW5jdGlvbiBnZXRQcmV2aW91cygpIHtcbiAgICByZXR1cm4gcHJldmlvdXNTdGF0ZSAmJiBwcmV2aW91c1N0YXRlLmFzUHVibGljO1xuICB9XG5cbiAgLypcbiAgKiBSZXR1cm5zIHRoZSBkaWZmIGJldHdlZW4gdGhlIGN1cnJlbnQgcGFyYW1zIGFuZCB0aGUgcHJldmlvdXMgb25lcy5cbiAgKi9cbiAgZnVuY3Rpb24gZ2V0UGFyYW1zRGlmZigpIHtcbiAgICByZXR1cm4gY3VycmVudFBhcmFtc0RpZmY7XG4gIH1cblxuICBmdW5jdGlvbiBhbGxTdGF0ZXNSZWMoc3RhdGVzLCBhY2MpIHtcbiAgICBhY2MucHVzaC5hcHBseShhY2MsIHN0YXRlcyk7XG4gICAgc3RhdGVzLmZvckVhY2goZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICByZXR1cm4gYWxsU3RhdGVzUmVjKHN0YXRlLmNoaWxkcmVuLCBhY2MpO1xuICAgIH0pO1xuICAgIHJldHVybiBhY2M7XG4gIH1cblxuICBmdW5jdGlvbiBhbGxTdGF0ZXMoKSB7XG4gICAgcmV0dXJuIGFsbFN0YXRlc1JlYyh1dGlsLm9iamVjdFRvQXJyYXkoc3RhdGVzKSwgW10pO1xuICB9XG5cbiAgLypcbiAgKiBSZXR1cm5zIHRoZSBzdGF0ZSBvYmplY3QgdGhhdCB3YXMgYnVpbHQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucyBvYmplY3Qgb3IgdGhhdCBoYXMgdGhlIGdpdmVuIGZ1bGxOYW1lLlxuICAqIFJldHVybnMgdW5kZWZpbmVkIGlmIHRoZSBzdGF0ZSBkb2Vzbid0IGV4aXN0LlxuICAqL1xuICBmdW5jdGlvbiBmaW5kU3RhdGUoYnkpIHtcbiAgICB2YXIgZmlsdGVyRm4gPSAodHlwZW9mIGJ5ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihieSkpID09PSAnb2JqZWN0JyA/IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgcmV0dXJuIGJ5ID09PSBzdGF0ZS5vcHRpb25zO1xuICAgIH0gOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgIHJldHVybiBieSA9PT0gc3RhdGUuZnVsbE5hbWU7XG4gICAgfTtcblxuICAgIHZhciBzdGF0ZSA9IGFsbFN0YXRlcygpLmZpbHRlcihmaWx0ZXJGbilbMF07XG4gICAgcmV0dXJuIHN0YXRlICYmIHN0YXRlLmFzUHVibGljO1xuICB9XG5cbiAgLypcbiAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHJvdXRlciBpcyBleGVjdXRpbmcgaXRzIGZpcnN0IHRyYW5zaXRpb24uXG4gICovXG4gIGZ1bmN0aW9uIGlzRmlyc3RUcmFuc2l0aW9uKCkge1xuICAgIHJldHVybiBwcmV2aW91c1N0YXRlID09IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBvbihldmVudE5hbWUsIGNiKSB7XG4gICAgZXZlbnRDYWxsYmFja3NbZXZlbnROYW1lXSA9IGNiO1xuICAgIHJldHVybiByb3V0ZXI7XG4gIH1cblxuICBmdW5jdGlvbiBzdGF0ZVRyZWVzKHN0YXRlcykge1xuICAgIHJldHVybiB1dGlsLm1hcFZhbHVlcyhzdGF0ZXMsIHN0YXRlVHJlZSk7XG4gIH1cblxuICAvKlxuICAqIENyZWF0ZXMgYW4gaW50ZXJuYWwgU3RhdGUgb2JqZWN0IGZyb20gYSBzcGVjaWZpY2F0aW9uIFBPSk8uXG4gICovXG4gIGZ1bmN0aW9uIHN0YXRlVHJlZShzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5jaGlsZHJlbikgc3RhdGUuY2hpbGRyZW4gPSBzdGF0ZVRyZWVzKHN0YXRlLmNoaWxkcmVuKTtcbiAgICByZXR1cm4gKDAsIF9TdGF0ZTIuZGVmYXVsdCkoc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9nU3RhdGVUcmVlKCkge1xuICAgIGlmICghbG9nZ2VyLmVuYWJsZWQpIHJldHVybjtcblxuICAgIGZ1bmN0aW9uIGluZGVudChsZXZlbCkge1xuICAgICAgaWYgKGxldmVsID09IDApIHJldHVybiAnJztcbiAgICAgIHJldHVybiBuZXcgQXJyYXkoMiArIChsZXZlbCAtIDEpICogNCkuam9pbignICcpICsgJ+KUgOKUgCAnO1xuICAgIH1cblxuICAgIHZhciBzdGF0ZVRyZWUgPSBmdW5jdGlvbiBzdGF0ZVRyZWUoc3RhdGUpIHtcbiAgICAgIHZhciBwYXRoID0gdXRpbC5ub3JtYWxpemVQYXRoUXVlcnkoc3RhdGUuZnVsbFBhdGgoKSk7XG4gICAgICB2YXIgcGF0aFN0ciA9IHN0YXRlLmNoaWxkcmVuLmxlbmd0aCA9PSAwID8gJyAoQCBwYXRoKScucmVwbGFjZSgncGF0aCcsIHBhdGgpIDogJyc7XG4gICAgICB2YXIgc3RyID0gaW5kZW50KHN0YXRlLnBhcmVudHMubGVuZ3RoKSArIHN0YXRlLm5hbWUgKyBwYXRoU3RyICsgJ1xcbic7XG4gICAgICByZXR1cm4gc3RyICsgc3RhdGUuY2hpbGRyZW4ubWFwKHN0YXRlVHJlZSkuam9pbignJyk7XG4gICAgfTtcblxuICAgIHZhciBtc2cgPSAnXFxuU3RhdGUgdHJlZVxcblxcbic7XG4gICAgbXNnICs9IHV0aWwub2JqZWN0VG9BcnJheShzdGF0ZXMpLm1hcChzdGF0ZVRyZWUpLmpvaW4oJycpO1xuICAgIG1zZyArPSAnXFxuJztcblxuICAgIGxvZ2dlci5sb2cobXNnKTtcbiAgfVxuXG4gIC8vIFB1YmxpYyBtZXRob2RzXG5cbiAgcm91dGVyLmNvbmZpZ3VyZSA9IGNvbmZpZ3VyZTtcbiAgcm91dGVyLmluaXQgPSBpbml0O1xuICByb3V0ZXIudHJhbnNpdGlvblRvID0gdHJhbnNpdGlvblRvO1xuICByb3V0ZXIucmVwbGFjZVBhcmFtcyA9IHJlcGxhY2VQYXJhbXM7XG4gIHJvdXRlci5iYWNrVG8gPSBiYWNrVG87XG4gIHJvdXRlci5hZGRTdGF0ZSA9IGFkZFN0YXRlO1xuICByb3V0ZXIubGluayA9IGxpbms7XG4gIHJvdXRlci5jdXJyZW50ID0gZ2V0Q3VycmVudDtcbiAgcm91dGVyLnByZXZpb3VzID0gZ2V0UHJldmlvdXM7XG4gIHJvdXRlci5maW5kU3RhdGUgPSBmaW5kU3RhdGU7XG4gIHJvdXRlci5pc0ZpcnN0VHJhbnNpdGlvbiA9IGlzRmlyc3RUcmFuc2l0aW9uO1xuICByb3V0ZXIucGFyYW1zRGlmZiA9IGdldFBhcmFtc0RpZmY7XG4gIHJvdXRlci5vcHRpb25zID0gb3B0aW9ucztcbiAgcm91dGVyLm9uID0gb247XG5cbiAgLy8gVXNlZCBmb3IgdGVzdGluZyBwdXJwb3NlcyBvbmx5XG4gIHJvdXRlci51cmxQYXRoUXVlcnkgPSB1cmxQYXRoUXVlcnk7XG4gIHJvdXRlci50ZXJtaW5hdGUgPSB0ZXJtaW5hdGU7XG5cbiAgdXRpbC5tZXJnZU9iamVjdHMoX2FwaTIuZGVmYXVsdCwgcm91dGVyKTtcblxuICByZXR1cm4gcm91dGVyO1xufVxuXG4vLyBMb2dnaW5nXG5cbnZhciBsb2dnZXIgPSB7XG4gIGxvZzogdXRpbC5ub29wLFxuICBlcnJvcjogdXRpbC5ub29wLFxuICBlbmFibGVkOiBmYWxzZVxufTtcblxuUm91dGVyLmVuYWJsZUxvZ3MgPSBmdW5jdGlvbiAoKSB7XG4gIGxvZ2dlci5lbmFibGVkID0gdHJ1ZTtcblxuICBsb2dnZXIubG9nID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBtZXNzYWdlID0gdXRpbC5tYWtlTWVzc2FnZS5hcHBseShudWxsLCBhcmdzKTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgfTtcblxuICBsb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICB2YXIgbWVzc2FnZSA9IHV0aWwubWFrZU1lc3NhZ2UuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJvdXRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYWJ5c3NhL2xpYi9Sb3V0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF91dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbnZhciB1dGlsID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3V0aWwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG52YXIgUEFSQU1TID0gLzpbXlxcXFw/XFwvXSovZztcblxuLypcbiogQ3JlYXRlcyBhIG5ldyBTdGF0ZSBpbnN0YW5jZSBmcm9tIGEge3VyaSwgZW50ZXIsIGV4aXQsIHVwZGF0ZSwgY2hpbGRyZW59IG9iamVjdC5cbiogVGhpcyBpcyB0aGUgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gb2YgYSBzdGF0ZSB1c2VkIGJ5IHRoZSByb3V0ZXIuXG4qL1xuZnVuY3Rpb24gU3RhdGUob3B0aW9ucykge1xuICB2YXIgc3RhdGUgPSB7IG9wdGlvbnM6IG9wdGlvbnMgfTtcbiAgdmFyIHN0YXRlcyA9IG9wdGlvbnMuY2hpbGRyZW47XG5cbiAgc3RhdGUucGF0aCA9IHBhdGhGcm9tVVJJKG9wdGlvbnMudXJpKTtcbiAgc3RhdGUucGFyYW1zID0gcGFyYW1zRnJvbVVSSShvcHRpb25zLnVyaSk7XG4gIHN0YXRlLnF1ZXJ5UGFyYW1zID0gcXVlcnlQYXJhbXNGcm9tVVJJKG9wdGlvbnMudXJpKTtcbiAgc3RhdGUuc3RhdGVzID0gc3RhdGVzO1xuICBzdGF0ZS5kYXRhID0gb3B0aW9ucy5kYXRhO1xuXG4gIHN0YXRlLmVudGVyID0gb3B0aW9ucy5lbnRlciB8fCB1dGlsLm5vb3A7XG4gIHN0YXRlLnVwZGF0ZSA9IG9wdGlvbnMudXBkYXRlO1xuICBzdGF0ZS5leGl0ID0gb3B0aW9ucy5leGl0IHx8IHV0aWwubm9vcDtcblxuICAvKlxuICAqIEluaXRpYWxpemUgYW5kIGZyZWV6ZSB0aGlzIHN0YXRlLlxuICAqL1xuICBmdW5jdGlvbiBpbml0KHJvdXRlciwgbmFtZSwgcGFyZW50KSB7XG4gICAgc3RhdGUucm91dGVyID0gcm91dGVyO1xuICAgIHN0YXRlLm5hbWUgPSBuYW1lO1xuICAgIHN0YXRlLmlzRGVmYXVsdCA9IG5hbWUgPT0gJ19kZWZhdWx0Xyc7XG4gICAgc3RhdGUucGFyZW50ID0gcGFyZW50O1xuICAgIHN0YXRlLnBhcmVudHMgPSBnZXRQYXJlbnRzKCk7XG4gICAgc3RhdGUucm9vdCA9IHN0YXRlLnBhcmVudCA/IHN0YXRlLnBhcmVudHNbc3RhdGUucGFyZW50cy5sZW5ndGggLSAxXSA6IHN0YXRlO1xuICAgIHN0YXRlLmNoaWxkcmVuID0gdXRpbC5vYmplY3RUb0FycmF5KHN0YXRlcyk7XG4gICAgc3RhdGUuZnVsbE5hbWUgPSBnZXRGdWxsTmFtZSgpO1xuICAgIHN0YXRlLmFzUHVibGljID0gbWFrZVB1YmxpY0FQSSgpO1xuXG4gICAgZWFjaENoaWxkU3RhdGUoZnVuY3Rpb24gKG5hbWUsIGNoaWxkU3RhdGUpIHtcbiAgICAgIGNoaWxkU3RhdGUuaW5pdChyb3V0ZXIsIG5hbWUsIHN0YXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICogVGhlIGZ1bGwgcGF0aCwgY29tcG9zZWQgb2YgYWxsIHRoZSBpbmRpdmlkdWFsIHBhdGhzIG9mIHRoaXMgc3RhdGUgYW5kIGl0cyBwYXJlbnRzLlxuICAqL1xuICBmdW5jdGlvbiBmdWxsUGF0aCgpIHtcbiAgICB2YXIgcmVzdWx0ID0gc3RhdGUucGF0aDtcbiAgICB2YXIgc3RhdGVQYXJlbnQgPSBzdGF0ZS5wYXJlbnQ7XG5cbiAgICB3aGlsZSAoc3RhdGVQYXJlbnQpIHtcbiAgICAgIGlmIChzdGF0ZVBhcmVudC5wYXRoKSByZXN1bHQgPSBzdGF0ZVBhcmVudC5wYXRoICsgJy8nICsgcmVzdWx0O1xuICAgICAgc3RhdGVQYXJlbnQgPSBzdGF0ZVBhcmVudC5wYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qXG4gICogVGhlIGxpc3Qgb2YgYWxsIHBhcmVudHMsIHN0YXJ0aW5nIGZyb20gdGhlIGNsb3Nlc3Qgb25lcy5cbiAgKi9cbiAgZnVuY3Rpb24gZ2V0UGFyZW50cygpIHtcbiAgICB2YXIgcGFyZW50cyA9IFtdO1xuICAgIHZhciBwYXJlbnQgPSBzdGF0ZS5wYXJlbnQ7XG5cbiAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudHM7XG4gIH1cblxuICAvKlxuICAqIFRoZSBmdWxseSBxdWFsaWZpZWQgbmFtZSBvZiB0aGlzIHN0YXRlLlxuICAqIGUuZyBncmFucGFyZW50TmFtZS5wYXJlbnROYW1lLm5hbWVcbiAgKi9cbiAgZnVuY3Rpb24gZ2V0RnVsbE5hbWUoKSB7XG4gICAgdmFyIHJlc3VsdCA9IHN0YXRlLnBhcmVudHMucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGFjYywgcGFyZW50KSB7XG4gICAgICByZXR1cm4gYWNjICsgcGFyZW50Lm5hbWUgKyAnLic7XG4gICAgfSwgJycpICsgc3RhdGUubmFtZTtcblxuICAgIHJldHVybiBzdGF0ZS5pc0RlZmF1bHQgPyByZXN1bHQucmVwbGFjZSgnLl9kZWZhdWx0XycsICcnKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFsbFF1ZXJ5UGFyYW1zKCkge1xuICAgIHJldHVybiBzdGF0ZS5wYXJlbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwYXJlbnQpIHtcbiAgICAgIHJldHVybiB1dGlsLm1lcmdlT2JqZWN0cyhhY2MsIHBhcmVudC5xdWVyeVBhcmFtcyk7XG4gICAgfSwgdXRpbC5jb3B5T2JqZWN0KHN0YXRlLnF1ZXJ5UGFyYW1zKSk7XG4gIH1cblxuICBmdW5jdGlvbiBtYWtlUHVibGljQVBJKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBzdGF0ZS5uYW1lLFxuICAgICAgZnVsbE5hbWU6IHN0YXRlLmZ1bGxOYW1lLFxuICAgICAgZGF0YTogb3B0aW9ucy5kYXRhIHx8IHt9LFxuICAgICAgcGFyZW50OiBzdGF0ZS5wYXJlbnQgJiYgc3RhdGUucGFyZW50LmFzUHVibGljXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVhY2hDaGlsZFN0YXRlKGNhbGxiYWNrKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBzdGF0ZXMpIHtcbiAgICAgIGNhbGxiYWNrKG5hbWUsIHN0YXRlc1tuYW1lXSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgKiBSZXR1cm5zIHdoZXRoZXIgdGhpcyBzdGF0ZSBtYXRjaGVzIHRoZSBwYXNzZWQgcGF0aCBBcnJheS5cbiAgKiBJbiBjYXNlIG9mIGEgbWF0Y2gsIHRoZSBhY3R1YWwgcGFyYW0gdmFsdWVzIGFyZSByZXR1cm5lZC5cbiAgKi9cbiAgZnVuY3Rpb24gbWF0Y2hlcyhwYXRocykge1xuICAgIHZhciBwYXJhbXMgPSB7fTtcbiAgICB2YXIgbm9uUmVzdFN0YXRlUGF0aHMgPSBzdGF0ZS5wYXRocy5maWx0ZXIoZnVuY3Rpb24gKHApIHtcbiAgICAgIHJldHVybiBwW3AubGVuZ3RoIC0gMV0gIT09ICcqJztcbiAgICB9KTtcblxuICAgIC8qIFRoaXMgc3RhdGUgaGFzIG1vcmUgcGF0aHMgdGhhbiB0aGUgcGFzc2VkIHBhdGhzLCBpdCBjYW5ub3QgYmUgYSBtYXRjaCAqL1xuICAgIGlmIChub25SZXN0U3RhdGVQYXRocy5sZW5ndGggPiBwYXRocy5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgIC8qIENoZWNrcyBpZiB0aGUgcGF0aHMgbWF0Y2ggb25lIGJ5IG9uZSAqL1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwYXRoID0gcGF0aHNbaV07XG4gICAgICB2YXIgdGhhdFBhdGggPSBzdGF0ZS5wYXRoc1tpXTtcblxuICAgICAgLyogVGhpcyBzdGF0ZSBoYXMgbGVzcyBwYXRocyB0aGFuIHRoZSBwYXNzZWQgcGF0aHMsIGl0IGNhbm5vdCBiZSBhIG1hdGNoICovXG4gICAgICBpZiAoIXRoYXRQYXRoKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHZhciBpc1Jlc3QgPSB0aGF0UGF0aFt0aGF0UGF0aC5sZW5ndGggLSAxXSA9PT0gJyonO1xuICAgICAgaWYgKGlzUmVzdCkge1xuICAgICAgICB2YXIgbmFtZSA9IHBhcmFtTmFtZSh0aGF0UGF0aCk7XG4gICAgICAgIHBhcmFtc1tuYW1lXSA9IHBhdGhzLnNsaWNlKGkpLmpvaW4oJy8nKTtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgIH1cblxuICAgICAgdmFyIGlzRHluYW1pYyA9IHRoYXRQYXRoWzBdID09PSAnOic7XG4gICAgICBpZiAoaXNEeW5hbWljKSB7XG4gICAgICAgIHZhciBuYW1lID0gcGFyYW1OYW1lKHRoYXRQYXRoKTtcbiAgICAgICAgcGFyYW1zW25hbWVdID0gcGF0aDtcbiAgICAgIH0gZWxzZSBpZiAodGhhdFBhdGggIT0gcGF0aCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKlxuICAqIFJldHVybnMgYSBVUkkgYnVpbHQgZnJvbSB0aGlzIHN0YXRlIGFuZCB0aGUgcGFzc2VkIHBhcmFtcy5cbiAgKi9cbiAgZnVuY3Rpb24gaW50ZXJwb2xhdGUocGFyYW1zKSB7XG4gICAgdmFyIHBhdGggPSBzdGF0ZS5mdWxsUGF0aCgpLnJlcGxhY2UoUEFSQU1TLCBmdW5jdGlvbiAocCkge1xuICAgICAgcmV0dXJuIHBhcmFtc1twYXJhbU5hbWUocCldIHx8ICcnO1xuICAgIH0pO1xuXG4gICAgdmFyIHF1ZXJ5UGFyYW1zID0gYWxsUXVlcnlQYXJhbXMoKTtcbiAgICB2YXIgcGFzc2VkUXVlcnlQYXJhbXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpLmZpbHRlcihmdW5jdGlvbiAocCkge1xuICAgICAgcmV0dXJuIHF1ZXJ5UGFyYW1zW3BdO1xuICAgIH0pO1xuXG4gICAgdmFyIHF1ZXJ5ID0gcGFzc2VkUXVlcnlQYXJhbXMubWFwKGZ1bmN0aW9uIChwKSB7XG4gICAgICByZXR1cm4gcCArICc9JyArIHBhcmFtc1twXTtcbiAgICB9KS5qb2luKCcmJyk7XG5cbiAgICByZXR1cm4gcGF0aCArIChxdWVyeS5sZW5ndGggPyAnPycgKyBxdWVyeSA6ICcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBzdGF0ZS5mdWxsTmFtZTtcbiAgfVxuXG4gIHN0YXRlLmluaXQgPSBpbml0O1xuICBzdGF0ZS5mdWxsUGF0aCA9IGZ1bGxQYXRoO1xuICBzdGF0ZS5hbGxRdWVyeVBhcmFtcyA9IGFsbFF1ZXJ5UGFyYW1zO1xuICBzdGF0ZS5tYXRjaGVzID0gbWF0Y2hlcztcbiAgc3RhdGUuaW50ZXJwb2xhdGUgPSBpbnRlcnBvbGF0ZTtcbiAgc3RhdGUudG9TdHJpbmcgPSB0b1N0cmluZztcblxuICByZXR1cm4gc3RhdGU7XG59XG5cbmZ1bmN0aW9uIHBhcmFtTmFtZShwYXJhbSkge1xuICByZXR1cm4gcGFyYW1bcGFyYW0ubGVuZ3RoIC0gMV0gPT09ICcqJyA/IHBhcmFtLnN1YnN0cigxKS5zbGljZSgwLCAtMSkgOiBwYXJhbS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIHBhdGhGcm9tVVJJKHVyaSkge1xuICByZXR1cm4gKHVyaSB8fCAnJykuc3BsaXQoJz8nKVswXTtcbn1cblxuZnVuY3Rpb24gcGFyYW1zRnJvbVVSSSh1cmkpIHtcbiAgdmFyIG1hdGNoZXMgPSBQQVJBTVMuZXhlYyh1cmkpO1xuICByZXR1cm4gbWF0Y2hlcyA/IHV0aWwuYXJyYXlUb09iamVjdChtYXRjaGVzLm1hcChwYXJhbU5hbWUpKSA6IHt9O1xufVxuXG5mdW5jdGlvbiBxdWVyeVBhcmFtc0Zyb21VUkkodXJpKSB7XG4gIHZhciBxdWVyeSA9ICh1cmkgfHwgJycpLnNwbGl0KCc/JylbMV07XG4gIHJldHVybiBxdWVyeSA/IHV0aWwuYXJyYXlUb09iamVjdChxdWVyeS5zcGxpdCgnJicpKSA6IHt9O1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBTdGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYWJ5c3NhL2xpYi9TdGF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gU3RhdGVXaXRoUGFyYW1zO1xuLypcbiogQ3JlYXRlcyBhIG5ldyBTdGF0ZVdpdGhQYXJhbXMgaW5zdGFuY2UuXG4qXG4qIFN0YXRlV2l0aFBhcmFtcyBpcyB0aGUgbWVyZ2UgYmV0d2VlbiBhIFN0YXRlIG9iamVjdCAoY3JlYXRlZCBhbmQgYWRkZWQgdG8gdGhlIHJvdXRlciBiZWZvcmUgaW5pdClcbiogYW5kIHBhcmFtcyAoYm90aCBwYXRoIGFuZCBxdWVyeSBwYXJhbXMsIGV4dHJhY3RlZCBmcm9tIHRoZSBVUkwgYWZ0ZXIgaW5pdClcbipcbiogVGhpcyBpcyBhbiBpbnRlcm5hbCBtb2RlbCBUaGUgcHVibGljIG1vZGVsIGlzIHRoZSBhc1B1YmxpYyBwcm9wZXJ0eS5cbiovXG5mdW5jdGlvbiBTdGF0ZVdpdGhQYXJhbXMoc3RhdGUsIHBhcmFtcywgcGF0aFF1ZXJ5LCBkaWZmKSB7XG4gIHJldHVybiB7XG4gICAgc3RhdGU6IHN0YXRlLFxuICAgIHBhcmFtczogcGFyYW1zLFxuICAgIHRvU3RyaW5nOiB0b1N0cmluZyxcbiAgICBhc1B1YmxpYzogbWFrZVB1YmxpY0FQSShzdGF0ZSwgcGFyYW1zLCBwYXRoUXVlcnksIGRpZmYpXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1ha2VQdWJsaWNBUEkoc3RhdGUsIHBhcmFtcywgcGF0aFF1ZXJ5LCBwYXJhbXNEaWZmKSB7XG5cbiAgLypcbiAgKiBSZXR1cm5zIHdoZXRoZXIgdGhpcyBzdGF0ZSBvciBhbnkgb2YgaXRzIHBhcmVudHMgaGFzIHRoZSBnaXZlbiBmdWxsTmFtZS5cbiAgKi9cbiAgZnVuY3Rpb24gaXNJbihmdWxsU3RhdGVOYW1lKSB7XG4gICAgdmFyIGN1cnJlbnQgPSBzdGF0ZTtcbiAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgaWYgKGN1cnJlbnQuZnVsbE5hbWUgPT0gZnVsbFN0YXRlTmFtZSkgcmV0dXJuIHRydWU7XG4gICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdXJpOiBwYXRoUXVlcnksXG4gICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgcGFyYW1zRGlmZjogcGFyYW1zRGlmZixcbiAgICBuYW1lOiBzdGF0ZSA/IHN0YXRlLm5hbWUgOiAnJyxcbiAgICBmdWxsTmFtZTogc3RhdGUgPyBzdGF0ZS5mdWxsTmFtZSA6ICcnLFxuICAgIGRhdGE6IHN0YXRlID8gc3RhdGUuZGF0YSA6IHt9LFxuICAgIGlzSW46IGlzSW5cbiAgfTtcbn1cblxuZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHZhciBuYW1lID0gdGhpcy5zdGF0ZSAmJiB0aGlzLnN0YXRlLmZ1bGxOYW1lO1xuICByZXR1cm4gbmFtZSArICc6JyArIEpTT04uc3RyaW5naWZ5KHRoaXMucGFyYW1zKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYWJ5c3NhL2xpYi9TdGF0ZVdpdGhQYXJhbXMuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbi8qXG4qIENyZWF0ZSBhIG5ldyBUcmFuc2l0aW9uIGluc3RhbmNlLlxuKi9cbmZ1bmN0aW9uIFRyYW5zaXRpb24oZnJvbVN0YXRlV2l0aFBhcmFtcywgdG9TdGF0ZVdpdGhQYXJhbXMsIHBhcmFtc0RpZmYsIGFjYywgcm91dGVyLCBsb2dnZXIpIHtcbiAgdmFyIHJvb3QgPSB7IHJvb3Q6IG51bGwsIGluY2x1c2l2ZTogdHJ1ZSB9O1xuICB2YXIgZW50ZXJzID0gdW5kZWZpbmVkO1xuICB2YXIgZXhpdHMgPSB1bmRlZmluZWQ7XG5cbiAgdmFyIGZyb21TdGF0ZSA9IGZyb21TdGF0ZVdpdGhQYXJhbXMgJiYgZnJvbVN0YXRlV2l0aFBhcmFtcy5zdGF0ZTtcbiAgdmFyIHRvU3RhdGUgPSB0b1N0YXRlV2l0aFBhcmFtcy5zdGF0ZTtcbiAgdmFyIHBhcmFtcyA9IHRvU3RhdGVXaXRoUGFyYW1zLnBhcmFtcztcbiAgdmFyIGlzVXBkYXRlID0gZnJvbVN0YXRlID09IHRvU3RhdGU7XG5cbiAgdmFyIHRyYW5zaXRpb24gPSB7XG4gICAgZnJvbTogZnJvbVN0YXRlLFxuICAgIHRvOiB0b1N0YXRlLFxuICAgIHRvUGFyYW1zOiBwYXJhbXMsXG4gICAgY2FuY2VsOiBjYW5jZWwsXG4gICAgcnVuOiBydW4sXG4gICAgY2FuY2VsbGVkOiBmYWxzZSxcbiAgICBjdXJyZW50U3RhdGU6IGZyb21TdGF0ZVxuICB9O1xuXG4gIC8vIFRoZSBmaXJzdCB0cmFuc2l0aW9uIGhhcyBubyBmcm9tU3RhdGUuXG4gIGlmIChmcm9tU3RhdGUpIHJvb3QgPSB0cmFuc2l0aW9uUm9vdChmcm9tU3RhdGUsIHRvU3RhdGUsIGlzVXBkYXRlLCBwYXJhbXNEaWZmKTtcblxuICBleGl0cyA9IGZyb21TdGF0ZSA/IHRyYW5zaXRpb25TdGF0ZXMoZnJvbVN0YXRlLCByb290KSA6IFtdO1xuICBlbnRlcnMgPSB0cmFuc2l0aW9uU3RhdGVzKHRvU3RhdGUsIHJvb3QpLnJldmVyc2UoKTtcblxuICBmdW5jdGlvbiBydW4oKSB7XG4gICAgc3RhcnRUcmFuc2l0aW9uKGVudGVycywgZXhpdHMsIHBhcmFtcywgdHJhbnNpdGlvbiwgaXNVcGRhdGUsIGFjYywgcm91dGVyLCBsb2dnZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHRyYW5zaXRpb24uY2FuY2VsbGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB0cmFuc2l0aW9uO1xufVxuXG5mdW5jdGlvbiBzdGFydFRyYW5zaXRpb24oZW50ZXJzLCBleGl0cywgcGFyYW1zLCB0cmFuc2l0aW9uLCBpc1VwZGF0ZSwgYWNjLCByb3V0ZXIsIGxvZ2dlcikge1xuICBhY2MgPSBhY2MgfHwge307XG5cbiAgdHJhbnNpdGlvbi5leGl0aW5nID0gdHJ1ZTtcbiAgZXhpdHMuZm9yRWFjaChmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICBpZiAoaXNVcGRhdGUgJiYgc3RhdGUudXBkYXRlKSByZXR1cm47XG4gICAgcnVuU3RlcChzdGF0ZSwgJ2V4aXQnLCBwYXJhbXMsIHRyYW5zaXRpb24sIGFjYywgcm91dGVyLCBsb2dnZXIpO1xuICB9KTtcbiAgdHJhbnNpdGlvbi5leGl0aW5nID0gZmFsc2U7XG5cbiAgZW50ZXJzLmZvckVhY2goZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgdmFyIGZuID0gaXNVcGRhdGUgJiYgc3RhdGUudXBkYXRlID8gJ3VwZGF0ZScgOiAnZW50ZXInO1xuICAgIHJ1blN0ZXAoc3RhdGUsIGZuLCBwYXJhbXMsIHRyYW5zaXRpb24sIGFjYywgcm91dGVyLCBsb2dnZXIpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcnVuU3RlcChzdGF0ZSwgc3RlcEZuLCBwYXJhbXMsIHRyYW5zaXRpb24sIGFjYywgcm91dGVyLCBsb2dnZXIpIHtcbiAgaWYgKHRyYW5zaXRpb24uY2FuY2VsbGVkKSByZXR1cm47XG5cbiAgaWYgKGxvZ2dlci5lbmFibGVkKSB7XG4gICAgdmFyIGNhcGl0YWxpemVkU3RlcCA9IHN0ZXBGblswXS50b1VwcGVyQ2FzZSgpICsgc3RlcEZuLnNsaWNlKDEpO1xuICAgIGxvZ2dlci5sb2coY2FwaXRhbGl6ZWRTdGVwICsgJyAnICsgc3RhdGUuZnVsbE5hbWUpO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IHN0YXRlW3N0ZXBGbl0ocGFyYW1zLCBhY2MsIHJvdXRlcik7XG5cbiAgaWYgKHRyYW5zaXRpb24uY2FuY2VsbGVkKSByZXR1cm47XG5cbiAgdHJhbnNpdGlvbi5jdXJyZW50U3RhdGUgPSBzdGVwRm4gPT0gJ2V4aXQnID8gc3RhdGUucGFyZW50IDogc3RhdGU7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLypcbiogVGhlIHRvcC1tb3N0IGZyb21TdGF0ZSdzIHBhcmVudCB0aGF0IG11c3QgYmUgZXhpdGVkXG4qIG9yIHVuZGVmaW5lZCBpZiB0aGUgdHdvIHN0YXRlcyBhcmUgaW4gZGlzdGluY3QgYnJhbmNoZXMgb2YgdGhlIHRyZWUuXG4qL1xuZnVuY3Rpb24gdHJhbnNpdGlvblJvb3QoZnJvbVN0YXRlLCB0b1N0YXRlLCBpc1VwZGF0ZSwgcGFyYW1zRGlmZikge1xuICB2YXIgY2xvc2VzdENvbW1vblBhcmVudCA9IHVuZGVmaW5lZDtcblxuICB2YXIgcGFyZW50cyA9IFtmcm9tU3RhdGVdLmNvbmNhdChmcm9tU3RhdGUucGFyZW50cykucmV2ZXJzZSgpO1xuXG4gIC8vIEZpbmQgdGhlIGNsb3Nlc3QgY29tbW9uIHBhcmVudCBvZiB0aGUgZnJvbS90byBzdGF0ZXMsIGlmIGFueS5cbiAgaWYgKCFpc1VwZGF0ZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZnJvbVN0YXRlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwYXJlbnQgPSBmcm9tU3RhdGUucGFyZW50c1tpXTtcblxuICAgICAgaWYgKHRvU3RhdGUucGFyZW50cy5pbmRleE9mKHBhcmVudCkgPiAtMSkge1xuICAgICAgICBjbG9zZXN0Q29tbW9uUGFyZW50ID0gcGFyZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSB0b3AtbW9zdCBwYXJlbnQgb3duaW5nIHNvbWUgdXBkYXRlZCBwYXJhbShzKSBvciBiYWlsIGlmIHdlIGZpcnN0IHJlYWNoIHRoZSBjbG9zZXN0Q29tbW9uUGFyZW50XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwYXJlbnQgPSBwYXJlbnRzW2ldO1xuXG4gICAgZm9yICh2YXIgcGFyYW0gaW4gcGFyYW1zRGlmZi5hbGwpIHtcbiAgICAgIGlmIChwYXJlbnQucGFyYW1zW3BhcmFtXSB8fCBwYXJlbnQucXVlcnlQYXJhbXNbcGFyYW1dKSByZXR1cm4geyByb290OiBwYXJlbnQsIGluY2x1c2l2ZTogdHJ1ZSB9O1xuICAgIH1cblxuICAgIGlmIChwYXJlbnQgPT09IGNsb3Nlc3RDb21tb25QYXJlbnQpIHJldHVybiB7IHJvb3Q6IGNsb3Nlc3RDb21tb25QYXJlbnQsIGluY2x1c2l2ZTogZmFsc2UgfTtcbiAgfVxuXG4gIHJldHVybiBjbG9zZXN0Q29tbW9uUGFyZW50ID8geyByb290OiBjbG9zZXN0Q29tbW9uUGFyZW50LCBpbmNsdXNpdmU6IGZhbHNlIH0gOiB7IGluY2x1c2l2ZTogdHJ1ZSB9O1xufVxuXG5mdW5jdGlvbiB0cmFuc2l0aW9uU3RhdGVzKHN0YXRlLCBfcmVmKSB7XG4gIHZhciByb290ID0gX3JlZi5yb290O1xuICB2YXIgaW5jbHVzaXZlID0gX3JlZi5pbmNsdXNpdmU7XG5cbiAgcm9vdCA9IHJvb3QgfHwgc3RhdGUucm9vdDtcblxuICB2YXIgcCA9IHN0YXRlLnBhcmVudHM7XG4gIHZhciBlbmQgPSBNYXRoLm1pbihwLmxlbmd0aCwgcC5pbmRleE9mKHJvb3QpICsgKGluY2x1c2l2ZSA/IDEgOiAwKSk7XG5cbiAgcmV0dXJuIFtzdGF0ZV0uY29uY2F0KHAuc2xpY2UoMCwgZW5kKSk7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRyYW5zaXRpb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2FieXNzYS9saWIvVHJhbnNpdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gaW50ZXJjZXB0QW5jaG9ycztcblxudmFyIHJvdXRlciA9IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gb25Nb3VzZURvd24oZXZ0KSB7XG4gIHZhciBocmVmID0gaHJlZkZvckV2ZW50KGV2dCk7XG5cbiAgaWYgKGhyZWYgIT09IHVuZGVmaW5lZCkgcm91dGVyLnRyYW5zaXRpb25UbyhocmVmKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZUNsaWNrKGV2dCkge1xuICB2YXIgaHJlZiA9IGhyZWZGb3JFdmVudChldnQpO1xuXG4gIGlmIChocmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICByb3V0ZXIudHJhbnNpdGlvblRvKGhyZWYpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhyZWZGb3JFdmVudChldnQpIHtcbiAgaWYgKGV2dC5kZWZhdWx0UHJldmVudGVkIHx8IGV2dC5tZXRhS2V5IHx8IGV2dC5jdHJsS2V5IHx8ICFpc0xlZnRCdXR0b24oZXZ0KSkgcmV0dXJuO1xuXG4gIHZhciB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICB2YXIgYW5jaG9yID0gYW5jaG9yVGFyZ2V0KHRhcmdldCk7XG4gIGlmICghYW5jaG9yKSByZXR1cm47XG5cbiAgdmFyIGRhdGFOYXYgPSBhbmNob3IuZ2V0QXR0cmlidXRlKCdkYXRhLW5hdicpO1xuXG4gIGlmIChkYXRhTmF2ID09ICdpZ25vcmUnKSByZXR1cm47XG4gIGlmIChldnQudHlwZSA9PSAnbW91c2Vkb3duJyAmJiBkYXRhTmF2ICE9ICdtb3VzZWRvd24nKSByZXR1cm47XG5cbiAgdmFyIGhyZWYgPSBhbmNob3IuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cbiAgaWYgKCFocmVmKSByZXR1cm47XG4gIGlmIChocmVmLmNoYXJBdCgwKSA9PSAnIycpIHtcbiAgICBpZiAocm91dGVyLm9wdGlvbnMudXJsU3luYyAhPSAnaGFzaCcpIHJldHVybjtcbiAgICBocmVmID0gaHJlZi5zbGljZSgxKTtcbiAgfVxuICBpZiAoYW5jaG9yLmdldEF0dHJpYnV0ZSgndGFyZ2V0JykgPT0gJ19ibGFuaycpIHJldHVybjtcbiAgaWYgKCFpc0xvY2FsTGluayhhbmNob3IpKSByZXR1cm47XG5cbiAgLy8gQXQgdGhpcyBwb2ludCwgd2UgaGF2ZSBhIHZhbGlkIGhyZWYgdG8gZm9sbG93LlxuICAvLyBEaWQgdGhlIG5hdmlnYXRpb24gYWxyZWFkeSBvY2N1ciBvbiBtb3VzZWRvd24gdGhvdWdoP1xuICBpZiAoZXZ0LnR5cGUgPT0gJ2NsaWNrJyAmJiBkYXRhTmF2ID09ICdtb3VzZWRvd24nKSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmV0dXJuIGhyZWY7XG59XG5cbmZ1bmN0aW9uIGlzTGVmdEJ1dHRvbihldnQpIHtcbiAgcmV0dXJuIGV2dC53aGljaCA9PSAxO1xufVxuXG5mdW5jdGlvbiBhbmNob3JUYXJnZXQodGFyZ2V0KSB7XG4gIHdoaWxlICh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0Lm5vZGVOYW1lID09ICdBJykgcmV0dXJuIHRhcmdldDtcbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0xvY2FsTGluayhhbmNob3IpIHtcbiAgdmFyIGhvc3RuYW1lID0gYW5jaG9yLmhvc3RuYW1lO1xuICB2YXIgcG9ydCA9IGFuY2hvci5wb3J0O1xuXG4gIC8vIElFMTAgY2FuIGxvc2UgdGhlIGhvc3RuYW1lL3BvcnQgcHJvcGVydHkgd2hlbiBzZXR0aW5nIGEgcmVsYXRpdmUgaHJlZiBmcm9tIEpTXG4gIGlmICghaG9zdG5hbWUpIHtcbiAgICB2YXIgdGVtcEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHRlbXBBbmNob3IuaHJlZiA9IGFuY2hvci5ocmVmO1xuICAgIGhvc3RuYW1lID0gdGVtcEFuY2hvci5ob3N0bmFtZTtcbiAgICBwb3J0ID0gdGVtcEFuY2hvci5wb3J0O1xuICB9XG5cbiAgdmFyIHNhbWVIb3N0bmFtZSA9IGhvc3RuYW1lID09IGxvY2F0aW9uLmhvc3RuYW1lO1xuICB2YXIgc2FtZVBvcnQgPSAocG9ydCB8fCAnODAnKSA9PSAobG9jYXRpb24ucG9ydCB8fCAnODAnKTtcblxuICByZXR1cm4gc2FtZUhvc3RuYW1lICYmIHNhbWVQb3J0O1xufVxuXG5mdW5jdGlvbiBpbnRlcmNlcHRBbmNob3JzKGZvclJvdXRlcikge1xuICByb3V0ZXIgPSBmb3JSb3V0ZXI7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTW91c2VDbGljayk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2FieXNzYS9saWIvYW5jaG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiaWNvblwiOlwiaWNvbi1pY29uLTNyMExxXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ljb24vaWNvbi5zdHlsXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYXBwL2FwcC5zdHlsXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJpbmNyZW1lbnRcIjpcImJsdWUtaW5jcmVtZW50LTNpVWFnXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYmx1ZS9ibHVlLnN0eWxcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImlucHV0XCI6XCJncmVlbi1pbnB1dC01ZWcxQ1wiLFwicG9wdXBCdXR0b25cIjpcImdyZWVuLXBvcHVwQnV0dG9uLUFqcTZQXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYmx1ZS9ncmVlbi9ncmVlbi5zdHlsXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJsaXN0XCI6XCJsaXN0LWxpc3QtMy1fdXBcIn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmlldy9ibHVlL2dyZWVuL2xpc3Quc3R5bFxuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wicmVkXCI6XCJyZWQtcmVkLTJCZ2RBXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYmx1ZS9yZWQvcmVkLnN0eWxcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImZhZGVTY2FsZUluXCI6XCJmYWRlU2NhbGUtZmFkZVNjYWxlSW4tQW9oQjdcIixcImZhZGVTY2FsZU91dFwiOlwiZmFkZVNjYWxlLWZhZGVTY2FsZU91dC0xQ1U4bFwifTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93aWRnZXQvYW5pbWF0aW9uL2dyb3VwL2ZhZGVTY2FsZS9mYWRlU2NhbGUuc3R5bFxuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiZmFkZWluXCI6XCJmYWRlLWZhZGVpbi0zYy1WMFwiLFwiZmFkZW91dFwiOlwiZmFkZS1mYWRlb3V0LTNFOHBpXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dpZGdldC9hbmltYXRpb24vc2luZ2xlL2ZhZGUvZmFkZS5zdHlsXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJzbGlkZURvd25cIjpcInNsaWRlRG93bi1zbGlkZURvd24tM0JpUDVcIn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2lkZ2V0L2FuaW1hdGlvbi9zaW5nbGUvc2xpZGVEb3duL3NsaWRlRG93bi5zdHlsXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJpY29uXCI6XCJidXR0b24taWNvbi0yVVA0SVwifTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93aWRnZXQvYnV0dG9uL2J1dHRvbi5zdHlsXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJsaW5rXCI6XCJsaW5rLWxpbmstMzBHM1dcIixcImFjdGl2ZVwiOlwibGluay1hY3RpdmUtTFVjYy1cIn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2lkZ2V0L2xpbmsvbGluay5zdHlsXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJsb2FkZXJcIjpcImxvYWRlci1sb2FkZXItMVJ4eGhcIixcInNwaW5cIjpcImxvYWRlci1zcGluLTJKQTVSXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dpZGdldC9sb2FkZXIvbG9hZGVyLnN0eWxcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIm92ZXJsYXlcIjpcInBvcHVwLW92ZXJsYXktMl9hQXBcIixcInBvcHVwXCI6XCJwb3B1cC1wb3B1cC0ycklTOFwiLFwiaW5zZXJ0QW5pbWF0aW9uXCI6XCJwb3B1cC1pbnNlcnRBbmltYXRpb24tcDI3NzZcIixcInJlbW92ZUFuaW1hdGlvblwiOlwicG9wdXAtcmVtb3ZlQW5pbWF0aW9uLTM0Zm1BXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dpZGdldC9wb3B1cC9wb3B1cC5zdHlsXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJkcm9wZG93blwiOlwic2VsZWN0LWRyb3Bkb3duLTJQQnQyXCIsXCJsaVwiOlwic2VsZWN0LWxpLWdXalBHXCIsXCJzY3JvbGxlclwiOlwic2VsZWN0LXNjcm9sbGVyLUJJSGtqXCIsXCJsb2FkZXJDb250YWluZXJcIjpcInNlbGVjdC1sb2FkZXJDb250YWluZXItMk9VRmZcIixcImluc2VydEFuaW1hdGlvblwiOlwic2VsZWN0LWluc2VydEFuaW1hdGlvbi0zNXpoLVwiLFwicmVtb3ZlQW5pbWF0aW9uXCI6XCJzZWxlY3QtcmVtb3ZlQW5pbWF0aW9uLTFIUjZaXCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dpZGdldC9zZWxlY3Qvc2VsZWN0LnN0eWxcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IENvbXBvbmVudDtcblxudmFyIF9oID0gcmVxdWlyZSgnc25hYmJkb20vaCcpO1xuXG52YXIgX2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaCk7XG5cbnZhciBfcmVuZGVyID0gcmVxdWlyZSgnLi9yZW5kZXInKTtcblxudmFyIF91dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbnZhciBfbWVzc2FnZXMgPSByZXF1aXJlKCcuL21lc3NhZ2VzJyk7XG5cbnZhciBfbWVzc2FnZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzc2FnZXMpO1xuXG52YXIgX29ic2VydmFibGUgPSByZXF1aXJlKCcuLi9vYnNlcnZhYmxlJyk7XG5cbnZhciBfc3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZScpO1xuXG52YXIgX3N0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0b3JlKTtcblxudmFyIF9sb2cgPSByZXF1aXJlKCcuL2xvZycpO1xuXG52YXIgX2xvZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sb2cpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZW1wdHkgPSB7fTtcblxuZnVuY3Rpb24gQ29tcG9uZW50KG9wdGlvbnMpIHtcbiAgdmFyIG5hbWUgPSBvcHRpb25zLm5hbWUsXG4gICAgICBfb3B0aW9ucyRwcm9wcyA9IG9wdGlvbnMucHJvcHMsXG4gICAgICBwcm9wcyA9IF9vcHRpb25zJHByb3BzID09PSB1bmRlZmluZWQgPyBlbXB0eSA6IF9vcHRpb25zJHByb3BzLFxuICAgICAgX29wdGlvbnMkc2VsID0gb3B0aW9ucy5zZWwsXG4gICAgICBzZWwgPSBfb3B0aW9ucyRzZWwgPT09IHVuZGVmaW5lZCA/ICdjb21wb25lbnQnIDogX29wdGlvbnMkc2VsLFxuICAgICAgaW5pdFN0YXRlID0gb3B0aW9ucy5pbml0U3RhdGUsXG4gICAgICBjb25uZWN0ID0gb3B0aW9ucy5jb25uZWN0LFxuICAgICAgcmVuZGVyID0gb3B0aW9ucy5yZW5kZXI7XG5cblxuICB2YXIga2V5ID0gcHJvcHMua2V5ID09PSB1bmRlZmluZWQgPyBuYW1lIDogbmFtZSArICdfJyArIHByb3BzLmtleTtcblxuICB2YXIgZGF0YSA9IHtcbiAgICBrZXk6IGtleSxcbiAgICBob29rOiB7IGluc2VydDogaW5zZXJ0LCBwb3N0cGF0Y2g6IHBvc3RwYXRjaCwgZGVzdHJveTogZGVzdHJveSB9LFxuICAgIGNvbXBvbmVudDogeyBwcm9wczogcHJvcHMsIGluaXRTdGF0ZTogaW5pdFN0YXRlLCBjb25uZWN0OiBjb25uZWN0LCByZW5kZXI6IHJlbmRlciwga2V5OiBuYW1lIH0sXG4gICAgYXR0cnM6IHsgbmFtZTogbmFtZSB9XG4gIH07XG5cbiAgLy8gQW4gZW1wdHkgcGxhY2Vob2xkZXIgaXMgcmV0dXJuZWQsIGFuZCB0aGF0J3MgYWxsIG91ciBwYXJlbnQgaXMgZ29pbmcgdG8gc2VlLlxuICAvLyBFYWNoIGNvbXBvbmVudCBoYW5kbGVzIGl0cyBvd24gaW50ZXJuYWwgcmVuZGVyaW5nLlxuICB2YXIgY29tcFZub2RlID0gKDAsIF9oMi5kZWZhdWx0KShzZWwsIGRhdGEpO1xuICBkYXRhLmNvbXBvbmVudC5jb21wVm5vZGUgPSBjb21wVm5vZGU7XG4gIHJldHVybiBjb21wVm5vZGU7XG59XG5cbmZ1bmN0aW9uIGluc2VydCh2bm9kZSkge1xuICB2YXIgY29tcG9uZW50ID0gdm5vZGUuZGF0YS5jb21wb25lbnQ7XG4gIHZhciBwcm9wcyA9IGNvbXBvbmVudC5wcm9wcyxcbiAgICAgIGluaXRTdGF0ZSA9IGNvbXBvbmVudC5pbml0U3RhdGUsXG4gICAgICBjb25uZWN0ID0gY29tcG9uZW50LmNvbm5lY3Q7XG5cblxuICB2YXIgY29ubmVjdGVkID0gZmFsc2U7XG5cbiAgLy8gTG9va3VwIGZyb20gSFRNTCBFbGVtZW50IHRvIGNvbXBvbmVudCwgdXNlZCBpbiBET00tYmFzZWQgbWVzc2FnaW5nXG4gIHZub2RlLmVsbS5fX2NvbXBfXyA9IGNvbXBvbmVudDtcblxuICAvLyBTdG9yZSB0aGUgY29tcG9uZW50IGRlcHRoIG9uY2UgaXQncyBhdHRhY2hlZCB0byB0aGUgRE9NIHNvIHdlIGNhbiByZW5kZXJcbiAgLy8gY29tcG9uZW50IGhpZXJhcmNoaWVzIGluIGEgcHJlZGljdGl2ZSAodG9wIC0+IGRvd24pIG1hbm5lci5cbiAgY29tcG9uZW50LmRlcHRoID0gZ2V0RGVwdGgodm5vZGUuZWxtKTtcblxuICAvLyBJbnRlcm5hbCBjYWxsYmFja3NcbiAgY29tcG9uZW50LmxpZmVjeWNsZSA9IHtcbiAgICByZW5kZXJlZDogcmVuZGVyZWRcbiAgfTtcblxuICB2YXIgbWVzc2FnZXMgPSBuZXcgX21lc3NhZ2VzMi5kZWZhdWx0KHZub2RlLmVsbSk7XG5cbiAgY29tcG9uZW50LmVsbSA9IHZub2RlLmVsbTtcbiAgY29tcG9uZW50Lm1lc3NhZ2VzID0gbWVzc2FnZXM7XG5cbiAgdmFyIHByb3BzT2JzZXJ2YWJsZSA9ICgwLCBfb2JzZXJ2YWJsZS5PYnNlcnZhYmxlKShmdW5jdGlvbiAoYWRkKSB7XG4gICAgYWRkKGNvbXBvbmVudC5wcm9wcyk7XG4gICAgY29tcG9uZW50LmxpZmVjeWNsZS5wcm9wc0NoYW5nZWQgPSBhZGQ7XG4gIH0pLm5hbWVkKCdwcm9wcycpO1xuXG4gIC8vIEVhZ2VybHkgc3Vic2NyaWJlIHNvIHRoYXQgdGhlIG9ic2VydmFibGUgZ2V0IGl0cyBmaXJzdCB2YWx1ZSBhbmQgd2UgaG9ub3VyXG4gIC8vIHRoZSBPYnNlcnZhYmxlV2l0aEluaXRpYWxWYWx1ZSBpbnRlcmZhY2UgY29udHJhY3QuXG4gIHByb3BzT2JzZXJ2YWJsZS5zdWJzY3JpYmUoZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4geDtcbiAgfSk7XG5cbiAgY29tcG9uZW50LnN0b3JlID0gKDAsIF9zdG9yZTIuZGVmYXVsdCkoaW5pdFN0YXRlKHByb3BzKSwgZnVuY3Rpb24gKG9uLCBtc2cpIHtcbiAgICBtZXNzYWdlcy5zdG9yZU1zZyA9IG1zZztcblxuICAgIHZhciBjb25uZWN0UGFyYW1zID0ge1xuICAgICAgb246IG9uLFxuICAgICAgcHJvcHM6IHByb3BzT2JzZXJ2YWJsZSxcbiAgICAgIG1zZzogbWVzc2FnZXNcbiAgICB9O1xuXG4gICAgY29ubmVjdChjb25uZWN0UGFyYW1zKTtcbiAgICBjb25uZWN0ZWQgPSB0cnVlO1xuXG4gICAgLy8gRmlyc3QgcmVuZGVyLlxuICAgIC8vIFJlbmRlciByaWdodCBhZnRlciBvdXIgcGFyZW50ICh3aGljaCBpcyBpbiB0aGUgbWlkZGxlIG9mIGEgcGF0Y2gpXG4gICAgLy8gc28gdGhhdCB3ZSBob25vdXIgdGhlIHNuYWJiZG9tJ3MgaW5zZXJ0IGhvb2ssXG4gICAgLy8gZS5nIHdlIGdldCBwYXRjaGVkIGludG8gb3VyIHBhcmVudCBhZnRlciBvdXIgcGFyZW50IHdhcyBhZGRlZCB0byB0aGUgZG9jdW1lbnQuXG4gICAgKDAsIF9yZW5kZXIucmVuZGVyTmV3Q29tcG9uZW50Tm93KShjb21wb25lbnQpO1xuICB9LCB7XG4gICAgbmFtZTogY29tcG9uZW50LmtleSxcbiAgICBsb2c6ICgwLCBfbG9nLnNob3VsZExvZykoX2xvZzIuZGVmYXVsdC5tZXNzYWdlLCBjb21wb25lbnQua2V5KVxuICB9KTtcblxuICBjb21wb25lbnQuc3RvcmUuc3RhdGUuc2xpZGluZzIoKS5zdWJzY3JpYmUoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgbmV3U3RhdGUgPSBfcmVmWzBdLFxuICAgICAgICBvbGRTdGF0ZSA9IF9yZWZbMV07XG5cblxuICAgIHZhciBzaG91bGRSZW5kZXIgPVxuICAgIC8vIFNraXAgdGhlIGZpcnN0IG5vdGlmaWNhdGlvbiAoaG90IG9ic2VydmFibGUpXG4gICAgb2xkU3RhdGUgJiZcbiAgICAvLyBzeW5jaHJvbm91cyBvYnNlcnZhYmxlcyB0cmlnZ2VyaW5nIGJlZm9yZSB0aGUgZmlyc3QgcmVuZGVyIHNob3VsZCBqdXN0IGJlIGFjY3VtdWxhdGVkXG4gICAgY29ubmVjdGVkICYmXG4gICAgLy8gdGhlIHByb3BzIG9ic2VydmFibGUgdHJpZ2dlcmVkLCBhIHN5bmNocm9ub3VzIHJlbmRlciBpcyBtYWRlIHJpZ2h0IGFmdGVyIHNvIHNraXBcbiAgICAhY29tcG9uZW50LmxpZmVjeWNsZS5wcm9wc0NoYW5naW5nICYmXG4gICAgLy8gbnVsbCB1cGRhdGVcbiAgICAhKDAsIF91dGlsLnNoYWxsb3dFcXVhbCkob2xkU3RhdGUsIG5ld1N0YXRlKTtcblxuICAgIGlmIChzaG91bGRSZW5kZXIpICgwLCBfcmVuZGVyLnJlbmRlckNvbXBvbmVudE5leHRGcmFtZSkoY29tcG9uZW50KTtcbiAgfSk7XG59XG5cbi8vIENhbGxlZCBvbiBldmVyeSBwYXJlbnQgcmUtcmVuZGVyLCB0aGlzIGlzIHdoZXJlIHRoZSBwcm9wcyBwYXNzZWQgYnkgdGhlIGNvbXBvbmVudCdzIHBhcmVudCBtYXkgaGF2ZSBjaGFuZ2VkLlxuZnVuY3Rpb24gcG9zdHBhdGNoKG9sZFZub2RlLCB2bm9kZSkge1xuICB2YXIgb2xkRGF0YSA9IG9sZFZub2RlLmRhdGE7XG4gIHZhciBuZXdEYXRhID0gdm5vZGUuZGF0YTtcblxuICAvLyBTZXJ2ZXIgc2lkZSByZW5kZXJpbmc6IFJlY29uY2lsYXRpbmcgd2l0aCBhIHNlcnZlci1yZW5kZXJlZCBub2RlIHdpbGwgaGF2ZSBza2lwcGVkIGNhbGxpbmcgaW5zZXJ0KClcbiAgaWYgKCFvbGREYXRhLmNvbXBvbmVudCkge1xuICAgIGluc2VydCh2bm9kZSk7XG4gIH1cblxuICAvLyBvbGREYXRhIHdvdWxkbid0IGhhdmUgYSBjb21wb25lbnQgcmVmZXJlbmNlIHNldCBpZiBpdCBjYW1lIGZyb20gdGhlIHNlcnZlciAoaXQncyBmaXJzdCBzZXQgaW4gaW5zZXJ0KCkpXG4gIHZhciBjb21wb25lbnQgPSBvbGREYXRhLmNvbXBvbmVudCB8fCBuZXdEYXRhLmNvbXBvbmVudDtcbiAgdmFyIG9sZFByb3BzID0gY29tcG9uZW50LnByb3BzO1xuICB2YXIgbmV3UHJvcHMgPSBuZXdEYXRhLmNvbXBvbmVudC5wcm9wcztcblxuICAvLyBVcGRhdGUgdGhlIG9yaWdpbmFsIGNvbXBvbmVudCB3aXRoIGFueSBwcm9wZXJ0eSB0aGF0IG1heSBoYXZlIGNoYW5nZWQgZHVyaW5nIHRoaXMgcmVuZGVyIHBhc3NcbiAgY29tcG9uZW50LnByb3BzID0gbmV3UHJvcHM7XG5cbiAgbmV3RGF0YS5jb21wb25lbnQgPSBjb21wb25lbnQ7XG5cbiAgLy8gSWYgdGhlIHByb3BzIGNoYW5nZWQsIHJlbmRlciBpbW1lZGlhdGVseSBhcyB3ZSBhcmUgYWxyZWFkeVxuICAvLyBpbiB0aGUgcmVuZGVyIGNvbnRleHQgb2Ygb3VyIHBhcmVudFxuICBpZiAoISgwLCBfdXRpbC5zaGFsbG93RXF1YWwpKG9sZFByb3BzLCBuZXdQcm9wcykpIHtcblxuICAgIGNvbXBvbmVudC5saWZlY3ljbGUucHJvcHNDaGFuZ2luZyA9IHRydWU7XG4gICAgY29tcG9uZW50LmxpZmVjeWNsZS5wcm9wc0NoYW5nZWQobmV3UHJvcHMpO1xuICAgIGNvbXBvbmVudC5saWZlY3ljbGUucHJvcHNDaGFuZ2luZyA9IGZhbHNlO1xuXG4gICAgKDAsIF9yZW5kZXIucmVuZGVyQ29tcG9uZW50Tm93KShjb21wb25lbnQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlcmVkKGNvbXBvbmVudCwgbmV3Vm5vZGUpIHtcbiAgLy8gU3RvcmUgdGhlIG5ldyB2bm9kZSBpbnNpZGUgdGhlIGNvbXBvbmVudCBzbyB3ZSBjYW4gZGlmZiBpdCBuZXh0IHJlbmRlclxuICBjb21wb25lbnQudm5vZGUgPSBuZXdWbm9kZTtcblxuICAvLyBGb3Igbm93LCBvbmx5IGxpZnQgdGhlIGhvb2sgb2Ygbm9uIEFycmF5IHJlbmRlciBvdXRwdXRzXG4gIGlmIChuZXdWbm9kZSAmJiAhQXJyYXkuaXNBcnJheShuZXdWbm9kZSkpIHtcbiAgICAvLyBMaWZ0IGFueSAncmVtb3ZlJyBob29rIHRvIG91ciBwbGFjZWhvbGRlciB2bm9kZSBmb3IgaXQgdG8gYmUgY2FsbGVkXG4gICAgLy8gYXMgdGhlIHBsYWNlaG9sZGVyIGlzIGFsbCBvdXIgcGFyZW50IHZub2RlIGtub3dzIGFib3V0LlxuICAgIC8vIFRPRE86IENhbGwgYWxsIHRoZSBob29rcyBvZiBhbiBBcnJheSBWTm9kZT9cbiAgICB2YXIgaG9vayA9IG5ld1Zub2RlLmRhdGEuaG9vayAmJiBuZXdWbm9kZS5kYXRhLmhvb2sucmVtb3ZlO1xuICAgIGlmIChob29rKSBjb21wb25lbnQuY29tcFZub2RlLmRhdGEuaG9vay5yZW1vdmUgPSBob29rO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kodm5vZGUpIHtcbiAgdmFyIGNvbXAgPSB2bm9kZS5kYXRhLmNvbXBvbmVudDtcbiAgY29tcC52bm9kZS5lbG0uX19jb21wX18gPSBudWxsO1xuXG4gIEFycmF5LmlzQXJyYXkoY29tcC52bm9kZSkgPyBjb21wLnZub2RlLmZvckVhY2goZGVzdHJveVZub2RlKSA6IGRlc3Ryb3lWbm9kZShjb21wLnZub2RlKTtcblxuICBjb21wLnN0b3JlLmRlc3Ryb3koKTtcblxuICBjb21wLmRlc3Ryb3llZCA9IHRydWU7XG59XG5cbi8vIERlc3Ryb3kgb3VyIHZub2RlIHJlY3Vyc2l2ZWx5XG4vLyBOb3RlOiBDYW4ndCBpbnZva2UgbW9kdWxlcycgZGVzdHJveSBob29rIGFzIHRoZXkncmUgaGlkZGVuIGluIHNuYWJiZG9tJ3MgY2xvc3VyZS5cbi8vIFRoZSBkZWZhdWx0IG1vZHVsZXMgZG9uJ3QgZG8gYW55dGhpbmcgaW4gZGVzdHJveSgpIGFueXdheS5cbmZ1bmN0aW9uIGRlc3Ryb3lWbm9kZSh2bm9kZSkge1xuICBpZiAoIXZub2RlKSByZXR1cm47XG5cbiAgdmFyIGRhdGEgPSB2bm9kZS5kYXRhO1xuXG4gIGlmICghZGF0YSkgcmV0dXJuO1xuXG4gIGlmIChkYXRhLmhvb2sgJiYgZGF0YS5ob29rLmRlc3Ryb3kpIGRhdGEuaG9vay5kZXN0cm95KHZub2RlKTtcbiAgaWYgKHZub2RlLmNoaWxkcmVuKSB2bm9kZS5jaGlsZHJlbi5mb3JFYWNoKGRlc3Ryb3lWbm9kZSk7XG59XG5cbmZ1bmN0aW9uIGdldERlcHRoKGVsbSkge1xuICB2YXIgZGVwdGggPSAwO1xuICB2YXIgcGFyZW50ID0gZWxtLnBhcmVudEVsZW1lbnQ7XG4gIHdoaWxlIChwYXJlbnQpIHtcbiAgICBkZXB0aCsrO1xuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBkZXB0aDtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34va2FpanUvbGliL2NvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5ldmVudHNNb2R1bGUgPSB1bmRlZmluZWQ7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF91dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbnZhciBfbWVzc2FnZXMgPSByZXF1aXJlKCcuL21lc3NhZ2VzJyk7XG5cbi8qIHNuYWJiZG9tIG1vZHVsZSBleHRlbnNpb24gdXNlZCB0byByZWdpc3RlciBNZXNzYWdlcyBhcyBldmVudCBsaXN0ZW5lcnMgKi9cblxuZnVuY3Rpb24gdXBkYXRlRXZlbnRMaXN0ZW5lcnMob2xkVm5vZGUsIHZub2RlKSB7XG4gIHZhciBvbGRFdmVudHMgPSBvbGRWbm9kZS5kYXRhLmV2ZW50cztcbiAgdmFyIGV2ZW50cyA9IHZub2RlLmRhdGEuZXZlbnRzO1xuXG4gIGlmICghZXZlbnRzKSByZXR1cm47XG5cbiAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoKSB7XG4gICAgdmFyIGN1cnJlbnQgPSBldmVudHNbbmFtZV07XG4gICAgdmFyIG9sZCA9IG9sZEV2ZW50cyAmJiBvbGRFdmVudHNbbmFtZV07XG5cbiAgICBpZiAob2xkICE9PSBjdXJyZW50KSB7XG5cbiAgICAgIGlmIChvbGQgJiYgY3VycmVudCAmJiBpc1NhbWVNZXNzYWdlQW5kUGF5bG9hZChjdXJyZW50LCBjdXJyZW50LnBheWxvYWQsIG9sZCwgb2xkLnBheWxvYWQpKSByZXR1cm4ge1xuICAgICAgICAgIHY6IHZvaWQgMFxuICAgICAgICB9O1xuXG4gICAgICB2bm9kZS5lbG1bJ29uJyArIG5hbWVdID0gY3VycmVudCA/IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgcmV0dXJuICgwLCBfbWVzc2FnZXMuX3NlbmRUb0VsZW1lbnQpKGV2dC5jdXJyZW50VGFyZ2V0LCBjdXJyZW50KGV2dCkpO1xuICAgICAgfSA6IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIGZvciAobmFtZSBpbiBldmVudHMpIHtcbiAgICB2YXIgX3JldCA9IF9sb29wKCk7XG5cbiAgICBpZiAoKHR5cGVvZiBfcmV0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihfcmV0KSkgPT09IFwib2JqZWN0XCIpIHJldHVybiBfcmV0LnY7XG4gIH1cblxuICBpZiAoIW9sZEV2ZW50cykgcmV0dXJuO1xuXG4gIGZvciAobmFtZSBpbiBvbGRFdmVudHMpIHtcbiAgICBpZiAoZXZlbnRzW25hbWVdID09IG51bGwpIHZub2RlLmVsbVsnb24nICsgbmFtZV0gPSBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzU2FtZU1lc3NhZ2VBbmRQYXlsb2FkKG1lc3NhZ2UsIHBheWxvYWQsIG9sZE1lc3NhZ2UsIG9sZFBheWxvYWQpIHtcbiAgcmV0dXJuIG1lc3NhZ2UuX2lkID09PSBvbGRNZXNzYWdlLl9pZCAmJiBwYXlsb2FkID09PSBvbGRQYXlsb2FkO1xufVxuXG52YXIgZXZlbnRzTW9kdWxlID0gZXhwb3J0cy5ldmVudHNNb2R1bGUgPSB7XG4gIGNyZWF0ZTogdXBkYXRlRXZlbnRMaXN0ZW5lcnMsXG4gIHVwZGF0ZTogdXBkYXRlRXZlbnRMaXN0ZW5lcnNcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2thaWp1L2xpYi9ldmVudHMuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlYm91bmNlO1xuZXhwb3J0cy5kZWJvdW5jZUZ1bmN0aW9uID0gZGVib3VuY2VGdW5jdGlvbjtcblxudmFyIF8gPSByZXF1aXJlKCcuLycpO1xuXG5mdW5jdGlvbiBkZWJvdW5jZSh3YWl0LCBzb3VyY2UpIHtcbiAgcmV0dXJuICgwLCBfLk9ic2VydmFibGUpKGZ1bmN0aW9uIChhZGQpIHtcbiAgICB2YXIgZGVib3VuY2VkQWRkID0gZGVib3VuY2VGdW5jdGlvbih3YWl0LCBhZGQpO1xuICAgIHZhciB1bnN1YnNjcmliZSA9IHNvdXJjZS5zdWJzY3JpYmUoZGVib3VuY2VkQWRkKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgZGVib3VuY2VkQWRkLmNhbmNlbCgpO1xuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWJvdW5jZUZ1bmN0aW9uKHdhaXQsIGZ1bmMpIHtcbiAgdmFyIHRpbWVvdXQgPSB2b2lkIDA7XG5cbiAgdmFyIGRlYm91bmNlZCA9IGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uIGxhdGVyKCkge1xuICAgICAgdGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfTtcblxuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gIH07XG5cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICB9O1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9rYWlqdS9vYnNlcnZhYmxlL2RlYm91bmNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWxheTtcblxudmFyIF8gPSByZXF1aXJlKCcuLycpO1xuXG5mdW5jdGlvbiBkZWxheShkZWxheVZhbHVlLCBzb3VyY2UpIHtcbiAgcmV0dXJuICgwLCBfLk9ic2VydmFibGUpKGZ1bmN0aW9uIChhZGQpIHtcbiAgICB2YXIgY3VycmVudFRpbWVvdXRzID0gW107XG5cbiAgICB2YXIgdW5zdWJTb3VyY2UgPSBzb3VyY2Uuc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWwsIG5hbWUpIHtcblxuICAgICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gY3VycmVudFRpbWVvdXRzLmluZGV4T2YodGltZW91dCk7XG4gICAgICAgIGN1cnJlbnRUaW1lb3V0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBhZGQodmFsLCBuYW1lKTtcbiAgICAgIH0sIGRlbGF5VmFsdWUpO1xuXG4gICAgICBjdXJyZW50VGltZW91dHMucHVzaCh0aW1lb3V0KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjdXJyZW50VGltZW91dHMuZm9yRWFjaChmdW5jdGlvbiAodGltZW91dCkge1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgfSk7XG4gICAgICB1bnN1YlNvdXJjZSgpO1xuICAgIH07XG4gIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9rYWlqdS9vYnNlcnZhYmxlL2RlbGF5LmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmRlZmF1bHQgPSBkcm9wO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vJyk7XG5cbmZ1bmN0aW9uIGRyb3AoY291bnQsIHNvdXJjZSkge1xuICByZXR1cm4gKDAsIF8uT2JzZXJ2YWJsZSkoZnVuY3Rpb24gKGFkZCkge1xuICAgIHZhciBkcm9wcGVkID0gMDtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShmdW5jdGlvbiAodmFsLCBuYW1lKSB7XG4gICAgICBpZiAoZHJvcHBlZCsrID49IGNvdW50KSBhZGQodmFsLCBuYW1lKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2thaWp1L29ic2VydmFibGUvZHJvcC5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gZmlsdGVyO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vJyk7XG5cbmZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUsIHNvdXJjZSkge1xuICByZXR1cm4gKDAsIF8uT2JzZXJ2YWJsZSkoZnVuY3Rpb24gKGFkZCkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWwsIG5hbWUpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUodmFsKSkgYWRkKHZhbCwgbmFtZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9rYWlqdS9vYnNlcnZhYmxlL2ZpbHRlci5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gZmxhdE1hcExhdGVzdDtcblxudmFyIF8gPSByZXF1aXJlKCcuLycpO1xuXG5mdW5jdGlvbiBmbGF0TWFwTGF0ZXN0KG1hcHBlciwgc291cmNlKSB7XG4gIHJldHVybiAoMCwgXy5PYnNlcnZhYmxlKShmdW5jdGlvbiAoYWRkKSB7XG4gICAgdmFyIGN1cnJlbnRVbnN1YiA9IHZvaWQgMDtcblxuICAgIHZhciB1bnN1YlNvdXJjZSA9IHNvdXJjZS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgY3VycmVudFVuc3ViICYmIGN1cnJlbnRVbnN1YigpO1xuICAgICAgdmFyIG1hcHBlZE9icyA9IG1hcHBlcih2YWwpO1xuICAgICAgY3VycmVudFVuc3ViID0gbWFwcGVkT2JzLnN1YnNjcmliZShhZGQpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGN1cnJlbnRVbnN1YiAmJiBjdXJyZW50VW5zdWIoKTtcbiAgICAgIHVuc3ViU291cmNlKCk7XG4gICAgfTtcbiAgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2thaWp1L29ic2VydmFibGUvZmxhdE1hcExhdGVzdC5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gZnJvbUV2ZW50O1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vJyk7XG5cbnZhciBfdXRpbCA9IHJlcXVpcmUoJy4uL2xpYi91dGlsJyk7XG5cbmZ1bmN0aW9uIGZyb21FdmVudChuYW1lLCBlbCwgY2hpbGRTZWxlY3Rvcikge1xuICByZXR1cm4gKDAsIF8uT2JzZXJ2YWJsZSkoZnVuY3Rpb24gKGFkZCkge1xuXG4gICAgdmFyIG9ic05hbWUgPSBjaGlsZFNlbGVjdG9yID8gJ2Zyb21FdmVudFt0eXBlPScgKyBuYW1lICsgJywgc2VsZWN0b3I9JyArIGNoaWxkU2VsZWN0b3IgKyAnXScgOiAnZnJvbUV2ZW50W3R5cGU9JyArIG5hbWUgKyAnXSc7XG5cbiAgICB2YXIgaGFuZGxlciA9IGNoaWxkU2VsZWN0b3IgPyBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBpZiAodGFyZ2V0TWF0Y2hlcyhldnQudGFyZ2V0LCBjaGlsZFNlbGVjdG9yLCBlbCkpIGFkZChldnQsIG9ic05hbWUpO1xuICAgIH0gOiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICByZXR1cm4gYWRkKGV2dCwgb2JzTmFtZSk7XG4gICAgfTtcblxuICAgIHZhciB1c2VDYXB0dXJlID0gY2hpbGRTZWxlY3RvciAmJiBuYW1lIGluIG5vbkJ1YmJsaW5nRXZlbnRzO1xuXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyLCB1c2VDYXB0dXJlKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7XG4gICAgfTtcbiAgfSk7XG59XG5cbnZhciBub25CdWJibGluZ0V2ZW50cyA9ICgwLCBfdXRpbC5TZXQpKCdibHVyJywgJ2NhbnBsYXknLCAnY2FucGxheXRocm91Z2gnLCAnY2hhbmdlJywgJ2R1cmF0aW9uY2hhbmdlJywgJ2VtcHRpZWQnLCAnZW5kZWQnLCAnZm9jdXMnLCAnbG9hZCcsICdsb2FkZWRkYXRhJywgJ2xvYWRlZG1ldGFkYXRhJywgJ21vdXNlZW50ZXInLCAnbW91c2VsZWF2ZScsICdwYXVzZScsICdwbGF5JywgJ3BsYXlpbmcnLCAncmF0ZWNoYW5nZScsICdyZXNldCcsICdzY3JvbGwnLCAnc2Vla2VkJywgJ3NlZWtpbmcnLCAnc3RhbGxlZCcsICdzdWJtaXQnLCAnc3VzcGVuZCcsICd0aW1ldXBkYXRlJywgJ3VubG9hZCcsICd2b2x1bWVjaGFuZ2UnLCAnd2FpdGluZycpO1xuXG52YXIgcHJvdG8gPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiBFbGVtZW50ID8gRWxlbWVudC5wcm90b3R5cGUgOiB7fTtcbnZhciBuYXRpdmVNYXRjaGVzID0gcHJvdG8ubWF0Y2hlcyB8fCBwcm90by5tYXRjaGVzU2VsZWN0b3IgfHwgcHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IHByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fCBwcm90by5tc01hdGNoZXNTZWxlY3RvciB8fCBwcm90by5vTWF0Y2hlc1NlbGVjdG9yO1xuXG5mdW5jdGlvbiBtYXRjaGVzKGVsLCBzZWxlY3Rvcikge1xuICByZXR1cm4gbmF0aXZlTWF0Y2hlcy5jYWxsKGVsLCBzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIHRhcmdldE1hdGNoZXModGFyZ2V0LCBzZWxlY3Rvciwgcm9vdCkge1xuICBmb3IgKHZhciBlbCA9IHRhcmdldDsgZWwgJiYgZWwgIT09IHJvb3Q7IGVsID0gZWwucGFyZW50RWxlbWVudCkge1xuICAgIGlmIChtYXRjaGVzKGVsLCBzZWxlY3RvcikpIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34va2FpanUvb2JzZXJ2YWJsZS9mcm9tRXZlbnQuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZyb21Qcm9taXNlO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vJyk7XG5cbmZ1bmN0aW9uIGZyb21Qcm9taXNlKHByb21pc2UpIHtcbiAgcmV0dXJuICgwLCBfLk9ic2VydmFibGUpKGZ1bmN0aW9uIChhZGQpIHtcbiAgICB2YXIgYWN0aXZlID0gdHJ1ZTtcblxuICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmIChhY3RpdmUpIGFkZCh7IHR5cGU6ICdzdWNjZXNzJywgdmFsdWU6IHZhbHVlIH0pO1xuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgaWYgKGFjdGl2ZSkgYWRkKHsgdHlwZTogJ2ZhaWx1cmUnLCBlcnJvcjogZXJyb3IgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgfSkubmFtZWQoJ2Zyb21Qcm9taXNlJyk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2thaWp1L29ic2VydmFibGUvZnJvbVByb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IGludGVydmFsO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vJyk7XG5cbmZ1bmN0aW9uIGludGVydmFsKHRpbWUpIHtcbiAgcmV0dXJuICgwLCBfLk9ic2VydmFibGUpKGZ1bmN0aW9uIChhZGQpIHtcbiAgICB2YXIgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGFkZCwgdGltZSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIH07XG4gIH0pLm5hbWVkKCdpbnRlcnZhbCcpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9rYWlqdS9vYnNlcnZhYmxlL2ludGVydmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmRlZmF1bHQgPSBtYXA7XG5cbnZhciBfID0gcmVxdWlyZSgnLi8nKTtcblxuZnVuY3Rpb24gbWFwKG1hcHBlciwgc291cmNlKSB7XG4gIHJldHVybiAoMCwgXy5PYnNlcnZhYmxlKShmdW5jdGlvbiAoYWRkKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbCwgbmFtZSkge1xuICAgICAgcmV0dXJuIGFkZChtYXBwZXIodmFsKSwgbmFtZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9rYWlqdS9vYnNlcnZhYmxlL21hcC5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gbWVyZ2U7XG5cbnZhciBfID0gcmVxdWlyZSgnLi8nKTtcblxuZnVuY3Rpb24gbWVyZ2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBzb3VyY2VzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgc291cmNlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiAoMCwgXy5PYnNlcnZhYmxlKShmdW5jdGlvbiAoYWRkKSB7XG4gICAgdmFyIHVuc3VicyA9IHNvdXJjZXMubWFwKGZ1bmN0aW9uIChvYnMpIHtcbiAgICAgIHJldHVybiBvYnMuc3Vic2NyaWJlKGFkZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB1bnN1YnMuZm9yRWFjaChmdW5jdGlvbiAodW5zdWIpIHtcbiAgICAgICAgcmV0dXJuIHVuc3ViKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34va2FpanUvb2JzZXJ2YWJsZS9tZXJnZS5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gcGFydGl0aW9uO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vJyk7XG5cbmZ1bmN0aW9uIHBhcnRpdGlvbihwcmVkaWNhdGUsIHNvdXJjZSkge1xuICByZXR1cm4gWygwLCBfLk9ic2VydmFibGUpKGZ1bmN0aW9uIChhZGQpIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUodmFsdWUpKSBhZGQodmFsdWUsIG5hbWUpO1xuICAgIH0pO1xuICB9KSwgKDAsIF8uT2JzZXJ2YWJsZSkoZnVuY3Rpb24gKGFkZCkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSkge1xuICAgICAgaWYgKCFwcmVkaWNhdGUodmFsdWUpKSBhZGQodmFsdWUsIG5hbWUpO1xuICAgIH0pO1xuICB9KV07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2thaWp1L29ic2VydmFibGUvcGFydGl0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmRlZmF1bHQgPSBwdXJlO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vJyk7XG5cbmZ1bmN0aW9uIHB1cmUodmFsdWUpIHtcbiAgcmV0dXJuICgwLCBfLk9ic2VydmFibGUpKGZ1bmN0aW9uIChhZGQpIHtcbiAgICByZXR1cm4gYWRkKHZhbHVlKTtcbiAgfSkubmFtZWQoJ3B1cmUnKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34va2FpanUvb2JzZXJ2YWJsZS9wdXJlLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnNsaWRpbmcyID0gc2xpZGluZzI7XG5leHBvcnRzLmRlZmF1bHQgPSBzbGlkaW5nO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vJyk7XG5cbmZ1bmN0aW9uIHNsaWRpbmcyKHNvdXJjZSkge1xuICByZXR1cm4gc2xpZGluZygyLCBzb3VyY2UpO1xufVxuXG5mdW5jdGlvbiBzbGlkaW5nKHNpemUsIHNvdXJjZSkge1xuICB2YXIgd2luZG93ID0gW107XG5cbiAgcmV0dXJuICgwLCBfLk9ic2VydmFibGUpKGZ1bmN0aW9uIChhZGQpIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShmdW5jdGlvbiAodmFsLCBuYW1lKSB7XG4gICAgICB3aW5kb3cgPSBbdmFsXS5jb25jYXQod2luZG93KTtcbiAgICAgIHdpbmRvdyA9IHdpbmRvdy5zbGljZSgwLCBzaXplKTtcbiAgICAgIGFkZCh3aW5kb3csIG5hbWUpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34va2FpanUvb2JzZXJ2YWJsZS9zbGlkaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmRlZmF1bHQgPSB0aHJvdHRsZTtcbmV4cG9ydHMudGhyb3R0bGVGdW5jdGlvbiA9IHRocm90dGxlRnVuY3Rpb247XG5cbnZhciBfID0gcmVxdWlyZSgnLi8nKTtcblxuZnVuY3Rpb24gdGhyb3R0bGUod2FpdCwgc291cmNlKSB7XG4gIHJldHVybiAoMCwgXy5PYnNlcnZhYmxlKShmdW5jdGlvbiAoYWRkKSB7XG4gICAgdmFyIHRocm90dGxlZEFkZCA9IHRocm90dGxlRnVuY3Rpb24od2FpdCwgYWRkKTtcbiAgICB2YXIgdW5zdWJzY3JpYmUgPSBzb3VyY2Uuc3Vic2NyaWJlKHRocm90dGxlZEFkZCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgIHRocm90dGxlZEFkZC5jYW5jZWwoKTtcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdGhyb3R0bGVGdW5jdGlvbih3YWl0LCBmdW5jKSB7XG4gIHZhciBsYXN0Q2FsbFRpbWUgPSB2b2lkIDA7XG4gIHZhciB0aW1lb3V0ID0gdm9pZCAwO1xuICB2YXIgYXJncyA9IHZvaWQgMDtcblxuICB2YXIgdGhyb3R0bGVkID0gZnVuY3Rpb24gdGhyb3R0bGVkKCkge1xuICAgIC8vIEFsd2F5cyB1c2UgdGhlIGxhdGVzdCBhcmd1bWVudHMsIGV2ZW4gaW4gYW4gYWxyZWFkeSBzY2hlZHVsZWQgY2FsbFxuICAgIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAvLyBBIHRocm90dGxlZCBjYWxsIGlzIGFscmVhZHkgc2NoZWR1bGVkLCBub29wXG4gICAgaWYgKHRpbWVvdXQgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgdmFyIGRlbHRhID0gbGFzdENhbGxUaW1lID8gd2FpdCAtIERhdGUubm93KCkgKyBsYXN0Q2FsbFRpbWUgOiAwO1xuXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgIGxhc3RDYWxsVGltZSA9IERhdGUubm93KCk7XG4gICAgICBmdW5jLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0sIGRlbHRhKTtcbiAgfTtcblxuICB0aHJvdHRsZWQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIH07XG4gIHJldHVybiB0aHJvdHRsZWQ7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2thaWp1L29ic2VydmFibGUvdGhyb3R0bGUuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIE5hbWVzcGFjZVVSSXMgPSB7XG4gICAgXCJ4bGlua1wiOiBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxufTtcbnZhciBib29sZWFuQXR0cnMgPSBbXCJhbGxvd2Z1bGxzY3JlZW5cIiwgXCJhc3luY1wiLCBcImF1dG9mb2N1c1wiLCBcImF1dG9wbGF5XCIsIFwiY2hlY2tlZFwiLCBcImNvbXBhY3RcIiwgXCJjb250cm9sc1wiLCBcImRlY2xhcmVcIixcbiAgICBcImRlZmF1bHRcIiwgXCJkZWZhdWx0Y2hlY2tlZFwiLCBcImRlZmF1bHRtdXRlZFwiLCBcImRlZmF1bHRzZWxlY3RlZFwiLCBcImRlZmVyXCIsIFwiZGlzYWJsZWRcIiwgXCJkcmFnZ2FibGVcIixcbiAgICBcImVuYWJsZWRcIiwgXCJmb3Jtbm92YWxpZGF0ZVwiLCBcImhpZGRlblwiLCBcImluZGV0ZXJtaW5hdGVcIiwgXCJpbmVydFwiLCBcImlzbWFwXCIsIFwiaXRlbXNjb3BlXCIsIFwibG9vcFwiLCBcIm11bHRpcGxlXCIsXG4gICAgXCJtdXRlZFwiLCBcIm5vaHJlZlwiLCBcIm5vcmVzaXplXCIsIFwibm9zaGFkZVwiLCBcIm5vdmFsaWRhdGVcIiwgXCJub3dyYXBcIiwgXCJvcGVuXCIsIFwicGF1c2VvbmV4aXRcIiwgXCJyZWFkb25seVwiLFxuICAgIFwicmVxdWlyZWRcIiwgXCJyZXZlcnNlZFwiLCBcInNjb3BlZFwiLCBcInNlYW1sZXNzXCIsIFwic2VsZWN0ZWRcIiwgXCJzb3J0YWJsZVwiLCBcInNwZWxsY2hlY2tcIiwgXCJ0cmFuc2xhdGVcIixcbiAgICBcInRydWVzcGVlZFwiLCBcInR5cGVtdXN0bWF0Y2hcIiwgXCJ2aXNpYmxlXCJdO1xudmFyIGJvb2xlYW5BdHRyc0RpY3QgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJvb2xlYW5BdHRycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGJvb2xlYW5BdHRyc0RpY3RbYm9vbGVhbkF0dHJzW2ldXSA9IHRydWU7XG59XG5mdW5jdGlvbiB1cGRhdGVBdHRycyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIga2V5LCBlbG0gPSB2bm9kZS5lbG0sIG9sZEF0dHJzID0gb2xkVm5vZGUuZGF0YS5hdHRycywgYXR0cnMgPSB2bm9kZS5kYXRhLmF0dHJzLCBuYW1lc3BhY2VTcGxpdDtcbiAgICBpZiAoIW9sZEF0dHJzICYmICFhdHRycylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRBdHRycyA9PT0gYXR0cnMpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRBdHRycyA9IG9sZEF0dHJzIHx8IHt9O1xuICAgIGF0dHJzID0gYXR0cnMgfHwge307XG4gICAgLy8gdXBkYXRlIG1vZGlmaWVkIGF0dHJpYnV0ZXMsIGFkZCBuZXcgYXR0cmlidXRlc1xuICAgIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgICAgIHZhciBjdXIgPSBhdHRyc1trZXldO1xuICAgICAgICB2YXIgb2xkID0gb2xkQXR0cnNba2V5XTtcbiAgICAgICAgaWYgKG9sZCAhPT0gY3VyKSB7XG4gICAgICAgICAgICBpZiAoYm9vbGVhbkF0dHJzRGljdFtrZXldKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cikge1xuICAgICAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKGtleSwgXCJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlU3BsaXQgPSBrZXkuc3BsaXQoXCI6XCIpO1xuICAgICAgICAgICAgICAgIGlmIChuYW1lc3BhY2VTcGxpdC5sZW5ndGggPiAxICYmIE5hbWVzcGFjZVVSSXMuaGFzT3duUHJvcGVydHkobmFtZXNwYWNlU3BsaXRbMF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGVOUyhOYW1lc3BhY2VVUklzW25hbWVzcGFjZVNwbGl0WzBdXSwga2V5LCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJlbW92ZSByZW1vdmVkIGF0dHJpYnV0ZXNcbiAgICAvLyB1c2UgYGluYCBvcGVyYXRvciBzaW5jZSB0aGUgcHJldmlvdXMgYGZvcmAgaXRlcmF0aW9uIHVzZXMgaXQgKC5pLmUuIGFkZCBldmVuIGF0dHJpYnV0ZXMgd2l0aCB1bmRlZmluZWQgdmFsdWUpXG4gICAgLy8gdGhlIG90aGVyIG9wdGlvbiBpcyB0byByZW1vdmUgYWxsIGF0dHJpYnV0ZXMgd2l0aCB2YWx1ZSA9PSB1bmRlZmluZWRcbiAgICBmb3IgKGtleSBpbiBvbGRBdHRycykge1xuICAgICAgICBpZiAoIShrZXkgaW4gYXR0cnMpKSB7XG4gICAgICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmF0dHJpYnV0ZXNNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlQXR0cnMsIHVwZGF0ZTogdXBkYXRlQXR0cnMgfTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuYXR0cmlidXRlc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF0dHJpYnV0ZXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NuYWJiZG9tL21vZHVsZXMvYXR0cmlidXRlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiB1cGRhdGVDbGFzcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIgY3VyLCBuYW1lLCBlbG0gPSB2bm9kZS5lbG0sIG9sZENsYXNzID0gb2xkVm5vZGUuZGF0YS5jbGFzcywga2xhc3MgPSB2bm9kZS5kYXRhLmNsYXNzO1xuICAgIGlmICghb2xkQ2xhc3MgJiYgIWtsYXNzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZENsYXNzID09PSBrbGFzcylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZENsYXNzID0gb2xkQ2xhc3MgfHwge307XG4gICAga2xhc3MgPSBrbGFzcyB8fCB7fTtcbiAgICBmb3IgKG5hbWUgaW4gb2xkQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFrbGFzc1tuYW1lXSkge1xuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChuYW1lIGluIGtsYXNzKSB7XG4gICAgICAgIGN1ciA9IGtsYXNzW25hbWVdO1xuICAgICAgICBpZiAoY3VyICE9PSBvbGRDbGFzc1tuYW1lXSkge1xuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdFtjdXIgPyAnYWRkJyA6ICdyZW1vdmUnXShuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuY2xhc3NNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlQ2xhc3MsIHVwZGF0ZTogdXBkYXRlQ2xhc3MgfTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuY2xhc3NNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbGFzcy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc25hYmJkb20vbW9kdWxlcy9jbGFzcy5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiB1cGRhdGVQcm9wcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIga2V5LCBjdXIsIG9sZCwgZWxtID0gdm5vZGUuZWxtLCBvbGRQcm9wcyA9IG9sZFZub2RlLmRhdGEucHJvcHMsIHByb3BzID0gdm5vZGUuZGF0YS5wcm9wcztcbiAgICBpZiAoIW9sZFByb3BzICYmICFwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRQcm9wcyA9PT0gcHJvcHMpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRQcm9wcyA9IG9sZFByb3BzIHx8IHt9O1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgZm9yIChrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICAgICAgaWYgKCFwcm9wc1trZXldKSB7XG4gICAgICAgICAgICBkZWxldGUgZWxtW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgY3VyID0gcHJvcHNba2V5XTtcbiAgICAgICAgb2xkID0gb2xkUHJvcHNba2V5XTtcbiAgICAgICAgaWYgKG9sZCAhPT0gY3VyICYmIChrZXkgIT09ICd2YWx1ZScgfHwgZWxtW2tleV0gIT09IGN1cikpIHtcbiAgICAgICAgICAgIGVsbVtrZXldID0gY3VyO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5wcm9wc01vZHVsZSA9IHsgY3JlYXRlOiB1cGRhdGVQcm9wcywgdXBkYXRlOiB1cGRhdGVQcm9wcyB9O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5wcm9wc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zbmFiYmRvbS9tb2R1bGVzL3Byb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciB2bm9kZV8xID0gcmVxdWlyZShcIi4vdm5vZGVcIik7XG52YXIgaXMgPSByZXF1aXJlKFwiLi9pc1wiKTtcbnZhciBodG1sZG9tYXBpXzEgPSByZXF1aXJlKFwiLi9odG1sZG9tYXBpXCIpO1xuZnVuY3Rpb24gaXNVbmRlZihzKSB7IHJldHVybiBzID09PSB1bmRlZmluZWQ7IH1cbmZ1bmN0aW9uIGlzRGVmKHMpIHsgcmV0dXJuIHMgIT09IHVuZGVmaW5lZDsgfVxudmFyIGVtcHR5Tm9kZSA9IHZub2RlXzEuZGVmYXVsdCgnJywge30sIFtdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG5mdW5jdGlvbiBzYW1lVm5vZGUodm5vZGUxLCB2bm9kZTIpIHtcbiAgICByZXR1cm4gdm5vZGUxLmtleSA9PT0gdm5vZGUyLmtleSAmJiB2bm9kZTEuc2VsID09PSB2bm9kZTIuc2VsO1xufVxuZnVuY3Rpb24gaXNWbm9kZSh2bm9kZSkge1xuICAgIHJldHVybiB2bm9kZS5zZWwgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4KGNoaWxkcmVuLCBiZWdpbklkeCwgZW5kSWR4KSB7XG4gICAgdmFyIGksIG1hcCA9IHt9LCBrZXksIGNoO1xuICAgIGZvciAoaSA9IGJlZ2luSWR4OyBpIDw9IGVuZElkeDsgKytpKSB7XG4gICAgICAgIGNoID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICBrZXkgPSBjaC5rZXk7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgbWFwW2tleV0gPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG59XG52YXIgaG9va3MgPSBbJ2NyZWF0ZScsICd1cGRhdGUnLCAncmVtb3ZlJywgJ2Rlc3Ryb3knLCAncHJlJywgJ3Bvc3QnXTtcbnZhciBoXzEgPSByZXF1aXJlKFwiLi9oXCIpO1xuZXhwb3J0cy5oID0gaF8xLmg7XG52YXIgdGh1bmtfMSA9IHJlcXVpcmUoXCIuL3RodW5rXCIpO1xuZXhwb3J0cy50aHVuayA9IHRodW5rXzEudGh1bms7XG5mdW5jdGlvbiBpbml0KG1vZHVsZXMsIGRvbUFwaSkge1xuICAgIHZhciBpLCBqLCBjYnMgPSB7fTtcbiAgICB2YXIgYXBpID0gZG9tQXBpICE9PSB1bmRlZmluZWQgPyBkb21BcGkgOiBodG1sZG9tYXBpXzEuZGVmYXVsdDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2JzW2hvb2tzW2ldXSA9IFtdO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbW9kdWxlcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGhvb2sgPSBtb2R1bGVzW2pdW2hvb2tzW2ldXTtcbiAgICAgICAgICAgIGlmIChob29rICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjYnNbaG9va3NbaV1dLnB1c2goaG9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZW1wdHlOb2RlQXQoZWxtKSB7XG4gICAgICAgIHZhciBpZCA9IGVsbS5pZCA/ICcjJyArIGVsbS5pZCA6ICcnO1xuICAgICAgICB2YXIgYyA9IGVsbS5jbGFzc05hbWUgPyAnLicgKyBlbG0uY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignLicpIDogJyc7XG4gICAgICAgIHJldHVybiB2bm9kZV8xLmRlZmF1bHQoYXBpLnRhZ05hbWUoZWxtKS50b0xvd2VyQ2FzZSgpICsgaWQgKyBjLCB7fSwgW10sIHVuZGVmaW5lZCwgZWxtKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlUm1DYihjaGlsZEVsbSwgbGlzdGVuZXJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBybUNiKCkge1xuICAgICAgICAgICAgaWYgKC0tbGlzdGVuZXJzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gYXBpLnBhcmVudE5vZGUoY2hpbGRFbG0pO1xuICAgICAgICAgICAgICAgIGFwaS5yZW1vdmVDaGlsZChwYXJlbnRfMSwgY2hpbGRFbG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgaSwgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5pbml0KSkge1xuICAgICAgICAgICAgICAgIGkodm5vZGUpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuLCBzZWwgPSB2bm9kZS5zZWw7XG4gICAgICAgIGlmIChzZWwgPT09ICchJykge1xuICAgICAgICAgICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICB2bm9kZS50ZXh0ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2bm9kZS5lbG0gPSBhcGkuY3JlYXRlQ29tbWVudCh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gUGFyc2Ugc2VsZWN0b3JcbiAgICAgICAgICAgIHZhciBoYXNoSWR4ID0gc2VsLmluZGV4T2YoJyMnKTtcbiAgICAgICAgICAgIHZhciBkb3RJZHggPSBzZWwuaW5kZXhPZignLicsIGhhc2hJZHgpO1xuICAgICAgICAgICAgdmFyIGhhc2ggPSBoYXNoSWR4ID4gMCA/IGhhc2hJZHggOiBzZWwubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGRvdCA9IGRvdElkeCA+IDAgPyBkb3RJZHggOiBzZWwubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHRhZyA9IGhhc2hJZHggIT09IC0xIHx8IGRvdElkeCAhPT0gLTEgPyBzZWwuc2xpY2UoMCwgTWF0aC5taW4oaGFzaCwgZG90KSkgOiBzZWw7XG4gICAgICAgICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gaXNEZWYoZGF0YSkgJiYgaXNEZWYoaSA9IGRhdGEubnMpID8gYXBpLmNyZWF0ZUVsZW1lbnROUyhpLCB0YWcpXG4gICAgICAgICAgICAgICAgOiBhcGkuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgICAgICAgaWYgKGhhc2ggPCBkb3QpXG4gICAgICAgICAgICAgICAgZWxtLmlkID0gc2VsLnNsaWNlKGhhc2ggKyAxLCBkb3QpO1xuICAgICAgICAgICAgaWYgKGRvdElkeCA+IDApXG4gICAgICAgICAgICAgICAgZWxtLmNsYXNzTmFtZSA9IHNlbC5zbGljZShkb3QgKyAxKS5yZXBsYWNlKC9cXC4vZywgJyAnKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5jcmVhdGVbaV0oZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpZiAoaXMuYXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZSh2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rOyAvLyBSZXVzZSB2YXJpYWJsZVxuICAgICAgICAgICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkuY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICBpLmNyZWF0ZShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoaS5pbnNlcnQpXG4gICAgICAgICAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm5vZGUuZWxtO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0oY2gsIGluc2VydGVkVm5vZGVRdWV1ZSksIGJlZm9yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW52b2tlRGVzdHJveUhvb2sodm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGosIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuZGVzdHJveSkpXG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmRlc3Ryb3kubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLmRlc3Ryb3lbaV0odm5vZGUpO1xuICAgICAgICAgICAgaWYgKHZub2RlLmNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHZub2RlLmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSBudWxsICYmIHR5cGVvZiBpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVWbm9kZXMocGFyZW50RWxtLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICAgICAgdmFyIGlfMSA9IHZvaWQgMCwgbGlzdGVuZXJzID0gdm9pZCAwLCBybSA9IHZvaWQgMCwgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYoY2guc2VsKSkge1xuICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhjaCk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGNicy5yZW1vdmUubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgcm0gPSBjcmVhdGVSbUNiKGNoLmVsbSwgbGlzdGVuZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpXzEgPSAwOyBpXzEgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYnMucmVtb3ZlW2lfMV0oY2gsIHJtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVmKGlfMSA9IGNoLmRhdGEpICYmIGlzRGVmKGlfMSA9IGlfMS5ob29rKSAmJiBpc0RlZihpXzEgPSBpXzEucmVtb3ZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaV8xKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50RWxtLCBjaC5lbG0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihwYXJlbnRFbG0sIG9sZENoLCBuZXdDaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBvbGRTdGFydElkeCA9IDAsIG5ld1N0YXJ0SWR4ID0gMDtcbiAgICAgICAgdmFyIG9sZEVuZElkeCA9IG9sZENoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBvbGRTdGFydFZub2RlID0gb2xkQ2hbMF07XG4gICAgICAgIHZhciBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XG4gICAgICAgIHZhciBuZXdFbmRJZHggPSBuZXdDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWzBdO1xuICAgICAgICB2YXIgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICAgICAgICB2YXIgb2xkS2V5VG9JZHg7XG4gICAgICAgIHZhciBpZHhJbk9sZDtcbiAgICAgICAgdmFyIGVsbVRvTW92ZTtcbiAgICAgICAgdmFyIGJlZm9yZTtcbiAgICAgICAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07IC8vIFZub2RlIG1pZ2h0IGhhdmUgYmVlbiBtb3ZlZCBsZWZ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvbGRFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhvbGRFbmRWbm9kZS5lbG0pKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkRW5kVm5vZGUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZEtleVRvSWR4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkS2V5VG9JZHggPSBjcmVhdGVLZXlUb09sZElkeChvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeEluT2xkID0gb2xkS2V5VG9JZHhbbmV3U3RhcnRWbm9kZS5rZXldO1xuICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmKGlkeEluT2xkKSkge1xuICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtVG9Nb3ZlID0gb2xkQ2hbaWR4SW5PbGRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtVG9Nb3ZlLnNlbCAhPT0gbmV3U3RhcnRWbm9kZS5zZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShlbG1Ub01vdmUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRDaFtpZHhJbk9sZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgZWxtVG9Nb3ZlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXJ0SWR4ID4gb2xkRW5kSWR4KSB7XG4gICAgICAgICAgICBiZWZvcmUgPSBuZXdDaFtuZXdFbmRJZHggKyAxXSA9PSBudWxsID8gbnVsbCA6IG5ld0NoW25ld0VuZElkeCArIDFdLmVsbTtcbiAgICAgICAgICAgIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4LCBuZXdFbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3U3RhcnRJZHggPiBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnRFbG0sIG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBpLCBob29rO1xuICAgICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmRhdGEpICYmIGlzRGVmKGhvb2sgPSBpLmhvb2spICYmIGlzRGVmKGkgPSBob29rLnByZXBhdGNoKSkge1xuICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBvbGRWbm9kZS5lbG07XG4gICAgICAgIHZhciBvbGRDaCA9IG9sZFZub2RlLmNoaWxkcmVuO1xuICAgICAgICB2YXIgY2ggPSB2bm9kZS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKG9sZFZub2RlID09PSB2bm9kZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHZub2RlLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy51cGRhdGUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLnVwZGF0ZVtpXShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgaSA9IHZub2RlLmRhdGEuaG9vaztcbiAgICAgICAgICAgIGlmIChpc0RlZihpKSAmJiBpc0RlZihpID0gaS51cGRhdGUpKVxuICAgICAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKG9sZENoKSAmJiBpc0RlZihjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkQ2ggIT09IGNoKVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDaGlsZHJlbihlbG0sIG9sZENoLCBjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKGNoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSlcbiAgICAgICAgICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICAgICAgICAgIGFkZFZub2RlcyhlbG0sIG51bGwsIGNoLCAwLCBjaC5sZW5ndGggLSAxLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYob2xkQ2gpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2xkVm5vZGUudGV4dCAhPT0gdm5vZGUudGV4dCkge1xuICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgdm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGVmKGhvb2spICYmIGlzRGVmKGkgPSBob29rLnBvc3RwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGF0Y2gob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBlbG0sIHBhcmVudDtcbiAgICAgICAgdmFyIGluc2VydGVkVm5vZGVRdWV1ZSA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnByZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wcmVbaV0oKTtcbiAgICAgICAgaWYgKCFpc1Zub2RlKG9sZFZub2RlKSkge1xuICAgICAgICAgICAgb2xkVm5vZGUgPSBlbXB0eU5vZGVBdChvbGRWbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNhbWVWbm9kZShvbGRWbm9kZSwgdm5vZGUpKSB7XG4gICAgICAgICAgICBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgICAgIHBhcmVudCA9IGFwaS5wYXJlbnROb2RlKGVsbSk7XG4gICAgICAgICAgICBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnQsIHZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKGVsbSkpO1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnQsIFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnNlcnRlZFZub2RlUXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZVtpXS5kYXRhLmhvb2suaW5zZXJ0KGluc2VydGVkVm5vZGVRdWV1ZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wb3N0Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnBvc3RbaV0oKTtcbiAgICAgICAgcmV0dXJuIHZub2RlO1xuICAgIH07XG59XG5leHBvcnRzLmluaXQgPSBpbml0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c25hYmJkb20uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NuYWJiZG9tL3NuYWJiZG9tLmpzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBoXzEgPSByZXF1aXJlKFwiLi9oXCIpO1xuZnVuY3Rpb24gY29weVRvVGh1bmsodm5vZGUsIHRodW5rKSB7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xuICAgIHZub2RlLmRhdGEuZm4gPSB0aHVuay5kYXRhLmZuO1xuICAgIHZub2RlLmRhdGEuYXJncyA9IHRodW5rLmRhdGEuYXJncztcbiAgICB0aHVuay5kYXRhID0gdm5vZGUuZGF0YTtcbiAgICB0aHVuay5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgIHRodW5rLnRleHQgPSB2bm9kZS50ZXh0O1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbn1cbmZ1bmN0aW9uIGluaXQodGh1bmspIHtcbiAgICB2YXIgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgdm5vZGUgPSBjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBjdXIuYXJncyk7XG4gICAgY29weVRvVGh1bmsodm5vZGUsIHRodW5rKTtcbn1cbmZ1bmN0aW9uIHByZXBhdGNoKG9sZFZub2RlLCB0aHVuaykge1xuICAgIHZhciBpLCBvbGQgPSBvbGRWbm9kZS5kYXRhLCBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciBvbGRBcmdzID0gb2xkLmFyZ3MsIGFyZ3MgPSBjdXIuYXJncztcbiAgICBpZiAob2xkLmZuICE9PSBjdXIuZm4gfHwgb2xkQXJncy5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChvbGRBcmdzW2ldICE9PSBhcmdzW2ldKSB7XG4gICAgICAgICAgICBjb3B5VG9UaHVuayhjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSwgdGh1bmspO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvcHlUb1RodW5rKG9sZFZub2RlLCB0aHVuayk7XG59XG5leHBvcnRzLnRodW5rID0gZnVuY3Rpb24gdGh1bmsoc2VsLCBrZXksIGZuLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcmdzID0gZm47XG4gICAgICAgIGZuID0ga2V5O1xuICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBoXzEuaChzZWwsIHtcbiAgICAgICAga2V5OiBrZXksXG4gICAgICAgIGhvb2s6IHsgaW5pdDogaW5pdCwgcHJlcGF0Y2g6IHByZXBhdGNoIH0sXG4gICAgICAgIGZuOiBmbixcbiAgICAgICAgYXJnczogYXJnc1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMudGh1bms7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHVuay5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc25hYmJkb20vdGh1bmsuanNcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHZub2RlXzEgPSByZXF1aXJlKFwiLi92bm9kZVwiKTtcbnZhciBodG1sZG9tYXBpXzEgPSByZXF1aXJlKFwiLi9odG1sZG9tYXBpXCIpO1xuZnVuY3Rpb24gdG9WTm9kZShub2RlLCBkb21BcGkpIHtcbiAgICB2YXIgYXBpID0gZG9tQXBpICE9PSB1bmRlZmluZWQgPyBkb21BcGkgOiBodG1sZG9tYXBpXzEuZGVmYXVsdDtcbiAgICB2YXIgdGV4dDtcbiAgICBpZiAoYXBpLmlzRWxlbWVudChub2RlKSkge1xuICAgICAgICB2YXIgaWQgPSBub2RlLmlkID8gJyMnICsgbm9kZS5pZCA6ICcnO1xuICAgICAgICB2YXIgY24gPSBub2RlLmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgdmFyIGMgPSBjbiA/ICcuJyArIGNuLnNwbGl0KCcgJykuam9pbignLicpIDogJyc7XG4gICAgICAgIHZhciBzZWwgPSBhcGkudGFnTmFtZShub2RlKS50b0xvd2VyQ2FzZSgpICsgaWQgKyBjO1xuICAgICAgICB2YXIgYXR0cnMgPSB7fTtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XG4gICAgICAgIHZhciBuYW1lXzE7XG4gICAgICAgIHZhciBpID0gdm9pZCAwLCBuID0gdm9pZCAwO1xuICAgICAgICB2YXIgZWxtQXR0cnMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgICAgIHZhciBlbG1DaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcztcbiAgICAgICAgZm9yIChpID0gMCwgbiA9IGVsbUF0dHJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbmFtZV8xID0gZWxtQXR0cnNbaV0ubm9kZU5hbWU7XG4gICAgICAgICAgICBpZiAobmFtZV8xICE9PSAnaWQnICYmIG5hbWVfMSAhPT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgICAgIGF0dHJzW25hbWVfMV0gPSBlbG1BdHRyc1tpXS5ub2RlVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMCwgbiA9IGVsbUNoaWxkcmVuLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh0b1ZOb2RlKGVsbUNoaWxkcmVuW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdChzZWwsIHsgYXR0cnM6IGF0dHJzIH0sIGNoaWxkcmVuLCB1bmRlZmluZWQsIG5vZGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhcGkuaXNUZXh0KG5vZGUpKSB7XG4gICAgICAgIHRleHQgPSBhcGkuZ2V0VGV4dENvbnRlbnQobm9kZSk7XG4gICAgICAgIHJldHVybiB2bm9kZV8xLmRlZmF1bHQodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGV4dCwgbm9kZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGFwaS5pc0NvbW1lbnQobm9kZSkpIHtcbiAgICAgICAgdGV4dCA9IGFwaS5nZXRUZXh0Q29udGVudChub2RlKTtcbiAgICAgICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdCgnIScsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0ZXh0LCB1bmRlZmluZWQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdCgnJywge30sIFtdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG4gICAgfVxufVxuZXhwb3J0cy50b1ZOb2RlID0gdG9WTm9kZTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRvVk5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b3Zub2RlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zbmFiYmRvbS90b3Zub2RlLmpzXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLyoqXG4gKiBBcHBlbmRzIG9uZSBpdGVtIGF0IHRoZSBlbmQgb2YgdGhlIEFycmF5LlxuICovXG5mdW5jdGlvbiBhcHBlbmQoaXRlbSkge1xuICAgIHJldHVybiBuZXcgXzEuQXJyYXlPcHModGhpcy52YWx1ZSgpLmNvbmNhdChpdGVtKSk7XG59XG5leHBvcnRzLmFwcGVuZCA9IGFwcGVuZDtcbl8xLkFycmF5T3BzLnByb3RvdHlwZS5hcHBlbmQgPSBhcHBlbmQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9hcHBlbmQuanNcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIEFwcGVuZHMgYW4gQXJyYXkgb2YgaXRlbXMgYXQgdGhlIGVuZCBvZiB0aGUgQXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFwcGVuZEFsbChpdGVtcykge1xuICAgIHJldHVybiBuZXcgXzEuQXJyYXlPcHModGhpcy52YWx1ZSgpLmNvbmNhdChpdGVtcykpO1xufVxuZXhwb3J0cy5hcHBlbmRBbGwgPSBhcHBlbmRBbGw7XG5fMS5BcnJheU9wcy5wcm90b3R5cGUuYXBwZW5kQWxsID0gYXBwZW5kQWxsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvYXJyYXkvYXBwZW5kQWxsLmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLyoqXG4gKiBGaWx0ZXJzIGFsbCB0aGUgZmFsc3kgZWxlbWVudHMgb3V0IG9mIHRoaXMgQXJyYXkuXG4gKiBBbGwgb2NjdXJlbmNlcyBvZiBmYWxzZSwgbnVsbCwgdW5kZWZpbmVkLCAwLCBcIlwiIHdpbGwgYmUgcmVtb3ZlZC5cbiAqL1xuZnVuY3Rpb24gY29tcGFjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuICEheDsgfSk7XG59XG5leHBvcnRzLmNvbXBhY3QgPSBjb21wYWN0O1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLmNvbXBhY3QgPSBjb21wYWN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvYXJyYXkvY29tcGFjdC5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogQ291bnRzIHRoZSBpdGVtcyBzYXRpc2Z5aW5nIGEgcHJlZGljYXRlLlxuICovXG5mdW5jdGlvbiBjb3VudChwcmVkaWNhdGUpIHtcbiAgICB2YXIgYXJyID0gdGhpcy52YWx1ZSgpLCByZXN1bHQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoYXJyW2ldLCBpKSlcbiAgICAgICAgICAgIHJlc3VsdCsrO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IF8xLk51bWJlck9wcyhyZXN1bHQpO1xufVxuZXhwb3J0cy5jb3VudCA9IGNvdW50O1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLmNvdW50ID0gY291bnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9jb3VudC5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSB3aXRob3V0IGFueSBkdXBsaWNhdGUgaXRlbS5cbiAqIElmIGEga2V5IGZ1bmN0aW9uIGlzIHBhc3NlZCwgaXRlbXMgd2lsbCBiZSBjb21wYXJlZCBiYXNlZCBvbiB0aGUgcmVzdWx0IG9mIHRoYXQgZnVuY3Rpb247XG4gKiBpZiBub3QsIHRoZXkgd2lsbCBiZSBjb21wYXJlZCB1c2luZyBzdHJpY3QgZXF1YWxpdHkuXG4gKi9cbmZ1bmN0aW9uIGRpc3RpbmN0KGdldEtleSkge1xuICAgIHZhciBhcnIgPSB0aGlzLnZhbHVlKCksIHJlc3VsdCA9IFtdO1xuICAgIHZhciBrZXlTZXQ7XG4gICAgdmFyIHJlZkxpc3Q7XG4gICAgaWYgKGdldEtleSlcbiAgICAgICAga2V5U2V0ID0ge307XG4gICAgZWxzZVxuICAgICAgICByZWZMaXN0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBhcnJbaV07XG4gICAgICAgIGlmIChnZXRLZXkpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBnZXRLZXkoaXRlbSwgaSk7XG4gICAgICAgICAgICBpZiAoIWtleVNldFtrZXldKSB7XG4gICAgICAgICAgICAgICAga2V5U2V0W2tleV0gPSAxO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHJlZkxpc3QuaW5kZXhPZihpdGVtKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZWZMaXN0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBfMS5BcnJheU9wcyhyZXN1bHQpO1xufVxuZXhwb3J0cy5kaXN0aW5jdCA9IGRpc3RpbmN0O1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLmRpc3RpbmN0ID0gZGlzdGluY3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9kaXN0aW5jdC5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogRHJvcHMgdGhlIGZpcnN0ICdjb3VudCcgaXRlbXMgZnJvbSB0aGlzIEFycmF5LlxuICovXG5mdW5jdGlvbiBkcm9wKGNvdW50KSB7XG4gICAgcmV0dXJuIG5ldyBfMS5BcnJheU9wcyh0aGlzLnZhbHVlKCkuc2xpY2UoY291bnQpKTtcbn1cbmV4cG9ydHMuZHJvcCA9IGRyb3A7XG5fMS5BcnJheU9wcy5wcm90b3R5cGUuZHJvcCA9IGRyb3A7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9kcm9wLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLyoqXG4gKiBEcm9wcyB0aGUgbGFzdCAnY291bnQnIGl0ZW1zIGZyb20gdGhpcyBBcnJheS5cbiAqL1xuZnVuY3Rpb24gZHJvcFJpZ2h0KGNvdW50KSB7XG4gICAgcmV0dXJuIG5ldyBfMS5BcnJheU9wcyh0aGlzLnZhbHVlKCkuc2xpY2UoMCwgLWNvdW50KSk7XG59XG5leHBvcnRzLmRyb3BSaWdodCA9IGRyb3BSaWdodDtcbl8xLkFycmF5T3BzLnByb3RvdHlwZS5kcm9wUmlnaHQgPSBkcm9wUmlnaHQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9kcm9wUmlnaHQuanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBhbGwgaXRlbXMgc2F0aXNmaWVzIHRoZSBwcmVkaWNhdGUuXG4gKi9cbmZ1bmN0aW9uIGV2ZXJ5KHByZWRpY2F0ZSkge1xuICAgIHZhciBhcnIgPSB0aGlzLnZhbHVlKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUoYXJyW2ldLCBpKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgXzEuQm9vbE9wcyhmYWxzZSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgXzEuQm9vbE9wcyh0cnVlKTtcbn1cbmV4cG9ydHMuZXZlcnkgPSBldmVyeTtcbl8xLkFycmF5T3BzLnByb3RvdHlwZS5ldmVyeSA9IGV2ZXJ5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvYXJyYXkvZXZlcnkuanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIEZpbHRlcnMgdGhpcyBhcnJheSBieSBhcGx5aW5nIGEgcHJlZGljYXRlIHRvIGFsbCBpdGVtcy5cbiAqL1xuZnVuY3Rpb24gZmlsdGVyKHByZWRpY2F0ZSkge1xuICAgIHZhciBhcnIgPSB0aGlzLnZhbHVlKCksIHJlc3VsdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gYXJyW2ldO1xuICAgICAgICBpZiAocHJlZGljYXRlKGl0ZW0sIGkpKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgXzEuQXJyYXlPcHMocmVzdWx0KTtcbn1cbmV4cG9ydHMuZmlsdGVyID0gZmlsdGVyO1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLmZpbHRlciA9IGZpbHRlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zcGFjZS1saWZ0L2FycmF5L2ZpbHRlci5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIG9wdGlvbl90c18xID0gcmVxdWlyZShcIm9wdGlvbi50c1wiKTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIEZpbmRzIHRoZSBmaXJzdCBpdGVtIGluIHRoaXMgQXJyYXkgc2F0aXNmeWluZyBhIHByZWRpY2F0ZS5cbiAqL1xuZnVuY3Rpb24gZmluZChwcmVkaWNhdGUpIHtcbiAgICB2YXIgYXJyID0gdGhpcy52YWx1ZSgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gYXJyW2ldO1xuICAgICAgICBpZiAocHJlZGljYXRlKGl0ZW0sIGkpKVxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbl90c18xLk9wdGlvbihpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbl90c18xLk5vbmU7XG59XG5leHBvcnRzLmZpbmQgPSBmaW5kO1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLmZpbmQgPSBmaW5kO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvYXJyYXkvZmluZC5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIG9wdGlvbl90c18xID0gcmVxdWlyZShcIm9wdGlvbi50c1wiKTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIEZpbmRzIHRoZSBmaXJzdCBpdGVtIGluZGV4IGluIHRoaXMgQXJyYXkgc2F0aXNmeWluZyBhIHByZWRpY2F0ZS5cbiAqL1xuZnVuY3Rpb24gZmluZEluZGV4KHByZWRpY2F0ZSkge1xuICAgIHZhciBhcnIgPSB0aGlzLnZhbHVlKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShhcnJbaV0sIGkpKVxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbl90c18xLk9wdGlvbihpKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbl90c18xLk5vbmU7XG59XG5leHBvcnRzLmZpbmRJbmRleCA9IGZpbmRJbmRleDtcbl8xLkFycmF5T3BzLnByb3RvdHlwZS5maW5kSW5kZXggPSBmaW5kSW5kZXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9maW5kSW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBvcHRpb25fdHNfMSA9IHJlcXVpcmUoXCJvcHRpb24udHNcIik7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBpdGVtIG9mIHRoaXMgQXJyYXksIGFzIGFuIE9wdGlvbi5cbiAqL1xuZnVuY3Rpb24gZmlyc3QoKSB7XG4gICAgcmV0dXJuIG9wdGlvbl90c18xLk9wdGlvbih0aGlzLnZhbHVlKClbMF0pO1xufVxuZXhwb3J0cy5maXJzdCA9IGZpcnN0O1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLmZpcnN0ID0gZmlyc3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9maXJzdC5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIG9wdGlvbl90c18xID0gcmVxdWlyZShcIm9wdGlvbi50c1wiKTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIE1hcHMgdGhpcyBBcnJheSB0byBhbiBBcnJheSBvZiBBcnJheSB8IE9wdGlvbiB8IFdyYXBwZXIgdXNpbmcgYSBtYXBwZXIgZnVuY3Rpb24gdGhlbiBmbGF0dGVucyBpdC5cbiAqL1xuZnVuY3Rpb24gZmxhdE1hcChmdW4pIHtcbiAgICB2YXIgYXJyID0gdGhpcy52YWx1ZSgpLCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGZ1bihhcnJbaV0sIGkpO1xuICAgICAgICBpZiAob3B0aW9uX3RzXzEuT3B0aW9uLmlzT3B0aW9uKGl0ZW0pKVxuICAgICAgICAgICAgaXRlbS5pc0RlZmluZWQoKSAmJiByZXN1bHQucHVzaChpdGVtLmdldCgpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVzdWx0LnB1c2guYXBwbHkocmVzdWx0LCBfMS5nZXRWYWx1ZShpdGVtKSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgXzEuQXJyYXlPcHMocmVzdWx0KTtcbn1cbmV4cG9ydHMuZmxhdE1hcCA9IGZsYXRNYXA7XG5fMS5BcnJheU9wcy5wcm90b3R5cGUuZmxhdE1hcCA9IGZsYXRNYXA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9mbGF0TWFwLmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgb3B0aW9uX3RzXzEgPSByZXF1aXJlKFwib3B0aW9uLnRzXCIpO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogRmxhdHRlbnMgdGhpcyBBcnJheSBvZiBBcnJheXMvT3B0aW9ucy5cbiAqL1xuZnVuY3Rpb24gZmxhdHRlbigpIHtcbiAgICB2YXIgYXJyID0gdGhpcy52YWx1ZSgpLCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGFycltpXTtcbiAgICAgICAgaWYgKG9wdGlvbl90c18xLk9wdGlvbi5pc09wdGlvbihpdGVtKSlcbiAgICAgICAgICAgIGl0ZW0uaXNEZWZpbmVkKCkgJiYgcmVzdWx0LnB1c2goaXRlbS5nZXQoKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoLmFwcGx5KHJlc3VsdCwgaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgXzEuQXJyYXlPcHMocmVzdWx0KTtcbn1cbmV4cG9ydHMuZmxhdHRlbiA9IGZsYXR0ZW47XG5fMS5BcnJheU9wcy5wcm90b3R5cGUuZmxhdHRlbiA9IGZsYXR0ZW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9mbGF0dGVuLmpzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLyoqXG4gKiBGb2xkcyB0aGlzIEFycmF5IGludG8gYSBzaW5nbGUgdmFsdWUsIHVzaW5nIGEgc3RhcnRpbmcgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGZvbGQoc3RhcnRWYWx1ZSwgZnVuYykge1xuICAgIHZhciBhcnIgPSB0aGlzLnZhbHVlKCksIHJlc3VsdCA9IHN0YXJ0VmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ID0gZnVuYyhyZXN1bHQsIGFycltpXSwgaSk7XG4gICAgfVxuICAgIHJldHVybiBfMVtcImRlZmF1bHRcIl0ocmVzdWx0KTtcbn1cbmV4cG9ydHMuZm9sZCA9IGZvbGQ7XG5fMS5BcnJheU9wcy5wcm90b3R5cGUuZm9sZCA9IGZvbGQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9mb2xkLmpzXG4vLyBtb2R1bGUgaWQgPSA4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLyoqXG4gKiBGb2xkcyB0aGlzIEFycmF5IGludG8gYSBzaW5nbGUgdmFsdWUsIHVzaW5nIGEgc3RhcnRpbmcgdmFsdWUsIGZyb20gdGhlIHJpZ2h0LlxuICovXG5mdW5jdGlvbiBmb2xkUmlnaHQoc3RhcnRWYWx1ZSwgZnVuYykge1xuICAgIHZhciBhcnIgPSB0aGlzLnZhbHVlKCksIHJlc3VsdCA9IHN0YXJ0VmFsdWUsIGkgPSBhcnIubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgcmVzdWx0ID0gZnVuYyhyZXN1bHQsIGFycltpXSwgaSk7XG4gICAgfVxuICAgIHJldHVybiBfMVtcImRlZmF1bHRcIl0ocmVzdWx0KTtcbn1cbmV4cG9ydHMuZm9sZFJpZ2h0ID0gZm9sZFJpZ2h0O1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLmZvbGRSaWdodCA9IGZvbGRSaWdodDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zcGFjZS1saWZ0L2FycmF5L2ZvbGRSaWdodC5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIG9wdGlvbl90c18xID0gcmVxdWlyZShcIm9wdGlvbi50c1wiKTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIFJldHVybnMgdGhlIGl0ZW0gZm91bmQgYXQgdGhlIHByb3ZpZGVkIGluZGV4LCBhcyBhbiBPcHRpb24uXG4gKi9cbmZ1bmN0aW9uIGdldChpbmRleCkge1xuICAgIHJldHVybiBvcHRpb25fdHNfMS5PcHRpb24odGhpcy52YWx1ZSgpW2luZGV4XSk7XG59XG5leHBvcnRzLmdldCA9IGdldDtcbl8xLkFycmF5T3BzLnByb3RvdHlwZS5nZXQgPSBnZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9nZXQuanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2Yga2V5cyBnZW5lcmF0ZWQgZnJvbSB0aGUgcmVzdWx0cyBvZiBydW5uaW5nIGVhY2ggZWxlbWVudCB0aHJvdWdoIGEgZGlzY3JpbWluYXRvciBmdW5jdGlvbi5cbiogVGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgb2YgZWFjaCBrZXkgaXMgYW4gYXJyYXkgb2YgdGhlIGVsZW1lbnRzIHJlc3BvbnNpYmxlIGZvciBnZW5lcmF0aW5nIHRoZSBrZXkuXG4qL1xuZnVuY3Rpb24gZ3JvdXBCeShkaXNjcmltaW5hdG9yKSB7XG4gICAgdmFyIGFyciA9IHRoaXMudmFsdWUoKSwgZ3JvdXBzID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBhcnJbaV07XG4gICAgICAgIHZhciBrZXkgPSBkaXNjcmltaW5hdG9yKGl0ZW0sIGkpO1xuICAgICAgICBpZiAoIWdyb3Vwc1trZXldKVxuICAgICAgICAgICAgZ3JvdXBzW2tleV0gPSBbXTtcbiAgICAgICAgZ3JvdXBzW2tleV0ucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBfMS5PYmplY3RPcHMoZ3JvdXBzKTtcbn1cbmV4cG9ydHMuZ3JvdXBCeSA9IGdyb3VwQnk7XG5fMS5BcnJheU9wcy5wcm90b3R5cGUuZ3JvdXBCeSA9IGdyb3VwQnk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9ncm91cEJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLyoqXG4gKiBJbnNlcnQgYW4gaXRlbSBhdCBhIHNwZWNpZmllZCBpbmRleC5cbiAqL1xuZnVuY3Rpb24gaW5zZXJ0KGluZGV4LCBpdGVtKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMudmFsdWUoKS5zbGljZSgpO1xuICAgIHJlc3VsdC5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xuICAgIHJldHVybiBuZXcgXzEuQXJyYXlPcHMocmVzdWx0KTtcbn1cbmV4cG9ydHMuaW5zZXJ0ID0gaW5zZXJ0O1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLmluc2VydCA9IGluc2VydDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zcGFjZS1saWZ0L2FycmF5L2luc2VydC5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogSW5zZXJ0IGFuIEFycmF5IG9mIGl0ZW1zIGF0IGEgc3BlY2lmaWVkIGluZGV4LlxuICovXG5mdW5jdGlvbiBpbnNlcnRBbGwoaW5kZXgsIGl0ZW1zKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMudmFsdWUoKS5zbGljZSgpO1xuICAgIHJlc3VsdC5zcGxpY2UuYXBwbHkocmVzdWx0LCBbaW5kZXgsIDBdLmNvbmNhdChpdGVtcykpO1xuICAgIHJldHVybiBuZXcgXzEuQXJyYXlPcHMocmVzdWx0KTtcbn1cbmV4cG9ydHMuaW5zZXJ0QWxsID0gaW5zZXJ0QWxsO1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLmluc2VydEFsbCA9IGluc2VydEFsbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zcGFjZS1saWZ0L2FycmF5L2luc2VydEFsbC5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogSm9pbnMgdGhlIGl0ZW1zIGludG8gYSBzdHJpbmcsIHVzaW5nIGEgc2VwYXJhdG9yLlxuICovXG5mdW5jdGlvbiBqb2luKHNlcGFyYXRvcikge1xuICAgIGlmIChzZXBhcmF0b3IgPT09IHZvaWQgMCkgeyBzZXBhcmF0b3IgPSAnLCc7IH1cbiAgICByZXR1cm4gbmV3IF8xLlN0cmluZ09wcyh0aGlzLnZhbHVlKCkuam9pbihzZXBhcmF0b3IpKTtcbn1cbmV4cG9ydHMuam9pbiA9IGpvaW47XG5fMS5BcnJheU9wcy5wcm90b3R5cGUuam9pbiA9IGpvaW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9qb2luLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgb3B0aW9uX3RzXzEgPSByZXF1aXJlKFwib3B0aW9uLnRzXCIpO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogUmV0dXJucyB0aGUgbGFzdCBpdGVtIG9mIHRoaXMgQXJyYXksIGFzIGFuIE9wdGlvbi5cbiAqL1xuZnVuY3Rpb24gbGFzdCgpIHtcbiAgICB2YXIgYXJyID0gdGhpcy52YWx1ZSgpO1xuICAgIHJldHVybiBvcHRpb25fdHNfMS5PcHRpb24oYXJyW2Fyci5sZW5ndGggLSAxXSk7XG59XG5leHBvcnRzLmxhc3QgPSBsYXN0O1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLmxhc3QgPSBsYXN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvYXJyYXkvbGFzdC5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogTWFwcyB0aGlzIEFycmF5IHVzaW5nIGEgbWFwcGVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtYXAoZnVuKSB7XG4gICAgdmFyIGFyciA9IHRoaXMudmFsdWUoKSwgcmVzdWx0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gXzEuZ2V0VmFsdWUoZnVuKGFycltpXSwgaSkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IF8xLkFycmF5T3BzKHJlc3VsdCk7XG59XG5leHBvcnRzLm1hcCA9IG1hcDtcbl8xLkFycmF5T3BzLnByb3RvdHlwZS5tYXAgPSBtYXA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIFJlbW92ZXMgdGhlIGl0ZW0gZm91bmQgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQXQoaW5kZXgpIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy52YWx1ZSgpLnNsaWNlKCk7XG4gICAgcmVzdWx0LnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIG5ldyBfMS5BcnJheU9wcyhyZXN1bHQpO1xufVxuZXhwb3J0cy5yZW1vdmVBdCA9IHJlbW92ZUF0O1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLnJlbW92ZUF0ID0gcmVtb3ZlQXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9yZW1vdmVBdC5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogUmV2ZXJzZXMgdGhlIEFycmF5LlxuICovXG5mdW5jdGlvbiByZXZlcnNlKCkge1xuICAgIHJldHVybiBuZXcgXzEuQXJyYXlPcHModGhpcy52YWx1ZSgpLnNsaWNlKCkucmV2ZXJzZSgpKTtcbn1cbmV4cG9ydHMucmV2ZXJzZSA9IHJldmVyc2U7XG5fMS5BcnJheU9wcy5wcm90b3R5cGUucmV2ZXJzZSA9IHJldmVyc2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS9yZXZlcnNlLmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgYXQgbGVhc3Qgb25lIGl0ZW0gc2F0aXNmaWVzIHRoZSBwcmVkaWNhdGUuXG4gKi9cbmZ1bmN0aW9uIHNvbWUocHJlZGljYXRlKSB7XG4gICAgdmFyIGFyciA9IHRoaXMudmFsdWUoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocHJlZGljYXRlKGFycltpXSwgaSkpXG4gICAgICAgICAgICByZXR1cm4gbmV3IF8xLkJvb2xPcHModHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgXzEuQm9vbE9wcyhmYWxzZSk7XG59XG5leHBvcnRzLnNvbWUgPSBzb21lO1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLnNvbWUgPSBzb21lO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvYXJyYXkvc29tZS5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuKiBTb3J0cyB0aGUgQXJyYXkuIFRoZSBzb3J0IGlzIHN0YWJsZS5cbiogSWYgeW91IHdhbnQgdG8gc29ydCBvbiBmaWVsZCBcImFcIiB0aGVuIG9uIGZpZWxkIFwiYlwiLCBqdXN0IGNoYWluIGEgc29ydCBvbiBcImJcIiB0aGVuIGEgc29ydCBvbiBcImFcIi5cbipcbiogQW4gb3B0aW9uIE9iamVjdCBjYW4gYmUgcGFzc2VkIHRvIG1vZGlmeSB0aGUgc29ydCBiZWhhdmlvci5cbiogVGhlIHN1cHBvcnRlZCBvcHRpb25zIGFyZTpcbipcbiogaWdub3JlQ2FzZTogQXNzdW1pbmcgc3RyaW5ncyBhcmUgZ29pbmcgdG8gYmUgc29ydGVkLCBpZ25vcmUgdGhlaXIgY2FzZXMuIERlZmF1bHRzIHRvIGZhbHNlLlxuKlxuKiBsb2NhbENvbXBhcmU6IEFzc3VtaW5nIHN0cmluZ3MgYXJlIGdvaW5nIHRvIGJlIHNvcnRlZCxcbiogICBoYW5kbGUgbG9jYWxlLXNwZWNpZmljIGNoYXJhY3RlcnMgY29ycmVjdGx5IGF0IHRoZSBjb3N0IG9mIHJlZHVjZWQgc29ydCBzcGVlZC4gRGVmYXVsdHMgdG8gZmFsc2UuXG4qXG4qIGJ5OiBBc3N1bWluZyBvYmplY3RzIGFyZSBiZWluZyBzb3J0ZWQsIGEgZnVuY3Rpb24gZWl0aGVyIHBvaW50aW5nIHRvIG9yIGNvbXB1dGluZyB0aGUgdmFsdWVcbiogICB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciB0aGUgc29ydC4gRGVmYXVsdHMgdG8gdW5kZWZpbmVkLlxuKlxuKiByZXZlcnNlOiBSZXZlcnNlcyB0aGUgc29ydC4gRGVmYXVsdHMgdG8gZmFsc2UuXG4qL1xuZnVuY3Rpb24gc29ydChvcHRpb25zKSB7XG4gICAgdmFyIGFyciA9IHRoaXMudmFsdWUoKTtcbiAgICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIG1hcHBlZCA9IFtdO1xuICAgIHZhciBtaXNzaW5nRGF0YSA9IFtdO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgc29ydEZ1bmN0aW9uO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhcnIubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBhcnJbaV07XG4gICAgICAgIHZhciBvcmlnaW5hbEl0ZW0gPSBpdGVtO1xuICAgICAgICBpZiAoby5ieSAmJiBpdGVtKVxuICAgICAgICAgICAgaXRlbSA9IG8uYnkoaXRlbSk7XG4gICAgICAgIGlmIChpdGVtID09PSBudWxsIHx8IGl0ZW0gPT09IHVuZGVmaW5lZCB8fCBpdGVtID09PSAnJykge1xuICAgICAgICAgICAgbWlzc2luZ0RhdGEucHVzaChvcmlnaW5hbEl0ZW0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbWFwcGVkLnB1c2goe1xuICAgICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgICB2YWx1ZTogby5pZ25vcmVDYXNlID8gaXRlbS50b1VwcGVyQ2FzZSgpIDogaXRlbVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG8ubG9jYWxlQ29tcGFyZSkge1xuICAgICAgICBzb3J0RnVuY3Rpb24gPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgaWYgKGEudmFsdWUgIT09IGIudmFsdWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudmFsdWUubG9jYWxlQ29tcGFyZShiLnZhbHVlKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5pbmRleCA8IGIuaW5kZXggPyAtMSA6IDE7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzb3J0RnVuY3Rpb24gPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgaWYgKGEudmFsdWUgIT09IGIudmFsdWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudmFsdWUgPCBiLnZhbHVlID8gLTEgOiAxO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBhLmluZGV4IDwgYi5pbmRleCA/IC0xIDogMTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbWFwcGVkLnNvcnQoc29ydEZ1bmN0aW9uKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gbWFwcGVkLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGFyclttYXBwZWRbaV0uaW5kZXhdKTtcbiAgICB9XG4gICAgaWYgKG1pc3NpbmdEYXRhLmxlbmd0aClcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChtaXNzaW5nRGF0YSk7XG4gICAgaWYgKG8ucmV2ZXJzZSlcbiAgICAgICAgcmVzdWx0LnJldmVyc2UoKTtcbiAgICByZXR1cm4gbmV3IF8xLkFycmF5T3BzKHJlc3VsdCk7XG59XG5leHBvcnRzLnNvcnQgPSBzb3J0O1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLnNvcnQgPSBzb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvYXJyYXkvc29ydC5qc1xuLy8gbW9kdWxlIGlkID0gOTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogVGFrZXMgdGhlIGZpcnN0ICdjb3VudCcgaXRlbXMgZnJvbSB0aGlzIEFycmF5LlxuICovXG5mdW5jdGlvbiB0YWtlKGNvdW50KSB7XG4gICAgcmV0dXJuIG5ldyBfMS5BcnJheU9wcyh0aGlzLnZhbHVlKCkuc2xpY2UoMCwgY291bnQpKTtcbn1cbmV4cG9ydHMudGFrZSA9IHRha2U7XG5fMS5BcnJheU9wcy5wcm90b3R5cGUudGFrZSA9IHRha2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS90YWtlLmpzXG4vLyBtb2R1bGUgaWQgPSA5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLyoqXG4gKiBUYWtlcyB0aGUgbGFzdCAnY291bnQnIGl0ZW1zIGZyb20gdGhpcyBBcnJheS5cbiAqL1xuZnVuY3Rpb24gdGFrZVJpZ2h0KGNvdW50KSB7XG4gICAgdmFyIGFyciA9IHRoaXMudmFsdWUoKTtcbiAgICByZXR1cm4gbmV3IF8xLkFycmF5T3BzKChhcnIubGVuZ3RoIDwgY291bnQpXG4gICAgICAgID8gYXJyLnNsaWNlKDApXG4gICAgICAgIDogYXJyLnNsaWNlKGFyci5sZW5ndGggLSBjb3VudCkpO1xufVxuZXhwb3J0cy50YWtlUmlnaHQgPSB0YWtlUmlnaHQ7XG5fMS5BcnJheU9wcy5wcm90b3R5cGUudGFrZVJpZ2h0ID0gdGFrZVJpZ2h0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvYXJyYXkvdGFrZVJpZ2h0LmpzXG4vLyBtb2R1bGUgaWQgPSA5NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIEFycmF5IG9mIG51bWJlcnMgb3Igc3RyaW5ncyB0byBhIFNldC1saWtlIG9iamVjdCB3aGVyZSB2YWx1ZXMgYXJlIGFsbCB0cnV0aHkuXG4gKi9cbmZ1bmN0aW9uIHRvU2V0KCkge1xuICAgIHZhciBhcnIgPSB0aGlzLnZhbHVlKCksIHJlc3VsdCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdFthcnJbaV1dID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBfMS5PYmplY3RPcHMocmVzdWx0KTtcbn1cbmV4cG9ydHMudG9TZXQgPSB0b1NldDtcbl8xLkFycmF5T3BzLnByb3RvdHlwZS50b1NldCA9IHRvU2V0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvYXJyYXkvdG9TZXQuanNcbi8vIG1vZHVsZSBpZCA9IDk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIFVwZGF0ZXMgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICovXG5mdW5jdGlvbiB1cGRhdGVBdChpbmRleCwgdXBkYXRlcikge1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnZhbHVlKCkuc2xpY2UoKTtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IGluZGV4KVxuICAgICAgICByZXN1bHRbaW5kZXhdID0gXzEuZ2V0VmFsdWUodXBkYXRlcihyZXN1bHRbaW5kZXhdKSk7XG4gICAgcmV0dXJuIG5ldyBfMS5BcnJheU9wcyhyZXN1bHQpO1xufVxuZXhwb3J0cy51cGRhdGVBdCA9IHVwZGF0ZUF0O1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLnVwZGF0ZUF0ID0gdXBkYXRlQXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9hcnJheS91cGRhdGVBdC5qc1xuLy8gbW9kdWxlIGlkID0gOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogQWRkcyBhIGtleS92YWx1ZSB0byB0aGlzIFwiTWFwXCIgb2JqZWN0LlxuICogVG8gdXBkYXRlIGFuIG9iamVjdCB3aGlsZSBwcmVzZXJ2aW5nIGl0cyB0eXBlLCB1c2UgXCJ1cGRhdGUoKVwiIGluc3RlYWQuXG4gKi9cbmZ1bmN0aW9uIGFkZChrZXksIHZhbHVlKSB7XG4gICAgdmFyIG9iaiA9IHRoaXMudmFsdWUoKSwgcmVzdWx0ID0ge307XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmVzdWx0W2tleV0gPSBvYmpba2V5XTsgfSk7XG4gICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gbmV3IF8xLk9iamVjdE9wcyhyZXN1bHQpO1xufVxuZXhwb3J0cy5hZGQgPSBhZGQ7XG5fMS5PYmplY3RPcHMucHJvdG90eXBlLmFkZCA9IGFkZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zcGFjZS1saWZ0L29iamVjdC9hZGQuanNcbi8vIG1vZHVsZSBpZCA9IDk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIEZpbHRlciBrZXlzL3ZhbHVlcyBvZiBhIFwiTWFwXCIgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUpIHtcbiAgICB2YXIgb2JqID0gdGhpcy52YWx1ZSgpLCByZXN1bHQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShrZXksIHZhbHVlKSlcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBfMS5PYmplY3RPcHMocmVzdWx0KTtcbn1cbmV4cG9ydHMuZmlsdGVyID0gZmlsdGVyO1xuXzEuT2JqZWN0T3BzLnByb3RvdHlwZS5maWx0ZXIgPSBmaWx0ZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9vYmplY3QvZmlsdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgb3B0aW9uX3RzXzEgPSByZXF1aXJlKFwib3B0aW9uLnRzXCIpO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgZm91bmQgYXQgdGhlIHByb3ZpZGVkIGtleSwgYXMgYW4gT3B0aW9uLlxuICogVXNhZ2UgMTogcmVhZCBhIHZhbHVlIGZyb20gYSBcIk1hcFwiIG9iamVjdFxuICogVXNhZ2UgMjogcmVhZCBhbiBvcHRpb25hbCB2YWx1ZSBmcm9tIGEgZG9tYWluIG9iamVjdFxuICovXG5mdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIG9wdGlvbl90c18xLk9wdGlvbih0aGlzLnZhbHVlKClba2V5XSk7XG59XG5leHBvcnRzLmdldCA9IGdldDtcbl8xLk9iamVjdE9wcy5wcm90b3R5cGUuZ2V0ID0gZ2V0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvb2JqZWN0L2dldC5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIENyZWF0ZXMgYW4gQXJyYXkgb2YgYWxsIHRoaXMgb2JqZWN0J3Mga2V5cywgaW4gbm8gcGFydGljdWxhciBvcmRlci5cbiAqL1xuZnVuY3Rpb24ga2V5cygpIHtcbiAgICByZXR1cm4gbmV3IF8xLkFycmF5T3BzKE9iamVjdC5rZXlzKHRoaXMudmFsdWUoKSkpO1xufVxuZXhwb3J0cy5rZXlzID0ga2V5cztcbl8xLk9iamVjdE9wcy5wcm90b3R5cGUua2V5cyA9IGtleXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIE1hcHMgYWxsIHRoZSB2YWx1ZXMgb2YgdGhpcyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIG1hcFZhbHVlcyhtYXBwZXIpIHtcbiAgICB2YXIgb2JqID0gdGhpcy52YWx1ZSgpLCByZXN1bHQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBtYXBwZXIoa2V5LCBvYmpba2V5XSk7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBfMS5PYmplY3RPcHMocmVzdWx0KTtcbn1cbmV4cG9ydHMubWFwVmFsdWVzID0gbWFwVmFsdWVzO1xuXzEuT2JqZWN0T3BzLnByb3RvdHlwZS5tYXBWYWx1ZXMgPSBtYXBWYWx1ZXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3BhY2UtbGlmdC9vYmplY3QvbWFwVmFsdWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogUmV0dXJucyBhbiBPYmplY3Qgd2hlcmUgdGhlIGdpdmVuIGtleXMgYXJlIHJlbW92ZWQuXG4gKiBUbyBkZWxldGUgYSBudWxsYWJsZSBrZXkgZnJvbSBhbiBvYmplY3Qgd2hpbGUgcHJlc2VydmluZyBpdHMgdHlwZSwgdXNlIFwidXBkYXRlKClcIlxuICovXG5mdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBrZXlzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBvYmogPSB0aGlzLnZhbHVlKCksIHJlc3VsdCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IGlmIChrZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpXG4gICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07IH0pO1xuICAgIHJldHVybiBuZXcgXzEuT2JqZWN0T3BzKHJlc3VsdCk7XG59XG5leHBvcnRzLnJlbW92ZSA9IHJlbW92ZTtcbl8xLk9iamVjdE9wcy5wcm90b3R5cGUucmVtb3ZlID0gcmVtb3ZlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvb2JqZWN0L3JlbW92ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vKipcbiAqIENvbnZlcnRzIHRoaXMgb2JqZWN0IHRvIGFuIEFycmF5IG9mIHR1cGxlcy5cbiAqL1xuZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgICB2YXIgb2JqID0gdGhpcy52YWx1ZSgpLCByZXN1bHQgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXN1bHQucHVzaChba2V5LCBvYmpba2V5XV0pO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXcgXzEuQXJyYXlPcHMocmVzdWx0KTtcbn1cbmV4cG9ydHMudG9BcnJheSA9IHRvQXJyYXk7XG5fMS5PYmplY3RPcHMucHJvdG90eXBlLnRvQXJyYXkgPSB0b0FycmF5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvb2JqZWN0L3RvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDEwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgaW1tdXBkYXRlXzEgPSByZXF1aXJlKFwiaW1tdXBkYXRlXCIpO1xudmFyIF8xID0gcmVxdWlyZShcIi4uL1wiKTtcbi8qKlxuICogVXBkYXRlcyBhbiBvYmplY3QgcHJvcGVydGllcyBzaGFsbG93bHkuXG4gKiBUaGlzIGRlbGVnYXRlcyB0byBcImltbXVwZGF0ZVwiLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL0FsZXhHYWxheXMvaW1tdXBkYXRlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShzcGVjKSB7XG4gICAgcmV0dXJuIG5ldyBfMS5PYmplY3RPcHMoaW1tdXBkYXRlXzEudXBkYXRlKHRoaXMudmFsdWUoKSwgc3BlYykpO1xufVxuZXhwb3J0cy51cGRhdGUgPSB1cGRhdGU7XG5fMS5PYmplY3RPcHMucHJvdG90eXBlLnVwZGF0ZSA9IHVwZGF0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zcGFjZS1saWZ0L29iamVjdC91cGRhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLyoqXG4gKiBDcmVhdGVzIGFuIEFycmF5IG9mIGFsbCB0aGlzIG9iamVjdCdzIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHZhciBvYmogPSB0aGlzLnZhbHVlKCksIHJlc3VsdCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKG9ialtrZXldKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IF8xLkFycmF5T3BzKHJlc3VsdCk7XG59XG5leHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcbl8xLk9iamVjdE9wcy5wcm90b3R5cGUudmFsdWVzID0gdmFsdWVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvb2JqZWN0L3ZhbHVlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuL1wiKTtcbi8qKlxuICogUnVucyBhbiBhcmJpdHJhcnkgdHJhbnNmb3JtYXRpb24uXG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybShmdW5jKSB7XG4gICAgcmV0dXJuIF8xW1wiZGVmYXVsdFwiXShmdW5jKHRoaXMudmFsdWUoKSkpO1xufVxuZXhwb3J0cy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG5fMS5OdW1iZXJPcHMucHJvdG90eXBlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbl8xLlN0cmluZ09wcy5wcm90b3R5cGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXzEuQm9vbE9wcy5wcm90b3R5cGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXzEuQXJyYXlPcHMucHJvdG90eXBlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbl8xLk9iamVjdE9wcy5wcm90b3R5cGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NwYWNlLWxpZnQvdHJhbnNmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc3R5bGVzID0gcmVxdWlyZSgnLi9pY29uLnN0eWwnKTtcbnZhciBrYWlqdV8xID0gcmVxdWlyZShcImthaWp1XCIpO1xuZXhwb3J0cy5lZGl0SWNvbiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIChrYWlqdV8xLmgoJ3N2ZycsIHsgYXR0cnM6IHsgY2xhc3M6IHN0eWxlcy5pY29uLCB2aWV3Qm94OiAnMCAwIDI0IDI0JyB9IH0sIFtcbiAgICBrYWlqdV8xLmgoJ3BhdGgnLCB7IGF0dHJzOiB7IGQ6IFwiTTMgMTcuMjVWMjFoMy43NUwxNy44MSA5Ljk0bC0zLjc1LTMuNzVMMyAxNy4yNXpNMjAuNzEgNy4wNGMuMzktLjM5LjM5LTEuMDJcXG4gICAgICAwLTEuNDFsLTIuMzQtMi4zNGMtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDBsLTEuODMgMS44MyAzLjc1IDMuNzUgMS44My0xLjgzelwiIH0gfSlcbl0pKTsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ljb24vaWNvbi50c1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2ljb25cIikpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaWNvbi9pbmRleC50c1xuLy8gbW9kdWxlIGlkID0gMTA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgb2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcImthaWp1L29ic2VydmFibGVcIik7XG52YXIgcmVtb3RlRGF0YV8xID0gcmVxdWlyZShcInV0aWwvcmVtb3RlRGF0YVwiKTtcbi8qKlxuICogQ3JlYXRlcyBhIGRhdGEsIGVycm9yIGFuZCBsb2FkaW5nIG9ic2VydmFibGVzIG91dCBvZiBhIG9uZS1vZmYgb3IgcmVjdXJyZW50IGFqYXggY2FsbFxuICovXG5mdW5jdGlvbiBvYnNlcnZlQWpheChvcHRpb25zKSB7XG4gICAgdmFyIG5hbWUgPSBvcHRpb25zLm5hbWUsIGFqYXggPSBvcHRpb25zLmFqYXg7XG4gICAgdmFyIGNhbGwgPSBvYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSgpO1xuICAgIHZhciBoYXNDYWxsTm93V2l0aCA9ICgnY2FsbE5vd1dpdGgnIGluIG9wdGlvbnMpIHx8ICgnY2FsbE5vdycgaW4gb3B0aW9ucyk7XG4gICAgdmFyIHRyaWdnZXIgPSBoYXNDYWxsTm93V2l0aFxuICAgICAgICA/IG9ic2VydmFibGVfMS5PYnNlcnZhYmxlLm1lcmdlKGNhbGwsIG9ic2VydmFibGVfMS5PYnNlcnZhYmxlLnB1cmUob3B0aW9ucy5jYWxsTm93V2l0aCkpXG4gICAgICAgIDogY2FsbDtcbiAgICB2YXIgcmVzdWx0ID0gdHJpZ2dlci5mbGF0TWFwTGF0ZXN0KGZ1bmN0aW9uIChhcmcpIHsgcmV0dXJuIG9ic2VydmFibGVfMS5PYnNlcnZhYmxlLmZyb21Qcm9taXNlKGFqYXgoYXJnKSk7IH0pLm1hcChmdW5jdGlvbiAocikge1xuICAgICAgICByZXR1cm4gci50eXBlID09PSAnc3VjY2VzcycgPyByZW1vdGVEYXRhXzEuU3VjY2VzcyhyLnZhbHVlKSA6IHJlbW90ZURhdGFfMS5GYWlsdXJlKHIuZXJyb3IpO1xuICAgIH0pO1xuICAgIHZhciBsb2FkaW5nID0gdHJpZ2dlci5tYXAoZnVuY3Rpb24gKF8pIHsgcmV0dXJuIHJlbW90ZURhdGFfMS5Mb2FkaW5nOyB9KTtcbiAgICB2YXIgbm90QXNrZWQgPSBoYXNDYWxsTm93V2l0aCA/IG9ic2VydmFibGVfMS5PYnNlcnZhYmxlKCkgOiBvYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5wdXJlKHJlbW90ZURhdGFfMS5Ob3RBc2tlZCk7XG4gICAgdmFyIGRhdGEgPSBvYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5tZXJnZShub3RBc2tlZCwgbG9hZGluZywgcmVzdWx0KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiBkYXRhLm5hbWVkKG5hbWUgKyAnX3JlbW90ZURhdGEnKSxcbiAgICAgICAgY2FsbDogZnVuY3Rpb24gKHZhbHVlKSB7IGNhbGwodmFsdWUpOyB9IC8vIFdlIHdhbnQgY2FsbCgpIHRvIHJldHVybiB1bmRlZmluZWQgc28gaXQgY2FuIGVhc2lseSBiZSB1c2VkIGluc2lkZSBTdG9yZSBoYW5kbGVycy5cbiAgICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gb2JzZXJ2ZUFqYXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlsL2FqYXgudHNcbi8vIG1vZHVsZSBpZCA9IDExMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGZpbmRQYXJlbnRCeUF0dHIoYXR0ciwgZnJvbSkge1xuICAgIHdoaWxlIChmcm9tICYmIGZyb20uZ2V0QXR0cmlidXRlKSB7XG4gICAgICAgIGlmIChmcm9tLmdldEF0dHJpYnV0ZShhdHRyKSlcbiAgICAgICAgICAgIHJldHVybiBmcm9tO1xuICAgICAgICBmcm9tID0gZnJvbS5wYXJlbnRFbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydHMuZmluZFBhcmVudEJ5QXR0ciA9IGZpbmRQYXJlbnRCeUF0dHI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlsL2RvbS50c1xuLy8gbW9kdWxlIGlkID0gMTExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZGVsYXkodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCB2YWx1ZSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmRlbGF5ID0gZGVsYXk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlsL3Byb21pc2UudHNcbi8vIG1vZHVsZSBpZCA9IDExMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFieXNzYV8xID0gcmVxdWlyZShcImFieXNzYVwiKTtcbnZhciBrYWlqdV8xID0gcmVxdWlyZShcImthaWp1XCIpO1xudmFyIHNwYWNlX2xpZnRfMSA9IHJlcXVpcmUoXCJzcGFjZS1saWZ0XCIpO1xuLyogQ3JlYXRlcyBhIG5ldyBSb3V0ZSBkZWZpbml0aW9uICovXG5mdW5jdGlvbiBSb3V0ZURlZih1cmksIFxuICAgIC8vIE9ubHkgaGVyZSB0byBjYXB0dXJlIHRoZSB0eXBlXG4gICAgX3BhcmFtcywgb3B0aW9ucykge1xuICAgIHZhciBjaGlsZHJlbiA9IG9wdGlvbnMuY2hpbGRyZW4gfHwge307XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBkZWY6IF9fYXNzaWduKHsgdXJpOiB1cmksIGZ1bGxOYW1lOiB1bmRlZmluZWQsIHBhcmVudDogdW5kZWZpbmVkIH0sIG9wdGlvbnMpLFxuICAgICAgICBwYXJhbXM6IHVuZGVmaW5lZFxuICAgIH0sIGNoaWxkcmVuKTtcbn1cbmV4cG9ydHMuUm91dGVEZWYgPSBSb3V0ZURlZjtcbi8qIENyZWF0ZXMgdGhlIHJvdXRlciBhbmQgc3RhcnRzIHRoZSBhcHBsaWNhdGlvbiAqL1xuZnVuY3Rpb24gUm91dGVyKG9wdGlvbnMpIHtcbiAgICAvLyBUaGUgbG9va3VwIG9mIG91ciBjdXN0b20gcm91dGUgb2JqZWN0cyBieSBmdWxsIG5hbWVcbiAgICB2YXIgcm91dGVCeU5hbWUgPSB7fTtcbiAgICAvLyBUaGUgY29tcG9uZW50cyBjdXJyZW50bHkgbW91bnRlZCwgdG9wLWRvd25cbiAgICB2YXIgY29tcG9uZW50cyA9IFtdO1xuICAgIC8vIFRoZSBjdXJyZW50IHJvdXRlIGluIHRoZSB0cmFuc2l0aW9uXG4gICAgdmFyIGN1cnJlbnRSb3V0ZTtcbiAgICAvLyBUaGUgY3VycmVudCBhcHAgVk5vZGVcbiAgICB2YXIgY3VycmVudFZOb2RlO1xuICAgIHZhciB0eXBlZFJvdXRlcjtcbiAgICAvLyBUcmFuc2xhdGUgb3VyIFJvdXRlRGVmcyBpbnRvIGFieXNzYSBTdGF0ZXNcbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1Sb3V0ZVRyZWUobmFtZSwgcm91dGUsIHBhcmVudCkge1xuICAgICAgICBpZiAocGFyZW50ID09PSB2b2lkIDApIHsgcGFyZW50ID0gdW5kZWZpbmVkOyB9XG4gICAgICAgIHJvdXRlQnlOYW1lW25hbWVdID0gcm91dGU7XG4gICAgICAgIHJvdXRlLmRlZi5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHJvdXRlLmRlZi5mdWxsTmFtZSA9IG5hbWU7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHJvdXRlLmRlZi5jaGlsZHJlblxuICAgICAgICAgICAgPyBzcGFjZV9saWZ0XzEuZGVmYXVsdChyb3V0ZS5kZWYuY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAgLm1hcFZhbHVlcyhmdW5jdGlvbiAoY2hpbGROYW1lLCBjaGlsZFJvdXRlKSB7IHJldHVybiB0cmFuc2Zvcm1Sb3V0ZVRyZWUobmFtZSArIFwiLlwiICsgY2hpbGROYW1lLCBjaGlsZFJvdXRlLCByb3V0ZSk7IH0pXG4gICAgICAgICAgICAgICAgLnZhbHVlKClcbiAgICAgICAgICAgIDoge307XG4gICAgICAgIHJldHVybiBhYnlzc2FfMS5TdGF0ZShyb3V0ZS5kZWYudXJpLCB7XG4gICAgICAgICAgICBlbnRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucHVzaChyb3V0ZS5kZWYuZW50ZXIodHlwZWRSb3V0ZXIsIGN1cnJlbnRSb3V0ZSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5kZWYudXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICByb3V0ZS5kZWYudXBkYXRlKGN1cnJlbnRSb3V0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucG9wKCk7XG4gICAgICAgICAgICAgICAgaWYgKHJvdXRlLmRlZi5leGl0KVxuICAgICAgICAgICAgICAgICAgICByb3V0ZS5kZWYuZXhpdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjaGlsZHJlbik7XG4gICAgfVxuICAgIHZhciByb290U3RhdGVzID0gc3BhY2VfbGlmdF8xLmRlZmF1bHQob3B0aW9ucy5yb3V0ZXMpLm1hcFZhbHVlcyh0cmFuc2Zvcm1Sb3V0ZVRyZWUpLnZhbHVlKCk7XG4gICAgdmFyIHJvdXRlciA9IGFieXNzYV8xLlJvdXRlcihyb290U3RhdGVzKTtcbiAgICB2YXIgYWJ5c3NhT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHtcbiAgICAgICAgbm90Rm91bmQ6IG9wdGlvbnMubm90Rm91bmQgJiYgb3B0aW9ucy5ub3RGb3VuZC5kZWYuZnVsbE5hbWVcbiAgICB9KTtcbiAgICByb3V0ZXIuY29uZmlndXJlKGFieXNzYU9wdGlvbnMpO1xuICAgIHJvdXRlci5vbignc3RhcnRlZCcsIGZ1bmN0aW9uIChuZXdTdGF0ZSkge1xuICAgICAgICB2YXIgcm91dGVEZWYgPSByb3V0ZUJ5TmFtZVtuZXdTdGF0ZS5mdWxsTmFtZV07XG4gICAgICAgIGN1cnJlbnRSb3V0ZSA9IG1ha2VSb3V0ZShyb3V0ZURlZiwgbmV3U3RhdGUucGFyYW1zLCBuZXdTdGF0ZS5wYXJhbXNEaWZmKTtcbiAgICB9KTtcbiAgICByb3V0ZXIub24oJ2VuZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV3QXBwTm9kZSA9IGNvbXBvbmVudHMucmVkdWNlUmlnaHQoZnVuY3Rpb24gKHByZXZpb3VzLCBjdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudChjdXJyZW50Um91dGUsIHByZXZpb3VzKTtcbiAgICAgICAgfSwgZW1wdHlWTm9kZSgpKTtcbiAgICAgICAgaWYgKGN1cnJlbnRWTm9kZSkge1xuICAgICAgICAgICAga2FpanVfMS5SZW5kZXIuaW50byhjdXJyZW50Vk5vZGUsIG5ld0FwcE5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAga2FpanVfMS5zdGFydEFwcCh7XG4gICAgICAgICAgICAgICAgYXBwOiBuZXdBcHBOb2RlLFxuICAgICAgICAgICAgICAgIGVsbTogb3B0aW9ucy5lbG0sXG4gICAgICAgICAgICAgICAgcmVwbGFjZUVsbTogb3B0aW9ucy5yZXBsYWNlRWxtLFxuICAgICAgICAgICAgICAgIHNuYWJiZG9tTW9kdWxlczogb3B0aW9ucy5zbmFiYmRvbU1vZHVsZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRWTm9kZSA9IG5ld0FwcE5vZGU7XG4gICAgfSk7XG4gICAgdmFyIHJvdXRlckFwaSA9IHJvdXRlcjtcbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uVG8ocm91dGUsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gcm91dGVyQXBpLnRyYW5zaXRpb25Ubyhyb3V0ZS5kZWYuZnVsbE5hbWUsIHBhcmFtcyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpbmsocm91dGUsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gcm91dGVyQXBpLmxpbmsocm91dGUuZGVmLmZ1bGxOYW1lLCBwYXJhbXMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBsYWNlUGFyYW1zKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gcm91dGVyQXBpLnJlcGxhY2VQYXJhbXMocGFyYW1zKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgcm91dGVyLmluaXQoKTtcbiAgICB9XG4gICAgdHlwZWRSb3V0ZXIgPSB7XG4gICAgICAgIHJvdXRlczogb3B0aW9ucy5yb3V0ZXMsXG4gICAgICAgIHRyYW5zaXRpb25UbzogdHJhbnNpdGlvblRvLFxuICAgICAgICByZXBsYWNlUGFyYW1zOiByZXBsYWNlUGFyYW1zLFxuICAgICAgICBsaW5rOiBsaW5rLFxuICAgICAgICBpbml0OiBpbml0XG4gICAgfTtcbiAgICByZXR1cm4gdHlwZWRSb3V0ZXI7XG59XG5leHBvcnRzLlJvdXRlciA9IFJvdXRlcjtcbmZ1bmN0aW9uIG1ha2VSb3V0ZShyb3V0ZSwgcGFyYW1zLCBwYXJhbXNEaWZmKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcm91dGU6IHJvdXRlLFxuICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgcGFyYW1zRGlmZjogcGFyYW1zRGlmZixcbiAgICAgICAgaXM6IGZ1bmN0aW9uIChvdGhlclJvdXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gcm91dGUuZGVmLmZ1bGxOYW1lID09PSBvdGhlclJvdXRlLmRlZi5mdWxsTmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNJbjogZnVuY3Rpb24gKHBhcmVudFJvdXRlKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gcm91dGU7XG4gICAgICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gcGFyZW50Um91dGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5kZWYucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbn1cbnZhciBlbXB0eVZOb2RlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4ga2FpanVfMS5oKCdkaXYnLCB7IGtleTogJ19lbXB0eVZOb2RlJyB9KTsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3V0aWwvcm91dGVyLnRzXG4vLyBtb2R1bGUgaWQgPSAxMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKiBBZGRzIGFuIGV4dHJhIGNsYXNzbmFtZSB0byBhbiBWTm9kZSBub3QgY3JlYXRlZCBieSB0aGUgY29kZSB3YW50aW5nIHRvIGFkZCB0aGUgY2xhc3NuYW1lICovXG5mdW5jdGlvbiBhZGRDbGFzc05hbWUobm9kZSwgY2xhc3NuYW1lKSB7XG4gICAgdmFyIGF0dHJzID0gbm9kZS5kYXRhLmF0dHJzIHx8IChub2RlLmRhdGEuYXR0cnMgPSB7fSk7XG4gICAgYXR0cnMuY2xhc3MgPSBhdHRycy5jbGFzcyA/IGF0dHJzLmNsYXNzICsgJyAnICsgY2xhc3NuYW1lIDogY2xhc3NuYW1lO1xuICAgIHJldHVybiBub2RlO1xufVxuZXhwb3J0cy5hZGRDbGFzc05hbWUgPSBhZGRDbGFzc05hbWU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlsL3Zub2RlLnRzXG4vLyBtb2R1bGUgaWQgPSAxMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5yZXF1aXJlKCcuL2FwcC5zdHlsJyk7XG52YXIga2FpanVfMSA9IHJlcXVpcmUoXCJrYWlqdVwiKTtcbnZhciBzcGFjZV9saWZ0XzEgPSByZXF1aXJlKFwic3BhY2UtbGlmdFwiKTtcbnZhciBmYWRlXzEgPSByZXF1aXJlKFwid2lkZ2V0L2FuaW1hdGlvbi9zaW5nbGUvZmFkZVwiKTtcbnZhciBsaW5rXzEgPSByZXF1aXJlKFwid2lkZ2V0L2xpbmtcIik7XG52YXIgaW5kZXhfMSA9IHJlcXVpcmUoXCJ2aWV3L2luZGV4XCIpO1xudmFyIGJsdWVfMSA9IHJlcXVpcmUoXCJ2aWV3L2JsdWVcIik7XG52YXIgcm91dGVOb3RGb3VuZF8xID0gcmVxdWlyZShcInZpZXcvYXBwL3JvdXRlTm90Rm91bmRcIik7XG52YXIgc3RvcmVfMSA9IHJlcXVpcmUoXCJ2aWV3L2FwcC9zdG9yZVwiKTtcbnZhciByb3V0ZXJfMSA9IHJlcXVpcmUoXCJyb3V0ZXJcIik7XG5mdW5jdGlvbiByb3V0ZSgpIHtcbiAgICB2YXIgYXBwU3RvcmUgPSBzdG9yZV8xLmRlZmF1bHQoKTtcbiAgICByZXR1cm4gcm91dGVyXzEuUm91dGVEZWYoJycsIHt9LCB7XG4gICAgICAgIGVudGVyOiBmdW5jdGlvbiAocm91dGVyKSB7IHJldHVybiBmdW5jdGlvbiAocm91dGUsIGNoaWxkKSB7IHJldHVybiBhcHAoeyBhcHBTdG9yZTogYXBwU3RvcmUsIGNoaWxkOiBjaGlsZCwgcm91dGVyOiByb3V0ZXIsIHJvdXRlOiByb3V0ZSB9KTsgfTsgfSxcbiAgICAgICAgY2hpbGRyZW46IHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleF8xLmRlZmF1bHQoKSxcbiAgICAgICAgICAgIGJsdWU6IGJsdWVfMS5kZWZhdWx0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwcFN0b3JlOyB9KSxcbiAgICAgICAgICAgIG5vdEZvdW5kOiByb3V0ZU5vdEZvdW5kXzEuZGVmYXVsdCgpXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHJvdXRlO1xuZnVuY3Rpb24gYXBwKHByb3BzKSB7XG4gICAgcmV0dXJuIGthaWp1XzEuQ29tcG9uZW50KHsgbmFtZTogJ2FwcCcsIHByb3BzOiBwcm9wcywgaW5pdFN0YXRlOiBpbml0U3RhdGUsIGNvbm5lY3Q6IGNvbm5lY3QsIHJlbmRlcjogcmVuZGVyIH0pO1xufVxuZnVuY3Rpb24gaW5pdFN0YXRlKCkge1xuICAgIHJldHVybiB7fTtcbn1cbmZ1bmN0aW9uIGNvbm5lY3QoX2EpIHtcbiAgICB2YXIgb24gPSBfYS5vbiwgcHJvcHMgPSBfYS5wcm9wcztcbiAgICB2YXIgc3RvcmUgPSBwcm9wcygpLmFwcFN0b3JlO1xuICAgIG9uKHN0b3JlLnN0YXRlLCBmdW5jdGlvbiAoc3RhdGUsIGFwcCkgeyByZXR1cm4gc3BhY2VfbGlmdF8xLnVwZGF0ZShzdGF0ZSwgeyBjb3VudDogYXBwLmJsdWUuY291bnQgfSk7IH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyKF9hKSB7XG4gICAgdmFyIHByb3BzID0gX2EucHJvcHMsIHN0YXRlID0gX2Euc3RhdGU7XG4gICAgdmFyIHJvdXRlciA9IHByb3BzLnJvdXRlciwgcm91dGUgPSBwcm9wcy5yb3V0ZSwgY2hpbGQgPSBwcm9wcy5jaGlsZDtcbiAgICByZXR1cm4gW1xuICAgICAgICBrYWlqdV8xLmgoJ2hlYWRlcicsIFtcbiAgICAgICAgICAgIGxpbmtfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgICAgICByb3V0ZXI6IHJvdXRlcixcbiAgICAgICAgICAgICAgICByb3V0ZTogcm91dGVyXzEucm91dGVzLmluZGV4LFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnSW5kZXgnLFxuICAgICAgICAgICAgICAgIGlzQWN0aXZlOiByb3V0ZS5pc0luKHJvdXRlcl8xLnJvdXRlcy5pbmRleClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbGlua18xLmRlZmF1bHQoe1xuICAgICAgICAgICAgICAgIHJvdXRlcjogcm91dGVyLFxuICAgICAgICAgICAgICAgIHJvdXRlOiByb3V0ZXJfMS5yb3V0ZXMuYmx1ZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHsgaWQ6ICczMycgfSxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0JsdWUnLFxuICAgICAgICAgICAgICAgIGlzQWN0aXZlOiByb3V0ZS5pc0luKHJvdXRlcl8xLnJvdXRlcy5ibHVlKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBTdHJpbmcoc3RhdGUuY291bnQpXG4gICAgICAgIF0pLFxuICAgICAgICBmYWRlXzEuZGVmYXVsdChjaGlsZCwgJ21haW4nKVxuICAgIF07XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy92aWV3L2FwcC9hcHAudHNcbi8vIG1vZHVsZSBpZCA9IDExNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhcHBfMSA9IHJlcXVpcmUoXCIuL2FwcFwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGFwcF8xLmRlZmF1bHQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy92aWV3L2FwcC9pbmRleC50c1xuLy8gbW9kdWxlIGlkID0gMTE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGthaWp1XzEgPSByZXF1aXJlKFwia2FpanVcIik7XG52YXIgcm91dGVyXzEgPSByZXF1aXJlKFwicm91dGVyXCIpO1xuZnVuY3Rpb24gcm91dGUoKSB7XG4gICAgcmV0dXJuIHJvdXRlcl8xLlJvdXRlRGVmKCdub3RGb3VuZCcsIHt9LCB7XG4gICAgICAgIGVudGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBrYWlqdV8xLmgoJ2gxJywgeyBrZXk6ICdub3RGb3VuZCcgfSwgJzQwNCA6LSgnKTsgfTsgfSxcbiAgICAgICAgY2hpbGRyZW46IHt9XG4gICAgfSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSByb3V0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYXBwL3JvdXRlTm90Rm91bmQudHNcbi8vIG1vZHVsZSBpZCA9IDExN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBzdHlsZXMgPSByZXF1aXJlKCcuL2JsdWUuc3R5bCcpO1xudmFyIGthaWp1XzEgPSByZXF1aXJlKFwia2FpanVcIik7XG52YXIgc3BhY2VfbGlmdF8xID0gcmVxdWlyZShcInNwYWNlLWxpZnRcIik7XG52YXIgc2xpZGVEb3duXzEgPSByZXF1aXJlKFwid2lkZ2V0L2FuaW1hdGlvbi9zaW5nbGUvc2xpZGVEb3duXCIpO1xudmFyIGdyZWVuXzEgPSByZXF1aXJlKFwidmlldy9ibHVlL2dyZWVuXCIpO1xudmFyIHJlZF8xID0gcmVxdWlyZShcInZpZXcvYmx1ZS9yZWRcIik7XG52YXIgc3RvcmVfMSA9IHJlcXVpcmUoXCJ2aWV3L2FwcC9zdG9yZVwiKTtcbnZhciByb3V0ZXJfMSA9IHJlcXVpcmUoXCJyb3V0ZXJcIik7XG52YXIgbGlua18xID0gcmVxdWlyZShcIndpZGdldC9saW5rXCIpO1xudmFyIHVzZXJTdG9yZV8xID0gcmVxdWlyZShcInZpZXcvYmx1ZS91c2VyU3RvcmVcIik7XG5mdW5jdGlvbiBibHVlUm91dGUoYXBwU3RvcmUpIHtcbiAgICB2YXIgdXNlclN0b3JlO1xuICAgIHJldHVybiByb3V0ZXJfMS5Sb3V0ZURlZignYmx1ZS86aWQnLCB7fSwge1xuICAgICAgICBlbnRlcjogZnVuY3Rpb24gKHJvdXRlcikge1xuICAgICAgICAgICAgdXNlclN0b3JlID0gdXNlclN0b3JlXzEuVXNlclN0b3JlKCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJvdXRlLCBjaGlsZCkgeyByZXR1cm4gYmx1ZSh7IGFwcFN0b3JlOiBhcHBTdG9yZSgpLCByb3V0ZXI6IHJvdXRlciwgcm91dGU6IHJvdXRlLCBjaGlsZDogY2hpbGQgfSk7IH07XG4gICAgICAgIH0sXG4gICAgICAgIGV4aXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHVzZXJTdG9yZS5kZXN0cm95KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuOiB7XG4gICAgICAgICAgICBncmVlbjogZ3JlZW5fMS5kZWZhdWx0KCksXG4gICAgICAgICAgICByZWQ6IHJlZF8xLmRlZmF1bHQoZnVuY3Rpb24gKCkgeyByZXR1cm4gdXNlclN0b3JlOyB9KVxuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBibHVlUm91dGU7XG5mdW5jdGlvbiBibHVlKHByb3BzKSB7XG4gICAgcmV0dXJuIGthaWp1XzEuQ29tcG9uZW50KHsgbmFtZTogJ2JsdWUnLCBwcm9wczogcHJvcHMsIGluaXRTdGF0ZTogaW5pdFN0YXRlLCBjb25uZWN0OiBjb25uZWN0LCByZW5kZXI6IHJlbmRlciB9KTtcbn1cbmZ1bmN0aW9uIGluaXRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb3VudDogdW5kZWZpbmVkXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNvbm5lY3QoX2EpIHtcbiAgICB2YXIgb24gPSBfYS5vbiwgcHJvcHMgPSBfYS5wcm9wcztcbiAgICB2YXIgYXBwU3RvcmUgPSBwcm9wcygpLmFwcFN0b3JlO1xuICAgIG9uKHN0b3JlXzEuaW5jcmVtZW50Q291bnRlciwgZnVuY3Rpb24gKF8pIHsgcmV0dXJuIGFwcFN0b3JlLnNlbmQoc3RvcmVfMS5pbmNyZW1lbnRDb3VudGVyKCkpOyB9KTtcbiAgICBvbihhcHBTdG9yZS5zdGF0ZSwgZnVuY3Rpb24gKHN0YXRlLCBhcHBTdGF0ZSkgeyByZXR1cm4gc3BhY2VfbGlmdF8xLnVwZGF0ZShzdGF0ZSwgeyBjb3VudDogYXBwU3RhdGUuYmx1ZS5jb3VudCB9KTsgfSk7XG59XG5mdW5jdGlvbiByZW5kZXIoX2EpIHtcbiAgICB2YXIgcHJvcHMgPSBfYS5wcm9wcywgc3RhdGUgPSBfYS5zdGF0ZTtcbiAgICB2YXIgcm91dGVyID0gcHJvcHMucm91dGVyLCByb3V0ZSA9IHByb3BzLnJvdXRlLCBjaGlsZCA9IHByb3BzLmNoaWxkO1xuICAgIHZhciBpZCA9IHJvdXRlLnBhcmFtcy5pZDtcbiAgICByZXR1cm4gW1xuICAgICAgICBrYWlqdV8xLmgoJ2gxJywgJ0JsdWUgc2NyZWVuJyksXG4gICAgICAgIGxpbmtfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIHJvdXRlcjogcm91dGVyLFxuICAgICAgICAgICAgcm91dGU6IHJvdXRlcl8xLnJvdXRlcy5ibHVlLmdyZWVuLFxuICAgICAgICAgICAgcGFyYW1zOiB7IGlkOiBpZCB9LFxuICAgICAgICAgICAgbGFiZWw6ICdHcmVlbicsXG4gICAgICAgICAgICBpc0FjdGl2ZTogcm91dGUuaXNJbihyb3V0ZXJfMS5yb3V0ZXMuYmx1ZS5ncmVlbilcbiAgICAgICAgfSksXG4gICAgICAgIGxpbmtfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIHJvdXRlcjogcm91dGVyLFxuICAgICAgICAgICAgcm91dGU6IHJvdXRlcl8xLnJvdXRlcy5ibHVlLnJlZCxcbiAgICAgICAgICAgIHBhcmFtczogeyBpZDogaWQgfSxcbiAgICAgICAgICAgIGxhYmVsOiAnUmVkJyxcbiAgICAgICAgICAgIGlzQWN0aXZlOiByb3V0ZS5pc0luKHJvdXRlcl8xLnJvdXRlcy5ibHVlLnJlZClcbiAgICAgICAgfSksXG4gICAgICAgIGthaWp1XzEuaChcImRpdi5cIiArIHN0eWxlcy5pbmNyZW1lbnQsIFtcbiAgICAgICAgICAgICdDb3VudDogJyArIHN0YXRlLmNvdW50LFxuICAgICAgICAgICAga2FpanVfMS5oKCdidXR0b24nLCB7IGV2ZW50czogeyBjbGljazogc3RvcmVfMS5pbmNyZW1lbnRDb3VudGVyIH0gfSwgJ0luY3JlbWVudCcpXG4gICAgICAgIF0pLFxuICAgICAgICBzbGlkZURvd25fMS5kZWZhdWx0KGNoaWxkLCAnc2VjdGlvbicpXG4gICAgXTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYmx1ZS9ibHVlLnRzXG4vLyBtb2R1bGUgaWQgPSAxMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc3R5bGVzID0gcmVxdWlyZSgnLi9ncmVlbi5zdHlsJyk7XG52YXIgbGlzdFN0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdC5zdHlsJyk7XG52YXIga2FpanVfMSA9IHJlcXVpcmUoXCJrYWlqdVwiKTtcbnZhciBzcGFjZV9saWZ0XzEgPSByZXF1aXJlKFwic3BhY2UtbGlmdFwiKTtcbnZhciBpY29uXzEgPSByZXF1aXJlKFwiaWNvblwiKTtcbnZhciBwb3B1cF8xID0gcmVxdWlyZShcIndpZGdldC9wb3B1cFwiKSwgUG9wdXAgPSBwb3B1cF8xO1xudmFyIGJ1dHRvbl8xID0gcmVxdWlyZShcIndpZGdldC9idXR0b25cIik7XG52YXIgZmFkZVNjYWxlXzEgPSByZXF1aXJlKFwid2lkZ2V0L2FuaW1hdGlvbi9ncm91cC9mYWRlU2NhbGVcIik7XG52YXIgcm91dGVyXzEgPSByZXF1aXJlKFwicm91dGVyXCIpO1xuZnVuY3Rpb24gcm91dGUoKSB7XG4gICAgcmV0dXJuIHJvdXRlcl8xLlJvdXRlRGVmKCdncmVlbj9wb3B1cCcsIHt9LCB7XG4gICAgICAgIGVudGVyOiBmdW5jdGlvbiAocm91dGVyKSB7IHJldHVybiBmdW5jdGlvbiAocm91dGUpIHsgcmV0dXJuIGdyZWVuKHsgcm91dGVyOiByb3V0ZXIsIHJvdXRlOiByb3V0ZSB9KTsgfTsgfSxcbiAgICAgICAgY2hpbGRyZW46IHt9XG4gICAgfSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSByb3V0ZTtcbmZ1bmN0aW9uIGdyZWVuKHByb3BzKSB7XG4gICAgcmV0dXJuIGthaWp1XzEuQ29tcG9uZW50KHsgbmFtZTogJ2dyZWVuJywgcHJvcHM6IHByb3BzLCBpbml0U3RhdGU6IGluaXRTdGF0ZSwgY29ubmVjdDogY29ubmVjdCwgcmVuZGVyOiByZW5kZXIgfSk7XG59XG5mdW5jdGlvbiBpbml0U3RhdGUocHJvcHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmb3JtOiB7fSxcbiAgICAgICAgcG9wdXBPcGVuZWQ6ICEhcHJvcHMucm91dGUucGFyYW1zLnBvcHVwXG4gICAgfTtcbn1cbnZhciBpbnB1dENoYW5nZWQgPSBrYWlqdV8xLk1lc3NhZ2UoJ2lucHV0Q2hhbmdlZCcpO1xudmFyIHNob3dQb3B1cCA9IGthaWp1XzEuTWVzc2FnZSgnc2hvd1BvcHVwJyk7XG52YXIgaGlkZVBvcHVwID0ga2FpanVfMS5NZXNzYWdlKCdoaWRlUG9wdXAnKTtcbmZ1bmN0aW9uIGNvbm5lY3QoX2EpIHtcbiAgICB2YXIgb24gPSBfYS5vbiwgcHJvcHMgPSBfYS5wcm9wcztcbiAgICB2YXIgcm91dGVyID0gcHJvcHMoKS5yb3V0ZXI7XG4gICAgb24oaW5wdXRDaGFuZ2VkLCBmdW5jdGlvbiAoc3RhdGUsIGV2dCkge1xuICAgICAgICB2YXIgX2EgPSBldnQudGFyZ2V0LCBuYW1lID0gX2EubmFtZSwgdmFsdWUgPSBfYS52YWx1ZTtcbiAgICAgICAgdmFyIG5ld0Zvcm0gPSBzcGFjZV9saWZ0XzEudXBkYXRlKHN0YXRlLmZvcm0sIChfYiA9IHt9LCBfYltuYW1lXSA9IHZhbHVlLCBfYikpO1xuICAgICAgICByZXR1cm4gc3BhY2VfbGlmdF8xLnVwZGF0ZShzdGF0ZSwgeyBmb3JtOiBuZXdGb3JtIH0pO1xuICAgICAgICB2YXIgX2I7XG4gICAgfSk7XG4gICAgb24oc2hvd1BvcHVwLCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIHBhcmFtcyA9IHNwYWNlX2xpZnRfMS51cGRhdGUocHJvcHMoKS5yb3V0ZS5wYXJhbXMsIHsgcG9wdXA6ICd0cnVlJyB9KTtcbiAgICAgICAgcm91dGVyLnJlcGxhY2VQYXJhbXMocGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHNwYWNlX2xpZnRfMS51cGRhdGUoc3RhdGUsIHsgcG9wdXBPcGVuZWQ6IHRydWUgfSk7XG4gICAgfSk7XG4gICAgb24oaGlkZVBvcHVwLCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIHBhcmFtcyA9IHNwYWNlX2xpZnRfMS51cGRhdGUocHJvcHMoKS5yb3V0ZS5wYXJhbXMsIHsgcG9wdXA6IHVuZGVmaW5lZCB9KTtcbiAgICAgICAgcm91dGVyLnJlcGxhY2VQYXJhbXMocGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHNwYWNlX2xpZnRfMS51cGRhdGUoc3RhdGUsIHsgcG9wdXBPcGVuZWQ6IGZhbHNlIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyKF9hKSB7XG4gICAgdmFyIHByb3BzID0gX2EucHJvcHMsIHN0YXRlID0gX2Euc3RhdGU7XG4gICAgdmFyIHJvdXRlID0gcHJvcHMucm91dGU7XG4gICAgdmFyIGZvcm0gPSBzdGF0ZS5mb3JtLCBwb3B1cE9wZW5lZCA9IHN0YXRlLnBvcHVwT3BlbmVkO1xuICAgIHZhciBmaXJzdE5hbWUgPSBmb3JtLmZpcnN0TmFtZSwgbGFzdE5hbWUgPSBmb3JtLmxhc3ROYW1lO1xuICAgIHZhciBwb3B1cEVsID0gcG9wdXBPcGVuZWQgPyBoZWxsb1BvcHVwKCkgOiAnJztcbiAgICByZXR1cm4gW1xuICAgICAgICBcIkdyZWVuIChyb3V0ZSBpZCA9IFwiICsgcm91dGUucGFyYW1zLmlkICsgXCIpXCIsXG4gICAgICAgIGthaWp1XzEuaCgnZm9ybScsIFtcbiAgICAgICAgICAgIGlucHV0KCdmaXJzdE5hbWUnLCBmaXJzdE5hbWUsIHRydWUpLFxuICAgICAgICAgICAgaW5wdXQoJ2xhc3ROYW1lJywgbGFzdE5hbWUpXG4gICAgICAgIF0pLFxuICAgICAgICBidXR0b25fMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogc3R5bGVzLnBvcHVwQnV0dG9uLFxuICAgICAgICAgICAgaWNvbjogaWNvbl8xLmVkaXRJY29uKCksXG4gICAgICAgICAgICBsYWJlbDogJ09wZW4gcG9wdXAnLFxuICAgICAgICAgICAgZXZlbnRzOiB7IG1vdXNlZG93bjogc2hvd1BvcHVwIH1cbiAgICAgICAgfSksXG4gICAgICAgIHBvcHVwRWxcbiAgICBdO1xufVxuZnVuY3Rpb24gaW5wdXQobmFtZSwgdmFsdWUsIHNob3VsZEF1dG9Gb2N1cykge1xuICAgIGlmIChzaG91bGRBdXRvRm9jdXMgPT09IHZvaWQgMCkgeyBzaG91bGRBdXRvRm9jdXMgPSBmYWxzZTsgfVxuICAgIHZhciBob29rID0gc2hvdWxkQXV0b0ZvY3VzXG4gICAgICAgID8geyBpbnNlcnQ6IGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBub2RlLmVsbS5mb2N1cygpOyB9IH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIChrYWlqdV8xLmgoJ2xhYmVsJywgW1xuICAgICAgICBuYW1lLFxuICAgICAgICBrYWlqdV8xLmgoXCJpbnB1dC5cIiArIHN0eWxlcy5pbnB1dCwge1xuICAgICAgICAgICAgcHJvcHM6IHsgbmFtZTogbmFtZSwgdmFsdWU6IHZhbHVlIH0sXG4gICAgICAgICAgICBob29rOiBob29rLFxuICAgICAgICAgICAgZXZlbnRzOiB7IGlucHV0OiBpbnB1dENoYW5nZWQgfVxuICAgICAgICB9LCAnJylcbiAgICBdKSk7XG59XG5mdW5jdGlvbiBoZWxsb1BvcHVwKCkge1xuICAgIHZhciBjb250ZW50ID0gW1xuICAgICAgICBrYWlqdV8xLmgoJ2gyJywgJ0hlbGxvJyksXG4gICAgICAgIGxpc3QoeyBpbml0aWFsSXRlbXM6IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF0gfSksXG4gICAgICAgIGthaWp1XzEuaCgnYnV0dG9uJywgeyBldmVudHM6IHsgY2xpY2s6IFBvcHVwLmNsb3NlIH0gfSwgJ0Nsb3NlJylcbiAgICBdO1xuICAgIHJldHVybiBwb3B1cF8xLmRlZmF1bHQoeyBjb250ZW50OiBjb250ZW50LCBvbkNsb3NlOiBoaWRlUG9wdXAgfSk7XG59XG52YXIgbGlzdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gaW5pdFN0YXRlKHByb3BzKSB7XG4gICAgICAgIHJldHVybiB7IGl0ZW1zOiBwcm9wcy5pbml0aWFsSXRlbXMgfTtcbiAgICB9XG4gICAgdmFyIGRlbGV0ZVJvdyA9IGthaWp1XzEuTWVzc2FnZSgnZGVsZXRlUm93Jyk7XG4gICAgZnVuY3Rpb24gY29ubmVjdChfYSkge1xuICAgICAgICB2YXIgb24gPSBfYS5vbjtcbiAgICAgICAgb24oZGVsZXRlUm93LCBmdW5jdGlvbiAoc3RhdGUsIF9hKSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gX2FbMF07XG4gICAgICAgICAgICByZXR1cm4gKHsgaXRlbXM6IHN0YXRlLml0ZW1zLmZpbHRlcihmdW5jdGlvbiAocikgeyByZXR1cm4gciAhPT0gcm93OyB9KSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlcihfYSkge1xuICAgICAgICB2YXIgc3RhdGUgPSBfYS5zdGF0ZTtcbiAgICAgICAgdmFyIGl0ZW1FbHMgPSBzdGF0ZS5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIChrYWlqdV8xLmgoJ2xpJywgeyBrZXk6IGl0ZW0gfSwgW1xuICAgICAgICAgICAga2FpanVfMS5oKCdzcGFuJywgU3RyaW5nKGl0ZW0pKSxcbiAgICAgICAgICAgIGthaWp1XzEuaCgnaW5wdXQnLCB7IHByb3BzOiB7IHZhbHVlOiAnYmxhJyB9IH0pLFxuICAgICAgICAgICAga2FpanVfMS5oKCdidXR0b24nLCB7IGV2ZW50czogeyBjbGljazogZGVsZXRlUm93LndpdGgoaXRlbSkgfSB9LCAn4pyVJylcbiAgICAgICAgXSkpOyB9KTtcbiAgICAgICAgcmV0dXJuIGZhZGVTY2FsZV8xLmRlZmF1bHQoaXRlbUVscywgXCJ1bC5cIiArIGxpc3RTdHlsZXMubGlzdCk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIGthaWp1XzEuQ29tcG9uZW50KHsgbmFtZTogJ2xpc3QnLCBpbml0U3RhdGU6IGluaXRTdGF0ZSwgY29ubmVjdDogY29ubmVjdCwgcHJvcHM6IHByb3BzLCByZW5kZXI6IHJlbmRlciB9KTtcbiAgICB9O1xufSkoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYmx1ZS9ncmVlbi9ncmVlbi50c1xuLy8gbW9kdWxlIGlkID0gMTE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGdyZWVuXzEgPSByZXF1aXJlKFwiLi9ncmVlblwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdyZWVuXzEuZGVmYXVsdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYmx1ZS9ncmVlbi9pbmRleC50c1xuLy8gbW9kdWxlIGlkID0gMTIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJsdWVfMSA9IHJlcXVpcmUoXCIuL2JsdWVcIik7XG5leHBvcnRzLmRlZmF1bHQgPSBibHVlXzEuZGVmYXVsdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYmx1ZS9pbmRleC50c1xuLy8gbW9kdWxlIGlkID0gMTIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJlZF8xID0gcmVxdWlyZShcIi4vcmVkXCIpO1xuZXhwb3J0cy5kZWZhdWx0ID0gcmVkXzEuZGVmYXVsdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYmx1ZS9yZWQvaW5kZXgudHNcbi8vIG1vZHVsZSBpZCA9IDEyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBzdHlsZXMgPSByZXF1aXJlKCcuL3JlZC5zdHlsJyk7XG52YXIgc3BhY2VfbGlmdF8xID0gcmVxdWlyZShcInNwYWNlLWxpZnRcIik7XG52YXIga2FpanVfMSA9IHJlcXVpcmUoXCJrYWlqdVwiKTtcbnZhciByb3V0ZXJfMSA9IHJlcXVpcmUoXCJyb3V0ZXJcIik7XG52YXIgdXNlclN0b3JlXzEgPSByZXF1aXJlKFwidmlldy9ibHVlL3VzZXJTdG9yZVwiKTtcbnZhciBzZWxlY3RfMSA9IHJlcXVpcmUoXCJ3aWRnZXQvc2VsZWN0XCIpO1xudmFyIHJlbW90ZURhdGFfMSA9IHJlcXVpcmUoXCJ1dGlsL3JlbW90ZURhdGFcIik7XG5mdW5jdGlvbiByb3V0ZSh1c2VyU3RvcmUpIHtcbiAgICByZXR1cm4gcm91dGVyXzEuUm91dGVEZWYoJ3JlZCcsIHt9LCB7XG4gICAgICAgIGVudGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWQoeyB1c2VyU3RvcmU6IHVzZXJTdG9yZSgpIH0pOyB9OyB9LFxuICAgICAgICBjaGlsZHJlbjoge31cbiAgICB9KTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHJvdXRlO1xuZnVuY3Rpb24gcmVkKHByb3BzKSB7XG4gICAgcmV0dXJuIGthaWp1XzEuQ29tcG9uZW50KHsgc2VsOiBcImNvbXBvbmVudC5cIiArIHN0eWxlcy5yZWQsIG5hbWU6ICdyZWQnLCBwcm9wczogcHJvcHMsIGluaXRTdGF0ZTogaW5pdFN0YXRlLCBjb25uZWN0OiBjb25uZWN0LCByZW5kZXI6IHJlbmRlciB9KTtcbn1cbmZ1bmN0aW9uIGluaXRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB1c2VyczogdW5kZWZpbmVkLFxuICAgICAgICBwYWdpbmF0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgIHNlbGVjdGVkVXNlcjogdW5kZWZpbmVkXG4gICAgfTtcbn1cbnZhciB1c2VyQ2hhbmdlID0ga2FpanVfMS5NZXNzYWdlKCd1c2VyQ2hhbmdlJyk7XG5mdW5jdGlvbiBjb25uZWN0KF9hKSB7XG4gICAgdmFyIG9uID0gX2Eub24sIHByb3BzID0gX2EucHJvcHM7XG4gICAgdmFyIHVzZXJTdG9yZSA9IHByb3BzKCkudXNlclN0b3JlO1xuICAgIG9uKHVzZXJTdG9yZS5zdGF0ZSwgZnVuY3Rpb24gKHN0YXRlLCBfYSkge1xuICAgICAgICB2YXIgdXNlcnMgPSBfYS51c2VycywgcGFnaW5hdGlvbiA9IF9hLnBhZ2luYXRpb247XG4gICAgICAgIHJldHVybiBzcGFjZV9saWZ0XzEudXBkYXRlKHN0YXRlLCB7IHVzZXJzOiB1c2VycywgcGFnaW5hdGlvbjogcGFnaW5hdGlvbiB9KTtcbiAgICB9KTtcbiAgICBvbih1c2VyU3RvcmVfMS5yZWxvYWRVc2VycywgZnVuY3Rpb24gKF8pIHsgcmV0dXJuIHVzZXJTdG9yZS5zZW5kKHVzZXJTdG9yZV8xLnJlbG9hZFVzZXJzKCkpOyB9KTtcbiAgICBvbih1c2VyU3RvcmVfMS5sb2FkTmV4dFVzZXJQYWdlLCBmdW5jdGlvbiAoXykgeyByZXR1cm4gdXNlclN0b3JlLnNlbmQodXNlclN0b3JlXzEubG9hZE5leHRVc2VyUGFnZSgpKTsgfSk7XG4gICAgb24odXNlckNoYW5nZSwgZnVuY3Rpb24gKHN0YXRlLCB1c2VyKSB7IHJldHVybiBzcGFjZV9saWZ0XzEudXBkYXRlKHN0YXRlLCB7IHNlbGVjdGVkVXNlcjogdXNlciB9KTsgfSk7XG59XG5mdW5jdGlvbiByZW5kZXIoX2EpIHtcbiAgICB2YXIgc3RhdGUgPSBfYS5zdGF0ZTtcbiAgICB2YXIgc2VsZWN0ZWRVc2VyID0gc3RhdGUuc2VsZWN0ZWRVc2VyLCB1c2VycyA9IHN0YXRlLnVzZXJzLCBwYWdpbmF0aW9uID0gc3RhdGUucGFnaW5hdGlvbjtcbiAgICB2YXIgX2IgPSByZW1vdGVEYXRhXzEudW5wYWNrKHVzZXJzKSwgX2MgPSBfYi5kYXRhLCBkYXRhID0gX2MgPT09IHZvaWQgMCA/IFtdIDogX2MsIGxvYWRpbmcgPSBfYi5sb2FkaW5nO1xuICAgIHJldHVybiBbXG4gICAgICAgIGthaWp1XzEuaCgnYnV0dG9uJywgeyBldmVudHM6IHsgY2xpY2s6IHVzZXJTdG9yZV8xLnJlbG9hZFVzZXJzIH0gfSwgJ1JlZnJlc2ggc2VsZWN0IGxpc3QnKSxcbiAgICAgICAga2FpanVfMS5oKCdicicpLFxuICAgICAgICBzZWxlY3RfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIGl0ZW1zOiBkYXRhLFxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtOiBzZWxlY3RlZFVzZXIsXG4gICAgICAgICAgICBvbkNoYW5nZTogdXNlckNoYW5nZSxcbiAgICAgICAgICAgIGxvYWRpbmc6IGxvYWRpbmcsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiBwYWdpbmF0aW9uXG4gICAgICAgIH0pXG4gICAgXTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXcvYmx1ZS9yZWQvcmVkLnRzXG4vLyBtb2R1bGUgaWQgPSAxMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIga2FpanVfMSA9IHJlcXVpcmUoXCJrYWlqdVwiKTtcbnZhciByb3V0ZXJfMSA9IHJlcXVpcmUoXCJyb3V0ZXJcIik7XG5mdW5jdGlvbiByb3V0ZSgpIHtcbiAgICByZXR1cm4gcm91dGVyXzEuUm91dGVEZWYoJycsIHt9LCB7XG4gICAgICAgIGVudGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBrYWlqdV8xLmgoJ2gxJywgJ0luZGV4Jyk7IH07IH0sXG4gICAgICAgIGNoaWxkcmVuOiB7fVxuICAgIH0pO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gcm91dGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy92aWV3L2luZGV4LnRzXG4vLyBtb2R1bGUgaWQgPSAxMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc3R5bGVzID0gcmVxdWlyZSgnLi9mYWRlU2NhbGUuc3R5bCcpO1xudmFyIGdyb3VwQW5pbWF0aW9uXzEgPSByZXF1aXJlKFwid2lkZ2V0L2FuaW1hdGlvbi9ncm91cC9ncm91cEFuaW1hdGlvblwiKTtcbnZhciBmYWRlU2NhbGUgPSB7XG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICAgIGVsbS5jbGFzc0xpc3QucmVtb3ZlKHN0eWxlcy5mYWRlU2NhbGVPdXQpO1xuICAgICAgICBlbG0uY2xhc3NMaXN0LnJlbW92ZShzdHlsZXMuZmFkZVNjYWxlSW4pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoZWxtLCBjYikge1xuICAgICAgICBlbG0uY2xhc3NMaXN0LnJlbW92ZShzdHlsZXMuZmFkZVNjYWxlSW4pO1xuICAgICAgICBlbG0uY2xhc3NMaXN0LmFkZChzdHlsZXMuZmFkZVNjYWxlT3V0KTtcbiAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGNiKTtcbiAgICB9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZ3JvdXBBbmltYXRpb25fMS5kZWZhdWx0KGZhZGVTY2FsZSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93aWRnZXQvYW5pbWF0aW9uL2dyb3VwL2ZhZGVTY2FsZS9pbmRleC50c1xuLy8gbW9kdWxlIGlkID0gMTI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGthaWp1XzEgPSByZXF1aXJlKFwia2FpanVcIik7XG52YXIgc3BhY2VfbGlmdF8xID0gcmVxdWlyZShcInNwYWNlLWxpZnRcIik7XG4vKipcbiAqIENvbnRhaW5lciBhbmltYXRpbmcgaXRzIGNoaWxkcmVuIGluIGFuZCBvdXQuXG4gKiBjaGlsZHJlbiBtdXN0IGhhdmUga2V5cyB0byBiZSBwcm9wZXJseSBkaWZmZXJlbnRpYXRlZC5cbiAqIFRoZSBleGl0IGFuZCBlbnRlciBhbmltYXRpb25zIHJ1biBpbiBwYXJhbGxlbC5cbiAqL1xuZnVuY3Rpb24gYW5pbWF0ZShhbmltYXRpb25zKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjaGlsZHJlbiwgc2VsKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IHtcbiAgICAgICAgICAgIGtleTogJ2dyb3VwQW5pbWF0aW9uJyxcbiAgICAgICAgICAgIGFuaW1hdGlvbnM6IGFuaW1hdGlvbnMsXG4gICAgICAgICAgICBob29rOiB7IHByZXBhdGNoOiBwcmVwYXRjaCB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBrYWlqdV8xLmgoc2VsLCBwcm9wcywgY2hpbGRyZW4pO1xuICAgIH07XG59XG5leHBvcnRzLmRlZmF1bHQgPSBhbmltYXRlO1xuZnVuY3Rpb24gcHJlcGF0Y2gob2xkVk5vZGUsIG5ld1ZOb2RlKSB7XG4gICAgdmFyIGFuaW1hdGlvbnMgPSBuZXdWTm9kZS5kYXRhLmFuaW1hdGlvbnM7XG4gICAgdmFyIG9sZENoaWxkcmVuID0gb2xkVk5vZGUuY2hpbGRyZW4gfHwgW107XG4gICAgdmFyIG5ld0NoaWxkcmVuID0gbmV3Vk5vZGUuY2hpbGRyZW4gfHwgW107XG4gICAgdmFyIG9sZEtleXMgPSBzcGFjZV9saWZ0XzEuZGVmYXVsdChvbGRDaGlsZHJlbikubWFwKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmtleSB8fCAnJzsgfSkudG9TZXQoKS52YWx1ZSgpO1xuICAgIHZhciBuZXdLZXlzID0gc3BhY2VfbGlmdF8xLmRlZmF1bHQobmV3Q2hpbGRyZW4pLm1hcChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5rZXkgfHwgJyc7IH0pLnRvU2V0KCkudmFsdWUoKTtcbiAgICAvLyBjaGlsZHJlbiBtYWtpbmcgYW4gZXhpdFxuICAgIG9sZENoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgIGlmIChuZXdLZXlzW2NoaWxkLmtleSB8fCAnJ10pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNoaWxkLmRhdGEuaG9vayA9IGNoaWxkLmRhdGEuaG9vayB8fCB7fTtcbiAgICAgICAgdmFyIG90aGVySG9vayA9IGNoaWxkLmRhdGEuaG9vay5yZW1vdmU7XG4gICAgICAgIGNoaWxkLmRhdGEuaG9vay5yZW1vdmUgPSBmdW5jdGlvbiAodm5vZGUsIGNiKSB7XG4gICAgICAgICAgICBpZiAob3RoZXJIb29rKVxuICAgICAgICAgICAgICAgIG90aGVySG9vayh2bm9kZSwgbm9vcCk7XG4gICAgICAgICAgICBhbmltYXRpb25zLnJlbW92ZSh2bm9kZS5lbG0sIGNiKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICAvLyBjaGlsZHJlbiBtYWtpbmcgYW4gZW50cmFuY2VcbiAgICBuZXdDaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICBpZiAob2xkS2V5c1tjaGlsZC5rZXkgfHwgJyddKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjaGlsZC5kYXRhLmhvb2sgPSBjaGlsZC5kYXRhLmhvb2sgfHwge307XG4gICAgICAgIHZhciBvdGhlckhvb2sgPSBjaGlsZC5kYXRhLmhvb2suY3JlYXRlO1xuICAgICAgICBjaGlsZC5kYXRhLmhvb2suY3JlYXRlID0gZnVuY3Rpb24gKGVtcHR5Tm9kZSwgdm5vZGUpIHtcbiAgICAgICAgICAgIGlmIChvdGhlckhvb2spXG4gICAgICAgICAgICAgICAgb3RoZXJIb29rKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgYW5pbWF0aW9ucy5jcmVhdGUodm5vZGUuZWxtKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG5vb3AoKSB7IH1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dpZGdldC9hbmltYXRpb24vZ3JvdXAvZ3JvdXBBbmltYXRpb24udHNcbi8vIG1vZHVsZSBpZCA9IDEyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBzdHlsZXMgPSByZXF1aXJlKCcuL2ZhZGUuc3R5bCcpO1xudmFyIHNpbmdsZUFuaW1hdGlvbl8xID0gcmVxdWlyZShcIndpZGdldC9hbmltYXRpb24vc2luZ2xlL3NpbmdsZUFuaW1hdGlvblwiKTtcbnZhciBmYWRlID0ge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24gKGVsbSkge1xuICAgICAgICBlbG0uY2xhc3NMaXN0LnJlbW92ZShzdHlsZXMuZmFkZW91dCk7XG4gICAgICAgIGVsbS5jbGFzc0xpc3QuYWRkKHN0eWxlcy5mYWRlaW4pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoZWxtLCBjYikge1xuICAgICAgICBlbG0uY2xhc3NMaXN0LnJlbW92ZShzdHlsZXMuZmFkZWluKTtcbiAgICAgICAgZWxtLmNsYXNzTGlzdC5hZGQoc3R5bGVzLmZhZGVvdXQpO1xuICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgY2IpO1xuICAgIH1cbn07XG5leHBvcnRzLmRlZmF1bHQgPSBzaW5nbGVBbmltYXRpb25fMS5kZWZhdWx0KGZhZGUpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2lkZ2V0L2FuaW1hdGlvbi9zaW5nbGUvZmFkZS9pbmRleC50c1xuLy8gbW9kdWxlIGlkID0gMTI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHN0eWxlcyA9IHJlcXVpcmUoJy4vc2xpZGVEb3duLnN0eWwnKTtcbnZhciBzaW5nbGVBbmltYXRpb25fMSA9IHJlcXVpcmUoXCJ3aWRnZXQvYW5pbWF0aW9uL3NpbmdsZS9zaW5nbGVBbmltYXRpb25cIik7XG52YXIgc2xpZGVEb3duID0ge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24gKGVsbSkge1xuICAgICAgICBlbG0uY2xhc3NMaXN0LmFkZChzdHlsZXMuc2xpZGVEb3duKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gKF8sIGNiKSB7XG4gICAgICAgIGNiKCk7XG4gICAgfVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNpbmdsZUFuaW1hdGlvbl8xLmRlZmF1bHQoc2xpZGVEb3duKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dpZGdldC9hbmltYXRpb24vc2luZ2xlL3NsaWRlRG93bi9pbmRleC50c1xuLy8gbW9kdWxlIGlkID0gMTI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHN0eWxlcyA9IHJlcXVpcmUoJy4vYnV0dG9uLnN0eWwnKTtcbnZhciBrYWlqdV8xID0gcmVxdWlyZShcImthaWp1XCIpO1xudmFyIHZub2RlXzEgPSByZXF1aXJlKFwidXRpbC92bm9kZVwiKTtcbmZ1bmN0aW9uIGJ1dHRvbihfYSkge1xuICAgIHZhciBpY29uID0gX2EuaWNvbiwgbGFiZWwgPSBfYS5sYWJlbCwgX2IgPSBfYS5jbGFzc05hbWUsIGNsYXNzTmFtZSA9IF9iID09PSB2b2lkIDAgPyAnJyA6IF9iLCBldmVudHMgPSBfYS5ldmVudHM7XG4gICAgcmV0dXJuIGthaWp1XzEuaChcImJ1dHRvbi5cIiArIGNsYXNzTmFtZSwgeyBldmVudHM6IGV2ZW50cyB9LCBbXG4gICAgICAgIGljb24gJiYgdm5vZGVfMS5hZGRDbGFzc05hbWUoaWNvbiwgc3R5bGVzLmljb24pIHx8ICcnLFxuICAgICAgICBsYWJlbCB8fCAnJ1xuICAgIF0pO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gYnV0dG9uO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2lkZ2V0L2J1dHRvbi9idXR0b24udHNcbi8vIG1vZHVsZSBpZCA9IDEyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBidXR0b25fMSA9IHJlcXVpcmUoXCIuL2J1dHRvblwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGJ1dHRvbl8xLmRlZmF1bHQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93aWRnZXQvYnV0dG9uL2luZGV4LnRzXG4vLyBtb2R1bGUgaWQgPSAxMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc3R5bGVzID0gcmVxdWlyZSgnLi9saW5rLnN0eWwnKTtcbnZhciBrYWlqdV8xID0gcmVxdWlyZShcImthaWp1XCIpO1xuZnVuY3Rpb24gbGluayhfYSkge1xuICAgIHZhciByb3V0ZXIgPSBfYS5yb3V0ZXIsIHJvdXRlID0gX2Eucm91dGUsIHBhcmFtcyA9IF9hLnBhcmFtcywgbGFiZWwgPSBfYS5sYWJlbCwgX2IgPSBfYS5pc0FjdGl2ZSwgaXNBY3RpdmUgPSBfYiA9PT0gdm9pZCAwID8gZmFsc2UgOiBfYjtcbiAgICB2YXIgaHJlZiA9IHJvdXRlci5saW5rKHJvdXRlLCBwYXJhbXMpO1xuICAgIHJldHVybiAoa2FpanVfMS5oKCdhJywge1xuICAgICAgICBjbGFzczogKF9jID0ge30sIF9jW3N0eWxlcy5saW5rXSA9IHRydWUsIF9jW3N0eWxlcy5hY3RpdmVdID0gaXNBY3RpdmUsIF9jKSxcbiAgICAgICAgYXR0cnM6IHsgaHJlZjogaHJlZiwgJ2RhdGEtbmF2JzogJ21vdXNlZG93bicgfVxuICAgIH0sIGxhYmVsKSk7XG4gICAgdmFyIF9jO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gbGluaztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dpZGdldC9saW5rL2xpbmsudHNcbi8vIG1vZHVsZSBpZCA9IDEzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBsb2FkZXJfMSA9IHJlcXVpcmUoXCIuL2xvYWRlclwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxvYWRlcl8xLmRlZmF1bHQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93aWRnZXQvbG9hZGVyL2luZGV4LnRzXG4vLyBtb2R1bGUgaWQgPSAxMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc3R5bGVzID0gcmVxdWlyZSgnLi9sb2FkZXIuc3R5bCcpO1xudmFyIGthaWp1XzEgPSByZXF1aXJlKFwia2FpanVcIik7XG52YXIgc2VsID0gXCJkaXYuXCIgKyBzdHlsZXMubG9hZGVyO1xuZnVuY3Rpb24gZGVmYXVsdF8xKCkge1xuICAgIHJldHVybiBrYWlqdV8xLmgoc2VsKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRfMTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dpZGdldC9sb2FkZXIvbG9hZGVyLnRzXG4vLyBtb2R1bGUgaWQgPSAxMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcG9wdXBfMSA9IHJlcXVpcmUoXCIuL3BvcHVwXCIpO1xuZXhwb3J0cy5kZWZhdWx0ID0gcG9wdXBfMS5kZWZhdWx0O1xuZXhwb3J0cy5jbG9zZSA9IHBvcHVwXzEuY2xvc2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93aWRnZXQvcG9wdXAvaW5kZXgudHNcbi8vIG1vZHVsZSBpZCA9IDEzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBzdHlsZXMgPSByZXF1aXJlKCcuL3BvcHVwLnN0eWwnKTtcbnZhciBrYWlqdV8xID0gcmVxdWlyZShcImthaWp1XCIpO1xudmFyIG9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCJrYWlqdS9vYnNlcnZhYmxlXCIpO1xudmFyIGRvbV8xID0gcmVxdWlyZShcInV0aWwvZG9tXCIpO1xuLy8gUG9wdXBzIGFyZSByZW5kZXJlZCBpbiB0aGVpciBvd24gdG9wLWxldmVsIGNvbnRhaW5lciBmb3IgY2xlYW4gc2VwYXJhdGlvbiBvZiBsYXllcnMuXG52YXIgcG9wdXBMYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cExheWVyJyk7XG5mdW5jdGlvbiBkZWZhdWx0XzEocHJvcHMpIHtcbiAgICByZXR1cm4ga2FpanVfMS5Db21wb25lbnQoeyBuYW1lOiAncG9wdXAnLCBwcm9wczogcHJvcHMsIGluaXRTdGF0ZTogaW5pdFN0YXRlLCBjb25uZWN0OiBjb25uZWN0LCByZW5kZXI6IHJlbmRlciB9KTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRfMTtcbmZ1bmN0aW9uIGluaXRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge307XG59XG4vKiogVXNlZCBpbiB0aGUgcG9wdXAgRE9NIGNvbnRlbnQuIFJlcXVlc3RzIHRoZSBwb3B1cCdzIHBhcmVudCB0byBjbG9zZSBpdCAqL1xuZXhwb3J0cy5jbG9zZSA9IGthaWp1XzEuTWVzc2FnZSgnY2xvc2UnKTtcbnZhciBvdmVybGF5Q2xpY2sgPSBrYWlqdV8xLk1lc3NhZ2UoJ292ZXJsYXlDbGljaycpO1xuLy8gTGlzdGVuIGZvciBtZXNzYWdlcyBpbnNpZGUgdGhlIHBvcHVwIGNvbnRhaW5lciwgYW5kIHJlZGlzcGF0Y2ggYXQgdGhlIFBvcHVwIGxhdW5jaGVyIGxldmVsLlxuZnVuY3Rpb24gY29ubmVjdChfYSkge1xuICAgIHZhciBvbiA9IF9hLm9uLCBwcm9wcyA9IF9hLnByb3BzLCBtc2cgPSBfYS5tc2c7XG4gICAgdmFyIHJlcXVlc3RDbG9zZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1zZy5zZW5kVG9QYXJlbnQocHJvcHMoKS5vbkNsb3NlKCkpOyB9O1xuICAgIG9uKG1zZy5saXN0ZW5BdChwb3B1cExheWVyKSwgZnVuY3Rpb24gKF8sIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UuaXMoZXhwb3J0cy5jbG9zZSkpXG4gICAgICAgICAgICByZXF1ZXN0Q2xvc2UoKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UuaXMob3ZlcmxheUNsaWNrKSkge1xuICAgICAgICAgICAgaWYgKCFkb21fMS5maW5kUGFyZW50QnlBdHRyKCdkYXRhLXBvcHVwJywgbWVzc2FnZS5wYXlsb2FkLnRhcmdldCkpXG4gICAgICAgICAgICAgICAgcmVxdWVzdENsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBvbihvYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5mcm9tRXZlbnQoJ2tleWRvd24nLCB3aW5kb3cpLCBmdW5jdGlvbiAoXywgZXZ0KSB7XG4gICAgICAgIGlmIChldnQua2V5Q29kZSA9PT0gMjcpXG4gICAgICAgICAgICByZXF1ZXN0Q2xvc2UoKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlcihfYSkge1xuICAgIHZhciBwcm9wcyA9IF9hLnByb3BzO1xuICAgIHZhciBjb250ZW50ID0gcHJvcHMuY29udGVudDtcbiAgICByZXR1cm4gKGthaWp1XzEuaCgnZGl2Jywge1xuICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICBob29rOiB7IGluc2VydDogaW5zZXJ0LCBwb3N0cGF0Y2g6IHBvc3RwYXRjaCwgZGVzdHJveTogZGVzdHJveSB9XG4gICAgfSkpO1xufVxuZnVuY3Rpb24gaW5zZXJ0KHZub2RlKSB7XG4gICAgdmFyIHBvcHVwID0gdm5vZGUuZGF0YS5fcG9wdXAgPSBwb3B1cFdpdGhDb250ZW50KHZub2RlLmRhdGEuY29udGVudCk7XG4gICAga2FpanVfMS5SZW5kZXIuaW50byhwb3B1cExheWVyLCBwb3B1cCk7XG59XG5mdW5jdGlvbiBwb3N0cGF0Y2gob2xkVk5vZGUsIHZub2RlKSB7XG4gICAgdmFyIG9sZFBvcHVwID0gb2xkVk5vZGUuZGF0YS5fcG9wdXA7XG4gICAgdmFyIG5ld1BvcHVwID0gcG9wdXBXaXRoQ29udGVudCh2bm9kZS5kYXRhLmNvbnRlbnQpO1xuICAgIHZub2RlLmRhdGEuX3BvcHVwID0gbmV3UG9wdXA7XG4gICAga2FpanVfMS5SZW5kZXIuaW50byhvbGRQb3B1cCwgbmV3UG9wdXApO1xufVxudmFyIGVtcHR5Vk5vZGUgPSBrYWlqdV8xLmgoJ2RpdicpO1xuZnVuY3Rpb24gZGVzdHJveSh2bm9kZSkge1xuICAgIGthaWp1XzEuUmVuZGVyLmludG8odm5vZGUuZGF0YS5fcG9wdXAsIGVtcHR5Vk5vZGUpO1xufVxuZnVuY3Rpb24gcG9wdXBXaXRoQ29udGVudChjb250ZW50KSB7XG4gICAgcmV0dXJuIChrYWlqdV8xLmgoXCJkaXYuXCIgKyBzdHlsZXMub3ZlcmxheSwge1xuICAgICAgICBrZXk6ICdwb3B1cC1jb250ZW50JyxcbiAgICAgICAgaG9vazogeyBpbnNlcnQ6IGthaWp1XzEuUmVuZGVyLmlzRmlyc3QoKSA/IHVuZGVmaW5lZCA6IGluc2VydEFuaW1hdGlvbiwgcmVtb3ZlOiByZW1vdmVBbmltYXRpb24gfSxcbiAgICAgICAgZXZlbnRzOiB7IGNsaWNrOiBvdmVybGF5Q2xpY2sgfVxuICAgIH0sIFtcbiAgICAgICAga2FpanVfMS5oKFwiZGl2LlwiICsgc3R5bGVzLnBvcHVwLCB7XG4gICAgICAgICAgICBhdHRyczogeyAnZGF0YS1wb3B1cCc6IHRydWUgfVxuICAgICAgICB9LCBjb250ZW50KVxuICAgIF0pKTtcbn1cbnZhciBpbnNlcnRBbmltYXRpb24gPSBmdW5jdGlvbiAodm5vZGUpIHtcbiAgICB2YXIgcG9wdXAgPSB2bm9kZS5lbG0uZmlyc3RDaGlsZDtcbiAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKHN0eWxlcy5pbnNlcnRBbmltYXRpb24pO1xufTtcbnZhciByZW1vdmVBbmltYXRpb24gPSBmdW5jdGlvbiAodm5vZGUsIGNiKSB7XG4gICAgdmFyIG92ZXJsYXkgPSB2bm9kZS5lbG07XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKHN0eWxlcy5yZW1vdmVBbmltYXRpb24pO1xuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYigpO1xuICAgICAgICBwb3B1cExheWVyLnJlbW92ZUNoaWxkKHBvcHVwTGF5ZXIuZmlyc3RDaGlsZCk7XG4gICAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2lkZ2V0L3BvcHVwL3BvcHVwLnRzXG4vLyBtb2R1bGUgaWQgPSAxMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc2Nyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL3Njcm9sbGVyXCIpO1xuZXhwb3J0cy5kZWZhdWx0ID0gc2Nyb2xsZXJfMS5kZWZhdWx0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2lkZ2V0L3Njcm9sbGVyL2luZGV4LnRzXG4vLyBtb2R1bGUgaWQgPSAxMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIga2FpanVfMSA9IHJlcXVpcmUoXCJrYWlqdVwiKTtcbnZhciBvYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwia2FpanUvb2JzZXJ2YWJsZVwiKTtcbnZhciBvcHRpb25fdHNfMSA9IHJlcXVpcmUoXCJvcHRpb24udHNcIik7XG5mdW5jdGlvbiBkZWZhdWx0XzEocHJvcHMpIHtcbiAgICByZXR1cm4ga2FpanVfMS5Db21wb25lbnQoeyBuYW1lOiAnaW5maW5pdGVTY3JvbGwnLCBwcm9wczogcHJvcHMsIGluaXRTdGF0ZTogaW5pdFN0YXRlLCBjb25uZWN0OiBjb25uZWN0LCByZW5kZXI6IHJlbmRlciB9KTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRfMTtcbmZ1bmN0aW9uIGluaXRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge307XG59XG52YXIgc2V0U2Nyb2xsZXIgPSBrYWlqdV8xLk1lc3NhZ2UoJ3NldFNjcm9sbGVyJyk7XG52YXIgbG9jYWxseVNjcm9sbGVkID0ga2FpanVfMS5NZXNzYWdlKCdsb2NhbGx5U2Nyb2xsZWQnKTtcbnZhciBzY3JvbGxDaGFuZ2VkID0ga2FpanVfMS5NZXNzYWdlKCdzY3JvbGxDaGFuZ2VkJyk7XG5mdW5jdGlvbiBjb25uZWN0KF9hKSB7XG4gICAgdmFyIG9uID0gX2Eub24sIHByb3BzID0gX2EucHJvcHMsIG1zZyA9IF9hLm1zZztcbiAgICB2YXIgc2Nyb2xsZXI7XG4gICAgdmFyIG9uU2Nyb2xsQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1zZy5zZW5kKHNjcm9sbENoYW5nZWQoKSk7IH07XG4gICAgb3B0aW9uX3RzXzEuT3B0aW9uKHByb3BzKCkuc2Nyb2xsT3duZXIpLm1hdGNoKHtcbiAgICAgICAgU29tZTogZnVuY3Rpb24gKHNjcm9sbE93bmVyKSB7XG4gICAgICAgICAgICBzY3JvbGxlciA9IHNjcm9sbE93bmVyO1xuICAgICAgICAgICAgb25TY3JvbGxDaGFuZ2VkKCk7XG4gICAgICAgICAgICBvbihvYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5mcm9tRXZlbnQoJ3Njcm9sbCcsIHNjcm9sbE93bmVyKS5kZWJvdW5jZSg2MCksIG9uU2Nyb2xsQ2hhbmdlZCk7XG4gICAgICAgIH0sXG4gICAgICAgIE5vbmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9uKHNldFNjcm9sbGVyLCBmdW5jdGlvbiAoXywgbG9jYWxTY3JvbGxlcikge1xuICAgICAgICAgICAgICAgIHNjcm9sbGVyID0gbG9jYWxTY3JvbGxlcjtcbiAgICAgICAgICAgICAgICBvblNjcm9sbENoYW5nZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb24obXNnLmxpc3Rlbihsb2NhbGx5U2Nyb2xsZWQpLmRlYm91bmNlKDYwKSwgb25TY3JvbGxDaGFuZ2VkKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIG9uKG9ic2VydmFibGVfMS5PYnNlcnZhYmxlLmZyb21FdmVudCgncmVzaXplJywgd2luZG93KS5kZWJvdW5jZSg2MDApLCBvblNjcm9sbENoYW5nZWQpO1xuICAgIG9uKHNjcm9sbENoYW5nZWQsIGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIHZhciBfYSA9IHByb3BzKCksIF9iID0gX2EudHJlc2hvbGQsIHRyZXNob2xkID0gX2IgPT09IHZvaWQgMCA/IDIwMCA6IF9iLCBoYXNNb3JlID0gX2EuaGFzTW9yZSwgaXNMb2FkaW5nTW9yZSA9IF9hLmlzTG9hZGluZ01vcmUsIGxvYWRNb3JlID0gX2EubG9hZE1vcmU7XG4gICAgICAgIGlmICghc2Nyb2xsZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICghaGFzTW9yZSB8fCBpc0xvYWRpbmdNb3JlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgcmVhY2hlZEJvdHRvbSA9IChzY3JvbGxlci5zY3JvbGxUb3AgKyBzY3JvbGxlci5jbGllbnRIZWlnaHQgKyB0cmVzaG9sZCkgPiBzY3JvbGxlci5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIGlmIChyZWFjaGVkQm90dG9tKVxuICAgICAgICAgICAgbXNnLnNlbmRUb1BhcmVudChsb2FkTW9yZSgpKTtcbiAgICB9KTtcbiAgICBvbihrYWlqdV8xLk1lc3NhZ2UudW5oYW5kbGVkLCBmdW5jdGlvbiAoXywgbSkgeyByZXR1cm4gbXNnLnNlbmRUb1BhcmVudChtKTsgfSk7XG59XG5mdW5jdGlvbiByZW5kZXIoX2EpIHtcbiAgICB2YXIgcHJvcHMgPSBfYS5wcm9wcywgbXNnID0gX2EubXNnO1xuICAgIHZhciBzY3JvbGxPd25lciA9IHByb3BzLnNjcm9sbE93bmVyLCBsaXN0ID0gcHJvcHMubGlzdCwgc3R5bGVOYW1lID0gcHJvcHMuc3R5bGVOYW1lO1xuICAgIHZhciBhdHRycyA9IHN0eWxlTmFtZSA/IHsgY2xhc3M6IHN0eWxlTmFtZSB9IDogdW5kZWZpbmVkO1xuICAgIHZhciBldmVudHMgPSBzY3JvbGxPd25lciA/IHVuZGVmaW5lZCA6IHsgc2Nyb2xsOiBsb2NhbGx5U2Nyb2xsZWQgfTtcbiAgICB2YXIgaG9vayA9IHNjcm9sbE93bmVyID8gdW5kZWZpbmVkIDogeyBpbnNlcnQ6IGZ1bmN0aW9uICh2bm9kZSkgeyByZXR1cm4gbXNnLnNlbmQoc2V0U2Nyb2xsZXIodm5vZGUuZWxtKSk7IH0gfTtcbiAgICByZXR1cm4gKGthaWp1XzEuaCgnZGl2Jywge1xuICAgICAgICBhdHRyczogYXR0cnMsXG4gICAgICAgIGV2ZW50czogZXZlbnRzLFxuICAgICAgICBob29rOiBob29rXG4gICAgfSwgbGlzdCkpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2lkZ2V0L3Njcm9sbGVyL3Njcm9sbGVyLnRzXG4vLyBtb2R1bGUgaWQgPSAxMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc2VsZWN0XzEgPSByZXF1aXJlKFwiLi9zZWxlY3RcIik7XG5leHBvcnRzLmRlZmF1bHQgPSBzZWxlY3RfMS5kZWZhdWx0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2lkZ2V0L3NlbGVjdC9pbmRleC50c1xuLy8gbW9kdWxlIGlkID0gMTM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHN0eWxlcyA9IHJlcXVpcmUoJy4vc2VsZWN0LnN0eWwnKTtcbnZhciBpbW11cGRhdGVfMSA9IHJlcXVpcmUoXCJpbW11cGRhdGVcIik7XG52YXIga2FpanVfMSA9IHJlcXVpcmUoXCJrYWlqdVwiKTtcbnZhciBvcHRpb25fdHNfMSA9IHJlcXVpcmUoXCJvcHRpb24udHNcIik7XG52YXIgc2Nyb2xsZXJfMSA9IHJlcXVpcmUoXCJ3aWRnZXQvc2Nyb2xsZXJcIik7XG52YXIgbG9hZGVyXzEgPSByZXF1aXJlKFwid2lkZ2V0L2xvYWRlclwiKTtcbi8qKiBBIHNlbGVjdCBjb21wb25lbnQgdGhhdCBjYW4gb3B0aW9uYWxseSBkaXNwbGF5IHBhZ2luYXRlZCBkYXRhICovXG5mdW5jdGlvbiBkZWZhdWx0XzEocHJvcHMpIHtcbiAgICByZXR1cm4ga2FpanVfMS5Db21wb25lbnQoeyBuYW1lOiAnc2VsZWN0JywgcHJvcHM6IHByb3BzLCBpbml0U3RhdGU6IGluaXRTdGF0ZSwgY29ubmVjdDogY29ubmVjdCwgcmVuZGVyOiByZW5kZXIgfSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG5mdW5jdGlvbiBpbml0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHsgb3BlbmVkOiBmYWxzZSB9O1xufVxudmFyIG9wZW4gPSBrYWlqdV8xLk1lc3NhZ2UoJ29wZW4nKTtcbnZhciBjbG9zZSA9IGthaWp1XzEuTWVzc2FnZSgnY2xvc2UnKTtcbnZhciBpdGVtU2VsZWN0ZWQgPSBrYWlqdV8xLk1lc3NhZ2UoJ2l0ZW1TZWxlY3RlZCcpO1xudmFyIHJlcXVlc3RMb2FkTW9yZSA9IGthaWp1XzEuTWVzc2FnZSgncmVxdWVzdExvYWRNb3JlJyk7XG5mdW5jdGlvbiBjb25uZWN0KF9hKSB7XG4gICAgdmFyIG9uID0gX2Eub24sIHByb3BzID0gX2EucHJvcHMsIG1zZyA9IF9hLm1zZztcbiAgICBvbihvcGVuLCBmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIGltbXVwZGF0ZV8xLnVwZGF0ZShzdGF0ZSwgeyBvcGVuZWQ6IHRydWUgfSk7IH0pO1xuICAgIG9uKGNsb3NlLCBmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIGltbXVwZGF0ZV8xLnVwZGF0ZShzdGF0ZSwgeyBvcGVuZWQ6IGZhbHNlIH0pOyB9KTtcbiAgICBvbihpdGVtU2VsZWN0ZWQsIGZ1bmN0aW9uIChfLCBfYSkge1xuICAgICAgICB2YXIgaXRlbSA9IF9hWzBdO1xuICAgICAgICByZXR1cm4gbXNnLnNlbmRUb1BhcmVudChwcm9wcygpLm9uQ2hhbmdlKGl0ZW0pKTtcbiAgICB9KTtcbiAgICBvcHRpb25fdHNfMS5PcHRpb24ocHJvcHMoKS5wYWdpbmF0aW9uKS5tYXAoZnVuY3Rpb24gKHBhZ2luYXRpb24pIHtcbiAgICAgICAgb24ocmVxdWVzdExvYWRNb3JlLCBmdW5jdGlvbiAoXykgeyByZXR1cm4gbXNnLnNlbmRUb1BhcmVudChwYWdpbmF0aW9uLmxvYWRNb3JlKCkpOyB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlcihfYSkge1xuICAgIHZhciBwcm9wcyA9IF9hLnByb3BzLCBzdGF0ZSA9IF9hLnN0YXRlO1xuICAgIHZhciBpdGVtcyA9IHByb3BzLml0ZW1zLCBzZWxlY3RlZEl0ZW0gPSBwcm9wcy5zZWxlY3RlZEl0ZW0sIGl0ZW1SZW5kZXJlciA9IHByb3BzLml0ZW1SZW5kZXJlcjtcbiAgICB2YXIgb3BlbmVkID0gc3RhdGUub3BlbmVkO1xuICAgIHZhciB0ZXh0ID0gaXRlbXMuaW5kZXhPZihzZWxlY3RlZEl0ZW0pID4gLTFcbiAgICAgICAgPyBpdGVtUmVuZGVyZXIgPyBpdGVtUmVuZGVyZXIoc2VsZWN0ZWRJdGVtKSA6IHNlbGVjdGVkSXRlbS50b1N0cmluZygpXG4gICAgICAgIDogJyc7XG4gICAgdmFyIGRyb3Bkb3duRWwgPSByZW5kZXJEcm9wZG93bkVsKHByb3BzLCBvcGVuZWQpO1xuICAgIHJldHVybiBbXG4gICAgICAgIGthaWp1XzEuaCgnaW5wdXQnLCB7XG4gICAgICAgICAgICBwcm9wczogeyB2YWx1ZTogdGV4dCB9LFxuICAgICAgICAgICAgYXR0cnM6IHsgcmVhZG9ubHk6IHRydWUsIHBsYWNlaG9sZGVyOiAnY2xpY2sgbWUnIH0sXG4gICAgICAgICAgICBldmVudHM6IHsgY2xpY2s6IG9wZW4sIGJsdXI6IGNsb3NlIH1cbiAgICAgICAgfSksXG4gICAgICAgIGRyb3Bkb3duRWxcbiAgICBdO1xufVxuZnVuY3Rpb24gcmVuZGVyRHJvcGRvd25FbChwcm9wcywgb3BlbmVkKSB7XG4gICAgdmFyIGl0ZW1zID0gcHJvcHMuaXRlbXMsIGxvYWRpbmcgPSBwcm9wcy5sb2FkaW5nLCBpdGVtUmVuZGVyZXIgPSBwcm9wcy5pdGVtUmVuZGVyZXIsIHBhZ2luYXRpb24gPSBwcm9wcy5wYWdpbmF0aW9uO1xuICAgIHZhciBpdGVtRWxzID0gb3BlbmVkXG4gICAgICAgID8gKGl0ZW1SZW5kZXJlciA/IGl0ZW1zLm1hcChpdGVtUmVuZGVyZXIpIDogaXRlbXMpLm1hcChyZW5kZXJJdGVtKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICBpZiAoIWl0ZW1FbHMpXG4gICAgICAgIHJldHVybiAnJztcbiAgICB2YXIgaXRlbXNXaXRoTG9hZGVyRWwgPSBsb2FkaW5nXG4gICAgICAgID8gaXRlbUVscy5jb25jYXQoa2FpanVfMS5oKFwibGkuXCIgKyBzdHlsZXMubG9hZGVyQ29udGFpbmVyLCBsb2FkZXJfMS5kZWZhdWx0KCkpKVxuICAgICAgICA6IGl0ZW1FbHM7XG4gICAgdmFyIGxpc3RFbCA9IHBhZ2luYXRpb24gPyAoc2Nyb2xsZXJfMS5kZWZhdWx0KHtcbiAgICAgICAgc3R5bGVOYW1lOiBzdHlsZXMuc2Nyb2xsZXIsXG4gICAgICAgIGxpc3Q6IGl0ZW1zV2l0aExvYWRlckVsLFxuICAgICAgICBoYXNNb3JlOiBwYWdpbmF0aW9uLmhhc01vcmUsXG4gICAgICAgIGxvYWRNb3JlOiByZXF1ZXN0TG9hZE1vcmUsXG4gICAgICAgIGlzTG9hZGluZ01vcmU6IGxvYWRpbmdcbiAgICB9KSkgOiBpdGVtc1dpdGhMb2FkZXJFbDtcbiAgICByZXR1cm4ga2FpanVfMS5oKFwidWwuXCIgKyBzdHlsZXMuZHJvcGRvd24sIHsgaG9vazogYW5pbWF0aW9uSG9vayB9LCBsaXN0RWwpO1xufVxuZnVuY3Rpb24gcmVuZGVySXRlbShpdGVtKSB7XG4gICAgcmV0dXJuIGthaWp1XzEuaChcImxpLlwiICsgc3R5bGVzLmxpLCB7IGV2ZW50czogeyBtb3VzZWRvd246IGl0ZW1TZWxlY3RlZC53aXRoKGl0ZW0pIH0gfSwgaXRlbSk7XG59XG52YXIgYW5pbWF0aW9uSG9vayA9IHtcbiAgICBpbnNlcnQ6IGZ1bmN0aW9uICh2bm9kZSkge1xuICAgICAgICB2bm9kZS5lbG0uY2xhc3NMaXN0LmFkZChzdHlsZXMuaW5zZXJ0QW5pbWF0aW9uKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gKHZub2RlLCBjYikge1xuICAgICAgICB2bm9kZS5lbG0uY2xhc3NMaXN0LmFkZChzdHlsZXMucmVtb3ZlQW5pbWF0aW9uKTtcbiAgICAgICAgdm5vZGUuZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGNiKTtcbiAgICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2lkZ2V0L3NlbGVjdC9zZWxlY3QudHNcbi8vIG1vZHVsZSBpZCA9IDEzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnJlcXVpcmUoXCJzcGFjZS1saWZ0L2FsbFwiKTtcbnJlcXVpcmUoXCJsb2dnZXJcIik7XG5yZXF1aXJlKFwicm91dGVyXCIpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi50c1xuLy8gbW9kdWxlIGlkID0gMTQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=