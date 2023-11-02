<template>
    <v-container>
        <v-row>
            <v-col md="12">
                <v-card>
                    <v-card-item style="background-color: #007bff; color: white;">
                        <v-select v-model="selectedCampus" label="Campus"  return-object=""
                            item-title="name" :items="this.campusItems" variant="outlined"
                            @update:modelValue="updateSelectedCampus" class="pt-2"></v-select>
                    </v-card-item>
                    <v-card-item style="padding: 1.25rem;">
                        <GoogleMap api-key="AIzaSyCKIUGDdYeVXnxzWGRz2vkJ_9l90z6Cb3w" style="width: 100%; height: 500px"
                            :center="center" :zoom="15">
                            <Marker :options="{ position: position }" />
                        </GoogleMap>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { defineComponent, ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import Pusher from 'pusher-js';
import userRequest from '@/axios/request';

export default defineComponent({
    components: { GoogleMap, Marker },
    data() {
        return {
            page: 1,
            itemsPerPage: 10,
            totalPage: 1,
            search: '',
            campusItems: [],
            selectedCampus: [],
            center: { lat: 2.317306358694387, lng: 102.32025850270547 },
            position: { lat: 2.317306358694387, lng: 102.32025850270547 },
            items_guard: [],
            pusher: new Pusher('f6980a548c69f46199ba', {
                cluster: 'ap1',
            }),
            channel: null,
        };
    },
    methods: {
        // Get All Guards data...
        retrieveGuard() {
            userRequest.get(`/patrols`)
                .then((response) => {
                    this.items_guard = response.data.data.data.filter((item) => item.status == "Started");
                    this.channel = this.pusher.subscribe('UTeM-Guard');
                    var i = 0;
                    for(; i< this.items_guard.length; i++){
                        this.channel.bind(`guard.activities.${this.items_guard[i].id}`, (data) => { //guard.activities.5
                            if (data.Location != undefined) {
                                this.position = { lat: parseFloat(data.Location.Latitude), lng: parseFloat(data.Location.Longitude) }
                            }
                        });
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        retrieveCampus() {
            userRequest.get(`/campuses`)
                .then((response) => {
                    this.campusItems = response.data.data.data;
                    this.selectedCampus = this.campusItems[0];
                    this.center = { lat: parseFloat(response.data.data.latitude), lng: parseFloat(response.data.data.longitude) }
                    this.position = { lat: parseFloat(response.data.data.latitude), lng: parseFloat(response.data.data.longitude) }
                })
                .catch((e) => { 
                });
        },
        updateSelectedCampus() {
            userRequest.get(`/campuses/${this.selectedCampus.id}`)
                .then((response) => {
                    console.log("Get Campus:", response.data.data.latitude);
                    this.center = { lat: parseFloat(response.data.data.latitude), lng: parseFloat(response.data.data.longitude) }
                    this.position = { lat: parseFloat(response.data.data.latitude), lng: parseFloat(response.data.data.longitude) }
                })
                .catch((e) => { 
                });
        }
    },
    // Refresh the List...
    refreshList() {
        this.retrieveGuard();
    },

    mounted() {
        this.retrieveGuard();
        this.retrieveCampus();
    },
});
</script>