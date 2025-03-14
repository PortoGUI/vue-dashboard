import { reactive } from 'vue'

const userInitialState = {
  currentUser: {}
}

let state = reactive(userInitialState)

export default state

export function resetUserStore() {
  state = reactive(userInitialState)
}

export function clearCurrentUser() {
  state.currentUser = {}
}

export function setCurrentUser(user) {
  state.currentUser = user
}

export function setAPIKey(apiKey) {
  const currentUser = { ...state.currentUser, apiKey }
  state.currentUser = currentUser
}
