<template lang="pug">
  q-layout(ref="layout" view="lHh Lpr lFr")#q-app
    q-layout-header.header
      q-toolbar(:key="userId", v-if="needHeader" color="primary").toolbar
        header-menu(v-if="(isChallengeRouter || isAdminRouter)")
        q-toolbar-title(v-else).tooltitle
          a(v-if="!mobileView" @click="redirectToHome").challenger-logo
            img(src="../assets/images/tag-white.png").logo
          div.search(v-if="!mobileView")
            q-input(
              placeholder="Busque por um Desafio..."
              v-model="search"
              hide-underline
              :after="iconSearch"
              @input="searchChallenge"
              color="primary"
            ).search-bar
        div.set-margin
          label(v-if="admin", @click="redirectToCreator").create-challenge-label
            | Criar desafio
          div.pointer
            label.username-label
              | Olá, {{ username.split(' ')[0].replace(/\b\w/g, l => l.toUpperCase()) }}
            q-icon(name="arrow_drop_down", :class="showingPopover ? 'rotate-icon' : ''").popover-icon
            q-popover(v-model="showingPopover", anchor="bottom right", self="top right", :offset="[0, 15]").flex.column.popover
              q-btn(@mouseover.native.prevent="hideDropdown", @click="redirectToEdit", icon="edit", label="Editar perfil").content
              q-card-separator
              div(v-if="admin")
                q-btn(@mouseover.native.prevent="hideDropdown", @click="redirectToAdminPanel", icon="poll", label="Painel").content
                q-card-separator
                q-btn-dropdown(
                  ref="dropdown",
                  icon="mdi-account-group",
                  label="Usuários",
                  content-class="dropdown-content",
                  @mouseover.native.prevent="showDropdown",
                  @click.prevent="handlePopover"
                ).dropdown-options
                  q-btn(@click="redirectToApprovals", icon="mdi-account-multiple-check", label="Aprovar usuários").content
                  q-card-separator
                  q-btn(@click="redirectToUsersManagement", icon="mdi-account-edit", label="Gerenciar usuários").content
                q-card-separator
                q-btn(@mouseover.native.prevent="hideDropdown", @click="redirectToReports", icon="mdi-alert", label="Erros reportados").content
                q-card-separator
              q-btn(@mouseover.native.prevent="hideDropdown", @click="logout", icon="exit_to_app", label="Sair").content
          q-btn(v-if="!mobileView", @click="showMobileMenu", icon="menu", flat, round).mobile-menu-btn
    q-page-container.page-container
      div(:class="{ test: mobileMenuVisibility }").menu-mobile.animate-test
        ul.menu-list
          li.menu-item
            q-input(
              placeholder="Busque por um Desafio..."
              v-model="search"
              hide-underline
              :after="iconSearch"
              @input="searchChallenge"
              color="primary"
            )
          a(@click="redirectToEdit")
            li Editar Perfil
          a(@click="redirectToAdminPanel")
            li Painel
          a(@click="redirectToApprovals")
            li Aprovar Usuários
          a(@click="redirectToCreator")
            li Criar Desafio
          a(@click="redirectToReports")
            li Erros Reportados
          a(@click="logout")
            li Sair
      router-view
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import HeaderMenu from '../components/menu/Header'

import {
  QTabs,
  QRouteTab,
  QPopover,
  QBtnDropdown
} from 'quasar'

