<template>
  <v-container>
    <v-row>
      <v-col md="7" sm="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Check Point List</v-toolbar-title>
          </v-toolbar>

          <v-card-item>
            <v-data-table :page="page" :headers="headers" :items="checkPointItems" :items-per-page="itemsPerPage"
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
          <v-card-title>Check Point Information</v-card-title>
          <v-card-text class="mt-3">
            <v-sheet class="mx-auto">
              <div v-if="!submitted">
                <v-form ref="form" @submit.prevent="save" lazy-validation>
                  <v-text-field v-model="checkItem.name" label="Check Point Name *" variant="outlined"
                    :rules="checkpointnameRules" required></v-text-field>
                  <v-text-field v-model="checkItem.latitude" label="Lalitude *" type="number" variant="outlined"
                    :rules="latitudeRules" required></v-text-field>
                  <v-text-field v-model="checkItem.longitude" label="Longitude *" type="number" variant="outlined"
                    :rules="longitudeRules" required></v-text-field>

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
      { key: 'name', title: 'Check Point Name' },
      { key: 'latitude', title: 'Lalitude' },
      { key: 'longitude', title: 'Longitude' },
      { key: 'actions', title: 'Actions', sortable: false },
    ],
    checkPointItems: [],
    submitted: false,

    checkItem: {
      id: null,
      name: '',
      latitude: null,
      longitude: null,
    },
    defaultcheckItem: {
      id: null,
      name: '',
      latitude: null,
      longitude: null,
    },
  }),

  computed: {
    checkpointnameRules() {
      return [
        (v) => !!v || 'Name is required',
        (v) => v.length >= 3 || 'Name must be at least 3 characters',
      ];
    },
    latitudeRules() {
      return [
        (v) => !!v || 'Latitude is required',
      ];
    },
    longitudeRules() {
      return [
        (v) => !!v || 'Longitude is required',
      ];
    },
  },

  //this one will populate new data set when user changes current page.
  watch: {
    page(val) {
      this.retrieveCheckPoint(val, this.itemsPerPage, this.search)
    },
    itemsPerPage(val) {
      this.retrieveCheckPoint(this.page, val, this.search)
    }
  },

  methods: {
    // Get all CheckPoints data...
    retrieveCheckPoint(page, itemPerPage, search) {
      userRequest.get(`/checkpoints?PageNumber=${page}&PageSize=${itemPerPage}&search=${search}`)
        .then((response) => {
          this.checkPointItems = response.data.data.data;
          console.log("Get Checkpoint:", response.data);
          this.page = response.data.data.pageNumber;
          this.itemsPerPage = response.data.data.pageSize;
          this.totalPage = response.data.data.pageCount;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Edit CheckPoints data...
    editItem(id) {
      userRequest.get(`/checkpoints/${id}`)
        .then((response) => {
          this.checkItem = response.data.data;
          console.log("Get details", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Update CheckPoints data...
    update(id) {
      let checkPointUpdate = {
        name: this.checkItem.name,
        latitude: this.checkItem.latitude,
        longitude: this.checkItem.longitude,
      };

      userRequest.put(`/checkpoints/${id}`, checkPointUpdate)
        .then(response => {
          this.checkItem = response.data.data;
          console.log("Update Checkpoint:", response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    // Save CheckPoints data...
    async save() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        if (this.checkItem.id) {
          // If ID is present, update data using the API
          this.update(this.checkItem.id);
          this.submitted = true;
          setTimeout(() => { this.reset(); }, 2000);
        } else {
          let checkPointCreate = {
            name: this.checkItem.name,
            latitude: this.checkItem.latitude,
            longitude: this.checkItem.longitude,
          };

          userRequest.post('/checkpoints', checkPointCreate)
            .then((response) => {
              this.checkItem.id = response.data.id;
              console.log("Create Checkpoint:", response.data);
              this.submitted = true;
              setTimeout(() => {
                this.reset();
                this.retrieveCheckPoint(this.page, this.itemsPerPage, this.search);
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
      this.retrieveCheckPoint(this.page, this.itemsPerPage, e)
    }, 1000),

    // Pagination ......
    pageUpdateFunction(newPageNumber) {
      console.log('Page Update', newPageNumber);
    },

    handlePageChange(page) {
      console.log("HandlePage", page)
      this.retrieveCheckPoint(page, this.itemsPerPage, this.search)
    },

    // Refresh & Reset the List...
    refreshList() {
      this.retrieveCheckPoint(this.page, this.itemsPerPage, this.search);
    },

    reset() {
      this.checkItem = this.defaultcheckItem;
      this.submitted = false;
      this.$refs.form.reset();
    },

  }, //Methods end.....

  mounted() {
    this.retrieveCheckPoint(this.page, this.itemsPerPage, this.search);
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
