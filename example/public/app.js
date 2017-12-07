/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = getValue;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayOps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ObjectOps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NumberOps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return StringOps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DateOps; });
var lift = function (obj) {
    if (obj instanceof Array)
        return new ArrayOps(obj);
    if (obj instanceof Date)
        return new DateOps(obj);
    if (typeof obj === 'string')
        return new StringOps(obj);
    if (typeof obj === 'number')
        return new NumberOps(obj);
    return new ObjectOps(obj);
};
/* harmony default export */ __webpack_exports__["f"] = (lift);
function getValue(input) {
    return input && input['_isLiftWrapper']
        ? input.value()
        : input;
}
function makeOps() {
    var Ops = /** @class */ (function () {
        function Ops(_value) {
            this._value = _value;
            this._isLiftWrapper = true;
        }
        Ops.prototype.value = function () { return this._value; };
        return Ops;
    }());
    return Ops;
}
var ArrayOps = makeOps();
var ObjectOps = makeOps();
var NumberOps = makeOps();
var StringOps = makeOps();
var DateOps = makeOps();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Observable;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return proto; });


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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return startApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snabbdom__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snabbdom_h__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snabbdom_h___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_snabbdom_h__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snabbdom_tovnode__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snabbdom_tovnode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_snabbdom_tovnode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_render__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_component__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_connectToStore__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_message__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_events__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__store__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_log__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__lib_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__lib_connectToStore__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__lib_message__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_8__observable__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_9__store__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_10__lib_log__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__lib_render__["a"]; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_1_snabbdom_h___default.a; });














function startApp(_ref) {
  var app = _ref.app,
      elm = _ref.elm,
      replaceElm = _ref.replaceElm,
      snabbdomModules = _ref.snabbdomModules;

  var modules = snabbdomModules.concat(__WEBPACK_IMPORTED_MODULE_7__lib_events__["a" /* eventsModule */]);
  Object(__WEBPACK_IMPORTED_MODULE_3__lib_render__["f" /* setPatchFunction */])(Object(__WEBPACK_IMPORTED_MODULE_0_snabbdom__["a" /* init */])(modules));
  Object(__WEBPACK_IMPORTED_MODULE_3__lib_render__["e" /* renderSync */])(replaceElm ? __WEBPACK_IMPORTED_MODULE_2_snabbdom_tovnode___default()(elm) : elm, app, replaceElm);
}



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Option; });
/* unused harmony export Some */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return None; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

// The Option factory / static object
var OptionObject = function (value) {
    return isDef(value) ? Some(value) : None;
};
OptionObject.all = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var values = [];
    var arr = Array.isArray(args[0]) ? args[0] : args;
    for (var i = 0; i < arr.length; i++) {
        var value = arr[i];
        if (Option.isOption(value))
            value = value.get();
        if (!isDef(value))
            return None;
        values.push(value);
    }
    return Some(values);
};
OptionObject.isOption = function (value) {
    return !!value && (value.type === 'some' || value.type === 'none');
};
function makeNone() {
    var self = {};
    function returnNone() { return None; }
    self.type = 'none';
    self.get = function () { return undefined; };
    self.isDefined = function () { return false; };
    self.forEach = function () { };
    self.map = returnNone;
    self.flatMap = returnNone;
    self.filter = returnNone;
    self.fold = function (ifEmpty) { return ifEmpty(); };
    self.orElse = function (alt) { return alt(); };
    self.getOrElse = function (alt) { return alt; };
    self.toArray = function () { return Object(__WEBPACK_IMPORTED_MODULE_0__lift__["f" /* default */])([]); };
    self.toString = function () { return 'None'; };
    self.toJSON = function () { return null; };
    return self;
}
function _Some(value) {
    this.value = value;
}
_Some.prototype = {
    type: 'some',
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
        return Option(Object(__WEBPACK_IMPORTED_MODULE_0__lift__["g" /* getValue */])(fn(this.value)));
    },
    flatMap: function (fn) {
        return fn(this.value);
    },
    filter: function (fn) {
        return fn(this.value) ? this : None;
    },
    fold: function (ifEmpty, ifDefined) {
        return ifDefined(this.value);
    },
    orElse: function () {
        return this;
    },
    getOrElse: function () {
        return this.value;
    },
    toArray: function () {
        return Object(__WEBPACK_IMPORTED_MODULE_0__lift__["f" /* default */])([this.value]);
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
var Option = OptionObject;
/** Creates a new Some instance using a non nullable value */
// extends {} to prevent null and undefined being passed
function Some(value) {
    return new _Some(value);
}
var None = makeNone();


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export is */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);
/* unused harmony reexport ArrayOps */
/* unused harmony reexport ObjectOps */
/* unused harmony reexport NumberOps */
/* unused harmony reexport StringOps */
/* unused harmony reexport DateOps */
/* unused harmony reexport getValue */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immupdate__ = __webpack_require__(45);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1_immupdate__["a"]; });
/* unused harmony reexport deepUpdate */
/* unused harmony reexport DELETE */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__option__ = __webpack_require__(3);
/* unused harmony reexport Option */
/* unused harmony reexport None */
/* unused harmony reexport Some */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__result__ = __webpack_require__(46);
/* unused harmony reexport Result */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__result__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__result__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__array_range__ = __webpack_require__(47);
/* unused harmony reexport range */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__array_fromArrayLike__ = __webpack_require__(48);
/* unused harmony reexport fromArrayLike */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__array_tuple__ = __webpack_require__(49);
/* unused harmony reexport tuple */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__object_set__ = __webpack_require__(50);
/* unused harmony reexport Set */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__function_memoize__ = __webpack_require__(51);
/* unused harmony reexport memoize */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__object_is__ = __webpack_require__(18);

/* harmony default export */ __webpack_exports__["c"] = (__WEBPACK_IMPORTED_MODULE_0__lift__["f" /* default */]);










var is = __WEBPACK_IMPORTED_MODULE_9__object_is__;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = href;
/* unused harmony export transitionTo */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_abyssa__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_util_router__ = __webpack_require__(24);
/* unused harmony reexport Router */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1_common_util_router__["a"]; });


function href(router, route, params) {
    return router.link("app." + route, params);
}
function transitionTo(router, route, params) {
    return router.transitionTo("app." + route, params);
}



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = shouldLog;


/* harmony default export */ __webpack_exports__["a"] = ({
  render: false,
  message: false
});

function shouldLog(log, component) {
  return component.log === true && (log === true || log === component.key);
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__debounce__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__delay__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__distinct__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drop__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filter__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__flatMapLatest__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__fromEvent__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__fromPromise__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__interval__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__merge__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__partition__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pure__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__sliding__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__throttle__ = __webpack_require__(58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__observable__["a"]; });

















// Enrich the Observable "prototype" till (maybe) we have the |> operator!
__WEBPACK_IMPORTED_MODULE_0__observable__["b" /* proto */].debounce = function (time) {
  return Object(__WEBPACK_IMPORTED_MODULE_1__debounce__["a" /* default */])(time, this);
};
__WEBPACK_IMPORTED_MODULE_0__observable__["b" /* proto */].delay = function (time) {
  return Object(__WEBPACK_IMPORTED_MODULE_2__delay__["a" /* default */])(time, this);
};
__WEBPACK_IMPORTED_MODULE_0__observable__["b" /* proto */].distinct = function (fn) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__distinct__["a" /* default */])(fn, this);
};
__WEBPACK_IMPORTED_MODULE_0__observable__["b" /* proto */].drop = function (count) {
  return Object(__WEBPACK_IMPORTED_MODULE_4__drop__["a" /* default */])(count, this);
};
__WEBPACK_IMPORTED_MODULE_0__observable__["b" /* proto */].filter = function (fn) {
  return Object(__WEBPACK_IMPORTED_MODULE_5__filter__["a" /* default */])(fn, this);
};
__WEBPACK_IMPORTED_MODULE_0__observable__["b" /* proto */].flatMapLatest = function (fn) {
  return Object(__WEBPACK_IMPORTED_MODULE_6__flatMapLatest__["a" /* default */])(fn, this);
};
__WEBPACK_IMPORTED_MODULE_0__observable__["b" /* proto */].map = function (fn) {
  return Object(__WEBPACK_IMPORTED_MODULE_10__map__["a" /* default */])(fn, this);
};
__WEBPACK_IMPORTED_MODULE_0__observable__["b" /* proto */].partition = function (predicate) {
  return Object(__WEBPACK_IMPORTED_MODULE_12__partition__["a" /* default */])(predicate, this);
};
__WEBPACK_IMPORTED_MODULE_0__observable__["b" /* proto */].sliding = function (num) {
  return Object(__WEBPACK_IMPORTED_MODULE_14__sliding__["a" /* default */])(num, this);
};
__WEBPACK_IMPORTED_MODULE_0__observable__["b" /* proto */].sliding2 = function () {
  return Object(__WEBPACK_IMPORTED_MODULE_14__sliding__["b" /* sliding2 */])(this);
};
__WEBPACK_IMPORTED_MODULE_0__observable__["b" /* proto */].throttle = function (time) {
  return Object(__WEBPACK_IMPORTED_MODULE_15__throttle__["a" /* default */])(time, this);
};

// Enrich the Observable object
__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */].pure = __WEBPACK_IMPORTED_MODULE_13__pure__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */].fromEvent = __WEBPACK_IMPORTED_MODULE_7__fromEvent__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */].fromPromise = __WEBPACK_IMPORTED_MODULE_8__fromPromise__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */].interval = __WEBPACK_IMPORTED_MODULE_9__interval__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */].merge = __WEBPACK_IMPORTED_MODULE_11__merge__["a" /* default */];



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = __webpack_require__(9);
var is = __webpack_require__(34);
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
exports.default = h;
//# sourceMappingURL=h.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;
//# sourceMappingURL=vnode.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Set;
/* harmony export (immutable) */ __webpack_exports__["b"] = assign;
/* harmony export (immutable) */ __webpack_exports__["c"] = shallowEqual;

function Set() {
  var set = {};
  for (var i = 0; i < arguments.length; i++) {
    set[arguments[i]] = 1;
  }
  return set;
}

/* An optimized Object.assign */
function assign(t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s) {
      t[p] = s[p];
    }
  }
  return t;
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return State; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Router__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__Router__["a"]; });
/* unused harmony reexport api */
/* unused harmony reexport util */




