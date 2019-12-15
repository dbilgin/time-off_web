<template>
  <div class="text-center">
    <v-menu offset-y transition="slide-y-transition" open-on-hover>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" text color="primary" rounded>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="item.action"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-tag-faces',
          title: this.$t('profile.myProfile'),
          action: () => {
            this.$router.push('/profile')
          }
        },
        {
          icon: 'mdi-location-exit',
          title: this.$t('profile.logOut'),
          action: () => {
            this.$cookies.removeAll()
            localStorage.clear()
            this.$router.push('/login')
          }
        }
      ]
    }
  }
}
</script>
