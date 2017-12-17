<template>
  <div class="custom-pull-down-list">
    <header class="custom-pull-down-list-header">
      <div class="left" @click="back">返回</div>
      <h1>custom-pull-down-list</h1>
    </header>
    <div class="content">
      <vue-scroll :data="items" @pulling-up="onPullingUp" @pulling-down="onPullingDown" ref="scroll" :downStyle="'arrow'">
        <template slot="pulldown" slot-scope="props">
          <div v-if="props.pullDownRefresh"
            class="pulldown-wrapper"
            :style="props.pullDownStyle">
            <div
              v-if="props.beforePullDown"
              class="before-trigger"
              :style="{paddingTop: props.bubbleY + 'px'}">
              <span :class="{rotate: props.bubbleY > 40}">↓</span>
            </div>
            <div class="after-trigger" v-else>
              <div v-if="props.isPullingDown" class="loading">
                <loading></loading>
              </div>
              <div v-else><span>{{props.refreshTxt}}</span></div>
            </div>
          </div>
        </template>
        <ul class="scroll-list">
          <li class="scroll-item" v-for="item in items">{{item}}</li>
        </ul>
      </vue-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'components/loading'

  const _data = [
    'I am line 1',
    'I am line 2',
    'I am line 3',
    'I am line 4',
    'I am line 5',
    'I am line 6',
    'I am line 7',
    'I am line 8',
    'I am line 9',
    'I am line 10',
    'I am line 11',
    'I am line 12',
    'I am line 13',
    'I am line 14',
    'I am line 15'
  ]

  export default {
    name: 'custom-pull-down-list',
    data() {
      return {
        items: _data,
        itemIndex: _data.length
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      onPullingDown() {
        // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            this.items.unshift(`I am new data: ${+new Date()}`)
          } else {
            // 如果没有新数据
            this.$refs.scroll.errorUpdate()
          }
        }, 1000)
      },
      onPullingUp() {
        // 更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            let newPage = [
              'I am line ' + ++this.itemIndex,
              'I am line ' + ++this.itemIndex,
              'I am line ' + ++this.itemIndex,
              'I am line ' + ++this.itemIndex,
              'I am line ' + ++this.itemIndex
            ]
            this.items = this.items.concat(newPage)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      }
    },
    components: {
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .before-trigger
    font-size: 30px
    align-self: flex-end
    span
      display: inline-block
      transition: all 0.3s
      color: #666
      &.rotate
        transform: rotate(180deg)

  .custom-pull-down-list-header
    flex:0 0 44px
    height: 44px
    line-height: 44px
    text-align: center
    background-color: #f7f7f7
    .left
      position: absolute
      left:0
      top:0
      height:44px
      width:44px
      line-height:44px
  .custom-pull-down-list
    position: fixed
    z-index:40
    left:0
    right:0
    bottom:0
    top:0
    display:flex
    flex-direction:column
    .content
      flex:1
      overflow:hidden
      background-color: #fff
      .scroll-item
        height: 60px
        line-height: 60px
        box-sizing:border-box
        font-size: 16px
        padding-left: 20px
        border-bottom:1px solid #333
</style>
