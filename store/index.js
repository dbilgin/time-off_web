export const state = () => ({
  authenticated: false
})

export const mutations = {
  authenticate(state, authentication) {
    state.authenticated = authentication
  }
}
