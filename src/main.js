import Vue from 'vue'
import ElementUI from 'element-ui'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import MyHeader from './Header.vue'
import router from './router'

import 'element-ui/lib/theme-default/index.css'
import './assets/index.css'

Vue.use(ElementUI)

new Vue({
  router,
  components: { MyHeader }
}).$mount('#app')
