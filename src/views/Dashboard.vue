<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
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

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" style="width: 100%;">
      <!-- Welcome Section -->
      <div class="px-4 sm:px-0 mb-6" style="width: 100%;">
        <h2 class="text-2xl font-semibold text-gray-900">欢迎回家, {{ username }}</h2>
        <p class="mt-1 text-sm text-gray-600">这里是你的财务信息的汇总页。</p>
      </div>

      <!-- Quick Actions -->
      <div class="px-4 sm:px-0 mb-6" style="width: 100%;">
        <div class="flex flex-wrap gap-2">
          <router-link to="/transfer" class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium">
            转账
          </router-link>
          <router-link to="/pay-bills" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
            付款
          </router-link>
          <router-link to="/transaction-simulator" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
            存钱
          </router-link>
        </div>
      </div>

      <!-- Account Summary -->
      <div class="px-4 sm:px-0 mb-6" style="width: 100%;">
        <h3 class="text-lg font-medium text-gray-900 mb-3">账户信息汇总</h3>
        
        <!-- Loading state -->
        <div v-if="isLoading" class="bg-white p-6 rounded-lg shadow text-center" style="width: 100%;">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
          <p class="text-gray-600">加载账户信息中...</p>
        </div>
        
        <!-- Error state -->
        <div v-else-if="error" class="bg-white p-6 rounded-lg shadow" style="width: 100%;">
          <div class="text-red-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            加载失败
          </div>
          <p class="text-gray-600">{{ error }}</p>
          <button @click="fetchAccountData" class="mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium">
            重试
          </button>
        </div>
        
        <!-- No accounts state -->
        <div v-else-if="accounts.length === 0" class="bg-white p-6 rounded-lg shadow text-center" style="width: 100%;">
          <p class="text-gray-600 mb-4">您还没有任何账户</p>
          <router-link to="/open-account" class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium">
            开设新账户
          </router-link>
        </div>
        
        <!-- Accounts grid - change to 2 columns to match cards section -->
        <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2" style="width: 100%; max-width: 100%;">
          <div v-for="account in accounts" :key="account.id" class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 rounded-md p-3" :class="getAccountIconClass(account.type)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      {{ account.name }}
                    </dt>
                    <dd class="text-xs text-gray-500 mb-1">
                      {{ account.number }}
                    </dd>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ formatCurrency(account.balance) }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <router-link :to="`/accounts/${account.id}`" class="font-medium text-primary hover:text-primary-dark">
                  详细信息点这里
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards Section -->
      <div class="px-4 sm:px-0 mb-6" style="width: 100%;">
        <h3 class="text-lg font-medium text-gray-900 mb-3">卡片信息汇总</h3>
        
        <!-- Loading state -->
        <div v-if="isLoadingCards" class="bg-white p-6 rounded-lg shadow text-center" style="width: 100%;">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
          <p class="text-gray-600">加载卡片信息中...</p>
        </div>
        
        <!-- Error state -->
        <div v-else-if="cardError" class="bg-white p-6 rounded-lg shadow" style="width: 100%;">
          <div class="text-red-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            加载失败
          </div>
          <p class="text-gray-600">{{ cardError }}</p>
          <button @click="fetchCardData" class="mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium">
            重试
          </button>
        </div>
        
        <!-- No cards state -->
        <div v-else-if="cards.length === 0" class="bg-white p-6 rounded-lg shadow text-center" style="width: 100%;">
          <p class="text-gray-600 mb-4">您还没有任何卡片</p>
          <router-link to="/cards/apply" class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium">
            申请新卡
          </router-link>
        </div>
        
        <!-- Cards grid -->
        <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2" style="width: 100%; max-width: 100%;">
          <div v-for="card in cards" :key="card.id" 
               :class="[
                 'rounded-lg shadow-lg p-6 text-white',
                 card.cardType.toLowerCase().includes('信用') || card.cardType.toLowerCase().includes('credit') 
                   ? 'bg-gradient-to-r from-primary to-primary-dark' 
                   : 'bg-gradient-to-r from-gray-700 to-gray-900'
               ]">
            <div class="flex justify-between items-center mb-4">
              <div>
                <p class="text-xs opacity-80">{{ card.cardType || '银行卡' }}</p>
                <p class="text-lg font-semibold">{{ card.cardName || card.cardType || '银行卡' }}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div class="mb-4">
              <p class="text-xs opacity-80">卡号</p>
              <p class="font-mono">{{ formatCardNumber(card.cardNumber) }}</p>
            </div>
            <div class="flex justify-between">
              <div>
                <p class="text-xs opacity-80">有效期至</p>
                <p>{{ card.expiryDate || '未知' }}</p>
              </div>
              <div>
                <p class="text-xs opacity-80">
                  {{ card.cardType.toLowerCase().includes('信用') || card.cardType.toLowerCase().includes('credit') ? '有效信用额度' : '可用余额' }}
                </p>
                <p>{{ formatCurrency(card.balance || card.creditLimit || 0) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loans Section -->
      <div class="px-4 sm:px-0 mb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-3">贷款信息汇总</h3>
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li>
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-primary truncate">
                    房贷
                  </p>
                  <div class="ml-2 flex-shrink-0 flex">
                    <p
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      当前状态
                    </p>
                  </div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center text-sm text-gray-500">
                      余额: $245,000.00
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      利率: 3.25%
                    </p>
                  </div>
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      下一个付款日: $1,250.00 5月1日
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-primary truncate">
                    汽车贷款
                  </p>
                  <div class="ml-2 flex-shrink-0 flex">
                    <p
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      当前状态
                    </p>
                  </div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center text-sm text-gray-500">
                      余额: $18,500.00
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      利率: 4.5%
                    </p>
                  </div>
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      下一个还款日: $350.00 5月15日
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium text-gray-900 mb-3">近期交易信息</h3>
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li>
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">
                    超时购物
                  </p>
                  <p class="text-sm text-red-600 font-medium">
                    -$85.50
                  </p>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <p class="flex items-center text-sm text-gray-500">
                    2023年4月12日 • 支票账户
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    借记卡
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">
                    工资收入
                  </p>
                  <p class="text-sm text-green-600 font-medium">
                    +$3,000.00
                  </p>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <p class="flex items-center text-sm text-gray-500">
                    2023年4月1日 • 储蓄账户
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    直接存款
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">
                    饭店消费
                  </p>
                  <p class="text-sm text-red-600 font-medium">
                    -$65.20
                  </p>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <p class="flex items-center text-sm text-gray-500">
                    2023年4月8日 • 信用卡
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    信用卡
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import authService from '../services/authService'
import accountService from '../services/accountService'
import cardService from '../services/cardService'

const username = ref('')
const accounts = ref([])
const isLoading = ref(true)
const error = ref(null)

// Add new refs for cards
const cards = ref([])
const isLoadingCards = ref(true)
const cardError = ref(null)

// Extract user ID from token
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  
  try {
    const tokenParts = token.split('.')
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]))
      // Extract user ID from the sub claim which is in format '7, sun@qq.com'
      if (payload.sub) {
        const subParts = payload.sub.split(',')
        if (subParts.length > 0) {
          return subParts[0].trim()
        }
      }
      return payload.userId || null
    }
  } catch (error) {
    console.error('Error extracting user ID from token:', error)
  }
  return null
}

