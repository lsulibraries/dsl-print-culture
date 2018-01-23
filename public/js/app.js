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
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 267);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(266)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(11);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(3);
var normalizeHeaderName = __webpack_require__(33);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(7);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(7);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(3);
var settle = __webpack_require__(25);
var buildURL = __webpack_require__(28);
var parseHeaders = __webpack_require__(34);
var isURLSameOrigin = __webpack_require__(32);
var createError = __webpack_require__(10);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(27);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(30);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(24);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(76),
  /* template */
  __webpack_require__(199),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/resources/assets/js/components/Abouts.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Abouts.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6153abac", Component.options)
  } else {
    hotAPI.reload("data-v-6153abac", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  null,
  /* template */
  __webpack_require__(210),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/resources/assets/js/components/Issue.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Issue.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-af9600ba", Component.options)
  } else {
    hotAPI.reload("data-v-af9600ba", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
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
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = { value: value };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  if (process.env.NODE_ENV !== 'production') {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    if (value$1) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (process.env.NODE_ENV !== 'production') {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}

function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (process.env.NODE_ENV !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

module.exports = Vue$3;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(16), __webpack_require__(127).setImmediate))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Container__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Container___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Container__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes__ = __webpack_require__(84);

window.Event = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a();
window.Util = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a({
	methods: {
		datePartsForIssueId: function datePartsForIssueId(id) {
			var ret = {};
			ret.year = id.slice(0, 4);
			ret.month = id.slice(4, 6);
			ret.day = id.slice(-2);
			return ret;
		}
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('headerLogo', {
	template: '\n\t<a href="http://lib.lsu.edu"  class="headerLogo"><div>\n          <img src="images/libraries_logo.png" alt="LSU Libraries logo"></img>\n        </div></a>\n    '
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('headerTitle', {
	template: '\n\t<a href="." class="headerTitle">The<br>Broadway<br>Journal</a>\n    '
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('personographyDescription', {
	template: '\n\t<div class="personographyDiscription">\n          <div class="personographyDiscriptionHeader" v-html="this.personographyDescription"></div>\n\t  <div class="personographyDiscriptionText" ></div>\n        </div>\n\t',
	data: function data() {
		return {
			personographyDescription: this.$root.xhrDataStore.abouts.personographyDescription
		};
	},
	created: function created() {
		var _this = this;

		if (this.$root.xhrDataStore.abouts.personographyDescription.length > 1) {
			this.aboutText = this.$root.xhrDataStore.abouts.personographyDescription;
		} else {
			url = '/api/broadwayjournal/abouts/personographyDescription';
			__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(url).then(function (response) {
				return _this.personographyDescription = response.data;
			});
		}
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('personFilter', {
	template: '\n      <div class="peopleFilters">\n\t<div class=\'personFilter\'>\n\t  <label for="personFilter" v-if="this.$root.state.contrast == \'high\'">Filter people</label>\n\t  <input id="personFilter" @keyup="updateFilterString()" v-model="filterString" placeholder="Filter people by name">\n        </div>\n\t<div class="roleFilter">\n        <div class="roleFilterContributor"     v-bind:class="{active: roleFilter == \'cont\'}" @click="updateRoleFilter(\'cont\')">Contributor</div>\n\t  <div class="roleFilterMentioned"     v-bind:class="{active: roleFilter == \'ment\'}" @click="updateRoleFilter(\'ment\')">Mentioned</div>\n\t  <div class="roleFilterEditor"        v-bind:class="{active: roleFilter == \'edit\'}" @click="updateRoleFilter(\'edit\')">Editor</div>\n\t  <div class="roleFilterCorrespondent" v-bind:class="{active: roleFilter == \'corr\'}" @click="updateRoleFilter(\'corr\')">Correspondent</div>\n\t <!-- <div class="numberFilterContributions" v-bind:class="{active: numFilter == \'num\'}" @click="updateRoleFilter(\'num\')">Contribution Number</div> -->\n        </div>\n      </div>\n\t',
	methods: {
		updateFilterString: function updateFilterString() {
			Event.$emit('filterStringUpdated', this.filterString);
		},
		updateRoleFilter: function updateRoleFilter(role) {
			this.roleFilter = role;
			Event.$emit('filterRoleUpdated', this.roleFilter);
		}
	},
	data: function data() {
		return {
			filterString: '',
			roleFilter: ''
		};
	}
});
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('personMeta', {
	template: '\n\t<div class="personMeta">\n\t  <div class="personName">{{this.getName()}}</div>\n\t  <div class="personRole">{{this.getRole(personMeta)}}</div>\n          <div class="personViaf">\n\t    <!--\n\t    <a v-if="!this.$root.empty(personMeta.personViaf)" v-bind:href="personMeta.personViaf" target="_blank"><i class="fa fa-globe" aria-hidden="true"></i>VIAF</a>\n\t    -->\n          </div>\n        </div>\n\t',
	props: ['personMeta'],
	methods: {
		getName: function getName() {
			if (typeof this.personMeta.personName !== 'string') {
				return this.personMeta.personId + ' (Full name not given)';
			} else {
				return this.personMeta.personName;
			}
		},
		getRole: function getRole(personMeta) {
			if (typeof personMeta.personRole !== 'string') {
				return '';
			}
			var roles = Object.values(personMeta.personRole.split(' '));
			var ret = '';
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = roles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var role = _step.value;

					if (role == 'Mentioned') {
						var count = personMeta.personTotalMention;
						if (!personMeta.personTotalMention) {
							console.log("totalMention missing for " + personMeta.personId);
							count = '?';
						}
						ret += role + ' (' + count + ')';
					} else if (role == 'Contributor') {
						var _count = personMeta.personTotalContrib;
						if (!personMeta.personTotalContrib) {
							console.log("totalContrib missing for " + personMeta.personId);
							_count = '?';
						}
						ret += role + ' (' + _count + ')';
					} else {
						ret += ' ' + role;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return ret;
		}
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('person', {
	template: '\n      <div  class=\'person\' @click="toggleBibls" v-if="this.passesFilter()" v-bind:class="[person.personMeta.personRole, {active: activePerson}]">\n\t<personMeta :personMeta="person.personMeta"></personMeta>\n    <div class="personBlurb" v-if="this.getBlurb().length > 0 && showBibls">{{ this.getBlurb() }}</div>\n\t<div class="personListBibl">\n          <personBibl v-if="showBibls" v-for="personBibl in person.personListBibl" :bibl="deDupeBibls(personBibl)"></personBibl>\n\t</div>\n      </div>\n\t',
	props: ['person'],
	data: function data() {
		return {
			showBibls: false,
			filterString: '',
			filterRole: false,
			activePerson: false
		};
	},

	methods: {
		deDupeBibls: function deDupeBibls(bibl) {
			if (Object.keys(bibl).length < 3) {
				return bibl[0];
			}
			return bibl;
		},
		toggleBibls: function toggleBibls() {
			this.showBibls = !this.showBibls;
			this.activePerson = !this.activePerson;
		},
		passesFilter: function passesFilter() {
			var passesString = false;
			var passesRole = false;

			if (this.filterString.length < 1) {
				passesString = true;
			}

			if (typeof this.person.personMeta.personName !== 'string') {
				console.log(this.person.personMeta.personId + ' is missing a name!');
				return true;
			}

			if (this.person.personMeta.personName.toLowerCase().includes(this.filterString.toLowerCase())) {
				passesString = true;
			}

			if (!this.filterRole) {
				passesRole = true;
			} else if (!this.$root.empty(this.person.personMeta.personRole) && this.person.personMeta.personRole.toLowerCase().includes(this.filterRole.toLowerCase())) {
				passesRole = true;
			}

			return passesString && passesRole;
		},
		getBlurb: function getBlurb() {
			var bioExists = !this.$root.empty(this.person.personMeta.personBio);
			if (!bioExists) {
				return '';
			}
			var noteExists = !this.$root.empty(this.person.personMeta.personBio.personNote);
			return bioExists && noteExists ? this.person.personMeta.personBio.personNote : '';
		}
	},
	created: function created() {
		var _this2 = this;

		Event.$on('filterStringUpdated', function (filterString) {
			_this2.filterString = filterString;
		});
		Event.$on('filterRoleUpdated', function (filterRole) {
			_this2.filterRole = filterRole;
		});
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('biblIssueMeta', {
	template: '\n\t<div class="issueMeta">\n\t  <div class="issueVol">Vol. {{issueMeta.issueVol}}</div>\n\t  <div class="issueNum">No. {{issueMeta.issueNum}}</div>\n\t</div>\n    ',
	props: ['issueMeta']
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('biblSectionMeta', {
	template: '\n\t<div class="sectionMeta">\n\t  <div class="sectionTitle">{{sectionMeta.sectionTitle}}</div>\n        </div>\n    ',
	props: ['sectionMeta']
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('biblPersonPieceMeta', {
	template: '\n    <div class="personPieceMeta">\n    <!--\n    <div class="authorRole">{{personPieceMeta.personPieceRole}}</div>\n    -->\n    <div class="authorShip" v-if="showAuthorship()" :title="this.getAuthorshipTitle()">{{this.getAuthorship()}}</div>\n    </div>\n    ',
	props: ['personPieceMeta'],
	methods: {
		showAuthorship: function showAuthorship() {
			var hasValue = !this.$root.empty(this.personPieceMeta.personPiecePseudo);
			if (hasValue) {
				return true;
			}
			return false;
		},
		hasUnusualAuthorship: function hasUnusualAuthorship() {
			attested = this.personPieceMeta.authorShip.authorStatus == 'attested';
			totallyCertain = this.personPieceMeta.authorShip.authorCertainty == 'high';
			return !(attested && totallyCertain);
		},
		getAuthorship: function getAuthorship() {
			return this.personPieceMeta.personPiecePseudo;
		},
		getAuthorshipTitle: function getAuthorshipTitle() {
			return !this.$root.empty(this.personPieceMeta.authorShip) ? this.personPieceMeta.authorShip : '';
		}
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('biblPieceMeta', {
	template: '\n\t<div class="pieceMeta">\n\t  <h1 class="pieceTitle" @click="goToPiece">{{pieceMeta.pieceTitle}}</div>\n        </div>\n    ',
	props: ['pieceMeta', 'issueId'],
	methods: {
		goToPiece: function goToPiece() {
			this.$root.state.content.issue.id = this.issueId;
			this.$root.state.content.issue.decls_id = this.pieceMeta.pieceId;
			this.$root.state.content.issue.page = parseInt(this.pieceMeta.piecePdfIndex);

			Event.$emit('activeContentChange', 'issues');
			Event.$emit('close');
			Event.$emit('issueBiblSelected', {
				issueId: this.issueId,
				pdf_index: this.pieceMeta.piecePdfIndex,
				decls_id: this.pieceMeta.pieceId
			});
		}
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('personBibl', {
	template: '\n\t<div class="personBibl">\n          <biblSectionMeta v-if="!this.$root.empty(bibl.sectionMeta)"  :sectionMeta="bibl.sectionMeta"></biblSectionMeta>\n          <div class="pieceTitleContainer">\n          <biblPieceMeta v-if="!this.$root.empty(bibl.pieceMeta)"  :pieceMeta="bibl.pieceMeta" :issueId="bibl.issueMeta.issueId"></biblPieceMeta>\n          <biblIssueMeta v-if="!this.$root.empty(bibl.issueMeta)" :issueMeta="bibl.issueMeta"></biblIssueMeta>\n          </div>\n          <biblPersonPieceMeta v-if="!this.$root.empty(bibl.personPieceMeta)" :personPieceMeta="bibl.personPieceMeta"></biblPersonPieceMeta>\n        </div>\n\t',
	props: ['bibl']
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('searchResults', {
	template: '\n\t<div class="searchResults">\n\t  <div class="searchResultsHeader" v-if="this.results.searchResult">\n\t    <div class="searchResultsTitle">Search Results</div>\n            <div class="searchResultsCount">{{this.searchResultCount()}}</div>\n            <div class="searchResultsString">{{this.searchString}}</div>\n      \t  </div>\n          <searchResult v-for="result in results.searchResult" :result="result" :searchString="searchString"></searchResult>\n        </div>\n    ',
	data: function data() {
		return {
			results: {},
			searchString: this.$root.state.content.searchString
		};
	},
	created: function created() {
		var _this3 = this;

		this.executeSearch();
		Event.$on('searchSubmitted', function (searchString) {
			_this3.searchString = searchString;
			_this3.executeSearch();
		});
	},

	methods: {
		searchResultCount: function searchResultCount() {
			return this.results.searchResult.length;
		},
		executeSearch: function executeSearch() {
			var _this4 = this;

			search_url = '/api/broadwayjournal/issue/search/' + this.searchString;
			__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(search_url).then(function (response) {
				return _this4.results = response.data;
			});
		}
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('searchResult', {
	props: ['result', 'searchString'],
	methods: {
		resultClicked: function resultClicked() {
			this.$root.state.content.issue.id = this.result.issueMeta.issueId;
			this.$root.state.content.issue.decls_id = this.result.pieceMeta.pieceId;

			Event.$emit('activeContentChange', 'issues');
			Event.$emit('issueBiblSelected', {
				issueId: this.result.issueMeta.issueId,
				pdf_index: 1,
				decls_id: this.result.pieceMeta.pieceId
			});
		},
		pieceTitle: function pieceTitle() {
			if (this.$root.empty(this.result.pieceMeta.pieceTitle)) {
				return "---No title found---";
			}
			return this.result.pieceMeta.pieceTitle;
		}
	},
	template: '\n\t<div class="searchResult" @click="resultClicked">\n\t  <div class="pieceTitle"><strong>{{this.pieceTitle()}}</strong></div>\n            <div class="context">{{this.result.contextBefore}}<span class="searchHit">{{this.result.hit}}</span>{{this.result.contextAfter}}</div>\n\t</div>\n    '
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('issueViewer', {
	template: '\n\t<div class="viewer">\n\t  <transition name="fade"><pdf-viewer v-if="viewer == \'pdf\'"></pdf-viewer></transition>\n\t  <transition name="fade"><tei-markup v-if="viewer == \'text\'"></tei-markup></transition>\n\t</div>\n\t',
	data: function data() {
		return {
			viewer: this.$root.state.content.issue.viewer
		};
	},
	created: function created() {
		var _this5 = this;

		Event.$on('viewerSelected', function (viewer) {
			_this5.viewer = viewer;
		});
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('issueHeader', {
	data: function data() {
		return {
			authorShipLegend: 'Author will have 2-3 attributes: status, cert, and ref.\n\nStatus: identify as \u201Csupplied\u201D (journal doesn\u2019t say but you found it elsewhere), \u201Cattested\u201D (the journal says), \u201Cunknown\u201D (anonymous), or \u201Cinferred\u201D (journal provides a byline that doesn\u2019t provide full name, but makes it obvious, e.g. \u201CEAP\u201D).\n\nIf  you have only a pen name, but you know the author\'s real name, the author status should be "inferred," and the certainty will be "high," "medium," or "low," depending on what you\'ve found in your research. The name in the ref should be the author\'s real name.\n\nIf an article only has initials for a byline and you can\'t find a reasonable full-name match for the initials, the author status will be "unknown," but you will use the initials of the author instead of "anon" in the ref.\n\nCertainty: identify cert as \u201Chigh,\u201D \u201Cmedium,\u201D or \u201Clow.\u201D\nIf the author is anonymous DO NOT provide certainty.',
			bibl_data: {},
			ppm: {},
			biblId: '',
			showModal: false,
			issueHeaderData: {}
		};
	},
	created: function created() {
		var _this6 = this;

		Event.$on('issueSelected', function (id) {
			var headerUrl = '/api/broadwayjournal/issue/' + _this6.$root.state.content.issue.id + '/header';
			__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(headerUrl).then(function (response) {
				return _this6.issueHeaderData = response.data;
			});
			_this6.biblId = '';
			//	    bibl_url = '/api/broadwayjournal/' + this.$root.state.content.issue.id + '/bibl_data';
			//	    axios.get(bibl_url).then(response => this.bibl_data = response.data);
			//	    this.setPpm()
		});
		Event.$on('issueBiblSelected', function (bibl) {
			_this6.biblId = bibl.decls_id;
			_this6.getIssueHeaderData();
			//	    this.ppm = this.bibl_data = undefined
			//	    this.setPpm()
			//	    this.setBiblData()
		});
		Event.$on('close', function () {
			_this6.showModal = false;
		});

		this.biblId = this.$root.state.content.issue.decls_id;
		//	this.setPpm()
		//	this.setBiblData()
		this.getIssueHeaderData();
	},

	template: '\n        <div class="issueHeader" v-if="!this.$root.empty(this.issueHeaderData)">\n         \n          <div class="issueInfo">\n              <div class=\'issueDate\'>{{this.formatDate()}}</div>\n              <biblIssueMeta :issueMeta="this.issueHeaderData.issueMeta"></biblIssueMeta>\n          <biblSectionMeta :sectionMeta="this.issueHeaderData.listBibl[this.biblId].sectionMeta" v-if="this.showBiblSectionMeta()"></biblSectionMeta>\n\n          </div>          \n          <div class="bibl" v-if="haveData()">\n            <div class="issue">\n              <a class="downloadLink" v-bind:href=\'stateHref()\'>\n                <div class="downloadIcon"><i class="fa fa-floppy-o" aria-hidden="true"></i></div>\n                <div class="downloadText">View {{this.dlLabel()}}</div>\n              </a>\n              <biblPieceMeta :pieceMeta="this.issueHeaderData.listBibl[this.biblId].pieceMeta" v-if="!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta) && !pdfMode()"></biblPieceMeta>\n            </div>\n            <personMeta :personMeta="this.getPersonMeta()" v-if="this.getPersonMeta()"></personMeta>\n            <!-- <biblPersonPieceMeta :personPieceMeta="this.getPersonPieceMeta()" v-if="this.getPersonPieceMeta()"></biblPersonPieceMeta> -->\n\n  <button id="show-modal" @click="showModal = true" v-if="this.drawerIsAvailable()">More from this author</button>\n\n            <div class="issueData"></div>\n            <div class="authorShipLegend">{{this.authorShipLegend}}</div>\n            </div>\n  <!-- use the modal component, pass in the prop -->\n  <modal v-if="this.showModal" :authorId="this.getPersonId()" :declsId="this.biblId" :issueId="this.issueHeaderData.issueMeta.issueId"  @close="showModal = false">\n    <h3 slot="header">More from this author</h3>\n  </modal>\n\n        </div>\n\t',
	methods: {
		showBiblSectionMeta: function showBiblSectionMeta() {
			var biblIdSet = this.biblId !== '';
			if (!biblIdSet) {
				return false;
			}
			var metaExists = !this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta);
			return metaExists;
		},
		pdfMode: function pdfMode() {
			return this.$root.state.content.issue.viewer == 'pdf';
		},
		haveData: function haveData() {
			var empty = this.$root.empty;
			if (empty(this.issueHeaderData)) {
				console.log('headerData is empty');
			}if (empty(this.issueHeaderData.listBibl)) {
				console.log('issueHeaderData.listBibl is empty');
			}
			if (this.biblId == '') {
				return false;
			}
			if (empty(this.issueHeaderData.listBibl[this.biblId])) {
				console.log('listBibl does not exist for ' + this.biblId);
			}
			if (empty(this.issueHeaderData.issueMeta)) {
				console.log('missing issueMeta');
			}
			return true;
		},
		getSectionMeta: function getSectionMeta() {},
		getIssueHeaderData: function getIssueHeaderData() {
			var _this7 = this;

			var headerUrl = '/api/broadwayjournal/issue/' + this.$root.state.content.issue.id + '/header';
			__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(headerUrl).then(function (response) {
				return _this7.issueHeaderData = response.data;
			});
		},
		getPersonId: function getPersonId() {
			if (!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta)) {
				if (!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionListPerson)) {
					return Object.keys(this.issueHeaderData.listBibl[this.biblId].sectionMeta.sectionListPerson)[0];
				}
			}
			if (!this.$root.empty(this.issueHeaderData.listBibl[this.biblId].pieceMeta)) {
				return Object.keys(this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson)[0];
			}
			return false;
		},
		getPersonMeta: function getPersonMeta() {
			var pid = this.getPersonId();
			if (!pid) {
				return false;
			}
			if (this.$root.empty(this.$root.xhrDataStore.personography.personIndex[pid])) {
				console.log('person ' + pid + ' not found!');
				return {
					personRole: 'unknown',
					personName: 'unknown',
					personViaf: false
				};
			}
			var personMeta = { personName: this.issueHeaderData.listBibl[this.biblId].pieceMeta.pieceListPerson[pid].personName
				// personMeta = this.$root.xhrDataStore.personography.personIndex[pid].personMeta
			};if (this.$root.empty(personMeta.personName)) {
				return false;
			}
			return personMeta;
		},
		getPersonPieceMeta: function getPersonPieceMeta() {
			pid = this.getPersonId();
			if (!pid) {
				return false;
			}
			bid = 'bibl-' + this.issueHeaderData.issueMeta.issueId + '-' + this.biblId;
			meta = this.$root.xhrDataStore.personography.personIndex[pid].personListBibl[bid].personPieceMeta;
			return meta;
		},
		drawerIsAvailable: function drawerIsAvailable() {
			var isAnon = this.getPersonId() == 'anon';
			var biblExists_notSection = this.issueHeaderData.listBibl[this.biblId] && !this.biblIsSection(this.biblId);
			var sectionMetaNotEmpty = !this.$root.empty(this.issueHeaderData.listBibl[this.biblId].sectionMeta);
			var personInSection = this.getPersonMeta();
			return !isAnon && (personInSection || biblExists_notSection);
		},
		dlLabel: function dlLabel() {
			if (this.$root.state.content.issue.viewer == 'pdf') {
				return 'PDF';
			} else {
				return 'TEI';
			}
		},
		firstSection: function firstSection() {
			return 's1';
		},
		setBiblData: function setBiblData() {
			var _this8 = this;

			bibl_url = '/api/broadwayjournal/' + this.$root.state.content.issue.id + '/bibl_data';
			__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(bibl_url).then(function (response) {
				return _this8.bibl_data = response.data;
			});
		},
		setPpm: function setPpm() {
			var _this9 = this;

			ppm_url = '/api/broadwayjournal/' + this.$root.state.content.issue.id + '/ppm';
			__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(ppm_url).then(function (response) {
				return _this9.ppm = response.data;
			});
		},
		pieceMeta: function pieceMeta(attribute) {
			if (this.bibl_data[this.biblId].sectionMeta) {
				return '';
			}
			return this.bibl_data[this.biblId].pieceMeta[attribute];
		},
		stateHref: function stateHref() {
			var iid = Util.datePartsForIssueId(this.$root.state.content.issue.id);
			var format = this.$root.state.content.issue.viewer;
			if (format == 'text') {
				format = 'tei';
			}
			return '/broadwayjournal/issue/' + iid.year + '/' + iid.month + '/' + iid.day + '/' + format;
		},
		sectionTitle: function sectionTitle(biblId) {
			bibl = this.bibl_data[biblId];
			if (!bibl.sectionMeta) {
				return "sectionMeta is missing!";
			}
			if (this.biblIsSection(biblId)) {
				return bibl.sectionMeta.sectionTitle;
			} else if (this.biblBelongsToSection(biblId)) {
				return this.bibl_data[bibl.sectionId].sectionMeta.sectionTitle;
			} else {
				return '';
			}
		},
		biblIsSection: function biblIsSection(biblId) {
			if (this.issueHeaderData.listBibl[biblId].sectionMeta) {
				return true;
			}
			return false;
		},
		biblBelongsToSection: function biblBelongsToSection(biblId) {
			if (this.bibl_data[biblId].sectionId) {
				return true;
			}
			return false;
		},
		lookupMonth: function lookupMonth(monthInt) {
			var monthMap = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' };
			return monthMap[monthInt];
		},
		formatDate: function formatDate() {

			var d = Util.datePartsForIssueId(this.$root.state.content.issue.id);
			var date = this.lookupMonth(d.month) + ' ' + d.day + ', ' + d.year;
			return date;
		}
	},

	mounted: function mounted() {
		//	Event.$emit('issueSelected', this.$root.state.content.issue.id)
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('modal', {
	data: function data() {
		return {
			authorShipLegend: 'Author will have 2-3 a',
			bibl_data: {},
			ppm: {},
			biblId: 's1',
			showModal: false,
			issueHeaderData: {}
		};
	},

	props: ['authorId', 'issueId', 'declsId'],
	template: '<transition name="modal">\n    <div class="modal-mask">\n      <div class="modal-wrapper">\n        <div class="modal-container">\n\n          <div class="modal-header">\n            <slot name="header">\n              default header\n            </slot>\n          </div>\n\n          <div class="modal-body">\n            <slot name="body">\n            </slot>\n            <drawer  :authorId="this.authorId" :declsId="this.biblId" :issueId="this.issueId"></drawer>\n          </div>\n\n          <div class="modal-footer">\n            <slot name="footer">\n              default footer\n              <button class="modal-default-button" @click="$emit(\'close\')">\n                Close\n              </button>\n            </slot>\n          </div>\n        </div>\n      </div>\n    </div>\n  </transition>'
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('drawer', {
	template: '\n<div>\n    <div class="personBlurb">{{ this.getBlurb() }}</div>\n\t  <personBibl v-for="bibl in getBibls()" :bibl="bibl"></personBibl>\n        </div>\n\t',
	props: ['authorId', 'issueId', 'declsId'],
	methods: {
		getBibls: function getBibls() {
			var currentDecls = 'bibl-' + this.issueId + '-' + this.declsId;
			var bibls = [];
			var allBibls = this.$root.xhrDataStore.personography.personIndex[this.authorId].personListBibl;
			for (var k in allBibls) {
				if (k != currentDecls) {
					bibls.push(allBibls[k]);
				}
			}
			return bibls;
		},
		authorIsAnonymous: function authorIsAnonymous() {
			return this.authorId == 'anon';
		},
		authorWroteSomethingBesidesThis: function authorWroteSomethingBesidesThis() {
			pieces = Object.keys(this.$root.xhrDataStore.personography.personIndex[this.authorId].personListBibl).length;
			return parseInt(pieces) > 1;
		},
		isBibls: function isBibls() {
			return this.authorId && !this.$root.empty(this.$root.xhrDataStore.personography.personIndex[this.authorId].personListBibl);
		},
		getBlurb: function getBlurb() {
			var person = this.$root.xhrDataStore.personography.personIndex[this.authorId];
			var bioExists = !this.$root.empty(person.personMeta.personBio);
			if (!bioExists) {
				return '';
			}
			var noteExists = !this.$root.empty(person.personMeta.personBio.personNote);
			return bioExists && noteExists ? person.personMeta.personBio.personNote : '';
		}
	},
	created: function created() {
		var _this10 = this;

		__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get('/api/BroadwayJournal/personography/comprehensive/json').then(function (response) {
			_this10.personography = response.data;
			_this10.authorBibls = _this10.personography.personIndex[_this10.authorId];
		});
		Event.$on('issueBiblSelected', function (bibl) {
			_this10.showBibls = false;
			_this10.authorBibls = _this10.personography.personIndex[_this10.authorId];
		});
	},
	data: function data() {
		return {
			personography: {},
			authorBibls: {},
			showBibls: false
		};
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('logo', {
	template: '\n\t<div class="logo" v-if="this.$root.state.active != \'issue\'">\n\t  <h1><div class="logoThe">The</div>\n\t  <div class="logoBroadway">Broadway</div>\n\t  <div class="logoJournal">Journal</div></h1>\n\t  <div class="logoSubtitle">A Digital Edition</div>\n\t</div>\n    '
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('creditsPersonList', {
	template: '\n    <div class="creditsPersonsList">\n        <div class="creditsPersonListActive">\n            <h2>Active</h2>\n            <creditsPerson v-for="person in creditsData" :person="person" v-if="person.personMeta.personRole == \'active\'"></creditsPerson>\n        </div>\n        <div class="creditsPersonListPast">\n            <h2>Past</h2>\n            <creditsPerson v-for="person in creditsData" :person="person" v-if="person.personMeta.personRole == \'past\'"></creditsPerson>\n        </div>\n    </div>\n\t',
	methods: {
		dataLoaded: function dataLoaded() {
			return this.$root.empty(this.creditsData);
		}
	},
	created: function created() {
		this.creditsData = this.$root.xhrDataStore.personography.projectStaff;
	},
	data: function data() {
		return {
			creditsData: {}
		};
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('creditsPerson', {
	template: '\n\t<div class="creditsPerson">\n\t  <div class="creditsPersonName">{{person.personMeta.personName}}</div>\n      <div class="creditsPersonRoleName">{{ this.getRoleName() }}</div>\n\t  <!-- <div class="creditsPersonAffiliation" v-if="this.hasBio()">{{ this.getAffiliation() }}</div> -->\n \t  <div class="creditsPersonNote" v-if="this.hasBio()">{{ this.getNote() }}</div>\n        </div>\n\t',
	props: ['person'],
	methods: {
		getAffiliation: function getAffiliation() {
			console.log(this.person.personMeta.personName);
			affiliation = this.$root.empty(this.person.personMeta.personBio.personAffiliation) ? '' : this.person.personMeta.personBio.personAffiliation;
			return affiliation;
		},
		getNote: function getNote() {
			return this.$root.empty(this.person.personMeta.personBio.personNote) ? '' : this.person.personMeta.personBio.personNote;
		},
		hasBio: function hasBio() {
			return !this.$root.empty(this.person.personMeta.personBio);
		},
		getRoleName: function getRoleName() {
			return this.person.personMeta.personRoleName;
		}
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('viewerSelector', {
	created: function created() {
		var _this11 = this;

		Event.$on('viewerSelected', function (viewer) {
			_this11.active = viewer;
		});
	},

	template: '\n\t<div class=\'viewerSelector\' v-bind:class="{pdfSelected: pdfSelected}" @click="toggleViewer">\n          <div class="viewerTitle">Toggle View</div>\n          <div class="viewerSwitch">\n            <div class="viewerText">\n              <div class="viewerTextIcon"><i class="fa fa-file-text-o" aria-hidden="true"></i></div>\n              <div class="viewerTextLabel">Text</div>\n            </div>\n            <div class="viewerPdf">\n              <div class="viewerPdfIcon"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></div>\n              <div class="viewerPdfLabel">PDF</div>\n            </div>\n          </div>\n\t</div>\n\t',
	methods: {
		isActive: function isActive(viewerType) {
			return viewerType == this.active;
		},
		toggleViewer: function toggleViewer() {
			this.pdfSelected = !this.pdfSelected;
			this.active = this.active == 'pdf' ? 'text' : 'pdf';
			Event.$emit('viewerSelected', this.active);
		}
	},
	data: function data() {
		return {
			active: this.$root.state.content.issue.viewer,
			pdfSelected: false
		};
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('viewerSelectorButton', {
	data: function data() {
		return {
			active: false
		};
	},

	props: ['kind'],
	methods: {
		viewerSelected: function viewerSelected(viewer) {
			Event.$emit('viewerSelected', viewer);
		}
	},
	template: '<span v-bind:class="[{toggled: active}, kind]"  @click="viewerSelected(kind)"><slot></slot></span>'
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('intraIssueNav', {
	data: function data() {
		return {
			issueID: this.$root.state.content.issue.id,
			tocContent: false
		};
	},
	created: function created() {
		var _this12 = this;

		this.issueID = this.$root.state.content.issue.id;
		this.setTocContent();
		Event.$on('issueSelected', function (id) {
			_this12.issueID = id;
			_this12.tocContent = false;
			_this12.setTocContent();
		});
		Event.$on('issueBiblSelected', function (data) {
			_this12.issueID = data.issueId;
			_this12.tocContent = false;
			_this12.setTocContent();
		});
	},

	methods: {
		setTocContent: function setTocContent() {
			var _this13 = this;

			var url = '/api/broadwayjournal/' + this.issueID + '/toc';
			__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(url).then(function (response) {
				return _this13.tocContent = response.data;
			});
		},
		getTocContent: function getTocContent() {
			if (this.$root.empty(this.tocContent.toc)) {
				alert('Toc content is empty for ' + this.issueId);
				return false;
			}
			return true;
		}
	},
	template: '\n\t<div class=\'intraIssueNav\'>\n          <div class=\'tocDropdown\'>Table of Contents</div>\n          <toc-item v-if="getTocContent()" v-for=\'id in tocContent.toc\' :id=\'id\'></toc-item>\n        </div>\n\t\t\t'
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('toc-item', {
	data: function data() {
		return { toggled: false };
	},

	props: ['id'],
	methods: {
		showChildren: function showChildren() {
			if (this.toggled == false) {
				//turn on this.$children
				for (var each in this.$children) {
					this.$children[each].meSeen = true;
					this.toggled = true;
				}
				//turn off everyone else's children
				for (var one in this.$parent.$children) {
					//create new check for toc

					if (this.$parent.$children[one].id != this.id) {
						for (var two in this.$parent.$children[one].$children) {
							this.$parent.$children[one].$children[two].meSeen = false;
							//remove activeMonth from everyone else
							this.$parent.$children[one].toggled = false;
						}
					}
				}
			} else {
				//turn off this.children
				for (var _each in this.$children) {
					this.$children[_each].meSeen = false;
					this.toggled = false;
				}
			}
		},
		tocItemSelected: function tocItemSelected() {
			this.showChildren();
			if (this.id.pdf_index >= 1) {
				Event.$emit("pdf-pageChange", parseInt(this.id.pdf_index));
			}
			var page = 1;
			if (this.id.pieces) {
				for (var key in this.id.pieces) {
					page = parseInt(this.id.pieces[key].pdf_index);
					Event.$emit("pdf-pageChange", parseInt(this.id.pieces[key].pdf_index));
					break;
				}
			}
			if (this.id.decls_id) {
				if (!this.id.pdf_index) {
					this.id.pdf_index = page;
				}
				this.id.issueId = this.$root.state.content.issue.id;
				Event.$emit("issueBiblSelected", this.id);
			}
		}
	},
	template: '\n            <div class="tocItem" v-bind:class=\'id.type\'>\n\t      <div class=\'tocToggle\' @click=\'tocItemSelected\'>\n                <div class="tocTitle">{{id.title}}</div>\n            \t<div v-if=\'id.auth_name\' class="author">{{id.auth_name}}</div>\n                <div v-if=\'id.start\' class="pageNumber"></div>\n\t      </div>\n              <child-piece v-if=\'id.pieces\'  v-for=\'(piece, index) in  id.pieces\' :id=\'id.pieces[index]\' :pieceIndex=\'index\'></child-piece>\n            </div>\n\t '
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('child-piece', {
	data: function data() {
		return { meSeen: false };
	},

	props: ['id', 'pieceIndex'],
	methods: {
		tocItemSelected: function tocItemSelected() {
			Event.$emit("pdf-pageChange", parseInt(this.id.pdf_index));
			this.id.issueId = this.$root.state.content.issue.id;
			Event.$emit("issueBiblSelected", this.id);
		}
	},
	template: '\n            <div class="childPiece" @click=\'tocItemSelected\'>\n              <div class="childPieceTitle">{{id.title}}</div>\n              <div v-if=\'id.author\' class="childPieceAuthor">{{id.author}}</div>\n            <div>\n\t'
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('zoom-slider', {
	data: function data() {
		return {
			zoomLevel: 1.3
		};
	},

	methods: {
		zoomUpdate: function zoomUpdate() {
			Event.$emit('zoomUpdate', this.zoomLevel, this.$root.state.content.issue.page);
		}

	},
	template: '<input class=\'zoom\' id=\'zoomSlider\' min=\'1.3\' max=\'3.0\' step=\'0.1\' v-model="zoomLevel" @change=\'zoomUpdate(this.zoomLevel)\' type=\'range\'></input>'
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('pdf-viewer', {
	created: function created() {
		var _this14 = this;

		Event.$on('zoomUpdate', function (level, page) {
			_this14.scale = level;
			_this14.loadPdf(_this14.current_issue, page, _this14.scale);
		}), Event.$on('nextPage', function (page) {
			_this14.current_page += 1;
			_this14.loadPdf(_this14.current_issue, _this14.current_page);
		}), Event.$on('issueSelected', function (id) {
			_this14.current_page = 1;
			_this14.current_issue = id;
			_this14.loadPdf(_this14.current_issue, _this14.current_page);
		}), Event.$on('pdf-pageChange', function (page) {
			_this14.loadPdf(_this14.current_issue, page);
		});
		Event.$on('issueBiblSelected', function (bibl) {
			_this14.current_issue = bibl.issueId;
			_this14.current_page = bibl.pdf_index;
			//	    this.loadPdf(this.current_issue, bibl.pdf_index);
		});
	},
	data: function data() {
		return {
			scale: 1.3,
			current_page: this.$root.state.content.issue.page,
			current_issue: this.$root.state.content.issue.id
		};
	},
	mounted: function mounted() {
		this.loadPdf(this.current_issue, this.current_page, this.scale);
	},

	template: '\n      <div id="pdf-viewer" class="pdf-viewer">\n\t<button class="next-page" @click="changePage(\'prev\')" v-if="this.$root.state.content.issue.page>1" >Prev Page</button>\n\t<button class="next-page" @click="changePage(\'next\')" v-if="this.$root.state.content.issue.page<16">Next Page</button>\n\t<canvas id="pdf" class="pdf-canvas"></canvas>\n      </div>\n\t', //<zoom-slider></zoom-slider>
	methods: {
		// reload: function(scale = this.scale){
		// 	page.getViewport(scale);
		// },
		changePage: function changePage(direction) {

			page = this.$root.state.content.issue.page;
			switch (direction) {
				case 'next':
					if (page == 16) {
						break;
					} else {
						page += 1;
						//console.log(page);
						break;
					}
				case 'prev':
					if (page == 1) {
						break;
					} else {
						page -= 1;
						//console.log(page);
						break;
					}
				default:
					page = 1;
			}
			page = page <= 1 ? 1 : page;
			Event.$emit('pdf-pageChange', page);
		},
		loadPdf: function loadPdf(issue) {
			var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
			var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.3;

			// If absolute URL from the remote server is provided, configure the CORS
			// header on that server.
			if (this.$root.state.content.issue.viewer == 'text') {
				return;
			}
			var url = '/storage/broadway-tei/pdf/BroadwayJournal_' + issue + '.pdf';
			// var pdfData = atob($pdf);

			// Prepare canvas using PDF page dimensions
			var canvas = document.getElementById('pdf');
			var new_canvas = document.createElement('canvas');
			new_canvas.setAttribute("id", "pdf");
			new_canvas.setAttribute("refs", "replaced");
			canvas.parentNode.replaceChild(new_canvas, canvas);
			PDFJS.disableWorker = true;

			// The workerSrc property shall be specified.
			PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

			// Asynchronous download of PDF
			var loadingTask = PDFJS.getDocument(url);
			loadingTask.promise.then(function (pdf) {
				if (page > pdf.pdfInfo.numPages) {
					return;
				}
				// Fetch the first page
				var pageNumber = parseInt(page);
				pdf.getPage(pageNumber).then(function (page) {
					//scale = 1.3
					var viewport = page.getViewport(scale);
					var canvas = document.getElementById('pdf');
					var context = canvas.getContext('2d');
					canvas.height = viewport.height; //1014
					canvas.width = viewport.width; //735

					// Render PDF page into canvas context
					var renderContext = {
						canvasContext: context,
						viewport: viewport
					};
					var renderTask = page.render(renderContext);
					renderTask.then(function () {});
				});
			}, function (reason) {
				// PDF loading error
				console.error(reason);
			});
		}
	}
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('tei-markup', {
	created: function created() {
		var _this15 = this;

		Event.$on('issueSelected', function (id) {
			_this15.id = id;
			_this15.biblId = '';
			_this15.getText();
		}), Event.$on('issueBiblSelected', function (bibl) {
			_this15.biblId = bibl.decls_id;
			_this15.id = bibl.issueId;
			_this15.getText(_this15.biblId);
		});
		this.id = this.$root.state.content.issue.id;
		this.biblId = this.$root.state.content.issue.decls_id;
		this.page = this.$root.state.content.issue.page;
		this.getText();
	},

	methods: {
		highlightText: function highlightText() {
			var needle = this.$root.state.content.searchString;
			if (needle.length < 1) {
				return this.issueText;
			}
			//Thanks !! http://stackoverflow.com/questions/29433696/create-regex-from-variable-with-capture-groups-in-javascript
			pattern = new RegExp('(' + needle + ')', 'gi');
			return this.issueText.replace(pattern, "<span class='searchHit'>$1</span>");
		},
		getText: function getText() {
			var _this16 = this;

			if (this.biblId) {
				var _url = '/api/broadwayjournal/' + this.id + '/piece-text/' + this.biblId;
				__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(_url).then(function (response) {
					return _this16.issueText = response.data;
				});
			} else {
				this.issueText = '';
				// url = '/api/broadwayjournal/'+ this.id + '/issue-text';
				// axios.get(url).then(response => this.issueText = response.data);
			}
		},
		getTocEntry: function getTocEntry(issueId, itemId) {
			var _this17 = this;

			url = '/api/broadwayjournal/' + issueId + '/toc';
			__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(url).then(function (response) {
				bibl = response.data;
				for (item in bibl.toc) {
					if (item == itemId) {
						_this17.biblData = bibl.toc[item];
						return;
					}
					if (bibl.toc[item].pieces) {
						for (piece in bibl.toc[item].pieces) {
							if (piece == itemId) {
								_this17.biblData = bibl.toc[item].pieces.piece;
								return;
							}
						}
					}
				}
			});
		}
	},
	mounted: function mounted() {},
	data: function data() {
		return {
			id: '',
			page: '',
			markdown: [],
			issueText: '',
			biblId: '',
			biblData: {}
		};
	},

	template: '\n      <div class=\'tei-markup\'>\n\t<div class=\'teiMarkup\' v-html="this.highlightText()"><div>\n      </div>\n\t'
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('issue-month', {
	data: function data() {
		return {
			toggled: false,
			monthConvert: { 'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12' }
		};
	},

	props: { month: '', list: '' },
	created: function created() {
		var _this18 = this;

		Event.$on('issueSelected', function (id) {
			for (var each in _this18.$children) {
				if (_this18.$children[each].id == id) {
					_this18.$children[each].toggled = true;
				} else {
					_this18.$children[each].toggled = false;
				}
			}
		});
	},

	methods: {
		showChildren: function showChildren() {
			if (this.toggled == false) {
				//turn on this.$children
				for (var each in this.$children) {
					this.$children[each].meSeen = true;
					this.toggled = true;
				}
				//turn off everyone else's children
				for (var one in this.$parent.$children) {
					if (this.$parent.$children[one].list != this.list) {
						for (var two in this.$parent.$children[one].$children) {
							this.$parent.$children[one].$children[two].meSeen = false;
							//remove activeMonth from everyone else
							this.$parent.$children[one].toggled = false;
						}
					}
				}
			} else {
				//turn off this.children
				for (var _each2 in this.$children) {
					this.$children[_each2].meSeen = false;
					this.toggled = false;
				}
			}
		}
	},
	template: '\n            <div v-bind:class="{activeMonth: toggled}">\n              <div @click="showChildren()">\n                <div class="singleText" >{{this.month}}</div>\n                <div class="indicatorIndex"></div>\n              </div>\n              <index-child :id="each" v-for="each in this.list"></index-child>\n            </div>\n        '
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('index-child', {
	data: function data() {
		return { meSeen: false, toggled: false };
	},

	props: ['id'],
	methods: {
		selectIssue: function selectIssue(id) {
			Event.$emit('issueSelected', id);
		}
	},
	template: '\n\t<div v-if="meSeen" @click="selectIssue(id)" class="childIndex">\n\t  <div v-bind:class="[{active: toggled}, \'childText\']" v-text="id.slice(-2)"></div>\n\t</div>'
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('interIssueNav', {
	data: function data() {
		return {
			months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
			hasData: this.$root.journals ? true : false
		};
	},

	methods: {
		lookupMonth: function lookupMonth(month) {
			var monthConvert = { 'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12' };
			return monthConvert[month];
		},
		lookup: function lookup(month, year) {
			var intMonth = this.lookupMonth(month);
			var ret = [];
			for (var j in this.$root.journals) {
				var tmp = this.$root.journals[j];
				if (tmp.month == intMonth && tmp.year == year) {
					ret.push(tmp.id);
				}
			}
			return ret;
		}
	},
	template: '\n            <div v-if="hasData" class="interIssueNav">\n              <div class="issueMask"></div>\n              <div class="issueIndex">\n                <div class="singleIndex">\n                  <div class="yearText">1845</div>\n                  <div class="indicatorYear"></div>\n                </div>\n                <issue-month v-for="month in this.months" :list=\'lookup(month,"1845")\' class="singleIndex" :month="month"></issue-month>\n              </div>\n              <div class="issueIndex">\n                <div class="singleIndex">\n                  <div class="yearText">1846</div>\n                  <div class="indicatorYear"></div>\n                </div>\n                <issue-month :month=\'this.months[0]\' :list=\'lookup("JAN","1846")\' class="singleIndex"></issue-month>\n              </div>\n              <intraIssueNav></intraIssueNav>\n            </div>\n        '
});

//Author-Modal Is UNUSED
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('author-modal', {
	computed: { mentions: function mentions() {
			'10';

			return Math.floor(Math.random(1, 100) * 10);
		},
		contribs: function contribs() {
			'10';

			return Math.floor(Math.random(1, 100) * 10);
		}

	},
	methods: {
		closeModal: function closeModal() {
			this.$parent.modalActive = false;
		}
	},
	props: ['authInfo', 'authID'],
	template: '\n            <transition name="fade"><div class="authorModal" v-if="this.$parent.modalActive">\n              <div class="modalContent">\n                <div v-for="(val, key) in authInfo" v-bind:class=\'key\'>{{val}}</div>\n                <div v-if=\'this.$parent.chosen.length  && this.authInfo.totalMentions\'  class="mentionNumber">{{this.authInfo.totalMentions.num}}</div>\n                <div v-if=\'this.$parent.chosen.length  && this.authInfo.totalContribs\' class="contributionNumber">{{this.authInfo.totalContribs.num}}</div>\n                <div @click=\'closeModal()\' class="closeModal">Close</button>\n              </div>\n            </div></transition>\n        '
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('author-node', {
	methods: {
		modalClick: function modalClick(data) {
			this.$parent.chosen = this.authID;
			this.$parent.modalActive = true;
		},
		cardHover: function cardHover(data) {
			this.$parent.chosen = this.authID;
		}
	},
	computed: { authHref: function authHref() {
			var path = 'author-' + this.authID;return path;
		}
	},
	props: ['authInfo', 'authID'],
	template: '\n\t\t<div class="node" @click=\'modalClick(authID)\' @mouseover=\'cardHover(authID)\'>\n\t\t\t<div v-bind:class="this.authInfo[\'role\']" v-bind:href="authHref" >{{this.authInfo[\'init\']}}</div>\n\t\t</div>\n\t'
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('author-preview', {
	props: ['authID', 'authInfo'],
	template: '\n\t\t<div class="authorCard">\n\t\t\t<transition name="fade">\n\t\t\t<div  v-if=\'this.$parent.chosen.length\'>{{this.authInfo.name}}</div>\n\t\t\t</transition>\n\t\t</div>\n\t'
});

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.component('footer-bar', {
	data: function data() {
		return {
			fText: ['This work is licensed under a ', 'Creative Commons Attribution 4.0 International License', '. ', 'Contact the ', 'Digital Scholarship Lab', ' at LSU Libraries with any questions or comments.']
		};
	},

	template: '\n\t\t<div>\n\t\t\t<div class="issueFooter"></div>\n\t\t\t<div class="footerBar">\n\t\t\t\t<div class="ccText">\n\t\t\t\t\t{{fText[0]}}\n\t\t\t\t\t<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">{{fText[1]}}</a>\n\t\t\t\t\t{{fText[2]}}\n\t\t\t\t\t<br>\n\t\t\t\t\t{{fText[3]}}\n\t\t\t\t\t<a href="mailto:dsl@lsu.edu" target="_blank">{{fText[4]}}</a>\n\t\t\t\t\t{{fText[5]}}\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>'
});

// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

// import App from './views/App'
// import Hello from './views/Hello'
// import Home from './views/Home'

// const router = new VueRouter({
//     mode: 'history',
//     routes: [
//         // {
//         //     path: '/',
//         //     name: 'home',
//         //     component: mainComponent
//         // },
//         // {
//         //     path: '/hello',
//         //     name: 'hello',
//         //     component: Hello,
//         // },
//     ],
// });

window.Event = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a();






new __WEBPACK_IMPORTED_MODULE_1_vue___default.a({
	el: '#vue-root',
	components: { Container: __WEBPACK_IMPORTED_MODULE_3__components_Container___default.a },
	router: __WEBPACK_IMPORTED_MODULE_4__routes__["a" /* default */],
	methods: {
		empty: function empty(o) {
			if (o === undefined) {
				return true;
			}
			if (Object.keys(o).length === 0 && o.constructor === Object) {
				return true;
			}
			return false;
		},
		getTocEntry: function getTocEntry(issueId, itemId) {

			url = '/api/broadwayjournal/' + issueId + '/toc';
			__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(url).then(function (response) {
				bibl = response.data;
				for (item in bibl.toc) {
					if (item == itemId) {
						return bibl.toc[item];
					}
					if (bibl.toc[item].pieces) {
						for (piece in bibl.toc[item].pieces) {
							if (piece == itemId) {
								return bibl.toc[item].pieces.piece;
							}
						}
					}
				}
			});
		}
	},
	data: {
		journals: [],
		years: [],
		state: {
			activeContent: 'abouts', // issues | personography | search
			content: {
				abouts: 'about', // technical | credits
				issue: {
					id: '18450104', //'18450104', // yyyy-mm-dd
					viewer: 'text', // text|pdf
					page: 1, // int
					decls_id: ''
				},
				personography: {
					filterString: '' // ie eapoe
				},
				searchResults: {
					filter: '', // alpha | by date
					query: '' //eapoe
				},
				searchString: ''
			},
			contrast: 'normal' // high
		},
		xhrDataStore: {
			abouts: {
				about: '',
				tech: '',
				credits: {}
			},
			personography: {}
		}
	},
	created: function created() {
		var _this19 = this;

		Event.$on('aboutsSelected', function (about) {
			_this19.state.content.abouts = about;
		});
		Event.$on('viewerSelected', function (viewer) {
			return _this19.state.content.issue.viewer = viewer;
		});
		Event.$on('activeContentChange', function (content) {
			_this19.state.activeContent = content;
		});
		Event.$on('issueSelected', function (id) {
			_this19.state.content.issue.id = id;
			_this19.state.content.issue.page = 1;
			_this19.state.content.issue.decls_id = '';
			_this19.state.content.searchString = '';
		});
		Event.$on('issueBiblSelected', function (bibl) {
			_this19.state.content.issue.id = bibl.issueId;
			_this19.state.content.issue.decls_id = bibl.decls_id;
		});
		Event.$on('pdf-pageChange', function (page) {
			_this19.state.content.issue.page = page;
		});
		Event.$on('searchSubmitted', function (searchString) {
			_this19.state.content.searchString = searchString;
		});
		// get abouts data
		__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get('/api/broadwayjournal/abouts/credits').then(function (response) {
			return _this19.xhrDataStore.abouts.credits = response.data;
		});
		__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get('/api/broadwayjournal/abouts/about').then(function (response) {
			return _this19.xhrDataStore.abouts.about = response.data;
		});
		__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get('/api/broadwayjournal/abouts/tech').then(function (response) {
			return _this19.xhrDataStore.abouts.tech = response.data;
		});
		__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get('/api/broadwayjournal/abouts/personography').then(function (response) {
			return _this19.xhrDataStore.abouts.personographyDescription = response.data;
		});

		__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get('/api/BroadwayJournal/personography/comprehensive/json').then(function (response) {
			_this19.xhrDataStore.personography = response.data;
			Event.$emit('personographyLoaded', _this19.xhrDataStore.personography);
		});

		__WEBPACK_IMPORTED_MODULE_2_axios___default.a.get('/api/all-issues/json').then(function (response) {
			_this19.journals = response.data;

			for (var issue in _this19.journals) {
				var id = _this19.journals[issue];
				var iid = Util.datePartsForIssueId(id);
				_this19.journals[issue] = {
					'id': id,
					'year': iid.year,
					'month': iid.month,
					'day': iid.day
				};
				if (_this19.years.indexOf(iid.year) == -1) {
					_this19.years.push(iid.year);
				}
			}
		});
	}
});

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var bind = __webpack_require__(11);
var Axios = __webpack_require__(21);
var defaults = __webpack_require__(5);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(8);
axios.CancelToken = __webpack_require__(20);
axios.isCancel = __webpack_require__(9);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(35);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(8);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(5);
var utils = __webpack_require__(3);
var InterceptorManager = __webpack_require__(22);
var dispatchRequest = __webpack_require__(23);
var isAbsoluteURL = __webpack_require__(31);
var combineURLs = __webpack_require__(29);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var transformData = __webpack_require__(26);
var isCancel = __webpack_require__(9);
var defaults = __webpack_require__(5);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(10);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 100 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    background: {
      default: '#41b883'
    },
    color: {
      default: '#35495e'
    },
    stroke: {
      default: '5px'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size,
        border: this.stroke + ' solid ' + this.background,
        borderTopColor: this.color
      };
    }
  }
});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    background: {
      default: '#41b883'
    },
    dotSize: {
      default: function _default() {
        var size = parseInt(this.size);
        return size / 3 + 1;
      }
    }
  },
  computed: {
    styles: function styles() {
      var size = parseInt(this.size);
      var halfSize = size / 3;
      return {
        width: this.size,
        height: this.size,
        border: '0px solid ' + this.background,
        boxShadow: '0 -' + halfSize + 'px 0 ' + this.dotSize + 'px ' + this.background + ' inset'
      };
    }
  }
});

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    background: {
      default: '#41b883'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    styles: function styles() {
      var size = parseInt(this.size);
      return {
        width: this.size,
        height: this.size,
        transform: 'scale(' + size / 75 + ')'
      };
    }
  }
});

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 44 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 120 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    background: {
      default: '#41b883'
    },
    duration: {
      default: '1.8s'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size,
        backgroundColor: this.background,
        animationDuration: this.duration
      };
    }
  }
});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    color: {
      default: '#41b883'
    }
  },
  computed: {
    diamondStyle: function diamondStyle() {
      var size = parseInt(this.size);
      return {
        width: size / 4 + 'px',
        height: size / 4 + 'px'
      };
    },
    styles: function styles() {
      var size = parseInt(this.size);
      return {
        width: this.size,
        height: size / 4 + 'px'
      };
    }
  }
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    background: {
      default: '#41b883'
    },
    duration: {
      default: '2.0s'
    }
  },
  computed: {
    bounceStyle: function bounceStyle() {
      return {
        backgroundColor: this.background,
        animationDuration: this.duration
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 60 + ')'
      };
    },
    styles: function styles() {
      var size = parseInt(this.size);
      return {
        width: this.size,
        height: size / 2 + 'px'
      };
    }
  }
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 164 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 64 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    color: {
      default: '#41b883'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 70 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size) / 2;
      return {
        transform: 'scale(' + size / 75 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 31 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 60 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    color: {
      default: '#41b883'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: 'auto',
        fill: this.color
      };
    }
  }
});

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 250 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    color: {
      default: '#41b883'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        width: size + 'px',
        height: this.size,
        transform: 'scale(' + size / 70 + ')'
      };
    },
    styles: function styles() {
      var size = parseInt(this.size);
      return {
        width: size + 'px',
        height: this.size
      };
    }
  }
});

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    background: {
      default: '#41b883'
    },
    duration: {
      default: '1.2s'
    }
  },
  computed: {
    styles: function styles() {
      return {
        backgroundColor: this.background,
        width: this.size,
        height: this.size,
        animationDuration: this.duration
      };
    }
  }
});

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    background: {
      default: '#41b883'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    color: {
      default: '#41b883'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    color: {
      default: '#41b883'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    color: {
      default: '#41b883'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 80 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    background: {
      default: '#41b883'
    },
    duration: {
      default: '1.0s'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size,
        backgroundColor: this.background,
        animationDuration: this.duration
      };
    }
  }
});

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    innerStyles: function innerStyles() {
      var size = parseInt(this.size);
      return {
        transform: 'scale(' + size / 220 + ')'
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    color: {
      default: '#41b883'
    },
    stroke: {
      default: '5px'
    }
  },
  computed: {
    lineStyles: function lineStyles() {
      return {
        width: this.size,
        height: this.stroke,
        background: this.color,
        borderRadius: this.stroke
      };
    },
    styles: function styles() {
      var size = parseInt(this.size);
      return {
        width: this.size,
        height: this.size,
        transform: 'scale(' + size / 75 + ')'
      };
    }
  }
});

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    background: {
      default: '#41b883'
    },
    duration: {
      default: '1.3s'
    }
  },
  computed: {
    cubeStyles: function cubeStyles() {
      return {
        backgroundColor: this.background,
        animationDuration: this.duration
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    background: {
      default: '#41b883'
    },
    duration: {
      default: '1.2s'
    }
  },
  computed: {
    rectStyles: function rectStyles() {
      return {
        backgroundColor: this.background,
        animationDuration: this.duration
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    color: {
      default: '#41b883'
    }
  },
  computed: {
    blobStyles: function blobStyles() {
      return {
        borderColor: this.color
      };
    },
    moveBlobStyles: function moveBlobStyles() {
      return {
        borderColor: this.color,
        background: this.color
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    },
    background: {
      default: '#41b883'
    },
    duration: {
      default: '1.8s'
    }
  },
  computed: {
    cubeStyles: function cubeStyles() {
      return {
        backgroundColor: this.background,
        animationName: 'sk-cubemove',
        animationDuration: this.duration
      };
    },
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    size: {
      default: '40px'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  }
});

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            abouts: this.$root.state.content.abouts,
            aboutText: this.$root.xhrDataStore.abouts.about,
            techText: this.$root.xhrDataStore.abouts.tech
        };
    },

    methods: {
        selectMe: function selectMe(about) {
            this.abouts = about;
            Event.$emit('aboutsSelected', this.abouts);
        }
    },
    created: function created() {
        var _this = this;

        var url;
        if (this.$root.xhrDataStore.abouts.about.length > 1) {
            this.aboutText = this.$root.xhrDataStore.abouts.about;
        } else {
            url = '/api/broadwayjournal/abouts/about';
            axios.get(url).then(function (response) {
                return _this.aboutText = response.data;
            });
        }
        if (this.$root.xhrDataStore.abouts.tech.length > 1) {
            this.techText = this.$root.xhrDataStore.abouts.tech;
        } else {
            url = '/api/broadwayjournal/abouts/tech';
            axios.get(url).then(function (response) {
                return _this.techText = response.data;
            });
        }
    }
});

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vueHeader__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vueHeader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__vueHeader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vueContent__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vueContent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vueContent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vueFooter__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vueFooter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vueFooter__);
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    components: { vueHeader: __WEBPACK_IMPORTED_MODULE_0__vueHeader___default.a, vueContent: __WEBPACK_IMPORTED_MODULE_1__vueContent___default.a, vueFooter: __WEBPACK_IMPORTED_MODULE_2__vueFooter___default.a },
    created: function created() {
        var _this = this;

        Event.$on('toggleContrast', function () {
            _this.contrast = _this.$root.state.contrast;
        });
    },

    methods: {
        contrastString: function contrastString() {
            return this.$root.state.contrast + 'Contrast';
        }
    }
});

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__personIndex__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__personIndex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__personIndex__);


/* harmony default export */ __webpack_exports__["default"] = ({
    components: { personIndex: __WEBPACK_IMPORTED_MODULE_0__personIndex___default.a },
    data: function data() {
        return {
            modalActive: false,
            personography: [],
            chosen: ''
        };
    }
});

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            content: this.$root.state.activeContent
        };
    },

    methods: {
        activeContentClicked: function activeContentClicked(content) {
            this.content = content;
            Event.$emit('activeContentChange', content);
        },
        showSearch: function showSearch() {
            return this.$root.state.activeContent == 'issues';
        }
    }
});

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_loading_spinner__ = __webpack_require__(224);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    components: { Circle9: __WEBPACK_IMPORTED_MODULE_0_vue_loading_spinner__["a" /* Circle9 */] },
    data: function data() {
        return {
            index: {},
            loading: true
        };
    },

    methods: {
        setupIndex: function setupIndex(rawIndex) {
            var deduped = {};
            var entries = Object.entries(rawIndex);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        key = _step$value[0],
                        value = _step$value[1];

                    if (Array.isArray(value)) {
                        console.log(key + ' has multiple records, arbitrarily(-ish) using the first...');
                        deduped[key] = value[0];
                    } else {
                        deduped[key] = value;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.loading = false;
            this.index = deduped;
        }
    },
    created: function created() {
        var _this = this;

        if (!this.$root.empty(this.$root.xhrDataStore.personography.personIndex)) {
            this.setupIndex(this.$root.xhrDataStore.personography.personIndex);
        }
        Event.$on('personographyLoaded', function (index) {
            _this.setupIndex(index.personIndex);
        });
    }
});

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Abouts__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Abouts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Abouts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Issue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Issue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Issue__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    components: { abouts: __WEBPACK_IMPORTED_MODULE_0__Abouts___default.a, issue: __WEBPACK_IMPORTED_MODULE_1__Issue___default.a }
});

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__headerNav__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__headerNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__headerNav__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    components: { headerNav: __WEBPACK_IMPORTED_MODULE_0__headerNav___default.a },
    methods: {
        resetSearchString: function resetSearchString() {
            this.searchString = this.$root.state.content.searchString = '';
        },
        toggleContrast: function toggleContrast() {
            this.$root.state.contrast = this.$root.state.contrast == 'high' ? 'normal' : 'high';
            Event.$emit('toggleContrast');
        },
        searchSubmitted: function searchSubmitted() {
            Event.$emit('activeContentChange', 'search');
            Event.$emit('searchSubmitted', this.searchString);
        }
    },
    data: function data() {
        return {
            searchString: ''
        };
    }
});

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router__ = __webpack_require__(14);
/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */

window.Vue = __webpack_require__(15);

Vue.use(__WEBPACK_IMPORTED_MODULE_0_vue_router__["a" /* default */]);
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(6);

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from "laravel-echo"

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router__ = __webpack_require__(14);


var routes = [{
    path: '/',
    component: __webpack_require__(12)

}, {
    path: '/issues',
    component: __webpack_require__(13)

}, {
    path: '/authors',
    component: __webpack_require__(169)

}];

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_vue_router__["a" /* default */]({
    routes: routes
}));

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.line[data-v-083809c7] {\n  -webkit-animation: linePencil .8s infinite linear;\n          animation: linePencil .8s infinite linear;\n}\n@-webkit-keyframes linePencil {\n0% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n}\n100% {\n    -webkit-transform: translateY(-150px);\n            transform: translateY(-150px);\n}\n}\n@keyframes linePencil {\n0% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n}\n100% {\n    -webkit-transform: translateY(-150px);\n            transform: translateY(-150px);\n}\n}\n", ""]);

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-0a237a1a] {\n  position: relative;\n  display: inline-block;\n}\n.spinner *[data-v-0a237a1a] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.double-bounce1[data-v-0a237a1a], .double-bounce2[data-v-0a237a1a] {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  opacity: 0.6;\n  position: absolute;\n  top: 0;\n  left: 0;\n  -webkit-animation: double-bounce 2.0s ease-in-out infinite;\n          animation: double-bounce 2.0s ease-in-out infinite;\n}\n.double-bounce2[data-v-0a237a1a] {\n  -webkit-animation-delay: -1.0s;\n          animation-delay: -1.0s;\n}\n@-webkit-keyframes double-bounce {\n0%, 100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n50% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n}\n@keyframes double-bounce {\n0%, 100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n50% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n}\n", ""]);

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-0c8e89e0] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-0c8e89e0] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner-inner[data-v-0c8e89e0] {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n  -webkit-animation: spin-line 4s ease infinite;\n          animation: spin-line 4s ease infinite;\n}\n@-webkit-keyframes spin-line {\n0% {\n    -webkit-transform: rotate(-20deg);\n            transform: rotate(-20deg);\n    height: 5px;\n    width: 75px;\n}\n5% {\n    height: 5px;\n    width: 75px;\n}\n30% {\n    -webkit-transform: rotate(380deg);\n            transform: rotate(380deg);\n    height: 5px;\n    width: 75px;\n}\n40% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n    height: 5px;\n    width: 75px;\n}\n55% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    height: 5px;\n    width: 5px;\n}\n65% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    height: 5px;\n    width: 85px;\n}\n68% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    height: 5px;\n}\n75% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    height: 5px;\n    width: 1px;\n}\n78% {\n    height: 5px;\n    width: 5px;\n}\n90% {\n    height: 5px;\n    width: 75px;\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n99%, 100% {\n    height: 5px;\n    width: 75px;\n    -webkit-transform: rotate(-20deg);\n            transform: rotate(-20deg);\n}\n}\n@keyframes spin-line {\n0% {\n    -webkit-transform: rotate(-20deg);\n            transform: rotate(-20deg);\n    height: 5px;\n    width: 75px;\n}\n5% {\n    height: 5px;\n    width: 75px;\n}\n30% {\n    -webkit-transform: rotate(380deg);\n            transform: rotate(380deg);\n    height: 5px;\n    width: 75px;\n}\n40% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n    height: 5px;\n    width: 75px;\n}\n55% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    height: 5px;\n    width: 5px;\n}\n65% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    height: 5px;\n    width: 85px;\n}\n68% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    height: 5px;\n}\n75% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    height: 5px;\n    width: 1px;\n}\n78% {\n    height: 5px;\n    width: 5px;\n}\n90% {\n    height: 5px;\n    width: 75px;\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n99%, 100% {\n    height: 5px;\n    width: 75px;\n    -webkit-transform: rotate(-20deg);\n            transform: rotate(-20deg);\n}\n}\n", ""]);

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner *[data-v-12d2fa33] {\n  line-height: 0;\n  box-sizing: border-box;\n}\n.spinner > div[data-v-12d2fa33] {\n  background-color: transparent;\n  border: 1px solid #41b883;\n  border-radius: 100%;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  position: absolute;\n  opacity: 0;\n  width: 50px;\n  height: 50px;\n  -webkit-animation: wave-jumper 1s 0s linear infinite;\n          animation: wave-jumper 1s 0s linear infinite;\n}\n.spinner > div[data-v-12d2fa33]:nth-child(2) {\n  -webkit-animation-delay: 0.33333s;\n          animation-delay: 0.33333s;\n}\n.spinner > div[data-v-12d2fa33]:nth-child(3) {\n  -webkit-animation-delay: 0.66666s;\n          animation-delay: 0.66666s;\n}\n@-webkit-keyframes wave-jumper {\n0% {\n    opacity: 0;\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n5% {\n    opacity: 1;\n}\n100% {\n    opacity: 0;\n}\n}\n@keyframes wave-jumper {\n0% {\n    opacity: 0;\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n5% {\n    opacity: 1;\n}\n100% {\n    opacity: 0;\n}\n}\n", ""]);

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-18944e35] {\n  overflow: hidden;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-18944e35] {\n    box-sizing: border-box;\n}\n.cube[data-v-18944e35] {\n  width: 80px;\n  height: 80px;\n  line-height: 80px;\n  text-align: center;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  transition: -webkit-transform 0.5s 0.1s;\n  transition: transform 0.5s 0.1s;\n  transition: transform 0.5s 0.1s, -webkit-transform 0.5s 0.1s;\n  -webkit-perspective: 9999px;\n          perspective: 9999px;\n  color: #333;\n  opacity: 1;\n  position: relative;\n}\n.cube.panelLoad[data-v-18944e35] {\n    z-index: 11;\n    top: 50%;\n    -webkit-animation: letter-cube-panel 2.2s infinite forwards;\n            animation: letter-cube-panel 2.2s infinite forwards;\n}\n.cube.panelLoad .cube-face[data-v-18944e35] {\n      font-family: \"Open Sans\",sans-serif;\n      font-size: 50px;\n      color: #41b883;\n      box-shadow: inset 0 0 0 1px #41b883, 0 0 1px 1px #41b883;\n}\n.cube .cube-face[data-v-18944e35] {\n    width: inherit;\n    height: inherit;\n    position: absolute;\n    background: white;\n    box-shadow: inset 0 0 0 1px #333, 0 0 1px 1px #333;\n    opacity: 1;\n}\n.cube .cube-face-front[data-v-18944e35] {\n    -webkit-transform: translate3d(0, 0, 40px);\n            transform: translate3d(0, 0, 40px);\n    font-size: 57px;\n}\n.cube .cube-face-back[data-v-18944e35] {\n    -webkit-transform: rotateY(180deg) translate3d(0, 0, 40px);\n            transform: rotateY(180deg) translate3d(0, 0, 40px);\n}\n.cube .cube-face-left[data-v-18944e35] {\n    -webkit-transform: rotateY(-90deg) translate3d(0, 0, 40px);\n            transform: rotateY(-90deg) translate3d(0, 0, 40px);\n}\n.cube .cube-face-right[data-v-18944e35] {\n    -webkit-transform: rotateY(90deg) translate3d(0, 0, 40px);\n            transform: rotateY(90deg) translate3d(0, 0, 40px);\n}\n.cube .cube-face-top[data-v-18944e35] {\n    -webkit-transform: rotateX(90deg) translate3d(0, 0, 40px);\n            transform: rotateX(90deg) translate3d(0, 0, 40px);\n}\n.cube .cube-face-bottom[data-v-18944e35] {\n    -webkit-transform: rotateX(-90deg) translate3d(0, 0, 40px);\n            transform: rotateX(-90deg) translate3d(0, 0, 40px);\n}\n@-webkit-keyframes letter-cube-panel {\n0% {\n    -webkit-transform: rotateY(0deg) rotateZ(0deg);\n            transform: rotateY(0deg) rotateZ(0deg);\n}\n20% {\n    -webkit-transform: rotateY(90deg) rotateZ(0deg);\n            transform: rotateY(90deg) rotateZ(0deg);\n}\n40% {\n    -webkit-transform: rotateX(45deg) rotateZ(45deg);\n            transform: rotateX(45deg) rotateZ(45deg);\n}\n60% {\n    -webkit-transform: rotateX(90deg) rotateY(180deg) rotateX(90deg);\n            transform: rotateX(90deg) rotateY(180deg) rotateX(90deg);\n}\n80% {\n    -webkit-transform: rotateX(310deg) rotateZ(230deg);\n            transform: rotateX(310deg) rotateZ(230deg);\n}\n100% {\n    -webkit-transform: rotateX(360deg) rotateZ(360deg);\n            transform: rotateX(360deg) rotateZ(360deg);\n}\n}\n@keyframes letter-cube-panel {\n0% {\n    -webkit-transform: rotateY(0deg) rotateZ(0deg);\n            transform: rotateY(0deg) rotateZ(0deg);\n}\n20% {\n    -webkit-transform: rotateY(90deg) rotateZ(0deg);\n            transform: rotateY(90deg) rotateZ(0deg);\n}\n40% {\n    -webkit-transform: rotateX(45deg) rotateZ(45deg);\n            transform: rotateX(45deg) rotateZ(45deg);\n}\n60% {\n    -webkit-transform: rotateX(90deg) rotateY(180deg) rotateX(90deg);\n            transform: rotateX(90deg) rotateY(180deg) rotateX(90deg);\n}\n80% {\n    -webkit-transform: rotateX(310deg) rotateZ(230deg);\n            transform: rotateX(310deg) rotateZ(230deg);\n}\n100% {\n    -webkit-transform: rotateX(360deg) rotateZ(360deg);\n            transform: rotateX(360deg) rotateZ(360deg);\n}\n}\n", ""]);

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-1d765754] {\n  overflow: hidden;\n}\n.spinner-inner[data-v-1d765754] {\n  position: relative;\n  width: 160px;\n  height: 160px;\n  background-color: transparent;\n  border-radius: 50%;\n  border: 2px solid #a5a69e;\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n  display: block;\n}\n.spinner-inner[data-v-1d765754]:before {\n    content: '';\n    width: 164px;\n    height: 164px;\n    display: block;\n    position: absolute;\n    border: 7px solid #41b883;\n    border-radius: 50%;\n    top: -2px;\n    left: -2px;\n    box-sizing: border-box;\n    clip: rect(0px, 35px, 35px, 0px);\n    z-index: 10;\n    -webkit-animation: hexagon-rotate infinite;\n            animation: hexagon-rotate infinite;\n    -webkit-animation-duration: 3s;\n            animation-duration: 3s;\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n}\n.spinner-inner[data-v-1d765754]:after {\n    content: '';\n    width: 164px;\n    height: 164px;\n    display: block;\n    position: absolute;\n    border: 2px solid #c1bebb;\n    border-radius: 50%;\n    top: -2px;\n    left: -2px;\n    box-sizing: border-box;\n    clip: rect(0px, 164px, 150px, 0px);\n    z-index: 9;\n    -webkit-animation: hexagon-rotate2 3s linear infinite;\n            animation: hexagon-rotate2 3s linear infinite;\n}\n.hexagon-container[data-v-1d765754] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  position: relative;\n  top: 33px;\n  left: 41px;\n  border-radius: 50%;\n}\n.hexagon[data-v-1d765754] {\n  position: absolute;\n  width: 40px;\n  height: 23px;\n  background-color: #41b883;\n}\n.hexagon[data-v-1d765754]:before {\n    content: \"\";\n    position: absolute;\n    top: -11px;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-left: 20px solid transparent;\n    border-right: 20px solid transparent;\n    border-bottom: 11.5px solid #41b883;\n}\n.hexagon[data-v-1d765754]:after {\n    content: \"\";\n    position: absolute;\n    top: 23px;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-left: 20px solid transparent;\n    border-right: 20px solid transparent;\n    border-top: 11.5px solid #41b883;\n}\n.hexagon.hex_1[data-v-1d765754] {\n  top: 0px;\n  left: 0px;\n  -webkit-animation: hexagon-Animasearch 3s ease-in-out infinite;\n          animation: hexagon-Animasearch 3s ease-in-out infinite;\n  -webkit-animation-delay: 0.21429s;\n          animation-delay: 0.21429s;\n}\n.hexagon.hex_2[data-v-1d765754] {\n  top: 0px;\n  left: 42px;\n  -webkit-animation: hexagon-Animasearch 3s ease-in-out infinite;\n          animation: hexagon-Animasearch 3s ease-in-out infinite;\n  -webkit-animation-delay: 0.42857s;\n          animation-delay: 0.42857s;\n}\n.hexagon.hex_3[data-v-1d765754] {\n  top: 36px;\n  left: 63px;\n  -webkit-animation: hexagon-Animasearch 3s ease-in-out infinite;\n          animation: hexagon-Animasearch 3s ease-in-out infinite;\n  -webkit-animation-delay: 0.64286s;\n          animation-delay: 0.64286s;\n}\n.hexagon.hex_4[data-v-1d765754] {\n  top: 72px;\n  left: 42px;\n  -webkit-animation: hexagon-Animasearch 3s ease-in-out infinite;\n          animation: hexagon-Animasearch 3s ease-in-out infinite;\n  -webkit-animation-delay: 0.85714s;\n          animation-delay: 0.85714s;\n}\n.hexagon.hex_5[data-v-1d765754] {\n  top: 72px;\n  left: 0px;\n  -webkit-animation: hexagon-Animasearch 3s ease-in-out infinite;\n          animation: hexagon-Animasearch 3s ease-in-out infinite;\n  -webkit-animation-delay: 1.07143s;\n          animation-delay: 1.07143s;\n}\n.hexagon.hex_6[data-v-1d765754] {\n  top: 36px;\n  left: -21px;\n  -webkit-animation: hexagon-Animasearch 3s ease-in-out infinite;\n          animation: hexagon-Animasearch 3s ease-in-out infinite;\n  -webkit-animation-delay: 1.28571s;\n          animation-delay: 1.28571s;\n}\n.hexagon.hex_7[data-v-1d765754] {\n  top: 36px;\n  left: 21px;\n  -webkit-animation: hexagon-Animasearch 3s ease-in-out infinite;\n          animation: hexagon-Animasearch 3s ease-in-out infinite;\n  -webkit-animation-delay: 1.5s;\n          animation-delay: 1.5s;\n}\n@-webkit-keyframes hexagon-Animasearch {\n0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n}\n15%,\n  50% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0;\n}\n65% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n}\n}\n@keyframes hexagon-Animasearch {\n0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n}\n15%,\n  50% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0;\n}\n65% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n}\n}\n@-webkit-keyframes hexagon-rotate {\n0% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0);\n    clip: rect(0px, 35px, 35px, 0px);\n}\n50% {\n    clip: rect(0px, 40px, 40px, 0px);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n    clip: rect(0px, 35px, 35px, 0px);\n}\n}\n@keyframes hexagon-rotate {\n0% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0);\n    clip: rect(0px, 35px, 35px, 0px);\n}\n50% {\n    clip: rect(0px, 40px, 40px, 0px);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n    clip: rect(0px, 35px, 35px, 0px);\n}\n}\n@-webkit-keyframes hexagon-rotate2 {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    clip: rect(0px, 164px, 150px, 0px);\n}\n50% {\n    clip: rect(0px, 164px, 0px, 0px);\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n100% {\n    -webkit-transform: rotate(720deg);\n            transform: rotate(720deg);\n    clip: rect(0px, 164px, 150px, 0px);\n}\n}\n@keyframes hexagon-rotate2 {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    clip: rect(0px, 164px, 150px, 0px);\n}\n50% {\n    clip: rect(0px, 164px, 0px, 0px);\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n100% {\n    -webkit-transform: rotate(720deg);\n            transform: rotate(720deg);\n    clip: rect(0px, 164px, 150px, 0px);\n}\n}\n@-webkit-keyframes hexagon-rotate3 {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n}\n@keyframes hexagon-rotate3 {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n}\n", ""]);

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-243c0a98] {\n  box-sizing: border-box;\n  border-radius: 100%;\n  border: 10px solid rgba(255, 255, 255, 0.2);\n  -webkit-animation: circle-2-spin 1s infinite linear;\n          animation: circle-2-spin 1s infinite linear;\n}\n@-webkit-keyframes circle-2-spin {\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n}\n@keyframes circle-2-spin {\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n}\n", ""]);

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-244a2219] {\n  box-sizing: border-box;\n  border-radius: 50%;\n  -webkit-animation: circle-3-rotate 1s infinite linear;\n          animation: circle-3-rotate 1s infinite linear;\n}\n@-webkit-keyframes circle-3-rotate {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n}\n@keyframes circle-3-rotate {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n}\n", ""]);

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-2458399a] {\n  box-sizing: border-box;\n  position: relative;\n  border: 3px solid transparent;\n  border-top-color: #f7484e;\n  border-radius: 50%;\n  -webkit-animation: circle-4-spin 2s linear infinite;\n          animation: circle-4-spin 2s linear infinite;\n}\n.spinner[data-v-2458399a]:before, .spinner[data-v-2458399a]:after {\n    content: '';\n    box-sizing: border-box;\n    position: absolute;\n    border: 3px solid transparent;\n    border-radius: 50%;\n}\n.spinner[data-v-2458399a]:before {\n    border-top-color: #f8b334;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    -webkit-animation: circle-4-spin 3s linear infinite;\n            animation: circle-4-spin 3s linear infinite;\n}\n.spinner[data-v-2458399a]:after {\n    border-top-color: #41b883;\n    top: 6px;\n    left: 6px;\n    right: 6px;\n    bottom: 6px;\n    -webkit-animation: spin 4s linear infinite;\n            animation: spin 4s linear infinite;\n}\n@-webkit-keyframes circle-4-spin {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n}\n@keyframes circle-4-spin {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n}\n", ""]);

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-2466511b] {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  position: relative;\n  background: rgba(25, 165, 152, 0.5);\n  border-radius: 50%;\n  overflow: hidden;\n}\n.spinner[data-v-2466511b]:before, .spinner[data-v-2466511b]:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  display: inline-block;\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n}\n.spinner[data-v-2466511b]:before {\n  -webkit-animation: circle-5-spinner 3s infinite;\n          animation: circle-5-spinner 3s infinite;\n  -webkit-transform-origin: 0 50%;\n          transform-origin: 0 50%;\n  left: 0;\n  background: #c7efcf;\n}\n.spinner[data-v-2466511b]:after {\n  -webkit-animation: circle-5-spinner 3s 0.2s reverse infinite;\n          animation: circle-5-spinner 3s 0.2s reverse infinite;\n  -webkit-transform-origin: 100% 50%;\n          transform-origin: 100% 50%;\n  right: 0;\n  background: #eef5db;\n}\n@-webkit-keyframes circle-5-spinner {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n50% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n}\n@keyframes circle-5-spinner {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n50% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n}\n", ""]);

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "/* Generated with Bounce.js. Edit at http://goo.gl/hYAzd9 */\n@-webkit-keyframes circle-6-rotateAll {\n0% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n77.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n78.518519% {\n    -webkit-transform: matrix3d(0.80259, 0.59653, 0, 0, -0.59653, 0.80259, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.80259, 0.59653, 0, 0, -0.59653, 0.80259, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n79.259259% {\n    -webkit-transform: matrix3d(0.52673, 0.85004, 0, 0, -0.85004, 0.52673, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.52673, 0.85004, 0, 0, -0.85004, 0.52673, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80% {\n    -webkit-transform: matrix3d(0.60234, 0.79824, 0, 0, -0.79824, 0.60234, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.60234, 0.79824, 0, 0, -0.79824, 0.60234, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80.740741% {\n    -webkit-transform: matrix3d(0.72936, 0.68413, 0, 0, -0.68413, 0.72936, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.72936, 0.68413, 0, 0, -0.68413, 0.72936, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n81.481481% {\n    -webkit-transform: matrix3d(0.7498, 0.66167, 0, 0, -0.66167, 0.7498, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.7498, 0.66167, 0, 0, -0.66167, 0.7498, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.222222% {\n    -webkit-transform: matrix3d(0.71527, 0.69885, 0, 0, -0.69885, 0.71527, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.71527, 0.69885, 0, 0, -0.69885, 0.71527, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.962963% {\n    -webkit-transform: matrix3d(0.69404, 0.71994, 0, 0, -0.71994, 0.69404, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69404, 0.71994, 0, 0, -0.71994, 0.69404, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n83.703704% {\n    -webkit-transform: matrix3d(0.69926, 0.71487, 0, 0, -0.71487, 0.69926, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69926, 0.71487, 0, 0, -0.71487, 0.69926, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n84.444444% {\n    -webkit-transform: matrix3d(0.7089, 0.70531, 0, 0, -0.70531, 0.7089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.7089, 0.70531, 0, 0, -0.70531, 0.7089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n85.185185% {\n    -webkit-transform: matrix3d(0.7106, 0.7036, 0, 0, -0.7036, 0.7106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.7106, 0.7036, 0, 0, -0.7036, 0.7106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n85.925926% {\n    -webkit-transform: matrix3d(0.70776, 0.70645, 0, 0, -0.70645, 0.70776, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70776, 0.70645, 0, 0, -0.70645, 0.70776, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n86.666667% {\n    -webkit-transform: matrix3d(0.70608, 0.70813, 0, 0, -0.70813, 0.70608, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70608, 0.70813, 0, 0, -0.70813, 0.70608, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n87.407407% {\n    -webkit-transform: matrix3d(0.70649, 0.70773, 0, 0, -0.70773, 0.70649, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70649, 0.70773, 0, 0, -0.70773, 0.70649, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.148148% {\n    -webkit-transform: matrix3d(0.70725, 0.70696, 0, 0, -0.70696, 0.70725, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70725, 0.70696, 0, 0, -0.70696, 0.70725, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(0.70738, 0.70683, 0, 0, -0.70683, 0.70738, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70738, 0.70683, 0, 0, -0.70683, 0.70738, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.70711, 0.70711, 0, 0, -0.70711, 0.70711, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70711, 0.70711, 0, 0, -0.70711, 0.70711, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n100% {\n    -webkit-transform: matrix3d(0.70711, 0.70711, 0, 0, -0.70711, 0.70711, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70711, 0.70711, 0, 0, -0.70711, 0.70711, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n}\n@keyframes circle-6-rotateAll {\n0% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n77.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n78.518519% {\n    -webkit-transform: matrix3d(0.80259, 0.59653, 0, 0, -0.59653, 0.80259, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.80259, 0.59653, 0, 0, -0.59653, 0.80259, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n79.259259% {\n    -webkit-transform: matrix3d(0.52673, 0.85004, 0, 0, -0.85004, 0.52673, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.52673, 0.85004, 0, 0, -0.85004, 0.52673, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80% {\n    -webkit-transform: matrix3d(0.60234, 0.79824, 0, 0, -0.79824, 0.60234, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.60234, 0.79824, 0, 0, -0.79824, 0.60234, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80.740741% {\n    -webkit-transform: matrix3d(0.72936, 0.68413, 0, 0, -0.68413, 0.72936, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.72936, 0.68413, 0, 0, -0.68413, 0.72936, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n81.481481% {\n    -webkit-transform: matrix3d(0.7498, 0.66167, 0, 0, -0.66167, 0.7498, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.7498, 0.66167, 0, 0, -0.66167, 0.7498, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.222222% {\n    -webkit-transform: matrix3d(0.71527, 0.69885, 0, 0, -0.69885, 0.71527, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.71527, 0.69885, 0, 0, -0.69885, 0.71527, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.962963% {\n    -webkit-transform: matrix3d(0.69404, 0.71994, 0, 0, -0.71994, 0.69404, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69404, 0.71994, 0, 0, -0.71994, 0.69404, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n83.703704% {\n    -webkit-transform: matrix3d(0.69926, 0.71487, 0, 0, -0.71487, 0.69926, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69926, 0.71487, 0, 0, -0.71487, 0.69926, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n84.444444% {\n    -webkit-transform: matrix3d(0.7089, 0.70531, 0, 0, -0.70531, 0.7089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.7089, 0.70531, 0, 0, -0.70531, 0.7089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n85.185185% {\n    -webkit-transform: matrix3d(0.7106, 0.7036, 0, 0, -0.7036, 0.7106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.7106, 0.7036, 0, 0, -0.7036, 0.7106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n85.925926% {\n    -webkit-transform: matrix3d(0.70776, 0.70645, 0, 0, -0.70645, 0.70776, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70776, 0.70645, 0, 0, -0.70645, 0.70776, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n86.666667% {\n    -webkit-transform: matrix3d(0.70608, 0.70813, 0, 0, -0.70813, 0.70608, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70608, 0.70813, 0, 0, -0.70813, 0.70608, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n87.407407% {\n    -webkit-transform: matrix3d(0.70649, 0.70773, 0, 0, -0.70773, 0.70649, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70649, 0.70773, 0, 0, -0.70773, 0.70649, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.148148% {\n    -webkit-transform: matrix3d(0.70725, 0.70696, 0, 0, -0.70696, 0.70725, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70725, 0.70696, 0, 0, -0.70696, 0.70725, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(0.70738, 0.70683, 0, 0, -0.70683, 0.70738, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70738, 0.70683, 0, 0, -0.70683, 0.70738, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.70711, 0.70711, 0, 0, -0.70711, 0.70711, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70711, 0.70711, 0, 0, -0.70711, 0.70711, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n100% {\n    -webkit-transform: matrix3d(0.70711, 0.70711, 0, 0, -0.70711, 0.70711, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.70711, 0.70711, 0, 0, -0.70711, 0.70711, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n}\n\n/* Generated with Bounce.js. Edit at http://goo.gl/DEm6fe */\n@-webkit-keyframes circle-6-anim-1-circle {\n0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n0.740741% {\n    -webkit-transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n1.481481% {\n    -webkit-transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n2.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n2.962963% {\n    -webkit-transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n3.703704% {\n    -webkit-transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n4.444444% {\n    -webkit-transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n5.185185% {\n    -webkit-transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n5.925926% {\n    -webkit-transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n6.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n7.407407% {\n    -webkit-transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n8.148148% {\n    -webkit-transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n8.888889% {\n    -webkit-transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n9.62963% {\n    -webkit-transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n10.37037% {\n    -webkit-transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n11.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n11.851852% {\n    -webkit-transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, -9.51676, 0, 0, 1);\n            transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, -9.51676, 0, 0, 1);\n}\n12.592593% {\n    -webkit-transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, -18.75576, 0, 0, 1);\n            transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, -18.75576, 0, 0, 1);\n}\n13.333333% {\n    -webkit-transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, -25.26155, 0, 0, 1);\n            transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, -25.26155, 0, 0, 1);\n}\n14.074074% {\n    -webkit-transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, -28.53849, 0, 0, 1);\n            transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, -28.53849, 0, 0, 1);\n}\n14.814815% {\n    -webkit-transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, -29.2499, 0, 0, 1);\n            transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, -29.2499, 0, 0, 1);\n}\n15.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -28.45173, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -28.45173, 0, 0, 1);\n}\n16.296296% {\n    -webkit-transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, -27.09752, 0, 0, 1);\n            transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, -27.09752, 0, 0, 1);\n}\n17.037037% {\n    -webkit-transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, -25.82591, 0, 0, 1);\n            transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, -25.82591, 0, 0, 1);\n}\n17.777778% {\n    -webkit-transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, -24.9428, 0, 0, 1);\n            transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, -24.9428, 0, 0, 1);\n}\n18.518519% {\n    -webkit-transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, -24.50122, 0, 0, 1);\n            transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, -24.50122, 0, 0, 1);\n}\n19.259259% {\n    -webkit-transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, -24.40907, 0, 0, 1);\n            transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, -24.40907, 0, 0, 1);\n}\n20% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.52342, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.52342, 0, 0, 1);\n}\n20.740741% {\n    -webkit-transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, -24.71354, 0, 0, 1);\n            transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, -24.71354, 0, 0, 1);\n}\n21.481481% {\n    -webkit-transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, -24.89073, 0, 0, 1);\n            transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, -24.89073, 0, 0, 1);\n}\n22.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n22.962963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.06366, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.06366, 0, 0, 1);\n}\n23.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.07926, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.07926, 0, 0, 1);\n}\n24.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.0658, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.0658, 0, 0, 1);\n}\n25.185185% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.04097, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.04097, 0, 0, 1);\n}\n25.925926% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.017, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.017, 0, 0, 1);\n}\n26.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n27.407407% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99121, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99121, 0, 0, 1);\n}\n28.148148% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.98906, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.98906, 0, 0, 1);\n}\n28.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99091, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99091, 0, 0, 1);\n}\n29.62963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99434, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99434, 0, 0, 1);\n}\n30.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99765, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99765, 0, 0, 1);\n}\n31.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n31.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.00121, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.00121, 0, 0, 1);\n}\n32.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.00151, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.00151, 0, 0, 1);\n}\n33.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: scale(0) translateX(-25px);\n            transform: scale(0) translateX(-25px);\n}\n100% {\n    -webkit-transform: scale(0) translateX(-25px);\n            transform: scale(0) translateX(-25px);\n}\n}\n@keyframes circle-6-anim-1-circle {\n0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n0.740741% {\n    -webkit-transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n1.481481% {\n    -webkit-transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n2.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n2.962963% {\n    -webkit-transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n3.703704% {\n    -webkit-transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n4.444444% {\n    -webkit-transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n5.185185% {\n    -webkit-transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n5.925926% {\n    -webkit-transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n6.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n7.407407% {\n    -webkit-transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n8.148148% {\n    -webkit-transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n8.888889% {\n    -webkit-transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n9.62963% {\n    -webkit-transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n10.37037% {\n    -webkit-transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n11.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n11.851852% {\n    -webkit-transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, -9.51676, 0, 0, 1);\n            transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, -9.51676, 0, 0, 1);\n}\n12.592593% {\n    -webkit-transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, -18.75576, 0, 0, 1);\n            transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, -18.75576, 0, 0, 1);\n}\n13.333333% {\n    -webkit-transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, -25.26155, 0, 0, 1);\n            transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, -25.26155, 0, 0, 1);\n}\n14.074074% {\n    -webkit-transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, -28.53849, 0, 0, 1);\n            transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, -28.53849, 0, 0, 1);\n}\n14.814815% {\n    -webkit-transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, -29.2499, 0, 0, 1);\n            transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, -29.2499, 0, 0, 1);\n}\n15.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -28.45173, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -28.45173, 0, 0, 1);\n}\n16.296296% {\n    -webkit-transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, -27.09752, 0, 0, 1);\n            transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, -27.09752, 0, 0, 1);\n}\n17.037037% {\n    -webkit-transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, -25.82591, 0, 0, 1);\n            transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, -25.82591, 0, 0, 1);\n}\n17.777778% {\n    -webkit-transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, -24.9428, 0, 0, 1);\n            transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, -24.9428, 0, 0, 1);\n}\n18.518519% {\n    -webkit-transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, -24.50122, 0, 0, 1);\n            transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, -24.50122, 0, 0, 1);\n}\n19.259259% {\n    -webkit-transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, -24.40907, 0, 0, 1);\n            transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, -24.40907, 0, 0, 1);\n}\n20% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.52342, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.52342, 0, 0, 1);\n}\n20.740741% {\n    -webkit-transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, -24.71354, 0, 0, 1);\n            transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, -24.71354, 0, 0, 1);\n}\n21.481481% {\n    -webkit-transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, -24.89073, 0, 0, 1);\n            transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, -24.89073, 0, 0, 1);\n}\n22.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n22.962963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.06366, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.06366, 0, 0, 1);\n}\n23.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.07926, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.07926, 0, 0, 1);\n}\n24.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.0658, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.0658, 0, 0, 1);\n}\n25.185185% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.04097, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.04097, 0, 0, 1);\n}\n25.925926% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.017, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.017, 0, 0, 1);\n}\n26.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n27.407407% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99121, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99121, 0, 0, 1);\n}\n28.148148% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.98906, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.98906, 0, 0, 1);\n}\n28.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99091, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99091, 0, 0, 1);\n}\n29.62963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99434, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99434, 0, 0, 1);\n}\n30.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99765, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.99765, 0, 0, 1);\n}\n31.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n31.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.00121, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.00121, 0, 0, 1);\n}\n32.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.00151, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.00151, 0, 0, 1);\n}\n33.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: scale(0) translateX(-25px);\n            transform: scale(0) translateX(-25px);\n}\n100% {\n    -webkit-transform: scale(0) translateX(-25px);\n            transform: scale(0) translateX(-25px);\n}\n}\n\n/* Generated with Bounce.js. Edit at http://goo.gl/e10ASq */\n@-webkit-keyframes circle-6-anim-3-circle {\n0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n44.444444% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n45.185185% {\n    -webkit-transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n45.925926% {\n    -webkit-transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n46.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n47.407407% {\n    -webkit-transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n48.148148% {\n    -webkit-transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n48.888889% {\n    -webkit-transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n49.62963% {\n    -webkit-transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n50.37037% {\n    -webkit-transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.851852% {\n    -webkit-transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n52.592593% {\n    -webkit-transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n53.333333% {\n    -webkit-transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.074074% {\n    -webkit-transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.814815% {\n    -webkit-transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n55.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n56.296296% {\n    -webkit-transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, -15.05076, 0, 0, 1);\n            transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, -15.05076, 0, 0, 1);\n}\n57.037037% {\n    -webkit-transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, -26.2515, 0, 0, 1);\n            transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, -26.2515, 0, 0, 1);\n}\n57.777778% {\n    -webkit-transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, -29.73137, 0, 0, 1);\n            transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, -29.73137, 0, 0, 1);\n}\n58.518519% {\n    -webkit-transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, -28.42084, 0, 0, 1);\n            transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, -28.42084, 0, 0, 1);\n}\n59.259259% {\n    -webkit-transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, -26.07434, 0, 0, 1);\n            transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, -26.07434, 0, 0, 1);\n}\n60% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.63046, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.63046, 0, 0, 1);\n}\n60.740741% {\n    -webkit-transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, -24.29556, 0, 0, 1);\n            transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, -24.29556, 0, 0, 1);\n}\n61.481481% {\n    -webkit-transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, -24.54061, 0, 0, 1);\n            transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, -24.54061, 0, 0, 1);\n}\n62.222222% {\n    -webkit-transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, -24.86216, 0, 0, 1);\n            transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, -24.86216, 0, 0, 1);\n}\n62.962963% {\n    -webkit-transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, -25.04022, 0, 0, 1);\n            transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, -25.04022, 0, 0, 1);\n}\n63.703704% {\n    -webkit-transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, -25.07557, 0, 0, 1);\n            transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, -25.07557, 0, 0, 1);\n}\n64.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.04628, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.04628, 0, 0, 1);\n}\n65.185185% {\n    -webkit-transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, -25.01399, 0, 0, 1);\n            transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, -25.01399, 0, 0, 1);\n}\n65.925926% {\n    -webkit-transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, -25.00006, 0, 0, 1);\n            transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, -25.00006, 0, 0, 1);\n}\n66.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.98749, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.98749, 0, 0, 1);\n}\n67.407407% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, -8.15699, 0, 0, 1);\n            transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, -8.15699, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, -2.66146, 0, 0, 1);\n            transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, -2.66146, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, -0.86838, 0, 0, 1);\n            transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, -0.86838, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, -0.28334, 0, 0, 1);\n            transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, -0.28334, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, -0.09245, 0, 0, 1);\n            transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, -0.09245, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, -0.03016, 0, 0, 1);\n            transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, -0.03016, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, -0.00984, 0, 0, 1);\n            transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, -0.00984, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, -0.00321, 0, 0, 1);\n            transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, -0.00321, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, -0.00105, 0, 0, 1);\n            transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, -0.00105, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, -0.00034, 0, 0, 1);\n            transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, -0.00034, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00011, 0, 0, 1);\n            transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00011, 0, 0, 1);\n}\n97.777778% {\n    -webkit-transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00004, 0, 0, 1);\n            transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00004, 0, 0, 1);\n}\n98.518519% {\n    -webkit-transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00001, 0, 0, 1);\n            transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00001, 0, 0, 1);\n}\n99.259259% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n}\n@keyframes circle-6-anim-3-circle {\n0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n44.444444% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n45.185185% {\n    -webkit-transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n45.925926% {\n    -webkit-transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n46.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n47.407407% {\n    -webkit-transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n48.148148% {\n    -webkit-transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n48.888889% {\n    -webkit-transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n49.62963% {\n    -webkit-transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n50.37037% {\n    -webkit-transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.851852% {\n    -webkit-transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n52.592593% {\n    -webkit-transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n53.333333% {\n    -webkit-transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.074074% {\n    -webkit-transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.814815% {\n    -webkit-transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n55.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n56.296296% {\n    -webkit-transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, -15.05076, 0, 0, 1);\n            transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, -15.05076, 0, 0, 1);\n}\n57.037037% {\n    -webkit-transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, -26.2515, 0, 0, 1);\n            transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, -26.2515, 0, 0, 1);\n}\n57.777778% {\n    -webkit-transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, -29.73137, 0, 0, 1);\n            transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, -29.73137, 0, 0, 1);\n}\n58.518519% {\n    -webkit-transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, -28.42084, 0, 0, 1);\n            transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, -28.42084, 0, 0, 1);\n}\n59.259259% {\n    -webkit-transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, -26.07434, 0, 0, 1);\n            transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, -26.07434, 0, 0, 1);\n}\n60% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.63046, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.63046, 0, 0, 1);\n}\n60.740741% {\n    -webkit-transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, -24.29556, 0, 0, 1);\n            transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, -24.29556, 0, 0, 1);\n}\n61.481481% {\n    -webkit-transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, -24.54061, 0, 0, 1);\n            transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, -24.54061, 0, 0, 1);\n}\n62.222222% {\n    -webkit-transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, -24.86216, 0, 0, 1);\n            transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, -24.86216, 0, 0, 1);\n}\n62.962963% {\n    -webkit-transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, -25.04022, 0, 0, 1);\n            transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, -25.04022, 0, 0, 1);\n}\n63.703704% {\n    -webkit-transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, -25.07557, 0, 0, 1);\n            transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, -25.07557, 0, 0, 1);\n}\n64.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.04628, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25.04628, 0, 0, 1);\n}\n65.185185% {\n    -webkit-transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, -25.01399, 0, 0, 1);\n            transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, -25.01399, 0, 0, 1);\n}\n65.925926% {\n    -webkit-transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, -25.00006, 0, 0, 1);\n            transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, -25.00006, 0, 0, 1);\n}\n66.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.98749, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -24.98749, 0, 0, 1);\n}\n67.407407% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, -8.15699, 0, 0, 1);\n            transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, -8.15699, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, -2.66146, 0, 0, 1);\n            transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, -2.66146, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, -0.86838, 0, 0, 1);\n            transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, -0.86838, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, -0.28334, 0, 0, 1);\n            transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, -0.28334, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, -0.09245, 0, 0, 1);\n            transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, -0.09245, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, -0.03016, 0, 0, 1);\n            transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, -0.03016, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, -0.00984, 0, 0, 1);\n            transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, -0.00984, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, -0.00321, 0, 0, 1);\n            transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, -0.00321, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, -0.00105, 0, 0, 1);\n            transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, -0.00105, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, -0.00034, 0, 0, 1);\n            transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, -0.00034, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00011, 0, 0, 1);\n            transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00011, 0, 0, 1);\n}\n97.777778% {\n    -webkit-transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00004, 0, 0, 1);\n            transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00004, 0, 0, 1);\n}\n98.518519% {\n    -webkit-transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00001, 0, 0, 1);\n            transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -0.00001, 0, 0, 1);\n}\n99.259259% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n}\n\n/* Generated with Bounce.js. Edit at http://goo.gl/uIqwYq */\n@-webkit-keyframes circle-6-anim-2-circle {\n0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n22.222222% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n22.962963% {\n    -webkit-transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n23.703704% {\n    -webkit-transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n24.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n25.185185% {\n    -webkit-transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n25.925926% {\n    -webkit-transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n26.666667% {\n    -webkit-transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n27.407407% {\n    -webkit-transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n28.148148% {\n    -webkit-transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n28.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n29.62963% {\n    -webkit-transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n30.37037% {\n    -webkit-transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n31.111111% {\n    -webkit-transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n31.851852% {\n    -webkit-transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n32.592593% {\n    -webkit-transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n33.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n34.074074% {\n    -webkit-transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n34.814815% {\n    -webkit-transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n35.555556% {\n    -webkit-transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n36.296296% {\n    -webkit-transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n37.037037% {\n    -webkit-transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n37.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n38.518519% {\n    -webkit-transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n39.259259% {\n    -webkit-transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n40% {\n    -webkit-transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n40.740741% {\n    -webkit-transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n41.481481% {\n    -webkit-transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n42.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n42.962963% {\n    -webkit-transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n43.703704% {\n    -webkit-transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n44.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n}\n@keyframes circle-6-anim-2-circle {\n0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n22.222222% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n22.962963% {\n    -webkit-transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n23.703704% {\n    -webkit-transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n24.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n25.185185% {\n    -webkit-transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n25.925926% {\n    -webkit-transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n26.666667% {\n    -webkit-transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n27.407407% {\n    -webkit-transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n28.148148% {\n    -webkit-transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n28.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n29.62963% {\n    -webkit-transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n30.37037% {\n    -webkit-transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n31.111111% {\n    -webkit-transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n31.851852% {\n    -webkit-transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n32.592593% {\n    -webkit-transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n33.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n34.074074% {\n    -webkit-transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n34.814815% {\n    -webkit-transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n35.555556% {\n    -webkit-transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n36.296296% {\n    -webkit-transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n37.037037% {\n    -webkit-transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n37.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n38.518519% {\n    -webkit-transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n39.259259% {\n    -webkit-transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n40% {\n    -webkit-transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n40.740741% {\n    -webkit-transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n41.481481% {\n    -webkit-transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n42.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n42.962963% {\n    -webkit-transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n43.703704% {\n    -webkit-transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n44.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n}\n\n/* Generated with Bounce.js. Edit at http://goo.gl/Kdj66E */\n@-webkit-keyframes circle-6-anim-4-circle {\n0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n66.666667% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n67.407407% {\n    -webkit-transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n68.148148% {\n    -webkit-transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n68.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n69.62963% {\n    -webkit-transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n70.37037% {\n    -webkit-transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n71.111111% {\n    -webkit-transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n71.851852% {\n    -webkit-transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n72.592593% {\n    -webkit-transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n73.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n74.074074% {\n    -webkit-transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n74.814815% {\n    -webkit-transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n75.555556% {\n    -webkit-transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n76.296296% {\n    -webkit-transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n77.037037% {\n    -webkit-transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n77.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n78.518519% {\n    -webkit-transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n79.259259% {\n    -webkit-transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80% {\n    -webkit-transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80.740741% {\n    -webkit-transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n81.481481% {\n    -webkit-transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.962963% {\n    -webkit-transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n83.703704% {\n    -webkit-transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n84.444444% {\n    -webkit-transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n85.185185% {\n    -webkit-transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n85.925926% {\n    -webkit-transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n86.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n87.407407% {\n    -webkit-transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.148148% {\n    -webkit-transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n}\n@keyframes circle-6-anim-4-circle {\n0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n66.666667% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n67.407407% {\n    -webkit-transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32778, 0, 0, 0, 0, 0.32778, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n68.148148% {\n    -webkit-transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.69875, 0, 0, 0, 0, 0.69875, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n68.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n69.62963% {\n    -webkit-transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.1815, 0, 0, 0, 0, 1.1815, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n70.37037% {\n    -webkit-transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.24402, 0, 0, 0, 0, 1.24402, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n71.111111% {\n    -webkit-transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.21871, 0, 0, 0, 0, 1.21871, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n71.851852% {\n    -webkit-transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.14702, 0, 0, 0, 0, 1.14702, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n72.592593% {\n    -webkit-transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.06589, 0, 0, 0, 0, 1.06589, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n73.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n74.074074% {\n    -webkit-transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9603, 0, 0, 0, 0, 0.9603, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n74.814815% {\n    -webkit-transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.94663, 0, 0, 0, 0, 0.94663, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n75.555556% {\n    -webkit-transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.95217, 0, 0, 0, 0, 0.95217, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n76.296296% {\n    -webkit-transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.96784, 0, 0, 0, 0, 0.96784, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n77.037037% {\n    -webkit-transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.98559, 0, 0, 0, 0, 0.98559, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n77.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n78.518519% {\n    -webkit-transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00868, 0, 0, 0, 0, 1.00868, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n79.259259% {\n    -webkit-transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.01167, 0, 0, 0, 0, 1.01167, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80% {\n    -webkit-transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.01046, 0, 0, 0, 0, 1.01046, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80.740741% {\n    -webkit-transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00703, 0, 0, 0, 0, 1.00703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n81.481481% {\n    -webkit-transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00315, 0, 0, 0, 0, 1.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.962963% {\n    -webkit-transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.9981, 0, 0, 0, 0, 0.9981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n83.703704% {\n    -webkit-transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99745, 0, 0, 0, 0, 0.99745, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n84.444444% {\n    -webkit-transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99771, 0, 0, 0, 0, 0.99771, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n85.185185% {\n    -webkit-transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99846, 0, 0, 0, 0, 0.99846, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n85.925926% {\n    -webkit-transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99931, 0, 0, 0, 0, 0.99931, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n86.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n87.407407% {\n    -webkit-transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00042, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.148148% {\n    -webkit-transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00056, 0, 0, 0, 0, 1.00056, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32628, 0, 0, 0, 0, 0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.10646, 0, 0, 0, 0, 0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.03474, 0, 0, 0, 0, 0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.01133, 0, 0, 0, 0, 0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.0037, 0, 0, 0, 0, 0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00121, 0, 0, 0, 0, 0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00039, 0, 0, 0, 0, 0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00013, 0, 0, 0, 0, 0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00004, 0, 0, 0, 0, 0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00001, 0, 0, 0, 0, 0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n}\n\n/* Generated with Bounce.js. Edit at http://goo.gl/2SMi6x */\n@-webkit-keyframes circle-6-g-move-bottom {\n0% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n33.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n34.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 16.35397, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 16.35397, 0, 1);\n}\n34.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.69808, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.69808, 0, 1);\n}\n35.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 27.79251, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 27.79251, 0, 1);\n}\n36.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 26.74505, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 26.74505, 0, 1);\n}\n37.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.46104, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.46104, 0, 1);\n}\n37.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.85273, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.85273, 0, 1);\n}\n38.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.77498, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.77498, 0, 1);\n}\n39.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.8837, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.8837, 0, 1);\n}\n40% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.97967, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.97967, 0, 1);\n}\n40.740741% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.017, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.017, 0, 1);\n}\n41.481481% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.01719, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.01719, 0, 1);\n}\n42.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.00735, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.00735, 0, 1);\n}\n42.962963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.00049, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.00049, 0, 1);\n}\n43.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.99838, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.99838, 0, 1);\n}\n44.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25, 0, 1);\n}\n100% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25, 0, 1);\n}\n}\n@keyframes circle-6-g-move-bottom {\n0% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n33.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n34.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 16.35397, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 16.35397, 0, 1);\n}\n34.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.69808, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.69808, 0, 1);\n}\n35.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 27.79251, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 27.79251, 0, 1);\n}\n36.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 26.74505, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 26.74505, 0, 1);\n}\n37.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.46104, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.46104, 0, 1);\n}\n37.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.85273, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.85273, 0, 1);\n}\n38.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.77498, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.77498, 0, 1);\n}\n39.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.8837, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.8837, 0, 1);\n}\n40% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.97967, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.97967, 0, 1);\n}\n40.740741% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.017, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.017, 0, 1);\n}\n41.481481% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.01719, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.01719, 0, 1);\n}\n42.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.00735, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.00735, 0, 1);\n}\n42.962963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.00049, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25.00049, 0, 1);\n}\n43.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.99838, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 24.99838, 0, 1);\n}\n44.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25, 0, 1);\n}\n100% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 25, 0, 1);\n}\n}\n\n/* Generated with Bounce.js. Edit at http://goo.gl/pKqSyP */\n@-webkit-keyframes circle-6-line-grow-horizontal-1 {\n0% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n27.407407% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n28.148148% {\n    -webkit-transform: matrix3d(0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n28.888889% {\n    -webkit-transform: matrix3d(0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n29.62963% {\n    -webkit-transform: matrix3d(1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n30.37037% {\n    -webkit-transform: matrix3d(1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n31.111111% {\n    -webkit-transform: matrix3d(1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n31.851852% {\n    -webkit-transform: matrix3d(1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n32.592593% {\n    -webkit-transform: matrix3d(0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n33.333333% {\n    -webkit-transform: matrix3d(0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n34.074074% {\n    -webkit-transform: matrix3d(0.99755, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99755, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n34.814815% {\n    -webkit-transform: matrix3d(1.0002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.0002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n35.555556% {\n    -webkit-transform: matrix3d(1.00079, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00079, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n36.296296% {\n    -webkit-transform: matrix3d(1.00049, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00049, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n37.037037% {\n    -webkit-transform: matrix3d(1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n37.777778% {\n    -webkit-transform: matrix3d(0.99996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n38.518519% {\n    -webkit-transform: matrix3d(0.99994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n39.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n100% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n}\n@keyframes circle-6-line-grow-horizontal-1 {\n0% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n27.407407% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n28.148148% {\n    -webkit-transform: matrix3d(0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n28.888889% {\n    -webkit-transform: matrix3d(0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n29.62963% {\n    -webkit-transform: matrix3d(1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n30.37037% {\n    -webkit-transform: matrix3d(1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n31.111111% {\n    -webkit-transform: matrix3d(1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n31.851852% {\n    -webkit-transform: matrix3d(1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n32.592593% {\n    -webkit-transform: matrix3d(0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n33.333333% {\n    -webkit-transform: matrix3d(0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n34.074074% {\n    -webkit-transform: matrix3d(0.99755, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99755, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n34.814815% {\n    -webkit-transform: matrix3d(1.0002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.0002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n35.555556% {\n    -webkit-transform: matrix3d(1.00079, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00079, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n36.296296% {\n    -webkit-transform: matrix3d(1.00049, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00049, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n37.037037% {\n    -webkit-transform: matrix3d(1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n37.777778% {\n    -webkit-transform: matrix3d(0.99996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n38.518519% {\n    -webkit-transform: matrix3d(0.99994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n39.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.32628, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.10646, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.03474, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.01133, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.0037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00121, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00039, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n100% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n}\n\n/* Generated with Bounce.js. Edit at http://goo.gl/NHi83y */\n@-webkit-keyframes circle-6-line-grow-horizontal-2 {\n0% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n71.851852% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n72.592593% {\n    -webkit-transform: matrix3d(0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n73.333333% {\n    -webkit-transform: matrix3d(0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n74.074074% {\n    -webkit-transform: matrix3d(1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n74.814815% {\n    -webkit-transform: matrix3d(1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n75.555556% {\n    -webkit-transform: matrix3d(1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n76.296296% {\n    -webkit-transform: matrix3d(1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n77.037037% {\n    -webkit-transform: matrix3d(0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n77.777778% {\n    -webkit-transform: matrix3d(0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n78.518519% {\n    -webkit-transform: matrix3d(0.99755, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99755, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n79.259259% {\n    -webkit-transform: matrix3d(1.0002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.0002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80% {\n    -webkit-transform: matrix3d(1.00079, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00079, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80.740741% {\n    -webkit-transform: matrix3d(1.00049, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00049, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n81.481481% {\n    -webkit-transform: matrix3d(1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.222222% {\n    -webkit-transform: matrix3d(0.99996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.962963% {\n    -webkit-transform: matrix3d(0.99994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n83.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.58933, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.58933, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.33162, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.33162, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.17694, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.17694, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.08817, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.08817, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0397, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.0397, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.01478, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.01478, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00301, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00301, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(-0.00182, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00182, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(-0.00323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(-0.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: matrix3d(-0.00254, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00254, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n97.777778% {\n    -webkit-transform: matrix3d(-0.00185, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00185, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n98.518519% {\n    -webkit-transform: matrix3d(-0.00126, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00126, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n99.259259% {\n    -webkit-transform: matrix3d(-0.00081, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00081, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n100% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n}\n@keyframes circle-6-line-grow-horizontal-2 {\n0% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n71.851852% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n72.592593% {\n    -webkit-transform: matrix3d(0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n73.333333% {\n    -webkit-transform: matrix3d(0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n74.074074% {\n    -webkit-transform: matrix3d(1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n74.814815% {\n    -webkit-transform: matrix3d(1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n75.555556% {\n    -webkit-transform: matrix3d(1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n76.296296% {\n    -webkit-transform: matrix3d(1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n77.037037% {\n    -webkit-transform: matrix3d(0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n77.777778% {\n    -webkit-transform: matrix3d(0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n78.518519% {\n    -webkit-transform: matrix3d(0.99755, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99755, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n79.259259% {\n    -webkit-transform: matrix3d(1.0002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.0002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80% {\n    -webkit-transform: matrix3d(1.00079, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00079, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n80.740741% {\n    -webkit-transform: matrix3d(1.00049, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00049, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n81.481481% {\n    -webkit-transform: matrix3d(1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.222222% {\n    -webkit-transform: matrix3d(0.99996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n82.962963% {\n    -webkit-transform: matrix3d(0.99994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.99994, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n83.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(0.58933, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.58933, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(0.33162, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.33162, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(0.17694, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.17694, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(0.08817, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.08817, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(0.0397, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.0397, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(0.01478, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.01478, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(0.00301, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(0.00301, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(-0.00182, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00182, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(-0.00323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(-0.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00315, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: matrix3d(-0.00254, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00254, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n97.777778% {\n    -webkit-transform: matrix3d(-0.00185, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00185, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n98.518519% {\n    -webkit-transform: matrix3d(-0.00126, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00126, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n99.259259% {\n    -webkit-transform: matrix3d(-0.00081, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(-0.00081, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n100% {\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n}\n}\n\n/* Generated with Bounce.js. Edit at http://goo.gl/21oylQ */\n@-webkit-keyframes circle-6-line-grow-vertical-1 {\n0% {\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n}\n49.62963% {\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n}\n50.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n52.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n53.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n55.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n56.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.28328, 0.99755, 0, 0, 0, 0, 1, 0, -14.92121, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.28328, 0.99755, 0, 0, 0, 0, 1, 0, -14.92121, 0, 0, 1);\n}\n57.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.52069, 1.0002, 0, 0, 0, 0, 1, 0, -25.94861, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.52069, 1.0002, 0, 0, 0, 0, 1, 0, -25.94861, 0, 0, 1);\n}\n57.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.60536, 1.00079, 0, 0, 0, 0, 1, 0, -29.42354, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.60536, 1.00079, 0, 0, 0, 0, 1, 0, -29.42354, 0, 0, 1);\n}\n58.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.57539, 1.00049, 0, 0, 0, 0, 1, 0, -28.22236, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.57539, 1.00049, 0, 0, 0, 0, 1, 0, -28.22236, 0, 0, 1);\n}\n59.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.52172, 1.00013, 0, 0, 0, 0, 1, 0, -25.99242, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.52172, 1.00013, 0, 0, 0, 0, 1, 0, -25.99242, 0, 0, 1);\n}\n60% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49007, 0.99996, 0, 0, 0, 0, 1, 0, -24.63046, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49007, 0.99996, 0, 0, 0, 0, 1, 0, -24.63046, 0, 0, 1);\n}\n60.740741% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.48347, 0.99994, 0, 0, 0, 0, 1, 0, -24.34178, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.48347, 0.99994, 0, 0, 0, 0, 1, 0, -24.34178, 0, 0, 1);\n}\n61.481481% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.48945, 1, 0, 0, 0, 0, 1, 0, -24.60342, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.48945, 1, 0, 0, 0, 0, 1, 0, -24.60342, 0, 0, 1);\n}\n62.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49672, 1, 0, 0, 0, 0, 1, 0, -24.91918, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49672, 1, 0, 0, 0, 0, 1, 0, -24.91918, 0, 0, 1);\n}\n62.962963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.5004, 1, 0, 0, 0, 0, 1, 0, -25.07879, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.5004, 1, 0, 0, 0, 0, 1, 0, -25.07879, 0, 0, 1);\n}\n63.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.50073, 1, 0, 0, 0, 0, 1, 0, -25.09287, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.50073, 1, 0, 0, 0, 0, 1, 0, -25.09287, 0, 0, 1);\n}\n64.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49965, 1, 0, 0, 0, 0, 1, 0, -25.04628, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49965, 1, 0, 0, 0, 0, 1, 0, -25.04628, 0, 0, 1);\n}\n65.185185% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49866, 1, 0, 0, 0, 0, 1, 0, -25.0036, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49866, 1, 0, 0, 0, 0, 1, 0, -25.0036, 0, 0, 1);\n}\n65.925926% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49826, 1, 0, 0, 0, 0, 1, 0, -24.98611, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49826, 1, 0, 0, 0, 0, 1, 0, -24.98611, 0, 0, 1);\n}\n66.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49829, 1, 0, 0, 0, 0, 1, 0, -24.98749, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49829, 1, 0, 0, 0, 0, 1, 0, -24.98749, 0, 0, 1);\n}\n67.407407% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.51685, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.51685, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.26714, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.26714, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.13807, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.13807, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.07136, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.07136, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.03688, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.03688, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.01906, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.01906, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00985, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00985, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00509, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00509, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00263, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00263, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00136, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00136, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.0007, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.0007, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n97.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00036, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00036, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n98.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00019, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00019, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n99.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.0001, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.0001, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n100% {\n    -webkit-transform: scaleY(0) skewX(26.5deg);\n            transform: scaleY(0) skewX(26.5deg);\n}\n}\n@keyframes circle-6-line-grow-vertical-1 {\n0% {\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n}\n49.62963% {\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n}\n50.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n52.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n53.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n55.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n56.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.28328, 0.99755, 0, 0, 0, 0, 1, 0, -14.92121, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.28328, 0.99755, 0, 0, 0, 0, 1, 0, -14.92121, 0, 0, 1);\n}\n57.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.52069, 1.0002, 0, 0, 0, 0, 1, 0, -25.94861, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.52069, 1.0002, 0, 0, 0, 0, 1, 0, -25.94861, 0, 0, 1);\n}\n57.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.60536, 1.00079, 0, 0, 0, 0, 1, 0, -29.42354, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.60536, 1.00079, 0, 0, 0, 0, 1, 0, -29.42354, 0, 0, 1);\n}\n58.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.57539, 1.00049, 0, 0, 0, 0, 1, 0, -28.22236, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.57539, 1.00049, 0, 0, 0, 0, 1, 0, -28.22236, 0, 0, 1);\n}\n59.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.52172, 1.00013, 0, 0, 0, 0, 1, 0, -25.99242, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.52172, 1.00013, 0, 0, 0, 0, 1, 0, -25.99242, 0, 0, 1);\n}\n60% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49007, 0.99996, 0, 0, 0, 0, 1, 0, -24.63046, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49007, 0.99996, 0, 0, 0, 0, 1, 0, -24.63046, 0, 0, 1);\n}\n60.740741% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.48347, 0.99994, 0, 0, 0, 0, 1, 0, -24.34178, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.48347, 0.99994, 0, 0, 0, 0, 1, 0, -24.34178, 0, 0, 1);\n}\n61.481481% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.48945, 1, 0, 0, 0, 0, 1, 0, -24.60342, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.48945, 1, 0, 0, 0, 0, 1, 0, -24.60342, 0, 0, 1);\n}\n62.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49672, 1, 0, 0, 0, 0, 1, 0, -24.91918, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49672, 1, 0, 0, 0, 0, 1, 0, -24.91918, 0, 0, 1);\n}\n62.962963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.5004, 1, 0, 0, 0, 0, 1, 0, -25.07879, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.5004, 1, 0, 0, 0, 0, 1, 0, -25.07879, 0, 0, 1);\n}\n63.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.50073, 1, 0, 0, 0, 0, 1, 0, -25.09287, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.50073, 1, 0, 0, 0, 0, 1, 0, -25.09287, 0, 0, 1);\n}\n64.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49965, 1, 0, 0, 0, 0, 1, 0, -25.04628, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49965, 1, 0, 0, 0, 0, 1, 0, -25.04628, 0, 0, 1);\n}\n65.185185% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49866, 1, 0, 0, 0, 0, 1, 0, -25.0036, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49866, 1, 0, 0, 0, 0, 1, 0, -25.0036, 0, 0, 1);\n}\n65.925926% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49826, 1, 0, 0, 0, 0, 1, 0, -24.98611, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49826, 1, 0, 0, 0, 0, 1, 0, -24.98611, 0, 0, 1);\n}\n66.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49829, 1, 0, 0, 0, 0, 1, 0, -24.98749, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49829, 1, 0, 0, 0, 0, 1, 0, -24.98749, 0, 0, 1);\n}\n67.407407% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 1, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.51685, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.51685, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.26714, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.26714, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.13807, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.13807, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.07136, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.07136, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.03688, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.03688, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.01906, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.01906, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00985, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00985, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00509, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00509, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00263, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00263, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00136, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00136, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.0007, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.0007, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n97.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00036, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00036, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n98.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00019, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.00019, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n99.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0.49858, 0.0001, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0.49858, 0.0001, 0, 0, 0, 0, 1, 0, -25, 0, 0, 1);\n}\n100% {\n    -webkit-transform: scaleY(0) skewX(26.5deg);\n            transform: scaleY(0) skewX(26.5deg);\n}\n}\n\n/* Generated with Bounce.js. Edit at http://goo.gl/taI49K */\n@-webkit-keyframes circle-6-line-grow-vertical-2 {\n0% {\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n}\n49.62963% {\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n}\n50.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n52.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n53.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n55.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n56.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.28328, 0.99755, 0, 0, 0, 0, 1, 0, 14.92121, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.28328, 0.99755, 0, 0, 0, 0, 1, 0, 14.92121, 0, 0, 1);\n}\n57.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.52069, 1.0002, 0, 0, 0, 0, 1, 0, 25.94861, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.52069, 1.0002, 0, 0, 0, 0, 1, 0, 25.94861, 0, 0, 1);\n}\n57.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.60536, 1.00079, 0, 0, 0, 0, 1, 0, 29.42354, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.60536, 1.00079, 0, 0, 0, 0, 1, 0, 29.42354, 0, 0, 1);\n}\n58.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.57539, 1.00049, 0, 0, 0, 0, 1, 0, 28.22236, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.57539, 1.00049, 0, 0, 0, 0, 1, 0, 28.22236, 0, 0, 1);\n}\n59.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.52172, 1.00013, 0, 0, 0, 0, 1, 0, 25.99242, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.52172, 1.00013, 0, 0, 0, 0, 1, 0, 25.99242, 0, 0, 1);\n}\n60% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49007, 0.99996, 0, 0, 0, 0, 1, 0, 24.63046, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49007, 0.99996, 0, 0, 0, 0, 1, 0, 24.63046, 0, 0, 1);\n}\n60.740741% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.48347, 0.99994, 0, 0, 0, 0, 1, 0, 24.34178, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.48347, 0.99994, 0, 0, 0, 0, 1, 0, 24.34178, 0, 0, 1);\n}\n61.481481% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.48945, 1, 0, 0, 0, 0, 1, 0, 24.60342, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.48945, 1, 0, 0, 0, 0, 1, 0, 24.60342, 0, 0, 1);\n}\n62.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49672, 1, 0, 0, 0, 0, 1, 0, 24.91918, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49672, 1, 0, 0, 0, 0, 1, 0, 24.91918, 0, 0, 1);\n}\n62.962963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.5004, 1, 0, 0, 0, 0, 1, 0, 25.07879, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.5004, 1, 0, 0, 0, 0, 1, 0, 25.07879, 0, 0, 1);\n}\n63.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.50073, 1, 0, 0, 0, 0, 1, 0, 25.09287, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.50073, 1, 0, 0, 0, 0, 1, 0, 25.09287, 0, 0, 1);\n}\n64.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49965, 1, 0, 0, 0, 0, 1, 0, 25.04628, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49965, 1, 0, 0, 0, 0, 1, 0, 25.04628, 0, 0, 1);\n}\n65.185185% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49866, 1, 0, 0, 0, 0, 1, 0, 25.0036, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49866, 1, 0, 0, 0, 0, 1, 0, 25.0036, 0, 0, 1);\n}\n65.925926% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49826, 1, 0, 0, 0, 0, 1, 0, 24.98611, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49826, 1, 0, 0, 0, 0, 1, 0, 24.98611, 0, 0, 1);\n}\n66.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49829, 1, 0, 0, 0, 0, 1, 0, 24.98749, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49829, 1, 0, 0, 0, 0, 1, 0, 24.98749, 0, 0, 1);\n}\n67.407407% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n68.148148% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n68.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n69.62963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n70.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n71.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n71.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n72.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n73.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n74.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n74.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n75.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n76.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n77.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n77.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n78.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n79.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n80% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n80.740741% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n81.481481% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n82.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n82.962963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n83.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n84.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n85.185185% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n85.925926% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n86.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n87.407407% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n88.148148% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.51685, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.51685, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.26714, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.26714, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.13807, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.13807, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.07136, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.07136, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.03688, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.03688, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.01906, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.01906, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00985, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00985, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00509, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00509, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00263, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00263, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00136, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00136, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.0007, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.0007, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n97.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00036, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00036, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n98.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00019, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00019, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n99.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.0001, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.0001, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n100% {\n    -webkit-transform: scaleY(0) skewX(-26.5deg);\n            transform: scaleY(0) skewX(-26.5deg);\n}\n}\n@keyframes circle-6-line-grow-vertical-2 {\n0% {\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n}\n49.62963% {\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n}\n50.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.34323, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.88518, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n51.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.09602, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n52.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.09709, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n53.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.04151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 1.00277, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n54.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.99083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n55.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, 0, 0.99292, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\n}\n56.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.28328, 0.99755, 0, 0, 0, 0, 1, 0, 14.92121, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.28328, 0.99755, 0, 0, 0, 0, 1, 0, 14.92121, 0, 0, 1);\n}\n57.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.52069, 1.0002, 0, 0, 0, 0, 1, 0, 25.94861, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.52069, 1.0002, 0, 0, 0, 0, 1, 0, 25.94861, 0, 0, 1);\n}\n57.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.60536, 1.00079, 0, 0, 0, 0, 1, 0, 29.42354, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.60536, 1.00079, 0, 0, 0, 0, 1, 0, 29.42354, 0, 0, 1);\n}\n58.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.57539, 1.00049, 0, 0, 0, 0, 1, 0, 28.22236, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.57539, 1.00049, 0, 0, 0, 0, 1, 0, 28.22236, 0, 0, 1);\n}\n59.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.52172, 1.00013, 0, 0, 0, 0, 1, 0, 25.99242, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.52172, 1.00013, 0, 0, 0, 0, 1, 0, 25.99242, 0, 0, 1);\n}\n60% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49007, 0.99996, 0, 0, 0, 0, 1, 0, 24.63046, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49007, 0.99996, 0, 0, 0, 0, 1, 0, 24.63046, 0, 0, 1);\n}\n60.740741% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.48347, 0.99994, 0, 0, 0, 0, 1, 0, 24.34178, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.48347, 0.99994, 0, 0, 0, 0, 1, 0, 24.34178, 0, 0, 1);\n}\n61.481481% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.48945, 1, 0, 0, 0, 0, 1, 0, 24.60342, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.48945, 1, 0, 0, 0, 0, 1, 0, 24.60342, 0, 0, 1);\n}\n62.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49672, 1, 0, 0, 0, 0, 1, 0, 24.91918, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49672, 1, 0, 0, 0, 0, 1, 0, 24.91918, 0, 0, 1);\n}\n62.962963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.5004, 1, 0, 0, 0, 0, 1, 0, 25.07879, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.5004, 1, 0, 0, 0, 0, 1, 0, 25.07879, 0, 0, 1);\n}\n63.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.50073, 1, 0, 0, 0, 0, 1, 0, 25.09287, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.50073, 1, 0, 0, 0, 0, 1, 0, 25.09287, 0, 0, 1);\n}\n64.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49965, 1, 0, 0, 0, 0, 1, 0, 25.04628, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49965, 1, 0, 0, 0, 0, 1, 0, 25.04628, 0, 0, 1);\n}\n65.185185% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49866, 1, 0, 0, 0, 0, 1, 0, 25.0036, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49866, 1, 0, 0, 0, 0, 1, 0, 25.0036, 0, 0, 1);\n}\n65.925926% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49826, 1, 0, 0, 0, 0, 1, 0, 24.98611, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49826, 1, 0, 0, 0, 0, 1, 0, 24.98611, 0, 0, 1);\n}\n66.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49829, 1, 0, 0, 0, 0, 1, 0, 24.98749, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49829, 1, 0, 0, 0, 0, 1, 0, 24.98749, 0, 0, 1);\n}\n67.407407% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n68.148148% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n68.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n69.62963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n70.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n71.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n71.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n72.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n73.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n74.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n74.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n75.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n76.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n77.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n77.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n78.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n79.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n80% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n80.740741% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n81.481481% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n82.222222% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n82.962963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n83.703704% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n84.444444% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n85.185185% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n85.925926% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n86.666667% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n87.407407% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n88.148148% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n88.888889% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 1, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n89.62963% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.51685, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.51685, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n90.37037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.26714, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.26714, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n91.111111% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.13807, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.13807, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n91.851852% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.07136, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.07136, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n92.592593% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.03688, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.03688, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n93.333333% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.01906, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.01906, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n94.074074% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00985, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00985, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n94.814815% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00509, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00509, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n95.555556% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00263, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00263, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n96.296296% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00136, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00136, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n97.037037% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.0007, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.0007, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n97.777778% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00036, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00036, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n98.518519% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00019, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.00019, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n99.259259% {\n    -webkit-transform: matrix3d(1, 0, 0, 0, -0.49858, 0.0001, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n            transform: matrix3d(1, 0, 0, 0, -0.49858, 0.0001, 0, 0, 0, 0, 1, 0, 25, 0, 0, 1);\n}\n100% {\n    -webkit-transform: scaleY(0) skewX(-26.5deg);\n            transform: scaleY(0) skewX(-26.5deg);\n}\n}\n.spinner[data-v-2474689c] {\n  -webkit-animation: circle-6-rotateAll 4.5s linear infinite both;\n          animation: circle-6-rotateAll 4.5s linear infinite both;\n}\n.anim-1[data-v-2474689c] {\n  -webkit-animation: circle-6-g-move-bottom 4.5s linear infinite both;\n          animation: circle-6-g-move-bottom 4.5s linear infinite both;\n}\n.anim-1 circle[data-v-2474689c] {\n    -webkit-animation: circle-6-anim-1-circle 4.5s linear infinite both;\n            animation: circle-6-anim-1-circle 4.5s linear infinite both;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n}\n.anim-2[data-v-2474689c] {\n  -webkit-animation: circle-6-g-move-bottom 4.5s linear infinite both;\n          animation: circle-6-g-move-bottom 4.5s linear infinite both;\n}\n.anim-2 circle[data-v-2474689c] {\n    -webkit-animation: circle-6-anim-2-circle 4.5s linear infinite both;\n            animation: circle-6-anim-2-circle 4.5s linear infinite both;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n}\n.anim-2 line[data-v-2474689c] {\n    -webkit-animation: circle-6-line-grow-horizontal-1 4.5s linear infinite both;\n            animation: circle-6-line-grow-horizontal-1 4.5s linear infinite both;\n    -webkit-transform-origin: 100% 50%;\n            transform-origin: 100% 50%;\n}\n.anim-3 circle[data-v-2474689c] {\n  -webkit-animation: circle-6-anim-3-circle 4.5s linear infinite both;\n          animation: circle-6-anim-3-circle 4.5s linear infinite both;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n}\n.anim-3 line[data-v-2474689c]:first-of-type {\n  -webkit-animation: circle-6-line-grow-vertical-1 4.5s linear infinite both;\n          animation: circle-6-line-grow-vertical-1 4.5s linear infinite both;\n  -webkit-transform-origin: 50% 0%;\n          transform-origin: 50% 0%;\n}\n.anim-3 line[data-v-2474689c]:last-of-type {\n  -webkit-animation: circle-6-line-grow-vertical-2 4.5s linear infinite both;\n          animation: circle-6-line-grow-vertical-2 4.5s linear infinite both;\n  -webkit-transform-origin: 50% 0%;\n          transform-origin: 50% 0%;\n}\n.anim-4 circle[data-v-2474689c] {\n  -webkit-animation: circle-6-anim-4-circle 4.5s linear infinite both;\n          animation: circle-6-anim-4-circle 4.5s linear infinite both;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n}\n.anim-4 line[data-v-2474689c] {\n  -webkit-animation: circle-6-line-grow-horizontal-2 4.5s linear infinite both;\n          animation: circle-6-line-grow-horizontal-2 4.5s linear infinite both;\n  -webkit-transform-origin: 100% 50%;\n          transform-origin: 100% 50%;\n}\n", ""]);

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-2482801d] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-2482801d] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner-inner[data-v-2482801d] {\n  display: inline-block;\n  position: relative;\n  border-radius: 100%;\n  -webkit-animation: circle-7-spin 3.25s infinite;\n          animation: circle-7-spin 3.25s infinite;\n  -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n  -webkit-animation-delay: -.5s;\n          animation-delay: -.5s;\n}\n.spinner-inner[data-v-2482801d]:after, .spinner-inner[data-v-2482801d]:before {\n    position: absolute;\n    content: '';\n    height: 20px;\n    width: 20px;\n    display: block;\n    background: #41b883;\n    border-radius: 100%;\n    -webkit-animation: circle-7-shrink 3.25s infinite;\n            animation: circle-7-shrink 3.25s infinite;\n    -webkit-animation-delay: -.5s;\n            animation-delay: -.5s;\n}\n.spinner-inner[data-v-2482801d]:before {\n    left: 70%;\n}\n.spinner-inner[data-v-2482801d]:after {\n    top: 70%;\n}\n@-webkit-keyframes circle-7-spin {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    height: 100%;\n    width: 100%;\n}\n33% {\n    height: 0;\n    width: 0;\n}\n55% {\n    -webkit-transform: rotate(720deg);\n            transform: rotate(720deg);\n    height: 0;\n    width: 0;\n}\n70% {\n    height: 100%;\n    width: 100%;\n    margin-top: 0;\n}\n100% {\n    height: 100%;\n    width: 100%;\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n    margin-top: 0;\n}\n}\n@keyframes circle-7-spin {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    height: 100%;\n    width: 100%;\n}\n33% {\n    height: 0;\n    width: 0;\n}\n55% {\n    -webkit-transform: rotate(720deg);\n            transform: rotate(720deg);\n    height: 0;\n    width: 0;\n}\n70% {\n    height: 100%;\n    width: 100%;\n    margin-top: 0;\n}\n100% {\n    height: 100%;\n    width: 100%;\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n    margin-top: 0;\n}\n}\n@-webkit-keyframes circle-7-shrink {\n0%, 100% {\n    height: 20px;\n    width: 20px;\n}\n33%, 55% {\n    height: 0;\n    width: 0;\n}\n70% {\n    height: 20px;\n    width: 20px;\n}\n}\n@keyframes circle-7-shrink {\n0%, 100% {\n    height: 20px;\n    width: 20px;\n}\n33%, 55% {\n    height: 0;\n    width: 0;\n}\n70% {\n    height: 20px;\n    width: 20px;\n}\n}\n", ""]);

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-2490979e] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-2490979e] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.ball-container[data-v-2490979e] {\n  -webkit-animation: animball_two 1.5s infinite;\n          animation: animball_two 1.5s infinite;\n  width: 44px;\n  height: 44px;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  position: relative;\n}\n.contener_mixte[data-v-2490979e] {\n  width: 44px;\n  height: 44px;\n  position: absolute;\n}\n.ballcolor[data-v-2490979e] {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n}\n.ball_1[data-v-2490979e], .ball_2[data-v-2490979e], .ball_3[data-v-2490979e], .ball_4[data-v-2490979e] {\n  position: absolute;\n  -webkit-animation: animball_one 1.5s infinite ease;\n          animation: animball_one 1.5s infinite ease;\n}\n.ball_1[data-v-2490979e] {\n  background-color: #f7484e;\n  top: 0;\n  left: 0;\n}\n.ball_2[data-v-2490979e] {\n  background-color: #f8b334;\n  top: 0;\n  left: 24px;\n}\n.ball_3[data-v-2490979e] {\n  background-color: #41b883;\n  top: 24px;\n  left: 0;\n}\n.ball_4[data-v-2490979e] {\n  background-color: #34495e;\n  top: 24px;\n  left: 24px;\n}\n@-webkit-keyframes animball_one {\n0% {\n    position: absolute;\n}\n50% {\n    top: 12px;\n    left: 12px;\n    position: absolute;\n    opacity: 0.5;\n}\n100% {\n    position: absolute;\n}\n}\n@keyframes animball_one {\n0% {\n    position: absolute;\n}\n50% {\n    top: 12px;\n    left: 12px;\n    position: absolute;\n    opacity: 0.5;\n}\n100% {\n    position: absolute;\n}\n}\n@-webkit-keyframes animball_two {\n0% {\n    -webkit-transform: rotate(0deg) scale(1);\n            transform: rotate(0deg) scale(1);\n}\n50% {\n    -webkit-transform: rotate(360deg) scale(1.3);\n            transform: rotate(360deg) scale(1.3);\n}\n100% {\n    -webkit-transform: rotate(720deg) scale(1);\n            transform: rotate(720deg) scale(1);\n}\n}\n@keyframes animball_two {\n0% {\n    -webkit-transform: rotate(0deg) scale(1);\n            transform: rotate(0deg) scale(1);\n}\n50% {\n    -webkit-transform: rotate(360deg) scale(1.3);\n            transform: rotate(360deg) scale(1.3);\n}\n100% {\n    -webkit-transform: rotate(720deg) scale(1);\n            transform: rotate(720deg) scale(1);\n}\n}\n", ""]);

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-249eaf1f] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-249eaf1f] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner-inner[data-v-249eaf1f] {\n  width: 120px;\n  height: 120px;\n}\n@-webkit-keyframes circle-9-loading {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n25% {\n    -webkit-transform: rotate(160deg);\n            transform: rotate(160deg);\n}\n50% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n75% {\n    -webkit-transform: rotate(160deg);\n            transform: rotate(160deg);\n}\n100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n}\n@keyframes circle-9-loading {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n25% {\n    -webkit-transform: rotate(160deg);\n            transform: rotate(160deg);\n}\n50% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n75% {\n    -webkit-transform: rotate(160deg);\n            transform: rotate(160deg);\n}\n100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n}\n.loading[data-v-249eaf1f] {\n  background-color: transparent;\n  border-radius: 50%;\n  margin: 5px auto;\n  -webkit-animation: circle-9-loading 5s infinite linear;\n          animation: circle-9-loading 5s infinite linear;\n}\n.spin-1[data-v-249eaf1f] {\n  border: 5px solid #f7484e;\n  border-top: 5px solid transparent;\n  border-left: 5px solid transparent;\n  width: 120px;\n  height: 120px;\n}\n.spin-2[data-v-249eaf1f] {\n  border: 5px solid #41b883;\n  border-top: 5px solid transparent;\n  border-left: 5px solid transparent;\n  width: 100px;\n  height: 100px;\n  -webkit-animation-delay: 1s;\n          animation-delay: 1s;\n}\n.spin-3[data-v-249eaf1f] {\n  border: 5px solid #d2d947;\n  border-top: 5px solid transparent;\n  border-left: 5px solid transparent;\n  width: 80px;\n  height: 80px;\n  -webkit-animation-delay: 1s;\n          animation-delay: 1s;\n}\n.spin-4[data-v-249eaf1f] {\n  border: 5px solid #f2a342;\n  border-top: 5px solid transparent;\n  border-left: 5px solid transparent;\n  width: 60px;\n  height: 60px;\n  -webkit-animation-delay: 1s;\n          animation-delay: 1s;\n}\n.spin-5[data-v-249eaf1f] {\n  border: 5px solid #34495e;\n  border-top: 5px solid transparent;\n  border-left: 5px solid transparent;\n  width: 40px;\n  height: 40px;\n  -webkit-animation-delay: 1s;\n          animation-delay: 1s;\n}\n.spin-6[data-v-249eaf1f] {\n  border: 5px solid #fff;\n  width: 20px;\n  height: 20px;\n  -webkit-animation-delay: 1s;\n          animation-delay: 1s;\n}\n", ""]);

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n@-webkit-keyframes origami-show-1 {\nfrom {\n    -webkit-transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-show-1 {\nfrom {\n    -webkit-transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-hide-1 {\nto {\n    -webkit-transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-hide-1 {\nto {\n    -webkit-transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-cycle-1 {\n5% {\n    -webkit-transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n10%,\n  75% {\n    -webkit-transform: rotateZ(60deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(60deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n80%,\n  100% {\n    -webkit-transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-cycle-1 {\n5% {\n    -webkit-transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n10%,\n  75% {\n    -webkit-transform: rotateZ(60deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(60deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n80%,\n  100% {\n    -webkit-transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-show-2 {\nfrom {\n    -webkit-transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-show-2 {\nfrom {\n    -webkit-transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-hide-2 {\nto {\n    -webkit-transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-hide-2 {\nto {\n    -webkit-transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-cycle-2 {\n10% {\n    -webkit-transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n15%,\n  70% {\n    -webkit-transform: rotateZ(120deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(120deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n75%,\n  100% {\n    -webkit-transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-cycle-2 {\n10% {\n    -webkit-transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n15%,\n  70% {\n    -webkit-transform: rotateZ(120deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(120deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n75%,\n  100% {\n    -webkit-transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-show-3 {\nfrom {\n    -webkit-transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-show-3 {\nfrom {\n    -webkit-transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-hide-3 {\nto {\n    -webkit-transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-hide-3 {\nto {\n    -webkit-transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-cycle-3 {\n15% {\n    -webkit-transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n20%,\n  65% {\n    -webkit-transform: rotateZ(180deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(180deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n70%,\n  100% {\n    -webkit-transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-cycle-3 {\n15% {\n    -webkit-transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n20%,\n  65% {\n    -webkit-transform: rotateZ(180deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(180deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n70%,\n  100% {\n    -webkit-transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-show-4 {\nfrom {\n    -webkit-transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-show-4 {\nfrom {\n    -webkit-transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-hide-4 {\nto {\n    -webkit-transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-hide-4 {\nto {\n    -webkit-transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-cycle-4 {\n20% {\n    -webkit-transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n25%,\n  60% {\n    -webkit-transform: rotateZ(240deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(240deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n65%,\n  100% {\n    -webkit-transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-cycle-4 {\n20% {\n    -webkit-transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n25%,\n  60% {\n    -webkit-transform: rotateZ(240deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(240deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n65%,\n  100% {\n    -webkit-transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-show-5 {\nfrom {\n    -webkit-transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-show-5 {\nfrom {\n    -webkit-transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-hide-5 {\nto {\n    -webkit-transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-hide-5 {\nto {\n    -webkit-transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-cycle-5 {\n25% {\n    -webkit-transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n30%,\n  55% {\n    -webkit-transform: rotateZ(300deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(300deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n60%,\n  100% {\n    -webkit-transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-cycle-5 {\n25% {\n    -webkit-transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n30%,\n  55% {\n    -webkit-transform: rotateZ(300deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(300deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n60%,\n  100% {\n    -webkit-transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-show-6 {\nfrom {\n    -webkit-transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-show-6 {\nfrom {\n    -webkit-transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-hide-6 {\nto {\n    -webkit-transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-hide-6 {\nto {\n    -webkit-transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);\n            transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@-webkit-keyframes origami-cycle-6 {\n30% {\n    -webkit-transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n35%,\n  50% {\n    -webkit-transform: rotateZ(360deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(360deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n55%,\n  100% {\n    -webkit-transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n@keyframes origami-cycle-6 {\n30% {\n    -webkit-transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n35%,\n  50% {\n    -webkit-transform: rotateZ(360deg) rotateY(0) rotateX(0deg);\n            transform: rotateZ(360deg) rotateY(0) rotateX(0deg);\n    border-left-color: #41b883;\n}\n55%,\n  100% {\n    -webkit-transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);\n            transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);\n    border-left-color: #31855e;\n}\n}\n.spinner[data-v-2d210fdc] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-2d210fdc] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner-inner[data-v-2d210fdc] {\n  display: block;\n  width: 60px;\n  height: 68px;\n}\n.spinner-inner .slice[data-v-2d210fdc] {\n    border-top: 18px solid transparent;\n    border-right: none;\n    border-bottom: 16px solid transparent;\n    border-left: 30px solid #f7484e;\n    position: absolute;\n    top: 0px;\n    left: 50%;\n    -webkit-transform-origin: left bottom;\n            transform-origin: left bottom;\n    border-radius: 3px 3px 0 0;\n}\n.spinner-inner .slice[data-v-2d210fdc]:nth-child(1) {\n    -webkit-transform: rotateZ(60deg) rotateY(0deg) rotateX(0);\n            transform: rotateZ(60deg) rotateY(0deg) rotateX(0);\n    -webkit-animation: 0.15s linear 0.82s origami-hide-1 both 1;\n            animation: 0.15s linear 0.82s origami-hide-1 both 1;\n}\n.spinner-inner .slice[data-v-2d210fdc]:nth-child(2) {\n    -webkit-transform: rotateZ(120deg) rotateY(0deg) rotateX(0);\n            transform: rotateZ(120deg) rotateY(0deg) rotateX(0);\n    -webkit-animation: 0.15s linear 0.74s origami-hide-2 both 1;\n            animation: 0.15s linear 0.74s origami-hide-2 both 1;\n}\n.spinner-inner .slice[data-v-2d210fdc]:nth-child(3) {\n    -webkit-transform: rotateZ(180deg) rotateY(0deg) rotateX(0);\n            transform: rotateZ(180deg) rotateY(0deg) rotateX(0);\n    -webkit-animation: 0.15s linear 0.66s origami-hide-3 both 1;\n            animation: 0.15s linear 0.66s origami-hide-3 both 1;\n}\n.spinner-inner .slice[data-v-2d210fdc]:nth-child(4) {\n    -webkit-transform: rotateZ(240deg) rotateY(0deg) rotateX(0);\n            transform: rotateZ(240deg) rotateY(0deg) rotateX(0);\n    -webkit-animation: 0.15s linear 0.58s origami-hide-4 both 1;\n            animation: 0.15s linear 0.58s origami-hide-4 both 1;\n}\n.spinner-inner .slice[data-v-2d210fdc]:nth-child(5) {\n    -webkit-transform: rotateZ(300deg) rotateY(0deg) rotateX(0);\n            transform: rotateZ(300deg) rotateY(0deg) rotateX(0);\n    -webkit-animation: 0.15s linear 0.5s origami-hide-5 both 1;\n            animation: 0.15s linear 0.5s origami-hide-5 both 1;\n}\n.spinner-inner .slice[data-v-2d210fdc]:nth-child(6) {\n    -webkit-transform: rotateZ(360deg) rotateY(0deg) rotateX(0);\n            transform: rotateZ(360deg) rotateY(0deg) rotateX(0);\n    -webkit-animation: 0.15s linear 0.42s origami-hide-6 both 1;\n            animation: 0.15s linear 0.42s origami-hide-6 both 1;\n}\n.spinner-inner.loading .slice[data-v-2d210fdc]:nth-child(1) {\n    -webkit-transform: rotateZ(60deg) rotateY(90deg) rotateX(0);\n            transform: rotateZ(60deg) rotateY(90deg) rotateX(0);\n    -webkit-animation: 2s origami-cycle-1 linear infinite both;\n            animation: 2s origami-cycle-1 linear infinite both;\n}\n.spinner-inner.loading .slice[data-v-2d210fdc]:nth-child(2) {\n    -webkit-transform: rotateZ(120deg) rotateY(90deg) rotateX(0);\n            transform: rotateZ(120deg) rotateY(90deg) rotateX(0);\n    -webkit-animation: 2s origami-cycle-2 linear infinite both;\n            animation: 2s origami-cycle-2 linear infinite both;\n}\n.spinner-inner.loading .slice[data-v-2d210fdc]:nth-child(3) {\n    -webkit-transform: rotateZ(180deg) rotateY(90deg) rotateX(0);\n            transform: rotateZ(180deg) rotateY(90deg) rotateX(0);\n    -webkit-animation: 2s origami-cycle-3 linear infinite both;\n            animation: 2s origami-cycle-3 linear infinite both;\n}\n.spinner-inner.loading .slice[data-v-2d210fdc]:nth-child(4) {\n    -webkit-transform: rotateZ(240deg) rotateY(90deg) rotateX(0);\n            transform: rotateZ(240deg) rotateY(90deg) rotateX(0);\n    -webkit-animation: 2s origami-cycle-4 linear infinite both;\n            animation: 2s origami-cycle-4 linear infinite both;\n}\n.spinner-inner.loading .slice[data-v-2d210fdc]:nth-child(5) {\n    -webkit-transform: rotateZ(300deg) rotateY(90deg) rotateX(0);\n            transform: rotateZ(300deg) rotateY(90deg) rotateX(0);\n    -webkit-animation: 2s origami-cycle-5 linear infinite both;\n            animation: 2s origami-cycle-5 linear infinite both;\n}\n.spinner-inner.loading .slice[data-v-2d210fdc]:nth-child(6) {\n    -webkit-transform: rotateZ(360deg) rotateY(90deg) rotateX(0);\n            transform: rotateZ(360deg) rotateY(90deg) rotateX(0);\n    -webkit-animation: 2s origami-cycle-6 linear infinite both;\n            animation: 2s origami-cycle-6 linear infinite both;\n}\n", ""]);

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-4c3a0da6] {\n  overflow: hidden;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-4c3a0da6] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner-inner[data-v-4c3a0da6] {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n  width: 200px;\n  height: 200px;\n  position: relative;\n}\n.hex-brick[data-v-4c3a0da6] {\n  background: #41b883;\n  width: 30px;\n  height: 17px;\n  position: absolute;\n  top: 5px;\n  -webkit-animation-name: socket-fade;\n          animation-name: socket-fade;\n  -webkit-animation-duration: 2s;\n          animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n.h2[data-v-4c3a0da6] {\n  -webkit-transform: rotate(60deg);\n          transform: rotate(60deg);\n}\n.h3[data-v-4c3a0da6] {\n  -webkit-transform: rotate(-60deg);\n          transform: rotate(-60deg);\n}\n.gel[data-v-4c3a0da6] {\n  height: 30px;\n  width: 30px;\n  transition: all .3s;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n}\n.center-gel[data-v-4c3a0da6] {\n  margin-left: -15px;\n  margin-top: -15px;\n  -webkit-animation-name: socket-pulse;\n          animation-name: socket-pulse;\n  -webkit-animation-duration: 2s;\n          animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n.c1[data-v-4c3a0da6] {\n  margin-left: -47px;\n  margin-top: -15px;\n}\n.c2[data-v-4c3a0da6] {\n  margin-left: -31px;\n  margin-top: -43px;\n}\n.c3[data-v-4c3a0da6] {\n  margin-left: 1px;\n  margin-top: -43px;\n}\n.c4[data-v-4c3a0da6] {\n  margin-left: 17px;\n  margin-top: -15px;\n}\n.c5[data-v-4c3a0da6] {\n  margin-left: -31px;\n  margin-top: 13px;\n}\n.c6[data-v-4c3a0da6] {\n  margin-left: 1px;\n  margin-top: 13px;\n}\n.c7[data-v-4c3a0da6] {\n  margin-left: -63px;\n  margin-top: -43px;\n}\n.c8[data-v-4c3a0da6] {\n  margin-left: 33px;\n  margin-top: -43px;\n}\n.c9[data-v-4c3a0da6] {\n  margin-left: -15px;\n  margin-top: 41px;\n}\n.c10[data-v-4c3a0da6] {\n  margin-left: -63px;\n  margin-top: 13px;\n}\n.c11[data-v-4c3a0da6] {\n  margin-left: 33px;\n  margin-top: 13px;\n}\n.c12[data-v-4c3a0da6] {\n  margin-left: -15px;\n  margin-top: -71px;\n}\n.c13[data-v-4c3a0da6] {\n  margin-left: -47px;\n  margin-top: -71px;\n}\n.c14[data-v-4c3a0da6] {\n  margin-left: 17px;\n  margin-top: -71px;\n}\n.c15[data-v-4c3a0da6] {\n  margin-left: -47px;\n  margin-top: 41px;\n}\n.c16[data-v-4c3a0da6] {\n  margin-left: 17px;\n  margin-top: 41px;\n}\n.c17[data-v-4c3a0da6] {\n  margin-left: -79px;\n  margin-top: -15px;\n}\n.c18[data-v-4c3a0da6] {\n  margin-left: 49px;\n  margin-top: -15px;\n}\n.c19[data-v-4c3a0da6] {\n  margin-left: -63px;\n  margin-top: -99px;\n}\n.c20[data-v-4c3a0da6] {\n  margin-left: 33px;\n  margin-top: -99px;\n}\n.c21[data-v-4c3a0da6] {\n  margin-left: 1px;\n  margin-top: -99px;\n}\n.c22[data-v-4c3a0da6] {\n  margin-left: -31px;\n  margin-top: -99px;\n}\n.c23[data-v-4c3a0da6] {\n  margin-left: -63px;\n  margin-top: 69px;\n}\n.c24[data-v-4c3a0da6] {\n  margin-left: 33px;\n  margin-top: 69px;\n}\n.c25[data-v-4c3a0da6] {\n  margin-left: 1px;\n  margin-top: 69px;\n}\n.c26[data-v-4c3a0da6] {\n  margin-left: -31px;\n  margin-top: 69px;\n}\n.c27[data-v-4c3a0da6] {\n  margin-left: -79px;\n  margin-top: -15px;\n}\n.c28[data-v-4c3a0da6] {\n  margin-left: -95px;\n  margin-top: -43px;\n}\n.c29[data-v-4c3a0da6] {\n  margin-left: -95px;\n  margin-top: 13px;\n}\n.c30[data-v-4c3a0da6] {\n  margin-left: 49px;\n  margin-top: 41px;\n}\n.c31[data-v-4c3a0da6] {\n  margin-left: -79px;\n  margin-top: -71px;\n}\n.c32[data-v-4c3a0da6] {\n  margin-left: -111px;\n  margin-top: -15px;\n}\n.c33[data-v-4c3a0da6] {\n  margin-left: 65px;\n  margin-top: -43px;\n}\n.c34[data-v-4c3a0da6] {\n  margin-left: 65px;\n  margin-top: 13px;\n}\n.c35[data-v-4c3a0da6] {\n  margin-left: -79px;\n  margin-top: 41px;\n}\n.c36[data-v-4c3a0da6] {\n  margin-left: 49px;\n  margin-top: -71px;\n}\n.c37[data-v-4c3a0da6] {\n  margin-left: 81px;\n  margin-top: -15px;\n}\n.r1[data-v-4c3a0da6] {\n  -webkit-animation-name: socket-pulse;\n          animation-name: socket-pulse;\n  -webkit-animation-duration: 2s;\n          animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-delay: .2s;\n          animation-delay: .2s;\n}\n.r2[data-v-4c3a0da6] {\n  -webkit-animation-name: socket-pulse;\n          animation-name: socket-pulse;\n  -webkit-animation-duration: 2s;\n          animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-delay: .4s;\n          animation-delay: .4s;\n}\n.r3[data-v-4c3a0da6] {\n  -webkit-animation-name: socket-pulse;\n          animation-name: socket-pulse;\n  -webkit-animation-duration: 2s;\n          animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-delay: .6s;\n          animation-delay: .6s;\n}\n.r1 > .hex-brick[data-v-4c3a0da6] {\n  -webkit-animation-name: socket-fade;\n          animation-name: socket-fade;\n  -webkit-animation-duration: 2s;\n          animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-delay: .2s;\n          animation-delay: .2s;\n}\n.r2 > .hex-brick[data-v-4c3a0da6] {\n  -webkit-animation-name: socket-fade;\n          animation-name: socket-fade;\n  -webkit-animation-duration: 2s;\n          animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-delay: .4s;\n          animation-delay: .4s;\n}\n.r3 > .hex-brick[data-v-4c3a0da6] {\n  -webkit-animation-name: socket-fade;\n          animation-name: socket-fade;\n  -webkit-animation-duration: 2s;\n          animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-delay: .6s;\n          animation-delay: .6s;\n}\n@-webkit-keyframes socket-pulse {\n0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n50% {\n    -webkit-transform: scale(0.01);\n            transform: scale(0.01);\n}\n100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n}\n@keyframes socket-pulse {\n0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n50% {\n    -webkit-transform: scale(0.01);\n            transform: scale(0.01);\n}\n100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n}\n@-webkit-keyframes socket-fade {\n0% {\n    background: #41b883;\n}\n50% {\n    background: #286b4b;\n}\n100% {\n    background: #41b883;\n}\n}\n@keyframes socket-fade {\n0% {\n    background: #41b883;\n}\n50% {\n    background: #286b4b;\n}\n100% {\n    background: #41b883;\n}\n}\n", ""]);

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-56a1aba2] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-56a1aba2] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner-inner[data-v-56a1aba2] {\n  width: 60px;\n  height: 30px;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  background: #6ca;\n  border-top-left-radius: 32px;\n  border-top-right-radius: 32px;\n  display: inline-block;\n  overflow: hidden;\n  position: relative;\n  text-indent: -9999px;\n}\n.spinner-inner[data-v-56a1aba2]::before {\n  -webkit-animation: gauge-spinner 4000ms infinite ease;\n          animation: gauge-spinner 4000ms infinite ease;\n  background: white;\n  border-radius: 2px;\n  content: '';\n  position: absolute;\n  left: 30px;\n  top: 5.33333px;\n  width: 4px;\n  height: 26.66667px;\n  -webkit-transform-origin: 50% 100%;\n          transform-origin: 50% 100%;\n}\n.spinner-inner[data-v-56a1aba2]::after {\n  content: '';\n  background: white;\n  border-radius: 8px;\n  position: absolute;\n  left: 25.6px;\n  top: 25.6px;\n  width: 12.8px;\n  height: 12.8px;\n}\n@-webkit-keyframes gauge-spinner {\n0% {\n    -webkit-transform: rotate(-50deg);\n            transform: rotate(-50deg);\n}\n10% {\n    -webkit-transform: rotate(20deg);\n            transform: rotate(20deg);\n}\n20% {\n    -webkit-transform: rotate(60deg);\n            transform: rotate(60deg);\n}\n24% {\n    -webkit-transform: rotate(60deg);\n            transform: rotate(60deg);\n}\n40% {\n    -webkit-transform: rotate(-20deg);\n            transform: rotate(-20deg);\n}\n54% {\n    -webkit-transform: rotate(70deg);\n            transform: rotate(70deg);\n}\n56% {\n    -webkit-transform: rotate(78deg);\n            transform: rotate(78deg);\n}\n58% {\n    -webkit-transform: rotate(73deg);\n            transform: rotate(73deg);\n}\n60% {\n    -webkit-transform: rotate(75deg);\n            transform: rotate(75deg);\n}\n62% {\n    -webkit-transform: rotate(70deg);\n            transform: rotate(70deg);\n}\n70% {\n    -webkit-transform: rotate(-20deg);\n            transform: rotate(-20deg);\n}\n80% {\n    -webkit-transform: rotate(20deg);\n            transform: rotate(20deg);\n}\n83% {\n    -webkit-transform: rotate(25deg);\n            transform: rotate(25deg);\n}\n86% {\n    -webkit-transform: rotate(20deg);\n            transform: rotate(20deg);\n}\n89% {\n    -webkit-transform: rotate(25deg);\n            transform: rotate(25deg);\n}\n100% {\n    -webkit-transform: rotate(-50deg);\n            transform: rotate(-50deg);\n}\n}\n@keyframes gauge-spinner {\n0% {\n    -webkit-transform: rotate(-50deg);\n            transform: rotate(-50deg);\n}\n10% {\n    -webkit-transform: rotate(20deg);\n            transform: rotate(20deg);\n}\n20% {\n    -webkit-transform: rotate(60deg);\n            transform: rotate(60deg);\n}\n24% {\n    -webkit-transform: rotate(60deg);\n            transform: rotate(60deg);\n}\n40% {\n    -webkit-transform: rotate(-20deg);\n            transform: rotate(-20deg);\n}\n54% {\n    -webkit-transform: rotate(70deg);\n            transform: rotate(70deg);\n}\n56% {\n    -webkit-transform: rotate(78deg);\n            transform: rotate(78deg);\n}\n58% {\n    -webkit-transform: rotate(73deg);\n            transform: rotate(73deg);\n}\n60% {\n    -webkit-transform: rotate(75deg);\n            transform: rotate(75deg);\n}\n62% {\n    -webkit-transform: rotate(70deg);\n            transform: rotate(70deg);\n}\n70% {\n    -webkit-transform: rotate(-20deg);\n            transform: rotate(-20deg);\n}\n80% {\n    -webkit-transform: rotate(20deg);\n            transform: rotate(20deg);\n}\n83% {\n    -webkit-transform: rotate(25deg);\n            transform: rotate(25deg);\n}\n86% {\n    -webkit-transform: rotate(20deg);\n            transform: rotate(20deg);\n}\n89% {\n    -webkit-transform: rotate(25deg);\n            transform: rotate(25deg);\n}\n100% {\n    -webkit-transform: rotate(-50deg);\n            transform: rotate(-50deg);\n}\n}\n", ""]);

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner *[data-v-57d159d6] {\n  line-height: 0;\n  box-sizing: border-box;\n}\n.spinner > div[data-v-57d159d6] {\n  background-color: #41b883;\n  border-radius: 100%;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  position: absolute;\n  opacity: 0;\n  width: 50px;\n  height: 50px;\n  -webkit-animation: jumper 1s 0s linear infinite;\n          animation: jumper 1s 0s linear infinite;\n}\n.spinner > div[data-v-57d159d6]:nth-child(2) {\n  -webkit-animation-delay: 0.33333s;\n          animation-delay: 0.33333s;\n}\n.spinner > div[data-v-57d159d6]:nth-child(3) {\n  -webkit-animation-delay: 0.66666s;\n          animation-delay: 0.66666s;\n}\n@-webkit-keyframes jumper {\n0% {\n    opacity: 0;\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n5% {\n    opacity: 1;\n}\n100% {\n    opacity: 0;\n}\n}\n@keyframes jumper {\n0% {\n    opacity: 0;\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n5% {\n    opacity: 1;\n}\n100% {\n    opacity: 0;\n}\n}\n", ""]);

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-5b7872bd] {\n  display: inline-block;\n}\n.spinner *[data-v-5b7872bd] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.sk-cube[data-v-5b7872bd] {\n  width: 33%;\n  height: 33%;\n  float: left;\n  -webkit-animation: sk-cubeGridScaleDelay 1.8s ease-in-out infinite;\n          animation: sk-cubeGridScaleDelay 1.8s ease-in-out infinite;\n}\n.sk-cube1[data-v-5b7872bd] {\n  -webkit-animation-delay: 0.2s;\n  animation-delay: 0.2s;\n}\n.sk-cube2[data-v-5b7872bd] {\n  -webkit-animation-delay: 0.3s;\n  animation-delay: 0.3s;\n}\n.sk-cube3[data-v-5b7872bd] {\n  -webkit-animation-delay: 0.4s;\n  animation-delay: 0.4s;\n}\n.sk-cube4[data-v-5b7872bd] {\n  -webkit-animation-delay: 0.1s;\n  animation-delay: 0.1s;\n}\n.sk-cube5[data-v-5b7872bd] {\n  -webkit-animation-delay: 0.2s;\n  animation-delay: 0.2s;\n}\n.sk-cube6[data-v-5b7872bd] {\n  -webkit-animation-delay: 0.3s;\n  animation-delay: 0.3s;\n}\n.sk-cube7[data-v-5b7872bd] {\n  -webkit-animation-delay: 0s;\n  animation-delay: 0s;\n}\n.sk-cube8[data-v-5b7872bd] {\n  -webkit-animation-delay: 0.1s;\n  animation-delay: 0.1s;\n}\n.sk-cube9[data-v-5b7872bd] {\n  -webkit-animation-delay: 0.2s;\n  animation-delay: 0.2s;\n}\n@-webkit-keyframes sk-cubeGridScaleDelay {\n0%, 70%, 100% {\n    -webkit-transform: scale3D(1, 1, 1);\n            transform: scale3D(1, 1, 1);\n}\n35% {\n    -webkit-transform: scale3D(0, 0, 1);\n            transform: scale3D(0, 0, 1);\n}\n}\n@keyframes sk-cubeGridScaleDelay {\n0%, 70%, 100% {\n    -webkit-transform: scale3D(1, 1, 1);\n            transform: scale3D(1, 1, 1);\n}\n35% {\n    -webkit-transform: scale3D(0, 0, 1);\n            transform: scale3D(0, 0, 1);\n}\n}\n", ""]);

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-5d17b9be] {\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box;\n}\n.spinner *[data-v-5d17b9be] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner .blob[data-v-5d17b9be] {\n    box-sizing: border-box;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    border: 2px solid #41b883;\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n}\n.spinner .blob.top[data-v-5d17b9be] {\n      top: 0;\n      -webkit-transform: translate(-50%, 0);\n              transform: translate(-50%, 0);\n      -webkit-animation: blob-top 1s infinite ease-in;\n              animation: blob-top 1s infinite ease-in;\n}\n.spinner .blob.bottom[data-v-5d17b9be] {\n      top: 100%;\n      -webkit-transform: translate(-50%, -100%);\n              transform: translate(-50%, -100%);\n      -webkit-animation: blob-bottom 1s infinite ease-in;\n              animation: blob-bottom 1s infinite ease-in;\n}\n.spinner .blob.left[data-v-5d17b9be] {\n      left: 0;\n      -webkit-transform: translate(0, -50%);\n              transform: translate(0, -50%);\n      -webkit-animation: blob-left 1s infinite ease-in;\n              animation: blob-left 1s infinite ease-in;\n}\n.spinner .move-blob[data-v-5d17b9be] {\n    top: 0;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n    -webkit-animation: blob-spinner-mover 1s infinite ease-in;\n            animation: blob-spinner-mover 1s infinite ease-in;\n}\n@-webkit-keyframes blob-bottom {\n25%, 50%, 75% {\n    top: 50%;\n    left: 100%;\n    -webkit-transform: translate(-100%, -50%);\n            transform: translate(-100%, -50%);\n}\n100% {\n    top: 0;\n    left: 50%;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n}\n}\n@keyframes blob-bottom {\n25%, 50%, 75% {\n    top: 50%;\n    left: 100%;\n    -webkit-transform: translate(-100%, -50%);\n            transform: translate(-100%, -50%);\n}\n100% {\n    top: 0;\n    left: 50%;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n}\n}\n@-webkit-keyframes blob-left {\n25% {\n    top: 50%;\n    left: 0;\n    -webkit-transform: translate(0, -50%);\n            transform: translate(0, -50%);\n}\n50%, 100% {\n    top: 100%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -100%);\n            transform: translate(-50%, -100%);\n}\n}\n@keyframes blob-left {\n25% {\n    top: 50%;\n    left: 0;\n    -webkit-transform: translate(0, -50%);\n            transform: translate(0, -50%);\n}\n50%, 100% {\n    top: 100%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -100%);\n            transform: translate(-50%, -100%);\n}\n}\n@-webkit-keyframes blob-top {\n50% {\n    top: 0;\n    left: 50%;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n}\n75%, 100% {\n    top: 50%;\n    left: 0;\n    -webkit-transform: translate(0, -50%);\n            transform: translate(0, -50%);\n}\n}\n@keyframes blob-top {\n50% {\n    top: 0;\n    left: 50%;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n}\n75%, 100% {\n    top: 50%;\n    left: 0;\n    -webkit-transform: translate(0, -50%);\n            transform: translate(0, -50%);\n}\n}\n@-webkit-keyframes blob-spinner-mover {\n0%, 100% {\n    top: 0;\n    left: 50%;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n}\n25% {\n    top: 50%;\n    left: 100%;\n    -webkit-transform: translate(-100%, -50%);\n            transform: translate(-100%, -50%);\n}\n50% {\n    top: 100%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -100%);\n            transform: translate(-50%, -100%);\n}\n75% {\n    top: 50%;\n    left: 0;\n    -webkit-transform: translate(0, -50%);\n            transform: translate(0, -50%);\n}\n}\n@keyframes blob-spinner-mover {\n0%, 100% {\n    top: 0;\n    left: 50%;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n}\n25% {\n    top: 50%;\n    left: 100%;\n    -webkit-transform: translate(-100%, -50%);\n            transform: translate(-100%, -50%);\n}\n50% {\n    top: 100%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -100%);\n            transform: translate(-50%, -100%);\n}\n75% {\n    top: 50%;\n    left: 0;\n    -webkit-transform: translate(0, -50%);\n            transform: translate(0, -50%);\n}\n}\n", ""]);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-618bea29] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-618bea29] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner-inner[data-v-618bea29] {\n  width: 100px;\n  height: 100px;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n.loader-xbox[data-v-618bea29], .loader-xbox[data-v-618bea29]:before, .loader-xbox[data-v-618bea29]:after {\n  position: absolute;\n  border: 3px solid transparent;\n  border-top: 3px solid #41b883;\n  border-radius: 50%;\n  -webkit-animation: rotate linear infinite;\n          animation: rotate linear infinite;\n  content: '';\n}\n.loader-xbox[data-v-618bea29] {\n  height: 100px;\n  width: 100px;\n  -webkit-animation-duration: 1.05s;\n          animation-duration: 1.05s;\n}\n.loader-xbox[data-v-618bea29]:before {\n  height: 75px;\n  width: 75px;\n  top: 10px;\n  left: 10px;\n  border-top: 3px solid #f7484e;\n  -webkit-animation-duration: 10s;\n          animation-duration: 10s;\n}\n.loader-xbox[data-v-618bea29]:after {\n  height: 50px;\n  width: 50px;\n  top: 22px;\n  left: 22px;\n  border-top: 3px solid #f8b334;\n  -webkit-animation-duration: 4s;\n          animation-duration: 4s;\n}\n@-webkit-keyframes rotate {\nfrom {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\nto {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n}\n@keyframes rotate {\nfrom {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\nto {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n}\n", ""]);

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-619a01aa] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-619a01aa] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner-inner[data-v-619a01aa] {\n  width: calc(100% - 14px);\n  height: calc(100% - 14px);\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  border: 1px solid;\n  -webkit-animation: rotate 1.3s linear 0s infinite;\n          animation: rotate 1.3s linear 0s infinite;\n  border-radius: 50%;\n}\n.spinner-inner[data-v-619a01aa]:after {\n    content: '';\n    position: absolute;\n    width: 14px;\n    height: 14px;\n    background: #41b883;\n    border-radius: 100%;\n    left: 50%;\n    -webkit-transform: translateX(-50%) translateY(-50%);\n            transform: translateX(-50%) translateY(-50%);\n    top: 0;\n}\n", ""]);

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner-inner[data-v-62d141f0] {\n  width: 70px;\n  height: 70px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner-inner *[data-v-62d141f0] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.jawn[data-v-62d141f0] {\n  position: relative;\n  background-color: #41b883;\n  width: 15px;\n  height: 15px;\n  margin: 0 auto;\n  border-radius: 50%;\n}\n.jawn[data-v-62d141f0]:after, .jawn[data-v-62d141f0]:before {\n    content: \"\";\n    position: absolute;\n    width: 6px;\n    height: 6px;\n    border-radius: 50%;\n}\n.jawn[data-v-62d141f0]:after {\n    left: -10px;\n    top: -5px;\n    background-color: #f7484e;\n    -webkit-transform-origin: 15px 10px;\n            transform-origin: 15px 10px;\n    -webkit-animation: jawn-axis 1s linear infinite;\n            animation: jawn-axis 1s linear infinite;\n}\n.jawn[data-v-62d141f0]:before {\n    left: -25px;\n    top: -15px;\n    background-color: #34495e;\n    -webkit-transform-origin: 30px 20px;\n            transform-origin: 30px 20px;\n    -webkit-animation: jawn-axis 2s linear infinite;\n            animation: jawn-axis 2s linear infinite;\n}\n@-webkit-keyframes jawn-axis {\n0% {\n    -webkit-transform: rotateZ(0deg) translate3d(0, 0, 0);\n            transform: rotateZ(0deg) translate3d(0, 0, 0);\n}\n100% {\n    -webkit-transform: rotateZ(360deg) translate3d(0, 0, 0);\n            transform: rotateZ(360deg) translate3d(0, 0, 0);\n}\n}\n@keyframes jawn-axis {\n0% {\n    -webkit-transform: rotateZ(0deg) translate3d(0, 0, 0);\n            transform: rotateZ(0deg) translate3d(0, 0, 0);\n}\n100% {\n    -webkit-transform: rotateZ(360deg) translate3d(0, 0, 0);\n            transform: rotateZ(360deg) translate3d(0, 0, 0);\n}\n}\n", ""]);

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-64f95a44] {\n  overflow: hidden;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-64f95a44] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.board[data-v-64f95a44] {\n  width: 250px;\n  position: relative;\n}\n.left[data-v-64f95a44],\n.right[data-v-64f95a44] {\n  height: 50px;\n  width: 15px;\n  background: #41b883;\n  display: inline-block;\n  position: absolute;\n}\n.left[data-v-64f95a44] {\n  left: 0;\n  -webkit-animation: pingpong-position1 2s linear infinite;\n          animation: pingpong-position1 2s linear infinite;\n}\n.right[data-v-64f95a44] {\n  right: 0;\n  -webkit-animation: pingpong-position2 2s linear infinite;\n          animation: pingpong-position2 2s linear infinite;\n}\n.ball[data-v-64f95a44] {\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  background: #f7484e;\n  position: absolute;\n  -webkit-animation: pingpong-bounce 2s linear infinite;\n          animation: pingpong-bounce 2s linear infinite;\n}\n@-webkit-keyframes pingpong-position1 {\n0% {\n    top: -60px;\n}\n25% {\n    top: 0;\n}\n50% {\n    top: 60px;\n}\n75% {\n    top: -60px;\n}\n100% {\n    top: -60px;\n}\n}\n@keyframes pingpong-position1 {\n0% {\n    top: -60px;\n}\n25% {\n    top: 0;\n}\n50% {\n    top: 60px;\n}\n75% {\n    top: -60px;\n}\n100% {\n    top: -60px;\n}\n}\n@-webkit-keyframes pingpong-position2 {\n0% {\n    top: 60px;\n}\n25% {\n    top: 0;\n}\n50% {\n    top: -60px;\n}\n75% {\n    top: -60px;\n}\n100% {\n    top: 60px;\n}\n}\n@keyframes pingpong-position2 {\n0% {\n    top: 60px;\n}\n25% {\n    top: 0;\n}\n50% {\n    top: -60px;\n}\n75% {\n    top: -60px;\n}\n100% {\n    top: 60px;\n}\n}\n@-webkit-keyframes pingpong-bounce {\n0% {\n    top: -35px;\n    left: 10px;\n}\n25% {\n    top: 25px;\n    left: 225px;\n}\n50% {\n    top: 75px;\n    left: 10px;\n}\n75% {\n    top: -35px;\n    left: 225px;\n}\n100% {\n    top: -35px;\n    left: 10px;\n}\n}\n@keyframes pingpong-bounce {\n0% {\n    top: -35px;\n    left: 10px;\n}\n25% {\n    top: 25px;\n    left: 225px;\n}\n50% {\n    top: 75px;\n    left: 10px;\n}\n75% {\n    top: -35px;\n    left: 225px;\n}\n100% {\n    top: -35px;\n    left: 10px;\n}\n}\n", ""]);

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-68328abb] {\n  display: inline-block;\n  text-align: center;\n  font-size: 10px;\n}\n.spinner *[data-v-68328abb] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.rect[data-v-68328abb] {\n  -webkit-animation: sk-stretchdelay 1.2s ease-in-out infinite;\n          animation: sk-stretchdelay 1.2s ease-in-out infinite;\n}\n.spinner > div[data-v-68328abb] {\n  height: 100%;\n  width: 10%;\n  display: inline-block;\n}\n.spinner .rect-2[data-v-68328abb] {\n  -webkit-animation-delay: -1.1s;\n          animation-delay: -1.1s;\n}\n.spinner .rect-3[data-v-68328abb] {\n  -webkit-animation-delay: -1.0s;\n          animation-delay: -1.0s;\n}\n.spinner .rect-4[data-v-68328abb] {\n  -webkit-animation-delay: -0.9s;\n          animation-delay: -0.9s;\n}\n.spinner .rect-5[data-v-68328abb] {\n  -webkit-animation-delay: -0.8s;\n          animation-delay: -0.8s;\n}\n@-webkit-keyframes sk-stretchdelay {\n0%, 40%, 100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n}\n20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n}\n}\n@keyframes sk-stretchdelay {\n0%, 40%, 100% {\n    -webkit-transform: scaleY(0.4);\n            transform: scaleY(0.4);\n}\n20% {\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n}\n}\n", ""]);

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-6bb94a12] {\n  position: relative;\n  cursor: pointer;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-6bb94a12] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.mask[data-v-6bb94a12] {\n  position: absolute;\n  border-radius: 2px;\n  overflow: hidden;\n  -webkit-perspective: 1000;\n          perspective: 1000;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n}\n.plane[data-v-6bb94a12] {\n  background: #41b883;\n  width: 400%;\n  height: 100%;\n  position: absolute;\n  -webkit-transform: translate3d(0px, 0, 0);\n          transform: translate3d(0px, 0, 0);\n  z-index: 100;\n  -webkit-perspective: 1000;\n          perspective: 1000;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n}\n.animation[data-v-6bb94a12] {\n  transition: all 0.3s ease;\n}\n#top .plane[data-v-6bb94a12] {\n  z-index: 2000;\n  -webkit-animation: trans1 1.3s ease-in infinite  0s backwards;\n          animation: trans1 1.3s ease-in infinite  0s backwards;\n}\n#middle .plane[data-v-6bb94a12] {\n  -webkit-transform: translate3d(0px, 0, 0);\n          transform: translate3d(0px, 0, 0);\n  background: #32855f;\n  -webkit-animation: trans2 1.3s linear infinite  0.3s  backwards;\n          animation: trans2 1.3s linear infinite  0.3s  backwards;\n}\n#bottom .plane[data-v-6bb94a12] {\n  z-index: 2000;\n  -webkit-animation: trans3 1.3s ease-out infinite  0.7s backwards;\n          animation: trans3 1.3s ease-out infinite  0.7s backwards;\n}\n#top[data-v-6bb94a12] {\n  width: 53px;\n  height: 20px;\n  left: 20px;\n  top: 5px;\n  -webkit-transform: skew(-15deg, 0);\n          transform: skew(-15deg, 0);\n  z-index: 100;\n}\n#middle[data-v-6bb94a12] {\n  width: 33px;\n  height: 20px;\n  left: 20px;\n  top: 21px;\n  -webkit-transform: skew(-15deg, 40deg);\n          transform: skew(-15deg, 40deg);\n}\n#bottom[data-v-6bb94a12] {\n  width: 53px;\n  height: 20px;\n  top: 35px;\n  -webkit-transform: skew(-15deg, 0);\n          transform: skew(-15deg, 0);\n}\np[data-v-6bb94a12] {\n  color: #fff;\n  position: absolute;\n  left: -3px;\n  top: 45px;\n  font-family: Arial;\n  text-align: center;\n  font-size: 10px;\n}\n@-webkit-keyframes trans1 {\nfrom {\n    -webkit-transform: translate3d(53px, 0, 0);\n            transform: translate3d(53px, 0, 0);\n}\nto {\n    -webkit-transform: translate3d(-250px, 0, 0);\n            transform: translate3d(-250px, 0, 0);\n}\n}\n@keyframes trans1 {\nfrom {\n    -webkit-transform: translate3d(53px, 0, 0);\n            transform: translate3d(53px, 0, 0);\n}\nto {\n    -webkit-transform: translate3d(-250px, 0, 0);\n            transform: translate3d(-250px, 0, 0);\n}\n}\n@-webkit-keyframes trans2 {\nfrom {\n    -webkit-transform: translate3d(-160px, 0, 0);\n            transform: translate3d(-160px, 0, 0);\n}\nto {\n    -webkit-transform: translate3d(53px, 0, 0);\n            transform: translate3d(53px, 0, 0);\n}\n}\n@keyframes trans2 {\nfrom {\n    -webkit-transform: translate3d(-160px, 0, 0);\n            transform: translate3d(-160px, 0, 0);\n}\nto {\n    -webkit-transform: translate3d(53px, 0, 0);\n            transform: translate3d(53px, 0, 0);\n}\n}\n@-webkit-keyframes trans3 {\nfrom {\n    -webkit-transform: translate3d(53px, 0, 0);\n            transform: translate3d(53px, 0, 0);\n}\nto {\n    -webkit-transform: translate3d(-220px, 0, 0);\n            transform: translate3d(-220px, 0, 0);\n}\n}\n@keyframes trans3 {\nfrom {\n    -webkit-transform: translate3d(53px, 0, 0);\n            transform: translate3d(53px, 0, 0);\n}\nto {\n    -webkit-transform: translate3d(-220px, 0, 0);\n            transform: translate3d(-220px, 0, 0);\n}\n}\n@-webkit-keyframes animColor {\nfrom {\n    background: red;\n}\n25% {\n    background: yellow;\n}\n50% {\n    background: green;\n}\n75% {\n    background: brown;\n}\nto {\n    background: blue;\n}\n}\n@keyframes animColor {\nfrom {\n    background: red;\n}\n25% {\n    background: yellow;\n}\n50% {\n    background: green;\n}\n75% {\n    background: brown;\n}\nto {\n    background: blue;\n}\n}\n", ""]);

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-71a7ea5e] {\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: sk-scaleout 1s ease-in-out infinite;\n          animation: sk-scaleout 1s ease-in-out infinite;\n}\n@-webkit-keyframes sk-scaleout {\n0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 0;\n}\n}\n@keyframes sk-scaleout {\n0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n}\n100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 0;\n}\n}\n", ""]);

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-7c8564f3] {\n  overflow: hidden;\n  position: relative;\n  text-indent: -9999px;\n  display: inline-block;\n  background: #f86;\n  border-radius: 50%;\n  -webkit-transform: rotateZ(90deg);\n          transform: rotateZ(90deg);\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n  -webkit-animation: plus-loader-background 3s infinite ease-in-out;\n          animation: plus-loader-background 3s infinite ease-in-out;\n}\n.spinner[data-v-7c8564f3]::after {\n  background: #f86;\n  border-radius: 50% 0 0 50%;\n  content: '';\n  position: absolute;\n  right: 50%;\n  top: 0;\n  width: 50%;\n  height: 100%;\n  -webkit-transform-origin: 100% 50%;\n          transform-origin: 100% 50%;\n  -webkit-animation: plus-loader-top 3s infinite linear;\n          animation: plus-loader-top 3s infinite linear;\n}\n.spinner[data-v-7c8564f3]::before {\n  background: #fc6;\n  border-radius: 50% 0 0 50%;\n  content: '';\n  position: absolute;\n  right: 50%;\n  top: 0;\n  width: 50%;\n  height: 100%;\n  -webkit-transform-origin: 100% 50%;\n          transform-origin: 100% 50%;\n  -webkit-animation: plus-loader-bottom 3s infinite linear;\n          animation: plus-loader-bottom 3s infinite linear;\n}\n@-webkit-keyframes plus-loader-top {\n2.5% {\n    background: #f86;\n    -webkit-transform: rotateY(0deg);\n            transform: rotateY(0deg);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n}\n13.75% {\n    background: #ff430d;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n13.76% {\n    background: #ffae0d;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out;\n}\n25% {\n    background: #fc6;\n    -webkit-transform: rotateY(180deg);\n            transform: rotateY(180deg);\n}\n27.5% {\n    background: #fc6;\n    -webkit-transform: rotateY(180deg);\n            transform: rotateY(180deg);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n}\n41.25% {\n    background: #ffae0d;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n41.26% {\n    background: #2cc642;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out;\n}\n50% {\n    background: #6d7;\n    -webkit-transform: rotateY(0deg);\n            transform: rotateY(0deg);\n}\n52.5% {\n    background: #6d7;\n    -webkit-transform: rotateY(0deg);\n            transform: rotateY(0deg);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n}\n63.75% {\n    background: #2cc642;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n63.76% {\n    background: #1386d2;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out;\n}\n75% {\n    background: #4ae;\n    -webkit-transform: rotateY(180deg);\n            transform: rotateY(180deg);\n}\n77.5% {\n    background: #4ae;\n    -webkit-transform: rotateY(180deg);\n            transform: rotateY(180deg);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n}\n91.25% {\n    background: #1386d2;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n91.26% {\n    background: #ff430d;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n}\n100% {\n    background: #f86;\n    -webkit-transform: rotateY(0deg);\n            transform: rotateY(0deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n}\n@keyframes plus-loader-top {\n2.5% {\n    background: #f86;\n    -webkit-transform: rotateY(0deg);\n            transform: rotateY(0deg);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n}\n13.75% {\n    background: #ff430d;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n13.76% {\n    background: #ffae0d;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out;\n}\n25% {\n    background: #fc6;\n    -webkit-transform: rotateY(180deg);\n            transform: rotateY(180deg);\n}\n27.5% {\n    background: #fc6;\n    -webkit-transform: rotateY(180deg);\n            transform: rotateY(180deg);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n}\n41.25% {\n    background: #ffae0d;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n41.26% {\n    background: #2cc642;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out;\n}\n50% {\n    background: #6d7;\n    -webkit-transform: rotateY(0deg);\n            transform: rotateY(0deg);\n}\n52.5% {\n    background: #6d7;\n    -webkit-transform: rotateY(0deg);\n            transform: rotateY(0deg);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n}\n63.75% {\n    background: #2cc642;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n63.76% {\n    background: #1386d2;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out;\n}\n75% {\n    background: #4ae;\n    -webkit-transform: rotateY(180deg);\n            transform: rotateY(180deg);\n}\n77.5% {\n    background: #4ae;\n    -webkit-transform: rotateY(180deg);\n            transform: rotateY(180deg);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n}\n91.25% {\n    background: #1386d2;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n91.26% {\n    background: #ff430d;\n    -webkit-transform: rotateY(90deg);\n            transform: rotateY(90deg);\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in;\n}\n100% {\n    background: #f86;\n    -webkit-transform: rotateY(0deg);\n            transform: rotateY(0deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n}\n@-webkit-keyframes plus-loader-bottom {\n0% {\n    background: #fc6;\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n50% {\n    background: #fc6;\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n75% {\n    background: #4ae;\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n100% {\n    background: #4ae;\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n}\n@keyframes plus-loader-bottom {\n0% {\n    background: #fc6;\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n50% {\n    background: #fc6;\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n75% {\n    background: #4ae;\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n100% {\n    background: #4ae;\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n}\n@-webkit-keyframes plus-loader-background {\n0% {\n    background: #f86;\n    -webkit-transform: rotateZ(180deg);\n            transform: rotateZ(180deg);\n}\n25% {\n    background: #f86;\n    -webkit-transform: rotateZ(180deg);\n            transform: rotateZ(180deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n27.5% {\n    background: #6d7;\n    -webkit-transform: rotateZ(90deg);\n            transform: rotateZ(90deg);\n}\n50% {\n    background: #6d7;\n    -webkit-transform: rotateZ(90deg);\n            transform: rotateZ(90deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n52.5% {\n    background: #6d7;\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n75% {\n    background: #6d7;\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n77.5% {\n    background: #f86;\n    -webkit-transform: rotateZ(270deg);\n            transform: rotateZ(270deg);\n}\n100% {\n    background: #f86;\n    -webkit-transform: rotateZ(270deg);\n            transform: rotateZ(270deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n}\n@keyframes plus-loader-background {\n0% {\n    background: #f86;\n    -webkit-transform: rotateZ(180deg);\n            transform: rotateZ(180deg);\n}\n25% {\n    background: #f86;\n    -webkit-transform: rotateZ(180deg);\n            transform: rotateZ(180deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n27.5% {\n    background: #6d7;\n    -webkit-transform: rotateZ(90deg);\n            transform: rotateZ(90deg);\n}\n50% {\n    background: #6d7;\n    -webkit-transform: rotateZ(90deg);\n            transform: rotateZ(90deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n52.5% {\n    background: #6d7;\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n75% {\n    background: #6d7;\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n77.5% {\n    background: #f86;\n    -webkit-transform: rotateZ(270deg);\n            transform: rotateZ(270deg);\n}\n100% {\n    background: #f86;\n    -webkit-transform: rotateZ(270deg);\n            transform: rotateZ(270deg);\n    -webkit-animation-timing-function: step-start;\n            animation-timing-function: step-start;\n}\n}\n", ""]);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-b8d3bbda] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  line-height: 0;\n}\n.spinner *[data-v-b8d3bbda] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner-inner[data-v-b8d3bbda] {\n  position: relative;\n  width: 75px;\n  height: 75px;\n}\n.load3-center[data-v-b8d3bbda] {\n  display: inline-block;\n  position: absolute;\n  background: #41b883;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  height: 30px;\n  width: 30px;\n  left: 23px;\n  top: 23px;\n  border-radius: 3px;\n  -webkit-animation: rotate-square-5-pulse 1s ease infinite;\n          animation: rotate-square-5-pulse 1s ease infinite;\n}\n.load3[data-v-b8d3bbda] {\n  display: inline-block;\n  position: relative;\n  width: 75px;\n  height: 75px;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n.load3[data-v-b8d3bbda]:after, .load3[data-v-b8d3bbda]:before {\n    position: absolute;\n    content: '';\n    height: 10px;\n    width: 10px;\n    display: block;\n    top: 0;\n    border-radius: 3px;\n    background: #41b883;\n    -webkit-animation-delay: -.5s;\n            animation-delay: -.5s;\n}\n.load3[data-v-b8d3bbda]:after {\n    right: 0;\n    -webkit-animation: rotate-square-5-square-tr 2s ease infinite;\n            animation: rotate-square-5-square-tr 2s ease infinite;\n    -webkit-animation-delay: .125s;\n            animation-delay: .125s;\n}\n.load3[data-v-b8d3bbda]:before {\n    -webkit-animation: rotate-square-5-square-tl 2s ease infinite;\n            animation: rotate-square-5-square-tl 2s ease infinite;\n    -webkit-animation-delay: .125s;\n            animation-delay: .125s;\n}\n.load3.two[data-v-b8d3bbda] {\n  position: relative;\n  top: -75px;\n}\n.load3.two[data-v-b8d3bbda]:after, .load3.two[data-v-b8d3bbda]:before {\n    bottom: 0;\n    top: initial;\n}\n.load3.two[data-v-b8d3bbda]:after {\n    -webkit-animation: rotate-square-5-square-br 2s ease infinite;\n            animation: rotate-square-5-square-br 2s ease infinite;\n    -webkit-animation-direction: reverse;\n            animation-direction: reverse;\n}\n.load3.two[data-v-b8d3bbda]:before {\n    -webkit-animation: rotate-square-5-square-bl 2s ease infinite;\n            animation: rotate-square-5-square-bl 2s ease infinite;\n    -webkit-animation-direction: reverse;\n            animation-direction: reverse;\n}\n@-webkit-keyframes rotate-square-5-square-tl {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(0, 62.5px);\n            transform: translate(0, 62.5px);\n}\n50% {\n    -webkit-transform: translate(62.5px, 62.5px);\n            transform: translate(62.5px, 62.5px);\n}\n75% {\n    -webkit-transform: translate(62.5px, 0);\n            transform: translate(62.5px, 0);\n}\n}\n@keyframes rotate-square-5-square-tl {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(0, 62.5px);\n            transform: translate(0, 62.5px);\n}\n50% {\n    -webkit-transform: translate(62.5px, 62.5px);\n            transform: translate(62.5px, 62.5px);\n}\n75% {\n    -webkit-transform: translate(62.5px, 0);\n            transform: translate(62.5px, 0);\n}\n}\n@-webkit-keyframes rotate-square-5-square-bl {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(0, -62.5px);\n            transform: translate(0, -62.5px);\n}\n50% {\n    -webkit-transform: translate(62.5px, -62.5px);\n            transform: translate(62.5px, -62.5px);\n}\n75% {\n    -webkit-transform: translate(62.5px, 0);\n            transform: translate(62.5px, 0);\n}\n}\n@keyframes rotate-square-5-square-bl {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(0, -62.5px);\n            transform: translate(0, -62.5px);\n}\n50% {\n    -webkit-transform: translate(62.5px, -62.5px);\n            transform: translate(62.5px, -62.5px);\n}\n75% {\n    -webkit-transform: translate(62.5px, 0);\n            transform: translate(62.5px, 0);\n}\n}\n@-webkit-keyframes rotate-square-5-square-tr {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(-62.5px, 0);\n            transform: translate(-62.5px, 0);\n}\n50% {\n    -webkit-transform: translate(-62.5px, 62.5px);\n            transform: translate(-62.5px, 62.5px);\n}\n75% {\n    -webkit-transform: translate(0, 62.5px);\n            transform: translate(0, 62.5px);\n}\n}\n@keyframes rotate-square-5-square-tr {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(-62.5px, 0);\n            transform: translate(-62.5px, 0);\n}\n50% {\n    -webkit-transform: translate(-62.5px, 62.5px);\n            transform: translate(-62.5px, 62.5px);\n}\n75% {\n    -webkit-transform: translate(0, 62.5px);\n            transform: translate(0, 62.5px);\n}\n}\n@-webkit-keyframes rotate-square-5-square-br {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(-62.5px, 0);\n            transform: translate(-62.5px, 0);\n}\n50% {\n    -webkit-transform: translate(-62.5px, -62.5px);\n            transform: translate(-62.5px, -62.5px);\n}\n75% {\n    -webkit-transform: translate(0, -62.5px);\n            transform: translate(0, -62.5px);\n}\n}\n@keyframes rotate-square-5-square-br {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(-62.5px, 0);\n            transform: translate(-62.5px, 0);\n}\n50% {\n    -webkit-transform: translate(-62.5px, -62.5px);\n            transform: translate(-62.5px, -62.5px);\n}\n75% {\n    -webkit-transform: translate(0, -62.5px);\n            transform: translate(0, -62.5px);\n}\n}\n@-webkit-keyframes rotate-square-5-pulse {\n0%, 100% {\n    -webkit-transform: scale(1) rotate(45deg);\n            transform: scale(1) rotate(45deg);\n}\n75% {\n    -webkit-transform: scale(0.25) rotate(45deg);\n            transform: scale(0.25) rotate(45deg);\n}\n}\n@keyframes rotate-square-5-pulse {\n0%, 100% {\n    -webkit-transform: scale(1) rotate(45deg);\n            transform: scale(1) rotate(45deg);\n}\n75% {\n    -webkit-transform: scale(0.25) rotate(45deg);\n            transform: scale(0.25) rotate(45deg);\n}\n}\n", ""]);

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-b8efeadc] {\n  position: relative;\n  border: 4px solid #41b883;\n  -webkit-animation: loader 2s infinite ease;\n          animation: loader 2s infinite ease;\n}\n.spinner *[data-v-b8efeadc] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.loader-inner[data-v-b8efeadc] {\n  vertical-align: top;\n  display: inline-block;\n  width: 100%;\n  background-color: #41b883;\n  -webkit-animation: loader-inner 2s infinite ease-in;\n          animation: loader-inner 2s infinite ease-in;\n}\n@-webkit-keyframes loader {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n25% {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n}\n50% {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n}\n75% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n}\n@keyframes loader {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n25% {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n}\n50% {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n}\n75% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n}\n}\n@-webkit-keyframes loader-inner {\n0% {\n    height: 0%;\n}\n25% {\n    height: 0%;\n}\n50% {\n    height: 100%;\n}\n75% {\n    height: 100%;\n}\n100% {\n    height: 0%;\n}\n}\n@keyframes loader-inner {\n0% {\n    height: 0%;\n}\n25% {\n    height: 0%;\n}\n50% {\n    height: 100%;\n}\n75% {\n    height: 100%;\n}\n100% {\n    height: 0%;\n}\n}\n", ""]);

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-b90c19de] {\n  height: 40px;\n  width: 40px;\n}\n.spinner *[data-v-b90c19de] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.b0[data-v-b90c19de] {\n  -webkit-animation: rotate-square-3-b0 4s infinite ease;\n          animation: rotate-square-3-b0 4s infinite ease;\n  -webkit-transform-origin: 250px 250px;\n          transform-origin: 250px 250px;\n}\n.b1[data-v-b90c19de] {\n  -webkit-animation: rotate-square-3-b1 4s infinite ease;\n          animation: rotate-square-3-b1 4s infinite ease;\n}\n.b2[data-v-b90c19de] {\n  -webkit-animation: rotate-square-3-b2 4s infinite ease;\n          animation: rotate-square-3-b2 4s infinite ease;\n}\n.b3[data-v-b90c19de] {\n  -webkit-animation: rotate-square-3-b3 4s infinite ease;\n          animation: rotate-square-3-b3 4s infinite ease;\n}\n.b4[data-v-b90c19de] {\n  -webkit-animation: rotate-square-3-b4 4s infinite ease;\n          animation: rotate-square-3-b4 4s infinite ease;\n}\n@-webkit-keyframes rotate-square-3-b0 {\n0% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0);\n}\n25% {\n    -webkit-transform: rotate(-90deg);\n            transform: rotate(-90deg);\n}\n50% {\n    -webkit-transform: rotate(-180deg);\n            transform: rotate(-180deg);\n}\n75% {\n    -webkit-transform: rotate(-270deg);\n            transform: rotate(-270deg);\n}\n100% {\n    -webkit-transform: rotate(-360deg);\n            transform: rotate(-360deg);\n}\n}\n@keyframes rotate-square-3-b0 {\n0% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0);\n}\n25% {\n    -webkit-transform: rotate(-90deg);\n            transform: rotate(-90deg);\n}\n50% {\n    -webkit-transform: rotate(-180deg);\n            transform: rotate(-180deg);\n}\n75% {\n    -webkit-transform: rotate(-270deg);\n            transform: rotate(-270deg);\n}\n100% {\n    -webkit-transform: rotate(-360deg);\n            transform: rotate(-360deg);\n}\n}\n@-webkit-keyframes rotate-square-3-b1 {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(0, 355px);\n            transform: translate(0, 355px);\n}\n50% {\n    -webkit-transform: translate(355px, 355px);\n            transform: translate(355px, 355px);\n}\n75% {\n    -webkit-transform: translate(355px, 0);\n            transform: translate(355px, 0);\n}\n100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n}\n@keyframes rotate-square-3-b1 {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(0, 355px);\n            transform: translate(0, 355px);\n}\n50% {\n    -webkit-transform: translate(355px, 355px);\n            transform: translate(355px, 355px);\n}\n75% {\n    -webkit-transform: translate(355px, 0);\n            transform: translate(355px, 0);\n}\n100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n}\n@-webkit-keyframes rotate-square-3-b2 {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(-355px, 0);\n            transform: translate(-355px, 0);\n}\n50% {\n    -webkit-transform: translate(-355px, 355px);\n            transform: translate(-355px, 355px);\n}\n75% {\n    -webkit-transform: translate(0, 355px);\n            transform: translate(0, 355px);\n}\n100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n}\n@keyframes rotate-square-3-b2 {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(-355px, 0);\n            transform: translate(-355px, 0);\n}\n50% {\n    -webkit-transform: translate(-355px, 355px);\n            transform: translate(-355px, 355px);\n}\n75% {\n    -webkit-transform: translate(0, 355px);\n            transform: translate(0, 355px);\n}\n100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n}\n@-webkit-keyframes rotate-square-3-b3 {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(0, -355px);\n            transform: translate(0, -355px);\n}\n50% {\n    -webkit-transform: translate(-355px, -355px);\n            transform: translate(-355px, -355px);\n}\n75% {\n    -webkit-transform: translate(-355px, 0);\n            transform: translate(-355px, 0);\n}\n100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n}\n@keyframes rotate-square-3-b3 {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(0, -355px);\n            transform: translate(0, -355px);\n}\n50% {\n    -webkit-transform: translate(-355px, -355px);\n            transform: translate(-355px, -355px);\n}\n75% {\n    -webkit-transform: translate(-355px, 0);\n            transform: translate(-355px, 0);\n}\n100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n}\n@-webkit-keyframes rotate-square-3-b4 {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(355px, 0);\n            transform: translate(355px, 0);\n}\n50% {\n    -webkit-transform: translate(355px, -355px);\n            transform: translate(355px, -355px);\n}\n75% {\n    -webkit-transform: translate(0, -355px);\n            transform: translate(0, -355px);\n}\n100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n}\n@keyframes rotate-square-3-b4 {\n0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n25% {\n    -webkit-transform: translate(355px, 0);\n            transform: translate(355px, 0);\n}\n50% {\n    -webkit-transform: translate(355px, -355px);\n            transform: translate(355px, -355px);\n}\n75% {\n    -webkit-transform: translate(0, -355px);\n            transform: translate(0, -355px);\n}\n100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n}\n}\n", ""]);

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-b92848e0] {\n  position: relative;\n}\n.spinner *[data-v-b92848e0] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner[data-v-b92848e0]:before {\n    content: '';\n    width: 100%;\n    height: 20%;\n    min-width: 5px;\n    background: #000;\n    opacity: 0.1;\n    position: absolute;\n    bottom: 0%;\n    left: 0;\n    border-radius: 50%;\n    -webkit-animation: rotate-square-2-shadow .5s linear infinite;\n            animation: rotate-square-2-shadow .5s linear infinite;\n}\n.spinner[data-v-b92848e0]:after {\n    content: '';\n    width: 100%;\n    height: 100%;\n    background: #41b883;\n    -webkit-animation: rotate-square-2-animate .5s linear infinite;\n            animation: rotate-square-2-animate .5s linear infinite;\n    position: absolute;\n    bottom: 40%;\n    left: 0;\n    border-radius: 3px;\n}\n@-webkit-keyframes rotate-square-2-animate {\n17% {\n    border-bottom-right-radius: 3px;\n}\n25% {\n    -webkit-transform: translateY(20%) rotate(22.5deg);\n            transform: translateY(20%) rotate(22.5deg);\n}\n50% {\n    -webkit-transform: translateY(40%) scale(1, 0.9) rotate(45deg);\n            transform: translateY(40%) scale(1, 0.9) rotate(45deg);\n    border-bottom-right-radius: 50%;\n}\n75% {\n    -webkit-transform: translateY(20%) rotate(67.5deg);\n            transform: translateY(20%) rotate(67.5deg);\n}\n100% {\n    -webkit-transform: translateY(0) rotate(90deg);\n            transform: translateY(0) rotate(90deg);\n}\n}\n@keyframes rotate-square-2-animate {\n17% {\n    border-bottom-right-radius: 3px;\n}\n25% {\n    -webkit-transform: translateY(20%) rotate(22.5deg);\n            transform: translateY(20%) rotate(22.5deg);\n}\n50% {\n    -webkit-transform: translateY(40%) scale(1, 0.9) rotate(45deg);\n            transform: translateY(40%) scale(1, 0.9) rotate(45deg);\n    border-bottom-right-radius: 50%;\n}\n75% {\n    -webkit-transform: translateY(20%) rotate(67.5deg);\n            transform: translateY(20%) rotate(67.5deg);\n}\n100% {\n    -webkit-transform: translateY(0) rotate(90deg);\n            transform: translateY(0) rotate(90deg);\n}\n}\n@-webkit-keyframes rotate-square-2-shadow {\n0%, 100% {\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n}\n50% {\n    -webkit-transform: scale(1.2, 1);\n            transform: scale(1.2, 1);\n}\n}\n@keyframes rotate-square-2-shadow {\n0%, 100% {\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n}\n50% {\n    -webkit-transform: scale(1.2, 1);\n            transform: scale(1.2, 1);\n}\n}\n", ""]);

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-bf9ff4ec] {\n  position: relative;\n}\n.spinner *[data-v-bf9ff4ec] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner .diamond[data-v-bf9ff4ec] {\n    position: absolute;\n    left: 0;\n    top: 0;\n    border-radius: 2px;\n    background: #41b883;\n    -webkit-transform: translateX(-50%) rotate(45deg) scale(0);\n            transform: translateX(-50%) rotate(45deg) scale(0);\n    -webkit-animation: diamonds 1500ms linear infinite;\n            animation: diamonds 1500ms linear infinite;\n}\n.spinner .diamond[data-v-bf9ff4ec]:nth-child(1) {\n      -webkit-animation-delay: -1000ms;\n              animation-delay: -1000ms;\n}\n.spinner .diamond[data-v-bf9ff4ec]:nth-child(2) {\n      -webkit-animation-delay: -2000ms;\n              animation-delay: -2000ms;\n}\n.spinner .diamond[data-v-bf9ff4ec]:nth-child(3) {\n      -webkit-animation-delay: -3000ms;\n              animation-delay: -3000ms;\n}\n.spinner .diamond[data-v-bf9ff4ec]:nth-child(4) {\n      -webkit-animation-delay: -4000ms;\n              animation-delay: -4000ms;\n}\n@-webkit-keyframes diamonds {\n50% {\n    left: 50%;\n    -webkit-transform: translateX(-50%) rotate(45deg) scale(1);\n            transform: translateX(-50%) rotate(45deg) scale(1);\n}\n100% {\n    left: 100%;\n    -webkit-transform: translateX(-50%) rotate(45deg) scale(0);\n            transform: translateX(-50%) rotate(45deg) scale(0);\n}\n}\n@keyframes diamonds {\n50% {\n    left: 50%;\n    -webkit-transform: translateX(-50%) rotate(45deg) scale(1);\n            transform: translateX(-50%) rotate(45deg) scale(1);\n}\n100% {\n    left: 100%;\n    -webkit-transform: translateX(-50%) rotate(45deg) scale(0);\n            transform: translateX(-50%) rotate(45deg) scale(0);\n}\n}\n", ""]);

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-d460bfec] {\n  -webkit-animation: circle-rotator 1.4s linear infinite;\n          animation: circle-rotator 1.4s linear infinite;\n}\n.spinner *[data-v-d460bfec] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n@-webkit-keyframes circle-rotator {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg);\n}\n}\n@keyframes circle-rotator {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg);\n}\n}\n.path[data-v-d460bfec] {\n  stroke-dasharray: 187;\n  stroke-dashoffset: 0;\n  -webkit-transform-origin: center;\n          transform-origin: center;\n  -webkit-animation: circle-dash 1.4s ease-in-out infinite, circle-colors 5.6s ease-in-out infinite;\n          animation: circle-dash 1.4s ease-in-out infinite, circle-colors 5.6s ease-in-out infinite;\n}\n@-webkit-keyframes circle-colors {\n0% {\n    stroke: #35495e;\n}\n25% {\n    stroke: #DE3E35;\n}\n50% {\n    stroke: #F7C223;\n}\n75% {\n    stroke: #41b883;\n}\n100% {\n    stroke: #35495e;\n}\n}\n@keyframes circle-colors {\n0% {\n    stroke: #35495e;\n}\n25% {\n    stroke: #DE3E35;\n}\n50% {\n    stroke: #F7C223;\n}\n75% {\n    stroke: #41b883;\n}\n100% {\n    stroke: #35495e;\n}\n}\n@-webkit-keyframes circle-dash {\n0% {\n    stroke-dashoffset: 187;\n}\n50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg);\n}\n100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg);\n}\n}\n@keyframes circle-dash {\n0% {\n    stroke-dashoffset: 187;\n}\n50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg);\n}\n100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg);\n}\n}\n", ""]);

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-d6f79522] {\n  -webkit-animation: cube-shadow-spinner 1.8s cubic-bezier(0.75, 0, 0.5, 1) infinite;\n          animation: cube-shadow-spinner 1.8s cubic-bezier(0.75, 0, 0.5, 1) infinite;\n}\n@-webkit-keyframes cube-shadow-spinner {\n50% {\n    border-radius: 50%;\n    -webkit-transform: scale(0.5) rotate(360deg);\n            transform: scale(0.5) rotate(360deg);\n}\n100% {\n    -webkit-transform: scale(1) rotate(720deg);\n            transform: scale(1) rotate(720deg);\n}\n}\n@keyframes cube-shadow-spinner {\n50% {\n    border-radius: 50%;\n    -webkit-transform: scale(0.5) rotate(360deg);\n            transform: scale(0.5) rotate(360deg);\n}\n100% {\n    -webkit-transform: scale(1) rotate(720deg);\n            transform: scale(1) rotate(720deg);\n}\n}\n", ""]);

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-ea2b045e] {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  border: 1px #41b883 solid;\n  border-radius: 4px;\n  position: relative;\n  background: linear-gradient(45deg, transparent 49%, #41b883 50%, #41b883 50%, transparent 51%, transparent), linear-gradient(-45deg, transparent 49%, #41b883 50%, #41b883 50%, transparent 51%, transparent);\n  background-size: 16px 16px;\n  background-position: 0% 0%;\n  -webkit-animation: spTexture 1s infinite linear;\n          animation: spTexture 1s infinite linear;\n}\n@-webkit-keyframes spTexture {\nfrom {\n    background-position: 0px 0px;\n}\nto {\n    background-position: -16px 0px;\n}\n}\n@keyframes spTexture {\nfrom {\n    background-position: 0px 0px;\n}\nto {\n    background-position: -16px 0px;\n}\n}\n", ""]);

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-ed345fdc] {\n  display: inline-block;\n  -webkit-animation: rotateplane 1.2s infinite ease-in-out;\n          animation: rotateplane 1.2s infinite ease-in-out;\n}\n@-webkit-keyframes rotateplane {\n0% {\n    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n            transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n}\n50% {\n    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n}\n100% {\n    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n}\n}\n@keyframes rotateplane {\n0% {\n    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n            transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n}\n50% {\n    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n}\n100% {\n    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n}\n}\n", ""]);

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-f1106c32] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-f1106c32] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner-inner[data-v-f1106c32] {\n  width: 120px;\n  height: 120px;\n}\n@-webkit-keyframes circle-9-loading {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n25% {\n    -webkit-transform: rotate(160deg);\n            transform: rotate(160deg);\n}\n50% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n75% {\n    -webkit-transform: rotate(160deg);\n            transform: rotate(160deg);\n}\n100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n}\n@keyframes circle-9-loading {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n25% {\n    -webkit-transform: rotate(160deg);\n            transform: rotate(160deg);\n}\n50% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n75% {\n    -webkit-transform: rotate(160deg);\n            transform: rotate(160deg);\n}\n100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n}\n}\n.loading[data-v-f1106c32] {\n  background-color: transparent;\n  border-radius: 50%;\n  margin: 5px auto;\n  -webkit-animation: circle-9-loading 5s infinite linear;\n          animation: circle-9-loading 5s infinite linear;\n}\n.spin-1[data-v-f1106c32] {\n  border: 5px solid #ddd;\n  border-top: 5px solid transparent;\n  border-left: 5px solid transparent;\n  width: 120px;\n  height: 120px;\n}\n.spin-2[data-v-f1106c32] {\n  border: 5px solid #ddd;\n  border-top: 5px solid transparent;\n  border-left: 5px solid transparent;\n  width: 100px;\n  height: 100px;\n  -webkit-animation-delay: 1s;\n          animation-delay: 1s;\n}\n.spin-3[data-v-f1106c32] {\n  border: 5px solid #ddd;\n  border-top: 5px solid transparent;\n  border-left: 5px solid transparent;\n  width: 80px;\n  height: 80px;\n  -webkit-animation-delay: 1s;\n          animation-delay: 1s;\n}\n.spin-4[data-v-f1106c32] {\n  border: 5px solid #ddd;\n  border-top: 5px solid transparent;\n  border-left: 5px solid transparent;\n  width: 60px;\n  height: 60px;\n  -webkit-animation-delay: 1s;\n          animation-delay: 1s;\n}\n.spin-5[data-v-f1106c32] {\n  border: 5px solid #ddd;\n  border-top: 5px solid transparent;\n  border-left: 5px solid transparent;\n  width: 40px;\n  height: 40px;\n  -webkit-animation-delay: 1s;\n          animation-delay: 1s;\n}\n.spin-6[data-v-f1106c32] {\n  border: 5px solid #ddd;\n  width: 20px;\n  height: 20px;\n  -webkit-animation-delay: 1s;\n          animation-delay: 1s;\n}\n", ""]);

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-f2d70eda] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  position: relative;\n}\n.spinner *[data-v-f2d70eda] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.spinner-inner[data-v-f2d70eda] {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n.spinner-inner .binding[data-v-f2d70eda] {\n  content: '';\n  width: 27px;\n  height: 4px;\n  border: 2px solid #41b883;\n  margin: 0 auto;\n}\n.spinner-inner .pad[data-v-f2d70eda] {\n  width: 27px;\n  height: 27px;\n  border: 2px solid #41b883;\n  border-top: 0;\n  padding: 4px;\n  margin: 0 auto;\n}\n.spinner-inner .line[data-v-f2d70eda] {\n  width: 15px;\n  margin-top: 4px;\n  border-top: 2px solid #41b883;\n  opacity: 0;\n  -webkit-animation: mikepad-writeline 3s infinite ease-in;\n          animation: mikepad-writeline 3s infinite ease-in;\n}\n.spinner-inner .line[data-v-f2d70eda]:first-child {\n  margin-top: 0;\n}\n.spinner-inner .line.line1[data-v-f2d70eda] {\n  -webkit-animation-delay: 0s;\n          animation-delay: 0s;\n}\n.spinner-inner .line.line2[data-v-f2d70eda] {\n  -webkit-animation-delay: 0.5s;\n          animation-delay: 0.5s;\n}\n.spinner-inner .line.line3[data-v-f2d70eda] {\n  -webkit-animation-delay: 1s;\n          animation-delay: 1s;\n}\n.spinner-inner .text[data-v-f2d70eda] {\n  text-align: center;\n  margin-top: 10px;\n  font-size: 14px;\n  color: #41b883;\n}\n@-webkit-keyframes mikepad-writeline {\n0% {\n    width: 0px;\n    opacity: 0;\n}\n33% {\n    width: 15px;\n    opacity: 1;\n}\n70% {\n    opacity: 1;\n}\n100% {\n    opacity: 0;\n}\n}\n@keyframes mikepad-writeline {\n0% {\n    width: 0px;\n    opacity: 0;\n}\n33% {\n    width: 15px;\n    opacity: 1;\n}\n70% {\n    opacity: 1;\n}\n100% {\n    opacity: 0;\n}\n}\n", ""]);

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-f7752b52] {\n  display: inline-block;\n  position: relative;\n}\n.spinner *[data-v-f7752b52] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.cube1[data-v-f7752b52], .cube2[data-v-f7752b52] {\n  width: 25%;\n  height: 25%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  -webkit-animation: sk-cubemove 1.8s ease-in-out infinite;\n          animation: sk-cubemove 1.8s ease-in-out infinite;\n}\n.cube2[data-v-f7752b52] {\n  -webkit-animation-delay: -0.9s;\n          animation-delay: -0.9s;\n}\n@-webkit-keyframes sk-cubemove {\n25% {\n    top: 0;\n    left: calc(100% - 25%);\n    -webkit-transform: rotate(-90deg) scale(0.5);\n            transform: rotate(-90deg) scale(0.5);\n}\n50% {\n    top: calc(100% - 25%);\n    left: calc(100% - 25%);\n    -webkit-transform: rotate(-179deg);\n            transform: rotate(-179deg);\n}\n50.1% {\n    top: calc(100% - 25%);\n    left: calc(100% - 25%);\n    -webkit-transform: rotate(-180deg);\n            transform: rotate(-180deg);\n}\n75% {\n    top: calc(100% - 25%);\n    left: 0;\n    -webkit-transform: rotate(-270deg) scale(0.5);\n            transform: rotate(-270deg) scale(0.5);\n}\n100% {\n    top: 0;\n    left: 0;\n    -webkit-transform: rotate(-360deg);\n            transform: rotate(-360deg);\n}\n}\n@keyframes sk-cubemove {\n25% {\n    top: 0;\n    left: calc(100% - 25%);\n    -webkit-transform: rotate(-90deg) scale(0.5);\n            transform: rotate(-90deg) scale(0.5);\n}\n50% {\n    top: calc(100% - 25%);\n    left: calc(100% - 25%);\n    -webkit-transform: rotate(-179deg);\n            transform: rotate(-179deg);\n}\n50.1% {\n    top: calc(100% - 25%);\n    left: calc(100% - 25%);\n    -webkit-transform: rotate(-180deg);\n            transform: rotate(-180deg);\n}\n75% {\n    top: calc(100% - 25%);\n    left: 0;\n    -webkit-transform: rotate(-270deg) scale(0.5);\n            transform: rotate(-270deg) scale(0.5);\n}\n100% {\n    top: 0;\n    left: 0;\n    -webkit-transform: rotate(-360deg);\n            transform: rotate(-360deg);\n}\n}\n", ""]);

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n.spinner[data-v-ffd49aa4] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spinner *[data-v-ffd49aa4] {\n    line-height: 0;\n    box-sizing: border-box;\n}\n.hourglass[data-v-ffd49aa4] {\n  display: block;\n  background: #fff;\n  width: 32px;\n  height: 64px;\n  box-shadow: inset #fff 0 0 0 0, inset #41b883 0 32px 0 0, inset #fff 0 0 64px 0;\n  -webkit-animation: hourglass 1s linear infinite;\n          animation: hourglass 1s linear infinite;\n}\n.outer[data-v-ffd49aa4] {\n  fill: #41b883;\n}\n.middle[data-v-ffd49aa4] {\n  fill: #fff;\n}\n@-webkit-keyframes hourglass {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    box-shadow: inset #fff 0 0 0 0, inset #41b883 0 32px 0 0, inset #fff 0 64px 0 0, inset #41b883 0 64px 0 0;\n}\n80% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    box-shadow: inset #fff 0 32px 0 0, inset #41b883 0 32px 0 0, inset #fff 0 32px 0 0, inset #41b883 0 64px 0 0;\n}\n100% {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n    box-shadow: inset #fff 0 32px 0 0, inset #41b883 0 32px 0 0, inset #fff 0 32px 0 0, inset #41b883 0 64px 0 0;\n}\n}\n@keyframes hourglass {\n0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    box-shadow: inset #fff 0 0 0 0, inset #41b883 0 32px 0 0, inset #fff 0 64px 0 0, inset #41b883 0 64px 0 0;\n}\n80% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    box-shadow: inset #fff 0 32px 0 0, inset #41b883 0 32px 0 0, inset #fff 0 32px 0 0, inset #41b883 0 64px 0 0;\n}\n100% {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n    box-shadow: inset #fff 0 32px 0 0, inset #41b883 0 32px 0 0, inset #fff 0 32px 0 0, inset #41b883 0 64px 0 0;\n}\n}\n", ""]);

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16), __webpack_require__(4)))

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(126);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(258)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(216),
  /* scopeId */
  "data-v-d460bfec",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Circle.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Circle.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d460bfec", Component.options)
  } else {
    hotAPI.reload("data-v-d460bfec", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(245)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(200),
  /* scopeId */
  "data-v-618bea29",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Circle10.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Circle10.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-618bea29", Component.options)
  } else {
    hotAPI.reload("data-v-618bea29", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(246)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(201),
  /* scopeId */
  "data-v-619a01aa",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Circle11.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Circle11.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-619a01aa", Component.options)
  } else {
    hotAPI.reload("data-v-619a01aa", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(231)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(39),
  /* template */
  __webpack_require__(182),
  /* scopeId */
  "data-v-243c0a98",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Circle2.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Circle2.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-243c0a98", Component.options)
  } else {
    hotAPI.reload("data-v-243c0a98", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(232)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(40),
  /* template */
  __webpack_require__(183),
  /* scopeId */
  "data-v-244a2219",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Circle3.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Circle3.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-244a2219", Component.options)
  } else {
    hotAPI.reload("data-v-244a2219", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(233)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(41),
  /* template */
  __webpack_require__(184),
  /* scopeId */
  "data-v-2458399a",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Circle4.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Circle4.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2458399a", Component.options)
  } else {
    hotAPI.reload("data-v-2458399a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(234)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(42),
  /* template */
  __webpack_require__(185),
  /* scopeId */
  "data-v-2466511b",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Circle5.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Circle5.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2466511b", Component.options)
  } else {
    hotAPI.reload("data-v-2466511b", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(235)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(43),
  /* template */
  __webpack_require__(186),
  /* scopeId */
  "data-v-2474689c",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Circle6.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Circle6.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2474689c", Component.options)
  } else {
    hotAPI.reload("data-v-2474689c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(236)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(44),
  /* template */
  __webpack_require__(187),
  /* scopeId */
  "data-v-2482801d",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Circle7.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Circle7.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2482801d", Component.options)
  } else {
    hotAPI.reload("data-v-2482801d", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(237)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(45),
  /* template */
  __webpack_require__(188),
  /* scopeId */
  "data-v-2490979e",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Circle8.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Circle8.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2490979e", Component.options)
  } else {
    hotAPI.reload("data-v-2490979e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(238)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(46),
  /* template */
  __webpack_require__(189),
  /* scopeId */
  "data-v-249eaf1f",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Circle9.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Circle9.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-249eaf1f", Component.options)
  } else {
    hotAPI.reload("data-v-249eaf1f", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(259)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(47),
  /* template */
  __webpack_require__(217),
  /* scopeId */
  "data-v-d6f79522",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/CubeShadow.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CubeShadow.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d6f79522", Component.options)
  } else {
    hotAPI.reload("data-v-d6f79522", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(257)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(48),
  /* template */
  __webpack_require__(215),
  /* scopeId */
  "data-v-bf9ff4ec",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Diamond.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Diamond.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bf9ff4ec", Component.options)
  } else {
    hotAPI.reload("data-v-bf9ff4ec", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(226)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(49),
  /* template */
  __webpack_require__(176),
  /* scopeId */
  "data-v-0a237a1a",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/DoubleBounce.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DoubleBounce.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a237a1a", Component.options)
  } else {
    hotAPI.reload("data-v-0a237a1a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(241)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(50),
  /* template */
  __webpack_require__(195),
  /* scopeId */
  "data-v-56a1aba2",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Gauge.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Gauge.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56a1aba2", Component.options)
  } else {
    hotAPI.reload("data-v-56a1aba2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(252)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(51),
  /* template */
  __webpack_require__(209),
  /* scopeId */
  "data-v-7c8564f3",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Google.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Google.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7c8564f3", Component.options)
  } else {
    hotAPI.reload("data-v-7c8564f3", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(230)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(52),
  /* template */
  __webpack_require__(181),
  /* scopeId */
  "data-v-1d765754",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Hexagon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Hexagon.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d765754", Component.options)
  } else {
    hotAPI.reload("data-v-1d765754", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(265)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(53),
  /* template */
  __webpack_require__(223),
  /* scopeId */
  "data-v-ffd49aa4",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/HourGlass.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] HourGlass.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ffd49aa4", Component.options)
  } else {
    hotAPI.reload("data-v-ffd49aa4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(247)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(202),
  /* scopeId */
  "data-v-62d141f0",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Jawn.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Jawn.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-62d141f0", Component.options)
  } else {
    hotAPI.reload("data-v-62d141f0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(242)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(196),
  /* scopeId */
  "data-v-57d159d6",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Jumper.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Jumper.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57d159d6", Component.options)
  } else {
    hotAPI.reload("data-v-57d159d6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(229)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(56),
  /* template */
  __webpack_require__(180),
  /* scopeId */
  "data-v-18944e35",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/LetterCube.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] LetterCube.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18944e35", Component.options)
  } else {
    hotAPI.reload("data-v-18944e35", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(263)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(57),
  /* template */
  __webpack_require__(221),
  /* scopeId */
  "data-v-f2d70eda",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Mikepad.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Mikepad.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f2d70eda", Component.options)
  } else {
    hotAPI.reload("data-v-f2d70eda", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(239)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(58),
  /* template */
  __webpack_require__(191),
  /* scopeId */
  "data-v-2d210fdc",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Origami.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Origami.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d210fdc", Component.options)
  } else {
    hotAPI.reload("data-v-2d210fdc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(225)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(59),
  /* template */
  __webpack_require__(175),
  /* scopeId */
  "data-v-083809c7",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Pencil.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Pencil.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-083809c7", Component.options)
  } else {
    hotAPI.reload("data-v-083809c7", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(248)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(60),
  /* template */
  __webpack_require__(203),
  /* scopeId */
  "data-v-64f95a44",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/PingPong.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PingPong.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-64f95a44", Component.options)
  } else {
    hotAPI.reload("data-v-64f95a44", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(250)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(61),
  /* template */
  __webpack_require__(206),
  /* scopeId */
  "data-v-6bb94a12",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Plane.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Plane.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6bb94a12", Component.options)
  } else {
    hotAPI.reload("data-v-6bb94a12", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(261)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(62),
  /* template */
  __webpack_require__(219),
  /* scopeId */
  "data-v-ed345fdc",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/RotateSquare.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] RotateSquare.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ed345fdc", Component.options)
  } else {
    hotAPI.reload("data-v-ed345fdc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(256)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(63),
  /* template */
  __webpack_require__(214),
  /* scopeId */
  "data-v-b92848e0",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/RotateSquare2.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] RotateSquare2.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b92848e0", Component.options)
  } else {
    hotAPI.reload("data-v-b92848e0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(255)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(64),
  /* template */
  __webpack_require__(213),
  /* scopeId */
  "data-v-b90c19de",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/RotateSquare3.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] RotateSquare3.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b90c19de", Component.options)
  } else {
    hotAPI.reload("data-v-b90c19de", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(254)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(65),
  /* template */
  __webpack_require__(212),
  /* scopeId */
  "data-v-b8efeadc",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/RotateSquare4.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] RotateSquare4.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b8efeadc", Component.options)
  } else {
    hotAPI.reload("data-v-b8efeadc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(253)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(66),
  /* template */
  __webpack_require__(211),
  /* scopeId */
  "data-v-b8d3bbda",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/RotateSquare5.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] RotateSquare5.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b8d3bbda", Component.options)
  } else {
    hotAPI.reload("data-v-b8d3bbda", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(251)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(67),
  /* template */
  __webpack_require__(207),
  /* scopeId */
  "data-v-71a7ea5e",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/ScaleOut.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ScaleOut.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71a7ea5e", Component.options)
  } else {
    hotAPI.reload("data-v-71a7ea5e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(240)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(68),
  /* template */
  __webpack_require__(194),
  /* scopeId */
  "data-v-4c3a0da6",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Socket.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Socket.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c3a0da6", Component.options)
  } else {
    hotAPI.reload("data-v-4c3a0da6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(227)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(69),
  /* template */
  __webpack_require__(177),
  /* scopeId */
  "data-v-0c8e89e0",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/SpinLine.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SpinLine.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0c8e89e0", Component.options)
  } else {
    hotAPI.reload("data-v-0c8e89e0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(243)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(70),
  /* template */
  __webpack_require__(197),
  /* scopeId */
  "data-v-5b7872bd",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/SquareGrid.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SquareGrid.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5b7872bd", Component.options)
  } else {
    hotAPI.reload("data-v-5b7872bd", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(249)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(71),
  /* template */
  __webpack_require__(205),
  /* scopeId */
  "data-v-68328abb",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Stretch.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Stretch.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68328abb", Component.options)
  } else {
    hotAPI.reload("data-v-68328abb", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(260)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(72),
  /* template */
  __webpack_require__(218),
  /* scopeId */
  "data-v-ea2b045e",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Texture.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Texture.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ea2b045e", Component.options)
  } else {
    hotAPI.reload("data-v-ea2b045e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(244)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(73),
  /* template */
  __webpack_require__(198),
  /* scopeId */
  "data-v-5d17b9be",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/ThreeDots.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ThreeDots.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d17b9be", Component.options)
  } else {
    hotAPI.reload("data-v-5d17b9be", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(264)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(74),
  /* template */
  __webpack_require__(222),
  /* scopeId */
  "data-v-f7752b52",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/TwoCube.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TwoCube.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f7752b52", Component.options)
  } else {
    hotAPI.reload("data-v-f7752b52", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(228)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(75),
  /* template */
  __webpack_require__(178),
  /* scopeId */
  "data-v-12d2fa33",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/node_modules/vue-loading-spinner/src/components/Wave.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Wave.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-12d2fa33", Component.options)
  } else {
    hotAPI.reload("data-v-12d2fa33", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(77),
  /* template */
  __webpack_require__(204),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/resources/assets/js/components/Container.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Container.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-67c2336a", Component.options)
  } else {
    hotAPI.reload("data-v-67c2336a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(78),
  /* template */
  __webpack_require__(179),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/resources/assets/js/components/Personography.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Personography.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-176c83ef", Component.options)
  } else {
    hotAPI.reload("data-v-176c83ef", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(79),
  /* template */
  __webpack_require__(208),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/resources/assets/js/components/headerNav.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] headerNav.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78841ec0", Component.options)
  } else {
    hotAPI.reload("data-v-78841ec0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(262)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(80),
  /* template */
  __webpack_require__(220),
  /* scopeId */
  "data-v-f1106c32",
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/resources/assets/js/components/personIndex.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] personIndex.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f1106c32", Component.options)
  } else {
    hotAPI.reload("data-v-f1106c32", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(81),
  /* template */
  __webpack_require__(192),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/resources/assets/js/components/vueContent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] vueContent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3681eb99", Component.options)
  } else {
    hotAPI.reload("data-v-3681eb99", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  null,
  /* template */
  __webpack_require__(190),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/resources/assets/js/components/vueFooter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] vueFooter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2590f8ab", Component.options)
  } else {
    hotAPI.reload("data-v-2590f8ab", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(82),
  /* template */
  __webpack_require__(193),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/var/www/dsl-print-culture/resources/assets/js/components/vueHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] vueHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-46c35c9d", Component.options)
  } else {
    hotAPI.reload("data-v-46c35c9d", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    staticClass: "spinner spinner--pencil",
    style: (_vm.styles),
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 677.34762 182.15429"
    }
  }, [_c('g', [_c('path', {
    staticClass: "body-pencil",
    attrs: {
      "d": "M128.273 0l-3.9 2.77L0 91.078l128.273 91.076 549.075-.006V.008L128.273 0zm20.852 30l498.223.006V152.15l-498.223.007V30zm-25 9.74v102.678l-49.033-34.813-.578-32.64 49.61-35.225z"
    }
  }), _vm._v(" "), _c('path', {
    staticClass: "line",
    attrs: {
      "d": "M134.482 157.147v25l518.57.008.002-25-518.572-.008z"
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-083809c7", module.exports)
  }
}

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--double-bounce",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "double-bounce1",
    style: (_vm.bounceStyle)
  }), _vm._v(" "), _c('div', {
    staticClass: "double-bounce2",
    style: (_vm.bounceStyle)
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0a237a1a", module.exports)
  }
}

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--spin-line",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.lineStyles)
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0c8e89e0", module.exports)
  }
}

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--wave",
    style: (_vm.styles)
  }, [_c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div')])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-12d2fa33", module.exports)
  }
}

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "personography"
  }, [_c('div', {
    staticClass: "personographyAbout"
  }, [_vm._v("Lorem ipsum")]), _vm._v(" "), _c('personFilter'), _vm._v(" "), _c('personIndex')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-176c83ef", module.exports)
  }
}

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--socker",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  }, [_vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "cube panelLoad"
  }, [_c('div', {
    staticClass: "cube-face cube-face-front"
  }, [_vm._v("L")]), _vm._v(" "), _c('div', {
    staticClass: "cube-face cube-face-back"
  }, [_vm._v("O")]), _vm._v(" "), _c('div', {
    staticClass: "cube-face cube-face-left"
  }, [_vm._v("A")]), _vm._v(" "), _c('div', {
    staticClass: "cube-face cube-face-right"
  }, [_vm._v("D")]), _vm._v(" "), _c('div', {
    staticClass: "cube-face cube-face-bottom"
  }, [_vm._v("I")]), _vm._v(" "), _c('div', {
    staticClass: "cube-face cube-face-top"
  }, [_vm._v("N'")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-18944e35", module.exports)
  }
}

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--hexagon",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  }, [_vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "hexagon-container"
  }, [_c('li', {
    staticClass: "hexagon hex_1"
  }), _vm._v(" "), _c('li', {
    staticClass: "hexagon hex_2"
  }), _vm._v(" "), _c('li', {
    staticClass: "hexagon hex_3"
  }), _vm._v(" "), _c('li', {
    staticClass: "hexagon hex_4"
  }), _vm._v(" "), _c('li', {
    staticClass: "hexagon hex_5"
  }), _vm._v(" "), _c('li', {
    staticClass: "hexagon hex_6"
  }), _vm._v(" "), _c('li', {
    staticClass: "hexagon hex_7"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1d765754", module.exports)
  }
}

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--circle-2",
    style: (_vm.styles)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-243c0a98", module.exports)
  }
}

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--circle-3",
    style: (_vm.styles)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-244a2219", module.exports)
  }
}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--circle-4",
    style: (_vm.styles)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2458399a", module.exports)
  }
}

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--circle-5",
    style: (_vm.styles)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2466511b", module.exports)
  }
}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    staticClass: "spinner spinner--circle-6",
    style: (_vm.styles),
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 100 100"
    }
  }, [_c('g', {
    staticClass: "anim-0"
  }, [_c('circle', {
    attrs: {
      "cx": "50",
      "cy": "50",
      "r": "50",
      "fill": _vm.background
    }
  })]), _vm._v(" "), _c('g', {
    staticClass: "anim-1"
  }, [_c('circle', {
    attrs: {
      "cx": "50",
      "cy": "50",
      "r": "5",
      "fill": "white"
    }
  })]), _vm._v(" "), _c('g', {
    staticClass: "anim-2"
  }, [_c('circle', {
    attrs: {
      "cx": "75",
      "cy": "50",
      "r": "5",
      "fill": "white"
    }
  }), _vm._v(" "), _c('line', {
    attrs: {
      "x1": "25",
      "y1": "50",
      "x2": "75",
      "y2": "50",
      "stroke": "white",
      "stroke-width": "3"
    }
  })]), _vm._v(" "), _c('g', {
    staticClass: "anim-3"
  }, [_c('circle', {
    attrs: {
      "cx": "50",
      "cy": "25",
      "r": "5",
      "fill": "white"
    }
  }), _vm._v(" "), _c('line', {
    attrs: {
      "x1": "50",
      "y1": "25",
      "x2": "25",
      "y2": "75",
      "stroke": "white",
      "stroke-width": "3"
    }
  }), _vm._v(" "), _c('line', {
    attrs: {
      "x1": "50",
      "y1": "25",
      "x2": "75",
      "y2": "75",
      "stroke": "white",
      "stroke-width": "3"
    }
  })]), _vm._v(" "), _c('g', {
    staticClass: "anim-4"
  }, [_c('circle', {
    attrs: {
      "cx": "75",
      "cy": "25",
      "r": "5",
      "fill": "white"
    }
  }), _vm._v(" "), _c('line', {
    attrs: {
      "x1": "75",
      "y1": "25",
      "x2": "25",
      "y2": "25",
      "stroke": "white",
      "stroke-width": "3"
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2474689c", module.exports)
  }
}

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--circle-7",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner"
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2482801d", module.exports)
  }
}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--circle-8",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  }, [_vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ball-container"
  }, [_c('div', {
    staticClass: "contener_mixte"
  }, [_c('div', {
    staticClass: "ballcolor ball_1"
  }, [_vm._v(" ")])]), _vm._v(" "), _c('div', {
    staticClass: "contener_mixte"
  }, [_c('div', {
    staticClass: "ballcolor ball_2"
  }, [_vm._v(" ")])]), _vm._v(" "), _c('div', {
    staticClass: "contener_mixte"
  }, [_c('div', {
    staticClass: "ballcolor ball_3"
  }, [_vm._v(" ")])]), _vm._v(" "), _c('div', {
    staticClass: "contener_mixte"
  }, [_c('div', {
    staticClass: "ballcolor ball_4"
  }, [_vm._v(" ")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2490979e", module.exports)
  }
}

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--circle-9",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  }, [_vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "loading spin-1"
  }, [_c('div', {
    staticClass: "loading spin-2"
  }, [_c('div', {
    staticClass: "loading spin-3"
  }, [_c('div', {
    staticClass: "loading spin-4"
  }, [_c('div', {
    staticClass: "loading spin-5"
  }, [_c('div', {
    staticClass: "loading spin-6"
  })])])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-249eaf1f", module.exports)
  }
}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "footer"
  }, [_c('headerLogo'), _vm._v(" "), _vm._m(0)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "flex",
    attrs: {
      "id": "infoFooter"
    }
  }, [_c('div', {
    attrs: {
      "id": "creativeCommons"
    }
  }, [_vm._v("\n        This work is licensed under a "), _c('a', {
    attrs: {
      "rel": "license",
      "href": "http://creativecommons.org/licenses/by/4.0/"
    }
  }, [_vm._v("Creative Commons Attribution 4.0 International License")]), _vm._v("."), _c('br'), _vm._v("\n\n        contact the "), _c('a', {
    attrs: {
      "href": "mailto:dsl@lsu.edu",
      "target": "_blank"
    }
  }, [_vm._v("Digital Scholarship Lab")]), _vm._v(" at LSU Libraries with any questions or comments. ")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2590f8ab", module.exports)
  }
}

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner-origami",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner loading",
    style: (_vm.innerStyles)
  }, [_c('span', {
    staticClass: "slice"
  }), _vm._v(" "), _c('span', {
    staticClass: "slice"
  }), _vm._v(" "), _c('span', {
    staticClass: "slice"
  }), _vm._v(" "), _c('span', {
    staticClass: "slice"
  }), _vm._v(" "), _c('span', {
    staticClass: "slice"
  }), _vm._v(" "), _c('span', {
    staticClass: "slice"
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d210fdc", module.exports)
  }
}

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content"
  }, [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3681eb99", module.exports)
  }
}

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header"
  }, [_c('headerTitle'), _vm._v(" "), _c('headerNav'), _vm._v(" "), _c('div', {
    staticClass: "contrast",
    on: {
      "click": _vm.toggleContrast
    }
  }, [_c('div', {
    staticClass: "contrastTitle"
  }, [_vm._v("High Contrast")]), _vm._v(" "), _vm._m(0)])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "contrastSwitch"
  }, [_c('div', {
    staticClass: "contrastOff"
  }, [_vm._v("Off")]), _vm._v(" "), _c('div', {
    staticClass: "contrastOn"
  }, [_vm._v("On")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-46c35c9d", module.exports)
  }
}

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--socker",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3), _vm._v(" "), _vm._m(4), _vm._v(" "), _vm._m(5), _vm._v(" "), _vm._m(6), _vm._v(" "), _vm._m(7), _vm._v(" "), _vm._m(8), _vm._v(" "), _vm._m(9), _vm._v(" "), _vm._m(10), _vm._v(" "), _vm._m(11), _vm._v(" "), _vm._m(12), _vm._v(" "), _vm._m(13), _vm._v(" "), _vm._m(14), _vm._v(" "), _vm._m(15), _vm._v(" "), _vm._m(16), _vm._v(" "), _vm._m(17), _vm._v(" "), _vm._m(18), _vm._v(" "), _vm._m(19), _vm._v(" "), _vm._m(20), _vm._v(" "), _vm._m(21), _vm._v(" "), _vm._m(22), _vm._v(" "), _vm._m(23), _vm._v(" "), _vm._m(24), _vm._v(" "), _vm._m(25), _vm._v(" "), _vm._m(26), _vm._v(" "), _vm._m(27), _vm._v(" "), _vm._m(28), _vm._v(" "), _vm._m(29), _vm._v(" "), _vm._m(30), _vm._v(" "), _vm._m(31), _vm._v(" "), _vm._m(32), _vm._v(" "), _vm._m(33), _vm._v(" "), _vm._m(34), _vm._v(" "), _vm._m(35), _vm._v(" "), _vm._m(36)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel center-gel"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c1 r1"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c2 r1"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c3 r1"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c4 r1"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c5 r1"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c6 r1"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c7 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c8 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c9 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c10 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c11 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c12 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c13 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c14 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c15 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c16 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c17 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c18 r2"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c19 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c20 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c21 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c22 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c23 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c24 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c25 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c26 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c28 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c29 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c30 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c31 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c32 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c33 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c34 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c35 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c36 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gel c37 r3"
  }, [_c('div', {
    staticClass: "hex-brick h1"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h2"
  }), _vm._v(" "), _c('div', {
    staticClass: "hex-brick h3"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4c3a0da6", module.exports)
  }
}

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--gauge",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-56a1aba2", module.exports)
  }
}

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--jumper",
    style: (_vm.styles)
  }, [_c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div')])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-57d159d6", module.exports)
  }
}

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--square-grid",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "sk-cube sk-cube1",
    style: (_vm.cubeStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "sk-cube sk-cube2",
    style: (_vm.cubeStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "sk-cube sk-cube3",
    style: (_vm.cubeStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "sk-cube sk-cube4",
    style: (_vm.cubeStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "sk-cube sk-cube5",
    style: (_vm.cubeStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "sk-cube sk-cube6",
    style: (_vm.cubeStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "sk-cube sk-cube7",
    style: (_vm.cubeStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "sk-cube sk-cube8",
    style: (_vm.cubeStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "sk-cube sk-cube9",
    style: (_vm.cubeStyles)
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5b7872bd", module.exports)
  }
}

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "blob top",
    style: (_vm.blobStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "blob bottom",
    style: (_vm.blobStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "blob left",
    style: (_vm.blobStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "blob move-blob",
    style: (_vm.moveBlobStyles)
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5d17b9be", module.exports)
  }
}

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "abouts"
  }, [_c('div', {
    staticClass: "aboutToggle"
  }, [_c('div', {
    staticClass: "about",
    class: {
      active: this.abouts == 'about'
    },
    on: {
      "click": function($event) {
        _vm.selectMe('about')
      }
    }
  }, [_vm._v("Project")]), _vm._v(" "), _c('div', {
    staticClass: "technical",
    class: {
      active: this.abouts == 'tech'
    },
    on: {
      "click": function($event) {
        _vm.selectMe('tech')
      }
    }
  }, [_vm._v("Methodology")]), _vm._v(" "), _c('div', {
    staticClass: "credits",
    class: {
      active: this.abouts == 'credits'
    },
    on: {
      "click": function($event) {
        _vm.selectMe('credits')
      }
    }
  }, [_vm._v("Staff")])]), _vm._v(" "), _c('div', {
    staticClass: "aboutViewer"
  }, [(this.abouts == 'about') ? _c('logo') : _vm._e(), _vm._v(" "), (this.abouts == 'about') ? _c('div', {
    domProps: {
      "innerHTML": _vm._s(this.aboutText)
    }
  }) : _vm._e(), _vm._v(" "), (this.abouts == 'tech') ? _c('div', {
    domProps: {
      "innerHTML": _vm._s(this.techText)
    }
  }) : _vm._e(), _vm._v(" "), (this.abouts == 'credits') ? _c('div', [_c('creditsPersonList')], 1) : _vm._e()], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6153abac", module.exports)
  }
}

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--circle-10",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  }, [_c('div', {
    staticClass: "loader-xbox"
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-618bea29", module.exports)
  }
}

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--circle-11",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner"
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-619a01aa", module.exports)
  }
}

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--jawn"
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "jawn",
    style: (_vm.innerStyles)
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-62d141f0", module.exports)
  }
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--ping-pong",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  }, [_vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "board"
  }, [_c('div', {
    staticClass: "left"
  }), _vm._v(" "), _c('div', {
    staticClass: "right"
  }), _vm._v(" "), _c('div', {
    staticClass: "ball"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-64f95a44", module.exports)
  }
}

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.contrastString(),
    attrs: {
      "id": "container"
    }
  }, [_c('vueHeader'), _vm._v(" "), _c('vueContent'), _vm._v(" "), _c('vueFooter')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-67c2336a", module.exports)
  }
}

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--stretch",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "rect rect-1",
    style: (_vm.rectStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "rect rect-2",
    style: (_vm.rectStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "rect rect-3",
    style: (_vm.rectStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "rect rect-4",
    style: (_vm.rectStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "rect rect-5",
    style: (_vm.rectStyles)
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-68328abb", module.exports)
  }
}

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--plane",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mask",
    attrs: {
      "id": "top"
    }
  }, [_c('div', {
    staticClass: "plane"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mask",
    attrs: {
      "id": "middle"
    }
  }, [_c('div', {
    staticClass: "plane"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mask",
    attrs: {
      "id": "bottom"
    }
  }, [_c('div', {
    staticClass: "plane"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6bb94a12", module.exports)
  }
}

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--scale-out",
    style: (_vm.styles)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-71a7ea5e", module.exports)
  }
}

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "headerNav"
  }, [_c('router-link', {
    attrs: {
      "to": "/",
      "exact": "",
      "tag": "div",
      "active-class": "active"
    },
    on: {
      "click": function($event) {
        _vm.activeContentClicked('abouts')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-flask",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("About\n")]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/issues",
      "tag": "div",
      "active-class": "active"
    },
    on: {
      "click": function($event) {
        _vm.activeContentClicked('issues')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bookmark",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n        Read Issues\n")]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/authors",
      "tag": "div",
      "active-class": "active"
    },
    on: {
      "click": function($event) {
        _vm.activeContentClicked('personography')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-user-circle",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("Authors")])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-78841ec0", module.exports)
  }
}

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--google",
    style: (_vm.styles)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7c8564f3", module.exports)
  }
}

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "issue"
  }, [_c('interIssueNav'), _vm._v(" "), _c('div', {
    staticClass: "issueBody"
  }, [_c('viewerSelector'), _vm._v(" "), _c('issueHeader'), _vm._v(" "), _c('issueViewer')], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-af9600ba", module.exports)
  }
}

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--rotate-square-5",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  }, [_c('span', {
    staticClass: "load3 one"
  }), _vm._v(" "), _c('span', {
    staticClass: "load3 two"
  }), _vm._v(" "), _c('span', {
    staticClass: "load3-center"
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b8d3bbda", module.exports)
  }
}

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "spinner spinner--rotate-square4",
    style: (_vm.styles)
  }, [_c('span', {
    staticClass: "loader-inner"
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b8efeadc", module.exports)
  }
}

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    staticClass: "spinner spinner--cube",
    style: (_vm.styles),
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 500.00001 500.00001"
    }
  }, [_c('g', {
    attrs: {
      "fill": _vm.color
    }
  }, [_c('path', {
    staticClass: "b0",
    attrs: {
      "d": "M66.734 66.734v366.533h366.532V66.734H66.734zm15 15h336.532v336.533H81.734V81.734z"
    }
  }), _vm._v(" "), _c('path', {
    staticClass: "b2",
    attrs: {
      "d": "M354.16 2.5v143.34H497.5V2.5H354.16zm10 10H487.5v123.34H364.16V12.5z"
    }
  }), _vm._v(" "), _c('path', {
    staticClass: "b1",
    attrs: {
      "d": "M0 2.5v143.34h143.34V2.5H0zm10 10h123.34v123.34H10V12.5z"
    }
  }), _vm._v(" "), _c('path', {
    staticClass: "b3",
    attrs: {
      "d": "M354.16 356.66V500H497.5V356.66H354.16zm10 10H487.5V490H364.16V366.66z"
    }
  }), _vm._v(" "), _c('path', {
    staticClass: "b4",
    attrs: {
      "d": "M0 356.66V500h143.34V356.66H0zm10 10h123.34V490H10V366.66z"
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b90c19de", module.exports)
  }
}

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--rotate-square-2",
    style: (_vm.styles)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b92848e0", module.exports)
  }
}

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "spinner spinner--rotate-diamond",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "diamond",
    style: (_vm.diamondStyle)
  }), _vm._v(" "), _c('div', {
    staticClass: "diamond",
    style: (_vm.diamondStyle)
  }), _vm._v(" "), _c('div', {
    staticClass: "diamond",
    style: (_vm.diamondStyle)
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-bf9ff4ec", module.exports)
  }
}

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    staticClass: "spinner spinner--circle",
    style: (_vm.styles),
    attrs: {
      "viewBox": "0 0 66 66",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('circle', {
    staticClass: "path",
    attrs: {
      "fill": "none",
      "stroke-width": "6",
      "stroke-linecap": "round",
      "cx": "33",
      "cy": "33",
      "r": "30"
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d460bfec", module.exports)
  }
}

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--cube-shadow",
    style: (_vm.styles)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d6f79522", module.exports)
  }
}

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--texture",
    style: (_vm.styles)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ea2b045e", module.exports)
  }
}

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--rotate-square",
    style: (_vm.styles)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ed345fdc", module.exports)
  }
}

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "personIndex"
  }, [(this.loading) ? _c('circle9', {
    attrs: {
      "size": '150px'
    }
  }) : _vm._e(), _vm._v(" "), _vm._l((this.index), function(personObj) {
    return (!this.loading) ? _c('person', {
      attrs: {
        "person": personObj
      }
    }) : _vm._e()
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f1106c32", module.exports)
  }
}

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--mikepad",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  }, [_c('div', {
    staticClass: "binding"
  }), _vm._v(" "), _vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pad"
  }, [_c('div', {
    staticClass: "line line1"
  }), _vm._v(" "), _c('div', {
    staticClass: "line line2"
  }), _vm._v(" "), _c('div', {
    staticClass: "line line3"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f2d70eda", module.exports)
  }
}

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--two-cube",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "cube1",
    style: (_vm.cubeStyles)
  }), _vm._v(" "), _c('div', {
    staticClass: "cube2",
    style: (_vm.cubeStyles)
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f7752b52", module.exports)
  }
}

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner spinner--hour-glass",
    style: (_vm.styles)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.innerStyles)
  }, [_c('svg', {
    staticClass: "hourglass",
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 120 206",
      "preserveAspectRatio": "none"
    }
  }, [_c('path', {
    staticClass: "middle",
    attrs: {
      "d": "M120 0H0v206h120V0zM77.1 133.2C87.5 140.9 92 145 92 152.6V178H28v-25.4c0-7.6 4.5-11.7 14.9-19.4 6-4.5 13-9.6 17.1-17 4.1 7.4 11.1 12.6 17.1 17zM60 89.7c-4.1-7.3-11.1-12.5-17.1-17C32.5 65.1 28 61 28 53.4V28h64v25.4c0 7.6-4.5 11.7-14.9 19.4-6 4.4-13 9.6-17.1 16.9z"
    }
  }), _vm._v(" "), _c('path', {
    staticClass: "outer",
    attrs: {
      "d": "M93.7 95.3c10.5-7.7 26.3-19.4 26.3-41.9V0H0v53.4c0 22.5 15.8 34.2 26.3 41.9 3 2.2 7.9 5.8 9 7.7-1.1 1.9-6 5.5-9 7.7C15.8 118.4 0 130.1 0 152.6V206h120v-53.4c0-22.5-15.8-34.2-26.3-41.9-3-2.2-7.9-5.8-9-7.7 1.1-2 6-5.5 9-7.7zM70.6 103c0 18 35.4 21.8 35.4 49.6V192H14v-39.4c0-27.9 35.4-31.6 35.4-49.6S14 81.2 14 53.4V14h92v39.4C106 81.2 70.6 85 70.6 103z"
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ffd49aa4", module.exports)
  }
}

/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Circle_vue__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Circle_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Circle_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Circle2_vue__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Circle2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Circle2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Circle3_vue__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Circle3_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Circle3_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Circle4_vue__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Circle4_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Circle4_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Circle5_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Circle5_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Circle5_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Circle6_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Circle6_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_Circle6_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Circle7_vue__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Circle7_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_Circle7_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Circle8_vue__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Circle8_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_Circle8_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_Circle9_vue__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_Circle9_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_Circle9_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_Circle10_vue__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_Circle10_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_Circle10_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_Circle11_vue__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_Circle11_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__components_Circle11_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_CubeShadow_vue__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_CubeShadow_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_CubeShadow_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_Diamond_vue__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_Diamond_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__components_Diamond_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_DoubleBounce_vue__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_DoubleBounce_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__components_DoubleBounce_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_Gauge_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_Gauge_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__components_Gauge_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_Google_vue__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_Google_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__components_Google_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_Hexagon_vue__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_Hexagon_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__components_Hexagon_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_HourGlass_vue__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_HourGlass_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__components_HourGlass_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_Jawn_vue__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_Jawn_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__components_Jawn_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_Jumper_vue__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_Jumper_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__components_Jumper_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_LetterCube_vue__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_LetterCube_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__components_LetterCube_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_Mikepad_vue__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_Mikepad_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__components_Mikepad_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_Origami_vue__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_Origami_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22__components_Origami_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_Pencil_vue__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_Pencil_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23__components_Pencil_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_PingPong_vue__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_PingPong_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24__components_PingPong_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_Plane_vue__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_Plane_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25__components_Plane_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_RotateSquare_vue__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_RotateSquare_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26__components_RotateSquare_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_RotateSquare2_vue__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_RotateSquare2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27__components_RotateSquare2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_RotateSquare3_vue__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_RotateSquare3_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28__components_RotateSquare3_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_RotateSquare4_vue__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_RotateSquare4_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29__components_RotateSquare4_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_RotateSquare5_vue__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_RotateSquare5_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_30__components_RotateSquare5_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_ScaleOut_vue__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_ScaleOut_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_31__components_ScaleOut_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_Socket_vue__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_Socket_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_32__components_Socket_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_SpinLine_vue__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_SpinLine_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_33__components_SpinLine_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_SquareGrid_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_SquareGrid_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_34__components_SquareGrid_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__components_Stretch_vue__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__components_Stretch_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_35__components_Stretch_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__components_Texture_vue__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__components_Texture_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_36__components_Texture_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__components_ThreeDots_vue__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__components_ThreeDots_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_37__components_ThreeDots_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_TwoCube_vue__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_TwoCube_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_38__components_TwoCube_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_Wave_vue__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_Wave_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_39__components_Wave_vue__);
/* unused harmony reexport Circle */
/* unused harmony reexport Circle2 */
/* unused harmony reexport Circle3 */
/* unused harmony reexport Circle4 */
/* unused harmony reexport Circle5 */
/* unused harmony reexport Circle6 */
/* unused harmony reexport Circle7 */
/* unused harmony reexport Circle8 */
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_8__components_Circle9_vue___default.a; });
/* unused harmony reexport Circle10 */
/* unused harmony reexport Circle11 */
/* unused harmony reexport CubeShadow */
/* unused harmony reexport Diamond */
/* unused harmony reexport DoubleBounce */
/* unused harmony reexport Gauge */
/* unused harmony reexport Google */
/* unused harmony reexport Hexagon */
/* unused harmony reexport HourGlass */
/* unused harmony reexport Jawn */
/* unused harmony reexport Jumper */
/* unused harmony reexport LetterCube */
/* unused harmony reexport MikePad */
/* unused harmony reexport Origami */
/* unused harmony reexport Pencil */
/* unused harmony reexport PingPong */
/* unused harmony reexport Plane */
/* unused harmony reexport RotateSquare */
/* unused harmony reexport RotateSquare2 */
/* unused harmony reexport RotateSquare3 */
/* unused harmony reexport RotateSquare4 */
/* unused harmony reexport RotateSquare5 */
/* unused harmony reexport ScaleOut */
/* unused harmony reexport Socket */
/* unused harmony reexport SpinLine */
/* unused harmony reexport SquareGrid */
/* unused harmony reexport Stretch */
/* unused harmony reexport Texture */
/* unused harmony reexport ThreeDots */
/* unused harmony reexport TwoCube */
/* unused harmony reexport Wave */












































/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(85);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("62b718e2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-083809c7&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Pencil.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-083809c7&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Pencil.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(86);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6810b9d8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-0a237a1a&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./DoubleBounce.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-0a237a1a&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./DoubleBounce.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(87);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("75a16b57", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-0c8e89e0&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./SpinLine.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-0c8e89e0&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./SpinLine.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(88);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("23bc0ed4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-12d2fa33&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Wave.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-12d2fa33&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Wave.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(89);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("65fb5769", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-18944e35&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./LetterCube.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-18944e35&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./LetterCube.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(90);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("34443a0e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-1d765754&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Hexagon.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-1d765754&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Hexagon.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(91);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("63c5f78a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-243c0a98&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle2.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-243c0a98&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle2.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(92);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("59266dcf", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-244a2219&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle3.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-244a2219&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle3.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("8771a9ac", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2458399a&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle4.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2458399a&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle4.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(94);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("63f891b6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2466511b&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle5.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2466511b&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle5.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(95);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("25820900", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2474689c&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle6.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2474689c&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle6.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(96);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("373e94fb", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2482801d&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle7.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2482801d&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle7.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(97);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e2863254", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2490979e&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle8.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2490979e&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle8.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(98);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6e6a2b7a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-249eaf1f&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle9.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-249eaf1f&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle9.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(99);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("377e6af6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2d210fdc&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Origami.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-2d210fdc&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Origami.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(100);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("607e5280", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-4c3a0da6&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Socket.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-4c3a0da6&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Socket.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(101);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("8ea00576", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-56a1aba2&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Gauge.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-56a1aba2&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Gauge.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(102);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e4283e0e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-57d159d6&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Jumper.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-57d159d6&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Jumper.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(103);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0fc78bab", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-5b7872bd&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./SquareGrid.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-5b7872bd&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./SquareGrid.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(104);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("b484697c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-5d17b9be&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./ThreeDots.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-5d17b9be&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./ThreeDots.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(105);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6790be22", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-618bea29&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle10.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-618bea29&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle10.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(106);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("118cbf25", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-619a01aa&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle11.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-619a01aa&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle11.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(107);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("282f83db", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-62d141f0&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Jawn.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-62d141f0&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Jawn.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(108);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2054baf2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-64f95a44&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./PingPong.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-64f95a44&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./PingPong.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(109);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("29eed160", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-68328abb&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Stretch.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-68328abb&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Stretch.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(110);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0d572fb0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-6bb94a12&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Plane.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-6bb94a12&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Plane.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(111);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("67c79ed9", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-71a7ea5e&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./ScaleOut.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-71a7ea5e&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./ScaleOut.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(112);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4a6d038c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-7c8564f3&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Google.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-7c8564f3&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Google.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(113);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("53002c20", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-b8d3bbda&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./RotateSquare5.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-b8d3bbda&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./RotateSquare5.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(114);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5275f031", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-b8efeadc&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./RotateSquare4.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-b8efeadc&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./RotateSquare4.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(115);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5c78459a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-b90c19de&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./RotateSquare3.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-b90c19de&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./RotateSquare3.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(116);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("056c85ad", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-b92848e0&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./RotateSquare2.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-b92848e0&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./RotateSquare2.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(117);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("a7721238", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-bf9ff4ec&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Diamond.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-bf9ff4ec&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Diamond.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(118);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("42b9c0bd", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-d460bfec&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-d460bfec&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Circle.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("fb785d76", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-d6f79522&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./CubeShadow.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-d6f79522&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./CubeShadow.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(120);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("44b7d9a0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-ea2b045e&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Texture.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-ea2b045e&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Texture.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(121);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("244c2fde", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-ed345fdc&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./RotateSquare.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-ed345fdc&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./RotateSquare.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(122);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("77885e7e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f1106c32&scoped=true!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./personIndex.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f1106c32&scoped=true!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./personIndex.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(123);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6e4e8d0f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-f2d70eda&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Mikepad.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-f2d70eda&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./Mikepad.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(124);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ca483e94", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-f7752b52&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./TwoCube.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-f7752b52&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./TwoCube.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(125);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("325fc24e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-ffd49aa4&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./HourGlass.vue", function() {
     var newContent = require("!!../../../css-loader/index.js!../../../vue-loader/lib/style-rewriter.js?id=data-v-ffd49aa4&scoped=true!../../node_modules/sass-loader/lib/loader.js!../../../vue-loader/lib/selector.js?type=styles&index=0!./HourGlass.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 266 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
module.exports = __webpack_require__(18);


/***/ })
/******/ ]);