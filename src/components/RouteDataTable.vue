<template>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Route List</v-toolbar-title>
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
          { key: 'name', title: 'Route Name' },
          { key: 'checkpoint', title: 'Check Point List' },
          { key: 'actions', title: 'Actions', sortable: false },
        ],
        desserts: [
          {
            id: 1,
            name: 'TP1',
            checkpoint: 'CP, CP2',
          },
          {
            id: 2,
            name: 'TP2',
            checkpoint: 'CP3, CP2',
          },
          {
            id: 3,
            name: 'TP3',
            checkpoint: 'CP4, CP3',
          },
          {
            id: 4,
            name: 'TP4',
            checkpoint: 'CP5, CP7',
          },
          {
            id: 5,
            name: 'TP6',
            checkpoint: 'CP, CP2',
          },
          {
            id: 6,
            name: 'TP7',
            checkpoint: 'CP8, CP4',
          },
          {
            id: 7,
            name: 'TP8',
            checkpoint: 'CP1, CP2',
          },
          {
            id: 8,
            name: 'TP9',
            checkpoint: 'CP5, CP8',
          },
          {
            id: 9,
            name: 'TP10',
            checkpoint: 'CP, CP2',
          },
          {
            id: 10,
            name: 'TP11',
            checkpoint: 'CP7, CP1',
          },
          {
            id: 11,
            name: 'TP12',
            checkpoint: 'CP6, CP3',
          },
        ],
      }
    },
  }
</script>
