import Vue from 'vue'

export const ADD_SELECTION = (state, newSelection) => {
  state.selections.push(newSelection)
}

export const REMOVE_SELECTION = (state, index) => {
  state.selections.splice(index, 1)
}

export const SET_SELECTIONS = (state, selections) => {
  Vue.set(state, 'selections', selections)
}
