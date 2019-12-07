export default function({ store, redirect, route, app: { $axios, $cookies } }) {
  const token = $cookies.get('access')
  if (!token && route.path !== '/login' && route.path !== '/reset-password/') {
    redirect('/login')
  } else {
    $axios.defaults.headers.common.Authorization = 'Bearer ' + token
  }
}
