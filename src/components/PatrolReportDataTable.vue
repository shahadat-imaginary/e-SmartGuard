<template>
  <v-container>
    <v-row class="mt-0">
      <v-col md="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Patrols Report</v-toolbar-title>
          </v-toolbar>
          <v-card-item>
            <v-data-table :page="page" :headers="headers" :items="items" :items-per-page="itemsPerPage" :search="search"
              hide-default-footer>
              <template v-slot:[`item.start`]="{ item }">
                <span>{{ formatDate(new Date(item.columns.start).toLocaleDateString()) }}</span>
              </template>

              <template v-slot:[`item.guard`]="{ item }">
                <span>{{ item.columns.guard.name }}</span>
              </template>

              <template v-slot:[`item.route`]="{ item }">
                <span>{{ item.columns.route.name }}</span>
              </template>

              <template v-slot:[`item.startedAt`]="{ item }">
                <span>{{ new Date(item.columns.startedAt).toLocaleTimeString() }}</span>
              </template>

              <template v-slot:[`item.completedAt`]="{ item }">
                <span>{{ item.columns.completedAt == null ? "" : new Date(item.columns.completedAt).toLocaleTimeString()
                }}</span>
              </template>
              <template v-slot:bottom>
                <div class="text-center pt-2">
                  <v-pagination v-model="page" :length="totalPage" :total-visible="6"></v-pagination>
                </div>
              </template>
              <template v-slot:top>
                <v-row class="pt-2 justify-start">
                  <v-col md="2" sm="12">
                    <v-select v-model="itemsPerPage" label="ItemsPerPage" :items="[10, 25, 50]" density="compact"
                      variant="outlined"></v-select>
                    <v-btn color="blue-darken-4" variant="outlined" class="m-1" @click="downloadExcel">Excel</v-btn>
                    <v-btn color="blue-darken-4" variant="outlined" class="m-1" @click="downloadPdf">PDF</v-btn>
                  </v-col>
                  <v-col md="3" sm="12">
                    <v-text-field v-model="startdate" type="date" label="Start Date"
                      @update:modelValue="updateStartDateField" density="compact" variant="outlined"></v-text-field>
                    <!-- <v-text-field :modelValue="search" @update:modelValue="updateTextField" v-model="search"
                      append-inner-icon="mdi-magnify" label="Search" density="compact" variant="outlined"></v-text-field>
                    <v-autocomplete v-model:search="searchGuard" v-model="selectedGuard" label="Guard Name *"
                      item-value="id" return-object item-title="name" :items="items_guard" density="compact"
                      variant="outlined" @update:modelValue="updateSelectGuard"></v-autocomplete> -->
                  </v-col>
                  <v-col md="3" sm="12">
                    <v-text-field v-model="enddate" type="date" label="End Date" @update:modelValue="updateEndDateField"
                      density="compact" variant="outlined"></v-text-field>
                  </v-col>
                  <v-col md="3" sm="12">
                    <v-select v-model="selectedStatus" label="Status *" :items="this.status" density="compact"
                      variant="outlined" @update:modelValue="updateSelectStatus"></v-select>
                  </v-col>
                </v-row>
              </template>

            </v-data-table>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userRequest from '@/axios/request';
import { inject } from 'vue';
import moment from "moment";
import { debounce } from 'lodash';

export default {
  setup() {
    const moment = inject('moment');
    return { moment };
  },

  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      totalPage: 1,
      search: '',
      startdate: '',
      enddate: '',
      searchGuard: '',
      selectedGuard: { name: "" },
      guard_select: null,
      items_guard: [],
      status: ['', 'Scheduled', 'Started', 'Missed', 'Completed'],
      selectedStatus: "",
      headers: [
        { key: 'start', title: 'Date' },
        { key: 'guard', title: 'Guard' },
        { key: 'route', title: 'Route' },
        { key: 'startedAt', title: 'Start' },
        { key: 'completedAt', title: 'End' },
        { key: 'status', title: 'Status' },
      ],
      items: [],
    }
  },

  //this one will populate new data set when user changes current page.
  watch: {
    page(val) {
      this.page = val;
      this.retrieveAttendances()
    },
    itemsPerPage(val) {
      this.itemsPerPage = val;
      this.retrieveAttendances()
    },
    searchGuard(val) {
      val && val !== this.selectedGuard && this.querySelectionsGuard(val)
    },
  },

  methods: {
    // Get all Attendance data...
    retrieveAttendances() {
      userRequest.get(`/patrols/attendance?PageNumber=${this.page}&PageSize=${this.itemsPerPage}&startdate=${this.startdate}&enddate=${this.enddate}&status=${this.selectedStatus}`)
        .then((response) => {
          this.items = response.data.data.data;
          console.log("Get All Attendance", response.data.data.data);
          this.page = response.data.data.pageNumber;
          this.itemsPerPage = response.data.data.pageSize;
          this.totalPage = response.data.data.pageCount;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Get All Guards data...
    retrieveGuard(search) {
      userRequest.get(`/guards?search=${search}`)
        .then((response) => {
          this.items_guard = response.data.data.data;
          // console.log("Get All Guards Details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Search Guards....
    querySelectionsGuard: debounce(function debounceRead(e) {
      this.retrieveGuard(e)
    }, 1000),

    downloadExcel() {
      window.open(import.meta.env.VITE_BASE_URL + '/patrols/download-excel', '_blank', 'noreferrer');

      // userRequest.get('/patrols/download-excel')
      //   .then((response) => {

      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },

    downloadPdf() {
      userRequest.get(`/patrols/download-pdf?startdate=${this.startdate}&enddate=${this.enddate}&status=${this.selectedStatus}`)
        .then((response) => {
          console.log("Get All", response.data.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    formatDate(value) {
      return moment(value).format("DD/MM/YYYY")
    },

    // Guard name select search
    updateSelectGuard: debounce(function debounceRead(e) {
      this.selectedGuard = e;
      this.retrieveAttendances()
    }, 1000),

    // Search ...
    updateTextField: debounce(function debounceRead(e) {
      this.search = e;
      this.retrieveAttendances()
    }, 1000),

    // startdate
    updateStartDateField: debounce(function debounceRead(e) {
      this.startdate = e;
      this.retrieveAttendances()
    }, 1000),

    // enddate
    updateEndDateField: debounce(function debounceRead(e) {
      this.enddate = e;
      this.retrieveAttendances()
    }, 1000),

    // Status select search
    updateSelectStatus: debounce(function debounceRead(e) {
      this.selectedStatus = e;
      this.retrieveAttendances()
    }, 1000),

    // Pagination ......
    pageUpdateFunction(newPageNumber) {
      console.log('Page Update', newPageNumber);
    },

    handlePageChange(page) {
      this.page = page;
      this.retrieveAttendances()
    },
  },
  // Refresh the List...
  refreshList() {
    this.retrieveAttendances();
    this.retrieveGuard(this.search);
  },

  mounted() {
    this.retrieveAttendances();
    this.retrieveGuard(this.search);
  },
}
</script>
