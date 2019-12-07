<template>
  <v-col cols="12" sm="8" md="4">
    <v-card class="elevation-12">
      <v-toolbar flat>
        <v-toolbar-title>Reset Password</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <transition name="fade" mode="out-in">
        <v-alert v-if="matchError" type="error" style="border-radius: 0;">
          Check your passwords and try again.
        </v-alert>
        <v-alert
          v-if="$store.state.auth.error"
          type="error"
          style="border-radius: 0;"
        >
          An error has occurred.
        </v-alert>
      </transition>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="newPassword"
            @input="textFieldChange"
            label="New Password"
            name="password"
            prepend-icon="lock"
            type="password"
          />

          <v-text-field
            id="password"
            v-model="newPasswordRepeat"
            @input="textFieldChange"
            label="Repeat New Password"
            name="passwordRepeat"
            prepend-icon="lock"
            type="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="resetPassword" color="primary">Submit</v-btn>
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
    token: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      matchError: false,
      newPassword: '',
      newPasswordRepeat: ''
    }
  },
  methods: {
    resetPassword() {
      if (
        this.newPassword !== this.newPasswordRepeat ||
        !this.newPassword ||
        !this.newPasswordRepeat
      ) {
        this.matchError = true
        return
      }
      this.$store.dispatch('auth/resetPassword', {
        resetToken: this.token,
        password: this.newPassword,
        confirmPassword: this.newPasswordRepeat
      })
    },
    textFieldChange() {
      if (this.matchError) this.matchError = false
      if (this.$store.state.auth.error) this.$store.commit('auth/error', false)
    }
  }
}
</script>
