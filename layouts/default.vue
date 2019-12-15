<template>
  <v-app
    :style="{
      background: background
    }"
  >
    <v-container v-if="!mounting">
      <v-navigation-drawer
        :mini-variant="drawerMinified"
        color="rgb(78, 78, 78)"
        fixed
        app
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            active-class="active-list-item"
          >
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" class="white--text" />
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
        <account />
      </v-app-bar>
      <v-content>
        <v-container>
          <transition name="fade-pages" mode="out-in">
            <nuxt />
          </transition>
        </v-container>
      </v-content>
      <v-footer :fixed="false" app inset>
        <span>&copy; 2019</span>
      </v-footer>
    </v-container>
    <v-overlay v-else :value="true">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { ThemePicker, Account } from '../components/Dashboard'
export default {
  components: { ThemePicker, Account },
  data() {
    return {
      mounting: true,
      drawerMinified: false,
      themes: [
        { text: 'Light', value: 'light' },
        { text: 'Dark', value: 'dark' }
      ],
      title: this.$t('common.appName'),
      items: [
        {
          icon: 'mdi-apps',
          title: this.$t('dashboard.dashboard'),
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: this.$t('dashboard.leaveRequests'),
          to: '/leave-requests'
        }
      ]
    }
  },
  computed: {
    background() {
      return this.$store.state.utils.selectedTheme
        ? this.$store.state.utils.selectedTheme.background
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
      this.$store.commit('utils/setTheme', {
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
.active-list-item {
  background-color: #673ab7;
  color: #673ab7 !important;
  border-radius: 10px;
  margin: 0 10px 0 10px;
}
</style>
