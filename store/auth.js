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
  validatePassword(context, { newPassword, newPasswordRepeat }) {
    if (
      newPassword !== newPasswordRepeat ||
      !newPassword ||
      !newPasswordRepeat
    ) {
      return false
    }
    if (newPassword.length < 8 || !newPassword.search(/^[0-9a-zA-Z]+$/)) {
      return false
    }
    return true
  },
  async resetPassword(context, { resetToken, password, confirmPassword }) {
    context.commit('loader', true)
    try {
      const response = await this.$axios.post('/api/auth/reset-password/', {
        reset_token: resetToken,
        password,
        confirm_password: confirmPassword
      })

      if (response.status === 204) {
        this.$router.push('/login')
      } else {
        context.commit('error', true)
      }
    } catch (err) {
      context.commit('error', true)
    } finally {
      context.commit('loader', false)
    }
  },
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
    context.commit('loader', true)
    const response = await this.$axios.post('/api/auth/forgot-password/', {
      email
    })
    context.commit('loader', false)
    return response
  }
}
