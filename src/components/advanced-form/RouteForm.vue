<template>
    <v-card elevation="4">
      <v-card-title>User Information</v-card-title>
      <v-container>
          <v-sheet class="mx-auto">

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="routeName"
                    :rules="[v => !!v || 'Route Name is required']"
                    label="Route Name *" variant="outlined" required></v-text-field>
                <v-select v-model="check_point_select" variant="outlined" required label="Check Point *"
                    :items="items_check_point"
                    :rules="[v => !!v || 'Check Point is required']"></v-select>

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
      routeName: '',
      check_point_select: null,
      items_check_point: [
        'Test',
        'Test1',
        'Test2',
        'Test3',
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
