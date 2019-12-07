<template>
  <v-content id="layout">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <transition name="fade" mode="out-in">
          <login
            v-if="currentCard === cardTypes.LOGIN"
            :change-card="changeCard"
            :card-types="cardTypes"
          />
          <forgot-password
            v-if="currentCard === cardTypes.FORGOT_PASSWORD"
            :change-card="changeCard"
            :card-types="cardTypes"
          />
          <register
            v-if="currentCard === cardTypes.REGISTER"
            :change-card="changeCard"
            :card-types="cardTypes"
          />
        </transition>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { Login, ForgotPassword, Register } from '~/components/Login'
export default {
  layout: 'empty',
  components: {
    Login,
    ForgotPassword,
    Register
  },
  data: () => {
    return {
      cardTypes: {
        LOGIN: 'login',
        REGISTER: 'register',
        FORGOT_PASSWORD: 'forgot_password'
      },
      currentCard: 'login'
    }
  },
  methods: {
    changeCard(type) {
      this.$store.commit('auth/error', false)
      this.currentCard = type
    }
  }
}
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
#layout {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/backgrounds/snowy.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
