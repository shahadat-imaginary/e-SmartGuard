<template>
    <v-card elevation="4">
      <v-card-title>User Information</v-card-title>
      <v-container>
          <v-sheet class="mx-auto">

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-autocomplete v-model="select" variant="outlined"
                    required
                    label="Status *"
                    :items="items"
                    :rules="[v => !!v || 'Status is required']"></v-autocomplete>
                <v-text-field
                        v-model="userId"
                        type="number"
                        :rules="userIdRules"
                        :counter="12"
                        :maxlength="12"
                        label="User ID *"
                        variant="outlined"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="userName"
                        :rules="[v => !!v || 'Name is required']"
                        label="User Name *"
                        variant="outlined"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="position"
                        :rules="[v => !!v || 'Position is required']"
                        label="Position *"
                        variant="outlined"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="mobileNo"
                        :type="Number"
                        :rules="mobileNoRules"
                        label="Mobile No. *"
                        variant="outlined"
                        required
                      ></v-text-field>
                      <v-text-field
                          label="Email"
                          type="email"
                          :rules="emailRules"
                          required
                          variant="outlined"
                      ></v-text-field>

              <div class="d-flex">
                <v-btn
                  color="success"
                  class="mt-4 mr-2"
                  @click="validate"
                >
                  Validate
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
      valid: true,
      userName: '',
      select: null,
      items: [
        'ACTIVE',
        'PASIVE',
        'SUSPENDED',
        'TERMINATED',
      ],
      userIdRules: [
        v => !!v || 'User Id is required',
        v => (v && v.length == 12) || 'User Id must be 12 characters',
      ],
      position: null,

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
