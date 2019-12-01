<template>
  <v-card class="elevation-12">
    <v-toolbar flat>
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn :href="'source'" v-on="on" icon large target="_blank">
            <v-icon>mdi-comment-question-outline</v-icon>
          </v-btn>
        </template>
        <span>Was guckst du?</span>
      </v-tooltip>
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

        <v-text-field
          id="password"
          :value="password"
          label="Password"
          name="password"
          prepend-icon="lock"
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="login" color="primary">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => {
    return {
      username: 'denizcanbilgin@gmail.com',
      password: 'jaram'
    }
  },
  methods: {
    async login(context) {
      const response = await this.$axios.post('/api/auth/token/', {
        email: this.username,
        password: this.password
      })

      if (response.status === 200 && response.data) {
        this.$cookies.set('access', response.data.access)
        this.$cookies.set('refresh', response.data.refresh)
        this.$axios.defaults.headers.common.Authorization = response.data.access
        this.$router.push('/')
      } else {
        alert(response.status)
      }
    }
  }
}
</script>
