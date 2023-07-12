<template>
    <v-card elevation="4">
      <v-card-title>Check Point Information</v-card-title>
      <v-container>
          <v-sheet class="mx-auto">

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="checkPointName"
                    :rules="[v => !!v || 'Check Point Name is required']"
                    label="Check Point Name *" variant="outlined" required></v-text-field>
                <v-text-field v-model="lalitude"
                    :type="Number"
                    :rules="[v => !!v || 'Lalitude is required']"
                    label="Lalitude *" variant="outlined" required></v-text-field>
                <v-text-field v-model="longitude" label="Longitude *"
                 :type="Number"
                 :rules="[v => !!v || 'Longitude is required']" required variant="outlined"></v-text-field>

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
      checkPointName: '',
      lalitude: '',
      longitude: '',

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
