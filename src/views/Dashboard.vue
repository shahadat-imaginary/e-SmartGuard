<template>
    <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <Box />
        <v-row>
            <v-col md="6" sm="12">
              <MainCampus />
            </v-col>
            <v-col md="6" sm="12">
              <TechCampus />
            </v-col>
          </v-row>
          <PatrolReportDataTable />
      </v-main>
      <Footerbar />
  </v-app>
  </template>

  <script setup>
    import NavigationDrawer from '@/components/NavigationDrawer.vue'
    import Breadcrumbs from '@/components/Breadcrumbs.vue';
    import PatrolReportDataTable from '@/components/PatrolReportDataTable.vue'
    import Box from '@/components/Box.vue'
    import Footerbar from '@/components/Footer.vue';
    import MainCampus from '@/components/MainCampus.vue';
    import TechCampus from '@/components/TechCampus.vue';
  </script>
