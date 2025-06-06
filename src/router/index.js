import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import authService from '../services/authService'
//import authService from '@/services/authService'
import TransactionSimulator from '../views/TransactionSimulator.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/registration-success',
      name: 'RegistrationSuccess',
      component: () => import('../views/RegistrationSuccess.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/accounts',
      name: 'Accounts',
      component: () => import('../views/AccountOverview.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/cards',
      name: 'Cards',
      component: () => import('../views/CardManagement.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/card-application',
      name: 'CardApplication',
      component: () => import('../views/CardApplication.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/loans',
      name: 'Loans',
      component: () => import('../views/Loans.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/Settings.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/transfer/:accountId?',
      name: 'transfer',
      component: () => import('../views/TransferMoney.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/transaction-simulator',
      name: 'transaction-simulator',
      component: TransactionSimulator,
      meta: {
        requiresAuth: true,
        title: '交易模拟器'
      }
    },
    // Catch all route - redirect to landing page
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/AdminiDashboard.vue')
    },
    {
      path: '/admin/user-approval',
      name: 'user-approval',
      component: () => import('../views/admin/UserApprovalManagement.vue')
    }
  ]
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  try {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = authService.isAuthenticated()

    // Log navigation for debugging
    console.log(`Navigating from ${from.path} to ${to.path}`, { 
      requiresAuth, 
      isAuthenticated,
      toExists: router.hasRoute(to.name)
    })

    // Check if the route exists
    if (!to.matched.length) {
      console.warn(`Route not found: ${to.path}`)
      next({ name: 'landing' })
      return
    }

    if (requiresAuth && !isAuthenticated) {
      // Redirect to login if trying to access protected route while not authenticated
      console.log('Authentication required, redirecting to login')
      next({ name: 'login' })
    } else if (to.name === 'login' && isAuthenticated) {
      // Redirect to dashboard if trying to access login while authenticated
      console.log('Already authenticated, redirecting to dashboard')
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } catch (error) {
    console.error('Navigation error:', error)
    next({ name: 'landing' })
  }
})

export default router




