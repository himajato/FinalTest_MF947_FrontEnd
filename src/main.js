import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BoostrapVue from 'bootstrap-vue'
import { PaginationPlugin } from 'bootstrap-vue'
import { MISA_RESOUCE } from '../src/js/resouce/resouce'
Vue.use(PaginationPlugin)
Vue.config.productionTip = false

import "@/assets/css/Main.css"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  axios,
  BoostrapVue,
  MISA_RESOUCE,
  render: h => h(App)
}).$mount('#app')
