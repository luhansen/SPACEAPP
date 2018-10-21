<template lang="pug">
  div.btns
    q-btn(@click="toggleReport(true)", icon="mdi-alert ", color="yellow-8", round).report-btn.animate-pop
      q-tooltip(self="bottom left").tooltip-info Reportar erro neste(s) documento(s)
    q-btn(@click="changeInfo", icon="info", color="primary", round).info-btn.animate-pop
      q-tooltip(self="bottom left").tooltip-info Informações sobre atalhos
      q-card(v-if="showInfo").info-card.animate-pop
        q-card-title.card-title
          p {{information}}
        q-card-main
          div.content
            div.keyboard-keys
              q-btn(color="tertiary", push).square.btn-space 1
              q-btn(color="tertiary", push).square.btn-space 2
              q-btn(color="tertiary", push).square.btn-space 3
              q-btn(color="tertiary", push).square.btn-space 4
            p.equal.btns =
            p.info-keys {{infoKeys}}
          div.content
            q-btn(color="tertiary", push).square enter
            p.equal ou
            q-btn(color="tertiary", push).square a
            p.equal =
            q-btn(color="green-6", icon="fas fa-check", push).square
          div.content
            q-btn(color="tertiary", push).square.space-button space
            p.equal =
            q-btn(color="blue-4", icon="fas fa-share", push).square
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Info',
  data () {
    return {
      information: 'Você também pode utilizar atalhos do teclado',
      infoKeys: 'Mudar a etiqueta atual selecionada',
      showInfo: false
    }
  },
  methods: {
    ...mapActions('report', [
      'toggleReport'
    ]),
    changeInfo () {
      this.showInfo = !this.showInfo
    }
  }
}
</script>
<style lang="stylus">
.tooltip-info
  margin-bottom 5px
</style>

<style lang="stylus" scoped>
@import '~variables'
.btns
  position absolute
  right 0
  bottom 0
  margin 15px
  z-index 10000
.info-card
  position absolute
  background white
  right 0
  bottom 0
  margin-bottom 52px
  width 275px
  border-radius 4px
  p
    padding 10px 5px
    text-transform initial
    color $tertiary
    margin 0
.content
  display flex
  margin 0 auto
  justify-content center
  padding 9px 0
  &:first-of-type
    padding-top 20px
    padding-bottom 4px
.equal
  font-size 24px
  line-height 0
  padding 0
  margin-top 8px !important
  &.btns
    margin-top 30px !important
.square
  border-radius 0
.space-button
  width 100px
.btn-space
  margin 2px
.info-keys
  margin-top 14px !important
.card-title
  background $primary
  p
    color white
    padding 0
    line-height 25px
.report-btn
  margin-right 10px
  @media (max-width: 992px)
    margin-right 0
    margin-top -120px
.info-btn
  @media (max-width: 992px)
    display none
</style>
