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
                      <v-icon size="small" class="me-2" @click="editItem(item.raw)">mdi-square-edit-outline</v-icon>
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
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-select v-model="editedItem.status" label="Status *" :items="statusItems" variant="outlined" disabled></v-select>
                <v-text-field v-model="editedItem.userId" label="User ID *" type="number" variant="outlined" disabled></v-text-field>
                <v-text-field v-model="editedItem.userName" label="User Name *" variant="outlined" disabled></v-text-field>
                <v-text-field v-model="editedItem.position" label="Position *" variant="outlined" disabled></v-text-field>
                <v-text-field v-model="editedItem.mobileNo" label="Mobile No. *" variant="outlined" disabled></v-text-field>
                <v-text-field v-model="editedItem.email" label="Email" variant="outlined" disabled></v-text-field>
                <v-text-field label="Password" v-model="editedItem.password" :rules="passwordRules" type="password" required variant="outlined"></v-text-field>
                <v-text-field label="Confirm Password" v-model="editedItem.confirmPassword" :rules="confirmPasswordRules.concat(passwordConfirmationRule)" type="password" required variant="outlined"></v-text-field>

                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" @click="save">Save</v-btn>
                  <v-btn color="error" class="mt-4" @click="reset">Reset</v-btn>
                </div>
              </v-form>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
data: () => ({
  search: '',
  statusItems: [
    'ACTIVE',
    'PASIVE',
    'SUSPENDED',
    'TERMINATED',
  ],

  passwordRules: [v => !!v || "Password is required"],
  confirmPasswordRules: [v => !!v || "Password is required"],

  headers: [
      { key: 'id', title: '#', align: 'start', sortable: false, },
      { key: 'userName', title: 'User Name' },
      { key: 'userId', title: 'User ID' },
      { key: 'mobileNo', title: 'Mobile No.', sortable: false },
      { key: 'status', title: 'Status' },
      { key: 'actions', title: 'Actions', sortable: false },
  ],
  userItems: [],
  editedIndex: -1,
  editedItem: {
    id: null,
    userName: '',
    userId: null,
    position: '',
    mobileNo: null,
    email: '',
    status: null,
    password: "",
    confirmPassword: "",
  },
  defaultItem: {
    id: null,
    userName: '',
    userId: null,
    position: '',
    mobileNo: null,
    email: '',
    status: null,
    password: "",
    confirmPassword: "",
  },
}),

created () {
  this.initialize()
},

computed: {
  passwordConfirmationRule() {
      return () =>
        this.editedItem.password === this.editedItem.confirmPassword || "Passwords do not match";
  },
},

methods: {
  initialize () {
    this.userItems = [
          {
            id: 1,
            userName: 'Test',
            userId: 11,
            position: 'Bangladesh',
            mobileNo: 123456789,
            email: 'test@test.com',
            status: 'PASIVE',
          },
          {
            id: 2,
            userName: 'Ice cream sandwich',
            userId: 12,
            position: 'Uttara 10',
            mobileNo: 123456789,
            email: 'test1@test.com',
            status: 'ACTIVE',
          },
          {
            id: 3,
            userName: 'Eclair',
            userId: 13,
            position: 'Uttara 11',
            mobileNo: 123456789,
            email: 'test2@test.com',
            status: 'PASIVE',
          },
          {
            id: 4,
            userName: 'Cupcake',
            userId: 14,
            position: 'Mirpur 12',
            mobileNo: 123456789,
            email: 'test3@test.com',
            status: 'ACTIVE',
          },
          {
            id: 5,
            userName: 'Gingerbread',
            userId: 15,
            position: 'Kuril',
            mobileNo: 123456789,
            email: 'test4@test.com',
            status: 'ACTIVE',
          },
          {
            id: 6,
            userName: 'Test1',
            userId: 16,
            position: 'Mirpur',
            mobileNo: 123456789,
            email: 'test5@test.com',
            status: 'ACTIVE',
          },
          {
            id: 7,
            userName: 'Test2',
            userId: 17,
            position: 'Mes',
            mobileNo: 123456789,
            email: 'test6@test.com',
            status: 'PASIVE',
          },
          {
            id: 8,
            userName: 'Test3',
            userId: 18,
            position: 'Nikunjo',
            mobileNo: 123456789,
            email: 'test7@test.com',
            status: 'PASIVE',
          },
          {
            id: 9,
            userName: 'Test4',
            userId: 19,
            position: 'Uttara',
            mobileNo: 123456789,
            email: 'test8@test.com',
            status: 'ACTIVE',
          },
          {
            id: 10,
            userName: 'Test5',
            userId: 20,
            position: 'Banani',
            mobileNo: 123456789,
            email: 'test9@test.com',
            status: 'ACTIVE',
          },
          {
            id: 11,
            userName: 'Test6',
            userId: 21,
            position: 'Dhaka',
            mobileNo: 123456789,
            email: 'test10@test.com',
            status: 'PASIVE',
          },
    ]
  },

  editItem (item) {
    this.editedIndex = this.userItems.indexOf(item)
    this.editedItem = Object.assign({}, item)
  },

  reset () {
      this.$refs.form.reset()
  },

  close () {
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    })
  },

  async save () {
    if (this.editedIndex > -1) {
      Object.assign(this.userItems[this.editedIndex], this.editedItem)
    } else {
      this.userItems.push(this.editedItem)
    }
    this.close()
  },
},
}
</script>

  <style scoped>

  </style>
