<template>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Check Point List</v-toolbar-title>
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
            :items="desserts"
            :search="search"
          >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              size="small"
              class="me-2"
              @click="editItem(item.raw)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              size="small"
              @click="deleteItem(item.raw)"
            >
              mdi-delete
            </v-icon>
          </template>
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
          { key: 'name', title: 'Check Point Name' },
          { key: 'latitude', title: 'Latitude' },
          { key: 'longtitude', title: 'Longtitude' },
          { key: 'actions', title: 'Actions', sortable: false },
        ],
        desserts: [
          {
            id: 1,
            name: 'TP1',
            latitude: 11.222,
            longtitude: 58.220,
          },
          {
            id: 2,
            name: 'TP2',
            latitude: 250.33,
            longtitude: 11.2235,
          },
          {
            id: 3,
            name: 'TP3',
            latitude: 10.54,
            longtitude: 20.548,
          },
          {
            id: 4,
            name: 'TP4',
            latitude: 220.225,
            longtitude: 54.22,
          },
          {
            id: 5,
            name: 'TP6',
            latitude: 182.041,
            longtitude: 12.3456789,
          },
          {
            id: 6,
            name: 'TP7',
            latitude: 118.22,
            longtitude: 123.456789,
          },
          {
            id: 7,
            name: 'TP8',
            latitude: 61.33,
            longtitude: 145.6789,
          },
          {
            id: 8,
            name: 'TP9',
            latitude: 19.22,
            longtitude: 12.89,
          },
          {
            id: 9,
            name: 'TP10',
            latitude: 116.22,
            longtitude: 15.6789,
          },
          {
            id: 10,
            name: 'TP11',
            latitude: 11.69,
            longtitude: 16.789,
          },
          {
            id: 11,
            name: 'TP12',
            latitude: 94.56,
            longtitude: 56.02789,
          },
        ],
      }
    },
  }
</script>
