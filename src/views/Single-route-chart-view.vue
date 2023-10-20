<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <SingleRouteChart />
      </v-main>
      <Footerbar />
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import SingleRouteChart from '@/components/SingleRouteChart.vue';
import Footerbar from '@/components/Footer.vue';
</script>

