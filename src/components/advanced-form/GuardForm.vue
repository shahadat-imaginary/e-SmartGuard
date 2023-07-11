<template>
    <v-card elevation="4">
      <v-card-title>User Information</v-card-title>
      <v-container>
          <v-sheet class="mx-auto">

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-select v-model="select" variant="outlined" required label="Status *"
                    :items="items"
                    :rules="[v => !!v || 'Status is required']"></v-select>
                <v-text-field v-model="guardId" type="number"
                    :rules="guardIdRules"
                    :counter="12"
                    :maxlength="12"
                    label="Guard ID*" variant="outlined" required></v-text-field>
                <v-text-field v-model="fullName"
                    :rules="[v => !!v || 'Name is required']"
                    label="Full Name *" variant="outlined" required></v-text-field>
                <v-select v-model="rank_select" variant="outlined" required label="Rank *"
                    :items="items_rank"
                    :rules="[v => !!v || 'Rank is required']"></v-select>
                <v-select v-model="supervisor_select" variant="outlined" required label="Supervisor"
                    :items="items_supervisor"
                    :rules="[v => !!v || 'Supervisor is required']"></v-select>
                <v-text-field v-model="mobileNo"
                    :type="Number"
                    :rules="mobileNoRules"
                    label="Mobile No. *" variant="outlined" required></v-text-field>
                <v-text-field label="Email" type="email"
                    :rules="emailRules" required variant="outlined"></v-text-field>

                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" @click="validate">Validate</v-btn>
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
      guardIdRules: [
        v => !!v || 'User Id is required',
        v => (v && v.length == 12) || 'User Id must be 12 characters',
      ],

      mobileNo: '',
      mobileNoRules: [
        v => !!v || 'Mobile No is required',
        v => (v?.length > 11 && /[0-9-]+/.test(v)) || 'Mobile No must be valid.'
      ],

      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],

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

  }
  </script>

  <style scoped>
  .my-btn {
      display: flex;
      justify-content: end;
      align-items: center;
  }
  </style>
