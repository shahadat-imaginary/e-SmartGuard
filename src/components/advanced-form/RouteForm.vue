<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Route List</v-toolbar-title>
          </v-toolbar>

          <v-card-item>
            <v-data-table :page="page" :headers="headers" :items="routeItems" :search="search"
              :items-per-page="itemsPerPage" hide-default-footer>

              <template v-slot:[`item.campus`]="{ item }">
                {{ (item.columns.campus.name) }}
              </template>

              <template v-slot:[`item.routeCheckpoints`]="{ item }">
                {{ checkpointData(item.columns.routeCheckpoints) }}
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" class="me-2" @click="editItem(item.columns.id)">mdi-square-edit-outline</v-icon>
              </template>

              <template v-slot:bottom>
                <div class="text-center pt-2">
                  <v-pagination v-model="page" :length="totalPage" :total-visible="6"></v-pagination>
                </div>
              </template>

              <template v-slot:top>
                <v-row class="pt-2 justify-space-between">
                  <v-col md="2" sm="12">
                    <v-select v-model="itemsPerPage" label="ItemsPerPage" :items="[10, 25, 50]" density="compact"
                      variant="outlined"></v-select>
                  </v-col>
                  <v-col md="4" sm="12">
                    <v-text-field :modelValue="search" @update:modelValue="updateTextField" v-model="search"
                      append-inner-icon="mdi-magnify" label="Search" density="compact" variant="outlined"></v-text-field>
                  </v-col>
                </v-row>
              </template>
            </v-data-table>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col md="5" sm="12">
        <v-card elevation="4">
          <v-row>
            <v-col md="8" sm="12">
              <v-card-title>Route Information</v-card-title>
            </v-col>
            <v-col v-if="editing" md="4" sm="12">
              <v-btn color="success" class="mt-2" @click="addItem">Add new</v-btn>
            </v-col>
          </v-row>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" lazy-validation>
                  <v-text-field v-model="route.name" label="Route Name *" variant="outlined"
                    :rules="[v => !!v || 'Route Name is required']" required></v-text-field>
                  <v-select v-model="selectedCampus" label="Campus *" item-value="id" return-object="" item-title="name"
                      :items="this.campustItems" :rules="[(v) => !!v || 'Campus is required']" variant="outlined"
                      required></v-select>
                  <v-autocomplete v-if="editing" v-model="selectedStatus" label="Status *" item-title="name" :items="this.statusItems"
                    :rules="[(v) => !!v || 'Status is required']" variant="outlined" required></v-autocomplete>
                  <v-checkbox class="justify-center" v-model="route.followSequence" color="deep-purple" required>
                    <template v-slot:label>
                      Follow the sequence
                    </template>
                  </v-checkbox>
                  <div>
                    <v-row>

                      <v-col md="10" v-for="(data, index) in inputFields" :key="index">
                        <v-row>
                          <!-- {{JSON.stringify(this.item_checkpoint)}} -->
                          <v-col md="7">
                            <v-autocomplete v-model:search="searchCheckpoint" v-model="data.selectedCheckpoint"
                              label="Check Point *" item-value="id" return-object item-title="name"
                              :items="this.item_checkpoint" variant="outlined" :rules="[v => !!v || 'Item is required']"
                              required></v-autocomplete>
                          </v-col>
                          <v-col md="3">
                            <v-text-field v-model="data.expectedTime" label="ExpectedTime" type="number" :rules="timeRules"
                              variant="outlined"></v-text-field>
                          </v-col>
                          <v-col md="2">
                            <v-btn v-if="inputFields.length > 1" @click="removeInputFields(index)" color="error" outlined
                              icon="mdi-delete-circle"></v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col md="2">
                        <v-btn @click="addInputField" color="success" icon="mdi-plus-circle" outlined></v-btn>
                      </v-col>
                    </v-row>
                  </div>

                  <div class="d-flex">
                    <v-btn color="success" class="mt-4 mr-2" type="submit">Save</v-btn>
                    <v-btn color="error" class="mt-4" @click="reset">Reset</v-btn>
                  </div>
                </v-form>
                <div v-if="isError" class="d-flex">
                  <v-list-subheader color="error" v-if="errorMessage" type="Error">{{errorMessage}}</v-list-subheader>
                </div>
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
import { debounce } from 'lodash';

