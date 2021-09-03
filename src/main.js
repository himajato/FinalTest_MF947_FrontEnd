import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BoostrapVue from 'bootstrap-vue'
import { PaginationPlugin } from 'bootstrap-vue'
Vue.use(PaginationPlugin)
Vue.config.productionTip = false

import "@/assets/css/Main.css"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  axios,
  BoostrapVue,
  render: h => h(App)
}).$mount('#app')
