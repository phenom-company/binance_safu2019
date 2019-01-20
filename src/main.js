// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfill';
// import cssVars from 'css-vars-ponyfill'

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import App from './App';
import router from './router/index';
import store from './store/index';
import VueObserveVisibility from 'vue-observe-visibility';

import VueNotifications from 'vue-notifications';
import miniToastr from 'mini-toastr'; // https://github.com/se-panfilov/mini-toastr
import VueLoading from 'vue2-loading';
import VueQRCodeComponent from 'vue-qrcode-component';
import VueTransmit from "vue-transmit";
// import Vuex from 'vuex';
import 'es6-promise/auto';
import '@/utils/filter.js';

// todo
// cssVars()

// enable components
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
// Vue.use(Vuex);
Vue.use(VueLoading, {
  text: 'Loading...',
  bg: 'rgba(230, 233, 236, 0.8)',
  textColor: '#000',
  spinnerClass: 'fa fa-spin fa-spinner fa-3x'
})
Vue.use(VueObserveVisibility)
Vue.component('qr-code', VueQRCodeComponent);
Vue.use(VueTransmit);

// global define useful env.
// axious
// window.axios = axios;

// toasts
const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
};

miniToastr.init({types: toastTypes});
window.toastr = {
  success: (message, title, timeout, cb) => {
    return miniToastr['success'](message, title, timeout, cb)
  },
  error: (message, title, timeout, cb) => {
    return miniToastr['error'](message, title, timeout, cb)
  },
  info: (message, title, timeout, cb) => {
    return miniToastr['info'](message, title, timeout, cb)
  },
  warn: (message, title, timeout, cb) => {
    return miniToastr['warn'](message, title, timeout, cb)
  }
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});

store.dispatch('refreshState');
