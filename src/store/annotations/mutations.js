import Vue from 'vue'

export const ADD_ITEM = (state, item) => {
  state.items = [...state.items, item]
}

export const UPSERT_ITEM = (state, { item, index }) => {
  Vue.set(state.items, index, Object.assign({}, item))
}

export const REMOVE_ITEM = (state, index) => {
  state.items.splice(index, 1)
}

export const SET = (state, items) => {
  state.items = items
}

export const RESET = (state) => {
  state.items = []
}
