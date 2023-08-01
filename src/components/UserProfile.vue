<template>
  <v-container>
    <v-row>
      <v-col md="6" sm="12">
        <v-card elevation="4">
          <v-card-title>My Profile</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <v-form ref="form" v-model="valid" @submit.prevent="saveProfile" lazy-validation>
                <v-text-field v-model="user.name" label="User Name *" :rules="nameRules" variant="outlined"></v-text-field>
                <v-text-field v-model="user.phoneNumber" label="Mobile No. *" :type="Number" :rules="phoneRules" variant="outlined" required></v-text-field>
                <v-text-field v-model="user.position" label="Position *" variant="outlined" :rules="positionRules" required></v-text-field>
                <v-text-field v-model="user.email" label="Email" type="email" variant="outlined" :rules="emailRules" required></v-text-field>

                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" :type="submit">Update</v-btn>
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
              <v-form ref="form" v-model="valid" @submit.prevent="save"  lazy-validation>
                <v-text-field label="Password" v-model="user.password" :rules="passwordRules" type="password" required variant="outlined"></v-text-field>
                <v-text-field label="Confirm Password" v-model="user.confirmPassword" :rules="confirmPasswordRules" type="password" required variant="outlined"></v-text-field>

                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" type="submit">Update</v-btn>
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
import userRequest from '@/axios/request';
export default {
data: () => ({
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
}),

mounted() {
  this.fetchUserProfile();
},


methods: {
    async saveProfile() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
          if (this.user.id) {
              this.update(this.user.id);
              this.submitted = true;
            }
        }
    },
    async fetchUserProfile() {
      userRequest.get(`/accounts/me`)
        .then((response) => {
          this.user = response.data.data;
          console.log("get", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    update() {
      let userUpdate = {
        name: this.user.name,
        phoneNumber: this.user.phoneNumber,
        position: this.user.position,
        email: this.user.email,
      };
      userRequest.put(`/accounts/me`, userUpdate)
        .then(response => {
          this.user = response.data.data;
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    reset () {
      this.$refs.form.reset();
    },

    editItem () {
      userRequest.get(`/accounts/me`)
          .then((response) => {
            this.user = response.data.data;
            console.log("get details", response.data);
          })
          .catch((e) => {
            console.log(e);
          });
},

  },


}
</script>

<style scoped>

</style>
