<template>
  <v-layout>
    <v-data-table
      :headers="headers"
      :items="leaves"
      disable-pagination
      class="elevation-5 flex"
    >
      <template v-slot:item="props">
        <tr>
          <td class="text-xs">{{ props.item.start }}</td>
          <td class="text-xs">{{ props.item.end }}</td>
          <td class="text-xs">{{ props.item.type }}</td>
          <td class="text-xs">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" :color="statusTypeColours[props.item.status]"
                  >mdi-circle</v-icon
                >
              </template>
              <span>{{
                props.item.status.charAt(0).toUpperCase() +
                  props.item.status.toLowerCase().slice(1)
              }}</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import { formatDate } from '@/assets/calculate'
export default {
  data: () => {
    return {
      statusTypeColours: {
        APPROVED: 'green',
        PENDING: 'orange',
        REJECTED: 'red'
      }
    }
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t('leaveRequests.startDate'),
          align: 'left',
          sortable: true,
          value: 'start'
        },
        {
          text: this.$t('leaveRequests.endDate'),
          align: 'left',
          sortable: true,
          value: 'end'
        },
        {
          text: this.$t('leaveRequests.type'),
          align: 'left',
          sortable: true,
          value: 'type'
        },
        {
          text: this.$t('leaveRequests.status'),
          align: 'left',
          sortable: true,
          value: 'status'
        }
      ]
    },
    leaves() {
      const asyncRequests = this.leaveRequests
      if (asyncRequests) {
        asyncRequests.forEach((asyncRequest) => {
          const start = new Date(asyncRequest.start)
          const end = new Date(asyncRequest.end)
          asyncRequest.start = formatDate(start)
          asyncRequest.end = formatDate(end)
        })
      }
      return asyncRequests
    }
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get('/api/leave-requests')
    return { leaveRequests: data }
  }
}
</script>
