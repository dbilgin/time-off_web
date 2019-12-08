<template>
  <v-layout>
    <v-data-table
      :headers="headers"
      :items="leaves"
      disable-pagination
      class="elevation-5 flex"
    ></v-data-table>
  </v-layout>
</template>

<script>
import { formatDate } from '@/assets/calculate'
export default {
  data: () => {
    return {
      headers: [
        {
          text: 'Start Date',
          align: 'left',
          sortable: true,
          value: 'start'
        },
        {
          text: 'End Date',
          align: 'left',
          sortable: true,
          value: 'end'
        },
        {
          text: 'Type',
          align: 'left',
          sortable: true,
          value: 'type'
        },
        {
          text: 'Status',
          align: 'left',
          sortable: true,
          value: 'status'
        }
      ]
    }
  },
  computed: {
    leaves() {
      const asyncRequests = this.leaveRequests
      asyncRequests.forEach((asyncRequest) => {
        const start = new Date(asyncRequest.start)
        const end = new Date(asyncRequest.end)
        asyncRequest.start = formatDate(start)
        asyncRequest.end = formatDate(end)
      })
      return asyncRequests
    }
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get('/api/leave-requests')
    return { leaveRequests: data }
  }
}
</script>
