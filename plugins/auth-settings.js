export default ({ store, redirect, app: { $axios, $cookies } }) => {
  const token = $cookies.get('access')
  if (token) {
    $axios.defaults.headers.common.Authorization = token
  } else {
    redirect('/login')
  }
}
