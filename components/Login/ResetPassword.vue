<template>
  <v-col cols="12" sm="8" md="4">
    <v-card class="elevation-12">
      <v-toolbar flat>
        <v-toolbar-title>Reset Password</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <v-form @keyup.native.enter="resetPassword">
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
        <v-btn @click="resetPassword" type="submit" color="primary"
          >Submit</v-btn
        >
      </v-card-actions>
      <transition name="fade" mode="out-in">
        <v-alert
          key="storeError"
          v-if="$store.state.auth.error"
          class="mb-0 borderRadiusBottom"
          type="error"
        >
          Check your passwords and try again.
        </v-alert>
        <v-alert
          key="validationError"
          v-if="conditionError"
          class="mb-0 borderRadiusBottom"
          type="error"
        >
          Your passwords must match, be alphanumeric and also longer than 8
          characters.
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
    token: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      conditionError: false,
      newPassword: '',
      newPasswordRepeat: ''
    }
  },
  methods: {
    async resetPassword() {
      const validation = await this.$store.dispatch('auth/validatePassword', {
        newPassword: this.newPassword,
        newPasswordRepeat: this.newPasswordRepeat
      })
      if (!validation) {
        this.conditionError = true
        return
      }

      this.$store.dispatch('auth/resetPassword', {
        resetToken: this.token,
        password: this.newPassword,
        confirmPassword: this.newPasswordRepeat
      })
    },
    textFieldChange() {
      if (this.$store.state.auth.error) this.$store.commit('auth/error', false)
      if (this.conditionError) this.conditionError = false
    }
  }
}
</script>
