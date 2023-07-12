<template>
    <v-card elevation="4">
      <v-card-title>Change Password</v-card-title>
      <v-container>
          <v-sheet class="mx-auto">
            <v-form ref="form">
                      <v-autocomplete
                          v-model="select"
                          :items="items"
                          label="Status *"
                          variant="outlined"
                      ></v-autocomplete>
                      <v-text-field
                        v-model="userId"
                        type="number"
                        label="User ID *"
                        variant="outlined"
                        readonly
                      ></v-text-field>
                      <v-text-field
                        v-model="userName"
                        label="User Name *"
                        variant="outlined"
                        readonly
                      ></v-text-field>
                      <v-text-field
                        v-model="position"
                        label="Position *"
                        variant="outlined"
                        readonly
                      ></v-text-field>
                      <v-text-field v-model="mobileNo" :type="Number" label="Mobile No. *" variant="outlined" readonly></v-text-field>
                      <v-text-field label="Email" type="email" readonly variant="outlined"></v-text-field>
                      <v-text-field label="Password" v-model="password" :rules="passwordRules" type="password" required variant="outlined"></v-text-field>
                      <v-text-field label="Confirm Password" v-model="confirmPassword" :rules="confirmPasswordRules.concat(passwordConfirmationRule)" type="password" required variant="outlined"></v-text-field>

              <div class="d-flex">
                <v-btn
                  color="success"
                  class="mt-4 mr-2"
                  @click="validate"
                >
                  Save
                </v-btn>

                <v-btn
                  color="error"
                  class="mt-4"
                  @click="reset"
                >
                  Reset
                </v-btn>
              </div>
            </v-form>
          </v-sheet>
      </v-container>
    </v-card>
  </template>

  <script>
  export default {
    data: () => ({
      userName: '',
      select: null,
      items: [
        'ACTIVE',
        'PASIVE',
        'SUSPENDED',
        'TERMINATED',
      ],
      position: null,
      password: "",
      confirmPassword: "",
      passwordRules: [v => !!v || "Password is required"],
      confirmPasswordRules: [v => !!v || "Password is required"]
    }),

    methods: {
      async validate () {
        const { valid } = await this.$refs.form.validate()

        if (valid) alert('Form is valid')
      },
      reset () {
        this.$refs.form.reset()
      },
    },
    computed: {
      passwordConfirmationRule() {
        return () =>
          this.password === this.confirmPassword || "Password must match";
      }
    }

  }
  </script>

  <style scoped>
  .my-btn {
      display: flex;
      justify-content: end;
      align-items: center;
  }
  </style>
