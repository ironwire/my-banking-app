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
              <a href="#" class="border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Accounts
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Cards
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Loans
              </a>
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
      <!-- Welcome Section -->
      <div class="px-4 sm:px-0 mb-6">
        <h2 class="text-2xl font-semibold text-gray-900">Welcome back, John</h2>
        <p class="mt-1 text-sm text-gray-600">Here's a summary of your finances</p>
      </div>

      <!-- Quick Actions -->
      <div class="px-4 sm:px-0 mb-6">
        <div class="flex flex-wrap gap-2">
          <button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium">
            Transfer Money
          </button>
          <button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
            Pay Bills
          </button>
          <button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
            Mobile Deposit
          </button>
        </div>
      </div>

      <!-- Account Summary -->
      <div class="px-4 sm:px-0 mb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-3">Accounts</h3>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Checking Account -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Checking Account
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        $5,240.00
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <a href="#" class="font-medium text-primary hover:text-primary-dark">
                  View details
                </a>
              </div>
            </div>
          </div>

          <!-- Savings Account -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Savings Account
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        $12,580.00
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <a href="#" class="font-medium text-primary hover:text-primary-dark">
                  View details
                </a>
              </div>
            </div>
          </div>

          <!-- Investment Account -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Investment Account
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        $45,325.00
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <a href="#" class="font-medium text-primary hover:text-primary-dark">
                  View details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards Section -->
      <div class="px-4 sm:px-0 mb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-3">Cards</h3>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <!-- Credit Card -->
          <div class="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-lg p-6 text-white">
            <div class="flex justify-between items-center mb-4">
              <div>
                <p class="text-xs opacity-80">Credit Card</p>
                <p class="text-lg font-semibold">Platinum Rewards</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div class="mb-4">
              <p class="text-xs opacity-80">Card Number</p>
              <p class="font-mono">**** **** **** 5678</p>
            </div>
            <div class="flex justify-between">
              <div>
                <p class="text-xs opacity-80">Valid Thru</p>
                <p>12/25</p>
              </div>
              <div>
                <p class="text-xs opacity-80">Available Credit</p>
                <p>$8,500.00</p>
              </div>
            </div>
          </div>

          <!-- Debit Card -->
          <div class="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-lg p-6 text-white">
            <div class="flex justify-between items-center mb-4">
              <div>
                <p class="text-xs opacity-80">Debit Card</p>
                <p class="text-lg font-semibold">Everyday Checking</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div class="mb-4">
              <p class="text-xs opacity-80">Card Number</p>
              <p class="font-mono">**** **** **** 1234</p>
            </div>
            <div class="flex justify-between">
              <div>
                <p class="text-xs opacity-80">Valid Thru</p>
                <p>09/24</p>
              </div>
              <div>
                <p class="text-xs opacity-80">Linked Account</p>
                <p>Checking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loans Section -->
      <div class="px-4 sm:px-0 mb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-3">Loans</h3>
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li>
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-primary truncate">
                    Mortgage Loan
                  </p>
                  <div class="ml-2 flex-shrink-0 flex">
                    <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Current
                    </p>
                  </div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center text-sm text-gray-500">
                      Balance: $245,000.00
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Rate: 3.25%
                    </p>
                  </div>
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Next payment: $1,250.00 due on May 1
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-primary truncate">
                    Auto Loan
                  </p>
                  <div class="ml-2 flex-shrink-0 flex">
                    <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Current
                    </p>
                  </div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center text-sm text-gray-500">
                      Balance: $18,500.00
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Rate: 4.5%
                    </p>
                  </div>
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Next payment: $350.00 due on May 15
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
        <h3 class="text-lg font-medium text-gray-900 mb-3">Recent Transactions</h3>
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li>
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">
                    Grocery Store
                  </p>
                  <p class="text-sm text-red-600 font-medium">
                    -$85.50
                  </p>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <p class="flex items-center text-sm text-gray-500">
                    Apr 12, 2023 • Checking Account
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Debit Card
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">
                    Salary Deposit
                  </p>
                  <p class="text-sm text-green-600 font-medium">
                    +$3,000.00
                  </p>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <p class="flex items-center text-sm text-gray-500">
                    Apr 10, 2023 • Checking Account
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Direct Deposit
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">
                    Restaurant
                  </p>
                  <p class="text-sm text-red-600 font-medium">
                    -$65.20
                  </p>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <p class="flex items-center text-sm text-gray-500">
                    Apr 8, 2023 • Credit Card
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Credit Card
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
// Component logic would go here
// For a real application, you would fetch data from your API
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