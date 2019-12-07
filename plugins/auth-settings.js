export default ({ store, redirect, app: { $axios, $cookies } }) => {
  const token = $cookies.get('access')
  if (token) {
    $axios.defaults.headers.common.Authorization = 'Bearer ' + token
  }

  $axios.interceptors.response.use(
    function(response) {
      return response
    },
    function(error) {
      if (error.response.status === 401) {
        redirect('/login')
      } else {
        return Promise.reject(error)
      }
    }
  )
}
