<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Patrol List</v-toolbar-title>
          </v-toolbar>

          <v-card-item>
            <v-data-table :page="page" :headers="headers" :items="patrolItems" :items-per-page="itemsPerPage"
              :search="search" hide-default-footer>

              <template v-slot:[`item.start`]="{ item }">
                <span>{{ formatDateTime(new Date(item.columns.start).toLocaleString()) }}</span>
              </template>

              <template v-slot:[`item.end`]="{ item }">
                <span>{{ formatDateTime(new Date(item.columns.end).toLocaleString()) }}</span>
              </template>

              <template v-slot:[`item.guard`]="{ item }">
                {{ (item.columns.guard.name) }}
              </template>

              <template v-slot:[`item.campus`]="{ item }">
                {{ (item.columns.route.campus.name) }}
              </template>
              
              <template v-slot:[`item.shift`]="{ item }">
                {{ (item.columns.shift.name) }}
              </template>
              
              <template v-slot:[`item.timeSchedule`]="{ item }">
                {{ (item.columns.timeSchedule.name) }}
              </template>

              <template v-slot:[`item.route`]="{ item }">
                {{ (item.columns.route.name) }}
              </template>

              <template v-slot:[`item.status`]="{ item }">
                {{ (item.columns.status) }}
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" class="me-2" @click="viewItem(item.columns.id)">mdi-eye</v-icon>
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
                    <v-text-field :modelValue="searchPatrol" @update:modelValue="updateTextField" v-model="searchPatrol"
                      append-inner-icon="mdi-magnify" label="Search" density="compact" variant="outlined"></v-text-field>
                  </v-col>
                </v-row>
              </template>

            </v-data-table>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col v-if="adding" md="5" sm="12">
        <v-card elevation="4">
          <v-card-title>Add Patrol</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" lazy-validation>
                  <v-autocomplete v-model:search="searchGuard" v-model="selectedGuard" label="Guard Name *"
                    item-value="id" return-object="" item-title="name" :items="this.guardItems"
                    :rules="[(v) => !!v || 'Guard is required']" variant="outlined" required></v-autocomplete>
                  <v-autocomplete v-model:search="searchCampus" v-model="selectedCampus" label="Campus *"
                    item-value="id" return-object="" item-title="name" :items="this.campusItems"
                    :rules="[(v) => !!v || 'Campus is required']" variant="outlined" required></v-autocomplete>
                  <v-autocomplete v-model:search="searchRoute" v-model="selectedRoute" label="Route *" item-value="id"
                    return-object="" item-title="name" :items="this.routeItems"
                    :rules="[(v) => !!v || 'Route is required']" variant="outlined" required></v-autocomplete>
                  <v-text-field v-if="isRouteSelected" multi-line readonly>{{ formatRoute(selectedRoute) }}</v-text-field>
                  <v-autocomplete v-model:search="searchShift" v-model="selectedShift" label="Shift *"
                    item-value="id" return-object="" item-title="name" :items="this.shiftItems"
                    :rules="[(v) => !!v || 'Shift is required']" variant="outlined" required></v-autocomplete>
                  <v-text-field v-if="isShiftSelected" multi-line readonly>{{ selectedShift.start }} - {{ selectedShift.end }}</v-text-field>
                  <v-autocomplete v-model:search="searchTime" v-model="selectedTime" label="Time *"
                    item-value="id" return-object="" item-title="name" :items="this.timeItems"
                    :rules="[(v) => !!v || 'Time is required']" variant="outlined" required></v-autocomplete>
                  <v-text-field v-if="isTimeSelected" multi-line readonly>{{ timeScheduleData(selectedTime) }}</v-text-field>
                  <v-text-field v-model="startdate" type="date" label="Start Date *"
                    :rules="[v => !!v || 'Start Date is required']" variant="outlined" required></v-text-field>
                  <v-text-field v-model="enddate" type="date" label="End Date *"
                    :rules="[v => !!v || 'End Date is required']" variant="outlined" required></v-text-field>
                  <v-checkbox class="justify-center" v-model="timerEnabled" color="deep-purple" required>
                    <template v-slot:label>
                      Timer enabled
                    </template>
                  </v-checkbox>
                  <div class="d-flex">
                    <v-btn color="success" class="mt-4 mr-2" type="submit">Save</v-btn>
                    <v-btn color="error" class="mt-4" @click="reset">Reset</v-btn>
                  </div>
                  <div v-if="isError" class="d-flex">
                    <v-list-subheader color="error" v-if="errorMessage" type="Error">{{errorMessage}}</v-list-subheader>
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

      <v-col v-if="editing" md="5" sm="12">
        <v-card elevation="4">
          <v-row>
            <v-col md="8" sm="12">
              <v-card-title>Update patrol</v-card-title>
            </v-col>
            <v-col md="4" sm="12">
              <v-btn color="success" class="mt-2" @click="addItem">Add new</v-btn>
            </v-col>
          </v-row>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" lazy-validation>
                  <v-autocomplete v-model:search="searchGuard" v-model="selectedGuard" label="Guard Name *"
                    item-value="id" return-object="" item-title="name" :items="this.guardItems"
                    :rules="[(v) => !!v || 'Guard is required']" variant="outlined" required></v-autocomplete>
                  <v-autocomplete v-model:search="searchCampus" v-model="selectedCampus" label="Campus *"
                    item-value="id" return-object="" item-title="name" :items="this.campusItems"
                    :rules="[(v) => !!v || 'Campus is required']" variant="outlined" required></v-autocomplete>
                  <v-autocomplete v-model:search="searchRoute" v-model="selectedRoute" label="Route *" item-value="id"
                    return-object="" item-title="name" :items="this.routeItems"
                    :rules="[(v) => !!v || 'Route is required']" variant="outlined" required></v-autocomplete>
                  <v-text-field v-if="isRouteSelected" readonly>{{ formatRoute(selectedRoute) }}</v-text-field>
                  <v-autocomplete v-model:search="searchShift" v-model="selectedShift" label="Shift *"
                    item-value="id" return-object="" item-title="name" :items="this.shiftItems"
                    :rules="[(v) => !!v || 'Shift is required']" variant="outlined" required></v-autocomplete>
                  <v-text-field v-if="isShiftSelected" readonly>{{ selectedShift.start }} - {{ selectedShift.end }}</v-text-field>
                  <v-autocomplete v-model:search="searchTime" v-model="selectedTime" label="Time *"
                    item-value="id" return-object="" item-title="name" :items="this.timeItems"
                    :rules="[(v) => !!v || 'Time is required']" variant="outlined" required></v-autocomplete>
                  <v-text-field v-if="isTimeSelected" readonly>{{ timeScheduleData(selectedTime) }}</v-text-field>
                  <v-text-field v-model="startdate" type="date" label="Start Date *"
                    :rules="[v => !!v || 'Start Date is required']" variant="outlined" required></v-text-field>
                  <v-text-field v-model="enddate" type="date" label="End Date *"
                    :rules="[v => !!v || 'End Date is required']" variant="outlined" required></v-text-field>
                  <v-checkbox class="justify-center" v-model="timerEnabled" color="deep-purple" required>
                    <template v-slot:label>
                      Timer enabled
                    </template>
                  </v-checkbox>
                  <div class="d-flex">
                    <v-btn color="success" class="mt-4 mr-2" type="submit">Update</v-btn>
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

      <v-col v-if="viewing" md="5" sm="12">
        <v-card elevation="4">
          <v-row>
            <v-col md="8" sm="12">
              <v-card-title>Patrol Information</v-card-title>
            </v-col>
            <v-col md="4" sm="12">
              <v-btn color="success" class="mt-2" @click="addItem">Add new</v-btn>
            </v-col>
          </v-row>
          
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <v-container>
                <v-row>
                  <v-col md="12" sm="12" class="ma-0 pa-0">
                    <v-text-field v-model="viewPatrolItem.guard.name" label="Guard" readonly></v-text-field>
                  </v-col>
                  <v-col md="12" sm="12" class="ma-0 pa-0">
                    <v-text-field v-model="viewPatrolItem.campus" label="Campus" readonly></v-text-field>
                  </v-col>
                  <v-col md="12" sm="12" class="ma-0 pa-0">
                    <v-textarea v-model="viewPatrolItem.route" auto-grow="true" rows="1" label="Route" readonly></v-textarea>
                  </v-col>
                  <v-col md="12" sm="12" class="ma-0 pa-0">
                    <v-text-field v-model="viewPatrolItem.shiftData" label="Shift" readonly></v-text-field>
                  </v-col>
                  <v-col md="12" sm="12" class="ma-0 pa-0">
                    <v-text-field v-model="viewPatrolItem.time" label="Time" readonly></v-text-field>
                  </v-col>
                  <v-col md="12" sm="12" class="ma-0 pa-0">
                    <v-text-field v-model="viewPatrolItem.date" label="Date" readonly></v-text-field>
                  </v-col>
                  <v-col md="12" sm="12" class="ma-0 pa-0">
                    <v-text-field v-model="viewPatrolItem.status" label="Status" readonly></v-text-field>
                  </v-col>
                  <v-col md="12" sm="12" class="ma-0 pa-0">
                    <v-text-field v-model="viewPatrolItem.timer" label="Timer" readonly></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userRequest from '@/axios/request';
