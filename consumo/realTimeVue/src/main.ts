import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueApexCharts from "vue3-apexcharts";

import "bootstrap/dist/css/bootstrap.min.css"

import VueNumber from 'vue-number-animation'



const app = createApp(App)
app.use(VueApexCharts);
app.use(VueNumber)

app.use(createPinia())
app.use(router)

app.mount('#app')
