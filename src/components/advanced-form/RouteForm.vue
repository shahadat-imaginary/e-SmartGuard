<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
          <v-card>
              <v-toolbar>
                <v-toolbar-title>Route List</v-toolbar-title>
              </v-toolbar>

              <v-card-title>
                <v-sheet width="260px" class="float-end">
                  <v-text-field
                    v-model="search"
                    append-inner-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    density="compact"
                    variant="solo"
                  ></v-text-field>
                </v-sheet>
              </v-card-title>

              <v-card-item>
                <v-data-table
                  :headers="headers"
                  :items="routeItems"
                  :search="search">
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon size="small" class="me-2" @click="editItem(item.raw)">mdi-square-edit-outline</v-icon>
                      <v-icon size="small" @click="deleteItem(item.raw)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
              </v-card-item>
        </v-card>
      </v-col>
      <v-col md="5" sm="12">
        <v-card elevation="4">
          <v-card-title>Route Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="editedItem.routeName" label="Check Point Name *" :rules="[v => !!v || 'Check Point Name is required']" variant="outlined" required></v-text-field>
                <v-select v-model="editedItem.checkpoint" label="Check Point *" :items="items_check_point" multiple :rules="[v => !!v || 'Check Point is required']" variant="outlined" required persistent-hint></v-select>

                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" @click="save">Save</v-btn>
                  <v-btn color="error" class="mt-4" @click="reset">Reset</v-btn>
                </div>
              </v-form>
            </v-sheet>
          </v-card-text>
        </v-card>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="mx-auto">
            <v-card-item class="text-h6">Are you sure you want to delete this item?</v-card-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
data: () => ({
  dialog: false,
  dialogDelete: false,
  search: '',
  items_check_point: [
    'CP', 'CP1', 'CP2', 'CP3', 'CP4', 'CP5', 'CP6', 'CP7', 'CP8',
  ],
  headers: [
      { key: 'id', title: '#', align: 'start', sortable: false, },
      { key: 'routeName', title: 'Route Name' },
      { key: 'checkpoint', title: 'Check Point List' },
      { key: 'actions', title: 'Actions', sortable: false },
  ],
  routeItems: [],
  editedIndex: -1,
  editedItem: {
    id: null,
    routeName: '',
    checkpoint: null,
  },
  defaultItem: {
    id: null,
    routeName: '',
    checkpoint: null,
  },
}),

watch: {
  dialog (val) {
    val || this.close()
  },
  dialogDelete (val) {
    val || this.closeDelete()
  },
},

created () {
  this.initialize()
},

methods: {
  initialize () {
    this.routeItems = [
          {
            id: 1,
            routeName: 'TP1',
            checkpoint: 'CP, CP2',
          },
          {
            id: 2,
            routeName: 'TP2',
            checkpoint: 'CP3, CP2',
          },
          {
            id: 3,
            routeName: 'TP3',
            checkpoint: 'CP4, CP3',
          },
          {
            id: 4,
            routeName: 'TP4',
            checkpoint: 'CP5, CP7',
          },
          {
            id: 5,
            routeName: 'TP6',
            checkpoint: 'CP, CP2',
          },
          {
            id: 6,
            routeName: 'TP7',
            checkpoint: 'CP8, CP4',
          },
          {
            id: 7,
            routeName: 'TP8',
            checkpoint: 'CP1, CP2',
          },
          {
            id: 8,
            routeName: 'TP9',
            checkpoint: 'CP5, CP8',
          },
          {
            id: 9,
            routeName: 'TP10',
            checkpoint: 'CP, CP2',
          },
          {
            id: 10,
            routeName: 'TP11',
            checkpoint: 'CP7, CP1',
          },
          {
            id: 11,
            routeName: 'TP12',
            checkpoint: 'CP6, CP3',
          },
    ]
  },

  editItem (item) {
    this.editedIndex = this.routeItems.indexOf(item)
    this.editedItem = Object.assign({}, item)
  },

  deleteItem (item) {
    this.editedIndex = this.routeItems.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialogDelete = true
  },

  deleteItemConfirm () {
    this.routeItems.splice(this.editedIndex, 1)
    this.closeDelete()
  },


  reset () {
      this.$refs.form.reset()
  },

  close () {
    this.dialog = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    })
  },

  closeDelete () {
    this.dialogDelete = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    })
  },

  async save () {
    if (this.editedIndex > -1) {
      Object.assign(this.routeItems[this.editedIndex], this.editedItem)
    } else {
      this.routeItems.push(this.editedItem)
    }
    this.close()
  },
},
}
</script>

  <style scoped>

  </style>
