<template>
  <v-col cols="12" sm="8" md="4">
    <v-card class="elevation-12">
      <v-toolbar flat>
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer />
        <v-btn @click="changeCard(cardTypes.FORGOT_PASSWORD)" text
          >Forgot Password</v-btn
        >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn :href="'source'" v-on="on" icon large target="_blank">
              <v-icon>mdi-comment-question-outline</v-icon>
            </v-btn>
          </template>
          <span>Was guckst du?</span>
        </v-tooltip>
      </v-toolbar>
      <v-alert
        v-if="$store.state.auth.error"
        type="error"
        style="border-radius: 0;"
      >
        Wrong e-mail or password.
      </v-alert>
      <v-card-text>
        <v-form>
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
        <v-spacer />
        <v-btn @click="changeCard(cardTypes.REGISTER)" text color="secondary"
          >Register</v-btn
        >
        <v-btn @click="login" color="primary">Login</v-btn>
      </v-card-actions>
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
      password: 'jaram'
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
      this.$store.commit('auth/error', false)
    }
  }
}
</script>
