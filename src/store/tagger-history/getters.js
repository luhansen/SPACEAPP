/*
export const someGetter = (state) => {
}
*/

export const history = (state, getters, param) => (challengeId) => {
  return state[`challenge${challengeId}`]
}