import { inject } from 'vue';
import moment from "moment";
import { debounce } from 'lodash'

export default {
  setup() {
    const moment = inject('moment');
    return { moment };
  },
  data: () => ({
    viewing: false,
    adding: true,
    editing: false,
    page: 1,
    itemsPerPage: 10,
    totalPage: 1,
    timerEnabled: false,
    isError: false,
    errorMessage: "",
    headers: [
      { key: 'id', title: '#', align: ' d-none' },
      { key: 'guard', title: 'Guard' },
      { key: 'campus', title: 'Campus'},
      { key: 'shift', title: 'Shift' },
      { key: 'timeSchedule', title: 'Time' },
      { key: 'route', title: 'Route' },
      { key: 'start', title: 'Start' },
      { key: 'end', title: 'End' },
      { key: 'status', title: 'Status' },
      { key: 'actions', title: 'Actions', sortable: false },
    ],
    patrolItems: [],
    searchPatrol: '',

    campusItems: [],
    selectedCampus: null,
    searchCampus: '',

    shiftItems: [],
    selectedShift: [],
    searchShift: '',
    isShiftSelected: false,

    timeItems: [],
    selectedTime: [],
    searchTime: '',
    isTimeSelected: false,

    guardItems: [],
    selectedGuard: [],
    searchGuard: '',

    routeItems: [],
    selectedRoute: [],
    searchRoute: '',
    isRouteSelected: false,
    
    startdate: null,
    enddate: null,
    submitted: false,
    
    viewPatrolItem: {
      id: null,
      guard: '',
      route: '',
      shift: '',
      shiftData: "",
      time: '',
      date: '',
      status: '',
      timer: ''
    },

    patrol: {
      id: null,
      date: '',
      guard: '',
      route: '',
      guard_select: null,
      route_select: null,
    },

    defaultpatrol: {
      id: null,
      date: null,
      guard: null,
      campus: null,
      route: null,
      shift: null,
      time: null,
      guard_select: null,
      route_select: null,
    },

  }),
  computed: {
  },

  //this one will populate new data set when user changes current page.
  watch: {
    page(val) {
      this.page = val;
      this.retrievePatrols()
    },
    itemsPerPage(val) {
      this.itemsPerPage = val;
      this.retrievePatrols()
    },
    searchCampus(val) {
      val && val !== this.selectedCampus && this.querySelectionsCampus(val)
    },
    searchGuard(val) {
      val && val !== this.selectedGuard && this.querySelectionsGuard(val)
    },
    searchRoute(val) {
      if(val != null && val != ""){
        val && val != this.selectedRoute && this.querySelectionsRoute(val);
        this.isRouteSelected = true;
      }
    },
    searchTime(val) {
      if(val != null && val != ""){
        val && val != this.selectedTime && this.querySelectionTime(val);
        this.isTimeSelected = true;
      }
    },
    searchShift(val) {
      if (val !== null && val !== "") {
        this.isShiftSelected = true;
        this.retrieveShiftDetail()
      }
    }
  },

  methods: {
    // retrieve shift detail
    retrieveShiftDetail() {
    },
    // Get all Patrols data...
    retrievePatrols() {
      userRequest.get(`/patrols?PageNumber=${this.page}&PageSize=${this.itemsPerPage}&search=${this.searchPatrol}`)
        .then((response) => {
          this.patrolItems = [];
          this.patrolItems = response.data.data.data;
          this.page = response.data.data.pageNumber;
          this.itemsPerPage = response.data.data.pageSize
          this.totalPage = response.data.data.pageCount
        })
        .catch((e) => {
          console.log("error", e);
        });
    },

    // Get All Campus data...
    retrieveCampuses() {
      userRequest.get(`/campuses`)
        .then((response) => {
          this.campusItems = response.data.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Get All Time data...
    retrieveTimes() {
      userRequest.get(`/timeschedules`)
        .then((response) => {
          this.timeItems = response.data.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Get All Shift data...
    retrieveShifts() {
      userRequest.get(`/shifts`)
        .then((response) => {
          this.shiftItems = response.data.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Get All Guards data...
    retrieveGuard(search) {
      userRequest.get(`/guards?search=${this.searchGuard}`)
        .then((response) => {
          this.guardItems = response.data.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Search Guards....
    querySelectionsGuard: debounce(function debounceRead(e) {
      this.retrieveGuard(e)
    }, 1000),

    querySelectionsCampus: debounce(function debounceRead(e){
      console.log(e);
      this.retrieveRoute();
    }),

    querySelectionTime: debounce(function debounceRead(e){
      this.retrieveTime();
    }),

    retrieveTime() {
        if (this.selectedTime != null) {
          userRequest.get(`/timeSchedules/${this.selectedTime.id}`)
          .then((response) => {

          })
        }
    },

    // Get All Routes data...
    retrieveRoute() {
      var campusId = this.selectedCampus != null ? this.selectedCampus.id : "";
      userRequest.get(`/routes?campusId=${campusId}&&search=${this.searchRoute}`)
        .then((response) => {
          this.routeItems = response.data.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Search Routes....
    querySelectionsRoute: debounce(function debounceRead(e) {
      this.searchRoute = e;
      this.retrieveRoute()
    }, 1000),

    // Edit Patrols data...
    editItem(id) {
      this.patrol.id = id;
      userRequest.get(`/patrols/${id}`)
        .then((response) => {
          this.patrol = response.data.data;
          this.selectedGuard = response.data.data.guard;
          this.selectedCampus = response.data.data.route.campus,
          this.selectedRoute = response.data.data.route,
          this.selectedShift = response.data.data.shift,
          this.selectedTime = response.data.data.timeSchedule,
          this.startdate = moment(response.data.data.start).format("YYYY-MM-DD")
          this.startTime = moment(response.data.data.start).format("hh:mm")
          this.enddate = moment(response.data.data.end).format("YYYY-MM-DD")
          this.endTime = moment(response.data.data.end).format("hh:mm"),
          this.timerEnabled = response.data.data.timerEnabled
          this.isShiftSelected = true;
          this.isTimeSelected = true;
          this.isRouteSelected = true;
        })
        .catch((e) => {
          
        })
        .finally
        {
          this.adding = false;
          this.viewing = false;
          this.editing = true;
          this.isError = false;
        };
    },

    // Update Patrols data...
    update(id) {
      console.log("Update")
      let patrolUpdate = {
        guardId: this.selectedGuard.id,
        routeId: this.selectedRoute.id,
        shiftId: this.selectedShift.id,
        timeScheduleId: this.selectedTime.id,
        start: this.startdate,
        end: this.enddate,
        timerEnabled: this.timerEnabled,
      };

      userRequest.put(`/patrols/${id}`, patrolUpdate)
        .then(response => {
          this.patrol.id = response.data.id;
          this.submitted = true;
          this.selectedGuard = null;
          this.selectedRoute = null;
          this.refreshList();
          this.resetData();
          this.isError = false;
          this.submitted = true;
          setTimeout(() => {
            this.reset();
          }, 2000);
        })
        .catch(e => {
          console.log(e);
              this.isError = true;
              this.errorMessage = e.response.data.message;
        });
    },

    // Save Patrols data...
    async save() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        if (this.editing) {
          // If ID is present, update data using the API
          this.update(this.patrol.id);
        } else {
          let patrolCreate = {
            guardId: this.selectedGuard.id,
            routeId: this.selectedRoute.id,
            shiftId: this.selectedShift.id,
            timeScheduleId: this.selectedTime.id,
            start: this.startdate,
            end: this.enddate,
            timerEnabled: this.timerEnabled,
          };

          userRequest.post('/patrols', patrolCreate)
            .then((response) => {
              this.patrol.id = response.data.id;
              this.isError = false;
              this.submitted = true;
              setTimeout(() => {
                this.retrievePatrols();
                this.reset();
                this.resetData();
              }, 2000);
            })
            .catch((e) => {
              this.isError = true;
              this.errorMessage = e.response.data.message;
            });
        }
      }
    },

    // Edit Route Items...
    viewItem(id) {
      userRequest.get(`/patrols/${id}`)
        .then((response) => {
          this.viewPatrolItem = response.data.data;
          this.viewPatrolItem.campus = response.data.data.route.campus.name;
          this.viewPatrolItem.route = this.checkpointData(response.data.data.route);
          this.viewPatrolItem.shiftData = `${response.data.data.shift.name} (${response.data.data.shift.start} - ${response.data.data.shift.end})`;
          this.viewPatrolItem.timeSchedule = response.data.data.timeSchedule;
          this.viewPatrolItem.time = response.data.data.timeSchedule.name + "(" + this.timeScheduleData(response.data.data.timeSchedule) + ")";
          this.viewPatrolItem.date = this.formatTime();
          this.viewPatrolItem.timer = response.data.data.timerEnabled ? "Enabled" : "Disabled";
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.viewing = true;
          this.adding = false;
          this.editing = false;
        });
    },

    checkpointData(route) {
      console.log("Route", route)
      let checkedArr = []
      const updatedData = route.routeCheckpoints.map((o) => {
        let obj = { ...o }
        checkedArr.push(obj.checkpoint.name)
      })
      return route.name + "(" + checkedArr.join() + ")";
    },

    timeScheduleData(timeSchedule) {
      let checkedArr = []
      const updatedData = timeSchedule.timeScheduleDetails.map((o) => {
        let obj = { ...o }
        checkedArr.push(obj.time)
      })
      return checkedArr.join();
    },

    formatTime() {
      console.log("Patrol", this.viewPatrolItem)
      return moment(this.viewPatrolItem.start).format("DD/MM/YYYY") + " - " + moment(this.viewPatrolItem.end).format("DD/MM/YYYY")
    },

    formatRoute(route) {
      let checkedArr = []
      const updatedData = route.routeCheckpoints.map((o) => {
        let obj = { ...o }
        checkedArr.push(obj.checkpoint.name)
      })
      return checkedArr.join();
    },

    // Add Route Items...
    addItem() {
      this.patrol = this.defaultpatrol;
      this.viewing = false;
      this.editing = false;
      this.adding = true;
      this.resetData();
    },

    resetData() {
      this.selectedGuard = null;
      this.selectedCampus = null;
      this.selectedRoute = null;
      this.selectedShift = null;
      this.selectedTime = null;
      this.startdate = null;
      this.enddate = null;
      this.isTimeSelected = false;
      this.isShiftSelected = false;
      this.isRouteSelected = false;
    },

    // Search ...
    updateTextField: debounce(function debounceRead(e) {
      this.searchPatrol = e;
      this.retrievePatrols()
    }, 500),

    // Pagination ......
    pageUpdateFunction(newPageNumber) {
      console.log('Page Update', newPageNumber);
    },
    handlePageChange(page) {
      this.page = page;
      this.retrievePatrols()
    },

    // Refresh & Reset the List...
    refreshList() {
      this.retrievePatrols();
      this.retrieveCampuses();
      this.retrieveShifts();
      this.retrieveTimes();
      this.retrieveGuard(this.search);
      this.retrieveRoute(this.search);
    },

    reset() {
      this.patrol = this.defaultpatrol;
      this.submitted = false;
      this.$refs.form.reset();
    },

    formatDateTime(value) {
      return moment(value).format("DD/MM/YYYY")
    },

  }, //methods end.....

  mounted() {
    this.retrievePatrols();
    this.retrieveCampuses();
    this.retrieveShifts();
    this.retrieveTimes();
    this.retrieveGuard(this.search);
    this.retrieveRoute(this.search);
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
