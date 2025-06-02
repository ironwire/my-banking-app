<template>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-2xl font-bold text-primary">MyBank</h1>
            </div>
            <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link to="/dashboard" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{
                  'border-primary text-gray-900': $route.name === 'Dashboard',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': $route.name !== 'Dashboard'
                }">
                首页
              </router-link>
              <router-link to="/accounts" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{
                  'border-primary text-gray-900': $route.name === 'Accounts',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': $route.name !== 'Accounts'
                }">
                账户
              </router-link>
              <router-link to="/cards" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{
                  'border-primary text-gray-900': $route.name === 'Cards',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': $route.name !== 'Cards'
                }">
                卡片
              </router-link>
              <router-link to="/loans" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{
                  'border-primary text-gray-900': $route.name === 'Loans',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': $route.name !== 'Loans'
                }">
                贷款
              </router-link>
              <router-link to="/settings" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{
                  'border-primary text-gray-900': $route.name === 'settings',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': $route.name !== 'settings'
                }">
                设置
              </router-link>
            </nav>
          </div>
          <div class="flex items-center">
            <button
              class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <span class="sr-only">View notifications</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div class="ml-3 relative">
              <div>
                <button
                  class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <span class="sr-only">Open user menu</span>
                  <div class="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    {{ username }}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  <div>
    <!-- Page Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">我的贷款</h1>
      </div>
    </div>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="isLoading" class="text-center py-10">
          <div class="spinner inline-block w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
          <p class="mt-2 text-gray-600">加载中...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="bg-red-50 p-4 rounded-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div v-else>
          <!-- Current Loans -->
          <div class="px-4 sm:px-0 mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">已有贷款</h3>
            <div v-if="loans.length === 0" class="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center text-gray-500">
              您目前没有任何贷款
            </div>
            <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
              <ul class="divide-y divide-gray-200">
                <li v-for="loan in loans" :key="loan.id">
                  <div class="px-4 py-5 sm:px-6">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-12 w-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-gray-900">{{ loan.loanTypeName }}</h4>
                          <p class="text-sm text-gray-500">{{ loan.paymentFrequency }} 付款</p>
                        </div>
                      </div>
                      <div class="flex-shrink-0">
                        <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', getStatusClass(loan.status)]">
                          {{ loan.status }}
                        </span>
                      </div>
                    </div>
                    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <dt class="text-sm font-medium text-gray-500">未付余额</dt>
                        <dd class="mt-1 text-lg font-semibold text-gray-900">{{ formatCurrency(loan.outstandingAmount) }}</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">利息率</dt>
                        <dd class="mt-1 text-lg font-semibold text-gray-900">{{ loan.interestRate }}%</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">月付额</dt>
                        <dd class="mt-1 text-lg font-semibold text-gray-900">{{ formatCurrency(loan.monthlyPayment) }}</dd>
                      </div>
                    </div>
                    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <dt class="text-sm font-medium text-gray-500">开始日期</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ formatDate(loan.startDate) }}</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">总贷款金额</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ formatCurrency(loan.principalAmount) }}</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">满期日</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ formatDate(loan.endDate) }}</dd>
                      </div>
                    </div>
                    <div class="mt-4 flex">
                      <button @click="navigateToLoanDetails(loan.id)" class="text-primary hover:text-primary-dark text-sm font-medium">
                        详细信息
                      </button>
                      <span class="mx-2 text-gray-500">|</span>
                      <button @click="navigateToLoanPayment(loan.id)" class="text-primary hover:text-primary-dark text-sm font-medium">
                        还款
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Available Loan Products -->
          <div class="px-4 sm:px-0 mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">现有贷款产品</h3>
            
            <!-- Loading state for loan types -->
            <div v-if="isLoadingLoanTypes" class="text-center py-6">
              <div class="spinner inline-block w-6 h-6 border-4 border-t-primary rounded-full animate-spin"></div>
              <p class="mt-2 text-gray-600">加载贷款产品中...</p>
            </div>
            
            <!-- Error state for loan types -->
            <div v-else-if="loanTypesError" class="bg-red-50 p-4 rounded-md mb-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">{{ loanTypesError }}</h3>
                </div>
              </div>
            </div>
            
            <!-- No loan types available -->
            <div v-else-if="loanTypes.length === 0" class="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center text-gray-500">
              暂无可用贷款产品
            </div>
            
            <!-- Display loan types -->
            <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="loanType in loanTypes" :key="loanType.loanTypeId" class="bg-white shadow rounded-lg overflow-hidden">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h4 class="ml-3 text-lg font-medium text-gray-900">{{ loanType.name }}</h4>
                  </div>
                  <div class="mt-4">
                    <p class="text-sm text-gray-500">{{ loanType.description }}</p>
                  </div>
                  <div class="mt-4">
                    <div class="flex items-center">
                      <dt class="text-sm font-medium text-gray-500">利率范围</dt>
                      <dd class="ml-2 text-sm font-semibold text-gray-900">{{ loanType.minInterestRate }}% - {{ loanType.maxInterestRate }}%</dd>
                    </div>
                    <div class="flex items-center mt-1">
                      <dt class="text-sm font-medium text-gray-500">期限范围</dt>
                      <dd class="ml-2 text-sm font-semibold text-gray-900">{{ loanType.minTerm }} - {{ loanType.maxTerm }} 个月</dd>
                    </div>
                    <div class="flex items-center mt-1">
                      <dt class="text-sm font-medium text-gray-500">贷款额度</dt>
                      <dd class="ml-2 text-sm font-semibold text-gray-900">{{ formatCurrency(loanType.minimumAmount) }} - {{ formatCurrency(loanType.maximumAmount) }}</dd>
                    </div>
                    <div class="flex items-center mt-1">
                      <dt class="text-sm font-medium text-gray-500">状态</dt>
                      <dd class="ml-2">
                        <span 
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          :class="loanType.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                        >
                          {{ loanType.isActive ? '启用' : '禁用' }}
                        </span>
                      </dd>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                  <button type="button" class="text-sm font-medium text-primary hover:text-primary-dark">
                    了解更多
                  </button>
                  <span class="mx-2 text-gray-300">|</span>
                  <button 
                    type="button" 
                    @click="navigateToLoanApplication" 
                    class="text-sm font-medium text-primary hover:text-primary-dark"
                    :disabled="!loanType.isActive"
                    :class="{'opacity-50 cursor-not-allowed': !loanType.isActive}"
                  >
                    {{ loanType.isActive ? '现在申请' : '暂不可申请' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import authService from '../services/authService'
import { loanService } from '../services/loanService'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const loans = ref([])
const loanTypes = ref([]) // New ref for loan types
const isLoading = ref(true)
const isLoadingLoanTypes = ref(true) // New loading state for loan types
const error = ref(null)
const loanTypesError = ref(null) // New error state for loan types

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2
  }).format(amount)
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Get loan status class
const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'current':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'completed':
      return 'bg-blue-100 text-blue-800'
    case 'overdue':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  
  try {
    const tokenParts = token.split('.')
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]))
      
      // Extract just the numeric ID from the id field
      let userId = payload.id || payload.sub || ''
      
      // If the ID contains a comma, extract just the number part
      if (typeof userId === 'string' && userId.includes(',')) {
        userId = userId.split(',')[0].trim()
      }
      
      return {
        firstName: payload.firstName || '',
        lastName: payload.lastName || '',
        id: userId
      }
    }
  } catch (error) {
    console.error('Error extracting user data from token:', error)
  }
  return null
}

