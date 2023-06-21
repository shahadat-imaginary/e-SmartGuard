/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import Vue3Geolocation from 'vue3-geolocation';


const app = createApp(App)

registerPlugins(app)

app.use(Vue3Geolocation);

app.mount('#app')