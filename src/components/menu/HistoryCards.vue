<template lang="pug">
  div.history-card__container
    div(
      v-for="(item, index) of currentHistory",
      @click="selectPositionDocumentGroup(item)",
      :key="index",
      :class="isEnable(item) ? 'notSkiped' : 'skiped'"
    ).row
      span.body-content {{ item.body || '' }}
      q-icon(:name="iconNames[item.validation]",
              :color="iconColors[item.validation]").icon
</template>

<script>
import { QIcon } from 'quasar'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    QIcon
  },
  name: 'HistoryCards',
  props: {
    item: {
      type: Object
    },
    challengeId: {
      type: String,
      default: '-1'
    }
  },
  data () {
    return {
      iconNames: {
        'confirm': 'check',
        'reject': 'close',
        'skip': 'redo'
      },
      iconColors: {
        'confirm': 'green',
        'reject': 'red',
        'skip': 'blue'
      }
    }
  },
  computed: {
    ...mapGetters('history', [
      'history'
    ]),
    currentHistory () {
      return this.history(this.challengeId)
    }
  },
  methods: {
    ...mapActions('tagger', [
      'updateCurrentText'
    ]),
    selectPositionDocumentGroup (item) {
      this.$emit('select', item)
    },
    isEnable (item) {
      return item.validation !== 'skip'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.row
  flex-direction row
  justify-content space-between
  align-items center
  padding-bottom 6px
  cursor pointer
  &:hover .body-content
    color #eeeeee
  &:hover .icon
    opacity 1
  &.skiped
    cursor not-allowed
    span
      text-decoration line-through

.body-content
  color #b9b9b9
  white-space nowrap
  overflow hidden
  width: 85%
  font-size 12px
  text-overflow ellipsis

.icon
  font-weight bold
  opacity 0.65
</style>
