<template>
  <div class="account-application-page">
    <!-- Header -->
    <header class="page-header">
      <div class="container">
        <div class="header-content">
          <div class="header-left">
            <button @click="navigateBack" class="btn-back">
              ← 返回
            </button>
            <div class="header-info">
              <h1>账户申请</h1>
              <p>申请开立新的银行账户</p>
            </div>
          </div>
          <div class="header-right">
            <div class="application-status" v-if="applicationId">
              <span class="status-label">申请状态:</span>
              <span class="status-badge" :class="getStatusClass(applicationForm.status)">
                {{ getStatusText(applicationForm.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="page-main">
      <div class="container">
        <div class="application-container">
          <!-- Application Form -->
          <div class="application-form-card">
            <form @submit.prevent="handleSubmit" class="application-form">
              <div class="form-header">
                <h2>账户申请信息</h2>
                <p>请填写完整的账户申请信息</p>
              </div>

              <!-- Account Type Selection -->
              <div class="form-section">
                <h3>账户类型选择</h3>
                <div class="account-types-grid">
                  <div 
                    v-for="accountType in accountTypes" 
                    :key="accountType.account_type_id"
                    class="account-type-card"
                    :class="{ 'selected': applicationForm.account_type_id === accountType.account_type_id }"
                    @click="selectAccountType(accountType.account_type_id)"
                  >
                    <div class="account-type-icon">
                      {{ getAccountTypeIcon(accountType.type_name) }}
                    </div>
                    <div class="account-type-info">
                      <h4>{{ accountType.type_name }}</h4>
                      <p>{{ accountType.description }}</p>
                      <div class="account-type-features">
                        <div class="feature">
                          <span class="feature-label">最低余额:</span>
                          <span class="feature-value">¥{{ formatCurrency(accountType.minimum_balance) }}</span>
                        </div>
                        <div class="feature">
                          <span class="feature-label">利率:</span>
                          <span class="feature-value">{{ accountType.interest_rate }}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="errors.account_type_id" class="error-message">{{ errors.account_type_id }}</div>
              </div>

              <!-- Application Details -->
              <div class="form-section">
                <h3>申请详情</h3>
                <div class="form-row">
                  <div class="form-group">
                    <label for="initial_deposit">初始存款金额 (¥) <span class="required">*</span></label>
                    <div class="input-with-prefix">
                      <span class="input-prefix">¥</span>
                      <input 
                        type="number" 
                        id="initial_deposit" 
                        v-model="applicationForm.initial_deposit" 
                        step="0.01" 
                        min="0"
                        required
                        :class="{ 'error': errors.initial_deposit }"
                        placeholder="请输入初始存款金额"
                      />
                    </div>
                    <div v-if="errors.initial_deposit" class="error-message">{{ errors.initial_deposit }}</div>
                    <div v-if="selectedAccountType" class="field-hint">
                      最低余额要求: ¥{{ formatCurrency(selectedAccountType.minimum_balance) }}
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="source_of_funds">资金来源 <span class="required">*</span></label>
                    <select 
                      id="source_of_funds" 
                      v-model="applicationForm.source_of_funds" 
                      required
                      :class="{ 'error': errors.source_of_funds }"
                    >
                      <option value="" disabled>请选择资金来源</option>
                      <option v-for="source in fundsSources" :key="source" :value="source">{{ source }}</option>
                    </select>
                    <div v-if="errors.source_of_funds" class="error-message">{{ errors.source_of_funds }}</div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="purpose">开户目的 <span class="required">*</span></label>
                  <textarea 
                    id="purpose" 
                    v-model="applicationForm.purpose" 
                    required
                    :class="{ 'error': errors.purpose }"
                    placeholder="请描述开户目的，例如：日常储蓄、工资账户、投资理财等"
                    rows="3"
                  ></textarea>
                  <div v-if="errors.purpose" class="error-message">{{ errors.purpose }}</div>
                </div>

                <div class="form-group">
                  <label for="notes">备注信息</label>
                  <textarea 
                    id="notes" 
                    v-model="applicationForm.notes" 
                    :class="{ 'error': errors.notes }"
                    placeholder="其他需要说明的信息（可选）"
                    rows="2"
                  ></textarea>
                  <div v-if="errors.notes" class="error-message">{{ errors.notes }}</div>
                </div>
              </div>

              <!-- Terms Agreement -->
              <div class="form-section">
                <div class="terms-agreement">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="agreeToTerms" required />
                    <span class="checkmark"></span>
                    我已阅读并同意 <a href="#" class="terms-link">账户开立条款和条件</a>
                  </label>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="form-actions">
                <button type="button" class="btn-reset" @click="resetForm">
                  重置表单
                </button>
                <button 
                  type="submit" 
                  class="btn-submit"
                  :disabled="!canSubmit || isSubmitting"
                >
                  <span v-if="isSubmitting" class="loading-spinner"></span>
                  {{ isSubmitting ? '提交中...' : '提交申请' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

    <!-- Success Modal -->
    <div class="modal" v-if="showSuccessModal">
      <div class="modal-content success-modal">
        <div class="modal-header">
          <h2>申请提交成功</h2>
          <button class="modal-close" @click="showSuccessModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="success-icon">✓</div>
          <p>您的账户申请已成功提交！</p>
          <div class="application-info">
            <div class="info-item">
              <span class="info-label">申请编号:</span>
              <span class="info-value">{{ submittedApplicationId }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">申请状态:</span>
              <span class="info-value">待审核</span>
            </div>
          </div>
          <p class="success-note">我们将在1-3个工作日内处理您的申请，请耐心等待。</p>
          
          <div class="form-actions">
            <button type="button" class="btn-confirm" @click="closeSuccessModal">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Overlay -->
    <div class="modal-overlay" v-if="showSuccessModal" @click="showSuccessModal = false"></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 响应式数据
const applicationId = ref(null);
const isSubmitting = ref(false);
const showSuccessModal = ref(false);
const submittedApplicationId = ref('');
const agreeToTerms = ref(false);

// 表单数据 (removed customer_id since current user is applying)
const applicationForm = reactive({
  account_type_id: '',
  initial_deposit: '',
  purpose: '',
  source_of_funds: '',
  notes: '',
  status: 'Pending'
});

// 错误信息
const errors = reactive({
  account_type_id: '',
  initial_deposit: '',
  purpose: '',
  source_of_funds: '',
  notes: '',
  general: ''
});

// 模拟数据 (removed customers array)
const accountTypes = ref([
  {
    account_type_id: 1,
    type_name: '储蓄账户',
    description: '适合日常储蓄，享受稳定利息收益',
    minimum_balance: 100,
    interest_rate: 2.5
  },
  {
    account_type_id: 2,
    type_name: '活期账户',
    description: '灵活存取，适合日常资金周转',
    minimum_balance: 10,
    interest_rate: 0.5
  },
  {
    account_type_id: 3,
    type_name: '定期账户',
    description: '固定期限存款，享受更高利息',
    minimum_balance: 1000,
    interest_rate: 4.0
  },
  {
    account_type_id: 4,
    type_name: '投资账户',
    description: '专业投资理财，多元化投资选择',
    minimum_balance: 10000,
    interest_rate: 3.5
  }
]);

const fundsSources = [
  '工资收入',
  '投资收益',
  '经营收入',
  '继承财产',
  '礼品赠与',
  '其他合法收入'
];

// 计算属性 (removed customer-related computed properties)
const selectedAccountType = computed(() => {
  return accountTypes.value.find(t => t.account_type_id === parseInt(applicationForm.account_type_id)) || null;
});

const canSubmit = computed(() => {
  return applicationForm.account_type_id && 
         applicationForm.initial_deposit && 
         applicationForm.source_of_funds && 
         applicationForm.purpose && 
         agreeToTerms.value;
});

// 方法
function selectAccountType(accountTypeId) {
  applicationForm.account_type_id = accountTypeId;
  errors.account_type_id = '';
}

function validateForm() {
  let isValid = true;
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
  
  if (!applicationForm.account_type_id) {
    errors.account_type_id = '请选择账户类型';
    isValid = false;
  }
  
  if (!applicationForm.initial_deposit) {
    errors.initial_deposit = '请输入初始存款金额';
    isValid = false;
  } else if (parseFloat(applicationForm.initial_deposit) < 0) {
    errors.initial_deposit = '初始存款金额不能为负数';
    isValid = false;
  } else if (selectedAccountType.value && parseFloat(applicationForm.initial_deposit) < selectedAccountType.value.minimum_balance) {
    errors.initial_deposit = `初始存款不能低于最低余额要求 ¥${formatCurrency(selectedAccountType.value.minimum_balance)}`;
    isValid = false;
  }
  
  if (!applicationForm.source_of_funds) {
    errors.source_of_funds = '请选择资金来源';
    isValid = false;
  }
  
  if (!applicationForm.purpose) {
    errors.purpose = '请填写开户目的';
    isValid = false;
  } else if (applicationForm.purpose.length > 255) {
    errors.purpose = '开户目的不能超过255个字符';
    isValid = false;
  }
  
  if (applicationForm.notes && applicationForm.notes.length > 255) {
    errors.notes = '备注信息不能超过255个字符';
    isValid = false;
  }
  
  return isValid;
}

async function handleSubmit() {
  if (!validateForm() || !agreeToTerms.value) {
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('提交账户申请:', applicationForm);
    
    // 模拟生成申请ID
    submittedApplicationId.value = `APP${Date.now()}`;
    showSuccessModal.value = true;
    
  } catch (error) {
    console.error('提交申请失败:', error);
    errors.general = '提交申请失败，请重试';
  } finally {
    isSubmitting.value = false;
  }
}

function resetForm() {
  Object.keys(applicationForm).forEach(key => {
    if (key === 'status') {
      applicationForm[key] = 'Pending';
    } else {
      applicationForm[key] = '';
    }
  });
  agreeToTerms.value = false;
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
}

function closeSuccessModal() {
  showSuccessModal.value = false;
  resetForm();
}

function navigateBack() {
  router.push('/accounts');
}

function getAccountTypeIcon(typeName) {
  const icons = {
    '储蓄账户': '💰',
    '活期账户': '💳',
    '定期账户': '🏦',
    '投资账户': '📈'
  };
  return icons[typeName] || '🏛️';
}

function getStatusClass(status) {
  const classes = {
    'Pending': 'status-pending',
    'Approved': 'status-approved',
    'Rejected': 'status-rejected'
  };
  return classes[status] || 'status-pending';
}

function getStatusText(status) {
  const texts = {
    'Pending': '待审核',
    'Approved': '已批准',
    'Rejected': '已拒绝'
  };
  return texts[status] || '待审核';
}

function formatCurrency(value) {
  if (!value) return '0.00';
  return new Intl.NumberFormat('zh-CN', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// 组件挂载时的初始化
onMounted(() => {
  console.log('账户申请页面已加载');
});
</script>

<style scoped>
/* Remove all progress-steps related CSS and add: */

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e40af;
  margin: 0 0 0.5rem 0;
}

.form-header p {
  color: #6b7280;
  margin: 0;
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.form-section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.form-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
}

.account-type-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.btn-reset {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-reset:hover {
  background-color: #e5e7eb;
}
/* Page Styles */
.account-application-page {
  font-family: 'Arial', sans-serif;
  color: #333;
}

.page-header {
  background-color: #f8fafc;
  padding: 20px 0;
  border-bottom: 1px solid #e2e8f0;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
}

.btn-back {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #4a5568;
  cursor: pointer;
  margin-right: 20px;
}

.header-info h1 {
  font-size: 1.75rem;
  margin: 0;
  color: #2d3748;
}

.header-info p {
  font-size: 1rem;
  color: #718096;
  margin: 5px 0 0 0;
}

.header-right {
  display: flex;
  align-items: center;
}

.application-status {
  display: flex;
  align-items: center;
}

.status-label {
  font-size: 1rem;
  color: #4a5568;
  margin-right: 5px;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  color: white;
}

.status-pending {
  background-color: #f0ad4e;
}

.status-approved {
  background-color: #5cb85c;
}

.status-rejected {
  background-color: #d9534f;
}

.page-main {
  padding: 20px 0;
}

.application-container {
  display: flex;
  justify-content: center;
}

.application-form-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 800px;
}

.application-form {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #4a5568;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 1rem;
  color: #4a5568;
  transition: border-color 0.2s;
}

.form-group input[type="text"]:focus,
.form-group input[type="email"]:focus,
.form-group input[type="number"]:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #90cdf4;
  outline: none;
  box-shadow: 0 0 0 2px rgba(144, 205, 244, 0.3);
}

.form-group textarea {
  resize: vertical;
}

.input-with-prefix {
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  overflow: hidden;
}

.input-with-prefix .input-prefix {
  background-color: #edf2f7;
  color: #718096;
  padding: 10px 12px;
  border-right: 1px solid #e2e8f0;
}

.input-with-prefix input {
  border: none;
  padding: 10px;
  font-size: 1rem;
  color: #4a5568;
  flex: 1;
}

.input-with-prefix input:focus {
  outline: none;
  box-shadow: none;
}

.error-message {
  color: #e53e3e;
  font-size: 0.9rem;
  margin-top: 5px;
}

.field-hint {
  color: #718096;
  font-size: 0.875rem;
  margin-top: 5px;
}

.terms-agreement {
  margin-bottom: 20px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #4a5568;
}

.checkbox-label input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.checkmark {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e0;
  border-radius: 3px;
  margin-right: 10px;
  background-color: white;
  transition: background-color 0.2s;
}

.checkbox-label:hover input[type="checkbox"] ~ .checkmark {
  background-color: #edf2f7;
}

.checkbox-label input[type="checkbox"]:checked ~ .checkmark {
  background-color: #3182ce;
  border-color: #3182ce;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-label input[type="checkbox"]:checked ~ .checkmark:after {
  display: block;
}

.checkbox-label .checkmark:after {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -50%) rotate(45deg);
}

.terms-link {
  color: #3182ce;
  text-decoration: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.btn-submit {
  background-color: #3182ce;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit:hover {
  background-color: #2c71ba;
}

.btn-submit:disabled {
  background-color: #a3b1c6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  z-index: 1001;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-size: 1.5rem;
  margin: 0;
  color: #2d3748;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #718096;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  text-align: center;
}

.success-modal .success-icon {
  font-size: 4rem;
  color: #5cb85c;
  margin-bottom: 10px;
}

.success-modal p {
  font-size: 1.125rem;
  color: #4a5568;
  margin-bottom: 15px;
}

.application-info {
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.info-label {
  font-weight: 500;
  color: #4a5568;
}

.info-value {
  color: #2d3748;
}

.success-note {
  font-size: 0.875rem;
  color: #718096;
  margin-top: 10px;
}

.btn-confirm {
  background-color: #5cb85c;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-confirm:hover {
  background-color: #4cae4c;
}

/* Account Type Grid Styles */
.account-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.account-type-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s;
  border: 2px solid transparent;
}

.account-type-card:hover,
.account-type-card.selected {
  transform: translateY(-5px);
}

.account-type-card.selected {
  border-color: #3182ce;
}

.account-type-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-align: center;
}

.account-type-info {
  text-align: left;
}

.account-type-info p {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.account-type-features {
  display: flex;
  flex-direction: column;
}

.feature {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.feature-label {
  font-weight: 500;
  color: #4a5568;
}

.feature-value {
  color: #2d3748;
}

/* Required Field Indicator */
.required::after {
  content: " *";
  color: #e53e3e;
}

/* Error Input Style */
.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #e53e3e;
  box-shadow: 0 0 0 2px rgba(229, 62, 62, 0.2);
}
</style>
