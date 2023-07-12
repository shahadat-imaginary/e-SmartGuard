<template>
  <v-app id="inspire">
      <NavigationDrawer />
      <v-main>
        <Breadcrumbs />
        <v-container>
          <v-row>
            <v-col md="7" sm="12"><UserDataTable /></v-col>
            <v-col md="5" sm="12"><UserForm /></v-col>
            <!-- <v-col md="6" sm="12"><GuardForm /></v-col>
            <v-col md="6" sm="12"><GuardChangePassword /></v-col> -->
          </v-row>
        </v-container>
        <Footerbar />
      </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import UserDataTable from '@/components/UserDataTable.vue';
import UserForm from '@/components/advanced-form/UserForm.vue';
// import UserChangePassword from '@/components/advanced-form/UserChangePassword.vue';
// import GuardForm from '@/components/advanced-form/GuardForm.vue';
// import GuardChangePassword from '@/components/advanced-form/GuardChangePassword.vue';
import Footerbar from '@/components/Footer.vue';
</script>

