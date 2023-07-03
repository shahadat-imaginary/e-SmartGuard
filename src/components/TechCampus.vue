<template>
    <v-container>
          <v-row>
              <v-col md="12">
                <v-card>
                  <v-card-item style="background-color: #007bff; color: white;">
                        Technology Campus
                  </v-card-item>
                  <v-card-item style="padding: 1.25rem;">
                    <GoogleMap api-key="AIzaSyCKIUGDdYeVXnxzWGRz2vkJ_9l90z6Cb3w" style="width: 100%; height: 500px" :center="center" :zoom="15">
                      <Marker :options="{ position: center }" />
                    </GoogleMap>
                  </v-card-item>
                </v-card>
              </v-col>
          </v-row>
      </v-container>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import { GoogleMap, Marker } from "vue3-google-map";
  
  export default defineComponent({
    components: { GoogleMap, Marker },
    setup() {
      const center = { lat: 2.27901, lng: 102.27515 };
      return { center};
    },
  });
  </script>