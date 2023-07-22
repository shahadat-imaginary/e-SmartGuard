<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <SupervisorForm />
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import SupervisorForm from '@/components/advanced-form/SupervisorFrom.vue';
import Footerbar from '@/components/Footer.vue';
</script>

