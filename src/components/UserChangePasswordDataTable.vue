<template>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>User List</v-toolbar-title>
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
          { key: 'userName', title: 'User Name' },
          { key: 'userId', title: 'User ID' },
          { key: 'mobileNo', title: 'Mobile No.', sortable: false },
          { key: 'status', title: 'Status' },
          { key: 'actions', title: 'Actions', sortable: false },
        ],
        items: [
          {
            id: 1,
            userName: 'Test',
            userId: 11,
            mobileNo: 123456789,
            status: 'PASIVE',
          },
          {
            id: 2,
            userName: 'Ice cream sandwich',
            userId: 12,
            mobileNo: 123456789,
            status: 'ACTIVE',
          },
          {
            id: 3,
            userName: 'Eclair',
            userId: 13,
            mobileNo: 123456789,
            status: 'PASIVE',
          },
          {
            id: 4,
            userName: 'Cupcake',
            userId: 14,
            mobileNo: 123456789,
            status: 'ACTIVE',
          },
          {
            id: 5,
            userName: 'Gingerbread',
            userId: 15,
            mobileNo: 123456789,
            status: 'ACTIVE',
          },
          {
            id: 6,
            userName: 'Test1',
            userId: 16,
            mobileNo: 123456789,
            status: 'ACTIVE',
          },
          {
            id: 7,
            userName: 'Test2',
            userId: 17,
            mobileNo: 123456789,
            status: 'PASIVE',
          },
          {
            id: 8,
            userName: 'Test3',
            userId: 18,
            mobileNo: 123456789,
            status: 'PASIVE',
          },
          {
            id: 9,
            userName: 'Test4',
            userId: 19,
            mobileNo: 123456789,
            status: 'ACTIVE',
          },
          {
            id: 10,
            userName: 'Test5',
            userId: 20,
            mobileNo: 123456789,
            status: 'ACTIVE',
          },
          {
            id: 11,
            userName: 'Test6',
            userId: 21,
            mobileNo: 123456789,
            status: 'PASIVE',
          },
        ],
      }
    },
  }
</script>
