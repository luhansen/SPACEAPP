<template lang="pug">
div
  create-dialog(
    v-for="(dialog, index) of creationDialogs",
    :key="index",
    :isShowing="dialog.show",
    :title="dialog.title",
    :typeTitleMessage="dialog.typeTitleMessage",
    :typeDescriptionMessage="dialog.typeDescriptionMessage",
    @clicked="dialog.clicked"
  )
  div(:class="resize ? 'resized-bar' : ''").organizations-list
    q-scroll-area(v-if="!resize").scrow
      q-tree(:nodes="dataTree", node-key="id", :expanded.sync="propsExpanded", dark, color="grey-1", :selected.sync="selected", @lazy-load="selectedGroups")
        div(slot="default-header", slot-scope="dataTree").row.items-center.cursor-pointer
          q-icon(:name="dataTree.node.icon || 'mdi-folder'", :color="dataTree.node.iconColor || 'blue'", size="28px").q-mr-sm
          div {{dataTree.node.label}}
    resized-orgs(v-else, :organizations="organizationsToResizedComponent", @loadChallenges="loadChallengesEmit")
    div(@click="resizeBar").resize-btn
      q-icon(:name="resize ? 'mdi-chevron-right' : 'mdi-chevron-left'", size="25px", color="grey-4")
      div.text(v-if="!resize") Recolher
</template>
<script>
import Vue from 'vue'
import ResizedOrgs from './ResizedOrgs'
import CreateDialog from '../generics/CreateDialog'

import {
  childrenGroupWasCreatedHelper,
  rootGroupWasCreatedHelper,
  organizationWasCreatedHelper
} from '../../helpers/queries-updater'

