<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
          <v-card>
              <v-toolbar>
                <v-toolbar-title>User List</v-toolbar-title>
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
                  :items="userItems"
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
              <v-form ref="form" @submit.prevent="save" lazy-validation>
                <v-text-field v-model="user.name" label="User Name *" variant="outlined" disabled></v-text-field>
                <v-text-field v-model="user.phoneNumber" label="Mobile No. *" :type="Number" variant="outlined" disabled></v-text-field>
                <v-text-field v-model="user.position" label="Position *" variant="outlined" disabled></v-text-field>
                <v-text-field v-model="user.email" label="Email" type="email" variant="outlined" disabled></v-text-field>
                <v-text-field label="Password" v-model="user.password" type="password" variant="outlined" :rules="passwordRules" required></v-text-field>
                <v-text-field label="Confirm Password" v-model="user.confirmPassword" type="password" variant="outlined" :rules="confirmPasswordRules" required></v-text-field>

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
      { key: 'position', title: 'Position' },
      { key: 'email', title: 'Email' },
      { key: 'actions', title: 'Actions', sortable: false },
  ],
  userItems: [],

  user: {
    id: null,
    name: '',
    phoneNumber: null,
    position: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  defaultuser: {
    id: null,
    name: '',
    phoneNumber: null,
    position: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  submitted: false,
}),

computed: {
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


methods: {

  async save() {
    const { valid } = await this.$refs.form.validate();
    if(valid) {
        if (this.user.id) {
          // If ID is present, update data using the API
          this.update(this.user.id);
          this.submitted = true;
          setTimeout(() => {
            this.reset();
            this.refreshList();
          }, 2000);

        } else {
          this.submitted = false;
          this.retrieveUsers();
        }
      }
  },

  update(id) {
      let userUpdate = {
        name: this.user.name,
        phoneNumber: this.user.phoneNumber,
        position: this.user.position,
        email: this.user.email,
        status: this.user.status,
        password: this.user.password,
      };

      userRequest.put(`/users/${id}`, userUpdate)
        .then(response => {
          this.user = response.data.data;
          console.log(response.data);
          this.retrieveUsers();
        })
        .catch(e => {
          console.log(e);
        });
    },

  retrieveUsers() {
      userRequest.get('/users')
        .then((response) => {
          this.userItems = response.data.data.data;
          console.log("get", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

  refreshList() {
    this.retrieveUsers();
  },

  reset () {
    this.user = this.defaultuser;
    this.editing = false;
    this.submitted= false;
    this.$refs.form.reset();
  },

  editItem (id) {
    this.editing= true;
    userRequest.get(`/users/${id}`)
        .then((response) => {
          this.user = response.data.data;
          console.log("get details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  },

  },

  mounted() {
    this.retrieveUsers();
  },

}
</script>

<style scoped>

</style>
