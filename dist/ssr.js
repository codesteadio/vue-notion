'use strict';Object.defineProperty(exports,'__esModule',{value:true});var Prism=require('prismjs'),PrismComponent=require('vue-prism-component'),vueFragment=require('vue-fragment'),fetch$1=require('cross-fetch');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Prism__default=/*#__PURE__*/_interopDefaultLegacy(Prism);var PrismComponent__default=/*#__PURE__*/_interopDefaultLegacy(PrismComponent);var fetch__default=/*#__PURE__*/_interopDefaultLegacy(fetch$1);function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}// utils from react-notion
var getTextContent = function getTextContent(text) {
  return text.reduce(function (prev, current) {
    return prev + current[0];
  }, "");
};

var groupBlockContent = function groupBlockContent(blockMap) {
  var output = [];
  var lastType = undefined;
  var index = -1;
  Object.keys(blockMap).forEach(function (id) {
    var _blockMap$id$value$co;

    (_blockMap$id$value$co = blockMap[id].value.content) === null || _blockMap$id$value$co === void 0 ? void 0 : _blockMap$id$value$co.forEach(function (blockId) {
      var _blockMap$blockId, _blockMap$blockId$val;

      var blockType = (_blockMap$blockId = blockMap[blockId]) === null || _blockMap$blockId === void 0 ? void 0 : (_blockMap$blockId$val = _blockMap$blockId.value) === null || _blockMap$blockId$val === void 0 ? void 0 : _blockMap$blockId$val.type;

      if (blockType && blockType !== lastType) {
        index++;
        lastType = blockType;
        output[index] = [];
      }

      output[index].push(blockId);
    });
    lastType = undefined;
  });
  return output;
};

