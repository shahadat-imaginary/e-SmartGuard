<template>
    <v-container>
        <v-row>
            <v-col md="12">
                <v-card>
                    <v-card-item style="background-color: #007bff; color: white;">
                        Main Campus
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
            center: { lat: 2.317306358694387, lng: 102.32025850270547 },
            position: { lat: 2.317306358694387, lng: 102.32025850270547 },
            items_guard: [],
            pusher: new Pusher('f6980a548c69f46199ba', {
                cluster: 'ap1',
            }),
            channel: null,
        };
    },
    created() {
        // const pusher = new Pusher('f6980a548c69f46199ba', {
        //     cluster: 'ap1',
        // });
        // const channel = pusher.subscribe('UTeM-Guard');
        // var i = 0;
        // for(; i< this.items_guard.length; i++){
        //     channel.bind('item.guard.id', (data) => { //guard.activities.5
        //         if (data.Location != undefined) {
        //             // this.position = { lat: parseFloat(data.Location.Latitude), lng: parseFloat(data.Location.Longitude) }
        //             console.log(this.position);
        //         }
        //         console.log('Test', data);
        //     });
        // }
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
    },
    // Refresh the List...
    refreshList() {
        this.retrieveGuard();
    },

    mounted() {
        this.retrieveGuard();
    },
});
</script>