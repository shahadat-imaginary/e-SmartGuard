<template class="body-bg">
  <v-container>
    <v-row>
      <v-col md="3" sm="6">
        <v-hover v-slot="{ isHovering, props }" open-delay="200">
          <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto pa-3"
            color="success" v-bind="props">
            <div class="d-flex flex-no-wrap box">
              <div>
                <v-card-title class="text-h4">{{ dashboard.guards }}</v-card-title>
                <v-card-subtitle class="pb-4">Total Guards</v-card-subtitle>
              </div>
              <div class="ma-3 icon-sec" rounded="0">
                <v-icon icon="mdi mdi-shield-account"></v-icon>
              </div>
            </div>
          </v-card>
        </v-hover>
      </v-col>
      <v-col md="3" sm="6">
        <v-hover v-slot="{ isHovering, props }" open-delay="200">
          <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto pa-3" color="info"
            v-bind="props">
            <div class="d-flex flex-no-wrap box">
              <div>
                <v-card-title class="text-h4">{{ dashboard.checkpoints }}</v-card-title>
                <v-card-subtitle class="pb-4">Total Check Points</v-card-subtitle>
              </div>
              <div class="ma-3 icon-sec" rounded="0">
                <v-icon icon="mdi mdi-google-maps"></v-icon>
              </div>
            </div>
          </v-card>
        </v-hover>
      </v-col>
      <v-col md="3" sm="6">
        <v-hover v-slot="{ isHovering, props }" open-delay="200">
          <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto pa-3"
            color="warning" v-bind="props">
            <div class="d-flex flex-no-wrap box">
              <div>
                <v-card-title class="text-h4">{{ dashboard.routes }}</v-card-title>
                <v-card-subtitle class="pb-4">Total Routes</v-card-subtitle>
              </div>
              <div class="ma-3 icon-sec" rounded="0">
                <v-icon icon="mdi mdi-routes"></v-icon>
              </div>
            </div>
          </v-card>
        </v-hover>
      </v-col>
      <v-col md="3" sm="6">
        <v-hover v-slot="{ isHovering, props }" open-delay="200">
          <v-card :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto pa-3" color="error"
            v-bind="props">
            <div class="d-flex flex-no-wrap box">
              <div>
                <v-card-title class="text-h4">{{ dashboard.patrols }}</v-card-title>
                <v-card-subtitle class="pb-4">Total Patrols</v-card-subtitle>
              </div>
              <div class="ma-3 icon-sec" rounded="0">
                <v-icon icon="mdi mdi-shield-half-full"></v-icon>
              </div>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        <v-card class="bg-white">
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-2" size="54" rounded="0" color="success">
              <v-icon size="30" icon="mdi mdi-flash"></v-icon>
            </v-avatar>
            <div>
              <v-card-title class="card-title">
                Guard On Duty
              </v-card-title>
              <v-card-subtitle>{{ dashboard.duties }}</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card class="bg-white">
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-2" size="54" rounded="0" color="info">
              <v-icon size="30" icon="mdi mdi-exclamation-thick"></v-icon>
            </v-avatar>
            <div>
              <v-card-title class="card-title">
                SOS Report Today
              </v-card-title>
              <v-card-subtitle>{{ dashboard.reports }}</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
      <!-- <v-col md="3">
        <v-card>
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-2" size="54" rounded="0" color="warning">
              <v-icon size="30" icon="mdi mdi-headphones"></v-icon>
            </v-avatar>
            <div>
              <v-card-title class="card-title">
                Supervisor on Duty
              </v-card-title>
              <v-card-subtitle>1</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col> -->
      <v-col md="4">
        <v-card>
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-2" size="54" rounded="0" color="error">
              <v-icon size="30" icon="mdi mdi-star"></v-icon>
            </v-avatar>
            <div>
              <v-card-title class="card-title">
                Late Checkpoint
              </v-card-title>
              <v-card-subtitle>{{ dashboard.late }}</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import userRequest from '@/axios/request';
export default {
  data: () => ({
    dashboard: {
      guards: '',
      checkpoints: null,
      routes: '',
      patrols: '',
      reports: '',
      duties: '',
      late: ''
    },
  }),

  methods: {
    async fetchDashboard() {
      userRequest.get(`/summaries`)
        .then((response) => {
          this.dashboard = response.data.data;
          console.log("get data", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

  },

  mounted() {
    this.fetchDashboard();
  },

}
</script>
<style>
.card-title {
  font-size: 16px;
}

.body-bg {
  background-color: #f4f6f9;
}

.box {
  color: #fff;
}

.box .icon-sec {
  color: rgba(0, 0, 0, .15);
  z-index: 0;
}

.box .icon-sec>i {
  font-size: 70px;
  position: absolute;
  right: 15px;
  top: 20px;
  transition: -webkit-transform .3s linear;
  transition: transform .3s linear;
  transition: transform .3s linear, -webkit-transform .3s linear;
}


.v-card.on-hover.v-theme--light .icon-sec>i {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}</style>
