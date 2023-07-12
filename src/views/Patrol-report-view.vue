<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <v-container>
          <v-row>
            <v-col md="12" sm="12"><PatrolReportDataTable /></v-col>
          </v-row>
        </v-container>
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import PatrolReportDataTable from '@/components/PatrolReportDataTable.vue';
import Footerbar from '@/components/Footer.vue';
</script>