var getListNumber = function getListNumber(blockId, blockMap) {
  var groups = groupBlockContent(blockMap);
  var group = groups.find(function (g) {
    return g.includes(blockId);
  });

  if (!group) {
    return;
  }

  return group.indexOf(blockId) + 1;
};
var defaultMapImageUrl = function defaultMapImageUrl() {
  var image = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var block = arguments.length > 1 ? arguments[1] : undefined;
  var url = new URL("https://www.notion.so".concat(image.startsWith("/image") ? image : "/image/".concat(encodeURIComponent(image))));

  if (block && !image.includes("/images/page-cover/")) {
    var table = block.value.parent_table === "space" ? "block" : block.value.parent_table;
    url.searchParams.set("table", table);
    url.searchParams.set("id", block.value.id);
    url.searchParams.set("cache", "v2");
  }

  return url.toString();
};
var defaultMapPageUrl = function defaultMapPageUrl() {
  var pageId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  pageId = pageId.replace(/-/g, "");
  return "/".concat(pageId);
};var blockProps = {
  blockMap: {
    type: Object,
    required: true
  },
  contentId: {
    type: String,
    required: false
  },
  fullPage: {
    type: Boolean,
    default: false
  },
  hideList: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  level: {
    type: Number,
    default: 0
  },
  mapImageUrl: Function,
  mapPageUrl: Function,
  pageLinkOptions: Object,
  prism: {
    type: Boolean,
    default: false
  },
  todo: {
    type: Boolean,
    default: false
  }
};
var blockComputed = {
  pass: function pass() {
    return {
      blockMap: this.blockMap,
      contentId: this.contentId,
      fullPage: this.fullPage,
      hideList: this.hideList,
      level: this.level,
      mapImageUrl: this.mapImageUrl,
      mapPageUrl: this.mapPageUrl,
      pageLinkOptions: this.pageLinkOptions,
      prism: this.prism,
      todo: this.todo
    };
  },
  block: function block() {
    var id = this.contentId || Object.keys(this.blockMap)[0];
    return this.blockMap[id];
  },
  value: function value() {
    var _this$block;

    return (_this$block = this.block) === null || _this$block === void 0 ? void 0 : _this$block.value;
  },
  format: function format() {
    var _this$value;

    return (_this$value = this.value) === null || _this$value === void 0 ? void 0 : _this$value.format;
  },
  f: function f() {
    var _this$format, _this$format$block_he, _this$format2, _this$format$block_wi, _this$format3, _this$format4, _this$format5, _this$format6, _this$format7;

    // format with defaults if empty
    return {
      block_aspect_ratio: (_this$format = this.format) === null || _this$format === void 0 ? void 0 : _this$format.block_aspect_ratio,
      block_height: (_this$format$block_he = (_this$format2 = this.format) === null || _this$format2 === void 0 ? void 0 : _this$format2.block_height) !== null && _this$format$block_he !== void 0 ? _this$format$block_he : 1,
      block_width: (_this$format$block_wi = (_this$format3 = this.format) === null || _this$format3 === void 0 ? void 0 : _this$format3.block_width) !== null && _this$format$block_wi !== void 0 ? _this$format$block_wi : 1,
      block_color: (_this$format4 = this.format) === null || _this$format4 === void 0 ? void 0 : _this$format4.block_color,
      bookmark_icon: (_this$format5 = this.format) === null || _this$format5 === void 0 ? void 0 : _this$format5.bookmark_icon,
      bookmark_cover: (_this$format6 = this.format) === null || _this$format6 === void 0 ? void 0 : _this$format6.bookmark_cover,
      display_source: (_this$format7 = this.format) === null || _this$format7 === void 0 ? void 0 : _this$format7.display_source
    };
  },
  icon: function icon() {
    var _this$format8;

    return ((_this$format8 = this.format) === null || _this$format8 === void 0 ? void 0 : _this$format8.page_icon) || "";
  },
  width: function width() {
    var _this$format9;

    return (_this$format9 = this.format) === null || _this$format9 === void 0 ? void 0 : _this$format9.block_width;
  },
  properties: function properties() {
    var _this$value2;

    return (_this$value2 = this.value) === null || _this$value2 === void 0 ? void 0 : _this$value2.properties;
  },
  caption: function caption() {
    var _this$properties;

    return (_this$properties = this.properties) === null || _this$properties === void 0 ? void 0 : _this$properties.caption;
  },
  description: function description() {
    var _this$properties2;

    return (_this$properties2 = this.properties) === null || _this$properties2 === void 0 ? void 0 : _this$properties2.description;
  },
  title: function title() {
    var _this$properties3;

    return (_this$properties3 = this.properties) === null || _this$properties3 === void 0 ? void 0 : _this$properties3.title;
  },
  type: function type() {
    var _this$value3;

    return (_this$value3 = this.value) === null || _this$value3 === void 0 ? void 0 : _this$value3.type;
  },
  visible: function visible() {
    return !this.hideList.includes(this.type);
  }
};
var Blockable = {
  props: blockProps,
  computed: blockComputed,
  methods: {
    getTextContent: getTextContent,
    isType: function isType(t) {
      if (Array.isArray(t)) {
        return t.includes(this.type) && this.visible;
      }

      return this.type === t && this.visible;
    },
    blockColorClass: function blockColorClass() {
      var _this$format10;

      var suffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var blockColor = (_this$format10 = this.format) === null || _this$format10 === void 0 ? void 0 : _this$format10.block_color;
      return blockColor ? "notion-".concat(blockColor).concat(suffix) : undefined;
    }
  }
};//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "NotionDecorator",
  props: ["content"],
  computed: {
    text: function text() {
      var _this$content;

      return (_this$content = this.content) === null || _this$content === void 0 ? void 0 : _this$content[0];
    },
    decorators: function decorators() {
      var _this$content2;

      return ((_this$content2 = this.content) === null || _this$content2 === void 0 ? void 0 : _this$content2[1]) || [];
    },
    decoratorKey: function decoratorKey() {
      var _this$decorators, _this$decorators$;

      return (_this$decorators = this.decorators) === null || _this$decorators === void 0 ? void 0 : (_this$decorators$ = _this$decorators[0]) === null || _this$decorators$ === void 0 ? void 0 : _this$decorators$[0];
    },
    decoratorValue: function decoratorValue() {
      var _this$decorators2, _this$decorators2$;

      return (_this$decorators2 = this.decorators) === null || _this$decorators2 === void 0 ? void 0 : (_this$decorators2$ = _this$decorators2[0]) === null || _this$decorators2$ === void 0 ? void 0 : _this$decorators2$[1];
    },
    unappliedDecorators: function unappliedDecorators() {
      var clonedDecorators = JSON.parse(JSON.stringify(this.decorators || []));
      clonedDecorators.shift(); // remove applied decorator

      return clonedDecorators;
    },
    nextContent: function nextContent() {
      return [this.text, this.unappliedDecorators];
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.decorators.length === 0 ? _c('span', [_vm._ssrNode(_vm._ssrEscape(_vm._s(_vm.text)))], 2) : _vm.decoratorKey === 'h' ? _c('span', {
    class: 'notion-' + _vm.decoratorValue
  }, [_c('NotionDecorator', {
    attrs: {
      "content": _vm.nextContent
    }
  })], 1) : _vm.decoratorKey === 'c' ? _c('code', {
    staticClass: "notion-inline-code"
  }, [_c('NotionDecorator', {
    attrs: {
      "content": _vm.nextContent
    }
  })], 1) : _vm.decoratorKey === 'b' ? _c('b', [_c('NotionDecorator', {
    attrs: {
      "content": _vm.nextContent
    }
  })], 1) : _vm.decoratorKey === 'i' ? _c('em', [_c('NotionDecorator', {
    attrs: {
      "content": _vm.nextContent
    }
  })], 1) : _vm.decoratorKey === 's' ? _c('s', [_c('NotionDecorator', {
    attrs: {
      "content": _vm.nextContent
    }
  })], 1) : _vm.decoratorKey === 'a' ? _c('a', {
    staticClass: "notion-link",
    attrs: {
      "href": _vm.decoratorValue
    }
  }, [_c('NotionDecorator', {
    attrs: {
      "content": _vm.nextContent
    }
  })], 1) : _c('NotionDecorator', {
    attrs: {
      "content": _vm.nextContent
    }
  });
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-325f2ff8";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);//
var script$1 = {
  name: "NotionTextRenderer",
  props: ["text"],
  components: {
    NotionDecorator: __vue_component__
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', _vm._l(_vm.text, function (t, i) {
    return _c('NotionDecorator', {
      key: i,
      attrs: {
        "content": t
      }
    });
  }), 1);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-cf2dcb9a";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);//
var script$2 = {
  extends: Blockable,
  name: "NotionBookmark",
  components: {
    NotionTextRenderer: __vue_component__$1
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "notion-row"
  }, [_vm._ssrNode("<a target=\"_blank\" rel=\"noopener noreferrer\"" + _vm._ssrAttr("href", _vm.properties.link) + _vm._ssrClass(null, ['notion-bookmark', _vm.f.block_color && "notion-" + _vm.f.block_color]) + ">", "</a>", [_vm._ssrNode("<div>", "</div>", [_vm._ssrNode("<div class=\"notion-bookmark-title\">", "</div>", [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title || _vm.properties.link
    }
  })], 1), _vm._ssrNode(" "), _vm.description ? _vm._ssrNode("<div class=\"notion-bookmark-description\">", "</div>", [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.description
    }
  })], 1) : _vm._e(), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"notion-bookmark-link\">", "</div>", [_vm._ssrNode((_vm.f.bookmark_icon ? "<img" + _vm._ssrAttr("alt", _vm.getTextContent(_vm.title || _vm.properties.link)) + _vm._ssrAttr("src", _vm.f.bookmark_icon) + ">" : "<!---->") + " "), _vm._ssrNode("<div>", "</div>", [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.properties.link
    }
  })], 1)], 2)], 2), _vm._ssrNode(" " + (_vm.f.bookmark_cover ? "<div class=\"notion-bookmark-image\"><img" + _vm._ssrAttr("alt", _vm.getTextContent(_vm.title || _vm.properties.link)) + _vm._ssrAttr("src", _vm.f.bookmark_cover) + "></div>" : "<!---->"))], 2)]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-2714e630";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);var script$3 = {
  extends: Blockable,
  name: 'NotionTweet',
  data: function data() {
    return {
      tweet: null
    };
  },
  fetch: function (_fetch) {
    function fetch() {
      return _fetch.apply(this, arguments);
    }

    fetch.toString = function () {
      return _fetch.toString();
    };

    return fetch;
  }(function () {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var resp;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.properties.source && _this.properties.source[0])) {
                _context.next = 7;
                break;
              }

              _context.next = 3;
              return fetch("https://publish.twitter.com/oembed?url=".concat(_this.properties.source[0]));

            case 3:
              resp = _context.sent;
              _context.next = 6;
              return resp.json();

            case 6:
              _this.tweet = _context.sent;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  })
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.tweet.html)
    }
  }, []);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = "data-v-a0ad0498";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);var script$4 = {
  extends: Blockable,
  name: "NotionPageIcon",
  props: _objectSpread2(_objectSpread2({}, blockProps), {}, {
    big: Boolean
  })
};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.icon.includes('http') ? _c('img', {
    class: [_vm.format.page_cover && 'notion-page-icon-offset', _vm.big ? 'notion-page-icon-cover' : 'notion-page-icon'],
    attrs: {
      "src": _vm.mapImageUrl(_vm.icon, _vm.block),
      "alt": _vm.title ? _vm.getTextContent(_vm.title) : 'Icon'
    }
  }) : _vm.icon ? _c('span', {
    class: ['notion-emoji', _vm.format.page_cover && 'notion-page-icon-offset', _vm.big ? 'notion-page-icon-cover' : 'notion-page-icon'],
    attrs: {
      "role": "img",
      "aria-label": _vm.icon
    }
  }, [_vm._ssrNode(_vm._ssrEscape("\n  " + _vm._s(_vm.icon) + "\n"))]) : _vm._e();
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = "data-v-1a0dba29";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);//
var script$5 = {
  extends: Blockable,
  name: "NotionCallout",
  components: {
    NotionPageIcon: __vue_component__$4,
    NotionTextRenderer: __vue_component__$1
  }
};/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['notion-callout', _vm.blockColorClass(), _vm.blockColorClass('_co')]
  }, [_vm._ssrNode("<div>", "</div>", [_c('NotionPageIcon', _vm._b({}, 'NotionPageIcon', _vm.pass, false))], 1), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"notion-callout-text\">", "</div>", [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1)], 2);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = "data-v-ccf2a8e2";
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);var script$6 = {
  extends: Blockable,
  name: "NotionCode",
  components: {
    PrismComponent: PrismComponent__default['default']
  },
  data: function data() {
    return {
      Prism: Prism__default['default']
    };
  },
  computed: _objectSpread2(_objectSpread2({}, blockComputed), {}, {
    lang: function lang() {
      var _this$properties, _this$properties$lang, _this$properties$lang2, _this$properties$lang3;

      return (_this$properties = this.properties) === null || _this$properties === void 0 ? void 0 : (_this$properties$lang = _this$properties.language) === null || _this$properties$lang === void 0 ? void 0 : (_this$properties$lang2 = _this$properties$lang[0]) === null || _this$properties$lang2 === void 0 ? void 0 : (_this$properties$lang3 = _this$properties$lang2[0]) === null || _this$properties$lang3 === void 0 ? void 0 : _this$properties$lang3.toLowerCase();
    },
    langClass: function langClass() {
      return "language-".concat(this.lang);
    },
    supported: function supported() {
      return this.Prism.languages[this.lang];
    }
  })
};/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.prism && _vm.supported ? _c('pre', {
    class: ['notion-code', _vm.langClass]
  }, [_c('PrismComponent', {
    attrs: {
      "language": _vm.lang
    }
  }, [_vm._v(_vm._s(_vm.properties.title[0][0]))])], 1) : _c('pre', {
    class: ['notion-code', _vm.langClass]
  }, [_vm._ssrNode("<code" + _vm._ssrClass(null, _vm.langClass) + ">" + _vm._ssrEscape(_vm._s(_vm.properties.title[0][0])) + "</code>")]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = "data-v-7e4651c7";
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);//
var baseWidth = 46; // todo: add magic numbers to a config json

