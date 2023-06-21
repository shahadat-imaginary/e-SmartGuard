<template>
    <v-container>
        <v-row>
            <v-col md="12">
              <v-app-bar color="transparent" flat>
                <v-toolbar-title class="hidden-sm-and-down" style="font-size: 1.6rem; font-weight: 400;" text="Dashboard"/>
                <v-breadcrumbs :items="items">
                    <template v-slot:divider>
                    <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
                </v-breadcrumbs>
              </v-app-bar>
            </v-col>
        </v-row>
    </v-container>
  </template>

<script>

export default {
    data: () => ({
      items: [
        {
          title: 'Home',
          disabled: false,
          href: 'Home',
        },
        {
          title: 'Dashboard',
          disabled: false,
          href: 'Dashboard',
        },
      ],
    }),
  }
</script>

<style>
    
</style>