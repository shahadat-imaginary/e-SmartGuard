<template>
  <v-app id="inspire">
    <NavigationDrawer />
    <v-main>
      <Breadcrumbs />
      <PatrolListForm />
      <Footerbar />
    </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import PatrolListForm from '@/components/advanced-form/PatrolListForm.vue';
import Footerbar from '@/components/Footer.vue';
</script>

