<template>
    <div class="admin-dashboard">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="container">
          <div class="header-content">
            <div class="header-left">
              <h1>管理员后台</h1>
              <p>银行管理系统 - 管理员控制面板</p>
            </div>
            <div class="header-right">
              <div class="admin-info">
                <div class="admin-avatar">
                  <span>👤</span>
                </div>
                <div class="admin-details">
                  <span class="admin-name">管理员</span>
                  <span class="admin-role">Administrator</span>
                </div>
              </div>
              <button class="btn-logout" @click="handleLogout">
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="dashboard-main">
        <div class="container">
          <!-- Welcome Section -->
          <div class="welcome-section">
            <div class="welcome-card">
              <div class="welcome-content">
                <h2>欢迎回来！</h2>
                <p>您可以通过以下功能模块管理银行系统的各项业务</p>
                <div class="system-status">
                  <div class="status-item">
                    <span class="status-indicator active"></span>
                    <span>系统运行正常</span>
                  </div>
                  <div class="status-time">
                    最后更新: {{ currentTime }}
                  </div>
                </div>
              </div>
              <div class="welcome-icon">
                🏦
              </div>
            </div>
          </div>
  
          <!-- Management Functions -->
          <div class="management-section">
            <h2 class="section-title">管理功能</h2>
            <div class="management-grid">
              <!-- 用户申请审核 -->
              <div class="management-card" @click="navigateToUserApproval">
                <div class="card-icon user-approval">
                  <span>📋</span>
                </div>
                <div class="card-content">
                  <h3>用户申请审核</h3>
                  <p>审核和处理用户注册申请，管理用户账户状态</p>
                  <div class="card-stats">
                    <span class="stat-number">{{ pendingApplications }}</span>
                    <span class="stat-label">待审核申请</span>
                  </div>
                </div>
                <div class="card-arrow">
                  <span>→</span>
                </div>
              </div>
  
              <!-- 卡片类型维护 -->
              <div class="management-card" @click="navigateToCardTypes">
                <div class="card-icon card-types">
                  <span>💳</span>
                </div>
                <div class="card-content">
                  <h3>卡片类型维护</h3>
                  <p>管理银行卡片类型，设置卡片属性和业务规则</p>
                  <div class="card-stats">
                    <span class="stat-number">{{ cardTypesCount }}</span>
                    <span class="stat-label">卡片类型</span>
                  </div>
                </div>
                <div class="card-arrow">
                  <span>→</span>
                </div>
              </div>
  
              <!-- 贷款类型维护 -->
              <div class="management-card" @click="navigateToLoanTypes">
                <div class="card-icon loan-types">
                  <span>💰</span>
                </div>
                <div class="card-content">
                  <h3>贷款类型维护</h3>
                  <p>配置贷款产品类型，设置利率和审批条件</p>
                  <div class="card-stats">
                    <span class="stat-number">{{ loanTypesCount }}</span>
                    <span class="stat-label">贷款类型</span>
                  </div>
                </div>
                <div class="card-arrow">
                  <span>→</span>
                </div>
              </div>
  
              <!-- 账户类型维护 -->
              <div class="management-card" @click="navigateToAccountTypes">
                <div class="card-icon account-types">
                  <span>🏛️</span>
                </div>
                <div class="card-content">
                  <h3>账户类型维护</h3>
                  <p>管理银行账户类型，配置账户属性和限制</p>
                  <div class="card-stats">
                    <span class="stat-number">{{ accountTypesCount }}</span>
                    <span class="stat-label">账户类型</span>
                  </div>
                </div>
                <div class="card-arrow">
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Quick Stats -->
          <div class="stats-section">
            <h2 class="section-title">系统概览</h2>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-info">
                  <span class="stat-value">{{ totalUsers }}</span>
                  <span class="stat-label">总用户数</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🏦</div>
                <div class="stat-info">
                  <span class="stat-value">{{ totalAccounts }}</span>
                  <span class="stat-label">总账户数</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">💳</div>
                <div class="stat-info">
                  <span class="stat-value">{{ totalCards }}</span>
                  <span class="stat-label">总卡片数</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">💸</div>
                <div class="stat-info">
                  <span class="stat-value">{{ totalTransactions }}</span>
                  <span class="stat-label">今日交易</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // 响应式数据
  const currentTime = ref('');
  const pendingApplications = ref(12);
  const cardTypesCount = ref(8);
  const loanTypesCount = ref(5);
  const accountTypesCount = ref(6);
  const totalUsers = ref(1248);
  const totalAccounts = ref(2156);
  const totalCards = ref(3421);
  const totalTransactions = ref(89);
  
  // 更新当前时间
  function updateCurrentTime() {
    const now = new Date();
    currentTime.value = now.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
  
  // 导航方法
  function navigateToUserApproval() {
    router.push('/admin/user-approval');
  }
  
  function navigateToCardTypes() {
    console.log('导航到卡片类型维护页面');
    // 在实际应用中使用 router.push('/admin/card-types')
  }
  
  function navigateToLoanTypes() {
    console.log('导航到贷款类型维护页面');
    // 在实际应用中使用 router.push('/admin/loan-types')
  }
  
  function navigateToAccountTypes() {
    console.log('导航到账户类型维护页面');
    // 在实际应用中使用 router.push('/admin/account-types')
  }
  
  function handleLogout() {
    if (confirm('确定要退出登录吗？')) {
      console.log('用户退出登录');
      // 在实际应用中处理登出逻辑
      // router.push('/login')
    }
  }
  
  // 组件挂载时初始化
  onMounted(() => {
    updateCurrentTime();
    // 每秒更新时间
    setInterval(updateCurrentTime, 1000);
  });
  </script>
  
  <style scoped>
  .admin-dashboard {
    min-height: 100vh;
    background-color: #f8fafc;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Header */
  .dashboard-header {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
  }
  
  .header-left h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e40af;
    margin: 0 0 0.25rem 0;
  }
  
  .header-left p {
    color: #6b7280;
    margin: 0;
    font-size: 0.875rem;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .admin-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .admin-avatar {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #1e40af;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
  }
  
  .admin-details {
    display: flex;
    flex-direction: column;
  }
  
  .admin-name {
    font-weight: 500;
    color: #374151;
    font-size: 0.875rem;
  }
  
  .admin-role {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .btn-logout {
    background-color: #ef4444;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .btn-logout:hover {
    background-color: #dc2626;
  }
  
  /* Main Content */
  .dashboard-main {
    padding: 2rem 0;
  }
  
  /* Welcome Section */
  .welcome-section {
    margin-bottom: 3rem;
  }
  
  .welcome-card {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    color: white;
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .welcome-content h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }
  
  .welcome-content p {
    font-size: 1rem;
    margin: 0 0 1.5rem 0;
    opacity: 0.9;
  }
  
  .system-status {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .status-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }
  
  .status-indicator {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #10b981;
  }
  
  .status-time {
    font-size: 0.75rem;
    opacity: 0.8;
  }
  
  .welcome-icon {
    font-size: 4rem;
    opacity: 0.8;
  }
  
  /* Management Section */
  .management-section {
    margin-bottom: 3rem;
  }
  
  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 1.5rem;
  }
  
  .management-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .management-card {
    background-color: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 2px solid transparent;
  }
  
  .management-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    border-color: #1e40af;
  }
  
  .card-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  .card-icon.user-approval {
    background-color: #dbeafe;
    color: #1e40af;
  }
  
  .card-icon.card-types {
    background-color: #dcfce7;
    color: #059669;
  }
  
  .card-icon.loan-types {
    background-color: #fef3c7;
    color: #d97706;
  }
  
  .card-icon.account-types {
    background-color: #fee2e2;
    color: #dc2626;
  }
  
  .card-content {
    flex: 1;
  }
  
  .card-content h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 0.5rem 0;
  }
  
  .card-content p {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0 0 0.75rem 0;
    line-height: 1.4;
  }
  
  .card-stats {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }
  
  .stat-number {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e40af;
  }
  
  .stat-label {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .card-arrow {
    font-size: 1.25rem;
    color: #9ca3af;
    transition: color 0.2s;
  }
  
  .management-card:hover .card-arrow {
    color: #1e40af;
  }
  
  /* Stats Section */
  .stats-section {
    margin-bottom: 2rem;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .stat-card {
    background-color: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .stat-icon {
    font-size: 2rem;
  }
  
  .stat-info {
    display: flex;
    flex-direction: column;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e40af;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
    
    .welcome-card {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
    }
    
    .welcome-icon {
      font-size: 3rem;
    }
    
    .management-grid {
      grid-template-columns: 1fr;
    }
    
    .management-card {
      flex-direction: column;
      text-align: center;
    }
    
    .card-arrow {
      transform: rotate(90deg);
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .system-status {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .admin-info {
      flex-direction: column;
      text-align: center;
    }
  }
  </style>