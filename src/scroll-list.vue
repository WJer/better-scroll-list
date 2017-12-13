<template>
  <div class="scroll-list-wrapper" ref="wrapper">
    <div class="scroll-content">
        <div class="scroll-wrapper" ref="scrollWrapper">
          <slot></slot>
        </div>
        <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
          <div class="pullup-wrapper" v-if="pullUpLoad">
            <div class="before-trigger" v-if="!isPullUpLoad">
              <span>{{pullUpTxt}}</span>
            </div>
            <div class="after-trigger" v-else>
              <loading></loading>
            </div>
          </div>
        </slot>
    </div>
    <slot name="pullDown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY">
      <div class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
           <div class="loading" v-if="isPullingDown">
             <loading></loading>
           </div>
          <div v-else>
            <span>{{refreshTxt}}</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bubble from './components/bubble/bubble'
  import Loading from './components/loading/loading'
  import BScroll from 'better-scroll'
  import {getRect} from './common/js/utils'
  import {EVENT_PULLING_DOWN, EVENT_PULLING_UP, DIRECTION_H, DIRECTION_V} from './common/js/config'

  const COMPONENT_NAME = 'scroll-list'

  const DEFAULT_LOAD_TXT_MORE = '加载更多'
  const DEFAULT_LOAD_TXT_NO_MORE = '没有更多了'
  const DEFAULT_REFRESH_TXT = '刷新成功'
  const DEFAULT_REFRESH_FAIL_TXT = '刷新失败'

  const EVENT_SCROLL = 'scroll'
  const EVENT_BEFORE_SCROLL_START = 'before-scroll-start'

  const DEFAULT_OPTIONS = {
    observeDOM: true,
    click: true,
    probeType: 0,
    scrollbar: false,
    pullDownRefresh: false,
    pullUpLoad: false
  }

  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      options: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        beforePullDown: true,
        isPullingDown: false,
        isErrorPullingDown: false,
        isRebounding: false,
        isPullUpLoad: false,
        pullUpDirty: true, // 加载完后还有数据则为true，没有数据了则为false
        bubbleY: 0,
        pullDownStyle: ''
      }
    },
    computed: {
      pullDownRefresh() {
        return this.options.pullDownRefresh
      },
      pullUpLoad() {
        return this.options.pullUpLoad
      },
      pullUpTxt() {
        const pullUpLoad = this.pullUpLoad
        const txt = pullUpLoad && pullUpLoad.txt
        const moreTxt = (txt && txt.more) || DEFAULT_LOAD_TXT_MORE
        const noMoreTxt = (txt && txt.noMore) || DEFAULT_LOAD_TXT_NO_MORE
        return this.pullUpDirty ? moreTxt : noMoreTxt
      },
      refreshTxt() {
        const pullDownRefresh = this.pullDownRefresh
        if (!this.isErrorPullingDown) {
          return (pullDownRefresh && pullDownRefresh.txt) || DEFAULT_REFRESH_TXT
        }
        return (pullDownRefresh && pullDownRefresh.errorTxt) || DEFAULT_REFRESH_FAIL_TXT
      }
    },
    created() {
      this.pullDownInitTop = -50
    },
    mounted() {
      this.$nextTick(this.initScroll)
    },
    methods: {
      initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.setScrollViewMinHeight()
        let options = Object.assign({}, DEFAULT_OPTIONS, {
          scrollY: this.options.direction === DIRECTION_V,
          scrollX: this.options.direction === DIRECTION_H
        }, this.options)
        this.scroll = new BScroll(this.$refs.wrapper, options)
        if (this.options.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit(EVENT_SCROLL, pos)
          })
        }
        if (this.options.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit(EVENT_BEFORE_SCROLL_START)
          })
        }
        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }
        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
      forceUpdate(dirty) {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = dirty
          this.refresh()
        } else {
          this.refresh()
        }
      },
      errorUpdate() {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          this.isErrorPullingDown = true
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else {
          this.refresh()
        }
      },
      setScrollViewMinHeight() {
        if (this.$refs.scrollWrapper && ((this.pullDownRefresh || this.pullUpLoad) || this.options.initMinHeight)) {
          let wrapperHeight = getRect(this.$refs.wrapper).height
          let contentHeight = getRect(this.$refs.scrollWrapper).height - 1
          if (contentHeight <= wrapperHeight) {
            this.$refs.scrollWrapper.style.minHeight = (wrapperHeight + 1) + 'px'
          } else {
            this.$refs.scrollWrapper.style.minHeight = 'unset'
          }
        }
      },
      getScrollViewHeight() {
        return this.$refs.scrollWrapper.offsetHeight
      },
      _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
          this.$emit(EVENT_PULLING_DOWN)
          this.beforePullDown = false
          this.isPullingDown = true
        })
        this.scroll.on('scroll', (pos) => {
          if (this.beforePullDown) {
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
          } else {
            this.bubbleY = 0
          }
          if (this.isRebounding) {
            this.pullDownStyle = `top:${Math.min(pos.y - 30, 10)}px`
          }
        })
      },
      _reboundPullDown() {
        const {stopTime = 600} = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            this.isPullingDown = false
            resolve()
          }, stopTime)
        })
      },
      _afterPullDown() {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          this.beforePullDown = true
          this.isRebounding = false
          this.isErrorPullingDown = false
          this.refresh()
        }, this.scroll.options.bounceTime)
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          this.$emit(EVENT_PULLING_UP)
          this.isPullUpLoad = true
        })
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      destroy() {
        this.scroll.destroy()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      rebuild() {
        this.destroy()
        this.initScroll()
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.forceUpdate(true)
        }, this.options.refreshDelay)
      }
    },
    components: {
      Bubble,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @require '~assets/variables.styl'

  .scroll-list-wrapper
    position: relative
    flex: 1
    overflow:hidden
    width:100%
    background-color: $scroll-content-bgc
    .scroll-content
      position: relative
      z-index:1
      background-color: $scroll-content-bgc
    .pulldown-wrapper
      position: absolute
      width: 100%
      left: 0
      display: flex
      justify-content: center
      align-items: center
      transition: all
      .after-trigger
        margin-top: 5px
    .pullup-wrapper
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      padding: 16px 0
</style>
