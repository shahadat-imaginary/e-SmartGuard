<template>
    <v-footer
      id="dashboard-core-footer"
    >
      <v-container>
        <v-row
          align="center"
          no-gutters
        >
        <v-col cols="6" md="auto">
            <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
              &copy; 2019-2020     GUARD   All rights reserved.
            </div>
          </v-col>
          <v-spacer class="hidden-sm-and-down" />
          <v-col md="6" class="text-right">Version 1.00</v-col>
        </v-row>
      </v-container>
    </v-footer>
  </template>
  
  <script>
    export default {
      name: 'DashboardCoreFooter',
    }
  </script>
  
  <style lang="sass">
    #dashboard-core-footer
      a
        font-size: .825rem
        font-weight: 500
        text-decoration: none
        text-transform: uppercase
  </style>
  