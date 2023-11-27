<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Time List</v-toolbar-title>
          </v-toolbar>

          <v-card-item>
            <v-data-table :page="page" :headers="headers" :items="timeItems" :search="search"
              :items-per-page="itemsPerPage" hide-default-footer>

              <template v-slot:[`item.timeScheduleDetails`]="{ item }">
                {{ timeData(item.columns.timeScheduleDetails) }}
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
          <v-card-title>Time Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" lazy-validation>
                  <v-text-field v-model="time.name" label="Time Name *" variant="outlined"
                    :rules="[v => !!v || 'Time Name is required']" required></v-text-field>
                  <div>
                    <v-row>

                      <v-col md="10" v-for="(data, index) in inputFields" :key="index">
                        <v-row>
                          <v-col md="7">
                            <v-text-field v-model="data.selectedTime" type="time" label="Time *"
                            :rules="[v => !!v || 'Time is required']" variant="outlined" required></v-text-field>
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
                    
                    <v-autocomplete v-if="editing" v-model="selectedStatus" label="Status *" item-title="name" :items="this.statusItems"
                      :rules="[(v) => !!v || 'Status is required']" variant="outlined" required></v-autocomplete>
                  
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
    searchTime: '',
    submitted: false,
    editing: false,
    headers: [
      { key: 'id', title: '#', align: ' d-none' },
      { key: 'name', title: 'Route Name' },
      { key: 'timeScheduleDetails', title: 'Time List' },
      { key: 'status', title: 'Status' },
      { key: 'actions', title: 'Actions', sortable: false },
    ],
    
    selectedStatus: "",
    statusItems: ["Active", "Inactive"],

    timeItems: [],

    time: {
      id: null,
      name: '',
      timeScheduleDetails: null,
    },
    defaultTime: {
      id: null,
      name: '',
      timeScheduleDetails: null,
    },
    inputFields: [
      {
        selectedTime: null,
      },
    ]
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
    searchTime(val) {
      val && val !== this.selectedTime && this.querySelections(val)
    },
  },

  methods: {
    // Get All Route Items...
    retrieveTimes() {
      userRequest.get(`/all-timeschedules?PageNumber=${this.page}&PageSize=${this.itemsPerPage}&search=${this.search}`)
        .then((response) => {
          this.timeItems = response.data.data.data;
          console.log("get", response.data);
          this.page = response.data.data.pageNumber;
          this.itemsPerPage = response.data.data.pageSize;
          this.totalPage = response.data.data.pageCount;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Add selectedCheckpoint & expectedTime Input Field...
    addInputField() {
      this.inputFields.push({
        selectedTime: null,
      });
    },

    // Remove selectedCheckpoint & expectedTime Input Field...
    removeInputFields(index) {
      this.inputFields.splice(index, 1);
    },

    // Edit Route Items...
    editItem(id) {
      this.editing = true;
      userRequest.get(`/timeschedules/${id}`)
        .then((response) => {
          this.time = response.data.data;
          this.selectedStatus = response.data.data.status;
          console.log("get details route edit", response.data.data.timeScheduleDetails);
          // let checkedArr = []
          const updatedData = response.data.data.timeScheduleDetails.map((o) => {
            let obj = { selectedTime: o.time }
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
      console.log("update", id);
      let timesArr = this.inputFields.map((o) => {
        let obj = {
          time: o.selectedTime,
        }
        return obj
      })
      let timeUpdate = {
        name: this.time.name,
        timeScheduleDetails: timesArr,
        status: this.selectedStatus
      };
      userRequest.put(`/timeschedules/${id}`, timeUpdate)
        .then(response => {
          this.time = response.data.data;
          this.inputFields = [{ selectedTime: null }];
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          this.editing = false;
        });
    },

    // Save Route Items...
    async save() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        if (this.time.id) {
          // If ID is present, update data using the API
          this.update(this.time.id);
          this.submitted = true;
          setTimeout(() => { this.reset(); }, 2000);
        } else {
          console.log("asd", this.selectedTime)
          let timeScheduleDetailsArr = this.inputFields.map((o) => {
            let obj = {
              time: o.selectedTime + ":00"
            }
            return obj
          })

          let timeCreate = {
            name: this.time.name,
            timeScheduleDetails: timeScheduleDetailsArr
          };

          userRequest.post('/timeschedules', timeCreate)
            .then((response) => {
              this.time.id = response.data.id;
              this.submitted = true;
              setTimeout(() => {
                this.retrieveTimes();
                this.reset();
              }, 2000);
              this.searchTime = null;
            })
            .catch((e) => {
              console.log(e);
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

    timeData(arr) {
      let checkedArr = []
      const updatedData = arr.map((o) => {
        let obj = { ...o }
        checkedArr.push(obj.time)
      })
      return checkedArr.join();
    },

    // Refresh & Reset the List...
    refreshList() {
      this.retrieveTimes();
    },

    reset() {
      this.route = this.defaultRoute;
      this.submitted = false;
      this.inputFields = [{
        selectedTime: null,
      }];
      this.$refs.form.reset()
    },

  },

  mounted() {
    this.retrieveTimes();
  },

}
</script>

<style scoped></style>