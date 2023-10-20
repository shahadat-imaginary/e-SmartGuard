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
import CanvasJSStockChart from '@canvasjs/vue-stockcharts';
import CanvasJSChart from '@canvasjs/vue-charts';


const app = createApp(App)
app.provide("moment", moment);
registerPlugins(app)

app.use(Vue3Geolocation);
app.use(CanvasJSStockChart); // install the CanvasJS Vuejs StockChart Plugin
app.use(CanvasJSChart); // install the CanvasJS Vuejs Chart Plugin
app.mount('#app')
