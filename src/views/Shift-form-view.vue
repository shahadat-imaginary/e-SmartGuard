<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <ShiftForm />
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
// import GuardDataTable from '@/components/GuardDataTable.vue';
import ShiftForm from '@/components/advanced-form/ShiftForm.vue';
import Footerbar from '@/components/Footer.vue';
</script>

