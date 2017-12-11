import {DIRECTION_V} from './config'

export const scrollMixin = {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
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
    options: {
      type: Object,
      default() {
        return {}
      }
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
  }
}
