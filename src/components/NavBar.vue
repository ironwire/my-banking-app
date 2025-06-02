<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link :to="isAuthenticated ? '/dashboard' : '/'" class="text-xl font-bold text-blue-800">
            银行管理系统
          </router-link>
        </div>
        
        <div class="flex items-center space-x-4">
          <template v-if="isAuthenticated">
            <span class="text-gray-700">欢迎, {{ username }}</span>
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              退出登录
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              登录
            </router-link>
            <router-link
              to="/register"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              注册
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

const router = useRouter()
const isAuthenticated = ref(false)
const username = ref('')

const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  
  try {
    const tokenParts = token.split('.')
    if (tokenParts.length === 3) {
      // Properly decode base64url to base64
      const base64 = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/')
      // Add padding if needed
      const padding = base64.length % 4
      const paddedBase64 = padding ? base64 + '='.repeat(4 - padding) : base64
      
      // Decode and parse the payload
      const payload = JSON.parse(decodeURIComponent(escape(atob(paddedBase64))))
      console.log('Token payload:', payload) // Debug log
      
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

const checkAuthStatus = () => {
  isAuthenticated.value = authService.isAuthenticated()
  
  if (isAuthenticated.value) {
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
    console.log(username.value)
  } else {
    username.value = ''
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

// Clean up event listeners when component is unmounted
onUnmounted(() => {
  window.removeEventListener('auth-state-changed', checkAuthStatus)
  window.removeEventListener('storage', checkAuthStatus)
})

const handleLogout = () => {
  authService.logout()
  isAuthenticated.value = false
  username.value = ''
  router.push('/login')
}
</script> 
