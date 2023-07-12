<template>
    <v-card elevation="4">
      <v-card-title>Change Password</v-card-title>
      <v-container>
          <v-sheet class="mx-auto">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-select v-model="select" variant="outlined" readonly label="Status *" :items="items"></v-select>
                <v-text-field v-model="guardId" readonly type="number" label="Guard ID*" variant="outlined" ></v-text-field>
                <v-text-field v-model="fullName" readonly label="Full Name *" variant="outlined"></v-text-field>
                <v-select v-model="rank_select" variant="outlined" readonly label="Rank *" :items="items_rank"></v-select>
                <v-select v-model="supervisor_select" variant="outlined" readonly label="Supervisor" :items="items_supervisor"></v-select>
                <v-text-field v-model="mobileNo" :type="Number" label="Mobile No. *" variant="outlined" readonly></v-text-field>
                <v-text-field label="Email" type="email" readonly variant="outlined"></v-text-field>
                <v-text-field label="Password" v-model="password" :rules="passwordRules" type="password" required variant="outlined"></v-text-field>
                <v-text-field label="Confirm Password" v-model="confirmPassword" :rules="confirmPasswordRules.concat(passwordConfirmationRule)" type="password" required variant="outlined"></v-text-field>

                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" @click="validate">Save</v-btn>
                  <v-btn color="error" class="mt-4" @click="reset">Reset</v-btn>
                </div>
            </v-form>
          </v-sheet>
      </v-container>
    </v-card>
  </template>

  <script>
  export default {
    data: () => ({
      valid: true,
      userName: '',
      select: null,
      items: [
        'ACTIVE',
        'PASIVE',
        'SUSPENDED',
        'TERMINATED',
      ],
      rank_select: null,
      items_rank: [
        'GUARD',
        'SUPERVISOR',
      ],
      supervisor_select: null,
      items_supervisor: [
        'Test',
        'Test1',
        'Test2',
        'Test3',
      ],

      mobileNo: '',

      email: "",
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