var State = __WEBPACK_IMPORTED_MODULE_0__util__["l" /* stateShorthand */];



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = noop;
/* harmony export (immutable) */ __webpack_exports__["a"] = arrayToObject;
/* harmony export (immutable) */ __webpack_exports__["i"] = objectToArray;
/* harmony export (immutable) */ __webpack_exports__["b"] = copyObject;
/* harmony export (immutable) */ __webpack_exports__["e"] = mergeObjects;
/* harmony export (immutable) */ __webpack_exports__["d"] = mapValues;
/* harmony export (immutable) */ __webpack_exports__["h"] = objectDiff;
/* harmony export (immutable) */ __webpack_exports__["c"] = makeMessage;
/* harmony export (immutable) */ __webpack_exports__["j"] = parsePaths;
/* harmony export (immutable) */ __webpack_exports__["k"] = parseQueryParams;
/* harmony export (immutable) */ __webpack_exports__["g"] = normalizePathQuery;
/* harmony export (immutable) */ __webpack_exports__["l"] = stateShorthand;
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

  for (var _name in obj2) {
    if (!(_name in obj1)) enter[_name] = all[_name] = true;
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
    var _paramValue$split = paramValue.split('='),
        _paramValue$split2 = _slicedToArray(_paramValue$split, 2),
        param = _paramValue$split2[0],
        value = _paramValue$split2[1];

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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = vnode;
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
/* harmony default export */ __webpack_exports__["a"] = (vnode);
//# sourceMappingURL=vnode.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return array; });
/* harmony export (immutable) */ __webpack_exports__["b"] = primitive;
var array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
//# sourceMappingURL=is.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = h;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vnode__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is__ = __webpack_require__(14);


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
        if (__WEBPACK_IMPORTED_MODULE_1__is__["a" /* array */](c)) {
            children = c;
        }
        else if (__WEBPACK_IMPORTED_MODULE_1__is__["b" /* primitive */](c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (__WEBPACK_IMPORTED_MODULE_1__is__["a" /* array */](b)) {
            children = b;
        }
        else if (__WEBPACK_IMPORTED_MODULE_1__is__["b" /* primitive */](b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (__WEBPACK_IMPORTED_MODULE_1__is__["a" /* array */](children)) {
        for (i = 0; i < children.length; ++i) {
            if (__WEBPACK_IMPORTED_MODULE_1__is__["b" /* primitive */](children[i]))
                children[i] = Object(__WEBPACK_IMPORTED_MODULE_0__vnode__["b" /* vnode */])(undefined, undefined, undefined, children[i]);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__vnode__["b" /* vnode */])(sel, data, children, text, undefined);
}
;
/* unused harmony default export */ var _unused_webpack_default_export = (h);
//# sourceMappingURL=h.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = setPatchFunction;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Render; });
/* unused harmony export isFirstRender */
/* unused harmony export renderInto */
/* harmony export (immutable) */ __webpack_exports__["e"] = renderSync;
/* harmony export (immutable) */ __webpack_exports__["c"] = renderComponentNow;
/* harmony export (immutable) */ __webpack_exports__["d"] = renderNewComponentNow;
/* harmony export (immutable) */ __webpack_exports__["b"] = renderComponentNextFrame;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snabbdom_h__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snabbdom_h___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_snabbdom_h__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snabbdom_vnode__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snabbdom_vnode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_snabbdom_vnode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__log__ = __webpack_require__(6);




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

var Render = {
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

  var beforeRender = void 0;

  if (__WEBPACK_IMPORTED_MODULE_2__log__["a" /* default */].render) beforeRender = performance.now();

  var target = vnode || elm;
  var newVNode = render({ props: props, state: store.state(), msg: messages }) || emptyNode();

  patchInto(target, newVNode);

  if (Object(__WEBPACK_IMPORTED_MODULE_2__log__["b" /* shouldLog */])(__WEBPACK_IMPORTED_MODULE_2__log__["a" /* default */].render, component)) {
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
  if (__WEBPACK_IMPORTED_MODULE_2__log__["a" /* default */].render) {
    renderBeginTime = performance.now();
    console.log('%cRender - begin', 'color: orange');
  }
}

function logEndRender() {
  if (__WEBPACK_IMPORTED_MODULE_2__log__["a" /* default */].render) {
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
    patch(Object(__WEBPACK_IMPORTED_MODULE_1_snabbdom_vnode__["vnode"])('dummy', {}, [], undefined, target), Object(__WEBPACK_IMPORTED_MODULE_1_snabbdom_vnode__["vnode"])('dummy', {}, nodeIsArray ? node : [node]));

    if (nodeIsArray) node.elm = target;
  }
  // Update using a previous VNode or VNode[] to patch against
  else {
      if (targetIsArray) {
        patch(Object(__WEBPACK_IMPORTED_MODULE_1_snabbdom_vnode__["vnode"])('dummy', {}, target, undefined, target.elm), Object(__WEBPACK_IMPORTED_MODULE_1_snabbdom_vnode__["vnode"])('dummy', {}, nodeIsArray ? node : [node]));
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
    if (typeof node === 'string' || typeof node === 'number') arr[i] = Object(__WEBPACK_IMPORTED_MODULE_1_snabbdom_vnode__["vnode"])(undefined, undefined, undefined, node);
  }
}

var emptyNode = function emptyNode() {
  return Object(__WEBPACK_IMPORTED_MODULE_1_snabbdom_vnode__["vnode"])('!', {}, [], undefined, undefined);
};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = Messages;
/* harmony export (immutable) */ __webpack_exports__["a"] = _sendToElement;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(7);


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

  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array", function() { return array; });
/* harmony export (immutable) */ __webpack_exports__["func"] = func;
/* harmony export (immutable) */ __webpack_exports__["string"] = string;
/* harmony export (immutable) */ __webpack_exports__["number"] = number;
/* harmony export (immutable) */ __webpack_exports__["boolean"] = boolean;
/* harmony export (immutable) */ __webpack_exports__["object"] = object;
/** Returns whether an object is an Array */
var array = Array.isArray;
/** Returns whether this object is a function */
function func(obj) {
    return (typeof obj === 'function');
}
/** Returns whether this object is a string */
function string(obj) {
    return (typeof obj === 'string');
}
/** Returns whether this object is a number */
function number(obj) {
    return (typeof obj === 'number');
}
/** Returns whether this object is a boolean */
function boolean(obj) {
    return (typeof obj === 'boolean');
}
/** Returns whether this value is an object (e.g not a primitive: dates, arrays, functions, objects, regexes, `new Number(0)`, and `new String('')) */
function object(obj) {
    var type = typeof obj;
    return (type == 'object' || type == 'function');
}


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Store;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_message__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_log__ = __webpack_require__(6);




/*
 * A Store is an Observable that is guaranteed to have an initial value
 * and can be modified from the outside by messages.
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
  var shouldLog = options.log !== undefined ? options.log : __WEBPACK_IMPORTED_MODULE_2__lib_log__["a" /* default */].message === true;
  var storeName = name || (registerHandlers.name ? registerHandlers.name + ' store' : 'Store');

  var msg = {
    send: function send(m) {
      return store.send(m);
    }, // Late binding as store.send is not yet defined
    listen: function listen(message) {
      var observable = Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function () {
        var obss = listened[message._id];
        if (!obss) obss = listened[message._id] = [];
        obss.push(observable);

        return function () {
          obss.splice(obss.indexOf(observable), 1);
        };
      }).named(message._name);

      return observable;
    }
  };

  function on(src, fn) {
    if (src._isMessage) {
      if (src.type === 'partiallyAppliedMessage') {
        console.error('You should not use on() with a partially applied message - Ignoring "' + src._name + '"');
        return;
      }

      handlers[src._id] = fn;
    } else {
      var unsubscribe = src.subscribe(function (val, name) {
        receive(name, fn, [val]);
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
      // This outer loop is used in case a change in the store.state actually triggers more state changes
      while (queue.length) {

        // This inner loop is here to dequeue as many messages as possible before committing a state change
        while (queue.length) {
          var _queue$shift = queue.shift(),
              _sourceName = _queue$shift.sourceName,
              _handler = _queue$shift.handler,
              _arg = _queue$shift.arg;

          stack++;

          if (shouldLog) console.log('%c' + _sourceName + ' %creceived by %c' + storeName, 'color: #B31EA6', 'color: black', 'font-weight: bold', 'with', _arg);

          var result = _handler.apply(null, _arg);
          if (result !== undefined) state = result;
        }

        if (state !== store.state() && state !== undefined) store.state(state);
      }
    } finally {
      receiving = false;
      queue.length = 0;
      stack = 0;
    }
  }

  store.state = Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])()(initialState).named(storeName + '.state');
  // Eagerly activate so that any backing resource is involved now.
  store.state.subscribe(function (x) {
    return x;
  });

  registerHandlers({ on: on, msg: msg, state: store.state });

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
        return obs(unpackPayload(payload));
      });
      handled = true;
    }

    if (handled) return;

    var unhandled = handlers[__WEBPACK_IMPORTED_MODULE_1__lib_message__["a" /* default */].unhandled._id];

    if (unhandled) {
      receive(__WEBPACK_IMPORTED_MODULE_1__lib_message__["a" /* default */].unhandled._name, unhandled, [message]);
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

function unpackPayload(payload) {
  if (payload.length === 0) return undefined;
  if (payload.length === 1) return payload[0];
  return payload;
}

var empty = {};
function noop() {}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Message;

var messageId = 1;

/** User-defined component message factory */
function Message(name) {
  var _id = messageId++;

  function message() {
    for (var _len = arguments.length, payload = Array(_len), _key = 0; _key < _len; _key++) {
      payload[_key] = arguments[_key];
    }

    var result = {
      _id: _id,
      _name: name,
      payload: payload
    };
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
function PartiallyAppliedMessage(underlyingMessage, payload) {

  function message() {
    for (var _len2 = arguments.length, otherPayloads = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      otherPayloads[_key2] = arguments[_key2];
    }

    return underlyingMessage.apply(null, [payload].concat(otherPayloads));
  }

  message.type = 'partiallyAppliedMessage';

  message._id = underlyingMessage._id;
  message._name = underlyingMessage._name;
  message._isMessage = true;

  message.with = withPayload;

  // Used for VDOM Diffing (See util/shallowEqual)
  message.payload = payload;

  return message;
}

Message.unhandled = Message('unhandled');

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* Represents the public API of the last instanciated router; Useful to break circular dependencies between router and its states */
var api = {};
/* harmony default export */ __webpack_exports__["a"] = (api);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = add;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Adds a key/value to this heterogeneous object.
 * To add a (nullable) key to an object while preserving its type, use "update()" instead.
 * To add a key to a homogeneous key/value object, use "assoc" instead.
 */
function add(key, value) {
    var obj = this.value(), result = {};
    Object.keys(obj).forEach(function (key) { result[key] = obj[key]; });
    result[key] = value;
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.add = add;
//export function add<A, K extends string, V>(this: ObjectOps<A>, key: K, value: V): ObjectOps<A & Record<K, V>> { 


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = remove;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Removes a key/value from this heterogeneous object.
 * To remove a (nullable) key from an object while preserving its type, use "update()" instead.
 * To remove a key from a homogeneous key/value object, use "dissoc" instead.
 */
function remove(keyToRemove) {
    var obj = this.value(), result = {};
    Object.keys(obj).forEach(function (key) { if (key !== keyToRemove)
        result[key] = obj[key]; });
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.remove = remove;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = RouteDef;
/* harmony export (immutable) */ __webpack_exports__["b"] = startApp;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_abyssa__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kaiju__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_space_lift__ = __webpack_require__(4);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



/* Creates a new Route definition */
function RouteDef(uri, options) {
    var children = options.children || {};
    return Object.assign(__assign({ uri: uri, fullName: undefined, parent: undefined }, options), children);
}
/* Creates the router and starts the application */
function startApp(options) {
    // The lookup of our custom route objects by full name
    var routeByName = {};
    // The components currently mounted, top-down
    var components = [];
    // The current route in the transition
    var currentRoute;
    // The current app VNode
    var currentVNode;
    // Translate our RouteDefs into abyssa States
    function transformRouteTree(name, route, parent) {
        if (parent === void 0) { parent = undefined; }
        routeByName[name] = route;
        route.parent = parent;
        route.fullName = name;
        var children = route.children
            ? Object(__WEBPACK_IMPORTED_MODULE_2_space_lift__["c" /* default */])(route.children)
                .mapValues(function (childName, childRoute) { return transformRouteTree(name + "." + childName, childRoute, route); })
                .value()
            : {};
        return Object(__WEBPACK_IMPORTED_MODULE_0_abyssa__["b" /* State */])(route.uri, {
            enter: function (_, __, router) {
                components.push(route.enter(router, currentRoute));
            },
            update: function () {
                if (route.update)
                    route.update(currentRoute);
            },
            exit: function () {
                components.pop();
                if (route.exit)
                    route.exit();
            }
        }, children);
    }
    var rootStates = Object(__WEBPACK_IMPORTED_MODULE_2_space_lift__["c" /* default */])({ app: options.app }).mapValues(transformRouteTree).value();
    var router = Object(__WEBPACK_IMPORTED_MODULE_0_abyssa__["a" /* Router */])(rootStates);
    var abyssaOptions = Object.assign({}, options, {
        notFound: options.notFound && options.notFound.fullName
    });
    router.configure(abyssaOptions);
    router.on('started', function (newState) {
        currentRoute = Object.assign({}, newState, {
            fullName: newState.fullName.replace('app.', ''),
            isIn: function (parent) { return newState.isIn("app." + parent); }
        });
    });
    router.on('ended', function () {
        var newAppNode = components.reduceRight(function (previous, current) {
            return current(currentRoute, previous);
        }, emptyVNode());
        if (currentVNode) {
            __WEBPACK_IMPORTED_MODULE_1_kaiju__["d" /* Render */].into(currentVNode, newAppNode);
        }
        else {
            Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["i" /* startApp */])({
                app: newAppNode,
                elm: options.elm,
                replaceElm: options.replaceElm,
                snabbdomModules: options.snabbdomModules
            });
        }
        currentVNode = newAppNode;
    });
    router.init();
}
var emptyVNode = function () { return Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["g" /* h */])('div', { key: '_emptyVNode' }); };


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Validator */
/* unused harmony export success */
/* unused harmony export failure */
/* unused harmony export typeFailure */
/* unused harmony export getContext */
/* unused harmony export is */
/* unused harmony export NullValidator */
/* unused harmony export UndefinedValidator */
/* unused harmony export StringValidator */
/* unused harmony export NumberValidator */
/* unused harmony export BooleanValidator */
/* unused harmony export MappedValidator */
/* unused harmony export map */
/* unused harmony export FilteredValidator */
/* unused harmony export filter */
/* unused harmony export ArrayValidator */
/* harmony export (immutable) */ __webpack_exports__["a"] = array;
/* unused harmony export TupleValidator */
/* unused harmony export tuple */
/* unused harmony export ObjectValidator */
/* harmony export (immutable) */ __webpack_exports__["c"] = object;
/* unused harmony export KeyOfValidator */
/* unused harmony export keyof */
/* unused harmony export DictionaryValidator */
/* unused harmony export dictionary */
/* unused harmony export literal */
/* unused harmony export UnionValidator */
/* unused harmony export LiteralUnionValidator */
/* unused harmony export union */
/* unused harmony export OptionalValidator */
/* unused harmony export optional */
/* unused harmony export recursion */
/* unused harmony export IsoDateValidator */
/* harmony export (immutable) */ __webpack_exports__["b"] = errorDebugString;
/* unused harmony export null */
/* unused harmony export undefined */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return string; });
/* unused harmony export number */
/* unused harmony export boolean */
/* unused harmony export isoDate */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_space_lift__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

//--------------------------------------
//  Setup
//--------------------------------------
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.prototype.map = function (fn) {
        return new MappedValidator(this, fn);
    };
    Validator.prototype.filter = function (fn) {
        return new FilteredValidator(this, fn);
    };
    Validator.prototype.tagged = function () {
        return this;
    };
    return Validator;
}());

function success(value) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["b" /* Ok */])(value);
}
function failure(context, message) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])([{ context: context, message: message }]);
}
function typeFailure(value, context, expectedType) {
    var valueType = (function () {
        if (Array.isArray(value))
            return 'array';
        if (value === null)
            return 'null';
        return typeof value;
    })();
    var message = "Type error: expected " + expectedType + " but got " + valueType;
    return Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])([{ context: context, message: message }]);
}
function getContext(name, parent) {
    return (parent ? parent + " / " + name : name);
}
var rootContext = getContext('root');
function is(value, validator) {
    return validator.validate(value).isOk();
}
//--------------------------------------
//  Primitives
//--------------------------------------
var NullValidator = /** @class */ (function (_super) {
    __extends(NullValidator, _super);
    function NullValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NullValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        return v === null ? success(v) : typeFailure(v, c, 'null');
    };
    return NullValidator;
}(Validator));

