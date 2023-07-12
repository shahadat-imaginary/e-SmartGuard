<template>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Guard List</v-toolbar-title>
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              size="small"
              class="me-2"
              @click="editItem(item.raw)"
            >
            mdi-square-edit-outline
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
          { key: 'guardInformation', title: 'Guard Information' },
          { key: 'shiftTime', title: 'Shift Time' },
          { key: 'status', title: 'Status' },
          { key: 'actions', title: 'Actions', sortable: false },
        ],

        items: [
          {
            id: 1,
            guardInformation: '030925052521, AHMAD BIN KAMARUDIN, 010-1234567, GUARD',
            shiftTime: '07:00am-04:00am',
            status: 'PASIVE',
          },
          {
            id: 2,
            guardInformation: '333333333, PENGAWAL KEDUA, 013-2626566, GUARD',
            shiftTime: '03:00am-11:00pm',
            status: 'ACTIVE',
          },
          {
            id: 3,
            guardInformation: '030925088888, SUPERVISOR KEDUA, 010-1234567, SUPERVISOR',
            shiftTime: '07:00am-04:00am',
            status: 'PASIVE',
          },
          {
            id: 4,
            guardInformation: '030925052521, AHMAD, 010-1234567, SUPERVISOR',
            shiftTime: '07:00am-04:00am',
            status: 'ACTIVE',
          },
          {
            id: 5,
            guardInformation: '333333333, PENGAWAL KEDUA, 013-2626566, GUARD',
            shiftTime: '03:00am-11:00pm',
            status: 'ACTIVE',
          },
          {
            id: 6,
            guardInformation: '333333333, PENGAWAL KEDUA, 013-2626566, GUARD',
            shiftTime: '09:00am-11:00pm',
            status: 'ACTIVE',
          },
          {
            id: 7,
            guardInformation: '356566, Test3, 013-2626566, GUARD',
            shiftTime: '07:00am-11:00pm',
            status: 'PASIVE',
          },
          {
            id: 8,
            guardInformation: '333333333, Test2, 013-2626566, GUARD',
            shiftTime: '06:00am-11:00pm',
            status: 'PASIVE',
          },
          {
            id: 9,
            guardInformation: '333333333, Test1, 013-2626566, GUARD',
            shiftTime: '03:00am-11:00pm',
            status: 'ACTIVE',
          },
          {
            id: 10,
            guardInformation: '333333333, PENGAWAL, 013-2626566, GUARD',
            shiftTime: '05:00am-11:00pm',
            status: 'ACTIVE',
          },
          {
            id: 11,
            guardInformation: '222222, KEDUA, 013-2626566, GUARD',
            shiftTime: '07:00am-11:00pm',
            status: 'PASIVE',
          },
        ],
      }
    },
  }
</script>
