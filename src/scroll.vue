<template>
  <div class="vue-scroll">
    <slot name="top"></slot>
    <scroll-list ref="scroll" :data="data"
               :options="scrollOptions" @pulling-down="onPullingDown"
                 @pulling-up="onPullingUp">
      <slot name="pulldown"></slot>
      <slot></slot>
      <slot name="pullup"></slot>
    </scroll-list>
    <slot name="bottom"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import ScrollList from './scroll-list'
  import {EVENT_PULLING_DOWN, EVENT_PULLING_UP, DIRECTION_V} from './common/js/config'

  const COMPONENT_NAME = 'vue-scroll'

  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      scrollbar: {
        type: Boolean,
        default: true
      },
      scrollbarFade: {
        type: Boolean,
        default: true
      },
      pullDownRefresh: {
        type: Boolean,
        default: true
      },
      pullDownRefreshThreshold: {
        type: Number,
        default: 90
      },
      pullDownRefreshStop: {
        type: Number,
        default: 40
      },
      pullDownRefreshTxt: {
        type: String,
        default: '刷新成功'
      },
      pullDownRefreshFailTxt: {
        type: String,
        default: '刷新失败'
      },
      pullUpLoad: {
        type: Boolean,
        default: true
      },
      pullUpLoadThreshold: {
        type: Number,
        default: 0
      },
      pullUpLoadMoreTxt: {
        type: String,
        default: '加载更多'
      },
      pullUpLoadNoMoreTxt: {
        type: String,
        default: '没有更多了'
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      click: {
        type: Boolean,
        default: false
      },
      probeType: {
        type: Number,
        default: 0
      },
      tap: {
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      initMinHeight: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      scrollOptions() {
        return {
          pullDownRefresh: this.pullDownRefreshObj,
          pullUpLoad: this.pullUpLoadObj,
          scrollbar: this.scrollbarObj,
          direction: this.direction,
          click: this.click,
          probeType: this.probeType,
          tap: this.tap,
          listenScroll: this.listenScroll,
          listenBeforeScroll: this.listenBeforeScroll,
          refreshDelay: this.refreshDelay,
          initMinHeight: this.initMinHeight
        }
      },
      scrollbarObj() {
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
      pullDownRefreshObj() {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop),
          txt: this.pullDownRefreshTxt,
          errorTxt: this.pullDownRefreshFailTxt
        } : false
      },
      pullUpLoadObj() {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {
            more: this.pullUpLoadMoreTxt,
            noMore: this.pullUpLoadNoMoreTxt
          }
        } : false
      }
    },
    methods: {
      onPullingDown() {
        this.$emit(EVENT_PULLING_DOWN)
      },
      onPullingUp() {
        this.$emit(EVENT_PULLING_UP)
      },
      disable() {
        this.$refs.scroll && this.$refs.scroll.disable()
      },
      enable() {
        this.$refs.scroll && this.$refs.scroll.enable()
      },
      refresh() {
        this.$refs.scroll && this.$refs.scroll.refresh()
      },
      destroy() {
        this.$refs.scroll && this.$refs.scroll.destroy()
      },
      scrollTo() {
        this.$refs.scroll && this.$refs.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.$refs.scroll && this.$refs.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      rebuild() {
        this.$refs.scroll && this.$refs.scroll.rebuild()
      },
      forceUpdate() {
        this.$refs.scroll && this.$refs.scroll.forceUpdate()
      },
      errorUpdate() {
        this.$refs.scroll && this.$refs.scroll.errorUpdate()
      }
    },
    components: {
      ScrollList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .vue-scroll
    display: flex
    flex-direction: column
    height:100%
</style>