export default {
  name: 'menu-tree',
  components: {
    ResizedOrgs,
    CreateDialog
  },
  apollo: {
    organizations: {
      query: ALL_ORGANIZATIONS,
      update (data) {
        return data.allOrganizations
      },
      subscribeToMore: [
        {
          document: ORGANIZATION_WAS_CREATED,
          updateQuery: organizationWasCreatedHelper
        }
      ]
    },
    rootsChallengeGroup: {
      query: ROOT_CHALLENGE_GROUP,
      update (data) {
        return data.getRootChallengeGroup
      },
      subscribeToMore: [
        {
          document: CHALLENGE_GROUP_WAS_CREATED,
          updateQuery: rootGroupWasCreatedHelper
        }
      ]
    },
    childrenChallengeGroup: {
      query: CHILDREN_CHALLENGE_GROUP,
      update (data) {
        return data.getChildrenChallengeGroup
      },
      variables () {
        return {
          ids: []
        }
      },
      subscribeToMore: [
        {
          document: CHALLENGE_GROUP_WAS_CREATED,
          updateQuery: childrenGroupWasCreatedHelper
        }
      ]
    }
  },
  // props: {
  //   organizations: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data () {
    return {
      dataTree: [],
      propsExpanded: [],
      selected: null,
      resize: false,
      loaded: {},
      selectedOrganizationId: '',
      selectedParentId: '',
      creationDialogs: [
        {
          title: 'Criação de Organização',
          show: false,
          typeTitleMessage: 'Nome da organização',
          typeDescriptionMessage: 'Descrição da organização',
          clicked: this.createOrganization
        }, {
          title: 'Criação de Grupo',
          show: false,
          typeTitleMessage: 'Nome do grupo',
          typeDescriptionMessage: 'Descrição do grupo',
          clicked: this.createGroup
        }
      ]
    }
  },
  methods: {
    loadChallengesEmit (id) {
      this.$emit('loadChallenges', id)
    },
    resizeBar () {
      this.resize = !this.resize
    },
    initialTree () {
      let org = this.organizations.map(o => {
        let children = []
        this.rootsChallengeGroup.map(r => {
          if (r.organization.id === o.id) {
            children.push({
              id: `${r.id}`,
              label: r.name,
              lazy: true,
              handler: (node) => this.loadChallengesEmit(r.id)
            })
          }
        })
        children.push({
          id: 'create-groups',
          label: 'Criar grupo',
          icon: 'mdi-folder-plus',
          iconColor: 'light-blue-2',
          organization_id: o.id,
          handler: this.allowCreateGroup
        })
        return {
          id: `organization${o.id}`,
          label: o.name,
          icon: 'mdi-folder-multiple',
          children
        }
      })
      org.push({
        id: 'create-organizations',
        label: 'Nova organização',
        icon: 'mdi-folder-plus',
        iconColor: 'light-blue-2',
        handler: this.allowCreateOrganization
      })
      this.dataTree = org
    },
    async selectedGroups  ({ node, key, done, fail }) {
      let labelAux = this.rootsChallengeGroup.find(v => v.id === key)
      if (!labelAux) {
        labelAux = this.childrenChallengeGroup.find(v => v.id === key)
        if (!labelAux) {
          this.$apollo.queries.childrenChallengeGroup.setVariables({
            ids: key
          })
          await this.$apollo.queries.childrenChallengeGroup.refetch()
          labelAux = this.childrenChallengeGroup.find(v => v.id === key)
        }
      }
      let versionDataId = labelAux.children.map(child => {
        return child.id
      })
      this.$apollo.queries.childrenChallengeGroup.setVariables({
        ids: versionDataId
      })
      await this.$apollo.queries.childrenChallengeGroup.refetch()
      setTimeout(() => {
        let children = []
        this.childrenChallengeGroup.map(r => {
          children.push({
            id: `${r.id}`,
            label: `${r.name}`,
            lazy: true,
            handler: (node) => this.loadChallengesEmit(r.id)
          })
        })
        children.push({
          id: 'create-groups',
          label: 'Criar grupo',
          icon: 'mdi-folder-plus',
          iconColor: 'light-blue-2',
          organization_id: labelAux.organization.id,
          parent: labelAux.id,
          handler: this.allowCreateGroup
        })
        done(children)
      }, 1000)
    },
    async createOrganization (value, obj) {
      this.creationDialogs[0].show = false
      if (value) {
        try {
          await this.$apollo.mutate({
            mutation: CREATE_ORGANIZATION,
            variables: {
              organization: obj
            }
          })
          this.$q.notify({ message: 'Organização criada com sucesso!', color: 'positive', timeout: 2000, icon: 'mdi-check' })
        } catch (error) {
          this.$q.notify({ message: 'Erro ao criar Organização!', color: 'negative', timeout: 2000, icon: 'mdi-error' })
        }
      }
    },
    async createGroup (value, obj) {
      this.creationDialogs[1].show = false
      if (value) {
        try {
          await this.$apollo.mutate({
            mutation: CREATE_CHALLENGE_GROUP,
            variables: {
              challengeGroup: Object.assign(obj, { organization_id: Number(this.selectedOrganizationId), parent: Number(this.selectedParentId) })
            }
          })
          this.$q.notify({ message: 'Grupo criado com sucesso!', color: 'positive', timeout: 2000, icon: 'mdi-check' })
        } catch (error) {
          this.$q.notify({ message: 'Erro ao criar grupo. Contate o administrador!', color: 'negative', timeout: 2000, icon: 'mdi-error' })
        }
      }
    },
    allowCreateGroup (node = undefined, id = undefined) {
      if (node) {
        this.selectedOrganizationId = node.organization_id
        this.selectedParentId = node.parent
      }
      if (id) {
        this.selectedOrganizationId = id
      }
      this.creationDialogs[1].show = true
    },
    allowCreateOrganization (node) {
      this.creationDialogs[0].show = true
    }
  },
  computed: {
    organizationsToResizedComponent () {
      let copy = []
      for (let or of this.organizations) {
        let o = Object.assign({}, or)
        let groups = o.challenge_groups.slice()
        groups.push({
          id: `create${o.id}`,
          organizationId: o.id,
          name: 'Criar Grupo',
          action: this.allowCreateGroup
        })
        Vue.set(o, 'challenge_groups', groups)
        copy.push(o)
      }
      return copy
    }
  },
  watch: {
    organizations (newValue) {
      Vue.set(this.loaded, 'organizations', true)
    },
    rootsChallengeGroup (newValue) {
      Vue.set(this.loaded, 'groups', true)
    },
    loaded (newValue) {
      if (newValue.groups && newValue.organizations) {
        this.initialTree()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~variables'
.organizations-list
  width 300px
  flex-direction row
  background #4A5563
  transition all 0.5s ease
  // border-right solid 1px $background-title
  @media (max-width: 1024px)
    width 275px
  .scrow
    padding 12px
    height calc(100vh - 106px)
  .text
    transition all 1s ease
  .resize-btn
    align-self flex-end
    border-top solid 1px $background-title
    padding 12px
    display flex
    align-items center
    color $grey-4
    cursor pointer
    &:hover
      background $background-title
.cursor-pointer
  cursor pointer
.resized-bar
  width 50px
  padding 5px 0 0 0
</style>
