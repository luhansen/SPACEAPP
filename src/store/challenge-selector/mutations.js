export const ADD_ITEM = (state, item) => {
  state.items.push(item)
}

export const REMOVE_ITEM = (state, index) => {
  state.items.splice(index, 1)
}

export const SET_ALL = (state, items) => {
  state.items = items
}

export const RESET = (state) => {
  state.items = []
}
