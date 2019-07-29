import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs';
Vue.prototype.$qs = qs;
import axios from 'axios';
import $ from 'jquery';
Vue.prototype.$axios = axios;
Vue.prototype.$jq = $;
Vue.use(Router)
Vue.use(ElementUI)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        }
    ]
})
