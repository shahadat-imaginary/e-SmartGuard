<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <PatrolReportDataTable />
      </v-main>
      <Footerbar />
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import PatrolReportDataTable from '@/components/PatrolReportDataTable.vue';
import Footerbar from '@/components/Footer.vue';
</script>

