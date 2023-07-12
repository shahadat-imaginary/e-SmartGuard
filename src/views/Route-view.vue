<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <v-container>
          <v-row>
            <v-col md="7" sm="12"><RouteDataTable /></v-col>
            <v-col md="5" sm="12"><RouteForm /></v-col>
          </v-row>
        </v-container>
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import RouteDataTable from '@/components/RouteDataTable.vue';
import RouteForm from '@/components/advanced-form/RouteForm.vue';
import Footerbar from '@/components/Footer.vue';
</script>

