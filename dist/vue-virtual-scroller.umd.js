(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['vue-virtual-scroller'] = {}));
}(this, (function (exports) { 'use strict';

    const props = {
      items: {
        type: Array,
        required: true
      },
      keyField: {
        type: String,
        default: 'id'
      }
    };
    function simpleArray() {
      return this.items.length && typeof this.items[0] !== 'object';
    }

    var config = {
      itemsLimit: 1000
    };

    function getInternetExplorerVersion() {
    	var ua = window.navigator.userAgent;

    	var msie = ua.indexOf('MSIE ');
    	if (msie > 0) {
    		// IE 10 or older => return version number
    		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    	}

    	var trident = ua.indexOf('Trident/');
    	if (trident > 0) {
    		// IE 11 => return version number
    		var rv = ua.indexOf('rv:');
    		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    	}

    	var edge = ua.indexOf('Edge/');
    	if (edge > 0) {
    		// Edge (IE 12+) => return version number
    		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    	}

    	// other browser
    	return -1;
    }

    var isIE = void 0;

    function initCompat() {
    	if (!initCompat.init) {
    		initCompat.init = true;
    		isIE = getInternetExplorerVersion() !== -1;
    	}
    }

    var ResizeObserver = { render: function render() {
    		var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "resize-observer", attrs: { "tabindex": "-1" } });
    	}, staticRenderFns: [], _scopeId: 'data-v-b329ee4c',
    	name: 'resize-observer',

    	methods: {
    		compareAndNotify: function compareAndNotify() {
    			if (this._w !== this.$el.offsetWidth || this._h !== this.$el.offsetHeight) {
    				this._w = this.$el.offsetWidth;
    				this._h = this.$el.offsetHeight;
    				this.$emit('notify');
    			}
    		},
    		addResizeHandlers: function addResizeHandlers() {
    			this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify);
    			this.compareAndNotify();
    		},
    		removeResizeHandlers: function removeResizeHandlers() {
    			if (this._resizeObject && this._resizeObject.onload) {
    				if (!isIE && this._resizeObject.contentDocument) {
    					this._resizeObject.contentDocument.defaultView.removeEventListener('resize', this.compareAndNotify);
    				}
    				delete this._resizeObject.onload;
    			}
    		}
    	},

    	mounted: function mounted() {
    		var _this = this;

    		initCompat();
    		this.$nextTick(function () {
    			_this._w = _this.$el.offsetWidth;
    			_this._h = _this.$el.offsetHeight;
    		});
    		var object = document.createElement('object');
    		this._resizeObject = object;
    		object.setAttribute('aria-hidden', 'true');
    		object.setAttribute('tabindex', -1);
    		object.onload = this.addResizeHandlers;
    		object.type = 'text/html';
    		if (isIE) {
    			this.$el.appendChild(object);
    		}
    		object.data = 'about:blank';
    		if (!isIE) {
    			this.$el.appendChild(object);
    		}
    	},
    	beforeDestroy: function beforeDestroy() {
    		this.removeResizeHandlers();
    	}
    };

    // Install the components
    function install$1(Vue) {
    	Vue.component('resize-observer', ResizeObserver);
    	Vue.component('ResizeObserver', ResizeObserver);
    }

    // Plugin
    var plugin$2 = {
    	// eslint-disable-next-line no-undef
    	version: "0.4.5",
    	install: install$1
    };

    // Auto-install
    var GlobalVue$1 = null;
    if (typeof window !== 'undefined') {
    	GlobalVue$1 = window.Vue;
    } else if (typeof global !== 'undefined') {
    	GlobalVue$1 = global.Vue;
    }
    if (GlobalVue$1) {
    	GlobalVue$1.use(plugin$2);
    }

    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      }
    }

    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    function processOptions(value) {
      var options;

      if (typeof value === 'function') {
        // Simple options (callback-only)
        options = {
          callback: value
        };
      } else {
        // Options object
        options = value;
      }

      return options;
    }
    function throttle(callback, delay) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var timeout;
      var lastState;
      var currentArgs;

      var throttled = function throttled(state) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        currentArgs = args;
        if (timeout && state === lastState) return;
        var leading = options.leading;

        if (typeof leading === 'function') {
          leading = leading(state, lastState);
        }

        if ((!timeout || state !== lastState) && leading) {
          callback.apply(void 0, [state].concat(_toConsumableArray(currentArgs)));
        }

        lastState = state;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          callback.apply(void 0, [state].concat(_toConsumableArray(currentArgs)));
          timeout = 0;
        }, delay);
      };

      throttled._clear = function () {
        clearTimeout(timeout);
        timeout = null;
      };

      return throttled;
    }
    function deepEqual(val1, val2) {
      if (val1 === val2) return true;

      if (_typeof(val1) === 'object') {
        for (var key in val1) {
          if (!deepEqual(val1[key], val2[key])) {
            return false;
          }
        }

        return true;
      }

      return false;
    }

    var VisibilityState =
    /*#__PURE__*/
    function () {
      function VisibilityState(el, options, vnode) {
        _classCallCheck(this, VisibilityState);

        this.el = el;
        this.observer = null;
        this.frozen = false;
        this.createObserver(options, vnode);
      }

      _createClass(VisibilityState, [{
        key: "createObserver",
        value: function createObserver(options, vnode) {
          var _this = this;

          if (this.observer) {
            this.destroyObserver();
          }

          if (this.frozen) return;
          this.options = processOptions(options);

          this.callback = function (result, entry) {
            _this.options.callback(result, entry);

            if (result && _this.options.once) {
              _this.frozen = true;

              _this.destroyObserver();
            }
          }; // Throttle


          if (this.callback && this.options.throttle) {
            var _ref = this.options.throttleOptions || {},
                _leading = _ref.leading;

            this.callback = throttle(this.callback, this.options.throttle, {
              leading: function leading(state) {
                return _leading === 'both' || _leading === 'visible' && state || _leading === 'hidden' && !state;
              }
            });
          }

          this.oldResult = undefined;
          this.observer = new IntersectionObserver(function (entries) {
            var entry = entries[0];

            if (entries.length > 1) {
              var intersectingEntry = entries.find(function (e) {
                return e.isIntersecting;
              });

              if (intersectingEntry) {
                entry = intersectingEntry;
              }
            }

            if (_this.callback) {
              // Use isIntersecting if possible because browsers can report isIntersecting as true, but intersectionRatio as 0, when something very slowly enters the viewport.
              var result = entry.isIntersecting && entry.intersectionRatio >= _this.threshold;
              if (result === _this.oldResult) return;
              _this.oldResult = result;

              _this.callback(result, entry);
            }
          }, this.options.intersection); // Wait for the element to be in document

          vnode.context.$nextTick(function () {
            if (_this.observer) {
              _this.observer.observe(_this.el);
            }
          });
        }
      }, {
        key: "destroyObserver",
        value: function destroyObserver() {
          if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
          } // Cancel throttled call


          if (this.callback && this.callback._clear) {
            this.callback._clear();

            this.callback = null;
          }
        }
      }, {
        key: "threshold",
        get: function get() {
          return this.options.intersection && this.options.intersection.threshold || 0;
        }
      }]);

      return VisibilityState;
    }();

    function bind(el, _ref2, vnode) {
      var value = _ref2.value;
      if (!value) return;

      if (typeof IntersectionObserver === 'undefined') {
        console.warn('[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill');
      } else {
        var state = new VisibilityState(el, value, vnode);
        el._vue_visibilityState = state;
      }
    }

    function update(el, _ref3, vnode) {
      var value = _ref3.value,
          oldValue = _ref3.oldValue;
      if (deepEqual(value, oldValue)) return;
      var state = el._vue_visibilityState;

      if (!value) {
        unbind(el);
        return;
      }

      if (state) {
        state.createObserver(value, vnode);
      } else {
        bind(el, {
          value: value
        }, vnode);
      }
    }

    function unbind(el) {
      var state = el._vue_visibilityState;

      if (state) {
        state.destroyObserver();
        delete el._vue_visibilityState;
      }
    }

    var ObserveVisibility = {
      bind: bind,
      update: update,
      unbind: unbind
    };

    function install(Vue) {
      Vue.directive('observe-visibility', ObserveVisibility);
      /* -- Add more components here -- */
    }
    /* -- Plugin definition & Auto-install -- */

    /* You shouldn't have to modify the code below */
    // Plugin

    var plugin$1 = {
      // eslint-disable-next-line no-undef
      version: "0.4.6",
      install: install
    };

    var GlobalVue = null;

    if (typeof window !== 'undefined') {
      GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
      GlobalVue = global.Vue;
    }

    if (GlobalVue) {
      GlobalVue.use(plugin$1);
    }

    //
    let uid = 0;
    var script = {
      name: "RecycleScroller",
      components: {
        ResizeObserver
      },
      directives: {
        ObserveVisibility
      },
      props: { ...props,
        buffer: {
          type: Number,
          default: 200
        },
        itemSize: {
          type: Number,
          default: null
        },
        typeField: {
          type: String,
          default: 'type'
        },
        emitUpdate: {
          type: Boolean,
          default: false
        }
      },

      data() {
        return {
          pool: [],
          totalSize: 0,
          ready: false
        };
      },

      computed: {
        simpleArray
      },

      created() {
        this.$_startIndex = 0;
        this.$_endIndex = 0;
        this.$_views = new Map();
        this.$_unusedViews = new Map();
        this.$_scrollDirty = false;
      },

      mounted() {
        this.$nextTick(() => {
          this.updateVisibleItems(true);
          this.ready = true;
        });
      },

      methods: {
        handleScroll(event) {
          console.log('gsdhandleScroll');

          if (!this.$_scrollDirty) {
            this.$_scrollDirty = true;
            requestAnimationFrame(() => {
              this.$_scrollDirty = false;
              console.log('gsdrequestAnimationFrame');
              this.updateVisibleItems(false, true);
            });
          }
        },

        handleResize: function handleResize() {
          console.log('gsdhandleResize');
        },
        handleVisibilityChange: function handleVisibilityChange(isVisible, entry) {
          console.log('gsdhandleVisibilityChange', isVisible, entry);

          if (this.ready) {
            if (isVisible) {
              this.$emit('visible');
              requestAnimationFrame(() => {
                this.updateVisibleItems(false);
              });
            } else {
              this.$emit('hidden');
            }
          }
        },

        addView(pool, index, item, key, type) {
          const view = {
            item,
            position: 0
          };
          const nonReactive = {
            id: uid++,
            index,
            used: true,
            key,
            type
          };
          Object.defineProperty(view, 'nr', {
            configurable: false,
            value: nonReactive
          });
          pool.push(view);
          return view;
        },

        unuseView(view, fake = false) {
          const unusedViews = this.$_unusedViews;
          const type = view.nr.type;
          let unusedPool = unusedViews.get(type);

          if (!unusedPool) {
            unusedPool = [];
            unusedViews.set(type, unusedPool);
          }

          unusedPool.push(view);

          if (!fake) {
            view.nr.used = false;
            view.position = -9999;
            this.$_views.delete(view.nr.key);
          }

          console.log('gsdunusedPool', unusedPool);
        },

        updateVisibleItems(checkItem, checkPositionDiff = false) {
          const views = this.$_views;
          const unusedViews = this.$_unusedViews;
          const keyField = this.simpleArray ? null : this.keyField;
          const itemSize = this.itemSize;
          const items = this.items;
          const count = items.length;
          const pool = this.pool;
          let startIndex, endIndex;
          let totalSize;
          const typeField = this.typeField;

          if (!count) {
            startIndex = endIndex = totalSize = 0;
          } else {
            const scroll = this.getScroll();

            this.$_lastUpdateScrollPosition = scroll.start;
            const buffer = this.buffer;
            scroll.start -= buffer; // 300 -> 100

            scroll.end += buffer; // 900 -> 1100

            if (itemSize === null) ; else {
              startIndex = ~~(scroll.start / itemSize);
              endIndex = Math.ceil(scroll.end / itemSize);
              startIndex < 0 && (startIndex = 0);
              endIndex > count && (endIndex = count);
              totalSize = count * itemSize;
            }

            console.log('gsdupdateVisibleItems', totalSize, scroll.start, scroll.end, scroll, startIndex, endIndex);
          }

          if (endIndex - startIndex > config.itemsLimit) {
            this.itemsLimitError();
          }

          this.totalSize = totalSize;
          let view;
          const continuous = startIndex <= this.$_endIndex && endIndex >= this.$_startIndex;
          console.log('gsdcontinuous', continuous);

          if (this.$_continuous !== continuous) {
            console.log('gsdcontinuous', this.$_continuous, continuous);

            if (continuous) {
              views.clear();
              unusedViews.clear();

              for (let i = 0, l = pool.length; i < l; i++) {// TODO
              }
            }

            this.$_continuous = continuous;
          } else if (continuous) {
            for (let i = 0, l = pool.length; i < l; i++) {
              view = pool[i];

              if (view.nr.used) {

                if (view.nr.index === -1 || view.nr.index < startIndex || view.nr.index >= endIndex) {
                  this.unuseView(view);
                  console.log('gsdunusedViews', unusedViews);
                }
              }
            }
          }

          const unusedIndex = continuous ? null : new Map();
          let item, type, unusedPool;
          let v;

          for (let i = startIndex; i < endIndex; i++) {
            item = items[i];
            const key = keyField ? item[keyField] : item;

            if (key == null) {
              throw new Error(`Key is ${key} on item (keyField is '${keyField}')`);
            }

            view = views.get(key);

            if (!view) {
              type = item[typeField];
              console.log('gsd!view', unusedViews, unusedPool);
              unusedPool = unusedViews.get(type);

              if (continuous) {
                if (unusedPool && unusedPool.length) {
                  console.log('gsdunusedPool2', unusedPool);
                  view = unusedPool.pop();
                  view.item = item;
                  view.nr.used = true;
                  view.nr.index = i;
                  view.nr.key = key;
                  view.nr.type = type;
                } else {
                  view = this.addView(pool, i, item, key, type);
                  console.log('gsdview', view);
                }
              } else {
                v = unusedIndex.get(type) || 0;

                if (!unusedPool || v >= unusedPool.length) {
                  view = this.addView(pool, i, item, key, type);
                  this.unuseView(view, true);
                  unusedPool = unusedViews.get(type);
                }

                view = unusedPool[v];
                view.item = item;
                view.nr.used = true;
                view.nr.index = i;
                view.nr.key = key;
                view.nr.type = type;
                unusedIndex.set(type, v + 1);
                v++;
                console.log('gsdv', v, view);
                console.log('gsdunusedPool3', unusedPool);
              }

              views.set(key, view);
              console.log('gsdviews', views);
            } else {
              view.nr.used = true;
              view.item = item;
            }

            if (itemSize === null) ; else {
              view.position = i * itemSize;
              console.log('gsdposition', i, itemSize);
            }
          }

          console.log('gsdpool', pool);
          console.log('gsdviews', views);
          this.$_startIndex = startIndex;
          this.$_endIndex = endIndex;
          if (this.emitUpdate) this.$emit('update', startIndex, endIndex);
          clearTimeout(this.$_sortTimer);
          this.$_sortTimer = setTimeout(this.sortViews, 300);
          return {
            continuous
          };
        },

        itemsLimitError() {
          throw new Error('Rendered items limit reached');
        },

        getScroll() {
          console.log('gsdthis', this);
          const {
            $el: el
          } = this;
          let scrollState;
          scrollState = {
            start: el.scrollTop,
            // scrollTop 值是这个元素的内容顶部（卷起来的）到它的视口可见内容（的顶部）的距离的度量
            end: el.scrollTop + el.clientHeight // clientHeight 它是元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距

          };
          console.log('gsdscrollState', scrollState);
          return scrollState;
        },

        sortViews() {
          this.pool.sort((viewA, viewB) => viewA.nr.index - viewB.nr.index);
          console.log('gsdpool2', this.pool);
        }

      }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
    }

    /* script */
    const __vue_script__ = script;
    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        {
          directives: [
            {
              name: "observe-visibility",
              rawName: "v-observe-visibility",
              value: _vm.handleVisibilityChange,
              expression: "handleVisibilityChange"
            }
          ],
          staticClass: "vue-recycle-scroller",
          class: { ready: "ready" },
          on: {
            "&scroll": function($event) {
              return _vm.handleScroll.apply(null, arguments)
            }
          }
        },
        [
          _c(
            "div",
            { staticClass: "vue-recycle-scroller__slot" },
            [_vm._t("before")],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "vue-recycle-scroller__item-wrapper",
              style: { minHeight: _vm.totalSize + "px" }
            },
            _vm._l(_vm.pool, function(view) {
              return _c(
                "div",
                {
                  key: view.nr.id,
                  staticClass: "vue-recycle-scroller__item-view",
                  style: _vm.ready
                    ? { transform: "translateY(" + view.position + "px)" }
                    : null
                },
                [_vm._t("default", null, { item: view.item })],
                2
              )
            }),
            0
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "vue-recycle-scroller__slot" },
            [_vm._t("after")],
            2
          ),
          _vm._v(" "),
          _c("ResizeObserver", { on: { notify: _vm.handleResize } })
        ],
        1
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = "data-v-be33231c";
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        undefined,
        undefined,
        undefined
      );

    function registerComponents(Vue, prefix) {
      Vue.component(`${prefix}recycle-scroller`, __vue_component__);
      Vue.component(`${prefix}RecycleScroller`, __vue_component__);
    }

    const plugin = {
      install(Vue, options) {
        const finalOptions = Object.assign({}, {
          installComponents: true,
          componentsPrefix: ''
        }, options);

        if (finalOptions.installComponents) {
          registerComponents(Vue, finalOptions.componentsPrefix);
        }
      }

    };

    exports['default'] = plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