var UndefinedValidator = /** @class */ (function (_super) {
    __extends(UndefinedValidator, _super);
    function UndefinedValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UndefinedValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        return v === void 0 ? success(v) : typeFailure(v, c, 'undefined');
    };
    return UndefinedValidator;
}(Validator));

var StringValidator = /** @class */ (function (_super) {
    __extends(StringValidator, _super);
    function StringValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        return typeof v === 'string' ? success(v) : typeFailure(v, c, 'string');
    };
    return StringValidator;
}(Validator));

var NumberValidator = /** @class */ (function (_super) {
    __extends(NumberValidator, _super);
    function NumberValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        return typeof v === 'number' ? success(v) : typeFailure(v, c, 'number');
    };
    return NumberValidator;
}(Validator));

var BooleanValidator = /** @class */ (function (_super) {
    __extends(BooleanValidator, _super);
    function BooleanValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BooleanValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        return typeof v === 'boolean' ? success(v) : typeFailure(v, c, 'boolean');
    };
    return BooleanValidator;
}(Validator));

//--------------------------------------
//  map
//--------------------------------------
var MappedValidator = /** @class */ (function (_super) {
    __extends(MappedValidator, _super);
    function MappedValidator(validator, f) {
        var _this = _super.call(this) || this;
        _this.validator = validator;
        _this.f = f;
        return _this;
    }
    MappedValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        return this.validator.validate(v, c).map(this.f);
    };
    return MappedValidator;
}(Validator));

function map(validator, f) {
    return new MappedValidator(validator, f);
}
//--------------------------------------
//  filter
//--------------------------------------
var FilteredValidator = /** @class */ (function (_super) {
    __extends(FilteredValidator, _super);
    function FilteredValidator(validator, predicate) {
        var _this = _super.call(this) || this;
        _this.validator = validator;
        _this.predicate = predicate;
        return _this;
    }
    FilteredValidator.prototype.validate = function (v, c) {
        var _this = this;
        if (c === void 0) { c = rootContext; }
        var validated = this.validator.validate(v, c);
        return validated.flatMap(function (v) {
            if (_this.predicate(v))
                return validated;
            var predicateName = _this.predicate.name;
            if (!predicateName) {
                var functionStr = _this.predicate.toString();
                predicateName = functionStr.length > 60 ? functionStr.slice(0, 60) + '...' : functionStr;
            }
            return failure(c, "The value " + pretty(v) + " failed the predicate \"" + predicateName + "\"");
        });
    };
    return FilteredValidator;
}(Validator));

function filter(validator, predicate) {
    return new FilteredValidator(validator, predicate);
}
//--------------------------------------
//  array
//--------------------------------------
var ArrayValidator = /** @class */ (function (_super) {
    __extends(ArrayValidator, _super);
    function ArrayValidator(validator) {
        var _this = _super.call(this) || this;
        _this.validator = validator;
        return _this;
    }
    ArrayValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        if (!Array.isArray(v))
            return typeFailure(v, c, 'array');
        var validatedArray = [];
        var errors = [];
        var changed = false;
        for (var i = 0; i < v.length; i++) {
            var item = v[i];
            var validation = this.validator.validate(item, getContext(String(i), c));
            if (validation.isOk()) {
                changed = changed || validation.get() !== item;
                validatedArray.push(validation.get());
            }
            else {
                pushAll(errors, validation.get());
            }
        }
        return errors.length ? Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])(errors) : Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["b" /* Ok */])(changed ? validatedArray : v);
    };
    return ArrayValidator;
}(Validator));

function array(validator) {
    return new ArrayValidator(validator);
}
//--------------------------------------
//  tuple
//--------------------------------------
var TupleValidator = /** @class */ (function (_super) {
    __extends(TupleValidator, _super);
    function TupleValidator(validators) {
        var _this = _super.call(this) || this;
        _this.validators = validators;
        return _this;
    }
    TupleValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        if (!Array.isArray(v))
            return typeFailure(v, c, 'Tuple');
        if (v.length !== this.validators.length)
            return failure(c, "Expected a Tuple" + this.validators.length + " but got a Tuple" + v.length);
        var validatedArray = [];
        var errors = [];
        var changed = false;
        for (var i = 0; i < v.length; i++) {
            var item = v[i];
            var validation = this.validators[i].validate(item, getContext(String(i), c));
            if (validation.isOk()) {
                changed = changed || validation.get() !== item;
                validatedArray.push(validation.get());
            }
            else {
                pushAll(errors, validation.get());
            }
        }
        return errors.length ? Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])(errors) : Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["b" /* Ok */])(changed ? validatedArray : v);
    };
    return TupleValidator;
}(Validator));

function tuple() {
    var validators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        validators[_i] = arguments[_i];
    }
    return new TupleValidator(validators);
}
var ObjectValidator = /** @class */ (function (_super) {
    __extends(ObjectValidator, _super);
    function ObjectValidator(props) {
        var _this = _super.call(this) || this;
        _this.props = props;
        return _this;
    }
    ObjectValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        if (v == null || typeof v !== 'object')
            return typeFailure(v, c, 'object');
        var validatedObject = __assign({}, v);
        var errors = [];
        var changed = false;
        for (var key in this.props) {
            var value = v[key];
            var validator = this.props[key];
            var validation = validator.validate(value, getContext(key, c));
            if (validation.isOk()) {
                changed = changed || value !== validation.get();
                validatedObject[key] = validation.get();
            }
            else {
                pushAll(errors, validation.get());
            }
        }
        return errors.length ? Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])(errors) : Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["b" /* Ok */])(changed ? validatedObject : v);
    };
    return ObjectValidator;
}(Validator));

function object(props) {
    return new ObjectValidator(props);
}
//--------------------------------------
//  keyof
//--------------------------------------
var KeyOfValidator = /** @class */ (function (_super) {
    __extends(KeyOfValidator, _super);
    function KeyOfValidator(keys) {
        var _this = _super.call(this) || this;
        _this.keys = keys;
        return _this;
    }
    KeyOfValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        return this.keys.hasOwnProperty(v)
            ? success(v)
            : failure(c, pretty(v) + " is not a key of " + pretty(this.keys));
    };
    return KeyOfValidator;
}(Validator));

function keyof(keys) {
    return new KeyOfValidator(keys);
}
//--------------------------------------
//  dictionary
//--------------------------------------
var DictionaryValidator = /** @class */ (function (_super) {
    __extends(DictionaryValidator, _super);
    function DictionaryValidator(domain, codomain) {
        var _this = _super.call(this) || this;
        _this.domain = domain;
        _this.codomain = codomain;
        return _this;
    }
    DictionaryValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        if (v == null || typeof v !== 'object')
            return typeFailure(v, c, 'object');
        var validatedDict = {};
        var errors = [];
        var changed = false;
        var _loop_1 = function (key) {
            var value = v[key];
            var context = getContext(key, c);
            var domainValidation = this_1.domain.validate(key, context);
            var codomainValidation = this_1.codomain.validate(value, context);
            if (domainValidation.isOk()) {
                changed = changed || key !== domainValidation.get();
                key = domainValidation.get();
            }
            else {
                var error = domainValidation.get();
                pushAll(errors, error.map(function (e) { return ({ context: context, message: "Error validating the key. " + e.message }); }));
            }
            if (codomainValidation.isOk()) {
                changed = changed || value !== codomainValidation.get();
                validatedDict[key] = codomainValidation.get();
            }
            else {
                var error = codomainValidation.get();
                pushAll(errors, error.map(function (e) { return ({ context: context, message: "Error validating the value. " + e.message }); }));
            }
        };
        var this_1 = this;
        for (var key in v) {
            _loop_1(key);
        }
        return errors.length ? Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])(errors) : Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["b" /* Ok */])(changed ? validatedDict : v);
    };
    return DictionaryValidator;
}(Validator));

function dictionary(domain, codomain) {
    return new DictionaryValidator(domain, codomain);
}
var LiteralValidator = /** @class */ (function (_super) {
    __extends(LiteralValidator, _super);
    function LiteralValidator(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    LiteralValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        return v === this.value
            ? success(v)
            : failure(c, "Expected literal value " + this.value + " but found " + pretty(v));
    };
    return LiteralValidator;
}(Validator));
function literal(value) {
    return new LiteralValidator(value);
}
//--------------------------------------
//  union
//--------------------------------------
var UnionValidator = /** @class */ (function (_super) {
    __extends(UnionValidator, _super);
    function UnionValidator(validators) {
        var _this = _super.call(this) || this;
        _this.validators = validators;
        return _this;
    }
    UnionValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        var errors = [];
        for (var i = 0; i < this.validators.length; i++) {
            var validation = this.validators[i].validate(v, c);
            if (validation.isOk())
                return validation;
            else
                errors.push(validation.get());
        }
        var detailString = errors.map(function (es, index) {
            return "Union type #" + index + " => \n  " + errorDebugString(es).replace(/\n/g, '\n  ');
        }).join('\n');
        return failure(c, "The value " + pretty(v) + " \nis not part of the union: \n\n" + detailString);
    };
    return UnionValidator;
}(Validator));

var LiteralUnionValidator = /** @class */ (function (_super) {
    __extends(LiteralUnionValidator, _super);
    function LiteralUnionValidator(values) {
        var _this = _super.call(this) || this;
        _this.values = values;
        return _this;
    }
    LiteralUnionValidator.prototype.validate = function (v, c) {
        for (var i = 0; i < this.values.length; i++) {
            var validator = literal(this.values[i]);
            var validation = validator.validate(v, c);
            if (validation.isOk())
                return validation;
        }
        return failure(c, "The value " + pretty(v) + " is not part of the union");
    };
    return LiteralUnionValidator;
}(Validator));

function union() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var probe = values[0];
    return (probe && typeof probe === 'object')
        ? new UnionValidator(values)
        : new LiteralUnionValidator(values);
}
//--------------------------------------
//  optional
//--------------------------------------
var OptionalValidator = /** @class */ (function (_super) {
    __extends(OptionalValidator, _super);
    function OptionalValidator(validator) {
        var _this = _super.call(this) || this;
        _this.validator = validator;
        return _this;
    }
    OptionalValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        if (v === undefined)
            return success(v);
        return this.validator.validate(v, c);
    };
    return OptionalValidator;
}(Validator));

function optional(validator) {
    return new OptionalValidator(validator);
}
//--------------------------------------
//  recursion
//--------------------------------------
function recursion(definition) {
    var Self = new Validator();
    Self.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        return Result.validate(v, c);
    };
    var Result = definition(Self);
    return Result;
}
//--------------------------------------
//  isoDate
//--------------------------------------
var IsoDateValidator = /** @class */ (function (_super) {
    __extends(IsoDateValidator, _super);
    function IsoDateValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsoDateValidator.prototype.validate = function (v, c) {
        if (c === void 0) { c = rootContext; }
        if (typeof v !== 'string')
            return typeFailure(v, c, 'string');
        var date = new Date(v);
        return isNaN(date.getTime())
            ? failure(c, "Expected an ISO date but got: " + pretty(v))
            : success(date);
    };
    return IsoDateValidator;
}(Validator));

