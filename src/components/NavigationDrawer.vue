<template>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent expand-on-hover >
        <div style="background-color: #007bff; color: #fff; height: 64px;">
        <v-list-item title="eSmartG" value="eSmartG"></v-list-item>
        </div>

          <v-list-item
            prepend-avatar="../assets/e-smartguard.jpg"
            nav to="/user-profile" >{{ user.name }}
          </v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi mdi-home" value="Home" title="Home" to="/dashboard"></v-list-item>
            <v-list-group value="Users Management ">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi mdi-account-group" title="Users Management"></v-list-item>
              </template>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="User List" title="User List" to="/users"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="User Change Password" title="Change Password" to="/user-password-change"></v-list-item>
            </v-list-group>
            <v-list-group value="Supervisors Management">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi mdi-shield-account" title="Supervisors Management"></v-list-item>
              </template>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Supervisor List" title="Supervisor List" to="/supervisors"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Supervisor Change Password" title="Change Password" to="/supervisors-password-change"></v-list-item>
            </v-list-group>
            <v-list-group value="Guards Management">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi mdi-shield-account" title="Guards Management"></v-list-item>
              </template>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Guard List" title="Guard List" to="/guards"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Guard Change Password" title="Change Password" to="/guard-password-change"></v-list-item>
            </v-list-group>
            <v-list-item prepend-icon="mdi mdi-domain" value="Campus" title="Campus" to="/campuses"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-cards" value="Shift" title="Shift" to="/shifts"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-clock-start" value="Time" title="Time" to="/times"></v-list-item>
            <v-list-group value="Patrol Management">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi mdi-podcast" title="Patrol Management"></v-list-item>
              </template>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Checkpoint List" title="Checkpoint List" to="/checkpoints"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Route List" title="Route List" to="/routes"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Patrol List" title="Patrol List" to="/patrols"></v-list-item>
            </v-list-group>
            <v-list-group value="Reports">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi mdi-folder-open" title="Reports"></v-list-item>
              </template>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Patrols Report" title="Patrols Report" to="/patrol-report"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Total Guard Chart" title="All Guard Chart" to="/patrol-total-guard-chart"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Single Guard Chart" title="Single Guard Chart" to="/patrol-single-guard-chart"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Total Route Chart" title="All Route Chart" to="/patrol-total-route-chart"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Single Route Chart" title="Single Route Chart" to="/patrol-single-route-chart"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Total Checkpoint Chart" title="All Checkpoint Chart" to="/patrol-total-checkpoint-chart"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Single Checkpoint Chart" title="Single Checkpoint Chart" to="/patrol-single-checkpoint-chart"></v-list-item>
            </v-list-group>
          </v-list>
      </v-navigation-drawer>

      <v-app-bar style="background-color: #007bff; color: #fff;">
        <v-app-bar-nav-icon @click="rail = !rail"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-avatar
              color="brown"
            >
              <v-img
                v-if="user1.initials"
                alt="Avatar"
                src="https://randomuser.me/api/portraits/men/85.jpg"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                color="brown" size="150"
              >
              <v-img
                v-if="user1.initials"
                alt="Avatar"
                src="https://randomuser.me/api/portraits/men/85.jpg"
              ></v-img>
              </v-avatar>
              <h2 class="mt-2">{{ user.name }}</h2>
              <p class="text-caption mt-1">
                {{ user.phoneNumber }}
              </p>
              <p class="text-caption mt-1">
                {{ user.position }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn class="me-2 text-none" color="indigo-accent-4" variant="flat" to="/user-profile">Change Password</v-btn>
              <v-btn to="/" class="me-2 text-none" color="red-darken-4" variant="flat">Log Out</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
      </v-app-bar>
  </template>

  <script>
  import userRequest from '@/axios/request';
    export default {
      data: () => ({ drawer: null, rail: null,
        user: {
          id: null,
          name: '',
          phoneNumber: null,
          position: '',
          email: '',
          password: '',
          confirmPassword: '',
          status: '',
          initials: 'https://randomuser.me/api/portraits/men/85.jpg',
        },

        user1: {
        initials: 'https://randomuser.me/api/portraits/men/85.jpg',
      },
     }),

     mounted() {
        this.fetchUserProfile();
     },

     methods: {
        async fetchUserProfile() {
          userRequest.get(`/accounts/me`)
            .then((response) => {
              this.user = response.data.data;
              console.log("get", response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        },
    },

    }
  </script>
