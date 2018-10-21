<template lang="pug">
div.list-icons
  div(v-for="org in organizations").org-projects
    q-btn(:key="org.id", icon="mdi-folder-multiple", round, size="12px", text-color="grey-3")
    q-card.dropdown
      div.title {{org.name}}
      div(v-for="cGroup of org.challenge_groups", @click="triggerAction(cGroup)").c-group
        q-icon(v-if="cGroup.action", name="mdi-plus-circle").icon
        | {{cGroup.name}}
        span(v-if="!cGroup.action").count {{cGroup.challenges_length}}
</template>

<script>
export default {
  name: 'ResizedOrgs',
  props: {
    organizations: {
      type: Array,
      required: true
    }
  },
  methods: {
    loadChallenges (id) {
      this.$emit('loadChallenges', id)
    },
    triggerAction (group) {
      if (group.action) {
        group.action(undefined, group.organizationId)
      } else {
        this.loadChallenges(group.id)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.icon
  padding-right 4px
.list-icons
  width 100%
  height calc(100vh - 110px)
  display flex
  flex-direction column
  padding-top 5px
  max-width 68px
  .q-btn
    border-radius 5px
    background $background-title
    margin-bottom 10px
    margin-left 7px
.dropdown
  min-width 170px
  background #505c6b
  color white
  position absolute
  top 0
  left 0
  margin-left 50px
  z-index 10
  transition all 1s ease
  display none
  border-radius 0
  .title
    padding 12px
    border-bottom solid 2px $background-title
    font-weight 600
  .c-group
    padding 10px
    display flex
    align-items center
    &:hover
      background #4A5563
      cursor pointer
      border-bottom solid 1px $background-title
      &:last-of-type
        border none
  .count
    background $grey-4
    color $grey-9
    padding 3px 6px
    border-radius 20px
    font-size 10px
    margin-left 10px
    font-weight 600
.org-projects
  position relative
  &:hover .dropdown
    display block
</style>
