import Vue from 'vue'
import ScrollList from '../src/index'
import App from './App'

import 'example/common/stylus/index.styl'

Vue.use(ScrollList)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
