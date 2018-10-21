export const TOGGLE_REPORT = (state, newValue) => {
  if (newValue !== undefined) {
    state.showReport = newValue
  } else {
    state.showReport = !state.showReport
  }
}
