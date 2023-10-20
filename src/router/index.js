// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Login',
        // component: LoginVue,
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: DashboardVue,
        component: () => import('@/views/Dashboard.vue'),
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
        path: '/campuses',
        name: 'Campus Form',
        // component: Guard FormVue,
        component: () => import('@/views/Campus-form-view.vue'),
      },
      {
        path: '/shifts',
        name: 'Shift Form',
        // component: Guard FormVue,
        component: () => import('@/views/Shift-form-view.vue'),
      },
      {
        path: '/times',
        name: 'Time Form',
        component: () => import('@/views/Time-form-view.vue'),
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
      {
        path: '/patrol-total-guard-chart',
        name: 'Total Guard Chart',
        component: () => import('@/views/Total-guard-chart-view.vue'),
      },
      {
        path: '/patrol-single-guard-chart',
        name: 'Single Guard Chart',
        component: () => import('@/views/Single-guard-chart-view.vue'),
      },
      {
        path: '/patrol-total-route-chart',
        name: 'All Route Chart',
        component: () => import('@/views/Total-route-chart-view.vue'),
      },
      {
        path: '/patrol-single-route-chart',
        name: 'Single Route Chart',
        component: () => import('@/views/Single-route-chart-view.vue'),
      },
      {
        path: '/patrol-total-checkpoint-chart',
        name: 'All Checkpoint Chart',
        component: () => import('@/views/Total-checkpoint-chart-view.vue'),
      },
      {
        path: '/patrol-single-checkpoint-chart',
        name: 'Single Checkpoint Chart',
        component: () => import('@/views/Single-checkpoint-chart-view.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module') || error.message.includes("Importing a module script failed")) {
    window.location = to.fullPath
  }
})

export default router
