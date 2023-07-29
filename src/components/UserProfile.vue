<template>
  <v-container>
    <v-row>
      <v-col md="6" sm="12">
        <v-card elevation="4">
          <v-card-title>My Profile</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="userName" label="User Name *" variant="outlined"></v-text-field>
                <v-text-field v-model="userType" label="User Type *" variant="outlined" required></v-text-field>
                <v-text-field v-model="mobileNo" label="Mobile No. *" :type="Number" variant="outlined" required></v-text-field>
                <v-text-field v-model="email" label="Email" type="email" variant="outlined" required></v-text-field>
                <v-text-field v-model="address" label="Address *" variant="outlined" required></v-text-field>
                <v-file-input @change="Preview_image" v-model="image" label="File input" density="compact" variant="outlined"></v-file-input>
                <v-img :src="url"></v-img>

                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" @click="save">Update</v-btn>
                  <v-btn color="error" class="mt-4" @click="reset">Reset</v-btn>
                </div>
              </v-form>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6" sm="12">
        <v-card elevation="4">
          <v-card-title>Change Password</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field label="Password" v-model="editedItem.password" :rules="passwordRules" type="password" required variant="outlined"></v-text-field>
                <v-text-field label="Confirm Password" v-model="editedItem.confirmPassword" :rules="confirmPasswordRules.concat(passwordConfirmationRule)" type="password" required variant="outlined"></v-text-field>

                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" @click="save">Update</v-btn>
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

  passwordRules: [v => !!v || "Password is required"],
  confirmPasswordRules: [v => !!v || "Password is required"],

  url: null,
  image: null,

  userItems: [],

  user: {
    id: null,
    name: '',
    phoneNumber: null,
    email: '',
    password: '',
    confirmPassword: '',
  },
  defaultuser: {
    id: null,
    name: '',
    phoneNumber: null,
    email: '',
    password: '',
    confirmPassword: '',
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
    ]
  },

  reset () {
      this.$refs.form.reset()
  },

  Preview_image() {
    this.url= URL.createObjectURL(this.image)
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
