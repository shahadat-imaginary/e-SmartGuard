<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <v-container>
          <v-row>
            <v-col md="7" sm="12"><UserChangePasswordDataTable /></v-col>
            <v-col md="5" sm="12"><UserChangePassword /></v-col>
          </v-row>
        </v-container>
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import UserChangePasswordDataTable from '@/components/UserChangePasswordDataTable.vue';
import UserChangePassword from '@/components/advanced-form/UserChangePassword.vue';
import Footerbar from '@/components/Footer.vue';
</script>