var script$7 = {
  name: "NotionColumn",
  props: ["format"],
  components: {
    Fragment: vueFragment.Fragment
  },
  computed: {
    columnStyle: function columnStyle() {
      var columns = Number((1 / this.format.column_ratio).toFixed(0));
      var totalWidth = (columns - 1) * baseWidth;
      return {
        width: "calc((100% - ".concat(totalWidth, "px) * ").concat(this.format.column_ratio, ")")
      };
    },
    spacerStyle: function spacerStyle() {
      return {
        width: "".concat(baseWidth, "px")
      };
    }
  }
};/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('Fragment', [_c('div', {
    staticClass: "notion-column",
    style: _vm.columnStyle
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    staticClass: "notion-spacer",
    style: _vm.spacerStyle
  })]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = "data-v-311c46b0";
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);var script$8 = {
  extends: Blockable,
  name: "NotionAsset",
  components: {
    NotionTextRenderer: __vue_component__$1
  },
  computed: _objectSpread2(_objectSpread2({}, blockComputed), {}, {
    src: function src() {
      return this.type === "figma" ? this.properties.source[0][0] : this.f.display_source;
    },
    style: function style() {
      var aspectRatio = this.f.block_aspect_ratio || this.f.block_height / this.f.block_width;
      return {
        paddingBottom: "".concat(aspectRatio * 100, "%"),
        position: "relative"
      };
    }
  })
};/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    style: _vm.style
  }, [_vm._ssrNode("<iframe" + _vm._ssrAttr("src", _vm.src) + " class=\"notion-image-inset\"></iframe>")]);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = "data-v-89ac3ad0";
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);var script$9 = {
  extends: Blockable,
  name: "NotionImage",
  components: {
    NotionTextRenderer: __vue_component__$1
  },
  computed: _objectSpread2(_objectSpread2({}, blockComputed), {}, {
    alt: function alt() {
      var _this$caption;

      return (_this$caption = this.caption) === null || _this$caption === void 0 ? void 0 : _this$caption[0][0];
    },
    src: function src() {
      var _this$properties;

      return this.mapImageUrl((_this$properties = this.properties) === null || _this$properties === void 0 ? void 0 : _this$properties.source[0][0], this.block);
    },
    style: function style() {
      var aspectRatio = this.f.block_aspect_ratio || this.f.block_height / this.f.block_width;
      return {
        paddingBottom: "".concat(aspectRatio * 100, "%"),
        position: "relative"
      };
    }
  })
};/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.f.block_aspect_ratio ? _c('div', {
    style: _vm.style
  }, [_vm._ssrNode("<img" + _vm._ssrAttr("alt", _vm.alt || 'Notion image') + _vm._ssrAttr("src", _vm.src) + " class=\"notion-image-inset\">")], 2) : _c('img', {
    attrs: {
      "alt": _vm.caption,
      "src": _vm.src
    }
  }, []);
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = "data-v-434c13d1";
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);//
var script$a = {
  extends: Blockable,
  name: "NotionFigure",
  components: {
    NotionAsset: __vue_component__$8,
    NotionImage: __vue_component__$9,
    NotionTextRenderer: __vue_component__$1
  }
};/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('figure', {
    staticClass: "notion-asset-wrapper",
    style: _vm.width
  }, [_vm.isType('image') ? _c('NotionImage', _vm._b({}, 'NotionImage', _vm.pass, false)) : _vm.isType(['embed', 'video', 'figma']) ? _c('NotionAsset', _vm._b({}, 'NotionAsset', _vm.pass, false)) : _vm._e(), _vm._ssrNode(" "), _vm.caption ? _vm._ssrNode("<figcaption class=\"notion-image-caption\">", "</figcaption>", [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.caption
    }
  })], 1) : _vm._e()], 2);
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = undefined;
/* scoped */

