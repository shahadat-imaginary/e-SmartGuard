<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <CampusForm />
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
// import GuardDataTable from '@/components/GuardDataTable.vue';
import CampusForm from '@/components/advanced-form/CampusForm.vue';
import Footerbar from '@/components/Footer.vue';
</script>

