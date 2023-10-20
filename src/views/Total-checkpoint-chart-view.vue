<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <TotalCheckpointChart />
      </v-main>
      <Footerbar />
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import TotalCheckpointChart from '@/components/TotalCheckpointChart.vue';
import Footerbar from '@/components/Footer.vue';
</script>

