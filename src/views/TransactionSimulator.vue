<template>
  <div class="transaction-simulator-container">
    <div class="transaction-simulator-header">
      <h1>交易记录模拟器</h1>
      <p>创建模拟交易记录以测试系统功能</p>
    </div>

    <div class="simulator-panel">
      <!-- 交易记录表单 -->
      <div class="transaction-form-container">
        <h2>交易详情</h2>
        <form @submit.prevent="addTransaction" class="transaction-form">
          <div class="form-row">
            <div class="form-group">
              <label for="accountNumber">账户 <span class="required">*</span></label>
              <div v-if="isLoadingAccounts" class="loading-indicator">
                <div class="spinner"></div>
                <span>加载账户中...</span>
              </div>
              <select 
                v-else
                id="accountNumber" 
                v-model="transactionForm.accountNumber" 
                required
                @change="updateAccountId"
                :class="{ 'error': errors.accountNumber }"
              >
                <option value="" disabled>选择账户</option>
                <option v-for="account in accounts" :key="account.account_id" :value="account.account_number">
                  {{ account.account_number }} - {{ account.account_name }}
                </option>
              </select>
              <div v-if="accountError" class="error-message">{{ accountError }}</div>
              <div v-if="errors.accountNumber" class="error-message">{{ errors.accountNumber }}</div>
            </div>

            <div class="form-group">
              <label for="transactionType">交易类型 <span class="required">*</span></label>
              <select 
                id="transactionType" 
                v-model="transactionForm.transactionType" 
                required
                :class="{ 'error': errors.transactionType }"
              >
                <option value="" disabled>选择交易类型</option>
                <option v-for="type in transactionTypes" :key="type" :value="type">{{ type }}</option>
              </select>
              <div v-if="errors.transactionType" class="error-message">{{ errors.transactionType }}</div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="amount">金额 (¥) <span class="required">*</span></label>
              <div class="input-with-prefix">
                <span class="input-prefix">¥</span>
                <input 
                  type="number" 
                  id="amount" 
                  v-model="transactionForm.amount" 
                  step="0.01" 
                  required
                  :class="{ 'error': errors.amount }"
                />
              </div>
              <div v-if="errors.amount" class="error-message">{{ errors.amount }}</div>
            </div>

            <div class="form-group">
              <label for="transactionDate">交易日期 <span class="required">*</span></label>
              <input 
                type="datetime-local" 
                id="transactionDate" 
                v-model="transactionForm.transactionDate" 
                required
                :class="{ 'error': errors.transactionDate }"
              />
              <div v-if="errors.transactionDate" class="error-message">{{ errors.transactionDate }}</div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="description">交易描述</label>
              <input 
                type="text" 
                id="description" 
                v-model="transactionForm.description"
                :class="{ 'error': errors.description }"
              >
              <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
            </div>

            <div class="form-group">
              <label for="referenceNumber">参考号</label>
              <input 
                type="text" 
                id="referenceNumber" 
                v-model="transactionForm.referenceNumber"
                :class="{ 'error': errors.referenceNumber }"
              >
              <div v-if="errors.referenceNumber" class="error-message">{{ errors.referenceNumber }}</div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group" v-if="isTransferType">
              <label for="receivingAccountNumber">接收账户 <span class="required">*</span></label>
              <select 
                id="receivingAccountNumber" 
                v-model="transactionForm.receivingAccountNumber"
                @change="updateReceivingAccountId"
                :class="{ 'error': errors.receivingAccountNumber }"
              >
                <option value="" disabled>选择接收账户</option>
                <option v-for="account in receivingAccounts" :key="account.account_id" :value="account.account_number">
                  {{ account.account_number }} - {{ account.account_name }}
                </option>
              </select>
              <div v-if="errors.receivingAccountNumber" class="error-message">{{ errors.receivingAccountNumber }}</div>
            </div>

            <div class="form-group">
              <label for="transactionStatus">交易状态</label>
              <select 
                id="transactionStatus" 
                v-model="transactionForm.transactionStatus"
                :class="{ 'error': errors.transactionStatus }"
              >
                <option v-for="status in transactionStatuses" :key="status" :value="status">{{ status }}</option>
              </select>
              <div v-if="errors.transactionStatus" class="error-message">{{ errors.transactionStatus }}</div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-reset" @click="resetForm">重置</button>
            <button type="submit" class="btn-add-transaction">添加交易</button>
          </div>
        </form>
      </div>

      <!-- 已添加交易记录列表 -->
      <div class="added-transactions">
        <div class="added-transactions-header">
          <h2>已添加交易记录 ({{ addedTransactions.length }})</h2>
          <div class="added-transactions-actions">
            <button 
              class="btn-clear" 
              @click="clearTransactions" 
              :disabled="addedTransactions.length === 0"
            >
              清空列表
            </button>
            <button 
              class="btn-submit" 
              @click="submitTransactions" 
              :disabled="addedTransactions.length === 0"
            >
              提交所有交易
            </button>
          </div>
        </div>

        <div class="transactions-table-container">
          <table class="transactions-table" v-if="addedTransactions.length > 0">
            <thead>
              <tr>
                <th>账户ID</th>
                <th>交易类型</th>
                <th>金额 (¥)</th>
                <th>交易日期</th>
                <th>描述</th>
                <th>接收账户</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in addedTransactions" :key="index">
                <td>{{ transaction.accountNumber }}</td>
                <td>{{ transaction.transactionType }}</td>
                <td :class="{'negative-amount': transaction.amount < 0}">
                  {{ formatCurrency(transaction.amount) }}
                </td>
                <td>{{ formatDateTime(transaction.transactionDate) }}</td>
                <td class="description-cell">{{ transaction.description }}</td>
                <td>{{ transaction.receivingAccountNumber || '-' }}</td>
                <td>
                  <span 
                    class="status-badge" 
                    :class="getStatusClass(transaction.transactionStatus)"
                  >
                    {{ transaction.transactionStatus }}
                  </span>
                </td>
                <td>
                  <button class="btn-delete" @click="removeTransaction(index)">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="no-transactions" v-else>
            <p>暂无添加的交易记录</p>
            <p class="hint">使用上方表单添加交易记录</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 提交确认模态框 -->
    <div class="modal" v-if="showSubmitModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>确认提交</h2>
          <button class="modal-close" @click="showSubmitModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <p>您确定要提交 <strong>{{ addedTransactions.length }}</strong> 条交易记录吗？</p>
          <p>提交后，这些记录将被保存到数据库中。</p>
          
          <div class="submit-summary">
            <div class="summary-item">
              <span class="summary-label">总交易数:</span>
              <span class="summary-value">{{ addedTransactions.length }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">总金额:</span>
              <span class="summary-value" :class="{'negative-amount': totalAmount < 0}">
                {{ formatCurrency(totalAmount) }}
              </span>
            </div>
            <div class="summary-item">
              <span class="summary-label">交易类型:</span>
              <span class="summary-value">{{ uniqueTransactionTypes }}</span>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="showSubmitModal = false">取消</button>
            <button type="button" class="btn-confirm" @click="confirmSubmit">确认提交</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 成功提示模态框 -->
    <div class="modal" v-if="showSuccessModal">
      <div class="modal-content success-modal">
        <div class="modal-header">
          <h2>提交成功</h2>
          <button class="modal-close" @click="showSuccessModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="success-icon">✓</div>
          <p>已成功提交 <strong>{{ submittedCount }}</strong> 条交易记录！</p>
          
          <div class="form-actions">
            <button type="button" class="btn-confirm" @click="closeSuccessModal">确定</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 模态框遮罩 -->
    <div class="modal-overlay" v-if="showSubmitModal || showSuccessModal" @click="closeAllModals"></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import authService from '../services/authService';

// Account data will be fetched from API
const accounts = ref([]);
const isLoadingAccounts = ref(true);
const accountError = ref(null);

// Transaction types
const transactionTypes = [
  '工资入账',
  '超市购物',
  '加油站消费',
  '转账入账',
  '转账出账',
  '信用卡还款',
  '取款',
  '存款',
  '网购',
  '餐饮消费',
  '公共交通',
  '水电煤缴费',
  '手机话费',
  '利息收入',
  '其他收入',
  '其他支出'
];

// Transaction statuses
const transactionStatuses = [
  'Completed',
  'Pending',
  'Failed',
  'Cancelled',
  'Processing'
];

// Form data
const transactionForm = reactive({
  accountId: '',
  accountNumber: '',
  amount: '',
  transactionType: '',
  transactionDate: formatDateForInput(new Date()),
  description: '',
  referenceNumber: '',
  receivingAccountId: '',
  receivingAccountNumber: '',
  transactionStatus: 'Completed',
  createdAt: new Date().toISOString()
});

// Error messages
const errors = reactive({});

// Added transactions
const addedTransactions = ref([]);

// Modal states
const showSubmitModal = ref(false);
const showSuccessModal = ref(false);
const submittedCount = ref(0);

// Get user ID from token
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      
      // Extract just the numeric ID from the id field
      let userId = payload.id || payload.sub || '';
      
      // If the ID contains a comma, extract just the number part
      if (typeof userId === 'string' && userId.includes(',')) {
        userId = userId.split(',')[0].trim();
      }
      
      return userId;
    }
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
  }
  return null;
};

