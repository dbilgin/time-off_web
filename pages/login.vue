<template>
  <v-content id="layout">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <login />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Login from '~/components/Login.vue'
export default {
  layout: 'empty',
  components: {
    Login
  }
}
</script>

<style lang="less">
#layout {
  background-image: url('/backgrounds/snowy.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
