import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify({
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#673ab7',
          secondary: '#FFFFFF',
          accent: '#f44336',
          error: '#ff5722',
          warning: '#ffeb3b',
          info: '#607d8b',
          success: '#8bc34a',
          background: '#fafafa'
        },
        dark: {
          primary: '#4caf50',
          secondary: '#4caf50',
          tertiary: '#495057',
          accent: '#82B1FF',
          error: '#f55a4e',
          info: '#00d3ee',
          success: '#5cb860',
          warning: '#ffa21a',
          background: '#383535'
        }
      }
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
