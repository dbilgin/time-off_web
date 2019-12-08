export const state = () => ({
  locale: 'en',
  selectedTheme: {
    primary: '#673ab7',
    secondary: '#FFFFFF',
    accent: '#f44336',
    error: '#ff5722',
    warning: '#ffeb3b',
    info: '#607d8b',
    success: '#8bc34a',
    background: '#fafafa'
  },
  selectedThemeName: 'light'
})

export const mutations = {
  setTheme(state, { theme, themeName }) {
    state.selectedTheme = theme
    state.selectedThemeName = themeName
  }
}
