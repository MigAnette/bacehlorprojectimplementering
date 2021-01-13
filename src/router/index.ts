import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/kalender',
    name: 'Calender',
    component: () => import('@/views/Calender.vue'),
  },
  {
    path: '/maal',
    name: 'Goal',
    component: () => import('@/views/Goal.vue'),
  },
  {
    path: '/profil',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      layout: 'no-navbar',
    },
  },
  {
    path: '/tilmeld',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
    meta: {
      layout: 'no-navbar',
    },
  },
  {
    path: '/sandbox',
    name: 'Sandbox1',
    component: () => import('@/views/sandbox/Sandbox1.vue'),
  },
  {
    path: '/sandbox2',
    name: 'Sandbox2',
    component: () => import('@/views/sandbox/Sandbox2.vue'),
  },
  {
    path: '/sandbox3',
    name: 'Sandbox3',
    component: () => import('@/views/sandbox/Sandbox3.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
