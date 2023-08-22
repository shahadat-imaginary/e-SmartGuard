<template>
  <div style="align-items: center;
    background-color: #e9ecef;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;">
    <v-card class="mx-auto pa-4" style="max-width: 360px;">
      <v-contain style="height: 163px;">
        <v-img cover src="../assets/logo.webp"></v-img>
      </v-contain>

      <v-form @submit.prevent="login" v-model="isValid" class="pt-4" ref="form" lazy-validation @keyup.enter="login">
        <v-text-field append-inner-icon="mdi mdi-account" v-model="email" label="MyKad No." :rules="emailRules"
          variant="outlined" required></v-text-field>
        <v-text-field append-inner-icon="mdi mdi-lock" v-model="password" type="password" label="password"
          :rules="passwordRules" variant="outlined" required></v-text-field>
          <v-list-subheader color="error" v-if="errorMessage" type="Error">{{errorMessage}}</v-list-subheader>

        <v-checkbox class="justify-center" v-model="agreement" :rules="[v => !!v || 'You must agree to continue!']"
          color="deep-purple" required>
          <template v-slot:label>
            Admin Dashboard
          </template>
        </v-checkbox>
        <v-card-actions class="justify-center">
          <v-btn style="color: #fff; background-color: #218838; border-color: #1e7e34;" :loading="isLoading"
            :type="submit">
            Submit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    email: '',
    password: '',
    isValid: false,
    isLoading: false,
    agreement: false,
    errorMessage: '',
  }),
  computed: {
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
  },
  methods: {
    async login() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const credentials = {
          email: this.email,
          password: this.password,
        };

        try {
          this.isLoading = true;
          // Replace 'api-url' with the actual URL of your authentication endpoint.
          const { data } = await axios.post('http://shahadat001-001-site1.ctempurl.com/api/users/login', credentials);
          console.log('test:', data);

          // Assuming the API returns a token in the response data upon successful authentication.
          const token = data.data.token;

          // Store the token in local storage for future API requests.
          localStorage.setItem('token', JSON.stringify(token));

          // You can redirect the user to a new page or handle the successful login as per your application flow.
          // For example:
          this.errorMessage = '';
          this.$router.push('/dashboard');

        } catch (error) {
          console.error('Login failed:', error);
          // Handle login error here, such as showing an error message to the user.
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
        finally {
          this.isLoading = false;
        }
      }
    },
  },
}
</script>
