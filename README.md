# better-scroll-list
A pull-up load and drop-down refresh data plugin

[![npm](https://img.shields.io/npm/v/better-scroll-list.svg?style=flat-square)](https://www.npmjs.com/package/better-scroll-list)
[![downloads](https://img.shields.io/npm/dm/better-scroll-list.svg)](https://www.npmjs.com/package/better-scroll-list)

## About better-scroll-list
Better-scroll-list encapsulates better-scroll pull-down and pull-up capabilities, and encapsulates some of its events and methods

## install

### Use npm for installation
```node
  npm install --save better-scroll-list
```

### Import using ES6
```javascript
  import VueScroll from 'better-scroll-list'
  Vue.use(VueScroll)
```

### Used as such in the component
```javascript
  <vue-scroll></vue-scroll>
```

### Supported parameters

|parameter|type|default|description|
|:-:|:-:|:-:|:-:|
|scrollbar|Boolean|true|Whether to display the scroll bar|
|scrollbarFade|Boolean|true|Show hidden scroll bar transition effect|
|pullDownRefresh|Boolean|true|Whether to initialize the pull-down refresh|
|pullDownRefreshThreshold|Number|90|Top pull-down distance|
|pullDownRefreshStop|Number|40|Refresh time and the distance to stay rebound|
|pullDownRefreshTxt|String|刷新成功|Text displayed when refresh is successful|
|pullDownRefreshFailTxt|String|刷新失败|Text displayed when refresh is failed|
|pullUpLoad|Boolean|true|Whether to initialize the pull-up load|
|pullUpLoadThreshold|Number|0|Bottom distance threshold|
|pullUpLoadMoreTxt|String|加载更多|Text displayed when there is more data|
|pullUpLoadNoMoreTxt|String|没有更多了|Text displayed when there is no more data|
|direction|String|vertical|The default is vertical scrolling, if you want horizontal scrolling, you need to pass horizontal, but the horizontal scrolling temporarily does not support the pull-down refresh download|
|click|Boolean|false|When set to true, better-scroll will dispatch a click event, and we will add a private property to the dispatched event parameter, _constructed, to true|
|probeType|Number|0|Please refer to the [better-scroll probeType](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#probetype)
|tap|Boolean|false|Because better-scroll prevents native click events, we can set tap to true, which dispatches a tap event when the zone is clicked, and you can listen to it as you would a native event|
|refreshDelay|Number|20|Data change refreshing scroll interval, in milliseconds|
|initMinHeight|Boolean|true|Whether to automatically add the minimum height of the scroll zone|
|listenScroll|Boolean|false|Whether to listen for scroll events|
|listenBeforeScroll|Boolean|false|Whether to listen beforeScrollStart event|
|listenScrollStart|Boolean|false|Whether to listen for the scrollStart event|
|listenScrollEnd|Boolean|false|Whether to listen for the scrollEnd event|
|listenTouchEnd|Boolean|false|Whether to listen for the touchEnd event|
|listenFlick|Boolean|false|Whether to listen for the flick event|
|listenRefresh|Boolean|false|Whether to listen for the refresh event|
|listenDestroy|Boolean|false|Whether to listen for the destroy event|

Please refer to the detailed configuration [better-scroll](https://ustbhuangyi.github.io/better-scroll/doc/) docs

### Supported events

|name|parameter|
|:-:|:-:|
|pulling-up|-|
|pulling-down|-|
|before-scroll-start|-|
|scroll-start|pos|
|scroll|pos|
|scroll-end|pos|
|touch-end|pos|
|flick|-|
|refresh|-|
|destroy|-|
|tap|-|
|click|-|

### Supported methods

|name|description|
|:-:|:-:|
|disable|disable scroll|
|enable|enable scroll|
|refresh|refresh scroll area|
|destroy|destroy scroll |
|scrollTo|instance|
|scrollToElement|See the official document|
|rebuild|See the official document|
|forceUpdate|called wehn pull-down refresh success and pull-up load success|
|errorUpdate|called wehn pull-down refresh failed and pull-up load failed|

### Listen event case
```html
  <vue-scroll ref="scroll" :listenScroll="listenScroll" @scroll="onScroll" @before-scroll-start="onBeforeScrollStart" :pulling-up="onPullingUp"></vue-scroll>
```

```javascript
  export default {
    methods: {
      onBeforeScrollStart() {
        ...
      }
    }
  }
```

### pass parameter case
```javascript
  export default {
    created() {
      this.listenScroll = true
    },
    methods: {
      onBeforeScrollStart() {
        ...
      },
      onScroll(pos) {
        console.log(pos)
      }
    }
  }
```

### Call the method example
```javascript
  export default {
    methods: {
      onBeforeScrollStart() {
        ...
      },
      onPullingUp() {
        this.$refs.scroll.errorUpdate()
      }
    }
  }
```