//--------------------------------------
//  util
//--------------------------------------
function pushAll(xs, ys) {
    Array.prototype.push.apply(xs, ys);
}
function pretty(value) {
    return JSON.stringify(value, undefined, 2);
}
function errorDebugString(errors) {
    return errors.map(function (e) { return "At [" + e.context + "] " + e.message; }).join('\n');
}
//--------------------------------------
//  Export aliases and singletons
//--------------------------------------
var nullValidation = new NullValidator();
var undefinedValidation = new UndefinedValidator();

var string = new StringValidator();
var number = new NumberValidator();
var boolean = new BooleanValidator();
var isoDate = new IsoDateValidator();


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NotAsked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Loading; });
/* unused harmony export Refreshing */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Success; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Failure; });
/* unused harmony export unpack */
/* tslint:disable:no-any */
var NotAsked = { type: 'notAsked' };
var Loading = { type: 'loading' };
var Refreshing = function (data) { return ({ type: 'refreshing', data: data }); };
var Success = function (data) { return ({ type: 'success', data: data }); };
var Failure = function (error) { return ({ type: 'failure', error: error }); };
/**
 * Transforms a RemoteData union object to data/error/loading primitives
 * which are sometimes more convenient to manipulate.
 */
function unpack(rd) {
    switch (rd.type) {
        case 'notAsked': return { loading: false };
        case 'loading': return { loading: true };
        case 'refreshing': return { loading: true, data: rd.data };
        case 'success': return { data: rd.data, loading: false };
        case 'failure': return { error: rd.error, loading: false };
    }
}


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = animate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kaiju__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_space_lift__ = __webpack_require__(4);


/**
 * Component wrapper for simple swap animations (ONE Element is replaced by another, be it another Element or undefined)
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
        return Object(__WEBPACK_IMPORTED_MODULE_0_kaiju__["a" /* Component */])({ sel: sel, name: 'singleElementAnimation', initState: initState, props: props, connect: connect, render: render });
    };
}
function initState(props) {
    return {
        activeChild: props.child
    };
}
var setActiveChild = Object(__WEBPACK_IMPORTED_MODULE_0_kaiju__["b" /* Message */])('setActiveChild');
function connect(_a) {
    var on = _a.on, msg = _a.msg, props = _a.props, state = _a.state;
    var isPlayingRemoveAnimation = false;
    on(props.sliding2(), function (_a) {
        var newProps = _a[0], oldProps = _a[1];
        // First render, no animation
        if (!oldProps)
            return state();
        var newChild = newProps.child;
        var oldChild = oldProps.child;
        var newKey = keyOf(newProps.child);
        var oldKey = keyOf(oldProps.child);
        // A remove animation is already playing, leave it and rely on it to then introduce the most recent child
        if (isPlayingRemoveAnimation)
            return;
        // Stable child; nothing to do but update with the new reference
        if (newKey === oldKey)
            return Object(__WEBPACK_IMPORTED_MODULE_1_space_lift__["d" /* update */])(state(), { activeChild: newProps.child });
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
    on(setActiveChild, function (node) {
        __WEBPACK_IMPORTED_MODULE_0_kaiju__["d" /* Render */].scheduleDOMWrite(function () {
            if (node && node.elm)
                props().animations.create(node.elm);
        });
        return Object(__WEBPACK_IMPORTED_MODULE_1_space_lift__["d" /* update */])(state(), { activeChild: node });
    });
    on(__WEBPACK_IMPORTED_MODULE_0_kaiju__["b" /* Message */].unhandled, function (m) { return msg.sendToParent(m); });
}
function render(_a) {
    var state = _a.state;
    return state.activeChild;
}
function keyOf(node) {
    return node && (node.key || node.sel);
}


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kaiju__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_route__ = __webpack_require__(5);


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_route__["a" /* RouteDef */])('notFound', {
    enter: function () { return function () { return Object(__WEBPACK_IMPORTED_MODULE_0_kaiju__["g" /* h */])('h1', { key: 'notFound' }, '404 :-('); }; },
    children: {}
}));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(30);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kaiju__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_abyssa__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_space_lift_es_all__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_snabbdom_es_modules_class__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_snabbdom_es_modules_props__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_snabbdom_es_modules_attributes__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_util_router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_routeNotFound__ = __webpack_require__(28);









__WEBPACK_IMPORTED_MODULE_1_abyssa__["a" /* Router */].log = true;
__WEBPACK_IMPORTED_MODULE_0_kaiju__["h" /* log */].render = true;
__WEBPACK_IMPORTED_MODULE_0_kaiju__["h" /* log */].message = true;
Object(__WEBPACK_IMPORTED_MODULE_6_common_util_router__["b" /* startApp */])({
    app: __WEBPACK_IMPORTED_MODULE_7_app__["a" /* default */],
    elm: document.body,
    snabbdomModules: [
        __WEBPACK_IMPORTED_MODULE_3_snabbdom_es_modules_class__["a" /* default */],
        __WEBPACK_IMPORTED_MODULE_4_snabbdom_es_modules_props__["a" /* default */],
        __WEBPACK_IMPORTED_MODULE_5_snabbdom_es_modules_attributes__["a" /* default */]
    ],
    notFound: __WEBPACK_IMPORTED_MODULE_8_app_routeNotFound__["a" /* default */]
});


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vnode__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__htmldomapi__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__h__ = __webpack_require__(15);
/* unused harmony reexport h */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__thunk__ = __webpack_require__(33);
/* unused harmony reexport thunk */



function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = Object(__WEBPACK_IMPORTED_MODULE_0__vnode__["a" /* default */])('', {}, [], undefined, undefined);
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


function init(modules, domApi) {
    var i, j, cbs = {};
    var api = domApi !== undefined ? domApi : __WEBPACK_IMPORTED_MODULE_2__htmldomapi__["a" /* default */];
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
        return Object(__WEBPACK_IMPORTED_MODULE_0__vnode__["a" /* default */])(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
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
                elm.setAttribute('id', sel.slice(hash + 1, dot));
            if (dotIdx > 0)
                elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode);
            if (__WEBPACK_IMPORTED_MODULE_1__is__["a" /* array */](children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (__WEBPACK_IMPORTED_MODULE_1__is__["b" /* primitive */](vnode.text)) {
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
//# sourceMappingURL=snabbdom.js.map

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export htmlDomApi */
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
var htmlDomApi = {
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
/* harmony default export */ __webpack_exports__["a"] = (htmlDomApi);
//# sourceMappingURL=htmldomapi.js.map

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export thunk */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(15);

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
        return;
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
var thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__h__["a" /* h */])(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
/* unused harmony default export */ var _unused_webpack_default_export = (thunk);
//# sourceMappingURL=thunk.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;
//# sourceMappingURL=is.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = __webpack_require__(9);
var htmldomapi_1 = __webpack_require__(36);
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
        return vnode_1.default('!', {}, [], text, node);
    }
    else {
        return vnode_1.default('', {}, [], undefined, node);
    }
}
exports.toVNode = toVNode;
exports.default = toVNode;
//# sourceMappingURL=tovnode.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = exports.htmlDomApi;
//# sourceMappingURL=htmldomapi.js.map

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snabbdom_h__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snabbdom_h___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_snabbdom_h__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__render__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messages__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__log__ = __webpack_require__(6);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();









var empty = {};

function Component(options) {
  var name = options.name,
      _options$props = options.props,
      props = _options$props === undefined ? empty : _options$props,
      _options$sel = options.sel,
      sel = _options$sel === undefined ? 'component' : _options$sel,
      initState = options.initState,
      connect = options.connect,
      render = options.render,
      _options$log = options.log,
      log = _options$log === undefined ? true : _options$log;


  var key = props.key === undefined ? name : name + '_' + props.key;

  var data = {
    key: key,
    hook: { insert: insert, postpatch: postpatch, destroy: destroy },
    component: { props: props, initState: initState, connect: connect, render: render, key: name, log: log },
    attrs: { name: name }

    // An empty placeholder is returned, and that's all our parent is going to see.
    // Each component handles its own internal rendering.
  };var compVnode = __WEBPACK_IMPORTED_MODULE_0_snabbdom_h___default()(sel, data);
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

  var messages = new __WEBPACK_IMPORTED_MODULE_3__messages__["b" /* default */](vnode.elm);

  component.elm = vnode.elm;
  component.messages = messages;

  var propsObservable = Object(__WEBPACK_IMPORTED_MODULE_4__observable__["a" /* Observable */])(function (add) {
    add(component.props);
    component.lifecycle.propsChanged = add;
  }).named('props');

  // Eagerly subscribe so that the observable get its first value and we honour
  // the ObservableWithInitialValue interface contract.
  propsObservable.subscribe(function (x) {
    return x;
  });

  component.store = Object(__WEBPACK_IMPORTED_MODULE_5__store__["a" /* Store */])(initState(props), function (_ref) {
    var on = _ref.on,
        msg = _ref.msg,
        state = _ref.state;

    messages.storeMsg = msg;

    var connectParams = {
      on: on,
      state: state,
      props: propsObservable,
      msg: messages
    };

    connect(connectParams);
    connected = true;

    // First render.
    // Render right after our parent (which is in the middle of a patch)
    // so that we honour the snabbdom's insert hook,
    // e.g we get patched into our parent after our parent was added to the document.
    Object(__WEBPACK_IMPORTED_MODULE_1__render__["d" /* renderNewComponentNow */])(component);
  }, {
    name: component.key,
    log: Object(__WEBPACK_IMPORTED_MODULE_6__log__["b" /* shouldLog */])(__WEBPACK_IMPORTED_MODULE_6__log__["a" /* default */].message, component)
  });

  component.store.state.sliding2().subscribe(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        newState = _ref3[0],
        oldState = _ref3[1];

    var shouldRender =
    // Skip the first notification (hot observable)
    oldState &&
    // synchronous observables triggering before the first render should just be accumulated
    connected &&
    // the props observable triggered, a synchronous render is made right after so skip
    !component.lifecycle.propsChanging &&
    // null update
    !Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* shallowEqual */])(oldState, newState);

    if (shouldRender) Object(__WEBPACK_IMPORTED_MODULE_1__render__["b" /* renderComponentNextFrame */])(component);
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
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* shallowEqual */])(oldProps, newProps)) {

    component.lifecycle.propsChanging = true;
    component.lifecycle.propsChanged(newProps);
    component.lifecycle.propsChanging = false;

    Object(__WEBPACK_IMPORTED_MODULE_1__render__["c" /* renderComponentNow */])(component);
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
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = debounce;
/* unused harmony export debounceFunction */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function debounce(wait, source) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
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
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = delay;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function delay(delayValue, source) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
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
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = drop;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function drop(count, source) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
    var dropped = 0;
    return source.subscribe(function (val, name) {
      if (dropped++ >= count) add(val, name);
    });
  });
}

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function filter(predicate, source) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
    return source.subscribe(function (val, name) {
      if (predicate(val)) add(val, name);
    });
  });
}

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = flatMapLatest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function flatMapLatest(mapper, source) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
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
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_util__ = __webpack_require__(10);



