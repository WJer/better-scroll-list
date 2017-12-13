import Scroll from './scroll'

Scroll.version = '0.5.1'
Scroll.install = function(Vue) {
  Vue.component(Scroll.name, Scroll)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Scroll)
}

export default Scroll
