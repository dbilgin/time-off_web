<template>
  <v-app
    :style="{
      background: background
    }"
  >
    <v-container v-if="!mounting">
      <v-navigation-drawer :mini-variant="drawerMinified" fixed app>
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

        <theme-picker v-if="!drawerMinified" :set-theme="setTheme" />
      </v-navigation-drawer>
      <v-app-bar
        :style="{
          background: background
        }"
        fixed
        app
        class="elevation-0"
      >
        <v-app-bar-nav-icon @click.stop="drawerMinified = !drawerMinified" />
        <v-toolbar-title v-text="title" />
        <v-spacer />
        <v-btn text color="primary" rounded>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-app-bar>
      <v-content>
        <v-container>
          <transition name="fade-pages" mode="out-in">
            <nuxt />
          </transition>
        </v-container>
      </v-content>
      <v-footer :fixed="false" app>
        <span>&copy; 2019</span>
      </v-footer>
    </v-container>
    <v-overlay v-else :value="true">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { ThemePicker } from '../components/Utils'
export default {
  components: { ThemePicker },
  data() {
    return {
      mounting: true,
      drawerMinified: false,
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
          title: 'Leave Requests',
          to: '/leave-requests'
        }
      ]
    }
  },
  computed: {
    background() {
      return this.$store.state.theme.selectedTheme
        ? this.$store.state.theme.selectedTheme.background
        : 'white'
    }
  },
  mounted() {
    setTimeout(() => {
      this.mounting = false
      this.setTheme(localStorage.getItem('theme') || 'light')
    }, 10)
  },
  methods: {
    setTheme(selectedTheme) {
      localStorage.setItem('theme', selectedTheme)
      this.$vuetify.theme.dark = selectedTheme === 'dark'
      this.$store.commit('theme/setTheme', {
        theme: this.$vuetify.theme.themes[selectedTheme],
        themeName: selectedTheme
      })
    }
  }
}
</script>
<style>
.themeSelect {
  border-radius: 24px !important;
}
</style>
