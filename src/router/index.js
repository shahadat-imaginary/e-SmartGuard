// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        // component: LoginVue,
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/user',
        name: 'User Form',
        // component: LoginVue,
        component: () => import('@/views/User-form-view.vue'),
      },
      {
        path: '/form-advanced',
        name: 'Advanced Form',
        // component: LoginVue,
        component: () => import('@/views/advanced-form-view.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