function fromEvent(name, el, childSelector) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {

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

var nonBubblingEvents = Object(__WEBPACK_IMPORTED_MODULE_1__lib_util__["a" /* Set */])('blur', 'canplay', 'canplaythrough', 'change', 'durationchange', 'emptied', 'ended', 'focus', 'load', 'loadeddata', 'loadedmetadata', 'mouseenter', 'mouseleave', 'pause', 'play', 'playing', 'ratechange', 'reset', 'scroll', 'seeked', 'seeking', 'stalled', 'submit', 'suspend', 'timeupdate', 'unload', 'volumechange', 'waiting');

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
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromPromise;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_space_lift__ = __webpack_require__(4);



function fromPromise(promise) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
    var active = true;

    promise.then(function (value) {
      if (active) add(Object(__WEBPACK_IMPORTED_MODULE_1_space_lift__["b" /* Ok */])(value));
    }, function (error) {
      if (active) add(Object(__WEBPACK_IMPORTED_MODULE_1_space_lift__["a" /* Err */])(error));
    });

    return function () {
      active = false;
    };
  }).named('fromPromise');
}

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = update;
/* unused harmony export DELETE */
/* unused harmony export deepUpdate */
//--------------------------------------
//  Shallow update
//--------------------------------------
/** Performs a shallow update of an object using a partial object of the same shape. A new object is returned. */
function update(host, spec) {
    var result = clone(host);
    for (var key in spec) {
        var specValue = spec[key];
        if (specValue === DELETE) {
            delete result[key];
        }
        else {
            result[key] = specValue;
        }
    }
    return result;
}
// We lie about the public type so that only a property that is optional or that can be assigned to undefined can be DELETE'd
/** Marker used to delete a key */
var DELETE = {};
var _Updater = /** @class */ (function () {
    function _Updater(data) {
        this.data = data;
    }
    _Updater.prototype.at = function (keyOrIndex) {
        return new _Updater({ type: 'at', parent: this, field: keyOrIndex });
    };
    _Updater.prototype.set = function (value) {
        var _this = this;
        var doSet = function (target) {
            var result = _this.cloneForUpdate(target);
            if (result.name === 'aborted')
                return target;
            var clonedTarget = result.clonedTarget, leafHost = result.leafHost, field = result.field;
            value === DELETE ? delete leafHost[field] : leafHost[field] = value;
            return clonedTarget;
        };
        var boundTarget = this.findBoundTarget();
        return boundTarget
            ? doSet(boundTarget)
            : doSet;
    };
    _Updater.prototype.modify = function (modifier) {
        var _this = this;
        var doModify = function (target) {
            var result = _this.cloneForUpdate(target);
            if (result.name === 'aborted')
                return target;
            var clonedTarget = result.clonedTarget, leafHost = result.leafHost, field = result.field;
            var value = modifier(leafHost[field]);
            value === DELETE ? delete leafHost[field] : leafHost[field] = value;
            return clonedTarget;
        };
        var boundTarget = this.findBoundTarget();
        return boundTarget
            ? doModify(boundTarget)
            : doModify;
    };
    _Updater.prototype.withDefault = function (value) {
        return new _Updater({ type: 'withDefault', parent: this, defaultValue: value });
    };
    _Updater.prototype.abortIfUndef = function () {
        return new _Updater({ type: 'abortIfUndef', parent: this });
    };
    _Updater.prototype.findBoundTarget = function () {
        var current = this;
        while (true) {
            if (current.data.type === 'root')
                return current.data.boundTarget;
            current = current.data.parent;
        }
    };
    _Updater.prototype.parentUpdaters = function () {
        var updaters = [this];
        var parentUpdater = this.data.parent;
        // Ignore the root updater
        while (parentUpdater && parentUpdater.data.parent) {
            updaters.unshift(parentUpdater);
            parentUpdater = parentUpdater.data.parent;
        }
        return updaters;
    };
    _Updater.prototype.getNextValue = function (previousHost, host, field, isLast) {
        if (this.data.type === 'at') {
            var newField = this.data.field;
            var value_1 = host[newField];
            var nextValue = isObjectOrArray(value_1) ? clone(value_1) : value_1;
            var newHost_1 = isLast ? host : nextValue;
            host[this.data.field] = nextValue;
            return { host: newHost_1, field: newField };
        }
        var value = previousHost[field];
        if (this.data.type === 'abortIfUndef' && value === undefined) {
            return { host: host, field: field, aborted: true };
        }
        if (this.data.type === 'withDefault' && value === undefined) {
            var nextValue = this.data.defaultValue;
            var newHost_2 = isLast ? previousHost : nextValue;
            previousHost[field] = nextValue;
            return { host: newHost_2, field: field };
        }
        var newHost = isLast ? previousHost : host;
        return { host: newHost, field: field };
    };
    _Updater.prototype.cloneForUpdate = function (target) {
        var updaters = this.parentUpdaters();
        var obj = clone(target);
        var previousHost = obj;
        var host = obj;
        var field = '';
        for (var i = 0; i < updaters.length; i++) {
            var result = updaters[i].getNextValue(previousHost, host, field, i === updaters.length - 1);
            if (result.aborted)
                return { name: 'aborted' };
            previousHost = host;
            host = result.host;
            field = result.field;
        }
        return {
            name: 'result',
            clonedTarget: obj,
            leafHost: host,
            field: field
        };
    };
    return _Updater;
}());
function isObjectOrArray(obj) {
    return obj !== null && typeof obj === 'object';
}
function clone(obj) {
    if (Array.isArray(obj))
        return obj.slice();
    var cloned = {};
    Object.keys(obj).forEach(function (key) { cloned[key] = obj[key]; });
    return cloned;
}
function deepUpdate(target) {
    return new _Updater({ type: 'root', boundTarget: target });
}


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Result */
/* harmony export (immutable) */ __webpack_exports__["b"] = Ok;
/* harmony export (immutable) */ __webpack_exports__["a"] = Err;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

var ResultObject = {};
ResultObject.all = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var okValues = [];
    var arr = Array.isArray(args[0]) ? args[0] : args;
    var currentResult;
    for (var i = 0; i < arr.length; i++) {
        var currentResult_1 = arr[i];
        if (!currentResult_1.isOk())
            return currentResult_1;
        okValues.push(currentResult_1.get());
    }
    return Ok(okValues);
};
ResultObject.isResult = function (value) {
    return !!value && (value.type === 'ok' || value.type === 'err');
};
function _Ok(value) {
    this._value = value;
}
_Ok.prototype = {
    type: 'ok',
    isOk: function () {
        return true;
    },
    map: function (fn) {
        return Ok(Object(__WEBPACK_IMPORTED_MODULE_0__lift__["g" /* getValue */])(fn(this._value)));
    },
    mapError: function (fn) {
        return this;
    },
    flatMap: function (fn) {
        return fn(this._value);
    },
    fold: function (ifErr, ifOk) {
        return ifOk(this._value);
    },
    toString: function () {
        return "Ok(" + this._value + ")";
    },
    get: function () {
        return this._value;
    }
};
function _Err(error) {
    this._error = error;
}
_Err.prototype = {
    type: 'err',
    isOk: function () {
        return false;
    },
    map: function (fn) {
        return this;
    },
    mapError: function (fn) {
        return Err(fn(this._error));
    },
    flatMap: function (fn) {
        return this;
    },
    fold: function (ifErr, ifOk) {
        return ifErr(this._error);
    },
    toString: function () {
        return "Err(" + this._error + ")";
    },
    get: function () {
        return this._error;
    }
};
var Result = ResultObject;
function Ok(value) {
    return new _Ok(value);
}
function Err(error) {
    return new _Err(error);
}


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export range */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/*
* Returns a number[] wrapper with all numbers from start to stop (inclusive),
* incremented or decremented by step.
*/
function range(start, stop, step) {
    if (arguments.length === 1) {
        stop = arguments[0] - 1;
        start = 0;
    }
    step = step || 1;
    var result = [];
    var increasing = step > 0;
    var next = start;
    while ((increasing && next <= stop) || (!increasing && next >= stop)) {
        result.push(next);
        next = next + step;
    }
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](result);
}


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fromArrayLike */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Converts an Array-like object (such as an arguments or NodeList instance) to a regular Array
 */
function fromArrayLike(arrayLike) {
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */]([].slice.call(arrayLike));
}


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export tuple */
function tuple(arr) {
    return arr;
}


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Set */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Creates a Set-like object (string keys, true values) from a list of keys
 */
function Set() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    var result = {};
    keys.forEach(function (key) { return result[key] = true; });
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */](result);
}


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export memoize */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object_is__ = __webpack_require__(18);

var currentMemoId = 0;
/**
 * Memoizes a function of arbitrary arity.
 * This has two main uses:
 *   1) Reducing the CPU time taken by expensive calculations at the cost of some memory overhead
 *   2) Producing stable references for a given set of arguments. Useful when relying on reference equality.
 *
 * Memoized functions keep internal state. If you wish to clear that state entirely, you can recreate the function.
 */
function memoize(fun, options) {
    // The unique property name used by this memoize function instance.
    // This is used to store the id/reference of object arguments, as Weak maps/sets are very limited.
    var memoKey = "__memo__" + currentMemoId++;
    var lastArgKeys = [];
    var cacheSize = (options && options.cacheSize) || 30;
    var keyFunction = options && options.key;
    // The unique ids/references of objects inside the arityNCache cache
    var objId = 0;
    var arity0Cache;
    var arityNCache;
    var keyCache;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // 0 arguments edge-case
        if (args.length === 0) {
            if (!arity0Cache)
                arity0Cache = fun();
            return arity0Cache;
        }
        else if (keyFunction) {
            keyCache = keyCache || {};
            var key = keyFunction.apply(null, args);
            var result = keyCache[key];
            if (!result) {
                lastArgKeys.push(key);
                limitCacheSize(keyCache, lastArgKeys, cacheSize);
                result = keyCache[key] = fun.apply(null, args);
            }
            return result;
        }
        else {
            arityNCache = arityNCache || {};
            var key = '';
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                var argKey = void 0;
                if (Object(__WEBPACK_IMPORTED_MODULE_0__object_is__["object"])(arg)) {
                    argKey = arg[memoKey];
                    if (!argKey) {
                        // Non enumerable
                        Object.defineProperty(arg, memoKey, { value: "obj" + objId++ });
                        argKey = arg[memoKey];
                    }
                }
                else {
                    argKey = arg;
                }
                key += (argKey + '_');
            }
            var result = arityNCache[key];
            if (!result) {
                lastArgKeys.push(key);
                limitCacheSize(arityNCache, lastArgKeys, cacheSize);
                result = arityNCache[key] = fun.apply(null, args);
            }
            return result;
        }
    };
}
function limitCacheSize(cache, lastArgKeys, size) {
    if (lastArgKeys.length === size + 1) {
        var key = lastArgKeys.shift();
        delete cache[key];
    }
}


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = interval;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function interval(time) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
    var intervalId = setInterval(add, time);
    return function () {
      return clearInterval(intervalId);
    };
  }).named('interval');
}

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = map;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function map(mapper, source) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
    return source.subscribe(function (val, name) {
      return add(mapper(val), name);
    });
  });
}

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = merge;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function merge() {
  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
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
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = partition;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function partition(predicate, source) {
  return [Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
    return source.subscribe(function (value, name) {
      if (predicate(value)) add(value, name);
    });
  }), Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
    return source.subscribe(function (value, name) {
      if (!predicate(value)) add(value, name);
    });
  })];
}

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pure;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function pure(value) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
    return add(value);
  }).named('pure');
}

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = sliding2;
/* harmony export (immutable) */ __webpack_exports__["a"] = sliding;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function sliding2(source) {
  return sliding(2, source);
}

function sliding(size, source) {
  var window = [];

  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
    return source.subscribe(function (val, name) {
      window = [val].concat(window);
      window = window.slice(0, size);
      add(window, name);
    });
  });
}

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = throttle;
/* unused harmony export throttleFunction */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



function throttle(wait, source) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
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
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return eventsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messages__ = __webpack_require__(17);



/* snabbdom module extension used to register Messages as event listeners */

function updateEventListeners(oldVnode, vnode) {
  var oldEvents = oldVnode.data.events;
  var events = vnode.data.events;

  if (!events) return;

  var listeners = oldEvents ? oldEvents.listeners : {};
  events.listeners = listeners;

  var _loop = function _loop() {
    var message = events[name];
    var oldMessage = oldEvents && oldEvents[name];

    if (message && message !== oldMessage) {

      if (oldMessage && isSameMessageAndPayload(message, oldMessage)) return 'continue';

      if (listeners[name]) vnode.elm.removeEventListener(name, listeners[name]);

      listeners[name] = function (evt) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__messages__["a" /* _sendToElement */])(evt.currentTarget, message(evt));
      };
      vnode.elm.addEventListener(name, listeners[name]);
    }
  };

  for (name in events) {
    var _ret = _loop();

    if (_ret === 'continue') continue;
  }

  if (!oldEvents) return;

  for (name in oldEvents) {
    if (events[name] === undefined) vnode.elm.removeEventListener(name, listeners[name]);
  }
}

function isSameMessageAndPayload(message, oldMessage) {
  return message._id === oldMessage._id && message.payload === oldMessage.payload;
}

var eventsModule = {
  create: updateEventListeners,
  update: updateEventListeners
};

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__anchors__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StateWithParams__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Transition__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__State__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api__ = __webpack_require__(21);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };








