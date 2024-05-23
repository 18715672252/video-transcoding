import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/global.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import { createPinia } from 'pinia'
import useCounterStore from './store'
const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
const { setSaveDir } = useCounterStore()
console.log(window.api)
window.api.getDefaultPath().then((res) => {
  setSaveDir(res as string)
})
app.mount('#app')
