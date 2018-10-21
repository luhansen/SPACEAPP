<template lang="pug">
  li(@click="toggleVisibility").challenge-element-container
    div.list-item
      q-checkbox(
        v-if="delVisibility",
        color="red-8",
        v-model="selectionsCopy",
        :val="challenge.id",
        @input="check(challenge.id)"
      ).del-check.animate-pop
      q-icon(
        :name="multiple(challenge) ? 'mdi-file-multiple': 'mdi-file'",
        :size="multiple(challenge) ? '21px' : '24px'",
        :title="multiple(challenge) ? 'Desafio com mais de um documento a ser analisado por vez' : 'Desafio com apenas um documento a ser analisado por vez'"
        color="blue-5"
      ).icon-list
      div {{challenge.text}}
      div.option-ribbon {{tags[challenge.option].name}}
      q-icon(name="mdi-arrow-down-drop-circle", :class="visible[index] ? 'rotate-icon' : ''", color="grey-7", size="20px").icon-arrow
    q-slide-transition
      div(v-show="visible[index]").overview
        div.description {{challenge.description ? challenge.description : 'Este desafio não contém descrição'}}
        div.values
          div.percentage
            div Completude:
              span {{formatCompletness(challenge.documentsValues || {})}}
            div Pendentes:
              span {{formatPendent(challenge.documentsValues || {})}}
            div Porcentagem:
              span {{formatProgress(challenge.documentsValues || {})}}%
            div.annotation-title Anotações:
              span {{annotationsCount.total}}
          div.labels(v-if="labels.length")
            div(v-for="(l, index) of labels", :key="index")
              span.name {{l.name}}
              span.count {{l.count}}
          div(v-else).labels
            div.dont-have Não há anotações neste desafio
          div.action-buttons
            div.active
              q-btn(
                v-if="challenge.guidelines",
                icon="mdi-school",
                round,
                color="blue-5",
                title="Mostrar diretrizes do desafio",
                @click="showGuidelines"
              ).btn-guidelines
              guidelines(
                :opened="guidelinesOpened",
                @closeGuidelines="closeGuidelines",
                :guidelines="challenge.guidelines || 'Nenhuma diretriz para o desafio'"
              )
              div.activate-action
                q-toggle(:value="challenge.active", @input="toggleChallenge(challenge, index)")
                div.label {{challenge.active ? 'Desativar' : 'Ativar'}}
            q-btn(@click="redirectToChallenge(challenge.id, index)", color="primary").redirect-btn Ir para o Desafio
</template>

<script>
import mixins from '../../helpers/mixins'
import { mapActions, mapGetters } from 'vuex'
import Guidelines from '../../components/organizations/Guidelines'

// import CHALLENGE_GROUP from '../../graphql/queries/ChallengeGroup.gql'
import TOGGLE_CHALLENGE from '../../graphql/mutations/ToggleChallenge.gql'

export default {
  name: 'ChallengeElement',
  mixins: [mixins],
  props: {
    challenge: {
      type: Object,
      required: true
    },
    delVisibility: {
      type: Boolean,
      required: true
    },
    visible: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  components: {
    Guidelines
  },
  data () {
    return {
      selectionsCopy: [],
      tags: {
        'SEGMENT': { color: 'green', name: 'Segmentação' },
        'SINGLE': { color: 'red', name: 'Seleção' },
        'MULTI': { color: 'orange', name: 'Classificação' },
        'TOKENIZER': { color: 'purple', name: 'Tokenização' },
        'PAGE': { color: 'pink', name: 'Classific. de Página' }
      },
      clickedIndex: -1,
      guidelinesOpened: false
    }
  },
  methods: {
    ...mapActions('selections', [
      'addItem',
      'removeItem',
      'setAll',
      'reset'
    ]),
    toggleVisibility () {
      this.$emit('toggleVisibility')
    },
    changeVisible () {
      this.$emit('changeVisible')
    },
    check (id) {
      let index = this.selections.indexOf(id)
      if (index !== -1) {
        this.removeItem(index)
      } else {
        this.addItem(id)
      }
      this.selectionsCopy = this.selections
    },
    redirectToChallenge (id, index) {
      this.changeVisible()
      this.$router.push(`/challenge/${id}`)
    },
    multiple (challenge) {
      return challenge.__typename === 'MultipleChallenge'
    },
    showGuidelines () {
      this.changeVisible()
      this.guidelinesOpened = true
    },
    closeGuidelines () {
      this.guidelinesOpened = false
    }
  },
  computed: {
    ...mapGetters('selections', [ 'selections' ]),
    annotationsCount () {
      return this.challenge.annotationsCount || {}
    },
    labels () {
      return this.annotationsCount.labels || []
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
.challenge-element-container
  border-top solid 1px $grey-5
  padding 15px 5px 15px 20px
  list-style-type none
  cursor pointer
  &:last-of-type
    border-bottom solid 1px $grey-5
  &:hover
    background $grey-4
  &:hover .overview
    background #cacaca !important
.list-item
  display flex
  align-items center
.del-check
  margin-right 10px
.icon-list
  margin-right 6px
  margin-top -2px
.option-ribbon
  font-size 11px
  padding 4px 6px
  margin-left 10px
  display inline-block
  border solid 1px $grey-5
  border-radius 20px
  color $grey-7
  margin-top 1px
  text-align center
  @media (max-width: 1000px)
    margin-right 10px
.overview
  font-size 14px
  background $grey-4
  margin 10px
  padding 15px
  border-radius 10px
  display flex
  flex-direction column
  .description
    font-style italic
    padding-bottom 7px
    @media (max-width: 950px)
      text-align center
      padding-bottom 0
    @media (max-width: 950px)
      text-align center
      max-width 80%
      margin 0 auto
  .values
    display flex
    @media (max-width: 950px)
      flex-direction column
  .percentage
    width 20%
    @media (max-width: 1100px)
      width 25%
    @media (max-width: 950px)
      padding 16px 0
      width 100%
    &> div
      color $grey-9
      @media (max-width: 950px)
        text-align center
      &> span
        padding-left 5px
        color $grey-8
  .labels
    flex 1
    display flex
    flex-direction column
    flex-wrap wrap
    font-size 12px
    max-height 80px
    justify-content center
    @media (max-width: 950px)
      flex-direction row
      padding-bottom 16px
    .dont-have
      align-self center
    .annotation-title
      padding-bottom 3px
    .name
      color $grey-3
      border-radius 20px
      padding 5px 10px
      background $blue-5
      line-height 30px
    .count
      padding-left 5px
      color $grey-8
      @media (max-width: 950px)
        padding-right 15px
  .action-buttons
    display flex
    flex-direction column
    @media (max-width: 950px)
      flex-direction row
      align-self center
    @media (max-width: 780px)
      flex-direction column
  .redirect-btn
    max-height 20px
    font-size 13px
    display block
    max-width 200px
    align-self flex-end
    @media (max-width: 950px)
      align-self center
      margin-left 20px
    @media (max-width: 780px)
      margin-left 0
.icon-arrow
  margin 0 0 0 auto
  transition transform 0.3s ease
.rotate-icon
  transform rotate(180deg)
.active
  display flex
  justify-content space-between
  padding 0 12% 10px 12%
  align-items center
  margin-top -5px
  @media (max-width: 950px)
    margin-top 0
.activate-action
  display flex
  flex-direction column
  align-items center
  .label
    padding-top 3px
.btn-guidelines
  margin-right 10px
</style>
