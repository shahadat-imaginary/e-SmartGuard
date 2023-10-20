<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <SingleCheckpointChart />
      </v-main>
      <Footerbar />
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import SingleCheckpointChart from '@/components/SingleCheckpointChart.vue';
import Footerbar from '@/components/Footer.vue';
</script>

