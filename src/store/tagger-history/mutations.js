import Vue from 'vue'

export const ADD_POSITION_VALIDATION = (state, { id, challengeId, body, validation }) => {
  const key = `challenge${challengeId}`
  state[key].push({ id, challengeId, body, validation })
}

export const CHANGE_POSITION_VALIDATION = (state, { index, validation, challengeId }) => {
  const key = `challenge${challengeId}`
  Vue.set(state[key], index, Object.assign(state[key][index], { validation }))
}

export const CREATE_CHALLENGE_HISTORY = (state, challengeId) => {
  const key = `challenge${challengeId}`
  Vue.set(state, key, [])
}

export const CLEAR_CHALLENGE_HISTORY = (state) => {
  Vue.delete(state, Object.keys(state))
}
