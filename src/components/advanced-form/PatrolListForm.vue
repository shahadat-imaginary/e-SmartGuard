<template>
    <v-card elevation="4">
      <v-card-title>Patrol Information</v-card-title>
      <v-container>
          <v-sheet class="mx-auto">

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                        v-model="date"
                        type="date"
                        label="Date *"
                        variant="outlined"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="startTime"
                        :rules="[v => !!v || 'Start Time is required']"
                        label="Start Time *"
                        variant="outlined"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="endTime"
                        :rules="[v => !!v || 'End Time is required']"
                        label="End Time *"
                        variant="outlined"
                        required
                      ></v-text-field>
                <v-select v-model="guard_name_select" variant="outlined" required label="Guard Name *"
                    :items="items_guard_name"
                    :rules="[v => !!v || 'Guard Name is required']"></v-select>
                <v-select v-model="route_select" variant="outlined" required label="Route *"
                    :items="items_route"
                    :rules="[v => !!v || 'Route is required']"></v-select>

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
      guard_name_select: null,
      items_guard_name: [
        'Test',
        'Test1',
        'Test2',
        'Test3',
      ],

      route_select: null,
      items_route: [
        'TP1',
        'TP2',
        'TP3',
        'TP4',
        'TP5',
        'TP6',
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
