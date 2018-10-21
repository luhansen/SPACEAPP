<template lang="pug">
div.challenges-list
      div.header-list
        h4.page-title
          q-icon(name="mdi-folder").icon-title
          | {{currentOrganizationName}}
          q-icon(name="mdi-arrow-right-thick").icon-title.inner
          | {{currentChallengeGroupName}}
        delete-buttons(
          v-if="currentChallenges.length > 0",
          :selectionLength="selections.length",
          :deletingMode="deletingMode"
          :isDeleting="isDeleting",
          @allowDialog="showDialog = true",
          @showDeleteFields="showDeleteFields",
          @cancelDelete="cancelDelete"
        ).del-btns
      q-scroll-area(:key="challengeGroup.id", v-if="currentChallenges.length > 0").list-scroll
        ul.list-container
          q-infinite-scroll(ref="infiniteScroll", :handler="loadMoreChallenges").flex.column
            challenge-element(
              v-for="(challenge, index) of currentChallenges",
              :key="challenge.id",
              :challenge="challenge",
              :delVisibility="delVisibility",
              :visible="visible",
              :index="index",
              @toggleVisibility="toggleVisibility(index)",
              @changeVisible="changeVisible(index)",
              @changeSelections="changeSelections(index)"
            )
            div(slot="message").spinner__container
              q-spinner(size="32px", color="faded")
            div(v-if="isDoneLoading").done-message
              span Fim dos desafios
      div(v-else-if="isLoadingChallenges && currentChallenges.length === 0").loading-challenges-spinner
        q-spinner(size="48px", color="faded")
      div(v-else).dont-have-challenges.message
        q-icon(name="mdi-alert-circle", color="blue-5", size="20vh").animate-pop
        h4.animate-pop {{searchValue.length ? 'Nenhum desafio encontrado' : 'Não há nenhum desafio neste projeto'}}
</template>
<script>
export default {
  name: 'Organizations',
  data () {
    return {
      visible: {}
    }
  },
  props: {
    delVisibility: {

    },
    deletingMode: {

    }
  }
  methods: {
    ...mapActions('selections', [
      'reset'
    ]),
    showDeleteFields () {
      this.delVisibility = !this.delVisibility
      this.deletingMode = true
    },
    cancelDelete () {
      this.delVisibility = false
      this.deletingMode = false
    },
    changeVisible (index) {
      this.visible.index = true
    },
    toggleVisibility (index) {
      Vue.set(this.visible, index, !this.visible[index])
    },
  },
  computed: {
    ...mapGetters('selections', [ 'selections' ]),
    currentOrganizationName () {
      return (this.challengeGroup.organization || {}).name
    },
    currentChallengeGroupName () {
      return (this.challengeGroup || {}).name
    },
    currentChallenges () {
      if (this.searchValue.trim() === '') {
        return (this.challenges || []).slice()
      } else {
        return (this.filteredChallenges || []).slice()
      }
    },
  }
}
  
</script>