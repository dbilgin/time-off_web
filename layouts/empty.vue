<template>
  <v-app :style="{ background: $store.state.utils.selectedTheme.background }">
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