var __vue_scope_id__$a = undefined;
/* module identifier */

var __vue_module_identifier__$a = "data-v-df9a7ffc";
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);var script$b = {
  extends: Blockable,
  name: "NotionNestedList",
  computed: _objectSpread2(_objectSpread2({}, blockComputed), {}, {
    start: function start() {
      var _this$value;

      return getListNumber((_this$value = this.value) === null || _this$value === void 0 ? void 0 : _this$value.id, this.blockMap);
    }
  })
};/* script */
var __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.type === 'bulleted_list' ? _c('ul', {
    staticClass: "notion-list notion-list-disc"
  }, [_vm._t("default")], 2) : _c('ol', {
    staticClass: "notion-list notion-list-numbered",
    attrs: {
      "start": _vm.start
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$b = [];
/* style */

var __vue_inject_styles__$b = undefined;
/* scoped */

var __vue_scope_id__$b = undefined;
/* module identifier */

var __vue_module_identifier__$b = "data-v-c6bb3348";
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);var script$c = {
  extends: Blockable,
  name: "NotionList",
  components: {
    NotionNestedList: __vue_component__$b,
    NotionTextRenderer: __vue_component__$1
  },
  computed: _objectSpread2(_objectSpread2({}, blockComputed), {}, {
    start: function start() {
      var _this$value;

      return getListNumber((_this$value = this.value) === null || _this$value === void 0 ? void 0 : _this$value.id, this.blockMap);
    },
    isTopLevel: function isTopLevel() {
      var _this$blockMap$this$v, _this$blockMap$this$v2, _this$value2;

      return this.type !== ((_this$blockMap$this$v = this.blockMap[(_this$value2 = this.value) === null || _this$value2 === void 0 ? void 0 : _this$value2.parent_id]) === null || _this$blockMap$this$v === void 0 ? void 0 : (_this$blockMap$this$v2 = _this$blockMap$this$v.value) === null || _this$blockMap$this$v2 === void 0 ? void 0 : _this$blockMap$this$v2.type);
    }
  })
};/* script */
var __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.isTopLevel && _vm.type === 'bulleted_list' ? _c('ul', {
    staticClass: "notion-list notion-list-disc"
  }, [_vm._ssrNode("<li>", "</li>", [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1), _vm._ssrNode(" "), _vm.value.content ? _c('NotionNestedList', _vm._b({}, 'NotionNestedList', _vm.pass, false), [_vm._t("default")], 2) : _vm._e()], 2) : _vm.isTopLevel && _vm.type === 'numbered_list' ? _c('ol', {
    staticClass: "notion-list notion-list-numbered",
    attrs: {
      "start": _vm.start
    }
  }, [_vm._ssrNode("<li>", "</li>", [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1), _vm._ssrNode(" "), _vm.value.content ? _c('NotionNestedList', _vm._b({}, 'NotionNestedList', _vm.pass, false), [_vm._t("default")], 2) : _vm._e()], 2) : _c('span', [_vm._ssrNode("<li>", "</li>", [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1), _vm._ssrNode(" "), _vm.value.content ? _c('NotionNestedList', _vm._b({}, 'NotionNestedList', _vm.pass, false), [_vm._t("default")], 2) : _vm._e()], 2);
};

var __vue_staticRenderFns__$c = [];
/* style */

var __vue_inject_styles__$c = undefined;
/* scoped */

var __vue_scope_id__$c = undefined;
/* module identifier */

var __vue_module_identifier__$c = "data-v-0bcac4ac";
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);//
var script$d = {
  extends: Blockable,
  name: "NotionPageHeader",
  components: {
    Decorator: __vue_component__
  }
};/* script */
var __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('header', {
    staticClass: "notion-page-header"
  }, [_vm._ssrNode("<div class=\"notion-nav-breadcrumbs\"></div>")]);
};

var __vue_staticRenderFns__$d = [];
/* style */

var __vue_inject_styles__$d = undefined;
/* scoped */

var __vue_scope_id__$d = undefined;
/* module identifier */

var __vue_module_identifier__$d = "data-v-3ff37d03";
/* functional template */

var __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);var script$e = {
  extends: Blockable,
  name: "NotionPage",
  components: {
    NotionPageHeader: __vue_component__$d,
    NotionPageIcon: __vue_component__$4,
    NotionTextRenderer: __vue_component__$1
  },
  computed: _objectSpread2(_objectSpread2({}, blockComputed), {}, {
    coverStyle: function coverStyle() {
      var coverPosition = (1 - (this.format.page_cover_position || 0.5)) * 100;
      return {
        objectPosition: "center ".concat(coverPosition, "%")
      };
    },
    hasPageLinkOptions: function hasPageLinkOptions() {
      var _this$pageLinkOptions, _this$pageLinkOptions2;

      return ((_this$pageLinkOptions = this.pageLinkOptions) === null || _this$pageLinkOptions === void 0 ? void 0 : _this$pageLinkOptions.component) && ((_this$pageLinkOptions2 = this.pageLinkOptions) === null || _this$pageLinkOptions2 === void 0 ? void 0 : _this$pageLinkOptions2.href);
    },
    pageLinkProps: function pageLinkProps() {
      return _defineProperty({}, this.pageLinkOptions.href, this.mapPageUrl(this.value.id));
    }
  })
};/* script */
var __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.level === 0 && _vm.fullPage ? _c('div', {
    staticClass: "notion"
  }, [_vm._ssrNode((_vm.format && _vm.format.page_cover ? "<img" + _vm._ssrAttr("alt", _vm.getTextContent(_vm.title)) + _vm._ssrAttr("src", _vm.mapImageUrl(_vm.format.page_cover, _vm.block)) + " class=\"notion-page-cover\"" + _vm._ssrStyle(null, _vm.coverStyle, null) + ">" : "<!---->") + " "), _vm._ssrNode("<main" + _vm._ssrClass(null, ['notion-page', _vm.format && !_vm.format.page_cover && 'notion-page-offset', _vm.format && _vm.format.page_full_width && 'notion-full-width', _vm.format && _vm.format.page_small_text && 'notion-small-text']) + ">", "</main>", [_c('NotionPageIcon', _vm._b({
    attrs: {
      "big": ""
    }
  }, 'NotionPageIcon', _vm.pass, false)), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"notion-title\">", "</div>", [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1), _vm._ssrNode(" "), _vm._t("default")], 2)], 2) : _vm.level === 0 ? _c('main', {
    staticClass: "notion"
  }, [_vm._t("default")], 2) : _vm.hasPageLinkOptions ? _c(_vm.pageLinkOptions.component, _vm._b({
    tag: "component",
    staticClass: "notion-page-link"
  }, 'component', _vm.pageLinkProps, false), [_c('div', {
    staticClass: "notion-page-icon"
  }, [_c('NotionPageIcon', _vm._b({}, 'NotionPageIcon', _vm.pass, false))], 1), _vm._v(" "), _c('div', {
    staticClass: "notion-page-text"
  }, [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1)]) : _c('a', {
    staticClass: "notion-page-link",
    attrs: {
      "href": _vm.mapPageUrl(_vm.value.id)
    }
  }, [_vm._ssrNode("<div class=\"notion-page-icon\">", "</div>", [_c('NotionPageIcon', _vm._b({}, 'NotionPageIcon', _vm.pass, false))], 1), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"notion-page-text\">", "</div>", [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1)], 2);
};

var __vue_staticRenderFns__$e = [];
/* style */

var __vue_inject_styles__$e = undefined;
/* scoped */

var __vue_scope_id__$e = undefined;
/* module identifier */

var __vue_module_identifier__$e = "data-v-3c009a4c";
/* functional template */

var __vue_is_functional_template__$e = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$e = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, undefined, undefined, undefined);//
var script$f = {
  extends: Blockable,
  name: "NotionHeader",
  components: {
    NotionTextRenderer: __vue_component__$1
  }
};/* script */
var __vue_script__$f = script$f;
/* template */

