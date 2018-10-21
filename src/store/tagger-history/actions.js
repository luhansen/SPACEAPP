/*
export const someAction = (state) => {
}
*/

export const updateHistory = async ({ commit, getters, state }, { id, challengeId, body, validation }) => {
  try {
    commit('ADD_POSITION_VALIDATION', { id, challengeId, body, validation })
  } catch (error) {
    console.log(error)
  }
}

export const updateHistoryValue = async ({ commit, getters, state }, obj) => {
  try {
    commit('CHANGE_POSITION_VALIDATION', obj)
  } catch (error) {
    console.log(error)
  }
}

export const createChallengeHistory = async ({ commit, getters, state }, challengeId) => {
  try {
    commit('CREATE_CHALLENGE_HISTORY', challengeId)
  } catch (error) {
    console.log(error)
  }
}

export const clearChallengeHistory = async ({ commit, getters, state }) => {
  try {
    commit('CLEAR_CHALLENGE_HISTORY')
  } catch (error) {
    console.log(error)
  }
}
