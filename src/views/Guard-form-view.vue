<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <GuardForm />
        <!-- <v-container>
          <v-row>
            <v-col md="7" sm="12"><GuardDataTable /></v-col>
            <v-col md="5" sm="12"><GuardForm /></v-col>
          </v-row>
        </v-container> -->
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
// import GuardDataTable from '@/components/GuardDataTable.vue';
import GuardForm from '@/components/advanced-form/GuardForm.vue';
import Footerbar from '@/components/Footer.vue';
</script>

