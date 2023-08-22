<template>
    <v-container>
          <v-row>
              <v-col md="12">
                <v-card>
                    <v-card-item style="background-color: #007bff; color: white;">
                        Main Campus
                    </v-card-item>
                    <v-card-item style="padding: 1.25rem;">
                        <GoogleMap api-key="AIzaSyCKIUGDdYeVXnxzWGRz2vkJ_9l90z6Cb3w" style="width: 100%; height: 500px" :center="center" :zoom="15">
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

  export default defineComponent({
    components: { GoogleMap, Marker },
    data() {
        return {
            center: { lat: 2.317306358694387, lng: 102.32025850270547 },
            position: { lat: 2.317306358694387, lng: 102.32025850270547 },
        };
    },
    created() {
        const pusher = new Pusher('f6980a548c69f46199ba', {
            cluster: 'ap1',
        });
        const channel = pusher.subscribe('UTeM-Guard');

        channel.bind('guard.activities.5', (data) => {
            if(data.Location != undefined){
                this.position = {lat: parseFloat(data.Location.Latitude), lng: parseFloat(data.Location.Longitude)}
                console.log(this.position);
            }
        });
    }
  });
  </script>