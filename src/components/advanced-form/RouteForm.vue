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

                    <template v-slot:[`item.routeCheckpoints`]="{ item }">
                      {{ checkpointData(item.columns.routeCheckpoints)}}
                    </template>

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
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation>
                  <v-text-field v-model="route.name" label="Route Name *" variant="outlined" :rules="[v => !!v || 'Route Name is required']" required></v-text-field>
                  <v-select v-model="selectedCheckpoint" label="Check Point *" item-value="id" return-object="" item-title="name" :items="this.item_checkpoint" multiple variant="outlined" :rules="[v => !!v || 'Item is required']" required></v-select>

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
      { key: 'name', title: 'Route Name' },
      { key: 'routeCheckpoints', title: 'Check Point List' },
      { key: 'actions', title: 'Actions', sortable: false },
  ],

  routeItems: [],
  item_checkpoint: [],
  selectedCheckpoint: [],

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
    const { valid } = await this.$refs.form.validate();
    if (valid) {
        if (this.route.id) {
            // If ID is present, update data using the API
            this.update(this.route.id);
            this.submitted = true;
            setTimeout(() => {this.reset();}, 2000);
          } else {
          let routeCreate = {
            name: this.route.name,
            routeCheckpoints: this.selectedCheckpoint.id,
          };

          userRequest.post('/routes', routeCreate)
              .then((response) => {
                this.route.id = response.data.id;
                console.log(response.data);
                this.submitted = true;
                setTimeout(() => {
                  this.reset();
                  this.retrieveRoutes();
                }, 2000);
                this.selectedCheckpoint= null;
              })
              .catch((e) => {
                console.log(e);
              });
          }
      }
  },

  update(id) {
      let routeUpdate = {
        name: this.route.name,
        routeCheckpoints: this.selectedCheckpoint.id,
      };
      userRequest.put(`/routes/${id}`, routeUpdate)
        .then(response => {
          this.route = response.data.data;
          console.log(response.data);
          this.selectedCheckpoint= null;
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
  },

  retrieveRoutes() {
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
          this.item_checkpoint = response.data.data.data;
          console.log("get Details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  },

  editItem (id) {
    userRequest.get(`/routes/${id}`)
        .then((response) => {
          this.route = response.data.data;
          console.log("get details route edit", response.data.data.routeCheckpoints);
          let checkedArr= []
          const updatedData= response.data.data.routeCheckpoints.map((o)=> {
            let obj= {...o}
            checkedArr.push(obj.checkpoint)

          })
          console.log("CHCKED ARR", checkedArr)
          this.selectedCheckpoint= checkedArr
          // this.selectedCheckpoint = response.data.data.routeCheckpoints;

        })
        .catch((e) => {
          console.log(e);
        });
  },

  checkpointData(arr)
  {
    let checkedArr= []
          const updatedData= arr.map((o)=> {
            let obj= {...o}
            checkedArr.push(obj.checkpoint.name)
          })
          return checkedArr.join();
  },

  refreshList() {
    this.retrieveRoutes();
    this.retrieveCheckpoints();
  },

  reset () {
    this.submitted= false;
    this.$refs.form.reset()
  },

},

mounted() {
    this.retrieveRoutes();
    this.retrieveCheckpoints();
},

}
</script>

  <style scoped>

  </style>
