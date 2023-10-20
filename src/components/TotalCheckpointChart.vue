<template>
  <v-container>
    <v-row class="mt-0">
      <v-col md="12" sm="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Checkpoint Report</v-toolbar-title>
          </v-toolbar>
        </v-card>
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
      ready: false,
      options: {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light3",
        title:{
          text: "Route Summary"
        },
        axisY:{
          prefix: "",
          gridThickness: 0.3,
          tickLength: 0,
          suffix: "",
          title: "Checkpoints",
          includeZero: true
        },
        legend: {
          cursor:"pointer",
          itemclick : this.toggleDataSeries
        },
        toolTip: {
          shared: true
        },
        data: [{
          type: "column",
          name: "Total Assign",
          showInLegend: true,
          color: "#3085C3",
          yValueFormatString: "",
          dataPoints: [
            
          ]
        },
        {
          type: "column",
          name: "Scanned",
          color: "#45FFCA",
          showInLegend: true,
          yValueFormatString: "",
          dataPoints: [
            
          ]
        },
        {
          type: "column",
          name: "Late",
          color: "#E9B824",
          showInLegend: true,
          yValueFormatString: "",
          dataPoints: [
          ]
        },
        {
          type: "column",
          name: "Missed",
          color: "#D83F31",
          showInLegend: true,
          yValueFormatString: "",
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
  methods: {
    startdateSelected(val) {
      this.startdate = val != null ? moment(val).format("YYYY-MM-DD") : "";
      this.retrieveSummary();
    },
    enddateSelected(val) {
      this.enddate = val != null ? moment(val).format("YYYY-MM-DD") : "";
      this.retrieveSummary();
    },
    // Get all Patrols data...
    retrieveSummary() {
      this.ready = false;
      userRequest.get(`/summaries/total-checkpoints?startDate=${this.startdate}&endDate=${this.enddate}`)
        .then((response) => {
          let totalList = [];
          let scannedList = [];
          let lateList = [];
          let missedList = [];
          response.data.map((item) => {
            totalList.push({ label: item.name, y: item.total });
            scannedList.push({ label: item.name, y: item.scanned });
            lateList.push({ label: item.name, y: item.late });
            missedList.push({ label: item.name, y: item.missed });
          });
          this.options.data[0].dataPoints = totalList;
          this.options.data[1].dataPoints = scannedList;
          this.options.data[2].dataPoints = lateList;
          this.options.data[3].dataPoints = missedList;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.ready = true;
        });
    },
    toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    }
  },
  mounted() {
    this.retrieveSummary();
  }
}
</script>