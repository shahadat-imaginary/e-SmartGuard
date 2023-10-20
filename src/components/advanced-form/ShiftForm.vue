<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Shift List</v-toolbar-title>
          </v-toolbar>

          <v-card-item>
            <v-data-table :page="page" :headers="headers" :items="shiftItems" :items-per-page="itemsPerPage"
              :search="search" hide-default-footer>
              
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
          <v-card-title>Shift Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation>
                  <v-text-field v-model="shift.name" label="Name *" variant="outlined" :rules="nameRules"
                    required></v-text-field>
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
    headers: [
      { key: 'id', title: '#', align: ' d-none' },
      { key: 'name', title: 'Name' },
      { key: 'actions', title: 'Actions', sortable: false },
    ],

    shiftItems: [],
    editing: false,
    status: ['Active', 'Inactive'],

    shift: {
      id: null,
      name: ''
    },

    defaultShift: {
      id: null,
      name: ''
    }
  }),

  computed: {
    nameRules() {
      return [
        (v) => !!v || 'Name is required',
        (v) => v.length >= 3 || 'Name must be at least 3 characters',
      ];
    }
  },

  //this one will populate new data set when user changes current page.
  watch: {
    page(val) {
      this.page = val;
      this.retrieveShifts()
    },
    itemsPerPage(val) {
      this.itemPerPage = val;
      this.retrieveShifts()
    }
  },


  methods: {
    // Get all Guard data...
    retrieveShifts() {
      userRequest.get(`/shifts?PageNumber=${this.page}&PageSize=${this.itemsPerPage}&search=${this.search}`)
        .then((response) => {
          this.shiftItems = response.data.data.data;
          console.log("Get Shift:", response.data);
          this.page = response.data.data.pageNumber;
          this.itemsPerPage = response.data.data.pageSize;
          this.totalPage = response.data.data.pageCount;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Edit Guard data...
    editItem(id) {
      this.editing = true;
      userRequest.get(`/shifts/${id}`)
        .then((response) => {
          this.shift = response.data.data;
          console.log("Get details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Update Guard data...
    update(id) {
      let shiftUpdate = {
        name: this.shift.name
      };
      this.editing = false;
      userRequest.put(`/shifts/${id}`, shiftUpdate)
        .then(response => {
          this.shift = response.data.data;
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    // Save Guard data...
    async save() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        if (this.shift.id) {
          // If ID is present, update data using the API
          this.update(this.shift.id);
          this.submitted = true;
          setTimeout(() => { this.reset(); }, 2000);
        } else {
          let shiftCreate = {
            name: this.shift.name
          };

          userRequest.post('/shifts', shiftCreate)
            .then((response) => {
              this.shift.id = response.data.id;
              console.log(response.data);
              this.submitted = true;
              setTimeout(() => {
                this.retrieveShifts();
                this.reset();
              }, 2000);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    },

    // Search ...
    updateTextField: debounce(function debounceRead(e) {
      this.search = e;
      this.retrieveShifts()
    }, 1000),

    // Pagination ......
    pageUpdateFunction(newPageNumber) {
      console.log('Page Update', newPageNumber);
    },

    handlePageChange(page) {
      this.page = page;
      this.retrieveShifts()
    },

    // Refresh & Reset the List...
    refreshList() {
      this.retrieveShifts();
          this.reset();
    },

    reset() {
      this.shift = this.defaultShift;
      this.editing = false;
      this.submitted = false;
      this.$refs.form.reset();
    },

  }, //Methods end.....

  mounted() {
    this.retrieveShifts();
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
