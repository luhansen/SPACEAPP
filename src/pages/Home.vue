<template lang="pug">
  div.home
    organizations(v-if="isAdmin")
    challenges-selection(v-else)
</template>

<script>
import { GC_USER_ROLE } from '../constants/settings'
import Organizations from './Organizations'
import ChallengesSelection from './ChallengesSelection'

export default {
  name: 'Home',
  components: {
    Organizations,
    ChallengesSelection
  },
  computed: {
    isAdmin () {
      return localStorage.getItem(GC_USER_ROLE) === 'admin'
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  display flex
  flex 1
</style>
