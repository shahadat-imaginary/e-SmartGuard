<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <CheckPointForm />
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import CheckPointForm from '@/components/advanced-form/CheckPointForm.vue';
import Footerbar from '@/components/Footer.vue';
</script>

