<template>
  <div class="scroll-list-wrapper" ref="wrapper">
    Hello ScrollList
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'scroll-list'

  export default {
    name: COMPONENT_NAME
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @require '~assets/variables.styl'

  .scroll-list-wrapper
    height: 100%
    background-color: $scroll-content-bgc
</style>
