// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import App from './App'
import VueRouter from 'vue-router';


// import {routes} from "./router";
// import router from './router'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './store/store.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {routes} from "./router";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false


export const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters.authStatus === true) {
      next()
    } else if (store.getters.authStatus === false) {
      // console.log(from.path)
      if (from.path !== '/') {
        router.push('/');
      }
    }
  } else {
    next()
  }
});

/* eslint-disable no-new */
var vm =new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: {App},
  template: '<App/>'
})

global.vm = vm
