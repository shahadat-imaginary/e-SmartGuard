<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <v-container>
          <v-row>
            <v-col md="7" sm="12"><GuardChangePasswordDataTable /></v-col>
            <v-col md="5" sm="12"><GuardChangePassword /></v-col>
          </v-row>
        </v-container>
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import GuardChangePasswordDataTable from '@/components/GuardChangePasswordDataTable.vue';
import GuardChangePassword from '@/components/advanced-form/GuardChangePassword.vue';
import Footerbar from '@/components/Footer.vue';
</script>

