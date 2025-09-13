import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/trending',
      name: 'trending',
      component: () => import('../views/TrendingView.vue'),
    },
    {
      path: '/alerts',
      name: 'alerts',
      component: () => import('../views/AlertsView.vue'),
    },
  ],
})

export default router
