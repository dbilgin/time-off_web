<template>
  <v-col cols="12" sm="8" md="4">
    <v-card class="elevation-12">
      <v-toolbar flat>
        <v-toolbar-title>Register</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            :value="username"
            label="Username"
            name="login"
            prepend-icon="person"
            type="text"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="changeCard(cardTypes.LOGIN)" text>Login</v-btn>
        <v-btn @click="login" color="primary">Register</v-btn>
      </v-card-actions>

      <v-overlay :value="loader">
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
      loader: false
    }
  },
  methods: {}
}
</script>
