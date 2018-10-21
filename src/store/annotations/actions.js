export const addAnnotationItem = ({ commit }, item) => {
  commit('ADD_ITEM', item)
}

export const upsertAnnotationItem = ({ commit }, obj) => {
  commit('UPSERT_ITEM', obj)
}

export const removeAnnotationItem = ({ commit }, index) => {
  commit('REMOVE_ITEM', index)
}

export const setAnnotations = ({ commit }, items) => {
  commit('SET', items)
}

export const resetAnnotations = ({ commit }) => {
  commit('RESET')
}
