<template>
  <div id="app">
    <header class="demo-bar">
      <h1>better-scroll-list</h1>
    </header>
    <section class="demo-content" ref="demoApp">
      <ul class="demo-list">
        <li class="demo-item border-bottom-1px" v-for="component in components">
          <router-link class="link" :to="component.path">{{component.text}}</router-link>
        </li>
      </ul>
    </section>
    <list-view></list-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import ListView from 'components/view'

  export default {
    name: 'app',
    data() {
      return {
        components: [
          {
            path: '/normal-list',
            text: 'Normal list'
          },
          {
            path: '/custom-pull-down-list',
            text: 'custom-pull-down-list'
          }
        ]
      }
    },
    mounted() {
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new BScroll(this.$refs.demoApp, {
          click: true
        })
      })
    },
    components: {
      ListView
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  html,body,#app
    height:100%
  body
    background-color: #fff
  .demo-bar
    position: fixed
    z-index: 10
    right: 0
    left: 0
    height: 44px
    line-height: 44px
    text-align: center
    background-color: #f7f7f7
    box-shadow: 0 1px 6px #ccc
    -webkit-backface-visibility: hidden
    backface-visibility: hidden
    h1
      font-size: 18px
      font-weight: 500
  .demo-content
    position: fixed
    width: 100%
    top: 44px
    left: 0
    bottom: 0
    overflow: scroll
    .demo-list
      padding-left: 10px
      .demo-item
        height: 40px
        line-height: 40px
        .link
          display: block
          position: relative
          width: 100%
          color: #333
          text-decoration: none
          outline: 0
</style>
