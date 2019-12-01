<template>
  <v-layout
    column
    justify-center
    align-center
    style="background-image: url('/v.png');"
  >
    <login />
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Login from '~/components/Login.vue'
export default Vue.extend({
  layout: 'empty',
  components: {
    Login
  }
})
</script>
