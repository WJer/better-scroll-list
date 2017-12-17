import Vue from 'vue'
import ScrollList from '../src/index'
import App from './App'
import VueRouter from 'vue-router'

import 'example/common/stylus/index.styl'

const NormalList = () => import('pages/normal-list')
const CustomPullDownList = () => import('pages/custom-pull-down-list')

Vue.use(VueRouter)
Vue.use(ScrollList)

const routes = [
  {
    path: '/normal-list',
    component: NormalList
  },
  {
    path: '/custom-pull-down-list',
    component: CustomPullDownList
  }
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
