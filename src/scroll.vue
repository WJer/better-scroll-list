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
  import {scrollMixin} from './common/js/mixins'
  import {EVENT_PULLING_DOWN, EVENT_PULLING_UP} from './common/js/config'

  const COMPONENT_NAME = 'vue-scroll'

  export default {
    name: COMPONENT_NAME,
    mixins: [scrollMixin],
    props: {
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
      }
    },
    computed: {
      scrollOptions() {
        return {
          pullDownRefresh: this.pullDownRefreshObj,
          pullUpLoad: this.pullUpLoadObj,
          scrollbar: this.scrollbarObj
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