var defaultOptions = {
  enableLogs: false,
  interceptAnchors: true,
  notFound: null,
  urlSync: 'history',
  hashPrefix: ''
};

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
  var eventCallbacks = {};

  var options = __WEBPACK_IMPORTED_MODULE_3__util__["b" /* copyObject */](defaultOptions);
  var firstTransition = true;
  var ignoreNextURLChange = false;
  var currentPathQuery = void 0;
  var currentParamsDiff = {};
  var currentState = void 0;
  var previousState = void 0;
  var transition = void 0;
  var leafStates = void 0;
  var urlChanged = void 0;
  var initialized = void 0;
  var hashSlashString = void 0;

  /*
  * Setting a new state will start a transition from the current state to the target state.
  * A successful transition will result in the URL being changed.
  * A failed transition will leave the router in its current state.
  */
  function setState(state, params, acc) {
    var fromState = transition ? Object(__WEBPACK_IMPORTED_MODULE_1__StateWithParams__["a" /* default */])(transition.currentState, transition.toParams) : currentState;

    var diff = __WEBPACK_IMPORTED_MODULE_3__util__["h" /* objectDiff */](fromState && fromState.params, params);

    var toState = Object(__WEBPACK_IMPORTED_MODULE_1__StateWithParams__["a" /* default */])(state, params, currentPathQuery, diff);

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

    transition = Object(__WEBPACK_IMPORTED_MODULE_2__Transition__["a" /* default */])(fromState, toState, diff, acc, router, logger);

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
    __WEBPACK_IMPORTED_MODULE_3__util__["e" /* mergeObjects */](options, withOptions);
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

    if (options.interceptAnchors) Object(__WEBPACK_IMPORTED_MODULE_0__anchors__["a" /* default */])(router);

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
  * Used for testing purposes where we keep reusing the same router instance.
  */
  function terminate() {
    window.onhashchange = null;
    window.onpopstate = null;
    options = __WEBPACK_IMPORTED_MODULE_3__util__["b" /* copyObject */](defaultOptions);
    logger.enabled = false;
    logger.log = logger.error = __WEBPACK_IMPORTED_MODULE_3__util__["f" /* noop */];
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
    var stateArray = __WEBPACK_IMPORTED_MODULE_3__util__["i" /* objectToArray */](states);

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
      var path = __WEBPACK_IMPORTED_MODULE_3__util__["g" /* normalizePathQuery */](leafStates[name].fullPath());
      if (paths[path]) throw new Error('Ambiguous state paths: ' + path);
      paths[path] = 1;
    }
  }

  function addDefaultStates(states) {
    states.forEach(function (state) {
      var children = __WEBPACK_IMPORTED_MODULE_3__util__["i" /* objectToArray */](state.states);

      // This is a parent state: Add a default state to it if there isn't already one
      if (children.length) {
        addDefaultStates(children);

        var hasDefaultState = children.reduce(function (result, state) {
          return state.path == '' || result;
        }, false);

        if (hasDefaultState) return;

        var defaultState = Object(__WEBPACK_IMPORTED_MODULE_4__State__["a" /* default */])({ uri: '' });
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
        state.paths = __WEBPACK_IMPORTED_MODULE_3__util__["j" /* parsePaths */](state.fullPath());
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

    currentState = Object(__WEBPACK_IMPORTED_MODULE_1__StateWithParams__["a" /* default */])(currentState.state, newParams, newUri);

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
    var state = void 0,
        params = void 0,
        _state = void 0,
        _params = void 0;

    currentPathQuery = __WEBPACK_IMPORTED_MODULE_3__util__["g" /* normalizePathQuery */](pathQuery);

    var pq = currentPathQuery.split('?');
    var path = pq[0];
    var query = pq[1];
    var paths = __WEBPACK_IMPORTED_MODULE_3__util__["j" /* parsePaths */](path);
    var queryParams = __WEBPACK_IMPORTED_MODULE_3__util__["k" /* parseQueryParams */](query);

    for (var name in leafStates) {
      _state = leafStates[name];
      _params = _state.matches(paths);

      if (_params) {
        state = _state;
        params = __WEBPACK_IMPORTED_MODULE_3__util__["e" /* mergeObjects */](_params, queryParams);
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
    var pathQuery = void 0;

    if (hashSlash > -1) pathQuery = location.href.slice(hashSlash + hashSlashString.length);else if (isHashMode()) pathQuery = '/';else pathQuery = (location.pathname + location.search).slice(1);

    return __WEBPACK_IMPORTED_MODULE_3__util__["g" /* normalizePathQuery */](pathQuery);
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
    var uri = __WEBPACK_IMPORTED_MODULE_3__util__["g" /* normalizePathQuery */](interpolated);

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
    return allStatesRec(__WEBPACK_IMPORTED_MODULE_3__util__["i" /* objectToArray */](states), []);
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
    return __WEBPACK_IMPORTED_MODULE_3__util__["d" /* mapValues */](states, stateTree);
  }

  /*
  * Creates an internal State object from a specification POJO.
  */
  function stateTree(state) {
    if (state.children) state.children = stateTrees(state.children);
    return Object(__WEBPACK_IMPORTED_MODULE_4__State__["a" /* default */])(state);
  }

  function logStateTree() {
    if (!logger.enabled) return;

    function indent(level) {
      if (level == 0) return '';
      return new Array(2 + (level - 1) * 4).join(' ') + '── ';
    }

    var stateTree = function stateTree(state) {
      var path = __WEBPACK_IMPORTED_MODULE_3__util__["g" /* normalizePathQuery */](state.fullPath());
      var pathStr = state.children.length == 0 ? ' (@ path)'.replace('path', path) : '';
      var str = indent(state.parents.length) + state.name + pathStr + '\n';
      return str + state.children.map(stateTree).join('');
    };

    var msg = '\nState tree\n\n';
    msg += __WEBPACK_IMPORTED_MODULE_3__util__["i" /* objectToArray */](states).map(stateTree).join('');
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

  __WEBPACK_IMPORTED_MODULE_3__util__["e" /* mergeObjects */](__WEBPACK_IMPORTED_MODULE_5__api__["a" /* default */], router);

  return router;
}

// Logging

var logger = {
  log: __WEBPACK_IMPORTED_MODULE_3__util__["f" /* noop */],
  error: __WEBPACK_IMPORTED_MODULE_3__util__["f" /* noop */],
  enabled: false
};

Router.enableLogs = function () {
  logger.enabled = true;

  logger.log = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var message = __WEBPACK_IMPORTED_MODULE_3__util__["c" /* makeMessage */].apply(null, args);
    console.log(message);
  };

  logger.error = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var message = __WEBPACK_IMPORTED_MODULE_3__util__["c" /* makeMessage */].apply(null, args);
    console.error(message);
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Router);

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = interceptAnchors;

var router = void 0;

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
  var protocol = anchor.protocol;

  // IE10 can lose the hostname/port property when setting a relative href from JS
  if (!hostname) {
    var tempAnchor = document.createElement("a");
    tempAnchor.href = anchor.href;
    hostname = tempAnchor.hostname;
    port = tempAnchor.port;
    protocol = tempAnchor.protocol;
  }

  var defaultPort = protocol.split(':')[0] === 'https' ? '443' : '80';

  var sameHostname = hostname == location.hostname;
  var samePort = (port || defaultPort) == (location.port || defaultPort);

  return sameHostname && samePort;
}

function interceptAnchors(forRouter) {
  router = forRouter;

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('click', onMouseClick);
}

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = StateWithParams;
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
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
* Create a new Transition instance.
*/
function Transition(fromStateWithParams, toStateWithParams, paramsDiff, acc, router, logger) {
  var root = { root: null, inclusive: true };
  var enters = void 0;
  var exits = void 0;

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
  var closestCommonParent = void 0;

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
  for (var _i = 0; _i < parents.length; _i++) {
    var _parent = parents[_i];

    for (var param in paramsDiff.all) {
      if (_parent.params[param] || _parent.queryParams[param]) return { root: _parent, inclusive: true };
    }

    if (_parent === closestCommonParent) return { root: closestCommonParent, inclusive: false };
  }

  return closestCommonParent ? { root: closestCommonParent, inclusive: false } : { inclusive: true };
}

function transitionStates(state, _ref) {
  var root = _ref.root,
      inclusive = _ref.inclusive;

  root = root || state.root;

  var p = state.parents;
  var end = Math.min(p.length, p.indexOf(root) + (inclusive ? 1 : 0));

  return [state].concat(p.slice(0, end));
}

/* harmony default export */ __webpack_exports__["a"] = (Transition);

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(12);


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

  state.enter = options.enter || __WEBPACK_IMPORTED_MODULE_0__util__["f" /* noop */];
  state.update = options.update;
  state.exit = options.exit || __WEBPACK_IMPORTED_MODULE_0__util__["f" /* noop */];

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
    state.children = __WEBPACK_IMPORTED_MODULE_0__util__["i" /* objectToArray */](states);
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
      return __WEBPACK_IMPORTED_MODULE_0__util__["e" /* mergeObjects */](acc, parent.queryParams);
    }, __WEBPACK_IMPORTED_MODULE_0__util__["b" /* copyObject */](state.queryParams));
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
        var _name = paramName(thatPath);
        params[_name] = path;
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
  return matches ? __WEBPACK_IMPORTED_MODULE_0__util__["a" /* arrayToObject */](matches.map(paramName)) : {};
}

function queryParamsFromURI(uri) {
  var query = (uri || '').split('?')[1];
  return query ? __WEBPACK_IMPORTED_MODULE_0__util__["a" /* arrayToObject */](query.split('&')) : {};
}

/* harmony default export */ __webpack_exports__["a"] = (State);

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transform__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array_append__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__array_appendAll__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__array_compact__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__array_count__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__array_distinct__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__array_drop__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__array_dropRight__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__array_every__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__array_filter__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__array_find__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__array_findIndex__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__array_first__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__array_flatMap__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__array_flatten__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__array_fold__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__array_foldRight__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__array_get__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__array_groupBy__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__array_insert__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__array_insertAll__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__array_join__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__array_last__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__array_map__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__array_removeAt__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__array_reverse__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__array_some__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__array_sort__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__array_take__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__array_takeRight__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__array_toSet__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__array_updateAt__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__object_add__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__object_assoc__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__object_contains__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__object_dissoc__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__object_filter__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__object_get__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__object_isEmpty__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__object_keys__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__object_mapValues__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__object_remove__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__object_toArray__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__object_values__ = __webpack_require__(107);

//--------------------------------------
//  Array
//--------------------------------------































//--------------------------------------
//  Object
//--------------------------------------














/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export transform */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

function transform(func) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__lift__["f" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0__lift__["g" /* getValue */])(func(this.value())));
}
__WEBPACK_IMPORTED_MODULE_0__lift__["c" /* NumberOps */].prototype.transform = transform;
__WEBPACK_IMPORTED_MODULE_0__lift__["e" /* StringOps */].prototype.transform = transform;
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.transform = transform;
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.transform = transform;
__WEBPACK_IMPORTED_MODULE_0__lift__["b" /* DateOps */].prototype.transform = transform;


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export append */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Appends one item at the end of the Array.
 */
function append(item) {
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](this.value().concat([item]));
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.append = append;


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export appendAll */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Appends an Array of items at the end of the Array.
 */
function appendAll(items) {
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](this.value().concat(items));
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.appendAll = appendAll;


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export compact */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Filters all the falsy elements out of this Array.
 * All occurences of false, null, undefined, 0, "" will be removed.
 */
function compact() {
    return this.filter(function (x) { return !!x; });
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.compact = compact;


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export count */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Counts the items satisfying a predicate.
 */
function count(predicate) {
    var arr = this.value(), result = 0;
    for (var i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i))
            result++;
    }
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["c" /* NumberOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.count = count;


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export distinct */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

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
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.distinct = distinct;


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export drop */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Drops the first 'count' items from this Array.
 */
function drop(count) {
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](this.value().slice(count));
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.drop = drop;


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export dropRight */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Drops the last 'count' items from this Array.
 */
function dropRight(count) {
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](this.value().slice(0, -count));
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.dropRight = dropRight;


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export every */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Returns whether all items satisfies the predicate.
 */
function every(predicate) {
    var arr = this.value();
    for (var i = 0; i < arr.length; i++) {
        if (!predicate(arr[i], i))
            return false;
    }
    return true;
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.every = every;


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export filter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

function filter(predicate) {
    var arr = this.value(), result = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate(item, i))
            result.push(item);
    }
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.filter = filter;


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export find */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__option__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lift__ = __webpack_require__(0);


/**
 * Finds the first item in this Array satisfying a predicate.
 */
function find(predicate) {
    var arr = this.value();
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate(item, i))
            return Object(__WEBPACK_IMPORTED_MODULE_0__option__["b" /* Option */])(item);
    }
    return __WEBPACK_IMPORTED_MODULE_0__option__["a" /* None */];
}
__WEBPACK_IMPORTED_MODULE_1__lift__["a" /* ArrayOps */].prototype.find = find;


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export findIndex */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__option__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lift__ = __webpack_require__(0);


/**
 * Finds the first item index in this Array satisfying a predicate.
 */
function findIndex(predicate) {
    var arr = this.value();
    for (var i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i))
            return Object(__WEBPACK_IMPORTED_MODULE_0__option__["b" /* Option */])(i);
    }
    return __WEBPACK_IMPORTED_MODULE_0__option__["a" /* None */];
}
__WEBPACK_IMPORTED_MODULE_1__lift__["a" /* ArrayOps */].prototype.findIndex = findIndex;


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export first */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__option__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lift__ = __webpack_require__(0);


/**
 * Returns the first item of this Array, as an Option.
 */
function first() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__option__["b" /* Option */])(this.value()[0]);
}
__WEBPACK_IMPORTED_MODULE_1__lift__["a" /* ArrayOps */].prototype.first = first;


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export flatMap */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__option__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lift__ = __webpack_require__(0);


/**
 * Maps this Array to an Array of Array | Option | ArrayOps using a mapper function then flattens it.
 */
