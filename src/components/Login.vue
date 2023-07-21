<template>
    <div style="align-items: center;
    background-color: #e9ecef;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;">
    <v-card
      class="mx-auto pa-4"
      style="max-width: 360px;"
    >
      <v-contain style="height: 163px;">
        <v-img cover src="../assets/logo.webp"></v-img>
    </v-contain>
      <v-form @submit.prevent="submitForm"
        ref="form"
        v-model="isValid"
        class="pt-4"
      >
        <v-text-field append-inner-icon="mdi mdi-account" v-model="email" label="MyKad No." variant="outlined"></v-text-field>
        <v-text-field append-inner-icon="mdi mdi-lock" v-model="password" label="password" variant="outlined"></v-text-field>
        <v-checkbox class="d-flex justify-center"
          v-model="agreement"
          :rules="[v => !!v || 'You must agree to continue!']"
          color="deep-purple"
        >
          <template v-slot:label>
            Admin Dashboard
          </template>
        </v-checkbox>
      </v-form>

      <v-card-actions class="d-flex justify-center">
        <v-btn style="color: #fff; background-color: #218838; border-color: #1e7e34;"
          :loading="isLoading" @click="login" :type="submit"
        >
          Submit
        </v-btn>
      </v-card-actions>
      <v-card-actions class="d-flex justify-center">
        <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>
      </v-card-actions>
    </v-card>
</div>
  </template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: '',
            password: '',
            isValid: false,
            isLoading: false,
            agreement: false,
            rules: {
                required: v => !!v || 'This field is required',
            },
        };
    },
    methods: {
        async login() {
          const credentials = {
            email: this.email,
            password: this.password,
          };

          try {
            // Replace 'api-url' with the actual URL of your authentication endpoint.
            const {data} = await axios.post('http://shahadat001-001-site1.ctempurl.com/api/users/login', credentials);
            console.log('test:', data);

            // Assuming the API returns a token in the response data upon successful authentication.
            const token = data.data.token;

            // Store the token in local storage for future API requests.
            localStorage.setItem('token', JSON.stringify(token));

            // You can redirect the user to a new page or handle the successful login as per your application flow.
            // For example:
            this.$router.push('/');

          } catch (error) {
            console.error('Login failed:', error);
            // Handle login error here, such as showing an error message to the user.
          }
        },
    },
}
</script>
