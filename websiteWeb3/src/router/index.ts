import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'
import HomeVue from '@/views/LayoutPage/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children:[
        {
          path:'/',
          component:HomeVue
        }
      ]
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
