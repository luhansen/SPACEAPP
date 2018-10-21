<template lang="pug">
  div.organizations-container
    menu-tree(@loadMap="loadMap")
    div(v-if="src !== ''").body
      img(:src="src" width="100%" alt="Planets" usemap="#planetmap")
      map(name="planetmap")
        area(v-for="area in areas" shape="rect" :coords="area.coord" alt="Sun" :href="area.speak")
    div(v-else)
      img(:src="nasaLogo" height="100%" ).nasa
</template>

<script>
import MenuTree from '../components/organizations/MenuTreeH'
import Path from 'path'

export default {
  name: 'Hacka',
  components: {
    MenuTree
  },
  data () {
    return {
      aux: ' Hello word',
      src: '',
      areas: [],
      nasaLogo: Path.join('../graphs', 'nasa.jpg')
    }
  },
  methods: {
    loadMap (src, sentence, coord) {
      console.log(sentence)
      this.src = Path.join('../graphs', src)
      this.areas = []
      for (let i = 0; i < sentence.length; i++) {
        console.log(sentence[i])
        this.areas.push({
          speak: `javascript:window.speechSynthesis.speak(new SpeechSynthesisUtterance('${sentence[i]}'));`,
          coord: coord[i]
        })
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.body
  display flex
  flex-direction column
  flex 1
  justify-content center
.nasa
 align-self center
.organizations-container
  display flex
  flex-direction row
  flex 1
.header-list
  display flex
  align-items center
  margin 25px 20px 0 25px
  padding-bottom 20px
  @media (max-width: 1100px)
    flex-direction column
.page-title
  color $tertiary
  margin 0
  font-size 26px
  .icon-title
    color $primary
    margin-right 5px
    &.inner
      margin -2px 5px 0px 5px
.del-btns
  margin 0 0 0 auto
.challenges-list
  display flex
  flex-direction column
  flex 1
  position relative
.list-scroll
  display flex
  flex 1
.list-container
  display flex
  width 100%
  flex 1
  flex-direction column
  padding 0 30px 14px 30px
  color $grey-9
  margin 0 0 16px 0
.click-notice
.dont-have-challenges
  display flex
  width 100%
  flex 1
  flex-direction column
  align-items center
  justify-content center
  margin-top -3%
  h4
    margin 0
    color $grey-9
    width 41%
    text-align center
    font-size 24px
    line-height 33px
  .q-icon
    margin-bottom 20px
  &.message
    margin-top 0
    height 65vh
.spinner__container
  text-align center
  padding 16px
.loading-challenges-spinner
  display flex
  flex 1
  justify-content center
  align-items center
.done-message
  text-align center
  padding 16px
  color $faded
  width 100%
</style>
