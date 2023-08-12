<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <UserForm />
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import UserForm from '@/components/advanced-form/UserForm.vue';
import Footerbar from '@/components/Footer.vue';
</script>

