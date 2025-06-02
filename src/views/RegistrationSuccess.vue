<template>
  <div class="success-page">
    <div class="success-container">
      <div class="success-card">
        <div class="success-icon">✓</div>
        <h1>注册成功！</h1>
        <p>您的账户已成功创建</p>
        <div class="success-actions">
          <button @click="navigateToLogin" class="btn-login">
            点击登录
          </button>
          <button @click="navigateToHome" class="btn-home">
            返回首页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToLogin() {
  router.push('/login');
}

function navigateToHome() {
  router.push('/');
}
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.success-container {
  width: 100%;
  max-width: 400px;
}

.success-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
}

.success-icon {
  width: 64px;
  height: 64px;
  background-color: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.success-card h1 {
  color: #1e40af;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.success-card p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.success-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-login {
  background-color: #1e40af;
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-login:hover {
  background-color: #1e3a8a;
}

.btn-home {
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.875rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-home:hover {
  background-color: #e5e7eb;
}
</style> 