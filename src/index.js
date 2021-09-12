import RecycleScroller from './components/RecycleScroller.vue'
import DynamicScroller from './components/DynamicScroller.vue'

function registerComponents (Vue, prefix) {
    Vue.component(`${prefix}recycle-scroller`, RecycleScroller)
    Vue.component(`${prefix}RecycleScroller`, RecycleScroller)
    Vue.component(`${prefix}dynamic-scroller`, DynamicScroller)
    Vue.component(`${prefix}DynamicScroller`, DynamicScroller)
}

const plugin = {
    install (Vue, options) {
        const finalOptions = Object.assign({}, {
            installComponents: true,
            componentsPrefix: '',
        }, options)
        if (finalOptions.installComponents) {
            registerComponents(Vue, finalOptions.componentsPrefix)
        }
    }
}
export default plugin

