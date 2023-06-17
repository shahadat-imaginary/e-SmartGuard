<template>
    <v-app id="inspire">
        <NavigationDrawer />
    <v-main>
      <Datatable />
    </v-main>
  </v-app>
  </template>
  
  <script setup>
    import NavigationDrawer from '@/components/NavigationDrawer.vue'
    import Datatable from '@/components/DataTable.vue'
  </script>