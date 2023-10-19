<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Shift List</v-toolbar-title>
          </v-toolbar>

          <v-card-item>
            <v-data-table :page="page" :headers="headers" :items="campusItems" :items-per-page="itemsPerPage"
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
                  <v-text-field v-model="campus.name" label="Name *" variant="outlined" :rules="nameRules"
                    required></v-text-field>
                  <v-text-field v-model="campus.latitude" label="Latitude *" :type="Number" variant="outlined"
                    :rules="latitudeRules" required></v-text-field>
                  <v-text-field v-model="campus.longitude" label="Longitude" type="Number" variant="outlined" :rules="longitudeRules"
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
      { key: 'latitude', title: 'Latitude.', sortable: false },
      { key: 'longitude', title: 'Longitude', sortable: false },
      { key: 'actions', title: 'Actions', sortable: false },
    ],

    campusItems: [],
    editing: false,

    campus: {
      id: null,
      name: '',
      latitude: null,
      longitude: null
    },

    defaultcampus: {
      id: null,
      name: '',
      latitude: null,
      longitude: null
    },

  }),

  computed: {
    nameRules() {
      return [
        (v) => !!v || 'Name is required',
        (v) => v.length >= 3 || 'Name must be at least 3 characters',
      ];
    },
    latitudeRules() {
      return [
        (v) => !!v || 'Latitude is required',
        (v) => v > 0 || 'Latitude must be valid'
      ];
    },
    longitudeRules() {
      return [
        (v) => !!v || 'Longitude is required',
        (v) => v > 0 || 'Longitude must be valid'
      ];
    }
  },

  //this one will populate new data set when user changes current page.
  watch: {
    page(val) {
      this.page = val;
      this.retrieveCampuses()
    },
    itemsPerPage(val) {
      this.itemsPerPage = val;
      this.retrieveCampuses()
    }
  },


  methods: {
    // Get all Guard data...
    retrieveCampuses() {
      userRequest.get(`/campuses?PageNumber=${this.page}&PageSize=${this.itemsPerPage}&search=${this.search}`)
        .then((response) => {
          this.campusItems = response.data.data.data;
          console.log("Get Campus:", response.data.data.data);
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
      userRequest.get(`/campuses/${id}`)
        .then((response) => {
          this.campus = response.data.data;
          console.log("Get details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Update Guard data...
    update(id) {
      let campusUpdate = {
        name: this.campus.name,
        latitude: this.campus.latitude,
        longitude: this.campus.longitude
      };
      this.editing = false;
      userRequest.put(`/campuses/${id}`, campusUpdate)
        .then(response => {
          this.campus = response.data.data;
          console.log("Update Campus:", response.data);
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
        if (this.campus.id) {
          // If ID is present, update data using the API
          this.update(this.campus.id);
          this.submitted = true;
          setTimeout(() => { this.reset(); }, 2000);
        } else {
          let campusCreate = {
            name: this.campus.name,
            latitude: this.campus.latitude,
            longitude: this.campus.longitude
          };

          userRequest.post('/campuses', campusCreate)
            .then((response) => {
              this.campus.id = response.data.id;
              this.submitted = true;
              setTimeout(() => {
                this.reset();
                this.retrieveCampuses();
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
      this.retrieveCampuses()
    }, 1000),

    // Pagination ......
    pageUpdateFunction(newPageNumber) {
      console.log('Page Update', newPageNumber);
    },

    handlePageChange(page) {
      this.page = page;
      this.retrieveCampuses()
    },

    // Refresh & Reset the List...
    refreshList() {
      this.retrieveCampuses();
    },

    reset() {
      this.campus = this.defaultcampus;
      this.editing = false;
      this.submitted = false;
      this.$refs.form.reset();
    },

  }, //Methods end.....

  mounted() {
    this.retrieveCampuses();
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
