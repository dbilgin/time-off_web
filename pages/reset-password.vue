<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <reset-password :token="token" />
    </v-row>
  </v-container>
</template>

<script>
import { ResetPassword } from '../components/Login'
export default {
  layout: 'background',
  components: { ResetPassword },
  data: () => {
    return {
      token: ''
    }
  },
  beforeMount() {
    const token = this.$route.query.token
    if (!token) {
      this.$router.push('/login')
    } else {
      this.token = token
    }
  }
}
</script>
