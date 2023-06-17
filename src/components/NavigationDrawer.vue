<template>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent style="background-color: #222d32; color: #fff;">
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
          >
          </v-list-item>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi mdi-view-dashboard" title="Dashboard" value="Dashboard"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Profile" value="Profile"></v-list-item>
            <v-list-group value="Guard Management">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-account-group-outline" title="Guard Management"></v-list-item>
              </template>
              <v-list-item value="Add Guards" title="Add Guards"></v-list-item>
              <v-list-item value="Guards List" title="Guards List"></v-list-item>
            </v-list-group>
            <v-list-item prepend-icon="mdi mdi-view-dashboard" title="Checkpoints Management" value="Checkpoints Management"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-view-dashboard" title="Rounds Management" value="Rounds Management"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-view-dashboard" title="Reports" value="Reports"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-clock-time-two-outline" title="Set Timezone" value="Set Timezone"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-view-dashboard" title="About Us" value="About Us"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-history" title="Login Logs" value="Login Logs"></v-list-item>
            
          </v-list>
      </v-navigation-drawer>
  
      <v-app-bar>
        <v-app-bar-nav-icon @click="rail = !rail"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
        
      </v-app-bar>
  </template>
  
  <script>
    export default {
      data: () => ({ drawer: null, rail: null }),
    }
  </script>
  