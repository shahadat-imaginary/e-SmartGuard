<template>
  <v-container>
    <v-row class="mt-0">
      <v-col md="12" sm="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Route Report</v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col md="12" sm="12">
        <v-autocomplete v-model:search="searchRoute" v-model="data.selectedRoute"
                              label="Route *" item-value="id" return-object item-title="name"
                              :items="this.item_routes" variant="outlined"
                              required></v-autocomplete>
      </v-col>
      <v-col md="6">
        <Datepicker :value="startdate" @selected="startdateSelected" name="startDate" clear-button="true" placeholder="Start date"></Datepicker>
      </v-col>
      <v-col md="6">
        <datepicker :value="enddate" @selected="enddateSelected" name="endDate" clear-button="true" placeholder="End date"></datepicker>
      </v-col>
      <v-col md="12" sm="12">
        <div v-if="ready">
          <CanvasJSChart :options="options" :styles="styleOptions"/>
        </div>
      </v-col>
    </v-row>

  </v-container>
  
</template>

<script>
import userRequest from '@/axios/request';
import Datepicker from 'vuejs3-datepicker';
import moment from "moment";
export default {
  components: {
    Datepicker
  },
  data() {
    return {
      startdate: "",
      enddate: "",
      searchRoute: "",
      item_routes: [],
      data: {
        selectedRoute: null,
      },
      ready: false,
      options: {
        theme: "light1",
        animationEnabled: true,
        title:{
          text: "Single guard summary"
        },
        data: [{
          type: "pie",
          indexLabel: "{label} (#percent%)",
          yValueFormatString: "",
          toolTipContent: "<span style='\"'color: {color};'\"'>{label}</span> {y}(#percent%)",
          dataPoints: [
          ]
        }]
      },
      styleOptions: {
        width: "100%",
        height: "360px"
      }
    }
  },
  watch: {
    searchRoute(val) {
      if (val != null && val != "") {
        this.retrieveSummary(); 
      }
    }
  },
  methods: {
    startdateSelected(val) {
      this.startdate = val != null ? moment(val).format("YYYY-MM-DD") : "";
      this.retrieveSummary();
    },
    enddateSelected(val) {
      this.enddate = val != null ? moment(val).format("YYYY-MM-DD") : "";
      this.retrieveSummary();
    },
    retrieveRoutes() {
      userRequest.get(`/routes`)
        .then((response) => {
          this.item_routes = response.data.data.data;
        })
        .catch((e) => {
          console.log("error", e);
        });
    },
    retrieveSummary() {
      this.ready = false;
      userRequest.get(`/summaries/single-route/${this.data.selectedRoute.id}?startDate=${this.startdate}&endDate=${this.enddate}`)
        .then((response) => {
          let scanned = response.data.scanned;
          let late = response.data.late;
          let missed = response.data.missed;
          this.options.data[0].dataPoints = [
            { label: "Scanned", y: scanned },
            { label: "Late", y: late },
            { label: "Missed", y: missed }
          ];
          this.options.title.text = response.data.name;
        })
        .catch((e) => {
          console.log("error", e);
        })
        .finally(() => {
          this.ready = true;
        });

    },
  },
  mounted() {
    this.retrieveRoutes();
  },
}
</script>