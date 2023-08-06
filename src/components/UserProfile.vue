<template>
  <v-container>
    <v-row>
      <v-col md="6" sm="12">
        <v-card elevation="4">
          <v-card-title>My Profile</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" v-model="valid" @submit.prevent="saveProfile" lazy-validation>
                  <v-text-field v-model="user.name" label="User Name *" :rules="nameRules"
                    variant="outlined"></v-text-field>
                  <v-text-field v-model="user.phoneNumber" label="Mobile No. *" :type="Number" :rules="phoneRules"
                    variant="outlined" required></v-text-field>
                  <v-text-field v-model="user.position" label="Position *" variant="outlined" :rules="positionRules"
                    required></v-text-field>
                  <v-text-field v-model="user.email" label="Email" type="email" variant="outlined" :rules="emailRules"
                    required></v-text-field>

                  <div class="d-flex">
                    <v-btn color="success" class="mt-4 mr-2" :type="submit">Update</v-btn>
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
      <v-col md="6" sm="12">
        <v-card elevation="4">
          <v-card-title>Change Password</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <v-form ref="form1" v-model="valid" @submit.prevent="savePassword" lazy-validation>
                <v-text-field label="Password" v-model="user.password" :rules="passwordRules" type="password" required
                  variant="outlined"></v-text-field>
                <v-text-field label="Confirm Password" v-model="user.confirmPassword" :rules="confirmPasswordRules"
                  type="password" required variant="outlined"></v-text-field>

                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" type="submit">Update</v-btn>
                  <v-btn color="error" class="mt-4" @click="resetPassword">Reset</v-btn>
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
    submitted: false,
  }),

  mounted() {
    this.fetchUserProfile();
  },

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
        // (v) => /^(01){1}[3-9]{1}\d{8}$/.test(v) || 'Phone Number must be at least 11 characters like 01711000000',
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


  methods: {
    async saveProfile() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        if (this.user.id) {
          this.update(this.user.id);
          this.submitted = true;
          setTimeout(() => { this.reset(); }, 2000);
        }
      }
    },
    async savePassword() {
      const { valid } = await this.$refs.form1.validate()
      if (valid) {
        if (this.accounts.me) {
          this.updatePassword(this.accounts.me);
          this.submitted = true;
          setTimeout(() => { this.resetPassword(); }, 2000);
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
      userRequest.put(`/accounts/update`, userUpdate)
        .then(response => {
          this.user = response.data.data;
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePassword() {
      let passwordUpdate = {
        password: this.user.password,
      };
      userRequest.put(`/accounts/update`, passwordUpdate)
        .then(response => {
          this.user = response.data.data;
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    reset() {
      this.submitted = false;
      this.$refs.form.reset();
    },
    resetPassword() {
      this.submitted = false;
      this.$refs.form1.reset();
    },

    editItem() {
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

<style scoped></style>
