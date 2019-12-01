<template>
  <v-layout column justify-center align-center>
    <login />
  </v-layout>
</template>

<script>
import Login from '~/components/Login.vue'

export default {
  layout(context) {
    return 'error'
  },
  components: {
    Login
  }
}
</script>
