<template>
  <v-col cols="12" sm="8" md="4">
    <v-card class="elevation-12 pt-6">
      <v-card :style="primaryBg" class="ml-5 mr-5 elevation-12 pa-7">
        <v-toolbar :style="primaryBg" flat>
          <v-spacer />
          <v-toolbar-title class="white--text">Login</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
      </v-card>
      <v-card-text>
        <v-form @keyup.native.enter="login">
          <v-text-field
            v-model="username"
            @input="textFieldChange"
            label="Username"
            name="login"
            prepend-icon="person"
            type="text"
          />

          <v-text-field
            id="password"
            v-model="password"
            @input="textFieldChange"
            label="Password"
            name="password"
            prepend-icon="lock"
            type="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="changeCard(cardTypes.FORGOT_PASSWORD)"
          text
          class="caption"
          >Forgot Password</v-btn
        >
        <v-spacer />
        <v-btn @click="changeCard(cardTypes.REGISTER)" text color="primary"
          >Register</v-btn
        >
        <v-btn @click="login" color="primary">Login</v-btn>
      </v-card-actions>
      <transition name="fade" mode="out-in">
        <v-alert
          v-if="$store.state.auth.error"
          class="mb-0 borderRadiusBottom"
          type="error"
        >
          Wrong e-mail or password.
        </v-alert>
      </transition>
      <v-overlay :value="$store.state.auth.loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    changeCard: {
      type: Function,
      required: true
    },
    cardTypes: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      username: 'denizcanbilgin@gmail.com',
      password: 'Timeoff*1234'
    }
  },
  computed: {
    primaryBg() {
      return (
        'background-color: ' +
        this.$store.state.theme.selectedTheme.primary +
        ';'
      )
    }
  },
  methods: {
    login() {
      if (this.username && this.password) {
        this.$store.dispatch('auth/login', {
          email: this.username,
          password: this.password
        })
      }
    },
    textFieldChange() {
      if (this.$store.state.auth.error) this.$store.commit('auth/error', false)
    }
  }
}
</script>
<style scoped>
.loginToolbar {
  position: absolute;
  left: 0;
  right: 0;
  top: -30px;
}
</style>
