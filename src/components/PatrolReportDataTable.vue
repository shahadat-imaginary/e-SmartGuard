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
        </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </template>

  <script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            align: 'start',
            key: 'id',
            sortable: false,
            title: '#',
          },
          { key: 'date', title: 'Date' },
          { key: 'shiftTime', title: 'Shift Time' },
          { key: 'guardInfo', title: 'Guard' },
          { key: 'route', title: 'Route' },
          { key: 'scannedAt', title: 'Scanned At', sortable: false },
        ],
        items: [
          {
            id: 1,
            date:'17/06/2023',
            shiftTime: '03:00pm - 11:00pm',
            guardInfo: 'PENGAWAL KEDUA, 013-2626566',
            route: 'CP, CP2',
            scannedAt: '-',
          },
          {
            id: 2,
            date:'20/06/2023',
            shiftTime: '07:00am - 03:00am',
            guardInfo: 'TP2',
            route: 'CP3, CP2',
            scannedAt: '-',
          },
          {
            id: 3,
            date:'23/06/2023',
            shiftTime: '08:00am - 08:00pm',
            guardInfo: 'TP3',
            route: 'CP4, CP3',
            scannedAt: '-',
          },
        ],
      }
    },
  }
</script>
