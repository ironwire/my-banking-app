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
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

              <!-- Page Header -->
      <div class="px-4 sm:px-0 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-semibold text-gray-900">账户管理</h2>
            <p class="mt-1 text-sm text-gray-600">查询和管理你的各种账户。</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <button 
              @click="navigateToAccountApplication" 
              class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              申请新账户
            </button>
          </div>
        </div>
      </div>
      <div class="overview-header">
 
        <div class="quick-actions">
          <button class="action-button" @click="navigateTo('transfer')">
            <span class="action-icon">↗</span>
            <span>转账</span>
          </button>
          <button class="action-button" @click="navigateTo('pay-bills')">
            <span class="action-icon">💰</span>
            <span>付账单</span>
          </button>
          <button class="action-button" @click="navigateTo('transaction-simulator')">
            <span class="action-icon">📱</span>
            <span>存钱</span>
          </button>
          <button class="action-button" @click="navigateTo('statements')">
            <span class="action-icon">📄</span>
            <span>银行声明</span>
          </button>
        </div>
      </div>
  
      <!-- Financial Summary -->
      <div class="financial-summary">
        <div class="summary-card total-assets">
          <h3>总余额</h3>
          <div class="amount">${{ formatCurrency(totalBalance) }}</div>
        </div>
      </div>
  
      <!-- Accounts Section -->
      <div class="accounts-section">
        <h2>账户总览</h2>
        
        <!-- Deposit Accounts -->
        <div class="accounts-grid">
          <div v-for="account in depositAccounts" :key="account.id" class="account-card" @click="viewAccountDetails(account.id)">
            <div class="account-info">
              <div class="account-name">{{ account.name }}</div>
              <div class="account-number">•••• {{ account.number.slice(-4) }}</div>
            </div>
            <div class="account-balance">
              <div class="balance-amount">${{ formatCurrency(account.balance) }}</div>
              <div class="available">余额: ${{ formatCurrency(account.available) }}</div>
            </div>
            <div class="account-actions">
              <button class="action-link" @click.stop="navigateTo('transfer', account.id)">转账</button>
              <button class="action-link" @click.stop="navigateTo('deposit', account.id)">存钱</button>
              <button class="action-link" @click.stop="navigateTo('statements', account.id)">声明</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Recent Transactions -->
      <div class="recent-transactions">
        <div class="section-header">
          <h2>近期交易一览</h2>
          <button class="view-all-button" @click="navigateTo('transactions')">查询更多</button>
        </div>
        
        <div class="transactions-list">
          <div v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
            <div class="transaction-date">{{ formatShortDate(transaction.date) }}</div>
            <div class="transaction-details">
              <div class="transaction-merchant">{{ transaction.merchant }}</div>
              <div class="transaction-account">{{ transaction.accountName }}</div>
            </div>
            <div class="transaction-category">{{ transaction.category }}</div>
            <div class="transaction-amount" :class="transaction.amount < 0 ? 'negative' : ''">
              {{ transaction.amount < 0 ? '-' : '' }}${{ formatCurrency(Math.abs(transaction.amount)) }}
            </div>
          </div>
        </div>
      </div>
      
 
    
    </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import authService from '../services/authService';

  const router = useRouter();
  const username = ref('');

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

  // Account data
  const depositAccounts = ref([
    {
      id: 'checking1',
      name: '支票账户',
      number: '1234567890',
      balance: 5280.42,
      available: 5280.42,
      type: 'checking'
    },
    {
      id: 'savings1',
      name: '一般储蓄账户',
      number: '0987654321',
      balance: 25470.00,
      available: 25470.00,
      type: 'savings'
    },
    {
      id: 'money-market1',
      name: '投资账户',
      number: '5678901234',
      balance: 15750.33,
      available: 15750.33,
      type: 'money-market'
    },
    {
      id: 'cd1',
      name: '12月 定存账户',
      number: '2345678901',
      balance: 10000.00,
      available: 0.00, // CDs typically have early withdrawal penalties
      type: 'cd'
    }
  ]);

  // Computed total balance
  const totalBalance = computed(() => {
    return depositAccounts.value.reduce((sum, account) => sum + account.balance, 0);
  });

  // Recent transactions
  const recentTransactions = ref([
    {
      id: 'tx1',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      merchant: '全食超时',
      accountName: '支票账户',
      category: '食品杂货',
      amount: -85.42
    },
    {
      id: 'tx2',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      merchant: '中石油加油站',
      accountName: '储蓄账户',
      category: '交通',
      amount: -45.00
    },
    {
      id: 'tx3',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      merchant: '利息收入',
      accountName: '储蓄账户',
      category: '收入',
      amount: 12.75
    },
    {
      id: 'tx4',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      merchant: '工资收入',
      accountName: '支票账户',
      category: '收入',
      amount: 2450.00
    },
    {
      id: 'tx5',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      merchant: '转账给朋友',
      accountName: '支票账户',
      category: '转账',
      amount: -500.00
    }
  ]);

  // Helper functions
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatShortDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Action functions
  const navigateTo = (route, id) => {
    console.log(`Navigating to ${route}${id ? ' with ID: ' + id : ''}`);
    if (id) {
      router.push({ name: route, params: { accountId: id } });
    } else {
      router.push({ name: route });
    }
  };

  const viewAccountDetails = (accountId) => {
    console.log(`Viewing account details for: ${accountId}`);
    // In a real app, this would navigate to the account details page
    // router.push({ name: 'account-details', params: { id: accountId } });
  };

  const navigateToAccountApplication = () => {
    router.push('/account-application');
  };
  </script>
  
  <style scoped>
  .account-overview {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem 2rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #333;
  }
  
  .overview-header {
    background-color: #1e40af;
    color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .welcome-section {
    margin-bottom: 1.5rem;
  }
  
  .welcome-section h1 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .last-login {
    font-size: 0.875rem;
    opacity: 0.9;
  }
  
  .quick-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .action-button {
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: white;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.2s;
  }
  
  .action-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  .action-icon {
    font-size: 1.25rem;
  }
  
  /* Financial Summary */
  .financial-summary {
    margin-bottom: 2rem;
  }
  
  .summary-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .summary-card h3 {
    font-size: 1rem;
    font-weight: 500;
    color: #555;
    margin-bottom: 0.5rem;
  }
  
  .summary-card .amount {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .total-assets {
    border-top: 4px solid #4caf50;
  }
  
  /* Accounts Section */
  .accounts-section {
    margin-bottom: 2rem;
  }
  
  .accounts-section h2,
  .recent-transactions h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .accounts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1rem;
  }
  
  .account-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .account-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .account-info {
    margin-bottom: 1rem;
  }
  
  .account-name {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .account-number {
    font-size: 0.875rem;
    color: #777;
  }
  
  .account-balance {
    margin-bottom: 1rem;
  }
  
  .balance-amount {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .available {
    font-size: 0.875rem;
    color: #555;
  }
  
  .account-actions {
    display: flex;
    gap: 1rem;
    border-top: 1px solid #eee;
    padding-top: 1rem;
  }
  
  .action-link {
    background: none;
    border: none;
    color: #1e40af;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
  }
  
  .action-link:hover {
    text-decoration: underline;
  }
  
  /* Recent Transactions */
  .recent-transactions {
    margin-bottom: 2rem;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .view-all-button {
    background: none;
    border: none;
    color: #1e40af;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }
  
  .view-all-button:hover {
    text-decoration: underline;
  }
  
  .transactions-list {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  
  .transaction-item {
    display: grid;
    grid-template-columns: 80px 1fr 120px 120px;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .transaction-item:last-child {
    border-bottom: none;
  }
  
  .transaction-date {
    color: #777;
    font-size: 0.875rem;
  }
  
  .transaction-merchant {
    font-weight: 500;
  }
  
  .transaction-account {
    font-size: 0.875rem;
    color: #777;
  }
  
  .transaction-category {
    color: #555;
    font-size: 0.875rem;
  }
  
  .transaction-amount {
    font-weight: 600;
    text-align: right;
  }
  
  .transaction-amount.negative {
    color: #f44336;
  }
  
  /* Add Account Section */
  .add-account-section {
    margin-top: 2rem;
    text-align: center;
  }
  
  .add-account-button {
    background-color: white;
    border: 1px dashed #1e40af;
    border-radius: 0.5rem;
    padding: 1rem;
    color: #1e40af;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.2s;
  }
  
  .add-account-button:hover {
    background-color: #f0f7ff;
  }
  
  .add-icon {
    font-size: 1.25rem;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .accounts-grid {
      grid-template-columns: 1fr;
    }
    
    .transaction-item {
      grid-template-columns: 80px 1fr 100px;
    }
    
    .transaction-category {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    .quick-actions {
      flex-direction: column;
    }
    
    .action-button {
      width: 100%;
    }
  }
  </style>
