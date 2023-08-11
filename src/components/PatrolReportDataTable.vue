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
                <v-row class="pt-2 justify-space-between">
                  <v-col md="2" sm="12">
                    <v-select v-model="itemsPerPage" label="ItemsPerPage" :items="[10, 25, 50]" density="compact"
                      variant="outlined"></v-select>
                    <v-btn color="blue-darken-4" variant="outlined" class="mr-1">CSV</v-btn>
                    <v-btn color="blue-darken-4" variant="outlined" class="mr-1">PDF</v-btn>
                    <v-btn color="blue-darken-4" variant="outlined">Print</v-btn>
                  </v-col>
                  <v-col md="3" sm="12">
                    <v-text-field :modelValue="search" @update:modelValue="updateTextField" v-model="search"
                      append-inner-icon="mdi-magnify" label="Search" density="compact" variant="outlined"></v-text-field>
                    <v-select v-model="selectedGuard" label="Guard Name *" item-value="id" return-object=""
                      item-title="name" :items="this.items_guard" density="compact" variant="outlined"></v-select>
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
      selectedGuard: [],
      guard_select: null,

      headers: [
        { key: 'start', title: 'Date' },
        { key: 'guard', title: 'Guard' },
        { key: 'route', title: 'Route' },
        { key: 'startedAt', title: 'Start' },
        { key: 'completedAt', title: 'End' },
      ],
      items: [],
    }
  },

  //this one will populate new data set when user changes current page.
  watch: {
    page(val) {
      this.retrieveAttendances(val, this.itemsPerPage, this.search, this.guard)
    },
    itemsPerPage(val) {
      this.retrieveAttendances(this.page, val, this.search, this.guard)
    }
  },

  methods: {
    // Get all data...
    retrieveAttendances(page, itemPerPage, search, guard) {
      userRequest.get(`/patrols/attendance?PageNumber=${page}&PageSize=${itemPerPage}&search=${search}&guard=${guard}`)
        .then((response) => {
          this.items = response.data.data.data;
          console.log("Get All", response.data.data.data);
          this.page = response.data.data.pageNumber;
          this.itemsPerPage = response.data.data.pageSize;
          this.totalPage = response.data.data.pageCount;
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

    formatDate(value) {
      return moment(value).format("DD/MM/YYYY")
    },
    // Search ...
    updateTextField: debounce(function debounceRead(e) {
      this.retrieveAttendances(this.page, this.itemsPerPage, e)
    }, 1000),

    // Pagination ......
    pageUpdateFunction(newPageNumber) {
      console.log('Page Update', newPageNumber);
    },

    handlePageChange(page) {
      console.log("HandlePage", page)
      this.retrieveAttendances(page, this.itemsPerPage, this.search, this.guard)
    },
  },
  // Refresh the List...
  refreshList() {
    this.retrieveAttendances(this.page, this.itemsPerPage, this.search, this.guard);
    this.retrieveGuard();
  },

  mounted() {
    this.retrieveAttendances(this.page, this.itemsPerPage, this.search, this.guard);
    this.retrieveGuard();
  },
}
</script>
