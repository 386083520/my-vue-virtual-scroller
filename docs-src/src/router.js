import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from './components/Home.vue'
import MyDemo1 from './components/MyDemo1.vue'
import MyDemo2 from './components/MyDemo2.vue'

export default new VueRouter({
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/mydemo1', name: 'mydemo1', component: MyDemo1 },
        { path: '/mydemo2', name: 'mydemo2', component: MyDemo2 }
    ],
})
