<template>
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
</template>

<script>
import { Login, ForgotPassword, Register } from '~/components/Login'
export default {
  layout: 'background',
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
