<template>
  <v-col cols="12" sm="8" md="4"> </v-col>
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
