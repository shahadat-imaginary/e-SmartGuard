<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <TotalGuardChart />
      </v-main>
      <Footerbar />
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import TotalGuardChart from '@/components/TotalGuardChart.vue';
import Footerbar from '@/components/Footer.vue';
</script>

