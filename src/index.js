import ScrollList from './scroll-list'

ScrollList.version = __VERSION__
ScrollList.install = function(Vue) {
  Vue.component(ScrollList.name, ScrollList)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ScrollList)
}

export default ScrollList
