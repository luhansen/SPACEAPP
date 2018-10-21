<template lang="pug">
  q-modal(v-model="opened").guidelines-modal
    div.header-guidelines
      h4
        q-icon(name="mdi-school").icon-name
        | Diretrizes
    div.modal-content
      p {{guidelines}}
      q-btn(
        color="primary"
        @click="closeGuidelines"
        label="Fechar"
      )
</template>

<script>
export default {
  name: 'Guidelines',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    guidelines: {
      type: String,
      required: true
    }
  },
  methods: {
    closeGuidelines () {
      this.$emit('closeGuidelines')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.guidelines-modal
  background radial-gradient(circle, rgba(50, 50, 50, 0.5), rgba(0, 0, 0, 0.6))
  .header-guidelines
    width 100%
    background $primary
    padding 10px 15px
    display flex
    flex-direction column
    h4
      margin 0
      font-size 26px
      color white
      .icon-name
        margin-right 5px
        margin-top -5px
  .modal-content
    flex 1
    padding 20px
    background $grey-2
    max-width 600px
    p
      color $grey-9
      white-space pre-wrap
      margin-bottom 20px
    .q-btn
      margin 0 auto
      display block
</style>
