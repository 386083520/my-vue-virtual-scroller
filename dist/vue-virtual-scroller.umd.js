(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['vue-virtual-scroller'] = {}));
}(this, (function (exports) { 'use strict';

    const props = {
      items: {
        type: Array,
        required: true
      }
    };

    var config = {
      itemsLimit: 1000
    };

    //
    var script = {
      name: "RecycleScroller",
      props: { ...props,
        buffer: {
          type: Number,
          default: 200
        },
        itemSize: {
          type: Number,
          default: null
        }
      },

      data() {
        return {
          pool: [],
          totalSize: 0
        };
      },

      created() {},

      mounted() {
        this.$nextTick(() => {
          this.updateVisibleItems(true);
        });
      },

      methods: {
        updateVisibleItems(checkItem, checkPositionDiff = false) {
          const itemSize = this.itemSize;
          const items = this.items;
          const count = items.length;
          let startIndex, endIndex;
          let totalSize;

          if (!count) {
            startIndex = endIndex = totalSize = 0;
          } else {
            const scroll = this.getScroll();

            this.$_lastUpdateScrollPosition = scroll.start;
            const buffer = this.buffer;
            scroll.start -= buffer; // 300 -> 100

            scroll.end += buffer; // 900 -> 1100

            if (itemSize === null) ; else {
              startIndex = ~~(scroll.start / itemSize); // 310/50 -> 6

              endIndex = Math.ceil(scroll.end / itemSize); // 1020/50 -> 21

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
        },

        itemsLimitError() {
          throw new Error('Rendered items limit reached');
        },

        getScroll() {
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
      return _c("div", { staticClass: "vue-recycle-scroller" }, [
        _c(
          "div",
          { staticClass: "vue-recycle-scroller__slot" },
          [_vm._t("before")],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "vue-recycle-scroller__item-wrapper" },
          _vm._l(_vm.pool, function(view, index) {
            return _c(
              "div",
              { key: index, staticClass: "vue-recycle-scroller__item-view" },
              [_vm._t("default", null, { item: view })],
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
        )
      ])
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = "data-v-de085a22";
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
//# sourceMappingURL=vue-virtual-scroller.umd.js.map
