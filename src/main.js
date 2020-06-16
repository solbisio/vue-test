import Vue from 'vue'
import App from './components/App.vue'
import store from './store'

import router from './router';
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue/dist/bootstrap-vue.esm';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})