const fetchLoans = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const user = getUserFromToken()
    if (!user || !user.id) {
      throw new Error('无法获取用户ID')
    }
    
    console.log('Fetching loans for customer ID:', user.id)
    const response = await loanService.getLoans()
    loans.value = response.data
    console.log('Fetched loans:', loans.value)
  } catch (err) {
    console.error('Error fetching loans:', err)
    error.value = '获取贷款信息失败，请稍后再试'
  } finally {
    isLoading.value = false
  }
}

// New function to fetch loan types
const fetchLoanTypes = async () => {
  isLoadingLoanTypes.value = true
  loanTypesError.value = null
  
  try {
    const token = authService.getToken()
    if (!token) {
      throw new Error('未授权，请先登录')
    }
    
    console.log('Fetching loan types')
    const response = await axios.get('http://localhost:8082/api/myloans/loan-types', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    loanTypes.value = response.data
    console.log('Fetched loan types:', loanTypes.value)
  } catch (err) {
    console.error('Error fetching loan types:', err)
    loanTypesError.value = '获取贷款类型失败，请稍后再试'
  } finally {
    isLoadingLoanTypes.value = false
  }
}

const navigateToLoanDetails = (loanId) => {
  router.push(`/loans/${loanId}`)
}

const navigateToLoanPayment = (loanId) => {
  router.push(`/loans/${loanId}/payment`)
}

const navigateToLoanApplication = () => {
  router.push('/loan-application')
}

const checkAuthStatus = () => {
  if (authService.isAuthenticated()) {
    // Try to get from localStorage first
    let user = JSON.parse(localStorage.getItem('user') || '{}')
    
    // If firstName or lastName is missing, extract from token
    if (!user.firstName || !user.lastName) {
      const tokenUser = getUserFromToken()
      if (tokenUser) {
        // Merge token data with existing user data
        user = { ...user, ...tokenUser }
        // Update localStorage with complete user data
        localStorage.setItem('user', JSON.stringify(user))
      }
    }
    
    // Set the full name (last name + first name)
    username.value = user.lastName && user.firstName 
      ? `${user.lastName} ${user.firstName}`
      : user.lastName || user.firstName || ''
  } else {
    username.value = ''
  }
}

onMounted(() => {
  checkAuthStatus()
  fetchLoans()
  fetchLoanTypes() // Call the new function to fetch loan types
  
  // Listen for auth state changes
  window.addEventListener('auth-state-changed', checkAuthStatus)
  
  // Add event listener for storage changes to handle login/logout in other tabs
  window.addEventListener('storage', (event) => {
    if (event.key === 'token' || event.key === 'user') {
      checkAuthStatus()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('auth-state-changed', checkAuthStatus)
  window.removeEventListener('storage', checkAuthStatus)
})
</script>

<style>
:root {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
}

.text-primary {
  color: var(--color-primary);
}

.text-primary-dark {
  color: var(--color-primary-dark);
}

.bg-primary {
  background-color: var(--color-primary);
}

.bg-primary-dark {
  background-color: var(--color-primary-dark);
}

.hover\:bg-primary-dark:hover {
  background-color: var(--color-primary-dark);
}

.focus\:ring-primary:focus {
  --tw-ring-color: var(--color-primary);
}

.border-primary {
  border-color: var(--color-primary);
}

.from-primary {
  --tw-gradient-from: var(--color-primary);
}

.to-primary-dark {
  --tw-gradient-to: var(--color-primary-dark);
}
</style>





