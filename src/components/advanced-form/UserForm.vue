<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>User List</v-toolbar-title>
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
          <v-row>
            <v-col md="8" sm="12">
              <v-card-title>User Information</v-card-title>
            </v-col>
            <v-col v-if="editing" md="4" sm="12">
              <v-btn color="success" class="mt-2" @click="addItem">Add new</v-btn>
            </v-col>
          </v-row>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" lazy-validation>
                  <v-text-field v-model="user.name" label="User Name *" variant="outlined" :rules="nameRules"
                    required></v-text-field>
                  <v-text-field v-model="user.phoneNumber" label="Mobile No. *" type="number" variant="outlined"
                    :rules="phoneRules" required></v-text-field>
                  <v-text-field v-model="user.position" label="Position *" variant="outlined" :rules="positionRules"
                    required></v-text-field>
                  <v-text-field v-model="user.email" label="Email" type="email" variant="outlined" :rules="emailRules"
                    required></v-text-field>
                  <div v-if="!editing">
                    <v-text-field label="Password" v-model="user.password" type="password" variant="outlined"
                      :rules="passwordRules" required></v-text-field>
                    <v-text-field label="Confirm Password" v-model="user.confirmPassword" type="password"
                      variant="outlined" :rules="confirmPasswordRules" required></v-text-field>
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
                <div v-if="isError" class="d-flex">
                  <v-list-subheader color="error" v-if="errorMessage" type="Error">{{errorMessage}}</v-list-subheader>
                </div>
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
    isError: false,
    errorMessage: '',
    headers: [
      { key: 'id', title: '#', align: ' d-none' },
      { key: 'name', title: 'Name' },
      { key: 'phoneNumber', title: 'Mobile No.', sortable: false },
      { key: 'position', title: 'Position' },
      { key: 'email', title: 'Email' },
      { key: 'actions', title: 'Actions', sortable: false },
    ],
    userItems: [],

    editing: false,
    status: ['Active', 'Inactive'],
    user: {
      id: null,
      name: '',
      phoneNumber: null,
      position: '',
      email: '',
      password: '',
      confirmPassword: '',
      status: '',
    },
    defaultuser: {
      id: null,
      name: '',
      phoneNumber: null,
      position: '',
      email: '',
      password: '',
      confirmPassword: '',
      status: '',
    },
    submitted: false,
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
    positionRules() {
      return [
        (v) => !!v || 'Position is required',
        (v) => v.length >= 2 || 'Name must be at least 2 characters',
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
    addItem() {
      this.reset();
    },
    // Get all User data...
    retrieveUsers(page, itemPerPage, search) {
      userRequest.get(`/users?PageNumber=${page}&PageSize=${itemPerPage}&search=${search}`)
        .then((response) => {
          this.userItems = response.data.data.data;
          console.log("Get user:", response.data);
          this.page = response.data.data.pageNumber;
          this.itemsPerPage = response.data.data.pageSize;
          this.totalPage = response.data.data.pageCount;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Edit User data...
    editItem(id) {
      this.editing = true;
      this.isError = false;
      userRequest.get(`/users/${id}`)
        .then((response) => {
          this.user = response.data.data;
          console.log("Get details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Update User data...
    update(id) {
      let userUpdate = {
        name: this.user.name,
        phoneNumber: this.user.phoneNumber,
        position: this.user.position,
        email: this.user.email,
        status: this.user.status,
      };
      userRequest.put(`/users/${id}`, userUpdate)
        .then(response => {
          this.user = response.data.data;
          this.editing = false;
          this.submitted = true;
          setTimeout(() => { this.reset(); }, 2000);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
            this.isError = true;
            this.errorMessage = e.response.data.message;
        });
    },
    // Save User data...
    async save() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        if (this.user.id) {
          this.update(this.user.id);
        } else {
          let userCreate = {
            name: this.user.name,
            phoneNumber: this.user.phoneNumber,
            position: this.user.position,
            email: this.user.email,
            password: this.user.password,
          };
          userRequest.post('/users', userCreate)
            .then((response) => {
              this.user.id = response.data.id;
              this.submitted = true;
              this.isError = false;
              setTimeout(() => {
                this.retrieveUsers(this.page, this.itemsPerPage, this.search); 
                this.reset(); 
              }, 2000);
            })
            .catch((e) => {
              console.log(e);
              this.isError = true;
              this.errorMessage = e.response.data.message;
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
      this.isError = false;
      this.$refs.form.reset();
    },

  }, //Methods end.....

  mounted() {
    this.retrieveUsers(this.page, this.itemsPerPage, this.search);
  },
}
</script>

<style scoped></style>
