/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import moment from "moment";

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import Vue3Geolocation from 'vue3-geolocation';


const app = createApp(App)
app.provide("moment", moment);
registerPlugins(app)

app.use(Vue3Geolocation);

app.mount('#app')
