import Vue from 'vue'
import ScrollList from '../src/index'
import App from './App'

Vue.use(ScrollList)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
