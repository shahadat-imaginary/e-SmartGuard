<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <RouteForm />
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import RouteForm from '@/components/advanced-form/RouteForm.vue';
import Footerbar from '@/components/Footer.vue';
</script>

