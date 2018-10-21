export const updateTotal = ({ commit }, total) => {
  commit('UPDATE_TOTAL', total)
}

export const toggleDrawer = ({ commit }, newValue = undefined) => {
  commit('TOGGLE_DRAWER', newValue)
}

export const forceHide = ({ commit }, newValue = undefined) => {
  commit('FORCE_HIDE', newValue)
}