var __vue_render__$f = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.type === 'header' ? _c('h1', {
    staticClass: "notion-h1"
  }, [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1) : _vm.type === 'sub_header' ? _c('h2', {
    staticClass: "notion-h2"
  }, [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1) : _vm.type === 'sub_sub_header' ? _c('h3', {
    staticClass: "notion-h3"
  }, [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1) : _vm._e();
};

var __vue_staticRenderFns__$f = [];
/* style */

var __vue_inject_styles__$f = undefined;
/* scoped */

var __vue_scope_id__$f = undefined;
/* module identifier */

var __vue_module_identifier__$f = "data-v-1dd7d810";
/* functional template */

var __vue_is_functional_template__$f = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$f = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, undefined, undefined, undefined);//
var script$g = {
  extends: Blockable,
  name: "NotionText",
  components: {
    NotionTextRenderer: __vue_component__$1
  }
};/* script */
var __vue_script__$g = script$g;
/* template */

var __vue_render__$g = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.properties ? _c('p', {
    class: ['notion-text', _vm.blockColorClass]
  }, [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1) : _c('div', {
    staticClass: "notion-blank"
  }, [_vm._ssrNode(" ")]);
};

var __vue_staticRenderFns__$g = [];
/* style */

var __vue_inject_styles__$g = undefined;
/* scoped */

var __vue_scope_id__$g = undefined;
/* module identifier */

var __vue_module_identifier__$g = "data-v-3d3c2b12";
/* functional template */

var __vue_is_functional_template__$g = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$g = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, undefined, undefined, undefined);//
var script$h = {
  extends: Blockable,
  name: "NotionToggle",
  components: {
    NotionTextRenderer: __vue_component__$1
  }
};/* script */
var __vue_script__$h = script$h;
/* template */

