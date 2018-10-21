<template lang="pug">
div.container
  div.menu
    div.challenge-title
      h5 Desafio
      p {{ challengeTitle }}
    q-card-separator
    div(v-if="challengeDescription !== ''").challenge-description
      h5 Descrição
      q-scroll-area.content
        p {{ challengeDescription }}
    q-card-separator
    div.progress
      h5 Progresso
      ul.progress-stats
        li Feitos
        li {{ currentChallengeNotedSize }}
      ul.progress-stats
        li Pendentes
        li {{ currentChallengePendentSize }}
      ul.progress-stats
        li Total
        li {{ totalDocumentsSize || 0 }}
      div.progress-content
        q-progress(:percentage="calculatePercentage()" color="white" stripe).progress-bar
        label.progress-percentage {{ calculatePercentage() || 0 }}%
    q-card-separator
    div.history(v-if="currentChallengeNotedSize >= 0")
      h5 Histórico
      q-scroll-area.scroll-area
        history-cards(:challengeId="challenge.id" @select="select")
  div.back
    q-btn(color="primary" @click="backOne").btn-back Voltar
</template>

<script>
import HistoryCards from './HistoryCards'

import { QScrollArea } from 'quasar'
import { mapActions } from 'vuex'

export default {
  name: 'drawer-menu',
  components: {
    HistoryCards,
    QScrollArea
  },
  props: {
    challenge: {
      type: Object
    }
  },
  computed: {
    challengeTitle () {
      return (this.challenge || {}).text
    },
    challengeDescription () {
      return (this.challenge || {}).description
    },
    documentsValues () {
      return (this.challenge || {}).documentsValues
    },
    currentChallengePendentSize () {
      return (this.documentsValues || {}).pendentDocumentsSize
    },
    totalDocumentsSize () {
      return (this.documentsValues || {}).documentsSize
    },
    currentChallengeNotedSize () {
      return (this.documentsValues || {}).notedDocumentsSize
    }
  },
  methods: {
    ...mapActions('search', [
      'changeSearch'
    ]),
    backOne () {
      this.$router.go(-1)
      this.changeSearch('')
    },
    select (item) {
      this.$emit('select', item)
    },
    calculatePercentage () {
      return Number(((this.currentChallengeNotedSize / this.totalDocumentsSize) * 100).toFixed(0))
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.challenge-description
  max-height 200px
  display flex
  flex-direction column
  h5
    padding 0 16px
  .content
    height 100px
    text-align justify
    padding 0 16px
    color #b9b9b9
    overflow auto

.menu
  flex 1
  display flex
  flex-direction column

.container
  display flex
  flex-direction column
  justify-content space-between
  background $background-primary
  color $color-title
  height 100%

.challenge-title
  padding 20px 16px
  h5
    margin-top 0
    font-size 16px
    font-weight 900
    text-transform uppercase
    margin-bottom 5px
  p
    color #b9b9b9
    font-size 16px
    margin-bottom 0

.progress
  display flex
  flex-direction column
  justify-self center
  padding 16px
  h5
    margin-top 0px

ul.progress-stats
  padding 0
  margin 0 0 5px 0
  display flex
  flex-direction row
  list-style-type none
  justify-content space-between
  &:last-of-type
    padding-bottom 10px
  li
    font-size 14px
    font-weight 900
    &:first-of-type
      text-transform uppercase
      color #b9b9b9

h5
  font-size 16px
  font-weight 900
  text-transform uppercase
  margin-bottom 10px

.progress-content
  display grid
  grid-template-columns 85% auto
  align-items center
  grid-template-areas "bar percentage"

.progress-bar
  grid-area bar
  height 12px
  border-radius 30px

.progress-percentage
  grid-area percentage
  text-align right
  font-size 14px
  font-weight 900

.history
  padding 16px 0 16px 16px
  justify-self stretch
  display flex
  flex-direction column
  flex 1

.scroll-area
  flex 1
  padding-right 16px

.interface-selection
  grid-area selection
  background #fff
  color #444
  font-family inherit
  font-size 16px
  height 1.5em
  border-radius 4px
  border none
  width 130px

.page
  justify-self center

.q-card-separator
  height 1px
  background $background-title

.back
  width 100%
  padding 16px
  .btn-back
    width 100%
</style>
