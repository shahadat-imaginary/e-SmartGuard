<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <UserChangePassword />
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import UserChangePassword from '@/components/advanced-form/UserChangePassword.vue';
import Footerbar from '@/components/Footer.vue';
</script>

