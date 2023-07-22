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
                      <v-icon size="small" @click="deleteItem(item.columns.id)">mdi-delete</v-icon>
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
              <div v-if="!submitted">
              <v-form ref="form" @submit.prevent="save" lazy-validation>
                <v-text-field v-model="user.name" label="User Name *" variant="outlined" required></v-text-field>
                <v-text-field v-model="user.phoneNumber" label="Mobile No. *" :type="Number" variant="outlined" required></v-text-field>
                <v-text-field v-model="user.position" label="Position *" variant="outlined" required></v-text-field>
                <v-text-field v-model="user.email" label="Email" type="email" variant="outlined" required></v-text-field>
                <v-text-field label="Password" v-model="user.password" type="password" required variant="outlined"></v-text-field>
                <v-text-field label="Confirm Password" v-model="user.confirmPassword" type="password" required variant="outlined"></v-text-field>

                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" type="submit">Save</v-btn>
                  <v-btn color="success" class="mt-4 mr-2" type="submit" @click="update">update</v-btn>
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


methods: {

  async save() {
    let userCreate = {
      name: this.user.name,
      phoneNumber: this.user.phoneNumber,
      position: this.user.position,
      email: this.user.email,
      password: this.user.password,
      confirmPassword: this.user.confirmPassword,
    };

    userRequest.post('/users', userCreate)
        .then((response) => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });

    // userRequest.put('/user/${this.editItem.id}', this.editItem)
    //     .then((response) => {
    //       // this.user.id = response.data.id;
    //       console.log(response.data);
    //       this.message = 'The user was updated successfully!'
    //       this.submitted = true;
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
  },

  update() {
      userRequest.put(this.userItems[this.editItem], this.editItem)
        .then(response => {
          this.user = response.data.data;
          console.log(response.data);
          this.message = 'The user was updated successfully!';
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
    this.$refs.form.reset()
  },

  editItem (id) {
    userRequest.get('/users/'+id)
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
