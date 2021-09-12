import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from './components/Home.vue'
import MyDemo1 from './components/MyDemo1.vue'
import MyDemo2 from './components/MyDemo2.vue'
import MyDemo3 from './components/MyDemo3.vue'
import MyDemo4 from './components/MyDemo4.vue'
import MyDemo5 from './components/MyDemo5.vue'

export default new VueRouter({
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/mydemo1', name: 'mydemo1', component: MyDemo1 },
        { path: '/mydemo2', name: 'mydemo2', component: MyDemo2 },
        { path: '/mydemo3', name: 'mydemo3', component: MyDemo3 },
        { path: '/mydemo4', name: 'mydemo4', component: MyDemo4 },
        { path: '/mydemo5', name: 'mydemo5', component: MyDemo5 }
    ],
})
