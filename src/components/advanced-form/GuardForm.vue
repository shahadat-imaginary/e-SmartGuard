<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
          <v-card>
              <v-toolbar>
                <v-toolbar-title>Guard List</v-toolbar-title>
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
                  :items="guardItems"
                  :search="search">

                  <template v-slot:[`item.guardInformation`]="{ item }">
                    {{(item.columns.guardInformation.guardId)}},
                    {{(item.columns.guardInformation.fullName)}},
                    {{(item.columns.guardInformation.mobileNo)}},
                    {{(item.columns.guardInformation.rank_select)}}
                  </template>

                  <template v-slot:[`item.shiftTime`]="{ item }">
                    {{(item.columns.shiftTime.startTime)}} -
                    {{(item.columns.shiftTime.endTime)}}
                  </template>

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
          <v-card-title>User Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <v-form ref="form" v-model="valid" lazy-validation>
                <div v-if="!submitted">
                <v-select v-model="editedItem.status" label="Status *" variant="outlined" required></v-select>
                <v-text-field v-model="editedItem.guardInformation.guardId" label="Guard ID*" type="number" variant="outlined" required></v-text-field>
                <v-text-field v-model="editedItem.guardInformation.fullName" label="Full Name *" variant="outlined" required></v-text-field>
                <v-select v-model="editedItem.guardInformation.rank_select" label="Rank *" :items="rank_select" variant="outlined" required></v-select>
                <v-select v-model="editedItem.supervisor_select" label="Supervisor" :items="items_supervisor" variant="outlined" required></v-select>
                <v-text-field v-model="editedItem.guardInformation.mobileNo" label="Mobile No. *" :type="Number" variant="outlined" required></v-text-field>
                <v-text-field v-model="editedItem.email" label="Email" type="email" variant="outlined" required></v-text-field>
                <v-text-field v-model="editedItem.shiftTime.startTime" label="Start Time *" variant="outlined" required></v-text-field>
                <v-text-field v-model="editedItem.shiftTime.endTime" label="End Time *" variant="outlined" required></v-text-field>


                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" @click="save">Save</v-btn>
                  <v-btn color="error" class="mt-4" @click="reset">Reset</v-btn>
                </div>
              </div>
              <div v-else>
                  <h4>You submitted successfully!</h4>
                  <button class="btn btn-success" @click="newTutorial">Add</button>
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

// import GuardDataServicem from "../services/GuardDataService";

export default {
data: () => ({
  dialog: false,
  dialogDelete: false,
  search: '',
  statusItems: [
    'ACTIVE',
    'PASIVE',
    'SUSPENDED',
    'TERMINATED',
  ],
  rank_select: [
    'GUARD',
    'SUPERVISOR',
  ],
  items_supervisor: [
    'TS1',
    'TS2',
    'TS3',
    'TS4',
  ],
  headers: [
      { key: 'id', title: '#', align: 'start', sortable: false, },
      { key: 'guardInformation', title: 'Guard Information'},
      { key: 'shiftTime', title: 'Shift Time' },
      { key: 'status', title: 'Status' },
      { key: 'actions', title: 'Actions', sortable: false },
  ],
  guardItems: [],
  editedIndex: -1,
  editedItem: {
    id: null,
    guardInformation: { guardId: null, fullName: '', mobileNo: null, rank_select: null,},
    supervisor_select: null,
    email: '',
    shiftTime: { startTime: null, endTime: null,},
    status: null,
  },

  defaultItem: {
    id: null,
    guardInformation: { guardId: null, fullName: '', mobileNo: null, rank_select: null},
    supervisor_select: null,
    email: '',
    shiftTime: {startTime: null, endTime: null},
    status: null,
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
    this.guardItems = [
          {
            id: 1,
            guardInformation: { guardId: '030925052521', fullName: 'AHMAD BIN KAMARUDIN', mobileNo: '010-1234567', rank_select: 'GUARD',},
            supervisor_select: 'TS1',
            email: 'test@test.com',
            shiftTime: {startTime: '07:00am', endTime: '04:00pm'},
            status: 'PASIVE',
          },
          {
            id: 2,
            guardInformation: { guardId: '333333333', fullName: 'PENGAWAL KEDUA', mobileNo: '013-2626566', rank_select: 'GUARD'},
            supervisor_select: 'TS2',
            email: 'test1@test.com',
            shiftTime: {startTime: '03:00am', endTime: '11:00pm'},
            status: 'ACTIVE',
          },
          {
            id: 3,
            guardInformation: { guardId: '030925088888', fullName: 'SUPERVISOR KEDUA', mobileNo: '010-1234567', rank_select: 'SUPERVISOR'},
            supervisor_select: 'TS3',
            email: 'test1@test.com',
            shiftTime: {startTime: '09:00am', endTime: '5:00pm'},
            status: 'PASIVE',
          },
          {
            id: 4,
            guardInformation: { guardId: '030925052521', fullName: 'KEDUA', mobileNo: '010-1234567', rank_select: 'SUPERVISOR'},
            supervisor_select: 'TS4',
            email: 'test4@test.com',
            shiftTime: { startTime: '07:00am', endTime: ' - 3:00pm'},
            status: 'ACTIVE',
          },
          {
            id: 5,
            guardInformation: { guardId: '030925052521', fullName: 'PENGAWAL', mobileNo: '010-1234000', rank_select: 'GUARD'},
            supervisor_select: 'TS2',
            email: 'test2@test.com',
            shiftTime: {startTime: '10:00am', endTime: '6:00pm'},
            status: 'ACTIVE',
          },
          {
            id: 6,
            guardInformation: { guardId: 333333333, fullName: 'PENGAWAL KEDUA1', mobileNo: '013-2626566', rank_select: 'GUARD'},
            supervisor_select: 'TS1',
            email: 'test2@test.com',
            shiftTime: {startTime: '11:00am', endTime: ' - 7:00pm'},
            status: 'ACTIVE',
          },
    ]
  },

  editItem (item) {
    this.editedIndex = this.guardItems.indexOf(item)
    this.editedItem = Object.assign({}, item)
  },

  deleteItem (item) {
    this.editedIndex = this.guardItems.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialogDelete = true
  },

  deleteItemConfirm () {
    this.guardItems.splice(this.editedIndex, 1)
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
      Object.assign(this.guardItems[this.editedIndex], this.editedItem)
    } else {
      this.guardItems.push(this.editedItem)
    }
    this.close()
    // var data = {
    //     name: this.guards.name,
    //     status: this.guards.status,
    //     role: this.guards.role,
    //     position: this.guards.position,
    //     userName: this.guards.userName,
    //     email: this.guards.email,
    //   };

    //   GuardDataService.create(data)
    //     .then(response => {
    //       this.guards.id = response.data.id;
    //       console.log(response.data);
    //       this.submitted = true;
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
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
