<template>
  <v-layout>
    <v-data-table
      :headers="headers"
      :items="leaves"
      disable-pagination
      hide-default-footer
      class="elevation-5 flex"
    >
      <template v-slot:header.start="{ header }">
        <v-icon>mdi-calendar-today</v-icon>
        {{ header.text }}
      </template>
      <template v-slot:header.end="{ header }">
        <v-icon>mdi-calendar</v-icon>
        {{ header.text }}
      </template>
      <template v-slot:item="props">
        <tr>
          <td class="text-xs">{{ props.item.start }}</td>
          <td class="text-xs">{{ props.item.end }}</td>
          <td class="text-xs">
            <v-icon>
              {{ typeIcons[props.item.type] }}
            </v-icon>
            {{
              props.item.type.charAt(0).toUpperCase() +
                props.item.type.toLowerCase().slice(1)
            }}
          </td>
          <td class="text-xs">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" :color="statusColours[props.item.status]"
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
      statusColours: {
        APPROVED: 'green',
        PENDING: 'orange',
        REJECTED: 'red'
      },
      typeIcons: {
        MATERNITY: 'mdi-human-pregnant',
        VACATION: 'mdi-white-balance-sunny',
        UNPAID: 'mdi-currency-usd-off',
        SICK: 'mdi-pill'
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
