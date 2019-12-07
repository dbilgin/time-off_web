export const state = () => ({
  error: false,
  loading: false
})

export const mutations = {
  loader(state, status) {
    state.loading = status
  },
  error(state, status) {
    state.error = status
  }
}

export const actions = {
  async login(context, { email, password }) {
    context.commit('loader', true)
    try {
      const response = await this.$axios.post('/api/auth/token/', {
        email,
        password
      })

      if (response.status === 200 && response.data) {
        this.$cookies.set('access', response.data.access)
        this.$cookies.set('refresh', response.data.refresh)
        this.$axios.defaults.headers.common.Authorization = response.data.access
        this.$router.push('/')
      } else {
        context.commit('error', true)
      }
    } catch (err) {
      context.commit('error', true)
    } finally {
      context.commit('loader', false)
    }
  },
  async forgotPassword(context, { email }) {
    const response = await this.$axios.post('/api/auth/forgot-password/', {
      email
    })
    return response
  }
}
