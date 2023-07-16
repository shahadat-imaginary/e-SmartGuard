<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
          <v-card>
              <v-toolbar>
                <v-toolbar-title>Check Point List</v-toolbar-title>
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
                  :items="checkPointItems"
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
          <v-card-title>Check Point Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="editedItem.checkPointName" label="Check Point Name *" :rules="[v => !!v || 'Check Point Name is required']" variant="outlined" required></v-text-field>
                <v-text-field v-model="editedItem.lalitude" label="Lalitude *" :type="Number" :rules="[v => !!v || 'Lalitude is required']" variant="outlined" required></v-text-field>
                <v-text-field v-model="editedItem.longitude" label="Longitude *" :type="Number" :rules="[v => !!v || 'Longitude is required']" required variant="outlined"></v-text-field>

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
  headers: [
      { key: 'id', title: '#', align: 'start', sortable: false, },
      { key: 'checkPointName', title: 'Check Point Name' },
      { key: 'lalitude', title: 'Lalitude' },
      { key: 'longitude', title: 'Longitude' },
      { key: 'actions', title: 'Actions', sortable: false },
  ],
  checkPointItems: [],
  editedIndex: -1,
  editedItem: {
    id: null,
    checkPointName: '',
    lalitude: null,
    longitude: null,
  },
  defaultItem: {
    id: null,
    checkPointName: '',
    lalitude: null,
    longitude: null,
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
    this.checkPointItems = [
          {
            id: 1,
            checkPointName: 'TP1',
            lalitude: 11.222,
            longitude: 58.220,
          },
          {
            id: 2,
            checkPointName: 'TP2',
            lalitude: 250.33,
            longitude: 11.2235,
          },
          {
            id: 3,
            checkPointName: 'TP3',
            lalitude: 10.54,
            longitude: 20.548,
          },
          {
            id: 4,
            checkPointName: 'TP4',
            lalitude: 220.225,
            longitude: 54.22,
          },
          {
            id: 5,
            checkPointName: 'TP6',
            lalitude: 182.041,
            longitude: 12.3456789,
          },
          {
            id: 6,
            checkPointName: 'TP7',
            lalitude: 118.22,
            longitude: 123.456789,
          },
          {
            id: 7,
            checkPointName: 'TP8',
            lalitude: 61.33,
            longitude: 145.6789,
          },
          {
            id: 8,
            checkPointName: 'TP9',
            lalitude: 19.22,
            longitude: 12.89,
          },
          {
            id: 9,
            checkPointName: 'TP10',
            lalitude: 116.22,
            longitude: 15.6789,
          },
          {
            id: 10,
            checkPointName: 'TP11',
            lalitude: 11.69,
            longitude: 16.789,
          },
          {
            id: 11,
            checkPointName: 'TP12',
            lalitude: 94.56,
            longitude: 56.02789,
          },
    ]
  },

  editItem (item) {
    this.editedIndex = this.checkPointItems.indexOf(item)
    this.editedItem = Object.assign({}, item)
  },

  deleteItem (item) {
    this.editedIndex = this.checkPointItems.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialogDelete = true
  },

  deleteItemConfirm () {
    this.checkPointItems.splice(this.editedIndex, 1)
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
      Object.assign(this.checkPointItems[this.editedIndex], this.editedItem)
    } else {
      this.checkPointItems.push(this.editedItem)
    }
    this.close()
  },
},
}
</script>

  <style scoped>
  .my-btn {
      display: flex;
      justify-content: end;
      align-items: center;
  }
  </style>
