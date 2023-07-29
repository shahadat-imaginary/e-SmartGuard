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
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon size="small" class="me-2" @click="editItem(item.columns.id)">mdi-square-edit-outline</v-icon>
                    </template>
                </v-data-table>
              </v-card-item>
        </v-card>
      </v-col>
      <v-col md="5" sm="12">
        <v-card elevation="4">
          <v-card-title>Change Password</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form"  @submit.prevent="save" v-model="valid" lazy-validation>
                  <v-text-field v-model="user.name" label="Name *" variant="outlined" required disabled></v-text-field>
                  <v-text-field v-model="user.phoneNumber" label="Mobile No. *" :type="Number" variant="outlined" required disabled></v-text-field>
                  <v-text-field v-model="user.email" label="Email" type="email" variant="outlined" required disabled></v-text-field>
                  <v-select v-model="selectedSupervisor" label="Supervisor" item-value="id" return-object="" item-title="name" :items="this.items_supervisor" variant="outlined" required disabled></v-select>

                  <v-text-field label="Password" v-model="user.password" type="password" required variant="outlined"></v-text-field>
                  <v-text-field label="Confirm Password" v-model="user.confirmPassword" type="password" required variant="outlined"></v-text-field>


                  <div class="d-flex">
                    <v-btn color="success" class="mt-4 mr-2" type="submit">Save</v-btn>
                    <v-btn color="error" class="mt-4" @click="reset">Reset</v-btn>
                  </div>
                </v-form>
              </div>
              <div v-else>
                <v-card class="mx-auto">
                  <v-card-title>Submitted successfully!</v-card-title>
                </v-card>
              </div>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import userRequest from '@/axios/request';

export default {
data: () => ({
  search: '',
  headers: [
      { key: 'id', title: '#', align: ' d-none' },
      { key: 'name', title: 'Name' },
      { key: 'phoneNumber', title: 'Mobile No.', sortable: false },
      { key: 'email', title: 'Email' },
      { key: 'supervisor', title: 'Supervisor' },
      { key: 'actions', title: 'Actions', sortable: false },
  ],
  guardItems: [],
  items_supervisor: [],

  status:['Active', 'Inactive'],
  selectedSupervisor: [],

  user: {
    id: null,
    name: '',
    phoneNumber: null,
    email: '',
    supervisor_select: null,
    password: '',
    confirmPassword: '',
    status: '',
  },

  defaultuser: {
    id: null,
    name: '',
    phoneNumber: null,
    email: '',
    supervisor_select: null,
    password: '',
    confirmPassword: '',
    status: '',
  },

}),


methods: {

  async save() {
    if (this.user.id) {
        // If ID is present, update data using the API
        this.update(this.user.id);
        this.submitted = true;
        setTimeout(() => {this.reset();}, 2000);
      } else {
         this.refreshList();
      }
  },

  update(id) {
      let userUpdate = {
        password: this.user.password,
        confirmPassword: this.user.confirmPassword,
      };

      userRequest.put(`/guards/${id}`, userUpdate)
        .then(response => {
          this.user = response.data.data;
          console.log(response.data);
          this.selectedSupervisor= null;
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
  },

  retrieveUsers() {
      userRequest.get('/guards')
        .then((response) => {
          this.guardItems = response.data.data.data;
          console.log("get", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  },

  retrieveSupervisor() {
      userRequest.get('/supervisors')
        .then((response) => {
          this.items_supervisor = response.data.data.data;
          console.log("get Details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  },

  editItem (id) {
    this.editing= true;
    userRequest.get(`/guards/${id}`)
        .then((response) => {
          this.user = response.data.data;
          console.log("get details", response.data);
          this.selectedSupervisor = response.data.data.supervisor;
        })
        .catch((e) => {
          console.log(e);
        });
  },

  refreshList() {
    this.retrieveUsers();
    this.retrieveSupervisor();
  },

  reset () {
    this.user = this.defaultuser;
    this.editing = false;
    this.submitted= false;
  },

},

mounted() {
  this.retrieveUsers();
  this.retrieveSupervisor();
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