// Fetch accounts from backend
const fetchAccounts = async () => {
  isLoadingAccounts.value = true;
  accountError.value = null;
  
  try {
    const userId = getUserIdFromToken();
    if (!userId) {
      throw new Error('无法获取用户ID');
    }
    
    const token = authService.getToken();
    if (!token) {
      throw new Error('未授权，请先登录');
    }
    
    console.log('Fetching accounts for user ID:', userId);
    const response = await axios.get(`http://localhost:8083/api/accounts/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Update accounts with data from API
    accounts.value = response.data.map(account => ({
      account_id: account.accountId,
      account_name: account.accountName || '账户',
      account_number: account.accountNumber,
      account_type: account.accountType || '储蓄账户'
    }));
    
    console.log('Fetched accounts:', accounts.value);
  } catch (err) {
    console.error('Error fetching accounts:', err);
    accountError.value = '获取账户信息失败，请稍后再试';
    
    // Fallback to mock data for development
    accounts.value = [
      { account_id: 1001, account_name: '储蓄账户', account_number: '6225****1234', account_type: '储蓄账户' },
      { account_id: 1002, account_name: '信用卡', account_number: '6224****5678', account_type: '信用卡' }
    ];
  } finally {
    isLoadingAccounts.value = false;
  }
};

// Computed properties
const isTransferType = computed(() => {
  return transactionForm.transactionType === '转账出账' || 
         transactionForm.transactionType === '转账入账' ||
         transactionForm.transactionType === '信用卡还款';
});

const receivingAccounts = computed(() => {
  if (transactionForm.accountNumber) {
    return accounts.value.filter(account => account.account_number !== transactionForm.accountNumber);
  }
  return accounts.value;
});

const totalAmount = computed(() => {
  return addedTransactions.value.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
});

const uniqueTransactionTypes = computed(() => {
  const types = [...new Set(addedTransactions.value.map(t => t.transactionType))];
  return types.length > 3 ? `${types.slice(0, 3).join(', ')} 等${types.length}种` : types.join(', ');
});

// Methods
function addTransaction() {
  try {
    console.log('Adding transaction with form data:', transactionForm);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
    
    console.log('Form validation passed, creating transaction');
    
    // Ensure transaction date is properly formatted
    let formattedTransactionDate;
    try {
      // If it's already an ISO string, use it directly
      if (typeof transactionForm.transactionDate === 'string' && 
          transactionForm.transactionDate.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?Z?$/)) {
        formattedTransactionDate = transactionForm.transactionDate;
      } else {
        // Otherwise, create a new Date object and convert to ISO string
        const date = new Date(transactionForm.transactionDate);
        if (isNaN(date.getTime())) {
          throw new Error('Invalid transaction date');
        }
        formattedTransactionDate = date.toISOString();
      }
    } catch (dateError) {
      console.error('Error formatting transaction date:', dateError);
      formattedTransactionDate = new Date().toISOString(); // Fallback to current date
    }
    
    const newTransaction = {
      accountId: parseInt(transactionForm.accountId),
      accountNumber: transactionForm.accountNumber,
      amount: parseFloat(transactionForm.amount),
      transactionType: transactionForm.transactionType,
      transactionDate: formattedTransactionDate,
      description: transactionForm.description,
      referenceNumber: transactionForm.referenceNumber || generateReferenceNumberByType(transactionForm.transactionType),
      receivingAccountId: transactionForm.receivingAccountId ? parseInt(transactionForm.receivingAccountId) : null,
      receivingAccountNumber: transactionForm.receivingAccountNumber || null,
      transactionStatus: transactionForm.transactionStatus,
      createdAt: new Date().toISOString()
    };
    
    console.log('New transaction:', newTransaction);
    addedTransactions.value.push(newTransaction);
    resetForm();
  } catch (error) {
    console.error('Error adding transaction:', error);
    alert('添加交易记录失败: ' + error.message);
  }
}

function resetForm() {
  transactionForm.accountId = '';
  transactionForm.accountNumber = '';
  transactionForm.amount = '';
  transactionForm.transactionType = '';
  transactionForm.transactionDate = formatDateForInput(new Date());
  transactionForm.description = '';
  transactionForm.referenceNumber = '';
  transactionForm.receivingAccountId = '';
  transactionForm.receivingAccountNumber = '';
  transactionForm.transactionStatus = 'Completed';
  transactionForm.createdAt = new Date().toISOString();
  
  errors.value = {};
}

function validateForm() {
  // Reset errors object properly
  Object.keys(errors).forEach(key => {
    delete errors[key];
  });
  
  let isValid = true;
  
  // Debug log to see what's happening
  console.log('Validating form with accountNumber:', transactionForm.accountNumber, 'accountId:', transactionForm.accountId);
  
  if (!transactionForm.accountNumber || !transactionForm.accountId) {
    errors.accountNumber = '请选择账户';
    isValid = false;
  }
  
  if (!transactionForm.transactionType) {
    errors.transactionType = '请选择交易类型';
    isValid = false;
  }
  
  if (!transactionForm.amount) {
    errors.amount = '请输入金额';
    isValid = false;
  } else if (isNaN(transactionForm.amount)) {
    errors.amount = '金额必须是数字';
    isValid = false;
  } else if (parseFloat(transactionForm.amount) <= 0) {
    errors.amount = '金额必须大于0';
    isValid = false;
  }
  
  if (!transactionForm.transactionDate) {
    errors.transactionDate = '请选择交易日期';
    isValid = false;
  }
  
  if (isTransferType.value && (!transactionForm.receivingAccountNumber || !transactionForm.receivingAccountId)) {
    errors.receivingAccountNumber = '转账交易必须选择接收账户';
    isValid = false;
  }
  
  // Log validation result
  console.log('Form validation result:', isValid, 'Errors:', errors);
  
  return isValid;
}

function removeTransaction(index) {
  addedTransactions.value.splice(index, 1);
}

function clearTransactions() {
  if (confirm('确定要清空所有已添加的交易记录吗？')) {
    addedTransactions.value = [];
  }
}

function submitTransactions() {
  if (addedTransactions.value.length === 0) {
    return;
  }
  
  showSubmitModal.value = true;
}

async function confirmSubmit() {
  try {
    // Get the authentication token
    const token = authService.getToken();
    if (!token) {
      throw new Error('未授权，请先登录');
    }
    
    console.log('提交交易记录:', addedTransactions.value);
    
    // Send the transactions to the backend
    const response = await axios.post('http://localhost:8083/api/mysettings/transactions/batch', 
      addedTransactions.value, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('交易记录提交成功:', response.data);
    
    // Update the UI
    submittedCount.value = addedTransactions.value.length;
    showSubmitModal.value = false;
    showSuccessModal.value = true;
    
    // Clear the transactions list after successful submission
    addedTransactions.value = [];
  } catch (error) {
    console.error('提交交易记录失败:', error);
    alert('提交交易记录失败: ' + (error.response?.data?.message || error.message || '未知错误'));
    // Keep the modal open so the user can try again
  }
}

function closeSuccessModal() {
  showSuccessModal.value = false;
}

function closeAllModals() {
  try {
    showSubmitModal.value = false;
    showSuccessModal.value = false;
  } catch (error) {
    console.error('Error closing modals:', error);
  }
}

// 辅助函数
function formatDateForInput(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatDateTime(dateString) {
  try {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString);
      return '-';
    }
    
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error, 'Date string:', dateString);
    return '-';
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function generateReferenceNumber() {
  const prefix = 'TX';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}${timestamp}${random}`;
}

function generateReferenceNumberByType(type) {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  let prefix = 'TX'; // Default prefix
  
  // Set prefix based on transaction type
  switch (type) {
    case '工资入账':
      prefix = 'SAL';
      break;
    case '超市购物':
      prefix = 'MKT';
      break;
    case '加油站消费':
      prefix = 'GAS';
      break;
    case '转账入账':
      prefix = 'TRI';
      break;
    case '转账出账':
      prefix = 'TRO';
      break;
    case '信用卡还款':
      prefix = 'CCP';
      break;
    case '取款':
      prefix = 'WDR';
      break;
    case '存款':
      prefix = 'DEP';
      break;
    case '网购':
      prefix = 'ONL';
      break;
    case '餐饮消费':
      prefix = 'DIN';
      break;
    case '公共交通':
      prefix = 'TRN';
      break;
    case '水电煤缴费':
      prefix = 'UTL';
      break;
    case '手机话费':
      prefix = 'TEL';
      break;
    case '利息收入':
      prefix = 'INT';
      break;
    case '其他收入':
      prefix = 'INC';
      break;
    case '其他支出':
      prefix = 'EXP';
      break;
    default:
      prefix = 'TX';
  }
  
  return `${prefix}${year}${month}${day}${timestamp}${random}`;
}

function getStatusClass(status) {
  switch (status) {
    case 'Completed': return 'status-completed';
    case 'Pending': return 'status-pending';
    case 'Failed': return 'status-failed';
    case 'Cancelled': return 'status-cancelled';
    case 'Processing': return 'status-processing';
    default: return '';
  }
}

// Methods to update account IDs when account numbers are selected
function updateAccountId() {
  const selectedAccount = accounts.value.find(acc => acc.account_number === transactionForm.accountNumber);
  if (selectedAccount) {
    transactionForm.accountId = selectedAccount.account_id;
    console.log('Updated accountId:', transactionForm.accountId);
  } else {
    transactionForm.accountId = '';
  }
}

function updateReceivingAccountId() {
  const selectedAccount = accounts.value.find(acc => acc.account_number === transactionForm.receivingAccountNumber);
  if (selectedAccount) {
    transactionForm.receivingAccountId = selectedAccount.account_id;
    console.log('Updated receivingAccountId:', transactionForm.receivingAccountId);
  } else {
    transactionForm.receivingAccountId = '';
  }
}

// Watch for changes in transaction type and update reference number
watch(() => transactionForm.transactionType, (newType) => {
  if (newType) {
    transactionForm.referenceNumber = generateReferenceNumberByType(newType);
  }
});

// 初始化
onMounted(() => {
  console.log('交易模拟器已加载');
  fetchAccounts();
});
</script>

<style scoped>
.transaction-simulator-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
}

.transaction-simulator-header {
  text-align: center;
  margin-bottom: 2rem;
}

.transaction-simulator-header h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.transaction-simulator-header p {
  font-size: 1.125rem;
  color: #555;
}

/* Simulator Panel */
.simulator-panel {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.simulator-panel h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 1rem;
}

/* Transaction Form */
.transaction-form-container {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.transaction-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.input-with-prefix {
  position: relative;
}

.input-prefix {
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  color: #555;
}

.input-with-prefix input {
  padding-left: 1.5rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #1e40af;
  outline: none;
  box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.1);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.required {
  color: #ef4444;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-reset,
.btn-add-transaction,
.btn-clear,
.btn-submit,
.btn-cancel,
.btn-confirm {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-reset {
  background-color: white;
  color: #555;
  border: 1px solid #d1d5db;
}

.btn-reset:hover {
  background-color: #f9fafb;
}

.btn-add-transaction,
.btn-submit,
.btn-confirm {
  background-color: #1e40af;
  color: white;
  border: none;
}

.btn-add-transaction:hover,
.btn-submit:hover,
.btn-confirm:hover {
  background-color: #1e3a8a;
}

.btn-clear,
.btn-cancel {
  background-color: white;
  color: #555;
  border: 1px solid #d1d5db;
}

.btn-clear:hover,
.btn-cancel:hover {
  background-color: #f9fafb;
}

.btn-clear:disabled,
.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Added Transactions */
.added-transactions {
  margin-bottom: 2rem;
}

.added-transactions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.added-transactions-actions {
  display: flex;
  gap: 0.75rem;
}

.transactions-table-container {
  overflow-x: auto;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.transactions-table th,
.transactions-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.transactions-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #4b5563;
}

.transactions-table tr:hover {
  background-color: #f9fafb;
}

.description-cell {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.negative-amount {
  color: #ef4444;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-completed {
  background-color: #dcfce7;
  color: #166534;
}

.status-pending {
  background-color: #fef3c7;
  color: #92400e;
}

.status-failed {
  background-color: #fee2e2;
  color: #991b1b;
}

.status-cancelled {
  background-color: #f3f4f6;
  color: #4b5563;
}

.status-processing {
  background-color: #dbeafe;
  color: #1e40af;
}

.btn-delete {
  padding: 0.25rem 0.5rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #dc2626;
}

.no-transactions {
  text-align: center;
  padding: 2rem 0;
  color: #6b7280;
}

.hint {
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 0.5rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  width: 90%;
  max-width: 500px;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.success-modal {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e40af;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  padding: 1.5rem;
}

.submit-summary {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.summary-item:last-child {
  margin-bottom: 0;
}

.summary-label {
  font-weight: 500;
  color: #4b5563;
}

.success-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  background-color: #dcfce7;
  color: #166534;
  font-size: 2rem;
  border-radius: 50%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .form-group {
    min-width: 100%;
  }
  
  .added-transactions-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .added-transactions-actions {
    width: 100%;
  }
  
  .btn-clear,
  .btn-submit {
    flex: 1;
  }
}

@media (max-width: 480px) {
  .form-actions {
    flex-direction: column;
  }
  
  .btn-reset,
  .btn-add-transaction,
  .btn-clear,
  .btn-submit,
  .btn-cancel,
  .btn-confirm {
    width: 100%;
  }
}

.loading-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: #6b7280;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-top-color: #1e40af;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
