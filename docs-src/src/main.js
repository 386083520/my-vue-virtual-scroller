import Vue from 'vue'
import router from './router'
import App from './App.vue'

/*import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import VueVirtualScroller from 'vue-virtual-scroller'*/
import VirtualScroller from '../../dist/vue-virtual-scroller.umd.js'
import '../../dist/vue-virtual-scroller.css'

Vue.use(VirtualScroller)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
})
