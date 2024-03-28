import { createRouter, createWebHashHistory } from 'vue-router'
import home from '@renderer/pages/home.vue'
import setting from '@renderer/pages/setting.vue'
const routes = [
  {
    path: '/',
    component: home,
    name: 'home'
  },
  {
    path: '/setting',
    component: setting,
    name: 'setting'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
