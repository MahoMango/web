import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'tocas/dist/tocas.min.css'
import 'tocas/dist/tocas.min.js'

const app = createApp(App)
app.use(router)
app.mount('#app')
