import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/global.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
