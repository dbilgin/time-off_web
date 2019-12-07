<template>
  <v-app>
    <v-content id="layout">
      <nuxt />
    </v-content>
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
<style lang="less">
#layout {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/backgrounds/snowy.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
