<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
          <v-card>
              <v-toolbar>
                <v-toolbar-title>Route List</v-toolbar-title>
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
                  :items="routeItems"
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
          <v-card-title>Route Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="route.name" label="Check Point Name *" :rules="[v => !!v || 'Check Point Name is required']" variant="outlined" required></v-text-field>
                <v-select v-model="selectedCheckpoint" label="Check Point *" :items="checkpoints" item-value="id" item-title="name" multiple :rules="[v => !!v || 'Check Point is required']" variant="outlined" required persistent-hint></v-select>

                <div class="d-flex">
                  <v-btn color="success" class="mt-4 mr-2" @click="save">Save</v-btn>
                  <v-btn color="error" class="mt-4" @click="reset">Reset</v-btn>
                </div>
              </v-form>
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
      { key: 'name', title: 'Route Name' },
      { key: 'routeCheckpoints', title: 'Check Point List' },
      { key: 'actions', title: 'Actions', sortable: false },
  ],
  selectedCheckpoint: [],
  routeItems: [],
  checkpoints: [],
  route: {
    id: null,
    name: '',
    routeCheckpoints: null,
  },
  defaultRoute: {
    id: null,
    name: '',
    routeCheckpoints: null,
  },
}),

methods: {
  async save() {
    let checkPointCreate = {
      name: this.route.name,
      routeCheckpoints: this.route.routeCheckpoints,
    };

    console.log(this.selectedCheckpoint)

    // userRequest.post('/routes', checkPointCreate)
    //     .then((response) => {
    //       this.routeItems.id = response.data.id;
    //       console.log(response.data);
    //       this.submitted = true;
    //       this.refreshList();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
  },

  retrieveUsers() {
      userRequest.get('/routes')
        .then((response) => {
          this.routeItems = response.data.data.data;
          console.log("get", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

  

   retrieveCheckpoints() {
      userRequest.get('/checkpoints')
        .then((response) => {
          this.checkpoints = response.data.data.data;
          console.log("get", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

  refreshList() {
    this.retrieveUsers();
  },

  reset () {
    this.$refs.form.reset()
  },

  editItem (id) {
    userRequest.get('/routes/'+id)
        .then((response) => {
          this.route = response.data.data;
          console.log("get details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  },

},

mounted() {
    this.retrieveUsers();
    this.retrieveCheckpoints();
},

}
</script>

  <style scoped>

  </style>
