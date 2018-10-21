/*
export const someAction = (state) => {
}
*/

export const pushPositions = async ({ commit, getters, state }, positions) => {
  try {
    commit('PUSH_POSITIONS', positions)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const updateSelections = async ({ commit, getters, state }, { positionId, annotation }) => {
  try {
    commit('CHANGE_SELECTIONS', { positionId, annotation })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const updateCurrentText = async ({commit, getters, state}, newIdText) => {
  try {
    commit('CHANGE_CURRENT_TEXT', { newIdText })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
