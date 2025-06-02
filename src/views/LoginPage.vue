<template>
    <div class="login-page">
      <div class="login-container">
        <div class="login-card">
          <div class="login-header">
            <h1>用户登录</h1>
            <p>登录银行管理系统</p>
          </div>
  
          <form @submit.prevent="handleLogin" class="login-form">
            <div v-if="errors.general" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {{ errors.general }}
            </div>
  
            <div class="form-group">
              <label for="username">用户名 <span class="required">*</span></label>
              <input
                type="text"
                id="username"
                v-model="loginForm.username"
                required
                :class="{ 'error': errors.username }"
                placeholder="请输入用户名"
              />
              <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
            </div>
  
            <div class="form-group">
              <label for="password">密码 <span class="required">*</span></label>
              <div class="password-input">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="loginForm.password"
                  required
                  :class="{ 'error': errors.password }"
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
              <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
            </div>
  
            <div class="form-group">
              <label for="role">角色 <span class="required">*</span></label>
              <select
                id="role"
                v-model="loginForm.role"
                required
                :class="{ 'error': errors.role }"
                class="form-select"
              >
                <option value="">请选择角色</option>
                <option value="USER">普通用户</option>
                <option value="MANAGER">经理</option>
                <option value="ADMIN">管理员</option>
              </select>
              <div v-if="errors.role" class="error-message">{{ errors.role }}</div>
            </div>
  
            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" v-model="rememberMe" />
                <span class="checkmark"></span>
                记住我
              </label>
              <button type="button" class="forgot-password" @click="handleForgotPassword">
                忘记密码？
              </button>
            </div>
  
            <div class="form-actions">
              <button type="submit" class="btn-login" :disabled="!isFormValid || isLoading">
                <span v-if="isLoading" class="loading-spinner"></span>
                {{ isLoading ? '登录中...' : '登录' }}
              </button>
            </div>
          </form>
  
          <div class="login-footer">
            <p>还没有账户？ <button @click="navigateToRegister" class="link-button">立即注册</button></p>
            <p><button @click="navigateToHome" class="link-button">返回首页</button></p>
          </div>
  
          <!-- 演示账户信息 -->
          <div class="demo-accounts">
            <h3>演示账户</h3>
            <div class="demo-account-list">
              <div class="demo-account" @click="fillDemoAccount('admin')">
                <div class="demo-role admin">管理员</div>
                <div class="demo-credentials">
                  <span>用户名: admin</span>
                  <span>密码: Admin123</span>
                </div>
              </div>
              <div class="demo-account" @click="fillDemoAccount('manager')">
                <div class="demo-role manager">经理</div>
                <div class="demo-credentials">
                  <span>用户名: manager</span>
                  <span>密码: Manager123</span>
                </div>
              </div>
              <div class="demo-account" @click="fillDemoAccount('user')">
                <div class="demo-role user">用户</div>
                <div class="demo-credentials">
                  <span>用户名: user</span>
                  <span>密码: User123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import authService from '../services/authService';
  
  const router = useRouter();
  
  // 表单数据
  const loginForm = reactive({
    username: '',
    password: '',
    role: ''
  });
  
  // 错误信息
  const errors = reactive({});
  
  // 状态
  const showPassword = ref(false);
  const rememberMe = ref(false);
  const isLoading = ref(false);
  
  // 表单验证
  const isFormValid = computed(() => {
    return loginForm.username.trim() && loginForm.password.trim() && loginForm.role.trim();
  });
  
  // 演示账户数据
  const demoAccounts = {
    admin: { username: 'admin', password: 'Admin123', role: 'ADMIN' },
    manager: { username: 'manager', password: 'Manager123', role: 'MANAGER' },
    user: { username: 'user', password: 'User123', role: 'USER' }
  };
  
  // 验证方法
  function validateForm() {
    errors.value = {};
    let isValid = true;
    
    if (!loginForm.username.trim()) {
      errors.value.username = '请输入用户名';
      isValid = false;
    }
    
    if (!loginForm.password.trim()) {
      errors.value.password = '请输入密码';
      isValid = false;
    }

    if (!loginForm.role) {
      errors.value.role = '请选择角色';
      isValid = false;
    }
    
    return isValid;
  }
  
  // 登录处理
  async function handleLogin() {
    if (!validateForm()) {
      return;
    }
    
    isLoading.value = true;
    errors.value = {};
    
    try {
      // 调用后端登录API
      const response = await authService.login({
        username: loginForm.username,
        password: loginForm.password,
        role: loginForm.role
      });

      // 确保登录成功后再跳转
      if (response && response.token) {
        // Dispatch a custom event to notify other components about login
        window.dispatchEvent(new Event('auth-state-changed'));
        
        try {
          // Redirect based on role
          if (loginForm.role === 'ADMIN' || loginForm.role === 'MANAGER') {
            await router.push({ name: 'admin-dashboard' });
          } else {
            await router.push({ name: 'dashboard' });
          }
        } catch (navigationError) {
          console.error('Navigation error:', navigationError);
          // If navigation fails, try to redirect to landing page
          await router.push({ name: 'landing' });
        }
      } else {
        throw new Error('登录失败：未收到有效的认证信息');
      }
      
    } catch (error) {
      console.error('登录失败:', error);
      errors.value.general = error.message || '登录失败，请稍后重试';
    } finally {
      isLoading.value = false;
    }
  }
  
  // 填充演示账户
  function fillDemoAccount(type) {
    const account = demoAccounts[type];
    loginForm.username = account.username;
    loginForm.password = account.password;
    loginForm.role = account.role;
    errors.value = {};
    // 自动登录演示账户
    handleLogin();
  }
  
  // 忘记密码处理
  function handleForgotPassword() {
    router.push('/forgot-password');
  }
  
  // 导航方法
  function navigateToRegister() {
    router.push('/register');
  }
  
  function navigateToHome() {
    router.push('/');
  }
  </script>
  
  <style scoped>
  .login-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .login-container {
    width: 100%;
    max-width: 450px;
  }
  
  .login-card {
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .login-header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 0.5rem;
  }
  
  .login-header p {
    color: #6b7280;
    font-size: 1rem;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #374151;
  }
  
  .required {
    color: #ef4444;
  }
  
  .form-group input {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: border-color 0.2s;
  }
  
  .form-group input:focus {
    border-color: #1e40af;
    outline: none;
    box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.1);
  }
  
  .form-group input.error {
    border-color: #ef4444;
  }
  
  .error-message {
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
  
  .password-input {
    position: relative;
  }
  
  .password-toggle {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #374151;
    cursor: pointer;
  }
  
  .checkbox-label input[type="checkbox"] {
    width: auto;
    margin: 0;
  }
  
  .forgot-password {
    background: none;
    border: none;
    color: #1e40af;
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.875rem;
  }
  
  .forgot-password:hover {
    color: #1e3a8a;
  }
  
  .form-actions {
    margin-top: 1rem;
  }
  
  .btn-login {
    width: 100%;
    background-color: #1e40af;
    color: white;
    border: none;
    padding: 0.875rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .btn-login:hover:not(:disabled) {
    background-color: #1e3a8a;
  }
  
  .btn-login:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
  
  .loading-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .login-footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .login-footer p {
    margin: 0.5rem 0;
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  .link-button {
    background: none;
    border: none;
    color: #1e40af;
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.875rem;
  }
  
  .link-button:hover {
    color: #1e3a8a;
  }
  
  .demo-accounts {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .demo-accounts h3 {
    text-align: center;
    color: #374151;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .demo-account-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .demo-account {
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .demo-account:hover {
    border-color: #1e40af;
    background-color: #f8fafc;
  }
  
  .demo-role {
    font-weight: 500;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
  }
  
  .demo-role.admin {
    color: #dc2626;
  }
  
  .demo-role.manager {
    color: #d97706;
  }
  
  .demo-role.user {
    color: #059669;
  }
  
  .demo-credentials {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .form-select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: border-color 0.2s;
    background-color: white;
  }
  
  .form-select:focus {
    border-color: #1e40af;
    outline: none;
    box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.1);
  }
  
  .form-select.error {
    border-color: #ef4444;
  }
  
  /* Responsive Design */
  @media (max-width: 480px) {
    .login-card {
      padding: 1.5rem;
    }
    
    .form-options {
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-start;
    }
  }
  </style>
  
