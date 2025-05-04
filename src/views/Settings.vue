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
            <button class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <span class="sr-only">View notifications</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div class="ml-3 relative">
              <div>
                <button class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
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
        <h2 class="text-2xl font-semibold text-gray-900">设置</h2>
        <p class="mt-1 text-sm text-gray-600">管理账户与个人偏好。</p>
      </div>

      <div class="px-4 sm:px-0">
        <div class="bg-white shadow sm:rounded-lg">
          <!-- Settings Navigation Tabs -->
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex" aria-label="Tabs">
              <button class="border-primary text-primary hover:text-primary-dark w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">
                个人信息
              </button>
              <button class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">
                安全
              </button>
              <button class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">
                通知
              </button>
              <button class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">
                偏好
              </button>
            </nav>
          </div>

          <!-- Personal Information Form -->
          <div class="p-4 sm:p-6">
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">基本信息</h3>
                <p class="mt-1 text-sm text-gray-500">
                  信息有可能公开，请谨慎填写.
                </p>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="first-name" class="block text-sm font-medium text-gray-700">名字</label>
                      <input type="text" name="first-name" id="first-name" autocomplete="given-name" value="John" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="last-name" class="block text-sm font-medium text-gray-700">姓氏</label>
                      <input type="text" name="last-name" id="last-name" autocomplete="family-name" value="Doe" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                      <label for="email-address" class="block text-sm font-medium text-gray-700">邮件地址</label>
                      <input type="text" name="email-address" id="email-address" autocomplete="email" value="john.doe@example.com" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="phone-number" class="block text-sm font-medium text-gray-700">手机号码</label>
                      <input type="text" name="phone-number" id="phone-number" autocomplete="tel" value="(555) 123-4567" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="date-of-birth" class="block text-sm font-medium text-gray-700">Date of birth</label>
                      <input type="date" name="date-of-birth" id="date-of-birth" value="1985-06-15" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6">
                      <label for="street-address" class="block text-sm font-medium text-gray-700">街道住址</label>
                      <input type="text" name="street-address" id="street-address" autocomplete="street-address" value="123 Main St" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label for="city" class="block text-sm font-medium text-gray-700">城市</label>
                      <input type="text" name="city" id="city" autocomplete="address-level2" value="Anytown" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label for="region" class="block text-sm font-medium text-gray-700">省、 直辖市/ 区</label>
                      <input type="text" name="region" id="region" autocomplete="address-level1" value="CA" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label for="postal-code" class="block text-sm font-medium text-gray-700">邮编</label>
                      <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" value="90210" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="hidden sm:block" aria-hidden="true">
              <div class="py-5">
                <div class="border-t border-gray-200"></div>
              </div>
            </div>

            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">工作信息</h3>
                <p class="mt-1 text-sm text-gray-500">
                  用于身份和收入的基本证明.
                </p>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-4">
                      <label for="employer" class="block text-sm font-medium text-gray-700">工作单位</label>
                      <input type="text" name="employer" id="employer" value="Acme Corporation" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="occupation" class="block text-sm font-medium text-gray-700">职业</label>
                      <input type="text" name="occupation" id="occupation" value="Software Engineer" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="annual-income" class="block text-sm font-medium text-gray-700">年收入</label>
                      <div class="mt-1 relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span class="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input type="text" name="annual-income" id="annual-income" class="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" value="120,000">
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="hidden sm:block" aria-hidden="true">
              <div class="py-5">
                <div class="border-t border-gray-200"></div>
              </div>
            </div>

            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">联系偏好</h3>
                <p class="mt-1 text-sm text-gray-500">
                  你希望我们何种方式联系到你。
                </p>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div class="space-y-6">
                    <fieldset>
                      <legend class="text-base font-medium text-gray-900">通过邮件</legend>
                      <div class="mt-4 space-y-4">
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="comments" name="comments" type="checkbox" checked class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="comments" class="font-medium text-gray-700">账户声明</label>
                            <p class="text-gray-500">每月账户信息</p>
                          </div>
                        </div>
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="candidates" name="candidates" type="checkbox" checked class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="candidates" class="font-medium text-gray-700">安全提醒</label>
                            <p class="text-gray-500">重要安全提醒。</p>
                          </div>
                        </div>
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="offers" name="offers" type="checkbox" class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="offers" class="font-medium text-gray-700">促销</label>
                            <p class="text-gray-500">促销和打折信息。</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend class="text-base font-medium text-gray-900">以短信方式</legend>
                      <div class="mt-4 space-y-4">
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="sms-alerts" name="sms-alerts" type="checkbox" checked class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="sms-alerts" class="font-medium text-gray-700">交易提醒</label>
                            <p class="text-gray-500">交易超限额提醒。</p>
                          </div>
                        </div>
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="sms-security" name="sms-security" type="checkbox" checked class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="sms-security" class="font-medium text-gray-700">安全提醒</label>
                            <p class="text-gray-500">有安全事件发生事你会接到提醒。</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-lg">
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- Security Section (Hidden by default) -->
      <div class="hidden px-4 sm:px-0 mt-6">
        <div class="bg-white shadow sm:rounded-lg">
          <div class="p-4 sm:p-6">
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">修改密码</h3>
                <p class="mt-1 text-sm text-gray-500">
                  定期修改密码保障账户更安全。
                </p>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-4">
                      <label for="current-password" class="block text-sm font-medium text-gray-700">远密码</label>
                      <input type="password" name="current-password" id="current-password" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                      <label for="new-password" class="block text-sm font-medium text-gray-700">新密码</label>
                      <input type="password" name="new-password" id="new-password" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                      <label for="confirm-password" class="block text-sm font-medium text-gray-700">确认新密码</label>
                      <input type="password" name="confirm-password" id="confirm-password" class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
                  </div>
                  <div class="mt-6">
                    <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      更新密码
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="hidden sm:block" aria-hidden="true">
              <div class="py-5">
                <div class="border-t border-gray-200"></div>
              </div>
            </div>

            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Two-Factor Authentication</h3>
                <p class="mt-1 text-sm text-gray-500">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="bg-gray-50 p-4 rounded-md">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-base font-medium text-gray-900">Two-factor authentication is enabled</h4>
                      <p class="text-sm text-gray-500 mt-1">We'll ask for a verification code in addition to your password when you sign in.</p>
                    </div>
                    <button type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="hidden sm:block" aria-hidden="true">
              <div class="py-5">
                <div class="border-t border-gray-200"></div>
              </div>
            </div>

            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Login History</h3>
                <p class="mt-1 text-sm text-gray-500">
                  Review your recent login activity.
                </p>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul class="divide-y divide-gray-200">
                    <li>
                      <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </div>
                            <div class="ml-4">
                              <p class="text-sm font-medium text-gray-900">Successful login</p>
                              <p class="text-xs text-gray-500">Today at 10:23 AM</p>
                            </div>
                          </div>
                          <div class="text-right text-sm">
                            <p class="text-gray-900">Chrome on Windows</p>
                            <p class="text-xs text-gray-500">192.168.1.1</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </div>
                            <div class="ml-4">
                              <p class="text-sm font-medium text-gray-900">Successful login</p>
                              <p class="text-xs text-gray-500">Yesterday at 6:45 PM</p>
                            </div>
                          </div>
                          <div class="text-right text-sm">
                            <p class="text-gray-900">Safari on iPhone</p>
                            <p class="text-xs text-gray-500">107.22.143.21</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            </div>
                            <div class="ml-4">
                              <p class="text-sm font-medium text-gray-900">Failed login attempt</p>
                              <p class="text-xs text-gray-500">Apr 10, 2023 at 8:12 AM</p>
                            </div>
                          </div>
                          <div class="text-right text-sm">
                            <p class="text-gray-900">Unknown device</p>
                            <p class="text-xs text-gray-500">45.123.45.67</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
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
// Component logic would go here
// For a real application, you would fetch user data from your API
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
</style>