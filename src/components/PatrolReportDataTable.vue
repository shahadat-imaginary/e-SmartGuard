<template>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Patrols Report</v-toolbar-title>
      </v-toolbar>
      <v-row>
        <v-col md="4" offset="8">
          <v-card-title>
              <v-text-field
                v-model="search"
                append-inner-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                density="compact"
                variant="solo"
              ></v-text-field>
            </v-card-title>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col md="12">
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
          >
          <template v-slot:[`item.date`]="{ item }">
            <span>{{ new Date(item.columns.start).toDateString() }}</span>
          </template>

          <template v-slot:[`item.guard`]="{ item }">
            <span>{{ item.columns.guard.name }}</span>
          </template>

          <template v-slot:[`item.route`]="{ item }">
            <span>{{ item.columns.route.name }}</span>
          </template>

          <template v-slot:[`item.startedAt`]="{ item }">
            <span>{{ new Date(item.columns.startedAt).toLocaleTimeString() }}</span>
          </template>

          <template v-slot:[`item.completedAt`]="{ item }">
            <span>{{ item.columns.completedAt == null ? "" : new Date(item.columns.completedAt).toLocaleTimeString() }}</span>
          </template>

        </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </template>

  <script>
  import userRequest from '@/axios/request';
  export default {
    data () {
      return {
        search: '',
        headers: [
          { key: 'date', title: 'Date' },
          { key: 'guard', title: 'Guard' },
          { key: 'route', title: 'Route' },
          { key: 'startedAt', title: 'Start' },
          { key: 'completedAt', title: 'End' },
        ],
        items: [],
      }
    },
    methods: {
      retrieveAttendances() {
            userRequest.get('/patrols/attendance')
              .then((response) => {
                this.items = response.data.data.data;
                console.log("get", response.data.data.data);
              })
              .catch((e) => {
                console.log(e);
              });
        }
    },
    refreshList() {
          this.retrieveAttendances();
        },
    mounted() {
      this.retrieveAttendances();
    },
  }
</script>
