<template>
    <div class="register-page">
      <div class="register-container">
        <div class="register-card">
          <div class="register-header">
            <h1>用户注册</h1>
            <p>创建您的银行账户</p>
          </div>
  
          <form @submit.prevent="handleRegister" class="register-form">
            <div v-if="errors.general" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {{ errors.general }}
            </div>
  
              <div class="form-group">
                <label for="username">用户名 <span class="required">*</span></label>
                <input
                  type="text"
                  id="username"
                  v-model="registerForm.username"
                  required
                  :class="{ 'error': errors.username }"
                  placeholder="请输入用户名"
                />
                <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
              </div>
  
              <div class="form-group">
                <label for="lastName">姓氏 <span class="required">*</span></label>
                <input
                  type="text"
                  id="lastName"
                  v-model="registerForm.lastName"
                  required
                  :class="{ 'error': errors.lastName }"
                  placeholder="请输入姓氏"
                />
                <div v-if="errors.lastName" class="error-message">{{ errors.lastName }}</div>
              </div>
  
            <div class="form-group">
              <label for="firstName">名字<span class="required">*</span></label>
              <input
                type="text"
                id="firstName"
                v-model="registerForm.firstName"
                required
                :class="{ 'error': errors.firstName }"
                placeholder="请输入名字"
              />
              <div v-if="errors.firstName" class="error-message">{{ errors.firstName }}</div>
            </div>
  
            <div class="form-group">
              <label for="email">电子邮箱 <span class="required">*</span></label>
              <input
                type="email"
                id="email"
                v-model="registerForm.email"
                required
                :class="{ 'error': errors.email }"
                placeholder="请输入电子邮箱"
              />
              <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
            </div>
  
            <div class="form-group">
              <label for="password">密码 <span class="required">*</span></label>
              <div class="password-input">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="registerForm.password"
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
              <label for="confirmPassword">确认密码 <span class="required">*</span></label>
              <div class="password-input">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="registerForm.confirmPassword"
                  required
                  :class="{ 'error': errors.confirmPassword }"
                  placeholder="请再次输入密码"
                />
              </div>
              <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
            </div>
  
            <div class="form-group">
              <label for="phone">手机号码 <span class="required">*</span></label>
              <input
                type="tel"
                id="phone"
                v-model="registerForm.phoneNumber"
                required
                :class="{ 'error': errors.phoneNumber }"
                placeholder="请输入手机号码"
              />
              <div v-if="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</div>
            </div>
  
            <div class="form-group">
              <label for="roles">角色 <span class="required">*</span></label>
              <select
                id="roles"
                :value="Array.from(registerForm.roles)[0] || ''"
                @change="handleRoleChange"
                required
                :class="{ 'error': errors.roles }"
                class="form-select"
              >
                <option value="">请选择角色</option>
                <option value="USER">普通用户</option>
                <option value="MANAGER">经理</option>
                <option value="ADMIN">管理员</option>
              </select>
              <div v-if="errors.roles" class="error-message">{{ errors.roles }}</div>
            </div>
  
            <div class="form-actions">
              <button type="submit" class="btn-register" :disabled="!isFormValid || isLoading">
                <span v-if="isLoading" class="loading-spinner"></span>
                {{ isLoading ? '注册中...' : '注册' }}
              </button>
            </div>
          </form>
  
          <div class="register-footer">
            <p>已有账户？ <button @click="navigateToLogin" class="link-button">立即登录</button></p>
            <p><button @click="navigateToHome" class="link-button">返回首页</button></p>
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
  const registerForm = reactive({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    roles: new Set()
  });
  
  // 错误信息
  const errors = reactive({});
  
  // 状态
  const showPassword = ref(false);
  const isLoading = ref(false);
  
  // 表单验证
  const isFormValid = computed(() => {
    const textFields = [
      registerForm.firstName,
      registerForm.lastName,
      registerForm.username,
      registerForm.email,
      registerForm.password,
      registerForm.confirmPassword,
      registerForm.phoneNumber
    ];
    
    return textFields.every(field => field.trim().length > 0) && 
           registerForm.roles.size > 0;
  });
  
  // 验证方法
  function validateForm() {
    errors.value = {};
    let isValid = true;
    
    // 名字验证
    if (!registerForm.firstName.trim()) {
      errors.value.firstName = '请输入名字';
      isValid = false;
    }
    
    // 姓氏验证
    if (!registerForm.lastName.trim()) {
      errors.value.lastName = '请输入姓氏';
      isValid = false;
    }
    
    // 用户名验证
    if (!registerForm.username.trim()) {
      errors.value.username = '请输入用户名';
      isValid = false;
    } else if (registerForm.username.length < 3) {
      errors.value.username = '用户名至少需要3个字符';
      isValid = false;
    }
    
    // 邮箱验证
    if (!registerForm.email.trim()) {
      errors.value.email = '请输入电子邮箱';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
      errors.value.email = '请输入有效的电子邮箱地址';
      isValid = false;
    }
    
    // 密码验证
    if (!registerForm.password.trim()) {
      errors.value.password = '请输入密码';
      isValid = false;
    } else if (registerForm.password.length < 6) {
      errors.value.password = '密码至少需要6个字符';
      isValid = false;
    }
    
    // 确认密码验证
    if (!registerForm.confirmPassword.trim()) {
      errors.value.confirmPassword = '请确认密码';
      isValid = false;
    } else if (registerForm.password !== registerForm.confirmPassword) {
      errors.value.confirmPassword = '两次输入的密码不一致';
      isValid = false;
    }
    
    // 手机号码验证
    if (!registerForm.phoneNumber.trim()) {
      errors.value.phoneNumber = '请输入手机号码';
      isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(registerForm.phoneNumber)) {
      errors.value.phoneNumber = '请输入有效的手机号码';
      isValid = false;
    }
    
    // Role validation
    if (registerForm.roles.size === 0) {
      errors.value.roles = '请选择角色';
      isValid = false;
    }
    
    return isValid;
  }
  
  // 注册处理
  async function handleRegister() {
    if (!validateForm()) {
      return;
    }
    
    isLoading.value = true;
    errors.value = {};
    
    try {
      // 准备注册数据，将 Set 转换为数组
      const registrationData = {
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
        phoneNumber: registerForm.phoneNumber,
        roles: Array.from(registerForm.roles)
      };
      
      // 调用后端注册API
      await authService.register(registrationData);
      
      // 注册成功后跳转到成功页面
      try {
        await router.push('/registration-success');
      } catch (navigationError) {
        console.error('Navigation error:', navigationError);
        // If navigation fails, try to redirect to landing page
        await router.push({ name: 'landing' });
      }
    } catch (error) {
      console.error('注册失败:', error);
      errors.value.general = error.message || '注册失败，请稍后重试';
    } finally {
      isLoading.value = false;
    }
  }
  
  // 处理角色选择
  function handleRoleChange(event) {
    const selectedRole = event.target.value;
    if (selectedRole) {
      registerForm.roles.clear();
      registerForm.roles.add(selectedRole);
    }
  }
  
  // 导航方法
  function navigateToLogin() {
    router.push('/login');
  }
  
  function navigateToHome() {
    router.push('/');
  }
  </script>
  
  <style scoped>
  .register-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .register-container {
    width: 100%;
    max-width: 500px;
  }
  
  .register-card {
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  .register-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .register-header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 0.5rem;
  }
  
  .register-header p {
    color: #6b7280;
    font-size: 1rem;
  }
  
  .register-form {
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
  
  .form-actions {
    margin-top: 1rem;
  }
  
  .btn-register {
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
  
  .btn-register:hover:not(:disabled) {
    background-color: #1e3a8a;
  }
  
  .btn-register:disabled {
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
  
  .register-footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .register-footer p {
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
  
  @media (max-width: 480px) {
    .register-card {
      padding: 1.5rem;
    }
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
  </style>
  