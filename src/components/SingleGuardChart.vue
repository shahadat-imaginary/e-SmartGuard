<template>
  <v-container>
    <v-row class="mt-0">
      <v-col md="12" sm="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Guard Report</v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col md="12" sm="12">
        <v-autocomplete v-model:search="searchGuard" v-model="data.selectedGuard"
                              label="Guard *" item-value="id" return-object item-title="name"
                              :items="this.item_guard" variant="outlined"
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
      searchGuard: "",
      item_guard: [],
      data: {
        selectedGuard: null,
      },
      ready: false,
      options: {
        theme: "light1",
        animationEnabled: true,
        title:{
          text: ""
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
    searchGuard(val) {
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
    retrieveGuards() {
      userRequest.get(`/guards`)
        .then((response) => {
          this.item_guard = response.data.data.data;
        })
        .catch((e) => {
          console.log("error", e);
        });

    },
    retrieveSummary() {
      this.ready = false;
      if (!this.data.selectedGuard) {
        return;
      }
      userRequest.get(`/summaries/single-guard/${this.data.selectedGuard.id}?startDate=${this.startdate}&endDate=${this.enddate}`)
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
    this.retrieveGuards();
  },
}
</script>