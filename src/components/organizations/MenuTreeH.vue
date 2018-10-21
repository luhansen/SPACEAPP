<template lang="pug">
div
  div(:class="resize ? 'resized-bar' : ''").organizations-list
    q-scroll-area(v-if="!resize").scrow
      h5 MAPAS
      q-tree(:nodes="dataTree", node-key="id", :expanded.sync="propsExpanded", dark, color="grey-1", :selected.sync="selected")
        div(slot="default-header", slot-scope="dataTree").row.items-center.cursor-pointer
          q-icon(:name="dataTree.node.icon || 'mdi-folder'", :color="dataTree.node.iconColor || 'blue'", size="28px").q-mr-sm
          div {{dataTree.node.label}}
      h5 ESPECIAIS
      q-tree(:nodes="dataTreeEsp", node-key="id", :expanded.sync="propsExpanded", dark, color="grey-1", :selected.sync="selected")
        div(slot="default-header", slot-scope="dataTreeEsp").row.items-center.cursor-pointer
          q-icon(:name="dataTreeEsp.node.icon || 'mdi-folder'", :color="dataTreeEsp.node.iconColor || 'blue'", size="28px").q-mr-sm
          div {{dataTreeEsp.node.label}}
    resized-orgs(v-else, :organizations="organizationsToResizedComponent", @loadChallenges="loadMapEmit")
    div(@click="resizeBar").resize-btn
      q-icon(:name="resize ? 'mdi-chevron-right' : 'mdi-chevron-left'", size="25px", color="grey-4")
      div.text(v-if="!resize") Recolher
</template>
<script>
import Vue from 'vue'
import ResizedOrgs from './ResizedOrgs'

export default {
  name: 'menu-tree',
  components: {
    ResizedOrgs
  },
  // props: {
  //   organizations: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data () {
    return {
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
    loadMapEmit (src, sentence, coord) {
      console.log(src, sentence)
      this.$emit('loadMap', src, sentence, coord)
    },
    resizeBar () {
      this.resize = !this.resize
    }
  },
  computed: {
    dataTree () {
      let org = []
      org.push({
        id: 'politico',
        label: 'Político',
        icon: 'mdi-earth',
        iconColor: 'light-blue-2',
        src: 'politico.jpg',
        sentence: [
          'A América do Sul é um subcontinente que compreende a porção meridional da América. A sua extensão é de 17 819 100 km², abrangendo 12% da superfície terrestre e 6% da população mundial. Une-se à América Central a norte pelo istmo do Panamá e se separa da Antártida ao sul pelo estreito de Drake',
          'A África é o terceiro continente mais extenso com cerca de 30 milhões de quilômetros quadrados, cobrindo 20,3 % da área total da terra firme do planeta. É o segundo continente mais populoso da Terra com cerca de um bilhão de pessoas, representando cerca de um sétimo da população mundial, e 54 países independentes',
          'A América do Norte é um subcontinente que compreende a porção setentrional do continente americano'
        ],
        coord: [
          '500,400,700,780',
          '750,235,1100,680',
          '200,90,600,300'
        ],
        handler: (node) => this.loadMapEmit(node.src, node.sentence, node.coord)
      },
      {
        id: 'temp',
        label: 'Temperatura',
        icon: 'mdi-temperature-celsius',
        iconColor: 'light-blue-2',
        src: 'temperatura.jpg',
        sentence: [
          'O clima em Asia é designado por clima deserto. Em Asia não existe virtualmente nenhuma pluviosidade ao longo do ano. ',
          'Verão em todo o país . Na parte central e nordeste (Kruger) , temos o clima tropical. O verão é chuvoso, com temperaturas chegando facilmente aos 35 graus',
          'Os climas da América do Norte dividem-se em: polar, temperado, subtropical, tropical e desértico.'
        ],
        coord: [
          '1000,0,1600,200',
          '750,250,1000,600',
          '50,0,620,280'
        ],
        handler: (node) => this.loadMapEmit(node.src, node.sentence, node.coord)
      },
      {
        id: 'dens',
        label: 'Densidade Demográfica',
        icon: 'mdi-human-male-female',
        iconColor: 'light-blue-2',
        src: 'demografico.jpg',
        sentence: [
          'A América do Sul é um subcontinente que compreende a porção meridional da América. A sua extensão é de 17 819 100 km², abrangendo 12% da superfície terrestre e 6% da população mundial. Une-se à América Central a norte pelo istmo do Panamá e se separa da Antártida ao sul pelo estreito de Drake',
          'A África é o terceiro continente mais extenso com cerca de 30 milhões de quilômetros quadrados, cobrindo 20,3 % da área total da terra firme do planeta. É o segundo continente mais populoso da Terra com cerca de um bilhão de pessoas, representando cerca de um sétimo da população mundial, e 54 países independentes',
          'A América do Norte é um subcontinente que compreende a porção setentrional do continente americano'
        ],
        coord: [
          '500,400,700,700',
          '800,270,1100,600',
          '20,90,600,320'
        ],
        handler: (node) => this.loadMapEmit(node.src, node.sentence, node.coord)
      })
      return org
    },
    dataTreeEsp () {
      let org = []
      org.push({
        id: 'lua',
        label: 'Lua',
        icon: 'mdi-google-circles',
        iconColor: 'light-blue-2',
        src: 'lua.jpg',
        sentence: [
          'A Lua é o único satélite natural da Terra e o quinto maior do Sistema Solar. É o maior satélite natural de um planeta no sistema solar em relação ao tamanho do seu corpo primário, tendo 27% do diâmetro e 60% da densidade da Terra, o que representa ¹⁄₈₁ da sua massa.'
        ],
        coord: [
          '0,200,1240,1000'
        ],
        handler: (node) => this.loadMapEmit(node.src, node.sentence, node.coord)
      },
      {
        id: 'marte',
        label: 'Marte',
        icon: 'mdi-checkbox-blank-circle',
        iconColor: 'light-blue-2',
        src: 'marte.jpg',
        sentence: [
          'Marte é o quarto planeta a partir do Sol, o segundo menor do Sistema Solar. Batizado em homenagem ao deus romano da guerra, muitas vezes é descrito como o "Planeta Vermelho", porque o óxido de ferro predominante em sua superfície lhe dá uma aparência avermelhada.'
        ],
        coord: [
          '0,0,1240,709'
        ],
        handler: (node) => this.loadMapEmit(node.src, node.sentence, node.coord)
      },
      {
        id: 'huble',
        label: 'Hubble',
        icon: 'mdi-star',
        iconColor: 'light-blue-2',
        src: 'hubble.jpg',
        sentence: [
          'Telescópio espacial Hubble é um satélite astronômico artificial não tripulado que transporta um grande telescópio para a luz visível e infravermelha. Foi lançado pela agência espacial estadunidense - NASA - em 24 de abril de 1990, a bordo do ônibus espacial Discovery.'
        ],
        coord: [
          '0,0,1240,695'
        ],
        handler: (node) => this.loadMapEmit(node.src, node.sentence, node.coord)
      })
      return org
    },
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
  h5
    font-family sans-serif
    font-weight bold
    color $grey-1
.cursor-pointer
  cursor pointer
.resized-bar
  width 50px
  padding 5px 0 0 0
</style>
