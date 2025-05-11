import './assets/main.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import axios from 'axios'

// Create an Axios instance with global defaults
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/mambo4/api/', // Set the base URL for all requests
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Make the Axios instance globally available
export default axiosInstance;

const app = createApp(App)

app.use(router)
app.use(VueApexCharts)

app.mount('#app')

