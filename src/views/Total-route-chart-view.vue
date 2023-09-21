<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <TotalRouteChart />
      </v-main>
      <Footerbar />
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import TotalRouteChart from '@/components/TotalRouteChart.vue';
import Footerbar from '@/components/Footer.vue';
</script>