var __vue_render__$h = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('details', {
    staticClass: "notion-toggle"
  }, [_vm._ssrNode("<summary>", "</summary>", [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1), _vm._ssrNode(" "), _vm._ssrNode("<div>", "</div>", [_vm._t("default")], 2)], 2);
};

var __vue_staticRenderFns__$h = [];
/* style */

var __vue_inject_styles__$h = undefined;
/* scoped */

var __vue_scope_id__$h = undefined;
/* module identifier */

var __vue_module_identifier__$h = "data-v-8002fe86";
/* functional template */

var __vue_is_functional_template__$h = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$h = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, false, undefined, undefined, undefined);//
var script$i = {
  extends: Blockable,
  name: "NotionQuote",
  components: {
    NotionTextRenderer: __vue_component__$1
  }
};/* script */
var __vue_script__$i = script$i;
/* template */

var __vue_render__$i = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.properties ? _c('blockquote', {
    staticClass: "notion-quote"
  }, [_c('NotionTextRenderer', {
    attrs: {
      "text": _vm.title
    }
  })], 1) : _vm._e();
};

var __vue_staticRenderFns__$i = [];
/* style */

var __vue_inject_styles__$i = undefined;
/* scoped */

var __vue_scope_id__$i = undefined;
/* module identifier */

