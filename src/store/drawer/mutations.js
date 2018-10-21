export const UPDATE_TOTAL = (state, total) => {
  state.total = total
}

export const TOGGLE_DRAWER = (state, newValue) => {
  if (newValue !== undefined) {
    state.displayDrawer = newValue
  } else {
    state.displayDrawer = !state.displayDrawer
  }
}

export const FORCE_HIDE = (state, newMobileView) => {
  state.mobileView = newMobileView
}
