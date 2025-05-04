<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Header (same as dashboard for consistency) -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-2xl font-bold text-primary">MyBank</h1>
            </div>
            <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link to="/" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
                    JD
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="px-4 sm:px-0 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-semibold text-gray-900">卡片管理</h2>
            <p class="mt-1 text-sm text-gray-600">查询和管理你的信用卡与借记卡。</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium">
              申请新卡
            </button>
          </div>
        </div>
      </div>

      <!-- Your Cards Section -->
      <div class="px-4 sm:px-0 mb-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">你的卡片</h3>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Credit Card -->
          <div class="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-lg p-6 text-white relative">
            <div class="absolute top-4 right-4">
              <button class="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
            <div class="flex justify-between items-center mb-4">
              <div>
                <p class="text-xs opacity-80">信用卡</p>
                <p class="text-lg font-semibold">白金卡</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div class="mb-4">
              <p class="text-xs opacity-80">卡号</p>
              <p class="font-mono">**** **** **** 5678</p>
            </div>
            <div class="flex justify-between">
              <div>
                <p class="text-xs opacity-80">到期日</p>
                <p>12/25</p>
              </div>
              <div>
                <p class="text-xs opacity-80">有效信用额度</p>
                <p>$8,500.00</p>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-white border-opacity-20">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xs opacity-80">当前余额</p>
                  <p class="text-lg font-semibold">$1,500.00</p>
                </div>
                <div>
                  <p class="text-xs opacity-80">还款日</p>
                  <p>2023年5月15日</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Debit Card -->
          <div class="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-lg p-6 text-white relative">
            <div class="absolute top-4 right-4">
              <button class="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
            <div class="flex justify-between items-center mb-4">
              <div>
                <p class="text-xs opacity-80">借记卡</p>
                <p class="text-lg font-semibold">每日消费卡</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div class="mb-4">
              <p class="text-xs opacity-80">卡号</p>
              <p class="font-mono">**** **** **** 1234</p>
            </div>
            <div class="flex justify-between">
              <div>
                <p class="text-xs opacity-80">到期日</p>
                <p>09/24</p>
              </div>
              <div>
                <p class="text-xs opacity-80">绑定账户</p>
                <p>支票账户</p>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-white border-opacity-20">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xs opacity-80">日限额</p>
                  <p class="text-lg font-semibold">$2,000.00</p>
                </div>
                <div>
                  <p class="text-xs opacity-80">卡片状态</p>
                  <p class="text-green-300">活动</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Add New Card Placeholder -->
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <div class="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 class="text-sm font-medium text-gray-900">申请新卡</h3>
            <p class="text-xs text-gray-500 mt-1">对比不同类型卡片，找到最适合自己的。</p>
            <button
              class="mt-4 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
              现在就探索
            </button>
          </div>
        </div>
      </div>

      <!-- Card Management Tools -->
      <div class="px-4 sm:px-0 mb-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">卡片管理工具</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div
                class="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-sm font-medium text-gray-900">锁卡</h4>
                <p class="text-xs text-gray-500">暂时锁定某张卡</p>
              </div>
            </div>
          </div>

          <div class="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div
                class="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-sm font-medium text-gray-900">设定限额</h4>
                <p class="text-xs text-gray-500">设定每日消费限额</p>
              </div>
            </div>
          </div>

          <div class="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div
                class="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-sm font-medium text-gray-900">查询Pin码</h4>
                <p class="text-xs text-gray-500">安全地查询pin码</p>
              </div>
            </div>
          </div>

          <div class="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center">
              <div
                class="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-sm font-medium text-gray-900">换卡</h4>
                <p class="text-xs text-gray-500">申请寄递新卡</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Card Transactions -->
      <div class="px-4 sm:px-0">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">近期卡片交易</h3>
          <a href="#" class="text-sm font-medium text-primary hover:text-primary-dark">查看所有</a>
        </div>
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li>
              <div class="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900">网上购物</p>
                      <p class="text-xs text-gray-500">2023年4月12日 10:30 AM</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-red-600">-$125.50</p>
                    <p class="text-xs text-gray-500">信用卡</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div class="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900">超时购物</p>
                      <p class="text-xs text-gray-500">2023年4月9日 9:00 AM</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-red-600">-$85.20</p>
                    <p class="text-xs text-gray-500">借记卡</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div class="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900">餐厅消费</p>
                      <p class="text-xs text-gray-500">2023年4月8日 7:45 PM</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-red-600">-$65.20</p>
                    <p class="text-xs text-gray-500">信用卡</p>
                  </div>
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
// Component logic would go here
// For a real application, you would fetch card data and transactions from your API
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