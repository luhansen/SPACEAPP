<template lang="pug">
  div.header
    q-btn(
      icon="menu"
      flat
      round
      dense
      @click="toggleDrawer()"
      size="16px"
    ).toggle-btn
    a(@click="redirectToHome").title-text Challenger
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'HeaderMenu',
  props: {
  },
  computed: {
  },
  methods: {
    ...mapActions('drawer', [
      'toggleDrawer'
    ]),
    redirectToHome () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~variables'

.header
  display flex
  align-items center
  justify-content center
  color white

.toggle-btn
  // transition display 1s ease
  .challenger-logo
    max-width 37px
    margin 4px 0
    height auto
    margin-left 10px
  @media (min-width: 992px)
    display none

.progress
  width 100%
  margin-left 3%
  display flex
  align-content: center
  padding-right 10px
  .bar
    margin-right 10px
    align-self center
  .percentage
    font-size 14px
    font-weight 900

.title-text
  cursor pointer
  font-weight bold
  padding-left 5px
</style>
