<template>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent expand-on-hover >
        <div style="background-color: #007bff; color: #fff; height: 64px;">
        <v-list-item title="eSmartG" value="eSmartG"></v-list-item>
        </div>

          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
          >
          </v-list-item>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi mdi-home" value="Home" title="Home"></v-list-item>
            <v-list-group value="Users Management ">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi mdi-account-group" title="Users Management"></v-list-item>
              </template>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="User List" title="User List"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Change Password" title="Change Password"></v-list-item>
            </v-list-group>
            <v-list-group value="Guards Management">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi mdi-shield-account" title="Guards Management"></v-list-item>
              </template>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Guard List" title="Guard List"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Change Password" title="Change Password"></v-list-item>
            </v-list-group>
            <v-list-group value="Patrol Management">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi mdi-podcast" title="Patrol Management"></v-list-item>
              </template>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Checkpoint List" title="Checkpoint List"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Route List" title="Route List"></v-list-item>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Patrol List" title="Patrol List"></v-list-item>
            </v-list-group>
            <v-list-group value="Reports">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi mdi-folder-open" title="Reports"></v-list-item>
              </template>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="Patrols Report" title="Patrols Report"></v-list-item>
            </v-list-group>
            <v-list-group value="Administrator">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi mdi-cogs" title="Administrator"></v-list-item>
              </template>
              <v-list-item prepend-icon="mdi mdi-circle-outline" value="User Access" title="User Access"></v-list-item>
            </v-list-group>
            <v-list-item title="Information" value="Information"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-circle-outline" title="User Manual" value="User Manual"></v-list-item>
            
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
                v-if="user.initials"
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
                v-if="user.initials"
                alt="Avatar"
                src="https://randomuser.me/api/portraits/men/85.jpg"
              ></v-img>
              </v-avatar>
              <h2 class="mt-2">{{ user.fullName }}</h2>
              <p class="text-caption mt-1">
                {{ user.id }}
              </p>
              <p class="text-caption mt-1">
                {{ user.name }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn class="me-2 text-none" color="indigo-accent-4" variant="flat">Change Password</v-btn>
              <v-btn to="/login" class="me-2 text-none" color="red-darken-4" variant="flat">Log Out</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
      </v-app-bar>
  </template>
  
  <script>
    export default {
      data: () => ({ drawer: null, rail: null,
        user: {
        initials: 'https://randomuser.me/api/portraits/men/85.jpg',
        fullName: 'SUPER ADMIN',
        id: '840412025055',
        name: 'ADMINISTRATOR',
      },
     }),
    }
  </script>
  