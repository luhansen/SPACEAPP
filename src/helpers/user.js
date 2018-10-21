import { GC_USER_ID, GC_AUTH_TOKEN, GC_USER_ROLE } from '../constants/settings'
import store from '../store'

function logout () {
  localStorage.removeItem(GC_USER_ID)
  localStorage.removeItem(GC_AUTH_TOKEN)
  localStorage.removeItem(GC_USER_ROLE)
  localStorage.removeItem('interval')
  store.dispatch('history/clearChallengeHistory')
}

export {
  logout
}
