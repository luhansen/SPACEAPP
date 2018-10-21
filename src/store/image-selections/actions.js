export const addSelection = ({ commit }, newSelection) => {
  commit('ADD_SELECTION', newSelection)
}

export const removeSelection = ({ commit }, index) => {
  commit('REMOVE_SELECTION', index)
}

export const setSelections = ({ commit }, selections) => {
  commit('SET_SELECTIONS', selections)
}