var __vue_module_identifier__$i = "data-v-df09cc54";
/* functional template */

var __vue_is_functional_template__$i = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$i = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, false, undefined, undefined, undefined);//
var script$j = {
  extends: Blockable,
  name: "NotionBlock",
  components: {
    NotionBookmark: __vue_component__$2,
    NotionTweet: __vue_component__$3,
    NotionCallout: __vue_component__$5,
    NotionCode: __vue_component__$6,
    NotionColumn: __vue_component__$7,
    NotionFigure: __vue_component__$a,
    NotionList: __vue_component__$c,
    NotionPage: __vue_component__$e,
    NotionHeader: __vue_component__$f,
    NotionText: __vue_component__$g,
    NotionToggle: __vue_component__$h,
    NotionQuote: __vue_component__$i
  }
};/* script */
var __vue_script__$j = script$j;
/* template */

var __vue_render__$j = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.isType('page') ? _c('div', [_c('NotionPage', _vm._b({}, 'NotionPage', _vm.pass, false), [_vm._t("default")], 2)], 1) : _vm.isType(['header', 'sub_header', 'sub_sub_header']) ? _c('NotionHeader', _vm._b({}, 'NotionHeader', _vm.pass, false)) : _vm.isType('bookmark') ? _c('NotionBookmark', _vm._b({}, 'NotionBookmark', _vm.pass, false)) : _vm.isType('tweet') ? _c('NotionTweet', _vm._b({}, 'NotionTweet', _vm.pass, false)) : _vm.isType('callout') ? _c('NotionCallout', _vm._b({}, 'NotionCallout', _vm.pass, false)) : _vm.isType('code') ? _c('NotionCode', _vm._b({}, 'NotionCode', _vm.pass, false)) : _vm.isType('text') ? _c('NotionText', _vm._b({}, 'NotionText', _vm.pass, false)) : _vm.isType('quote') ? _c('NotionQuote', _vm._b({}, 'NotionQuote', _vm.pass, false)) : _vm.isType('toggle') ? _c('NotionToggle', _vm._b({}, 'NotionToggle', _vm.pass, false), [_vm._t("default")], 2) : _vm.isType('column_list') ? _c('div', {
    staticClass: "notion-row"
  }, [_vm._t("default")], 2) : _vm.isType('column') ? _c('NotionColumn', {
    attrs: {
      "format": _vm.format
    }
  }, [_vm._t("default")], 2) : _vm.isType(['bulleted_list', 'numbered_list']) ? _c('NotionList', _vm._b({}, 'NotionList', _vm.pass, false), [_vm._t("default")], 2) : _vm.isType(['image', 'embed', 'figma', 'video']) ? _c('NotionFigure', _vm._b({}, 'NotionFigure', _vm.pass, false)) : _vm.isType('divider') ? _c('hr', {
    staticClass: "notion-hr"
  }, []) : _vm.todo && _vm.visible ? _c('div', [_vm._ssrNode(_vm._ssrEscape("todo: " + _vm._s(_vm.type))), _vm._t("default")], 2) : _vm._e();
};

