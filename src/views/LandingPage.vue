<template>
    <div class="landing-page">
      <!-- Header -->
      <header class="header">
        <div class="container">
          <div class="nav">
            <div class="logo">
              <h2>银行管理系统</h2>
            </div>
            <div class="nav-links">
              <button @click="navigateToLogin" class="btn-link">登录</button>
              <button @click="navigateToRegister" class="btn-primary">注册</button>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1>现代化银行管理系统</h1>
              <p class="hero-description">
                安全、高效、智能的银行业务管理平台，为您提供全方位的金融服务解决方案。
                支持账户管理、交易处理、卡片服务、贷款申请等完整的银行业务流程。
              </p>
              <div class="hero-actions">
                <button @click="navigateToRegister" class="btn-primary btn-large">
                  立即注册
                </button>
                <button @click="navigateToLogin" class="btn-secondary btn-large">
                  用户登录
                </button>
              </div>
            </div>
            <div class="hero-image">
              <div class="hero-card">
                <div class="card-header">
                  <div class="card-icon">🏦</div>
                  <h3>银行管理系统</h3>
                </div>
                <div class="card-features">
                  <div class="feature">
                    <span class="feature-icon">💳</span>
                    <span>卡片管理</span>
                  </div>
                  <div class="feature">
                    <span class="feature-icon">💰</span>
                    <span>交易处理</span>
                  </div>
                  <div class="feature">
                    <span class="feature-icon">📊</span>
                    <span>数据分析</span>
                  </div>
                  <div class="feature">
                    <span class="feature-icon">🔒</span>
                    <span>安全保障</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <h2 class="section-title">核心功能</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">👥</div>
              <h3>客户管理</h3>
              <p>完整的客户信息管理，支持客户注册、资料维护和关系管理</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🏦</div>
              <h3>账户服务</h3>
              <p>多种账户类型支持，灵活的账户开立和管理功能</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💳</div>
              <h3>卡片业务</h3>
              <p>信用卡、借记卡申请和管理，支持多种卡片类型</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💸</div>
              <h3>交易处理</h3>
              <p>实时交易处理，支持转账、支付、取款等各种交易类型</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📈</div>
              <h3>贷款服务</h3>
              <p>多样化贷款产品，智能风险评估和审批流程</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📊</div>
              <h3>报表分析</h3>
              <p>丰富的数据报表和分析工具，助力业务决策</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <div class="cta-content">
            <h2>开始使用银行管理系统</h2>
            <p>立即注册账户，体验现代化的银行管理服务</p>
            <div class="cta-actions">
              <button @click="navigateToRegister" class="btn-primary btn-large">
                免费注册
              </button>
              <button @click="navigateToLogin" class="btn-outline btn-large">
                已有账户？立即登录
              </button>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>银行管理系统</h3>
              <p>专业的银行业务管理平台</p>
            </div>
            <div class="footer-section">
              <h4>产品功能</h4>
              <ul>
                <li>客户管理</li>
                <li>账户服务</li>
                <li>交易处理</li>
                <li>卡片业务</li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>支持服务</h4>
              <ul>
                <li>技术支持</li>
                <li>用户指南</li>
                <li>常见问题</li>
                <li>联系我们</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 银行管理系统. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import router from '../router/index';
  
  // 导航方法
  function navigateToRegister() {
    // 在实际应用中，这里应该使用 Vue Router 进行导航
    //console.log('导航到注册页面');
    router.push('/register');
  }
  
  function navigateToLogin() {
    // 在实际应用中，这里应该使用 Vue Router 进行导航
    //console.log('导航到登录页面');
    router.push('/login');
  }
  </script>
  
  <style scoped>
  .landing-page {
    min-height: 100vh;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Header */
  .header {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  
  .logo h2 {
    color: #1e40af;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .nav-links {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  /* Buttons */
  .btn-link {
    background: none;
    border: none;
    color: #4b5563;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: color 0.2s;
  }
  
  .btn-link:hover {
    color: #1e40af;
  }
  
  .btn-primary {
    background-color: #1e40af;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .btn-primary:hover {
    background-color: #1e3a8a;
  }
  
  .btn-secondary {
    background-color: white;
    color: #1e40af;
    border: 2px solid #1e40af;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-secondary:hover {
    background-color: #1e40af;
    color: white;
  }
  
  .btn-outline {
    background-color: transparent;
    color: white;
    border: 2px solid white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-outline:hover {
    background-color: white;
    color: #1e40af;
  }
  
  .btn-large {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  /* Hero Section */
  .hero {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    color: white;
    padding: 4rem 0;
  }
  
  .hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }
  
  .hero-text h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }
  
  .hero-description {
    font-size: 1.125rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  
  .hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .hero-image {
    display: flex;
    justify-content: center;
  }
  
  .hero-card {
    background-color: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    color: #333;
    max-width: 300px;
    width: 100%;
  }
  
  .card-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .card-icon {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
  
  .card-header h3 {
    color: #1e40af;
    margin: 0;
    font-size: 1.25rem;
  }
  
  .card-features {
    display: grid;
    gap: 1rem;
  }
  
  .feature {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background-color: #f8fafc;
    border-radius: 0.5rem;
  }
  
  .feature-icon {
    font-size: 1.25rem;
  }
  
  /* Features Section */
  .features {
    padding: 4rem 0;
    background-color: #f8fafc;
  }
  
  .section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 3rem;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .feature-card {
    background-color: white;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s;
  }
  
  .feature-card:hover {
    transform: translateY(-4px);
  }
  
  .feature-card .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .feature-card h3 {
    color: #1e40af;
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  
  .feature-card p {
    color: #6b7280;
    line-height: 1.6;
  }
  
  /* CTA Section */
  .cta {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    color: white;
    padding: 4rem 0;
  }
  
  .cta-content {
    text-align: center;
  }
  
  .cta-content h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .cta-content p {
    font-size: 1.125rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  
  .cta-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  /* Footer */
  .footer {
    background-color: #1f2937;
    color: white;
    padding: 3rem 0 1rem;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .footer-section h3,
  .footer-section h4 {
    margin-bottom: 1rem;
    color: #f3f4f6;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-section li {
    margin-bottom: 0.5rem;
    color: #d1d5db;
  }
  
  .footer-bottom {
    border-top: 1px solid #374151;
    padding-top: 1rem;
    text-align: center;
    color: #9ca3af;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .hero-text h1 {
      font-size: 2rem;
    }
    
    .hero-actions {
      justify-content: center;
    }
    
    .nav {
      flex-direction: column;
      gap: 1rem;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
    }
    
    .cta-actions {
      flex-direction: column;
      align-items: center;
    }
  }
  
  @media (max-width: 480px) {
    .hero-actions,
    .cta-actions {
      flex-direction: column;
    }
    
    .btn-large {
      width: 100%;
    }
  }
  </style>
  