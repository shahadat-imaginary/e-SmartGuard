<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <v-container>
          <v-row>
            <v-col md="7" sm="12"><CheckPointDataTable /></v-col>
            <v-col md="5" sm="12"><CheckPointForm /></v-col>
          </v-row>
        </v-container>
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import CheckPointDataTable from '@/components/CheckPointDataTable.vue';
import CheckPointForm from '@/components/advanced-form/CheckPointForm.vue';
import Footerbar from '@/components/Footer.vue';
</script>

