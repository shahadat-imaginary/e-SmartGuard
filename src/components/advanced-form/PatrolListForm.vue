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

              <template v-slot:[`item.route`]="{ item }">
                {{ (item.columns.route.name) }}
              </template>

              <template v-slot:[`item.status`]="{ item }">
                {{ (item.columns.status) }}
              </template>

              <template v-slot:[`item.remarks`]="{ item }">
                {{ (item.columns.remarks) }}
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
          <v-card-title>Patrol Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation>
                  <v-text-field v-model="startdate" type="date" label="Start Date *"
                    :rules="[v => !!v || 'Start Date is required']" variant="outlined" required></v-text-field>
                  <v-text-field v-model="startTime" type="time" label="Start Time *"
                    :rules="[v => !!v || 'Start Time is required']" variant="outlined" required></v-text-field>
                  <v-text-field v-model="enddate" type="date" label="End Date *"
                    :rules="[v => !!v || 'End Date is required']" variant="outlined" required></v-text-field>
                  <v-text-field v-model="endTime" type="time" label="End Time *"
                    :rules="[v => !!v || 'End Time is required']" variant="outlined" required></v-text-field>
                  <v-select v-model="selectedGuard" label="Guard Name *" item-value="id" return-object=""
                    item-title="name" :items="this.items_guard" :rules="[(v) => !!v || 'Guard is required']"
                    variant="outlined" required></v-select>
                  <v-select v-model="selectedRoute" label="Route *" item-value="id" return-object="" item-title="name"
                    :items="this.items_route" :rules="[(v) => !!v || 'Route is required']" variant="outlined"
                    required></v-select>

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
import { inject } from 'vue';
import moment from "moment";
import { debounce } from 'lodash'

export default {
  setup() {
    const moment = inject('moment');
    return { moment };
  },
  data: () => ({
    page: 1,
    itemsPerPage: 3,
    totalPage: 1,
    search: '',
    headers: [
      { key: 'id', title: '#', align: ' d-none' },
      { key: 'guard', title: 'Guard' },
      { key: 'route', title: 'Route' },
      { key: 'start', title: 'Start' },
      { key: 'end', title: 'End' },
      { key: 'status', title: 'Status' },
      { key: 'remarks', title: 'Remarks' },
      // { key: 'actions', title: 'Actions', sortable: false },
    ],
    patrolItems: [],
    items_guard: [],
    items_route: [],
    selectedGuard: [],
    selectedRoute: [],
    startTime: null,
    endTime: null,
    startdate: null,
    enddate: null,

    patrol: {
      id: null,
      date: '',
      guardinfo: '',
      route: '',
      guard_select: null,
      route_select: null,
    },

    defaultpatrol: {
      id: null,
      date: null,
      guardinfo: '',
      route: '',
      guard_select: null,
      route_select: null,
    },

  }),
  computed: {
  },

  //this one will populate new data set when user changes current page.
  watch: {
    page(val) {
      this.retrievePatrols(val, this.itemsPerPage, this.search)
    },
    itemsPerPage(val) {
      this.retrievePatrols(this.page, val, this.search)
    }
  },

  methods: {
    // Get all Patrols data...
    retrievePatrols(page, itemPerPage, search) {
      userRequest.get(`/patrols?PageNumber=${page}&PageSize=${itemPerPage}&search=${search}`)
        .then((response) => {

          console.log(" data list", response.data.data.data);
          this.patrolItems = response.data.data.data;

          this.page = response.data.data.pageNumber;
          this.itemsPerPage = response.data.data.pageSize

          this.totalPage = response.data.data.pageCount
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Get All Guards data...
    retrieveGuard() {
      userRequest.get('/guards')
        .then((response) => {
          this.items_guard = response.data.data.data;
          console.log("get Details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Get All Routes data...
    retrieveRoute() {
      userRequest.get('/routes')
        .then((response) => {
          this.items_route = response.data.data.data;
          console.log("get Details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Edit Patrols data...
    editItem(id) {
      this.editing = true;
      userRequest.get(`/patrols/${id}`)
        .then((response) => {
          this.patrol = response.data.data;
          console.log("get details", response.data);
          this.startdate = moment(response.data.data.start).format("YYYY-MM-DD")
          this.startTime = moment(response.data.data.start).format("hh:mm")
          this.enddate = moment(response.data.data.end).format("YYYY-MM-DD")
          this.endTime = moment(response.data.data.end).format("hh:mm")
          this.selectedGuard = response.data.data.guard;
          this.selectedRoute = response.data.data.route;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Update Patrols data...
    update(id) {
      let patrolUpdate = {
        guardId: this.selectedGuard.id,
        routeId: this.selectedRoute.id,
        start: this.startdate + 'T' + this.startTime + ':00',
        end: this.enddate + 'T' + this.endTime + ':00',
      };

      userRequest.put(`/patrols/${id}`, patrolUpdate)
        .then(response => {
          this.patrol = response.data.data;
          console.log(response.data);

          this.startdate = moment(response.data.data.start).format("YYYY-MM-DD")
          this.startTime = moment(response.data.data.start).format("hh:mm")
          this.enddate = moment(response.data.data.end).format("YYYY-MM-DD")
          this.endTime = moment(response.data.data.end).format("hh:mm")
          this.selectedGuard = null;
          this.selectedRoute = null;
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    // Save Patrols data...
    async save() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        if (this.patrol.id) {
          // If ID is present, update data using the API
          this.update(this.patrol.id);
          this.submitted = true;
          setTimeout(() => { this.reset(); }, 2000);
        } else {
          let patrolCreate = {
            guardId: this.selectedGuard.id,
            routeId: this.selectedRoute.id,
            start: this.startdate + 'T' + this.startTime + ':00',
            end: this.enddate + 'T' + this.endTime + ':00',
          };

          userRequest.post('/patrols', patrolCreate)
            .then((response) => {
              this.patrol.id = response.data.id;
              console.log(response.data);
              this.submitted = true;
              setTimeout(() => {
                this.reset();
                this.retrievePatrols(this.page, this.itemsPerPage, this.search);
              }, 2000);
              this.selectedGuard = null;
              this.selectedRoute = null;
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    },

    // Search ...
    updateTextField: debounce(function debounceRead(e) {
      this.retrievePatrols(this.page, this.itemsPerPage, e)
    }, 1000),

    // Pagination ......
    pageUpdateFunction(newPageNumber) {
      console.log('Page Update', newPageNumber);
    },
    handlePageChange(page) {
      console.log("HandlePage", page)
      this.retrievePatrols(page, this.itemsPerPage, this.search)
    },

    // Refresh & Reset the List...
    refreshList() {
      this.retrievePatrols(this.page, this.itemsPerPage, this.search);
      this.retrieveGuard();
      this.retrieveRoute();
    },

    reset() {
      this.patrol = this.defaultpatrol;
      this.submitted = false;
      this.$refs.form.reset();
    },

    formatDateTime(value) {
      return moment(value).format("DD/MM/YYYY, hh:mm A")
    },

  }, //methods end.....

  mounted() {
    this.retrievePatrols(this.page, this.itemsPerPage, this.search);
    this.retrieveGuard();
    this.retrieveRoute();
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
