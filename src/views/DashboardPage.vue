<template>
  <div class="dashboard">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">仪表板</h1>
      
      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">账户余额</h3>
          <p class="text-2xl font-bold text-blue-600">¥ 50,000.00</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">信用卡额度</h3>
          <p class="text-2xl font-bold text-green-600">¥ 100,000.00</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">待处理事项</h3>
          <p class="text-2xl font-bold text-orange-600">3</p>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="bg-white rounded-lg shadow mb-8">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">最近交易</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="i in 5" :key="i" class="flex items-center justify-between py-3 border-b border-gray-100">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span class="text-blue-600">💰</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">交易 #{{ i }}</p>
                  <p class="text-sm text-gray-500">2024-03-{{ i }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">¥ {{ 1000 * i }}</p>
                <p class="text-sm text-gray-500">已完成</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link to="/transfer" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span class="text-2xl">💸</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">转账</h3>
              <p class="text-sm text-gray-500">快速转账</p>
            </div>
          </div>
        </router-link>
        
        <router-link to="/cards" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span class="text-2xl">💳</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">卡片管理</h3>
              <p class="text-sm text-gray-500">管理您的卡片</p>
            </div>
          </div>
        </router-link>
        
        <router-link to="/loans" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <span class="text-2xl">🏦</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">贷款服务</h3>
              <p class="text-sm text-gray-500">申请贷款</p>
            </div>
          </div>
        </router-link>
        
        <router-link to="/settings" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <span class="text-2xl">⚙️</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">设置</h3>
              <p class="text-sm text-gray-500">账户设置</p>
            </div>
          </div>
        </router-link>
        
        <router-link to="/transaction-simulator" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span class="text-2xl">💵</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">存钱</h3>
              <p class="text-sm text-gray-500">存款交易</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Check if user is authenticated
  const user = localStorage.getItem('user')
  if (!user) {
    router.push('/login')
  }
})
</script>

<style scoped>
.dashboard {
  min-height: calc(100vh - 4rem);
}
</style> 
