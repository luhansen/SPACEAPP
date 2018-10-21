import Vue from 'vue'
/*
export const someMutation = (state) => {
}
*/

export const PUSH_POSITIONS = (state, positions) => {
  return Vue.set(state, 'positions', state.positions.concat(positions))
}

export const CHANGE_SELECTIONS = (state, { positionId, annotation }) => {
  let currentPosition = state.positions.find(p => p.id === positionId)
  return Vue.set(currentPosition, 'annotations', currentPosition.annotations.push(annotation))
}

export const CHANGE_CURRENT_TEXT = (state, { newIdText }) => {
  state.currentText = newIdText
}
