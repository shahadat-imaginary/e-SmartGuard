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
        // component: User FormVue,
        component: () => import('@/views/User-form-view.vue'),
      },
      {
        path: '/user-password-change',
        name: 'User Password Change Form',
        // component: User Password Change FormVue,
        component: () => import('@/views/User-password-change-form-view.vue'),
      },
      {
        path: '/guard',
        name: 'Guard Form',
        // component: Guard FormVue,
        component: () => import('@/views/Guard-form-view.vue'),
      },
      {
        path: '/guard-password-change',
        name: 'Guard Password Change Form',
        // component: Guard Password Change Form Vue,
        component: () => import('@/views/Guard-password-change-form-view.vue'),
      },
      {
        path: '/check-point',
        name: 'Check Point',
        // component: Check PointVue,
        component: () => import('@/views/Check-point-view.vue'),
      },
      {
        path: '/route',
        name: 'Route',
        // component: RouteVue,
        component: () => import('@/views/Route-view.vue'),
      },
      {
        path: '/patrol',
        name: 'Patrol',
        // component: PatrolVue,
        component: () => import('@/views/Patrol-view.vue'),
      },
      {
        path: '/patrol-report',
        name: 'Patrol Report',
        // component: Patrol Report,
        component: () => import('@/views/Patrol-report-view.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
