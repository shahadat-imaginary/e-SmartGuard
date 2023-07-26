<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <SupervisorChangePassword />
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import SupervisorChangePassword from '@/components/advanced-form/SupervisorChangePassword.vue';
import Footerbar from '@/components/Footer.vue';
</script>