function flatMap(fun) {
    var arr = this.value(), result = [];
    for (var i = 0; i < arr.length; i++) {
        var item = fun(arr[i], i);
        if (__WEBPACK_IMPORTED_MODULE_0__option__["b" /* Option */].isOption(item))
            item.isDefined() && result.push(item.get());
        else
            result.push.apply(result, Object(__WEBPACK_IMPORTED_MODULE_1__lift__["g" /* getValue */])(item));
    }
    return new __WEBPACK_IMPORTED_MODULE_1__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_1__lift__["a" /* ArrayOps */].prototype.flatMap = flatMap;


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export flatten */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__option__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lift__ = __webpack_require__(0);


/**
 * Flattens this Array of Arrays/Options.
 */
function flatten() {
    var arr = this.value(), result = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (__WEBPACK_IMPORTED_MODULE_0__option__["b" /* Option */].isOption(item))
            item.isDefined() && result.push(item.get());
        else
            result.push.apply(result, item);
    }
    return new __WEBPACK_IMPORTED_MODULE_1__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_1__lift__["a" /* ArrayOps */].prototype.flatten = flatten;


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fold */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Folds this Array into a single value, using a starting value.
 */
function fold(startValue, func) {
    var arr = this.value(), result = startValue;
    for (var i = 0; i < arr.length; i++) {
        result = func(result, arr[i], i);
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__lift__["f" /* default */])(result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.fold = fold;


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export foldRight */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Folds this Array into a single value, using a starting value, from the right.
 */
function foldRight(startValue, func) {
    var arr = this.value(), result = startValue, i = arr.length;
    while (i--) {
        result = func(result, arr[i], i);
    }
    return typeof result === 'boolean' ? result : Object(__WEBPACK_IMPORTED_MODULE_0__lift__["f" /* default */])(result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.foldRight = foldRight;


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export get */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__option__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lift__ = __webpack_require__(0);


/**
 * Returns the item found at the provided index, as an Option.
 */
function get(index) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__option__["b" /* Option */])(this.value()[index]);
}
__WEBPACK_IMPORTED_MODULE_1__lift__["a" /* ArrayOps */].prototype.get = get;


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export groupBy */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

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
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */](groups);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.groupBy = groupBy;


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export insert */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Insert an item at a specified index.
 */
function insert(index, item) {
    var result = this.value().slice();
    result.splice(index, 0, item);
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.insert = insert;


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export insertAll */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Insert an Array of items at a specified index.
 */
function insertAll(index, items) {
    var result = this.value().slice();
    result.splice.apply(result, [index, 0].concat(items));
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.insertAll = insertAll;


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export join */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Joins the items into a string, using a separator.
 */
function join(separator) {
    if (separator === void 0) { separator = ','; }
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["e" /* StringOps */](this.value().join(separator));
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.join = join;


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export last */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__option__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lift__ = __webpack_require__(0);


/**
 * Returns the last item of this Array, as an Option.
 */
function last() {
    var arr = this.value();
    return Object(__WEBPACK_IMPORTED_MODULE_0__option__["b" /* Option */])(arr[arr.length - 1]);
}
__WEBPACK_IMPORTED_MODULE_1__lift__["a" /* ArrayOps */].prototype.last = last;


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export map */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Maps this Array using a mapper function.
 */
function map(fun) {
    var arr = this.value(), result = [];
    for (var i = 0; i < arr.length; i++) {
        result[i] = Object(__WEBPACK_IMPORTED_MODULE_0__lift__["g" /* getValue */])(fun(arr[i], i));
    }
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.map = map;


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export removeAt */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Removes the item found at the specified index.
 */
function removeAt(index) {
    var result = this.value().slice();
    result.splice(index, 1);
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.removeAt = removeAt;


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export reverse */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Reverses the Array.
 */
function reverse() {
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](this.value().slice().reverse());
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.reverse = reverse;


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export some */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Returns whether at least one item satisfies the predicate.
 */
function some(predicate) {
    var arr = this.value();
    for (var i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i))
            return true;
    }
    return false;
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.some = some;


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export sort */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

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
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.sort = sort;


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export take */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Takes the first 'count' items from this Array.
 */
function take(count) {
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](this.value().slice(0, count));
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.take = take;


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export takeRight */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Takes the last 'count' items from this Array.
 */
function takeRight(count) {
    var arr = this.value();
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */]((arr.length < count)
        ? arr.slice(0)
        : arr.slice(arr.length - count));
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.takeRight = takeRight;


/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export toSet */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Converts this Array of numbers or strings to a Set-like object where values are all truthy.
 */
function toSet() {
    var arr = this.value(), result = {};
    for (var i = 0; i < arr.length; i++) {
        result[arr[i]] = true;
    }
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.toSet = toSet;


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export updateAt */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Updates an item at the specified index.
 */
function updateAt(index, updater) {
    var result = this.value().slice();
    if (result.length > index)
        result[index] = Object(__WEBPACK_IMPORTED_MODULE_0__lift__["g" /* getValue */])(updater(result[index]));
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */].prototype.updateAt = updateAt;


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export assoc */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__add__ = __webpack_require__(22);


// Fake function body just to get TSDoc on augmented interface :(
/**
 * Adds a key/value to this homogeneous key/value object.
 * To add a (nullable) key to an object while preserving its type, use "update()" instead.
 * To add a key to an object and create a new type, use "add()"
 */
function assoc(key, value) {
    return {};
}
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.assoc = __WEBPACK_IMPORTED_MODULE_1__add__["a" /* add */];


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export contains */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Returns whether this object contains a specific key.
 */
function contains(key) {
    return this.value().hasOwnProperty(key);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.contains = contains;


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export dissoc */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__remove__ = __webpack_require__(23);


// Fake function body just to get TSDoc on augmented interface :(
/**
 * Removes a key/value from this homogeneous key/value object.
 * To remove a (nullable) key from an object while preserving its type, use "update()" instead.
 * To remove a key from an object and create a new type, use "remove()"
 */
function dissoc(key) {
    return {};
}
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.dissoc = __WEBPACK_IMPORTED_MODULE_1__remove__["a" /* remove */];


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export filter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

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
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.filter = filter;


/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export get */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__option__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lift__ = __webpack_require__(0);


/**
 * Returns the value found at the provided key, as an Option.
 * Usage 1: read a value from a "Map" object
 * Usage 2: read an optional value from a domain object
 */
function get(key) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__option__["b" /* Option */])(this.value()[key]);
}
__WEBPACK_IMPORTED_MODULE_1__lift__["d" /* ObjectOps */].prototype.get = get;


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isEmpty */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Returns whether this object contains no keys.
 */
function isEmpty() {
    return Object.keys(this.value()).length === 0;
}
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.isEmpty = isEmpty;


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export keys */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Creates an Array of all this object's keys, in no particular order.
 */
function keys() {
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](Object.keys(this.value()));
}
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.keys = keys;


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export mapValues */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Maps all the values of this object.
 */
function mapValues(mapper) {
    var obj = this.value(), result = {};
    Object.keys(obj).forEach(function (key) {
        var value = mapper(key, obj[key]);
        result[key] = value;
    });
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.mapValues = mapValues;


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export toArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Converts this object to an Array of tuples.
 */
function toArray() {
    var obj = this.value(), result = [];
    Object.keys(obj).forEach(function (key) {
        result.push([key, obj[key]]);
    });
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.toArray = toArray;


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export values */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lift__ = __webpack_require__(0);

/**
 * Creates an Array of all this object's values.
 */
function values() {
    var obj = this.value(), result = [];
    Object.keys(obj).forEach(function (key) {
        result.push(obj[key]);
    });
    return new __WEBPACK_IMPORTED_MODULE_0__lift__["a" /* ArrayOps */](result);
}
__WEBPACK_IMPORTED_MODULE_0__lift__["d" /* ObjectOps */].prototype.values = values;


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export classModule */
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
var classModule = { create: updateClass, update: updateClass };
/* harmony default export */ __webpack_exports__["a"] = (classModule);
//# sourceMappingURL=class.js.map

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export propsModule */
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
var propsModule = { create: updateProps, update: updateProps };
/* harmony default export */ __webpack_exports__["a"] = (propsModule);
//# sourceMappingURL=props.js.map

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export attributesModule */
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var colonChar = 58;
var xChar = 120;
function updateAttrs(oldVnode, vnode) {
    var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs;
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
            if (cur === true) {
                elm.setAttribute(key, "");
            }
            else if (cur === false) {
                elm.removeAttribute(key);
            }
            else {
                if (key.charCodeAt(0) !== xChar) {
                    elm.setAttribute(key, cur);
                }
                else if (key.charCodeAt(3) === colonChar) {
                    // Assume xml namespace
                    elm.setAttributeNS(xmlNS, key, cur);
                }
                else if (key.charCodeAt(5) === colonChar) {
                    // Assume xlink namespace
                    elm.setAttributeNS(xlinkNS, key, cur);
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
var attributesModule = { create: updateAttrs, update: updateAttrs };
/* harmony default export */ __webpack_exports__["a"] = (attributesModule);
//# sourceMappingURL=attributes.js.map

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page1__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page2__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routeNotFound__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_route__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view__ = __webpack_require__(121);





/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3_route__["a" /* RouteDef */])('', {
    enter: function (router) { return function (route, child) { return Object(__WEBPACK_IMPORTED_MODULE_4__view__["a" /* default */])({ child: child, router: router, route: route }); }; },
    children: {
        page1: Object(__WEBPACK_IMPORTED_MODULE_0__page1__["a" /* default */])(),
        page2: Object(__WEBPACK_IMPORTED_MODULE_1__page2__["a" /* default */])(),
        notFound: __WEBPACK_IMPORTED_MODULE_2__routeNotFound__["a" /* default */]
    }
}));


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = route;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_route__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view__ = __webpack_require__(115);



function route() {
    var store;
    return Object(__WEBPACK_IMPORTED_MODULE_0_route__["a" /* RouteDef */])('', {
        enter: function () {
            store = Object(__WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */])();
            return function () { return Object(__WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */])({ store: store }); };
        },
        exit: function () {
            store.destroy();
        },
        children: {}
    });
}


/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_space_lift__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_validation_ts__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_kaiju__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_util_ajax__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_util_remoteData__ = __webpack_require__(26);





var initState = {
    users: __WEBPACK_IMPORTED_MODULE_4_common_util_remoteData__["c" /* NotAsked */]
};
/* harmony default export */ __webpack_exports__["a"] = (function () {
    var getUsers = observeGetUsers();
    return Object(__WEBPACK_IMPORTED_MODULE_2_kaiju__["e" /* Store */])(initState, function (_a) {
        var on = _a.on, state = _a.state;
        on(getUsers.data, function (users) {
            return Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["d" /* update */])(state(), { users: users });
        });
    });
});
var userValidator = Object(__WEBPACK_IMPORTED_MODULE_1_validation_ts__["c" /* object */])({
    name: Object(__WEBPACK_IMPORTED_MODULE_1_validation_ts__["c" /* object */])({
        first: __WEBPACK_IMPORTED_MODULE_1_validation_ts__["d" /* string */],
        last: __WEBPACK_IMPORTED_MODULE_1_validation_ts__["d" /* string */]
    })
});
var usersValidator = Object(__WEBPACK_IMPORTED_MODULE_1_validation_ts__["c" /* object */])({
    results: Object(__WEBPACK_IMPORTED_MODULE_1_validation_ts__["a" /* array */])(userValidator.map(function (u) { return u.name.first + " " + u.name.last; }))
}).map(function (obj) { return obj.results; });
function observeGetUsers() {
    return Object(__WEBPACK_IMPORTED_MODULE_3_common_util_ajax__["b" /* observeAjax */])({
        name: 'users',
        ajax: function () { return Object(__WEBPACK_IMPORTED_MODULE_3_common_util_ajax__["a" /* ajax */])({ method: 'GET', url: 'https://randomuser.me/api/?results=20', validator: usersValidator }); },
        callNow: true
    });
}


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ajax;
/* harmony export (immutable) */ __webpack_exports__["b"] = observeAjax;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_space_lift__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kaiju__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_validation_ts__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_util_remoteData__ = __webpack_require__(26);
/* tslint:disable:no-any */




/*
 * Wraps a XMLHttpRequest and return a Promise of Result.
 * The returned Promise can never fail (promise error handling is a pain).
 *
 * The underlying XMLHttpRequest is also passed in the result to perform low level manipulation (e.g getResponseHeader(), etc)
 */
function ajax(options) {
    var method = options.method, url = options.url, body = options.body, validator = options.validator, _a = options.headers, headers = _a === void 0 ? {} : _a, onProgress = options.onProgress;
    var isFormData = body instanceof FormData;
    var jsonBody;
    if (body !== undefined && !isFormData) {
        if (!('Content-Type' in headers))
            headers['Content-Type'] = 'application/json';
        if (headers['Content-Type'] === 'application/json')
            jsonBody = JSON.stringify(body);
    }
    if (!headers['Accept'])
        headers['Accept'] = 'application/json';
    var xhr = new XMLHttpRequest();
    var promise = new Promise(function (resolve) {
        if (onProgress)
            xhr.upload.addEventListener('progress', onProgress);
        var abortXhr = xhr.abort;
        // Intercept the abortion as there is no way to tell from onreadystatechange:
        // Both a network error and an abort() would result in a status of 0.
        xhr.abort = function () {
            xhr.onreadystatechange = null;
            abortXhr();
            resolve(Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])({ type: 'aborted' }));
        };
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4)
                return;
            // IE can throw an error when accessing the status
            var status = 0;
            try {
                status = xhr.status;
            }
            catch (e) { }
            if (status === 0)
                return resolve(Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])({ type: 'networkError' }));
            if (!isOkStatus(status))
                return resolve(Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])({ type: 'badResponse', code: status, response: xhr.responseText }));
            var responseBody;
            try {
                responseBody = JSON.parse(xhr.responseText);
            }
            catch (e) {
                return resolve(Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])({
                    type: 'badPayload',
                    payload: xhr.responseText,
                    validationErrors: []
                }));
            }
            var validated = validator.validate(responseBody);
            if (validated.isOk())
                resolve(validated);
            else
                resolve(Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])({
                    type: 'badPayload',
                    payload: responseBody,
                    validationErrors: validated.get()
                }));
        };
        xhr.open(method, url, true);
        Object.keys(headers).forEach(function (name) { return xhr.setRequestHeader(name, headers[name]); });
        if (isFormData)
            xhr.send(body);
        else if (jsonBody !== undefined)
            xhr.send(jsonBody);
        else
            xhr.send();
    })
        .catch(function (error) { return Object(__WEBPACK_IMPORTED_MODULE_0_space_lift__["a" /* Err */])({ type: 'technicalError', error: error }); });
    if (true) {
        promise.then(function (value) {
            if (value.isOk())
                return;
            var error = value.get();
            switch (error.type) {
                case 'networkError': return console.error('Network error');
                case 'aborted': return console.warn('Aborted ajax request');
                case 'badPayload': return console.error(error, "\n" + Object(__WEBPACK_IMPORTED_MODULE_2_validation_ts__["b" /* errorDebugString */])(error.validationErrors));
                case 'badResponse': return console.error(error);
                case 'technicalError': return console.error('???');
            }
        });
    }
    return Object.assign(promise, { xhr: xhr });
}
function isOkStatus(s) {
    return s >= 200 && s < 300 || s === 303 || s === 304;
}
/**
 * Creates a data, error and loading observables out of a one-off or recurrent ajax call.
 */
