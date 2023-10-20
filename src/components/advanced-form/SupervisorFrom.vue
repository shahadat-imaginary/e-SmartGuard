<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Supervisor List</v-toolbar-title>
          </v-toolbar>

          <v-card-item>
            <v-data-table :page="page" :headers="headers" :items="userItems" :items-per-page="itemsPerPage"
              :search="search" hide-default-footer>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" class="me-2" @click="editItem(item.columns.id)">mdi-square-edit-outline</v-icon>
              </template>

              <template v-slot:bottom>
                <div class="text-center pt-2">
                  <v-pagination v-model="page" :length="totalPage" :total-visible="6"></v-pagination>
                </div>
              </template>

              <template v-slot:top>
                <v-row class="pt-2 justify-space-between">
                  <v-col md="2" sm="12">
                    <v-select v-model="itemsPerPage" label="ItemsPerPage" :items="[10, 25, 50]" density="compact"
                      variant="outlined"></v-select>
                  </v-col>
                  <v-col md="4" sm="12">
                    <v-text-field :modelValue="search" @update:modelValue="updateTextField" v-model="search"
                      append-inner-icon="mdi-magnify" label="Search" density="compact" variant="outlined"></v-text-field>
                  </v-col>
                </v-row>
              </template>

            </v-data-table>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col md="5" sm="12">
        <v-card elevation="4">
          <v-card-title>Supervisor Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" lazy-validation>
                  <v-text-field v-model="user.name" label="Name *" variant="outlined" :rules="nameRules"
                    required></v-text-field>
                  <v-text-field v-model="user.phoneNumber" label="Mobile No. *" type="number" variant="outlined"
                    :rules="phoneRules" required></v-text-field>
                  <v-text-field v-model="user.email" label="Email" type="email" variant="outlined" :rules="emailRules"
                    required></v-text-field>
                  <div v-if="!editing">
                    <v-text-field label="Password" v-model="user.password" type="password" variant="outlined"
                      :rules="passwordRules" required></v-text-field>
                    <v-text-field label="Confirm Password" v-model="user.confirmPassword" type="password"
                      :rules="confirmPasswordRules" required variant="outlined"></v-text-field>
                  </div>
                  <div v-if="editing">
                    <v-select v-model="user.status" label="Status *" :items="this.status" variant="outlined"
                      required></v-select>
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
import { debounce } from 'lodash';

export default {
  data: () => ({
    page: 1,
    itemsPerPage: 10,
    totalPage: 1,
    search: '',
    headers: [
      { key: 'id', title: '#', align: ' d-none' },
      { key: 'name', title: 'Name' },
      { key: 'phoneNumber', title: 'Mobile No.', sortable: false },
      { key: 'email', title: 'Email' },
      { key: 'status', title: 'Status' },
      { key: 'actions', title: 'Actions', sortable: false },
    ],

    userItems: [],
    editing: false,
    status: ['Active', 'Inactive'],
    submitted: false,

    user: {
      id: null,
      name: '',
      phoneNumber: null,
      email: '',
      password: '',
      confirmPassword: '',
      status: '',
    },
    defaultuser: {
      id: null,
      name: '',
      phoneNumber: null,
      email: '',
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
        (v) => /^(60){1}\d{9}$/.test(v) || 'Phone Number must be 11 characters starts with 60',
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
  },

  //this one will populate new data set when user changes current page.
  watch: {
    page(val) {
      this.retrieveUsers(val, this.itemsPerPage, this.search)
    },
    itemsPerPage(val) {
      this.retrieveUsers(this.page, val, this.search)
    }
  },

  methods: {
    // Get all Supervisor data.
    retrieveUsers(page, itemPerPage, search) {
      userRequest.get(`/supervisors?PageNumber=${page}&PageSize=${itemPerPage}&search=${search}`)
        .then((response) => {
          this.userItems = response.data.data.data;
          console.log("Get Supervisor:", response.data);
          this.page = response.data.data.pageNumber;
          this.itemsPerPage = response.data.data.pageSize;
          this.totalPage = response.data.data.pageCount;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Edit Supervisor data...
    editItem(id) {
      this.editing = true;
      userRequest.get(`/supervisors/${id}`)
        .then((response) => {
          this.user = response.data.data;
          console.log("Get details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Update Supervisor data...
    update(id) {
      let userUpdate = {
        name: this.user.name,
        phoneNumber: this.user.phoneNumber,
        position: this.user.position,
        email: this.user.email,
        status: this.user.status,
      };
      this.editing = false;
      userRequest.put(`/supervisors/${id}`, userUpdate)
        .then(response => {
          this.user = response.data.data;
          console.log("Update Supervisor:", response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    // Save Supervisor data...
    async save() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        if (this.user.id) {
          // If ID is present, update data using the API
          this.update(this.user.id);
          this.submitted = true;
          setTimeout(() => { this.reset(); this.retrieveUsers(); }, 2000);
        } else {
          let supervisorCreate = {
            name: this.user.name,
            phoneNumber: this.user.phoneNumber,
            email: this.user.email,
            password: this.user.password,
          };

          userRequest.post(`/supervisors`, supervisorCreate)
            .then((response) => {
              this.user.id = response.data.id;
              console.log("Create supervisor", response.data);
              this.submitted = true;
              setTimeout(() => {
                this.reset();
                this.retrieveUsers(this.page, this.itemsPerPage, this.search);
              }, 2000);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    },

    // Search ...
    updateTextField: debounce(function debounceRead(e) {
      this.retrieveUsers(this.page, this.itemsPerPage, e)
    }, 1000),

    // Pagination ......
    pageUpdateFunction(newPageNumber) {
      console.log('Page Update', newPageNumber);
    },

    handlePageChange(page) {
      console.log("HandlePage", page)
      this.retrieveUsers(page, this.itemsPerPage, this.search)
    },

    // Refresh & Reset the List...
    refreshList() {
      this.retrieveUsers(this.page, this.itemsPerPage, this.search);
    },

    reset() {
      this.user = this.defaultuser;
      this.editing = false;
      this.submitted = false;
      this.$refs.form.reset();
    },

  }, //Methods end.....

  mounted() {
    this.retrieveUsers(this.page, this.itemsPerPage, this.search);
  },
}
</script>

<style scoped></style>
