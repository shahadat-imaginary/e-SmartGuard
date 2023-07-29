<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <UserProfile />
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import UserProfile from '@/components/UserProfile.vue';
import Footerbar from '@/components/Footer.vue';
</script>