function observeAjax(options) {
    var name = options.name;
    var ajax = options.ajax;
    var dynamicOptions = options;
    var call = Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["c" /* Observable */])();
    var hasCallNowWith = ('callNowWith' in options) || ('callNow' in options);
    var trigger = hasCallNowWith
        ? __WEBPACK_IMPORTED_MODULE_1_kaiju__["c" /* Observable */].merge(call, __WEBPACK_IMPORTED_MODULE_1_kaiju__["c" /* Observable */].pure(dynamicOptions.callNowWith))
        : call;
    var result = trigger.flatMapLatest(function (arg) {
        return __WEBPACK_IMPORTED_MODULE_1_kaiju__["c" /* Observable */].fromPromise(ajax(arg));
    }).map(function (promiseResult) {
        // Unwrap the Promise's Result: It is safe because a Promise from ajax() can never fail.
        var ajaxResult = promiseResult.get();
        return ajaxResult.fold(__WEBPACK_IMPORTED_MODULE_3_common_util_remoteData__["a" /* Failure */], __WEBPACK_IMPORTED_MODULE_3_common_util_remoteData__["d" /* Success */]);
    });
    var loading = trigger.map(function (_) { return __WEBPACK_IMPORTED_MODULE_3_common_util_remoteData__["b" /* Loading */]; });
    var notAsked = hasCallNowWith ? Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["c" /* Observable */])() : __WEBPACK_IMPORTED_MODULE_1_kaiju__["c" /* Observable */].pure(__WEBPACK_IMPORTED_MODULE_3_common_util_remoteData__["c" /* NotAsked */]);
    var data = __WEBPACK_IMPORTED_MODULE_1_kaiju__["c" /* Observable */].merge(notAsked, loading, result);
    return {
        data: data.named(name + '_remoteData'),
        // We want call() to return undefined so it can be used inside Store handler one liners.
        call: function (value) { call(value); }
    };
}


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page1_less__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page1_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__page1_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kaiju__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_space_lift__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_widget_animation_single_fade__ = __webpack_require__(117);




/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["f" /* connectToStore */])()(page1, function (store) { return ({ users: store.state().users }); }));
function page1(props) {
    return Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["a" /* Component */])({ name: 'page1', props: props, initState: initState, connect: connect, render: render });
}
function initState() {
    return {
        count: 0
    };
}
var increment = Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["b" /* Message */])('increment');
function connect(_a) {
    var on = _a.on, state = _a.state;
    on(increment, function () { return Object(__WEBPACK_IMPORTED_MODULE_2_space_lift__["d" /* update */])(state(), { count: state().count + 1 }); });
}
function render(_a) {
    var props = _a.props, state = _a.state;
    var users = props.users;
    var count = state.count;
    var usersEl = users.type === 'success'
        ? Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["g" /* h */])('ul', users.data.map(function (u) { return Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["g" /* h */])('li', u); }))
        : Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["g" /* h */])('div', 'Loading...');
    return Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["g" /* h */])('div', [
        Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["g" /* h */])('p', "count = " + count),
        Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["g" /* h */])("button." + __WEBPACK_IMPORTED_MODULE_0__page1_less__["incrementButton"], { events: { click: increment } }, 'increment'),
        Object(__WEBPACK_IMPORTED_MODULE_3_common_widget_animation_single_fade__["a" /* fadeIn */])(usersEl)
    ]);
}


/***/ }),
/* 116 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"incrementButton":"incrementButton-16AOO"};

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fadeInOutAnimation */
/* unused harmony export fadeInAnimation */
/* unused harmony export fadeInOut */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fadeIn; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fade_less__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fade_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__fade_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_widget_animation_single_singleAnimation__ = __webpack_require__(27);


var fadeInOutAnimation = {
    create: function (elm) {
        elm.classList.remove(__WEBPACK_IMPORTED_MODULE_0__fade_less__["fadeout"]);
        elm.classList.add(__WEBPACK_IMPORTED_MODULE_0__fade_less__["fadein"]);
    },
    remove: function (elm, cb) {
        elm.classList.remove(__WEBPACK_IMPORTED_MODULE_0__fade_less__["fadein"]);
        elm.classList.add(__WEBPACK_IMPORTED_MODULE_0__fade_less__["fadeout"]);
        elm.addEventListener('animationend', cb);
    }
};
var fadeInAnimation = {
    create: fadeInOutAnimation.create,
    remove: function (_, cb) { cb(); }
};
var fadeInOut = Object(__WEBPACK_IMPORTED_MODULE_1_common_widget_animation_single_singleAnimation__["a" /* default */])(fadeInOutAnimation);
var fadeIn = Object(__WEBPACK_IMPORTED_MODULE_1_common_widget_animation_single_singleAnimation__["a" /* default */])(fadeInAnimation);


/***/ }),
/* 118 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"fadein":"fadein-SY8-f","fadeout":"fadeout-2q_Wv"};

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = route;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_route__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view__ = __webpack_require__(120);


function route() {
    return Object(__WEBPACK_IMPORTED_MODULE_0_route__["a" /* RouteDef */])('plop', {
        enter: function () { return function () { return Object(__WEBPACK_IMPORTED_MODULE_1__view__["a" /* default */])(); }; },
        children: {}
    });
}


/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = view;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kaiju__ = __webpack_require__(2);

function view() {
    return Object(__WEBPACK_IMPORTED_MODULE_0_kaiju__["g" /* h */])('h1', { key: 'page2' }, 'Page 2');
}


/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = app;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_less__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kaiju__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_widget_animation_single_slideDown__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_widget_link__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_route__ = __webpack_require__(5);





function app(props) {
    return Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["a" /* Component */])({ name: 'app', props: props, initState: initState, connect: connect, render: render });
}
function initState() {
    return {};
}
function connect(_a) { }
function render(_a) {
    var props = _a.props;
    var router = props.router, route = props.route, child = props.child;
    return [
        Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["g" /* h */])("div." + __WEBPACK_IMPORTED_MODULE_0__app_less__["screenLayer"], [
            Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["g" /* h */])("header." + __WEBPACK_IMPORTED_MODULE_0__app_less__["header"], [
                Object(__WEBPACK_IMPORTED_MODULE_3_common_widget_link__["a" /* default */])({
                    href: Object(__WEBPACK_IMPORTED_MODULE_4_route__["b" /* href */])(router, 'page1', { id: '33' }),
                    label: 'Page 1',
                    isActive: route.isIn('page1')
                }),
                Object(__WEBPACK_IMPORTED_MODULE_3_common_widget_link__["a" /* default */])({
                    href: Object(__WEBPACK_IMPORTED_MODULE_4_route__["b" /* href */])(router, 'page2', {}),
                    label: 'Page 2',
                    isActive: route.isIn('page2')
                })
            ]),
            Object(__WEBPACK_IMPORTED_MODULE_2_common_widget_animation_single_slideDown__["a" /* slideDown */])(child, 'main')
        ]),
        Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["g" /* h */])('div', { attrs: { 'data-popup-layer': true } })
    ];
}


/***/ }),
/* 122 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"screenLayer":"screenLayer-3E6ZA","header":"header-3PNtB"};

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slideDown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slideDown_less__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slideDown_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__slideDown_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_widget_animation_single_singleAnimation__ = __webpack_require__(27);


var slideDownAnimation = {
    create: function (elm) {
        elm.classList.add(__WEBPACK_IMPORTED_MODULE_0__slideDown_less__["slideDown"]);
    },
    remove: function (_, cb) {
        cb();
    }
};
var slideDown = Object(__WEBPACK_IMPORTED_MODULE_1_common_widget_animation_single_singleAnimation__["a" /* default */])(slideDownAnimation);


/***/ }),
/* 124 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"slideDown":"slideDown-3iqqT"};

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__link__ = __webpack_require__(126);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__link__["a"]; });



/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = link;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__link_less__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__link_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__link_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kaiju__ = __webpack_require__(2);


function link(_a) {
    var href = _a.href, label = _a.label, _b = _a.isActive, isActive = _b === void 0 ? false : _b;
    return (Object(__WEBPACK_IMPORTED_MODULE_1_kaiju__["g" /* h */])('a', {
        class: (_c = {}, _c[__WEBPACK_IMPORTED_MODULE_0__link_less__["link"]] = true, _c[__WEBPACK_IMPORTED_MODULE_0__link_less__["active"]] = isActive, _c),
        attrs: { href: href, 'data-nav': 'mousedown' }
    }, label));
    var _c;
}


/***/ }),
/* 127 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"link":"link-jUElx","active":"active-42Ubx"};

/***/ }),
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = distinct;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable__ = __webpack_require__(1);



var UNSET = {};

function distinct(compareFunction, source) {
  var previousValue = UNSET;

  return Object(__WEBPACK_IMPORTED_MODULE_0__observable__["a" /* Observable */])(function (add) {
    return source.subscribe(function (val, name) {
      var shouldAdd = previousValue === UNSET || (compareFunction ? compareFunction(val, previousValue) === false : val !== previousValue);

      previousValue = val;
      if (shouldAdd) add(val, name);
    });
  });
}

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = connectToStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snabbdom_h__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snabbdom_h___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_snabbdom_h__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(10);




function connectToStore() {
  return function (baseComponent, mapStoreToProps) {

    function initState() {
      return {};
    }

    function connect(_ref) {
      var on = _ref.on,
          props = _ref.props,
          state = _ref.state;

      var _props = props(),
          store = _props.store;

      on(props, function (unfilteredExternalProps) {
        var externalProps = {};

        Object.keys(unfilteredExternalProps).forEach(function (key) {
          if (key !== 'store') externalProps[key] = unfilteredExternalProps[key];
        });

        return Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* assign */])({}, state(), { externalProps: externalProps });
      });

      on(store.state, function (storeState) {
        var mappedProps = mapStoreToProps(store);
        return Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* assign */])({}, state(), { mappedProps: mappedProps });
      });
    }

    function render(_ref2) {
      var state = _ref2.state;

      var props = Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* assign */])({}, state.externalProps, state.mappedProps);
      return baseComponent(props);
    }

    return function connectComponent(props) {
      return Object(__WEBPACK_IMPORTED_MODULE_1__component__["a" /* default */])({ name: 'connect', log: false, initState: initState, props: props, connect: connect, render: render });
    };
  };
}

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map