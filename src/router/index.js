import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: () => import('../views/AccountDetails.vue')
  },
  {
    path: '/cards',
    name: 'Cards',
            component: () => import('../views/CardManagement.vue')
  },
  {
    path: '/loans',
    name: 'Loans',
    component: () => import('../views/Loans.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router