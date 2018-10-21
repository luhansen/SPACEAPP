import Vue from 'vue'
import Vuex from 'vuex'
import tagger from './tagger'
import history from './tagger-history'
import drawer from './drawer'
import imageSelections from './image-selections'
import search from './search'
import mobileMenu from './mobile-menu'
import editMode from './edit-mode'
import report from './report'
import selections from './challenge-selector'
import annotations from './annotations'

Vue.use(Vuex)

const DEBUG = process.env.NODE_ENV === 'development'

const store = new Vuex.Store({
  modules: {
    tagger,
    history,
    report,
    drawer,
    imageSelections,
    search,
    mobileMenu,
    editMode,
    selections,
    annotations
  },
  strict: DEBUG
})

export default store
