<template>
  <v-col cols="12" sm="8" md="4">
    <v-card class="elevation-12">
      <v-toolbar flat>
        <v-toolbar-title>Forgot Password</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <transition name="fade" mode="out-in">
          <v-form v-if="!emailSent">
            <v-text-field
              :value="username"
              label="Username"
              name="login"
              prepend-icon="person"
              type="text"
            />
          </v-form>
          <v-row v-else fluid class="justify-center align-center ml-5 mr-5">
            <v-col md="auto" sm="auto" xs="auto" lg="auto" xl="auto"
              ><v-icon x-large color="success">mdi-check-circle</v-icon></v-col
            >
            <v-col>
              Please check your e-mail for the password reset link.
            </v-col>
          </v-row>
        </transition>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="changeCard(cardTypes.LOGIN)" text>Login</v-btn>
        <v-btn v-if="!emailSent" @click="forgotPassword" color="primary"
          >Submit</v-btn
        >
      </v-card-actions>
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
      emailSent: false
    }
  },
  methods: {
    async forgotPassword() {
      if (this.username) {
        await this.$store.dispatch('auth/forgotPassword', {
          email: this.username
        })
        this.emailSent = true
      }
    }
  }
}
</script>
