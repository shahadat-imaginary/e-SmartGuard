<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <GuardChangePassword />
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import GuardChangePassword from '@/components/advanced-form/GuardChangePassword.vue';
import Footerbar from '@/components/Footer.vue';
</script>

