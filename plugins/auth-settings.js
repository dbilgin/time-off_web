export default ({ store, redirect, app: { $axios, $cookies } }) => {
  $axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.config && error.response && error.response.status === 401) {
        return refreshToken($axios, $cookies.get('refresh'))
          .then((response) => {
            if (response.status === 200 && response.data) {
              const token = response.data.access
              $cookies.set('access', token)
              $axios.defaults.headers.common.Authorization = 'Bearer ' + token
              error.config.headers.Authorization = 'Bearer ' + token
              return $axios.request(error.config)
            } else {
              redirect('/login')
            }
          })
          .catch(() => {
            redirect('/login')
          })
      }

      return Promise.reject(error)
    }
  )

  const token = $cookies.get('access')
  if (token) {
    $axios.defaults.headers.common.Authorization = 'Bearer ' + token
  }
}

const refreshToken = ($axios, refresh) => {
  return $axios.post('/api/auth/refresh/', {
    refresh
  })
}
