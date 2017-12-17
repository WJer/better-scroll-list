<template>
  <div class="normal-list">
    <header class="normal-list-header">
      <div class="left" @click="back">返回</div>
      <h1>normal-list</h1>
    </header>
    <div class="content">
      <vue-scroll :data="items" @pulling-up="onPullingUp" @pulling-down="onPullingDown" ref="scroll">
        <ul class="scroll-list">
          <li class="scroll-item" v-for="item in items">{{item}}</li>
        </ul>
      </vue-scroll>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .normal-list-header
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
  .normal-list
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
