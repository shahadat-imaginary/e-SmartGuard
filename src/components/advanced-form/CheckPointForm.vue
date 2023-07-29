<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
          <v-card>
              <v-toolbar>
                <v-toolbar-title>Check Point List</v-toolbar-title>
              </v-toolbar>

              <v-card-title>
                <v-sheet width="260px" class="float-end">
                  <v-text-field
                    v-model="search"
                    append-inner-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    density="compact"
                    variant="solo"
                  ></v-text-field>
                </v-sheet>
              </v-card-title>

              <v-card-item>
                <v-data-table
                  :headers="headers"
                  :items="checkPointItems"
                  :search="search">
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon size="small" class="me-2" @click="editItem(item.columns.id)">mdi-square-edit-outline</v-icon>
                      <v-icon size="small" @click="deleteItem(item.columns.id)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
              </v-card-item>
        </v-card>
      </v-col>
      <v-col md="5" sm="12">
        <v-card elevation="4">
          <v-card-title>Check Point Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation>
                  <v-text-field v-model="checkItem.name" label="Check Point Name *" variant="outlined" :rules="checkpointnameRules" required></v-text-field>
                  <v-text-field v-model="checkItem.latitude" label="Lalitude *" :type="Number" variant="outlined" :rules="latitudeRules" required></v-text-field>
                  <v-text-field v-model="checkItem.longitude" label="Longitude *" :type="Number" variant="outlined" :rules="longitudeRules" required></v-text-field>

                  <div class="d-flex">
                    <v-btn color="success" class="mt-4 mr-2" type="submit">Save</v-btn>
                    <v-btn color="error" class="mt-4" @click="reset">Reset</v-btn>
                  </div>
                </v-form>
            </div>
            <div v-else>
              <v-card class="mx-auto">
                <v-card-title>Submitted successfully!</v-card-title>
              </v-card>
            </div>
            </v-sheet>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userRequest from '@/axios/request';

export default {
data: () => ({
  search: '',
  headers: [
      { key: 'id', title: '#', align: ' d-none' },
      { key: 'name', title: 'Check Point Name' },
      { key: 'latitude', title: 'Lalitude' },
      { key: 'longitude', title: 'Longitude' },
      { key: 'actions', title: 'Actions', sortable: false },
  ],
  checkPointItems: [],

  checkItem: {
    id: null,
    name: '',
    latitude: null,
    longitude: null,
  },
  defaultcheckItem: {
    id: null,
    name: '',
    latitude: null,
    longitude: null,
  },
  submitted: false,
}),

computed: {
    checkpointnameRules() {
      return [
        (v) => !!v || 'Name is required',
        (v) => v.length >= 3 || 'Name must be at least 3 characters',
      ];
    },
    latitudeRules() {
      return [
        (v) => !!v || 'Latitude is required',
      ];
    },
    longitudeRules() {
      return [
        (v) => !!v || 'Longitude is required',
      ];
    },
  },


methods: {

  async save() {
    const { valid } = await this.$refs.form.validate()
    if (valid) {
        if (this.checkItem.id) {
            // If ID is present, update data using the API
            this.update(this.checkItem.id);
            this.submitted = true;
            setTimeout(() => {this.reset();}, 2000);
          } else {
            let checkPointCreate = {
              name: this.checkItem.name,
              latitude: this.checkItem.latitude,
              longitude: this.checkItem.longitude,
            };

            userRequest.post('/checkpoints', checkPointCreate)
                .then((response) => {
                  this.checkItem.id = response.data.id;
                  console.log(response.data);
                  this.submitted = true;
                    setTimeout(() => {
                      this.reset();
                      this.retrieveCheckPoint();
                    }, 2000);
                })
                .catch((e) => {
                  console.log(e);
                });
          }
      }
  },

  update(id) {
    let checkPointUpdate = {
      name: this.checkItem.name,
      latitude: this.checkItem.latitude,
      longitude: this.checkItem.longitude,
    };

    userRequest.put(`/checkpoints/${id}`, checkPointUpdate)
      .then(response => {
        this.checkItem = response.data.data;
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  },

  retrieveCheckPoint() {
      userRequest.get('/checkpoints')
        .then((response) => {
          this.checkPointItems = response.data.data.data;
          console.log("get", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

  refreshList() {
    this.retrieveCheckPoint();
  },

  reset () {
    this.checkItem = this.defaultcheckItem;
    this.submitted= false;
    this.$refs.form.reset();
  },

  editItem (id) {
    userRequest.get(`/checkpoints/${id}`)
        .then((response) => {
          this.checkItem = response.data.data;
          console.log("get details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  },

},

mounted() {
    this.retrieveCheckPoint();
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
