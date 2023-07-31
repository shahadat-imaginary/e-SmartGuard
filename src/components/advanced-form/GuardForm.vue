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
                  v-model:page="page"
                  :headers="headers"
                  :items="guardItems"
                  :items-per-page="itemsPerPage"
                  :search="search">

                    <template v-slot:[`item.supervisor`]="{ item }">
                      {{ item.columns.supervisor.name }}
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon size="small" class="me-2" @click="editItem(item.columns.id)">mdi-square-edit-outline</v-icon>
                      <v-icon size="small" @click="deleteItem(item.columns.id)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
              </v-card-item>
        </v-card>
      </v-col>
      <v-col md="5" sm="12">
        <v-card elevation="4">
          <v-card-title>Guard Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation>
                  <v-text-field v-model="user.name" label="Name *" variant="outlined" :rules="nameRules" required></v-text-field>
                  <v-text-field v-model="user.phoneNumber" label="Mobile No. *" :type="Number" variant="outlined" :rules="phoneRules" required></v-text-field>
                  <v-text-field v-model="user.email" label="Email" type="email" variant="outlined" :rules="emailRules" required></v-text-field>
                  <v-select v-model="selectedSupervisor" label="Supervisor" item-value="id" return-object="" item-title="name" :items="this.items_supervisor" variant="outlined" required></v-select>
                  <div v-if="!editing">
                    <v-text-field label="Password" v-model="user.password" type="password" variant="outlined" :rules="passwordRules" required></v-text-field>
                    <v-text-field label="Confirm Password" v-model="user.confirmPassword" type="password" variant="outlined" :rules="confirmPasswordRules" required></v-text-field>
                  </div>
                  <div v-if="editing">
                    <v-select v-model="user.status" label="Status *" :items="this.status" variant="outlined" required></v-select>
                  </div>

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
  page: 1,
  itemsPerPage: 5,
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
  editing: false,
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

computed: {
    nameRules() {
      return [
        (v) => !!v || 'Name is required',
        (v) => v.length >= 3 || 'Name must be at least 3 characters',
      ];
    },
    phoneRules() {
      return [
        (v) => !!v || 'Number is required',
        (v) => /^(01){1}[3-9]{1}\d{8}$/.test(v) || 'Phone Number must be at least 11 characters',
      ];
    },
    emailRules() {
      return [
        (v) => !!v || 'Email is required',
        (v) => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 6 || 'Password must be at least 6 characters',
      ];
    },
    confirmPasswordRules() {
      return [
        (v) => !!v || 'Confirm Password is required',
        (v) => v === this.user.password || 'Passwords do not match',
      ];
    },
    pageCount () {
      return Math.ceil(this.guardItems.length / this.itemsPerPage)
    },
  },


methods: {

  async save() {
    const { valid } = await this.$refs.form.validate()
    if (valid) {
        if (this.user.id) {
            // If ID is present, update data using the API
            this.update(this.user.id);
            this.submitted = true;
            setTimeout(() => {this.reset();}, 2000);
          } else {
          let userCreate = {
            name: this.user.name,
            phoneNumber: this.user.phoneNumber,
            email: this.user.email,
            supervisorId: this.selectedSupervisor.id,
            password: this.user.password,
          };

          userRequest.post('/guards', userCreate)
              .then((response) => {
                this.user.id = response.data.id;
                console.log(response.data);
                this.submitted = true;
                setTimeout(() => {
                  this.reset();
                  this.retrieveUsers();
                }, 2000);
                this.selectedSupervisor= null;
              })
              .catch((e) => {
                console.log(e);
              });
          }
      }
  },

  update(id) {
      let userUpdate = {
        name: this.user.name,
        phoneNumber: this.user.phoneNumber,
        email: this.user.email,
        supervisorId: this.selectedSupervisor.id,
        status: this.user.status,
      };
      this.editing = false;
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
    this.$refs.form.reset();
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
