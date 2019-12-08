<template>
  <v-app
    :style="{
      background: selectedTheme
        ? $vuetify.theme.themes[selectedTheme].background
        : $vuetify.theme.themes.light.background
    }"
  >
    <v-navigation-drawer :mini-variant="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-select
        :items="themes"
        :value="selectedTheme"
        v-on:change="themeSelected"
        label="Select Theme"
        solo
      ></v-select>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="false" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      selectedTheme: null,
      drawer: true,
      themes: [
        { text: 'Light', value: 'light' },
        { text: 'Dark', value: 'dark' }
      ],
      title: 'Time-Off',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ]
    }
  },
  mounted() {
    let theme = localStorage.getItem('theme')
    if (!theme) {
      theme = 'light'
      localStorage.setItem('theme', theme)
    }
    this.selectedTheme = theme
  },
  methods: {
    themeSelected(value) {
      this.selectedTheme = value
      localStorage.setItem('theme', value)
      this.$vuetify.theme.dark = value === 'dark'
    }
  }
}
</script>
