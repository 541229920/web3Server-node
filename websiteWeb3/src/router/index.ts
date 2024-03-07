import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Home from '@/views/LayoutPage/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children:[
        {
          path:'',
          name:'/',
          component:Home
        },
        {
          path:'/news',
          name:'news',
          component:()=>import('@/views/LayoutPage/News.vue')
        },
        {
          path:'/file',
          name:'file',
          component:()=>import('@/views/LayoutPage/File.vue')
        },
        {
          path:'/about',
          name:'about',
          component:()=>import('@/views/LayoutPage/About.vue')
        }
      ]
    },
    {
      path:'/regis',
      name:'regis',
      component:()=>import('@/views/Regis.vue')
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('@/views/Login.vue')
    }
  ]
})

export default router
