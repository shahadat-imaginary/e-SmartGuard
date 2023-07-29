<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <PatrolListForm />
        <!-- <v-container>
          <v-row>
            <v-col md="7" sm="12"><PatrolDataTable /></v-col>
            <v-col md="5" sm="12"><PatrolListForm /></v-col>
          </v-row>
        </v-container> -->
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
// import PatrolDataTable from '@/components/PatrolDataTable.vue';
import PatrolListForm from '@/components/advanced-form/PatrolListForm.vue';
import Footerbar from '@/components/Footer.vue';
</script>

