<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
          <v-card>
              <v-toolbar>
                <v-toolbar-title>Patrol List</v-toolbar-title>
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
                  :items="patrolItems"
                  :search="search">

                  <template v-slot:[`item.date`]="{ item }">
                    <!-- {{ item.columns.id }} -->
                    {{(item.columns.start)}} - {{(item.columns.end)}}
                  </template>

                  <template v-slot:[`item.guard`]="{ item }">
                    {{(item.columns.guard.name)}}
                  </template>
                  <template v-slot:[`item.route`]="{ item }">
                    {{(item.columns.route.name)}}
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
          <v-card-title>Patrol Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation>
                  <v-text-field v-model="startdate" type="date" label="Start Date *" variant="outlined" required ></v-text-field>
                  <v-text-field v-model="startTime" type="time" label="Start Time *" variant="outlined" required></v-text-field>
                  <v-text-field v-model="enddate" type="date" label="End Date *" variant="outlined" required ></v-text-field>
                  <v-text-field v-model="endTime" type="time" label="End Time *" variant="outlined" required></v-text-field>
                  <v-select v-model="selectedGuard" label="Guard Name *" item-value="id" return-object="" item-title="name" :items="this.items_guard"  variant="outlined" required></v-select>
                  <v-select v-model="selectedRoute" label="Route *" item-value="id" return-object="" item-title="name" :items="this.items_route" variant="outlined" required></v-select>

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

  export default {
    setup() {
      const moment = inject('moment');
      return { moment };
    },
    data: () => ({
        search: '',
        headers: [
            { key: 'id', title: '#', align: ' d-none' },
            { key: 'start', title: 'StartDate' },
            { key: 'end', title: 'EndDate' },
            { key: 'guard', title: 'Guard'},
            { key: 'route', title: 'Route' },
            { key: 'actions', title: 'Actions', sortable: false },
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

      methods: {

        async save() {
          if (this.patrol.id) {
              // If ID is present, update data using the API
              this.update(this.patrol.id);
              this.submitted = true;
              setTimeout(() => {this.reset();}, 2000);
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
                    this.retrievePatrols();
                  }, 2000);
                  this.selectedGuard= null;
                  this.selectedRoute= null;
                })
                .catch((e) => {
                  console.log(e);
                });
            }
        },

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
                // this.selectedSupervisor= this.selectedSupervisor.id;
                this.startdate=moment(response.data.data.start).format("YYYY-MM-DD")
                this.startTime=moment(response.data.data.start).format("HH:MM")
                this.enddate=moment(response.data.data.end).format("YYYY-MM-DD")
                this.endTime=moment(response.data.data.end).format("HH:MM")
                this.selectedGuard= null;
                this.selectedRoute= null;
                this.refreshList();
              })
              .catch(e => {
                console.log(e);
              });
        },

        retrievePatrols() {
            userRequest.get('/patrols')
              .then((response) => {
                this.patrolItems = response.data.data.data;
                console.log("get", response.data);
              })
              .catch((e) => {
                console.log(e);
              });
        },

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

        editItem (id) {
          this.editing= true;
          userRequest.get(`/patrols/${id}`)
              .then((response) => {
                this.patrol = response.data.data;
                console.log("get details", response.data);
                // console.log("get details time", );
                // console.log('start11:', (response.data.data.start),);
                // console.log('start:', moment(response.data.start).format("YYYY-MM-DD"),);
                // console.log('End:', moment(response.data.end).format("YYYY-MM-DD"),);
                this.startdate=moment(response.data.data.start).format("YYYY-MM-DD")
                this.startTime=moment(response.data.data.start).format("HH:MM")
                this.enddate=moment(response.data.data.end).format("YYYY-MM-DD")
                this.endTime=moment(response.data.data.end).format("HH:MM")
                this.selectedGuard = response.data.data.guard;
                this.selectedRoute = response.data.data.route;
              })
              .catch((e) => {
                console.log(e);
              });
        },

        refreshList() {
          this.retrievePatrols();
          this.retrieveGuard();
          this.retrieveRoute();
        },

        reset () {
          this.patrol = this.defaultpatrol;
          this.submitted= false;
          this.$refs.form.reset();
        },

        },

        mounted() {
          this.retrievePatrols();
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