const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  
  try {
    const tokenParts = token.split('.')
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]))
      return {
        firstName: payload.firstName || '',
        lastName: payload.lastName || ''
      }
    }
  } catch (error) {
    console.error('Error extracting user data from token:', error)
  }
  return null
}

// Fetch account data
const fetchAccountData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const userId = getUserIdFromToken()
    if (!userId) {
      throw new Error('无法获取用户ID')
    }
    
    console.log('Fetching accounts for user ID:', userId)
    const response = await accountService.getUserAccountBalances(userId)
    
    
    // Check if response has data property or is the data itself
    const accountsData = response.data || response
    
    

    if (!Array.isArray(accountsData)) {
      console.error('Unexpected response format:', accountsData)
      throw new Error('服务器返回的数据格式不正确')
    }
    
    // Process and store the account data
    accounts.value = accountsData.map(account => ({
      id: account.accountId,
      name: account.accountName || '账户',
      number: account.accountNumber,
      type: account.accountType || '储蓄账户',
      balance: account.balance || 0
    }))
    
    console.log('Fetched accounts:', accounts.value)
  } catch (err) {
    console.error('Error fetching account data:', err)
    error.value = '获取账户数据失败，请稍后再试'
    
    // Fallback to empty accounts array
    accounts.value = []
  } finally {
    isLoading.value = false
  }
}

