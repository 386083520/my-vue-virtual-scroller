import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from './components/Home.vue'
import MyDemo1 from './components/MyDemo1.vue'

export default new VueRouter({
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/mydemo1', name: 'mydemo1', component: MyDemo1 },
    ],
})
