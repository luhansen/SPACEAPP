export const addItem = ({ commit }, item) => {
  commit('ADD_ITEM', item)
}

export const removeItem = ({ commit }, index) => {
  commit('REMOVE_ITEM', index)
}

export const setAll = ({ commit }, items) => {
  commit('SET_ALL', items)
}

export const reset = ({ commit }) => {
  commit('RESET')
}
