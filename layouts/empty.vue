<template>
  <v-app :style="{ background: $vuetify.theme.themes['light'].background }">
    <nuxt />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      theme: undefined
    }
  },
  mounted() {
    this.theme = localStorage.getItem('theme')
  }
}
</script>
