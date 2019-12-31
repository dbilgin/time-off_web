<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      @keydown.esc="setDialog(false)"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn @click="setDialog(false)" icon dark>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t('leaveRequests.request') }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn @click="saveRequest" dark text>{{
              $t('common.save')
            }}</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-list three-line subheader>
            <v-subheader>{{ $t('leaveRequests.information') }}</v-subheader>
            <v-list-item>
              <v-menu
                :close-on-content-click="false"
                v-model="startDateMenu"
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
                    v-model="startDate"
                    :label="$t('leaveRequests.startDate')"
                    :rules="[(v) => !!v || $t('validation.dateRequired')]"
                    prepend-icon="event"
                    readonly
                  />
                </template>

                <v-date-picker
                  v-model="startDate"
                  no-title
                  scrollable
                  actions
                  first-day-of-week="1"
                />
              </v-menu>
            </v-list-item>
            <v-list-item>
              <v-menu
                :close-on-content-click="false"
                v-model="endDateMenu"
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
                    v-model="endDate"
                    :label="$t('leaveRequests.endDate')"
                    :rules="[(v) => !!v || $t('validation.dateRequired')]"
                    prepend-icon="event"
                    readonly
                  />
                </template>

                <v-date-picker
                  v-model="endDate"
                  no-title
                  scrollable
                  actions
                  first-day-of-week="1"
                />
              </v-menu>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t('leaveRequests.type')
                }}</v-list-item-title>
                <v-overflow-btn
                  v-model="type"
                  :items="leaveTypes"
                  :rules="[(v) => !!v || $t('validation.typeRequired')]"
                  class="my-2"
                  target="#dropdown-example"
                ></v-overflow-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-textarea
                v-model="description"
                :placeholder="$t('leaveRequests.description')"
              />
            </v-list-item>
          </v-list>
        </v-form>
      </v-card>
    </v-dialog>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    setDialog: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      leaveTypes: [
        { value: 'maternity', text: 'Maternity' },
        { value: 'vacation', text: 'Vacation' },
        { value: 'unpaid', text: 'Unpaid' },
        { value: 'sick', text: 'Sick' }
      ],
      startDateMenu: false,
      endDateMenu: false,
      startDate: '',
      endDate: '',
      type: { value: 'sick', text: 'Sick' },
      description: '',
      valid: true,
      loading: false
    }
  },
  methods: {
    async saveRequest() {
      if (this.$refs.form.validate()) {
        this.loading = true
        await this.$axios.post('/api/leave-requests/', {
          start: this.startDate,
          end: this.endDate,
          description: this.description,
          type: this.type.value
        })
        this.loading = false
        this.setDialog(false)
      }
    }
  }
}
</script>
