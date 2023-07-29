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
        path: '/user-profile',
        name: 'User Profile Form',
        // component: User FormVue,
        component: () => import('@/views/Profile-view.vue'),
      },
      {
        path: '/users',
        name: 'User Form',
        // component: User FormVue,
        component: () => import('@/views/User-form-view.vue'),
      },
      {
        path: '/users/:id',
        name: 'User Details',
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
        path: '/supervisors',
        name: 'Supervisor Form',
        // component: Supervisor FormVue,
        component: () => import('@/views/Supervisor-form-view.vue'),
      },
      {
        path: '/supervisors-password-change',
        name: 'Supervisor Password Change Form',
        // component: Supervisor Password Change FormVue,
        component: () => import('@/views/Supervisor-password-change-form-view.vue'),
      },
      {
        path: '/guards',
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
        path: '/checkpoints',
        name: 'Check Point',
        // component: Check PointVue,
        component: () => import('@/views/Check-point-view.vue'),
      },
      {
        path: '/routes',
        name: 'Route',
        // component: RouteVue,
        component: () => import('@/views/Route-view.vue'),
      },
      {
        path: '/patrols',
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