export default {
  data: () => ({
    page: 1,
    itemsPerPage: 10,
    totalPage: 1,
    search: '',
    searchCheckpoint: '',
    submitted: false,
    isError: false,
    errorMessage: "",
    headers: [
      { key: 'id', title: '#', align: ' d-none' },
      { key: 'name', title: 'Route Name' },
      { key: 'campus', title: 'Campus' },
      { key: 'routeCheckpoints', title: 'Check Point List' },
      { key: 'status', title: 'Status' },
      { key: 'actions', title: 'Actions', sortable: false },
    ],

    routeItems: [],
    campustItems: [],
    item_checkpoint: [],
    selectedCheckpoint: [],
    selectedCampus: null,
    editing: false,
    statusItems: ['Active', 'Inactive'],
    selectedStatus: "",

    route: {
      id: null,
      name: '',
      campusId: null,
      followSequence: false,
      routeCheckpoints: null,
    },
    defaultRoute: {
      id: null,
      name: '',
      campusId: null,
      followSequence: false,
      routeCheckpoints: null,
    },
    inputFields: [
      {
        selectedCheckpoint: null,
        expectedTime: null,
      },
    ],

  }),

  computed: {
    timeRules() {
      return [
        (v) => v !== "" || 'Time is required',
        (v) => /^\d+$/.test(v) || 'The value must be number',
        (v) => v >= 0 || 'The value must be greater than zero',
      ];
    },
  },

  //this one will populate new data set when user changes current page.
  watch: {
    page(val) {
      this.page = val;
      this.retrieveRoutes()
    },
    itemsPerPage(val) {
      this.itemsPerPage = val;
      this.retrieveRoutes()
    },
    searchCheckpoint(val) {
      console.log("Search Checkpoint", val)
      this.retrieveCheckpoints(val)
    },
  },


  methods: {
    addItem() {
      this.reset();
    },
    retrieveCampuses() {
      userRequest.get(`/campuses`)
        .then((response) => {
          this.campustItems = response.data.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // Get All Route Items...
    retrieveRoutes() {
      userRequest.get(`/all-routes?PageNumber=${this.page}&PageSize=${this.itemsPerPage}&search=${this.search}`)
        .then((response) => {
          this.routeItems = response.data.data.data;
          this.page = response.data.data.pageNumber;
          this.itemsPerPage = response.data.data.pageSize;
          this.totalPage = response.data.data.pageCount;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Get All CheckPoint Items...
    retrieveCheckpoints(search) {
      userRequest.get(`/checkpoints?search=${search}`)
        .then((response) => {
          this.item_checkpoint = response.data.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Add selectedCheckpoint & expectedTime Input Field...
    addInputField() {
      this.searchCheckpoint = "";
      this.retrieveCheckpoints(this.searchCheckpoint);
      this.inputFields.push({
        selectedCheckpoint: null,
        expectedTime: null,
      });
    },

    // Remove selectedCheckpoint & expectedTime Input Field...
    removeInputFields(index) {
      this.inputFields.splice(index, 1);
    },

    // Edit Route Items...
    editItem(id) {
      this.editing = true;
      this.isError = false;
      userRequest.get(`/routes/${id}`)
        .then((response) => {
          this.route = response.data.data;
          this.selectedCampus = response.data.data.campus;
          this.selectedStatus = response.data.data.status;
          // let checkedArr = []
          const updatedData = response.data.data.routeCheckpoints.map((o) => {
            let obj = { selectedCheckpoint: o.checkpoint, expectedTime: o.expectedTime }
            return obj
          })
          this.inputFields = updatedData

        })
        .catch((e) => {
          console.log(e);
        });
      },
    // Search ....
    updateTextField: debounce(function debounceRead(e) {
      this.retrieveRoutes(this.page, this.itemsPerPage, e)
    }, 1000),
    handlePageChange(page) {
      this.retrieveRoutes(page, this.itemsPerPage, this.search)
    },

    // Update Route Items...
    update(id) {
      let routeCheckpointsArr = this.inputFields.map((o) => {
        let obj = {
          checkpointId: o.selectedCheckpoint.id,
          ExpectedTime: o.expectedTime,
        }
        return obj
      })
      let routeUpdate = {
        name: this.route.name,
        campusId: this.selectedCampus.id,
        followSequence: this.route.followSequence,
        routeCheckpoints: routeCheckpointsArr,
        status: this.selectedStatus
      };
      userRequest.put(`/routes/${id}`, routeUpdate)
        .then(response => {
          this.route = response.data.data;
          this.inputFields = [{ selectedCheckpoint: null, expectedTime: null, }];
          this.editing = false;
          this.isError = false;
          this.submitted = true;
          setTimeout(() => { 
            this.reset(); }, 
          500);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
          this.isError = true;
          this.errorMessage = e.response.data.message;
        });
    },

    // Save Route Items...
    async save() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        if (this.route.id) {
          // If ID is present, update data using the API
          this.update(this.route.id);
        } else {

          let routeCheckpointsArr = this.inputFields.map((o) => {
            let obj = {
              checkpointId: o.selectedCheckpoint.id,
              ExpectedTime: o.expectedTime
            }
            return obj
          })
          console.log(this.route)
          let routeCreate = {
            name: this.route.name,
            campusId: this.selectedCampus.id,
            followSequence: this.route.followSequence,
            routeCheckpoints: routeCheckpointsArr
          };
          userRequest.post('/routes', routeCreate)
            .then((response) => {
              this.route.id = response.data.id;
              this.isError = false;
              this.submitted = true;
              setTimeout(() => {
                this.retrieveRoutes();
                this.reset();
              }, 2000);
              this.selectedCheckpoint = null;
            })
            .catch((e) => {
              console.log(e);
              this.isError = true;
              this.errorMessage = e.response.data.message;
            });
        }
      }
    },

    // Search ....
    updateTextField: debounce(function debounceRead(e) {
      this.search = e;
      this.retrieveRoutes()
    }, 1000),

    handlePageChange(page) {
      this.page = page;
      this.retrieveRoutes()
    },

    checkpointData(arr) {
      let checkedArr = []
      const updatedData = arr.map((o) => {
        let obj = { ...o }
        checkedArr.push(obj.checkpoint.name)
      })
      return checkedArr.join();
    },

    // Refresh & Reset the List...
    refreshList() {
      this.retrieveRoutes(this.page, this.itemsPerPage, this.search);
      this.retrieveCheckpoints(this.searchCheckpoint);
    },

    reset() {
      this.route = this.defaultRoute;
      this.isError = false;
      this.submitted = false;
      this.editing = false;
      this.selectedCampus = null;
      this.inputFields = [{
        selectedCheckpoint: null,
        expectedTime: null,
      }];
      this.$refs.form.reset()
    },

  },

  mounted() {
    this.retrieveRoutes();
    this.retrieveCampuses();
    this.retrieveCheckpoints(this.searchCheckpoint);
  },
}
</script>

<style scoped></style>