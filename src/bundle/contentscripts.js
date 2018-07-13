webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	__webpack_require__(5);
	
	console.log("=== simpclip contentscripts load ===");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/stylus-loader/index.js!./main.styl", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/stylus-loader/index.js!./main.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\n * Golbal style\n */\n.simpclip-font {\n  font: 300 16px/1.8 -apple-system, PingFang SC, Microsoft Yahei, Lantinghei SC, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;\n  color: #333;\n  text-rendering: optimizelegibility;\n  -webkit-text-size-adjust: 100%;\n  -webkit-font-smoothing: antialiased;\n}\n", ""]);
	
	// exports


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!./notify.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!./notify.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "\n/*\n* Notify Group\n*/\nnotify-gp {\n    font: 300 14px -apple-system, PingFang SC, Microsoft Yahei, Lantinghei SC, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;\n    text-rendering: optimizelegibility;\n    -webkit-text-size-adjust: 100%;\n    -webkit-font-smoothing: antialiased;\n\n    display: -webkit-flex;\n    flex-flow: column nowrap;\n    align-items: flex-end;\n\n    position: fixed;\n\n    top: 0;\n    right: 0;\n\n    margin: 0 15px 0 0;\n    padding: 0;\n\n    text-transform: none;\n\n    pointer-events: none;\n}\n\nnotify-gp notify {\n    display: -webkit-flex;\n    align-items: center;\n\n    margin: 0;\n    margin-top: 15px;\n    padding: 14px 24px;\n\n    min-width: 288px;\n    max-width: 568px;\n\n    height: 48px;\n    max-height: 48px;\n\n    color: rgba(255, 255, 255, .7);\n    background-color: rgba(50, 50, 50, 1);\n\n    box-sizing: border-box;\n    border-radius: 4px;\n    pointer-events: auto;\n    user-select: none;\n\n    opacity: 0;\n    transform: scaleY(0);\n    transform-origin: left top 0px;\n    transition: transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n\n    box-shadow: 0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149);\n}\n\nnotify-gp notify-title {\n    font-size: 13px;\n    font-weight: bold;\n}\n\nnotify-gp notify-content {\n    display: block;\n\n    font-size: 14px;\n    text-align: left;\n\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\nnotify-gp notify-content a,\nnotify-gp notify-content a:link,\nnotify-gp notify-content a:visited,\nnotify-gp notify-content a:active {\n    margin: inherit;\n    padding-bottom: 5px;\n\n    color: #fff;\n    font-size: inherit;\n\n    text-decoration: none;\n\n    transition: color .5s;\n}\n\nnotify-gp notify-content a:hover {\n    margin: initial;\n    padding: initial;\n\n    color: inherit;\n    font-size: inherit;\n\n    text-decoration: none;\n}\n\nnotify-gp notify-i {\n    display: none;\n\n    margin: 0 10px 0 0;\n\n    width: 24px;\n    height: 24px;\n\n    background-position: center;\n    background-repeat: no-repeat;\n}\n\nnotify-gp notify-action,\nnotify-gp notify-cancel {\n    display: none;\n\n    margin: 0 0 0 24px;\n\n    max-width: 80px;\n    min-width: 56px;\n\n    color: #8ab4f8;\n\n    font-weight: 500;\n    font-size: inherit;\n    text-transform: uppercase;\n    text-align: right;\n\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n\n    cursor: pointer;\n}\n\nnotify-gp notify-cancel {\n    margin: 0;\n}\n\nnotify-gp notify-a {\n    display: block;\n    position: absolute;\n\n    top: 5px;\n    right: 5px;\n\n    cursor: pointer;\n}\n\nnotify-gp notify-a notify-span {\n    display: block;\n    width: 16px;\n    height: 16px;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABpFBMVEUAAADl5eXj4+NSVFRTVVVaXFxLTU1hY2NdX18pLCwhJCSdnp5sbm6HiYmjpKSDhYX///+rrKytrq6XmJgzNTUoKyt3eXlydHRlZ2dbXV1ucHB4enrv7++KjIyIiort7e1oamosLy8aHR0VGBgUFxcbHh4rLi5oamprbGwgIyMKDQ0KDQ0iJSVjZWWfoaEkJiYICwsLDg4KDQ0MDw8iJSWMjo41ODgMDw8JDAw2OTkvMTELDg4LDg4xMzM1NzcJDAwLDg40NjYeISEHCgoeISFkZmYtLy8yNDRvcXEWGRkHCgoaHR3///8RFBQHCgohJCShoqLIyMgaHR0HCgoZGxv4+PgRFBQLDg4xMzOWl5eam5ssLi4bHh7///8fIiIJDAwwMzNzdHQXGhoeISFlZmYsLi4KDQ0gIiI6PDwOEREuMDAXGhoHCgodHx8pLCwNEBA1ODj///8nKSkICwsICwsJDAwnKSnZ2dl9fn4pKysNDw8OEREpLCxyc3ORkpIzNTUjJSUVGBgUFxcgIyM5PDyanJwEBwcDBwcDBgYFCAgGCQn///+5RDDmAAAAhnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQUFAQU+i7S0jkAGEYrw8Y8SBIn++Pr3jQQ67fx8dvX6iWr27z+B/YsOcoMPdPiEAaL7iAgEcfWsA6D7iAkGcawDef2LDnOFD3T4gTLnfHb6iWrqNQJ4+ff7fQILd+ToewsCLHWZmXUwAyFsKwcAAAABYktHRBCVsg0sAAAAzElEQVQY02NgwAoYZWTl5JngXGYFRSVlFVU1dRYIn1VDU6sNCLR1dNlAfHY9fQNDw/YOI2MDE1MOoACnmbmFpZW1ja2dvYMjFwMDN4NTp7OLq5u7h6dXpzcDDwOvj29bm59/QGBQcFtbSCgfA79AWFtHeERkVLR1W1tMrCCDEENcZ3xCYlJySmpaZzqDMAODSEamRVZ2cE5unn1+gSjQFrHCIqNir7a2nJLSsnJxkEMkKiqrutrauqpraiUhTpWqq29obGpuaZVmIAYAAO06McffKEk8AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEzLTA0LTAzVDE3OjE4OjAzKzA4OjAwRdgB9wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMS0wNS0xOFQyMDowMTowMCswODowMB0r3XkAAABNdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuOC44LTcgUTE2IHg4Nl82NCAyMDE0LTAyLTI4IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3JnWaRffwAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMTI4Q3xBgAAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAxMjjQjRHdAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADEzMDU3MjAwNjArP9HVAAAAE3RFWHRUaHVtYjo6U2l6ZQAxLjAzS0JCZtQvXwAAAFx0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvZnRwLzE1MjAvZWFzeWljb24uY24vZWFzeWljb24uY24vY2RuLWltZy5lYXN5aWNvbi5jbi9wbmcvMTcvMTc4Ni5wbmcRsze7AAAAAElFTkSuQmCC);\n}\n\nnotify-gp notify-i.holdon {\n    display: block;\n    margin: 0 0 0 24px;\n\n    width: 20px;\n    height: 20px;\n\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAATUlEQVR4AWMYSuB/4P+V/1lRRFiBIoEYCoGC//+vAypFKFsHFFkJV4AsAVGKzsOjFFUZHqUElCGUwpRRrpCw1YQ9Qzh4SA5wwlE4hAAAiFGQefYhNJkAAAAASUVORK5CYII=);\n    cursor: pointer;\n}\n\nnotify-gp .notify-show {\n    opacity: 1;\n    transform: scaleY(1);\n}\n\nnotify-gp .notify-hide {\n    opacity: 0;\n    transform: scaleY(0);\n}\n\nnotify-gp .notify-success {\n    color: rgba(118, 255, 3, .8);\n}\n\nnotify-gp .notify-warning {\n    color: rgba(255, 238, 88, 1);\n}\n\nnotify-gp .notify-error {\n    color: rgba(239, 83, 80, 1);\n}\n\nnotify-gp .notify-modal {\n    flex-flow: column nowrap;\n    align-items: flex-start;\n\n    height: auto;\n    max-height: 200px;\n\n    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);\n}\n\nnotify-gp .notify-modal .notify-modal-content {\n    margin-top: 5px;\n    font-size: 13px;\n    white-space: normal;\n}\n\nnotify-gp .notify-modal .notify-modal-content a {\n    margin: 0;\n    padding: 0;\n\n    color: inherit;\n\n    font-size: inherit;\n    text-decoration: underline;\n    \n    cursor: pointer;\n}\n\nnotify-gp .notify-modal .notify-modal-content a:hover,\nnotify-gp .notify-modal .notify-modal-content a:active,\nnotify-gp .notify-modal .notify-modal-content a:visited,\nnotify-gp .notify-modal .notify-modal-content a:focus {\n    color: inherit;\n}\n\nnotify-gp .notify-snackbar {\n    position: fixed;\n    bottom: 0;\n    left: 50%;\n    margin-bottom: 5px;\n    transform-origin: left bottom 0px;\n}\n\n.notify-position-lt-corner {\n    align-items: flex-start;\n\n    margin: 0 0 0 15px;\n\n    left: 0;\n    right: initial;\n}\n\n.notify-position-lb-corner {\n    flex-flow: column-reverse wrap-reverse;\n\n    margin: 0 0 15px 15px;\n\n    right: initial;\n    top: initial;\n\n    left: 0;\n    bottom: 0;\n}\n\n.notify-position-rb-corner {\n    flex-flow: column-reverse wrap-reverse;\n    align-items: flex-start;\n\n    margin: 0 15px 15px 0;\n\n    top: initial;\n    left: initial;\n\n    bottom: 0;\n    right: 0;\n}\n", ""]);
	
	// exports


/***/ })
]);
//# sourceMappingURL=contentscripts.js.map