<template>
  <scroll-list ref="scroll" :data="data"
               :options="scrollOptions">
    <slot name="pulldown"></slot>
    <slot></slot>
    <slot name="pullup"></slot>
  </scroll-list>
</template>

<script type="text/ecmascript-6">
  import ScrollList from './scroll-list'
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
      pullUpload: {
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
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {
            more: this.pullUpLoadMoreTxt,
            noMore: this.pullUpLoadNoMoreTxt
          }
        } : false
      }
    },
    components: {
      ScrollList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
