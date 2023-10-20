<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <TimeForm />
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
// import GuardDataTable from '@/components/GuardDataTable.vue';
import TimeForm from '@/components/advanced-form/TimeForm.vue';
import Footerbar from '@/components/Footer.vue';
</script>