// Function to fetch card data
const fetchCardData = async () => {
  isLoadingCards.value = true
  cardError.value = null
  
  try {
    console.log('Fetching cards for user')
    const response = await cardService.getUserCards()
    
    // Log the raw response for debugging
    console.log('Raw card data from backend:', response.data || response)
    
    // Check if response has data property or is the data itself
    const cardsData = response.data || response
    
    if (!Array.isArray(cardsData)) {
      console.error('Unexpected card response format:', cardsData)
      throw new Error('服务器返回的卡片数据格式不正确')
    }
    
    // Process and store the card data with updated field names
    cards.value = cardsData.map(card => ({
      id: card.id || card.cardId,
      cardNumber: card.cardNumber,
      cardType: card.cardTypeName || card.cardType || '银行卡', // Support both field names
      cardName: card.cardName,
      expiryDate: card.expiryDate || formatExpiryDate(card.expiryMonth, card.expiryYear),
      balance: card.balance,
      creditLimit: card.limitAmount || card.creditLimit, // Support both field names
      availableCredit: card.availableCredit
    }))
    
    console.log('Fetched cards:', cards.value)
  } catch (err) {
    console.error('Error fetching card data:', err)
    
    // Check for specific error types
    if (err.response && err.response.status === 403) {
      cardError.value = '您没有权限访问卡片数据，请联系客服'
      console.warn('Using mock data due to 403 error')
      
      // Use mock data for development
      cards.value = [
        {
          id: 1,
          cardNumber: '4111 1111 1111 1111',
          cardType: '信用卡',
          cardName: '银联信用卡',
          expiryDate: '12/2025',
          balance: 0,
          creditLimit: 50000,
          availableCredit: 45000
        },
        {
          id: 2,
          cardNumber: '6222 0000 0000 0000',
          cardType: '借记卡',
          cardName: '银联借记卡',
          expiryDate: '06/2026',
          balance: 12500,
          creditLimit: 0,
          availableCredit: 0
        }
      ]
    } else if (err.response && err.response.status === 401) {
      cardError.value = '会话已过期，请重新登录'
      // Optionally redirect to login
      setTimeout(() => {
        authService.logout()
        router.push('/login')
      }, 2000)
    } else if (err.message && err.message.includes('Network Error')) {
      cardError.value = '网络连接错误，请检查您的网络连接'
      // Use mock data for development
      cards.value = [
        {
          id: 1,
          cardNumber: '4111 1111 1111 1111',
          cardType: '信用卡',
          cardName: '银联信用卡',
          expiryDate: '12/2025',
          balance: 0,
          creditLimit: 50000,
          availableCredit: 45000
        },
        {
          id: 2,
          cardNumber: '6222 0000 0000 0000',
          cardType: '借记卡',
          cardName: '银联借记卡',
          expiryDate: '06/2026',
          balance: 12500,
          creditLimit: 0,
          availableCredit: 0
        }
      ]
    } else {
      cardError.value = '获取卡片数据失败，请稍后再试'
      // Use mock data for development
      cards.value = [
        {
          id: 1,
          cardNumber: '4111 1111 1111 1111',
          cardType: '信用卡',
          cardName: '银联信用卡',
          expiryDate: '12/2025',
          balance: 0,
          creditLimit: 50000,
          availableCredit: 45000
        },
        {
          id: 2,
          cardNumber: '6222 0000 0000 0000',
          cardType: '借记卡',
          cardName: '银联借记卡',
          expiryDate: '06/2026',
          balance: 12500,
          creditLimit: 0,
          availableCredit: 0
        }
      ]
    }
  } finally {
    isLoadingCards.value = false
  }
}

// Format card number to show only last 4 digits
const formatCardNumber = (cardNumber) => {
  if (!cardNumber) return '**** **** **** ****'
  
  // If the card number is already masked, return it as is
  if (cardNumber.includes('*')) return cardNumber
  
  // Otherwise, mask all but the last 4 digits
  const lastFourDigits = cardNumber.slice(-4)
  return `**** **** **** ${lastFourDigits}`
}

// Format expiry date from month and year
const formatExpiryDate = (month, year) => {
  if (!month || !year) return '未知'
  
  // Format as MM/YY
  const formattedMonth = month.toString().padStart(2, '0')
  const formattedYear = year.toString().slice(-2)
  return `${formattedMonth}/${formattedYear}`
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
    
    // Fetch account data
    fetchAccountData()
    
    // Fetch card data
    fetchCardData()
  } else {
    username.value = ''
    accounts.value = []
    cards.value = []
  }
}

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2
  }).format(amount)
}

// Get account icon class based on account type
const getAccountIconClass = (accountType) => {
  switch (accountType.toLowerCase()) {
    case '支票账户':
    case 'checking':
      return 'bg-green-100 text-green-600'
    case '储蓄账户':
    case 'savings':
      return 'bg-blue-100 text-blue-600'
    case '投资账户':
    case 'investment':
      return 'bg-purple-100 text-purple-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

onMounted(() => {
  checkAuthStatus()
  
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

<style scoped>
.dashboard {
  min-height: calc(100vh - 4rem);
}

/* Force grid containers to take full width */
.grid {
  width: 100% !important;
  max-width: none !important;
}

/* Ensure consistent container widths */
main > div {
  width: 100%;
}
</style>

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








