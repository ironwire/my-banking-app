<template>
      <!-- Your existing Loans content here, but without the header -->
      <!-- Page Header -->

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
                <h2 class="text-2xl font-semibold text-gray-900">贷款</h2>
                <p class="mt-1 text-sm text-gray-600">管理已有贷款申请新贷款。</p>
              </div>
              <div class="mt-4 sm:mt-0">
                <button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium">
                  申请新贷款
                </button>
              </div>
            </div>
          </div>

          <!-- Current Loans -->
          <div class="px-4 sm:px-0 mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">已有贷款</h3>
            <div class="bg-white shadow overflow-hidden sm:rounded-md">
              <ul class="divide-y divide-gray-200">
                <!-- Mortgage Loan -->
                <li>
                  <div class="px-4 py-5 sm:px-6">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div
                          class="flex-shrink-0 h-12 w-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-gray-900">房贷</h4>
                          <p class="text-sm text-gray-500">30年固定利率</p>
                        </div>
                      </div>
                      <div class="flex-shrink-0">
                        <span
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Current
                        </span>
                      </div>
                    </div>
                    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <dt class="text-sm font-medium text-gray-500">未付余额</dt>
                        <dd class="mt-1 text-lg font-semibold text-gray-900">$245,000.00</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">利息率</dt>
                        <dd class="mt-1 text-lg font-semibold text-gray-900">3.25%</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">月付额</dt>
                        <dd class="mt-1 text-lg font-semibold text-gray-900">$1,250.00</dd>
                      </div>
                    </div>
                    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <dt class="text-sm font-medium text-gray-500">下一付款日</dt>
                        <dd class="mt-1 text-sm text-gray-900">2023年5月1日</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">总贷款金额</dt>
                        <dd class="mt-1 text-sm text-gray-900">$300,000.00</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">满期日</dt>
                        <dd class="mt-1 text-sm text-gray-900">2053年5月1日</dd>
                      </div>
                    </div>
                    <div class="mt-4 flex">
                      <button class="text-primary hover:text-primary-dark text-sm font-medium">
                        详细信息
                      </button>
                      <span class="mx-2 text-gray-500">|</span>
                      <button class="text-primary hover:text-primary-dark text-sm font-medium">
                        主动还款
                      </button>
                    </div>
                  </div>
                </li>

                <!-- Auto Loan -->
                <li>
                  <div class="px-4 py-5 sm:px-6">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div
                          class="flex-shrink-0 h-12 w-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-gray-900">车贷</h4>
                          <p class="text-sm text-gray-500">5年期</p>
                        </div>
                      </div>
                      <div class="flex-shrink-0">
                        <span
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Current
                        </span>
                      </div>
                    </div>
                    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <dt class="text-sm font-medium text-gray-500">未付余额</dt>
                        <dd class="mt-1 text-lg font-semibold text-gray-900">$18,500.00</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">利息率</dt>
                        <dd class="mt-1 text-lg font-semibold text-gray-900">4.5%</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">月付额</dt>
                        <dd class="mt-1 text-lg font-semibold text-gray-900">$350.00</dd>
                      </div>
                    </div>
                    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <dt class="text-sm font-medium text-gray-500">下一付款日</dt>
                        <dd class="mt-1 text-sm text-gray-900">2023年5月15日</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">总贷款额</dt>
                        <dd class="mt-1 text-sm text-gray-900">$25,000.00</dd>
                      </div>
                      <div>
                        <dt class="text-sm font-medium text-gray-500">期满日</dt>
                        <dd class="mt-1 text-sm text-gray-900">2026年6月10日</dd>
                      </div>
                    </div>
                    <div class="mt-4 flex">
                      <button class="text-primary hover:text-primary-dark text-sm font-medium">
                        View Details
                      </button>
                      <span class="mx-2 text-gray-500">|</span>
                      <button class="text-primary hover:text-primary-dark text-sm font-medium">
                        Make a Payment
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
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Mortgage Loan Card -->
              <div class="bg-white shadow rounded-lg overflow-hidden">
                <div class="p-5">
                  <div class="flex items-center">
                    <div
                      class="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h4 class="ml-3 text-lg font-medium text-gray-900">房贷</h4>
                  </div>
                  <div class="mt-4">
                    <p class="text-sm text-gray-500">高竞争性利率灵活的期限助你有个理想的家。
                    </p>
                  </div>
                  <div class="mt-4">
                    <div class="flex items-center">
                      <dt class="text-sm font-medium text-gray-500">利率低至</dt>
                      <dd class="ml-2 text-sm font-semibold text-gray-900">3.25%</dd>
                    </div>
                    <div class="flex items-center mt-1">
                      <dt class="text-sm font-medium text-gray-500">期限长达</dt>
                      <dd class="ml-2 text-sm font-semibold text-gray-900">30 years</dd>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                  <button type="button" class="text-sm font-medium text-primary hover:text-primary-dark">
                    了解更多
                  </button>
                  <span class="mx-2 text-gray-300">|</span>
                  <button type="button" class="text-sm font-medium text-primary hover:text-primary-dark">
                    现在申请
                  </button>
                </div>
              </div>

              <!-- Auto Loan Card -->
              <div class="bg-white shadow rounded-lg overflow-hidden">
                <div class="p-5">
                  <div class="flex items-center">
                    <div
                      class="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h4 class="ml-3 text-lg font-medium text-gray-900">车贷</h4>
                  </div>
                  <div class="mt-4">
                    <p class="text-sm text-gray-500">选择我们的快速便捷汽车融资方案，更快地坐上驾驶座</p>
                  </div>
                  <div class="mt-4">
                    <div class="flex items-center">
                      <dt class="text-sm font-medium text-gray-500">利息率低至</dt>
                      <dd class="ml-2 text-sm font-semibold text-gray-900">4.5%</dd>
                    </div>
                    <div class="flex items-center mt-1">
                      <dt class="text-sm font-medium text-gray-500">期限长达</dt>
                      <dd class="ml-2 text-sm font-semibold text-gray-900">7 years</dd>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                  <button type="button" class="text-sm font-medium text-primary hover:text-primary-dark">
                    了解更多
                  </button>
                  <span class="mx-2 text-gray-300">|</span>
                  <button type="button" class="text-sm font-medium text-primary hover:text-primary-dark">
                    现在申请
                  </button>
                </div>
              </div>

              <!-- Personal Loan Card -->
              <div class="bg-white shadow rounded-lg overflow-hidden">
                <div class="p-5">
                  <div class="flex items-center">
                    <div
                      class="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 class="ml-3 text-lg font-medium text-gray-900">个人消费贷</h4>
                  </div>
                  <div class="mt-4">
                    <p class="text-sm text-gray-500">灵活的融资方案，用于应对生活中的意外开支或特殊采购。</p>
                  </div>
                  <div class="mt-4">
                    <div class="flex items-center">
                      <dt class="text-sm font-medium text-gray-500">利息率低至</dt>
                      <dd class="ml-2 text-sm font-semibold text-gray-900">6.99%</dd>
                    </div>
                    <div class="flex items-center mt-1">
                      <dt class="text-sm font-medium text-gray-500">期限长达</dt>
                      <dd class="ml-2 text-sm font-semibold text-gray-900">5 years</dd>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                  <button type="button" class="text-sm font-medium text-primary hover:text-primary-dark">
                    了解更多
                  </button>
                  <span class="mx-2 text-gray-300">|</span>
                  <button type="button" class="text-sm font-medium text-primary hover:text-primary-dark">
                    现在申请
                  </button>
                </div>
              </div>
            </div>
          </div>

        
        </main>
      </div>
</template>

<script setup>
import AppLayout from '../components/AppLayout.vue';
// Component logic would go here
// For a real application, you would fetch loan data from your API
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