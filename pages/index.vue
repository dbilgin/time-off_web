<template>
  <v-layout column justify-center align-center>
    <nuxt-link to="/login">To Login</nuxt-link>
    <nuxt-link to="/inspire">Inspire</nuxt-link>

    <v-list-item
      v-for="(leaveRequest, index) in leaveRequests"
      :key="'leave' + index"
      two-line
    >
      <v-list-item-content>
        <v-list-item-title>{{ leaveRequest.description }}</v-list-item-title>
        <v-list-item-subtitle>{{
          JSON.stringify(leaveRequest)
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get('/api/leave-requests')
    return { leaveRequests: data }
  }
}
</script>
