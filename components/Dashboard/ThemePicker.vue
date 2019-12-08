<template>
  <v-btn-toggle
    @change="(index) => setTheme(index === 1 ? 'dark' : 'light')"
    :value="$store.state.utils.selectedThemeName === 'dark' ? 1 : 0"
    active-class="themeSelect"
    borderless
    dense
    group
    mandatory
  >
    <v-btn class="themeSelect">
      <v-icon color="white">mdi-circle</v-icon>
    </v-btn>
    <v-btn class="themeSelect">
      <v-icon color="black">mdi-circle</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  props: {
    setTheme: {
      type: Function,
      required: true
    }
  }
}
</script>
