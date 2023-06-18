<template>
    <v-app id="inspire">
        <NavigationDrawer />
    <v-main>
      <Breadcrumbs />
      <box />
      <Datatable />
    </v-main>
  </v-app>
  </template>
  
  <script setup>
    import NavigationDrawer from '@/components/NavigationDrawer.vue'
    import Breadcrumbs from '@/components/Breadcrumbs.vue';
    import Datatable from '@/components/DataTable.vue'
    import Box from '@/components/Box.vue'
  </script>