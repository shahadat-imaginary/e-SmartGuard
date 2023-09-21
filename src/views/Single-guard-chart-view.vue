<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <SingleGuardChart />
      </v-main>
      <Footerbar />
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import SingleGuardChart from '@/components/SingleGuardChart.vue';
import Footerbar from '@/components/Footer.vue';
</script>