export default {
  name: 'Default',
  components: {
    HeaderMenu,
    QTabs,
    QRouteTab,
    QPopover,
    QBtnDropdown
  },
  data () {
    return {
      user: {},
      isShowing: false,
      showingPopover: false,
      search: '',
      iconSearch: [
        {
          icon: 'search',
          handler: () => {
            if (!this.isChallengesSelection) {
              this.redirectToHome()
            }
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters('drawer', [
      'mobileView'
    ]),
    needHeader () {
      return ((this.isChallengeRouter && this.mobileView) ||
        (this.isAdminRouter && this.mobileView)) ||
        (!this.isChallengeRouter && !this.isAdminRouter)
    },
    admin () {
      return (this.user || {}).role === 'admin'
    },
    userId () {
      return (this.user || {}).id || ''
    },
    username () {
      return (this.user || {}).name || ''
    },
    ...mapGetters('mobileMenu', [
      'mobileMenuVisibility'
    ]),
    isChallengeRouter () {
      return this.$route.path.match('challenge/')
    },
    isAdminRouter () {
      return this.$route.path.match('admin')
    },
    isChallengesSelection () {
      return this.$route.path === '/'
    }
  },
  methods: {
    ...mapActions('search', [
      'changeSearch'
    ]),
    ...mapActions('mobileMenu', [
      'changeMobileMenuVisibility'
    ]),
    async showDropdown (event) {
      if (this.isShowing === false) {
        await this.$refs.dropdown.show()
        this.isShowing = true
      }
      // this.$refs.dropdown.click(event)
    },
    async hideDropdown (event) {
      if (this.isShowing === true) {
        await this.$refs.dropdown.hide()
        this.isShowing = false
      }
    },
    handlePopover () {
      this.isShowing = !this.isShowing
    },
    async logout () {
      try {
        this.$q.notify({message: 'Você saiu do sistema!', color: 'positive', timeout: 2000, icon: 'exit_to_app'})
      } catch (error) {
        console.log(error)
      }
    },
    redirectToHome () {
      this.$router.push('/')
      this.changeSearch('')
      this.search = ''
      this.changeMobileMenuVisibility(false)
    },
    searchChallenge () {
      this.changeSearch(this.search)
    },
    redirectToEdit () {
      this.$router.push('/edit-profile')
      this.changeMobileMenuVisibility(false)
    },
    redirectToAdminPanel () {
      this.$router.push('/admin-panel')
      this.changeMobileMenuVisibility(false)
    },
    redirectToCreator () {
      this.$router.push('/challenge-creator')
      this.changeMobileMenuVisibility(false)
    },
    redirectToReports () {
      this.$router.push('/reports')
      this.changeMobileMenuVisibility(false)
    },
    redirectToApprovals () {
      this.$router.push('/approvals')
      this.changeMobileMenuVisibility(false)
    },
    redirectToUsersManagement () {
      this.$router.push('/users-management')
      this.changeMobileMenuVisibility(false)
    },
    showMobileMenu () {
      this.changeMobileMenuVisibility(!this.mobileMenuVisibility)
    }
  },
  watch: {
    showingPopover () {
      this.isShowing = false
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
#q-app
  display flex
  overflow hidden
  height 0px

.animate-test
  max-height 0px
  overflow hidden
  transition max-height 0.377s ease !important
  &.test
    max-height 100%

.challenger-logo
  cursor pointer
  max-width 35px
  height 37px !important
  display block
  margin-right 10px
  .logo
    width 100%
    height 100%

.flex-1
  flex-grow 1

.title-text
  cursor pointer
  align-self center
  padding-left 16px

.navigation-links__container
  display flex
  justify-content flex-end

.page-container
  flex 1
  overflow hidden
  display flex
  background white
  flex-direction column

.router-view
  overflow hidden

.set-margin
  display flex
  margin-right 8px
  @media (max-width: 414px)
    margin-right 0

.pointer
.username-label
  cursor pointer
  @media (max-width: 414px)
    display none

.popover
  box-shadow 0px 3px 8px 1px #00000047
  border-radius 2px
  display flex
  min-width 170px
  max-height 85vh !important
  .q-card-separator
    padding 0
.content
  width 100%
  height 45px
  padding 8px
  box-shadow none
  color $grey-9
  i
    color $primary
  .q-btn-inner
    justify-content left !important
  text-transform none
  text-align left !important
  &:hover
    background #eee

.icon
  cursor pointer
  grid-area icon
  text-align left

.text-label
  margin-left 8px
  cursor pointer
  grid-area label
  display flex
  text-align left
  align-items center

.popover-icon
  transition transform 0.3s ease

.rotate-icon
  transform rotate(180deg)

.toolbar
  justify-content space-between

.tooltitle
  display flex
  flex-direction row
  align-items center
  margin 6px 0

.search
  flex 1
  position relative
  max-width 400px
  @media (max-width: 414px)
    display none

.search-bar
  height 100%
  width 100%
  padding 3px 12px 5px 12px!important
  margin 6px 0 4px
  border 1px solid #ccc
  background #fafafa
  color #444
  font-size 12px
  line-height normal
  box-sizing border-box
  border-radius 2px
  margin 0
.menu-mobile
  width 100%
  background white
  box-shadow inset 0px -72px 16px -75px rgba(0,0,0,0.5)
  transition all 2s linear
  ul
    width 100%
    list-style-type none
    padding 0
    margin 0
    li
      color #333
      padding 11px 20px
      border-bottom solid 1px #ccc
.mobile-menu-btn
  display none
  @media (max-width: 414px)
    display block

.create-challenge-label
  cursor pointer
  padding-right 16px
  @media (max-width: 414px)
    display none
.dropdown-options
  padding 8px !important
  box-shadow none !important
  border-radius none !important
  i
    color $primary !important
  i:last-child
    transform rotate(90deg)
    margin 0
    margin-left 50px
  text-transform none
  .q-btn-inner
    justify-content left !important
  color $grey-9
  width 100%
.dropdown-content
  top 144px !important
  left calc(100% - 364px) !important
</style>