var __vue_staticRenderFns__$j = [];
/* style */

var __vue_inject_styles__$j = undefined;
/* scoped */

var __vue_scope_id__$j = undefined;
/* module identifier */

var __vue_module_identifier__$j = "data-v-3c3e23fd";
/* functional template */

var __vue_is_functional_template__$j = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$j = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, false, undefined, undefined, undefined);//
var script$k = {
  extends: Blockable,
  name: "NotionRenderer",
  components: {
    NotionBlock: __vue_component__$j
  },
  props: {
    blockMap: [Object],
    contentId: String,
    fullPage: {
      type: Boolean,
      default: false
    },
    hideList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    level: {
      type: Number,
      default: 0
    },
    mapImageUrl: {
      type: Function,
      default: defaultMapImageUrl
    },
    mapPageUrl: {
      type: Function,
      default: defaultMapPageUrl
    },
    pageLinkOptions: Object,
    prism: {
      type: Boolean,
      default: false
    },
    todo: {
      type: Boolean,
      default: false
    }
  }
};/* script */
var __vue_script__$k = script$k;
/* template */

var __vue_render__$k = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.blockMap && _vm.value ? _c('NotionBlock', _vm._b({}, 'NotionBlock', _vm.pass, false), _vm._l(_vm.value.content, function (contentId) {
    return _c('NotionRenderer', _vm._b({
      key: contentId,
      attrs: {
        "level": _vm.level + 1,
        "content-id": contentId
      }
    }, 'NotionRenderer', _vm.pass, false));
  }), 1) : _vm._e();
};

var __vue_staticRenderFns__$k = [];
/* style */

var __vue_inject_styles__$k = undefined;
/* scoped */

var __vue_scope_id__$k = undefined;
/* module identifier */

var __vue_module_identifier__$k = "data-v-54b6f124";
/* functional template */

var __vue_is_functional_template__$k = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$k = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, false, undefined, undefined, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,NotionRenderer: __vue_component__$k});var getPageTable = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pageId) {
    var apiUrl,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            apiUrl = _args.length > 1 && _args[1] !== undefined ? _args[1] : "https://api.vue-notion.workers.dev/v1";
            _context.next = 3;
            return fetch__default['default']("".concat(apiUrl, "/table/").concat(pageId)).then(function (res) {
              return res.json();
            });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getPageTable(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getPageBlocks = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pageId) {
    var apiUrl,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            apiUrl = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : "https://api.vue-notion.workers.dev/v1";
            _context2.next = 3;
            return fetch__default['default']("".concat(apiUrl, "/page/").concat(pageId)).then(function (res) {
              return res.json();
            });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getPageBlocks(_x2) {
    return _ref2.apply(this, arguments);
  };
}();var install = function installVueNotion(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
  } else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
 // todo: remove .esm from default packaging for cleaner imports
exports.NotionRenderer=__vue_component__$k;exports.default=plugin;exports.getPageBlocks=getPageBlocks;exports.getPageTable=getPageTable;