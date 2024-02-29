import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout
    },
    {
      path:'/regis',
      component:()=>import('@/views/Regis.vue')
    },
    {
      path:'/login',
      component:()=>import('@/views/Login.vue')
    }
  ]
})

export default router