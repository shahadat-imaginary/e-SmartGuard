<!-- <template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form fast-fail @submit.prevent="login">
                <v-text-field prepend-icon="mdi mdi-view-dashboard" v-model="username" label="User Name"></v-text-field>

                <v-text-field prepend-icon="mdi mdi-view-dashboard" v-model="password" label="password"></v-text-field>
                <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

                <v-btn type="submit" color="primary" block class="mt-2" to="/">Sign in</v-btn>

            </v-form>
        </v-sheet>
    </div>
</template> -->

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
      <v-form
        ref="form"
        v-model="isValid"
        class="pt-4"
      >
        <v-text-field append-inner-icon="mdi mdi-account" :rules="[rules.required]" v-model="username" label="MyKad No." variant="outlined"></v-text-field>
        <v-text-field append-inner-icon="mdi mdi-lock" :rules="[rules.required]" v-model="password" label="password" variant="outlined"></v-text-field>
        <v-checkbox class="d-flex justify-center"
          v-model="agreement"
          :rules="[rules.required]"
          color="deep-purple"
        >
          <template v-slot:label>
            Admin Dashboard
          </template>
        </v-checkbox>
      </v-form>

      <v-card-actions class="d-flex justify-center">
        <v-btn style="color: #fff; background-color: #218838; border-color: #1e7e34;"
          :disabled="!isValid"
          :loading="isLoading" to="/"
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
export default {
    data() {
        return {
            username: '',
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
        login() {
            // Your login logic here  
            if(this.username == "840412025055" || this.password == "123"){
                console.log("authenticated")
            }else{
                console.log("Username and Password can not be empty")
            }
        },
    },
}
</script>