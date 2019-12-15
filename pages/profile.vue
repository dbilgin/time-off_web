<template>
  <v-layout column justify-center align-center>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="userData.first_name"
          :rules="[
            (v) => !!v || $t('validation.nameRequired'),
            (v) => (v && v.length >= 2) || $t('validation.nameValidLength')
          ]"
          :label="$t('profile.firstName')"
          required
        />

        <v-text-field
          v-model="userData.last_name"
          :rules="[
            (v) => !!v || $t('validation.nameRequired'),
            (v) => (v && v.length >= 2) || $t('validation.nameValidLength')
          ]"
          :label="$t('profile.lastName')"
          required
        />

        <v-text-field
          v-model="userData.email"
          :rules="[
            (v) => !!v || $t('validation.emailRequired'),
            (v) => /.+@.+\..+/.test(v) || $t('validation.emailValid')
          ]"
          :label="$t('profile.email')"
          required
        />

        <v-select
          v-model="userData.gender"
          :items="genders"
          :rules="[(v) => !!v || $t('validation.genderRequired')]"
          :label="$t('profile.gender')"
          required
        />

        <!-- <v-date-picker v-model="userData.birth_date"></v-date-picker> -->

        <v-menu
          :close-on-content-click="false"
          v-model="dateMenu"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              slot="activator"
              v-on="on"
              v-model="userData.birth_date"
              :label="$t('profile.birthdate')"
              prepend-icon="event"
              readonly
            />
          </template>

          <v-date-picker
            v-model="userData.birth_date"
            no-title
            scrollable
            actions
          >
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel" flat color="primary">Cancel</v-btn>
                <v-btn @click="save" flat color="primary">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>

        <v-btn
          :disabled="!valid"
          @click="validate"
          color="success"
          class="mr-4"
        >
          {{ $t('common.save') }}
        </v-btn>
      </v-form>
    </v-container>
  </v-layout>
</template>
<script>
export default {
  data: () => {
    return {
      dateMenu: false,
      valid: true,
      genders: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ]
    }
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get('/api/auth/me/')
    return { userData: data }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
      } else {
        alert('hi')
      }
    }
  }
}
</script>
