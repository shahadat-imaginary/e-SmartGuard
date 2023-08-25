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
          <v-card-title>Route Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation>
                  <v-text-field v-model="route.name" label="Route Name *" variant="outlined"
                    :rules="[v => !!v || 'Route Name is required']" required></v-text-field>
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
    // followSequence: false,
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
      followSequence: false,
      routeCheckpoints: null,
    },
    defaultRoute: {
      id: null,
      name: '',
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
      this.retrieveRoutes(val, this.itemsPerPage, this.search)
    },
    itemsPerPage(val) {
      this.retrieveRoutes(this.page, val, this.search)
    },
    searchCheckpoint(val) {
      val && val !== this.selectedCheckpoint && this.querySelections(val)
    },
  },

  methods: {
    // Get All Route Items...
    retrieveRoutes(page, itemPerPage, search) {
      userRequest.get(`/routes?PageNumber=${page}&PageSize=${itemPerPage}&search=${search}`)
        .then((response) => {
          this.routeItems = response.data.data.data;
          console.log("get", response.data);
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
          console.log("get Details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Search ....
    querySelections: debounce(function debounceRead(e) {
      this.retrieveCheckpoints(e)
    }, 1000),

    // Add selectedCheckpoint & expectedTime Input Field...
    addInputField() {
      this.inputFields.push({
        selectedCheckpoint: [],
        expectedTime: null,
      });
    },

    // Remove selectedCheckpoint & expectedTime Input Field...
    removeInputFields(index) {
      this.inputFields.splice(index, 1);
    },

    // Edit Route Items...
    editItem(id) {
      userRequest.get(`/routes/${id}`)
        .then((response) => {
          this.route = response.data.data;
          console.log("get details route edit", response.data.data.routeCheckpoints);
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
        followSequence: this.route.followSequence,
        routeCheckpoints: routeCheckpointsArr,
      };
      userRequest.put(`/routes/${id}`, routeUpdate)
        .then(response => {
          this.route = response.data.data;
          console.log(response.data);
          this.inputFields = [{ selectedCheckpoint: null, expectedTime: null, }];
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    // Save Route Items...
    async save() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        if (this.route.id) {
          // If ID is present, update data using the API
          this.update(this.route.id);
          this.submitted = true;
          setTimeout(() => { this.reset(); }, 2000);
        } else {

          let routeCheckpointsArr = this.inputFields.map((o) => {
            let obj = {
              checkpointId: o.selectedCheckpoint.id,
              ExpectedTime: o.expectedTime
            }
            return obj
          })

          let routeCreate = {
            name: this.route.name,
            followSequence: this.route.followSequence,
            routeCheckpoints: routeCheckpointsArr
          };

          userRequest.post('/routes', routeCreate)
            .then((response) => {
              this.route.id = response.data.id;
              console.log(response.data);
              this.submitted = true;
              setTimeout(() => {
                this.reset();
                this.retrieveRoutes(this.page, this.itemsPerPage, this.search);
              }, 2000);
              this.selectedCheckpoint = null;
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    },

    // Search ....
    updateTextField: debounce(function debounceRead(e) {
      this.retrieveRoutes(this.page, this.itemsPerPage, e)
    }, 1000),

    // Pagination ......
    pageUpdateFunction(newPageNumber) {
      console.log('Page Update', newPageNumber);
      // handle other axios request here and update varibles
    },
    handlePageChange(page) {
      console.log("HandlePage", page)
      this.retrieveRoutes(page, this.itemsPerPage, this.search)
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
      this.submitted = false;
      this.inputFields = [{
        selectedCheckpoint: null,
        expectedTime: null,
      }];
      this.$refs.form.reset()
    },

  },

  mounted() {
    this.retrieveRoutes(this.page, this.itemsPerPage, this.search);
    this.retrieveCheckpoints(this.searchCheckpoint);
  },

}
</script>

<style scoped></style>
