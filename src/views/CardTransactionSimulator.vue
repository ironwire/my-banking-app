<template>
  <div class="transaction-simulator-container">
    <div class="transaction-simulator-header">
      <h1>卡交易记录模拟器</h1>
      <p>创建模拟卡交易记录以测试系统功能</p>
    </div>

    <div class="simulator-panel">
      <!-- 交易记录表单 -->
      <div class="transaction-form-container">
        <h2>卡交易详情</h2>
        <form @submit.prevent="addTransaction" class="transaction-form">
          <div class="form-row">
            <div class="form-group">
              <label for="card_id">卡ID <span class="required">*</span></label>
              <select 
                id="card_id" 
                v-model="transactionForm.card_id" 
                required
                :class="{ 'error': errors.card_id }"
              >
                <option value="" disabled>选择卡</option>
                <option v-for="card in cards" :key="card.card_id" :value="card.card_id">
                  {{ card.card_id }} - {{ card.card_number }} ({{ card.card_type }})
                </option>
              </select>
              <div v-if="errors.card_id" class="error-message">{{ errors.card_id }}</div>
            </div>

            <div class="form-group">
              <label for="transaction_type">交易类型 <span class="required">*</span></label>
              <select 
                id="transaction_type" 
                v-model="transactionForm.transaction_type" 
                required
                :class="{ 'error': errors.transaction_type }"
              >
                <option value="" disabled>选择交易类型</option>
                <option v-for="type in transactionTypes" :key="type" :value="type">{{ type }}</option>
              </select>
              <div v-if="errors.transaction_type" class="error-message">{{ errors.transaction_type }}</div>
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
              <label for="transaction_date">交易日期 <span class="required">*</span></label>
              <input 
                type="datetime-local" 
                id="transaction_date" 
                v-model="transactionForm.transaction_date" 
                required
                :class="{ 'error': errors.transaction_date }"
              />
              <div v-if="errors.transaction_date" class="error-message">{{ errors.transaction_date }}</div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="merchant_name">商户名称 <span class="required">*</span></label>
              <input 
                type="text" 
                id="merchant_name" 
                v-model="transactionForm.merchant_name" 
                required
                :class="{ 'error': errors.merchant_name }"
              />
              <div v-if="errors.merchant_name" class="error-message">{{ errors.merchant_name }}</div>
            </div>

            <div class="form-group">
              <label for="merchant_category">商户类别</label>
              <select 
                id="merchant_category" 
                v-model="transactionForm.merchant_category"
                :class="{ 'error': errors.merchant_category }"
              >
                <option value="" disabled>选择商户类别</option>
                <option v-for="category in merchantCategories" :key="category" :value="category">{{ category }}</option>
              </select>
              <div v-if="errors.merchant_category" class="error-message">{{ errors.merchant_category }}</div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="transaction_location">交易地点</label>
              <input 
                type="text" 
                id="transaction_location" 
                v-model="transactionForm.transaction_location" 
                :class="{ 'error': errors.transaction_location }"
              />
              <div v-if="errors.transaction_location" class="error-message">{{ errors.transaction_location }}</div>
            </div>

            <div class="form-group">
              <label for="status">交易状态</label>
              <select 
                id="status" 
                v-model="transactionForm.status"
                :class="{ 'error': errors.status }"
              >
                <option v-for="status in transactionStatuses" :key="status" :value="status">{{ status }}</option>
              </select>
              <div v-if="errors.status" class="error-message">{{ errors.status }}</div>
            </div>
          </div>

          <div class="form-actions">
            <div class="template-dropdown">
              <select @change="handleTemplateChange" class="template-select">
                <option value="">选择交易模板</option>
                <option v-for="template in transactionTemplates" :key="template.name" :value="template.name">
                  {{ template.name }}
                </option>
              </select>
            </div>
            <button type="button" class="btn-reset" @click="resetForm">重置</button>
            <button type="submit" class="btn-add-transaction">添加交易</button>
          </div>
        </form>
      </div>

      <!-- 已添加交易记录列表 -->
      <div class="added-transactions">
        <div class="added-transactions-header">
          <h2>已添加卡交易记录 ({{ addedTransactions.length }})</h2>
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
                <th>卡ID</th>
                <th>交易类型</th>
                <th>金额 (¥)</th>
                <th>商户名称</th>
                <th>商户类别</th>
                <th>交易地点</th>
                <th>交易日期</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in addedTransactions" :key="index">
                <td>{{ transaction.card_id }}</td>
                <td>{{ transaction.transaction_type }}</td>
                <td :class="{'negative-amount': transaction.amount < 0}">
                  {{ formatCurrency(transaction.amount) }}
                </td>
                <td>{{ transaction.merchant_name }}</td>
                <td>{{ transaction.merchant_category }}</td>
                <td>{{ transaction.transaction_location || '-' }}</td>
                <td>{{ formatDateTime(transaction.transaction_date) }}</td>
                <td>
                  <span 
                    class="status-badge" 
                    :class="getStatusClass(transaction.status)"
                  >
                    {{ transaction.status }}
                  </span>
                </td>
                <td>
                  <button class="btn-delete" @click="removeTransaction(index)">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="no-transactions" v-else>
            <p>暂无添加的卡交易记录</p>
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
          <p>您确定要提交 <strong>{{ addedTransactions.length }}</strong> 条卡交易记录吗？</p>
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
          <p>已成功提交 <strong>{{ submittedCount }}</strong> 条卡交易记录！</p>
          
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
import { ref, reactive, computed, onMounted } from 'vue';

// 模拟卡数据 - 实际应用中应从API获取
const cards = ref([
  { card_id: 101, card_number: '6225 **** **** 1234', card_type: '信用卡', card_holder: '张三' },
  { card_id: 102, card_number: '6228 **** **** 5678', card_type: '借记卡', card_holder: '张三' },
  { card_id: 103, card_number: '6225 **** **** 9012', card_type: '信用卡', card_holder: '李四' },
  { card_id: 104, card_number: '6228 **** **** 3456', card_type: '借记卡', card_holder: '李四' },
  { card_id: 105, card_number: '6225 **** **** 7890', card_type: '信用卡', card_holder: '王五' },
  { card_id: 106, card_number: '6228 **** **** 1234', card_type: '借记卡', card_holder: '王五' }
]);

// 交易类型
const transactionTypes = [
  '信用卡消费',
  '信用卡还款',
  '借记卡消费',
  '取现',
  '分期付款',
  '退款',
  '预授权',
  '预授权完成'
];

// 商户类别
const merchantCategories = [
  '超市/便利店',
  '餐饮',
  '加油站',
  '公共交通',
  '电子产品',
  '服装',
  '医疗',
  '教育',
  '娱乐',
  '酒店',
  '航空',
  '水电煤气',
  '电信服务',
  '保险',
  '其他'
];

// 交易状态
const transactionStatuses = [
  'Completed',
  'Pending',
  'Failed',
  'Cancelled',
  'Processing'
];

// 交易模板
const transactionTemplates = [
  {
    name: '信用卡超市购物',
    data: {
      card_id: 101,
      transaction_type: '信用卡消费',
      amount: -350.75,
      merchant_name: '家乐福超市',
      merchant_category: '超市/便利店',
      transaction_location: '北京市朝阳区',
      status: 'Completed'
    }
  },
  {
    name: '信用卡加油站加油',
    data: {
      card_id: 101,
      transaction_type: '信用卡消费',
      amount: -200,
      merchant_name: '中石化加油站',
      merchant_category: '加油站',
      transaction_location: '北京市海淀区',
      status: 'Completed'
    }
  },
  {
    name: '信用卡餐饮消费',
    data: {
      card_id: 101,
      transaction_type: '信用卡消费',
      amount: -168.50,
      merchant_name: '海底捞火锅',
      merchant_category: '餐饮',
      transaction_location: '北京市西城区',
      status: 'Completed'
    }
  },
  {
    name: '信用卡还款',
    data: {
      card_id: 101,
      transaction_type: '信用卡还款',
      amount: 2000,
      merchant_name: '本行还款',
      merchant_category: '其他',
      transaction_location: '网上银行',
      status: 'Completed'
    }
  },
  {
    name: '借记卡水电煤缴费',
    data: {
      card_id: 102,
      transaction_type: '借记卡消费',
      amount: -150.25,
      merchant_name: '北京市水务局',
      merchant_category: '水电煤气',
      transaction_location: '北京市',
      status: 'Completed'
    }
  },
  {
    name: '借记卡电话费缴费',
    data: {
      card_id: 102,
      transaction_type: '借记卡消费',
      amount: -100,
      merchant_name: '中国移动',
      merchant_category: '电信服务',
      transaction_location: '网上支付',
      status: 'Completed'
    }
  },
  {
    name: '借记卡公交出行',
    data: {
      card_id: 102,
      transaction_type: '借记卡消费',
      amount: -4,
      merchant_name: '北京公交',
      merchant_category: '公共交通',
      transaction_location: '北京市',
      status: 'Completed'
    }
  },
  {
    name: '信用卡退款',
    data: {
      card_id: 101,
      transaction_type: '退款',
      amount: 89.90,
      merchant_name: '京东商城',
      merchant_category: '电子产品',
      transaction_location: '网上商城',
      status: 'Completed'
    }
  }
];

// 表单数据
const transactionForm = reactive({
  card_id: '',
  amount: '',
  merchant_name: '',
  merchant_category: '',
  transaction_location: '',
  transaction_date: formatDateForInput(new Date()),
  transaction_type: '',
  status: 'Completed'
});

// 错误信息
const errors = reactive({});

// 已添加的交易记录
const addedTransactions = ref([]);

// 模态框状态
const showSubmitModal = ref(false);
const showSuccessModal = ref(false);
const submittedCount = ref(0);

// 计算属性
const totalAmount = computed(() => {
  return addedTransactions.value.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
});

const uniqueTransactionTypes = computed(() => {
  const types = [...new Set(addedTransactions.value.map(t => t.transaction_type))];
  return types.length > 3 ? `${types.slice(0, 3).join(', ')} 等${types.length}种` : types.join(', ');
});

// 方法
function applyTemplate(template) {
  Object.keys(template.data).forEach(key => {
    transactionForm[key] = template.data[key];
  });
  transactionForm.transaction_date = formatDateForInput(new Date());
  errors.value = {};
}

function addTransaction() {
  if (!validateForm()) {
    return;
  }
  
  const newTransaction = {
    card_id: parseInt(transactionForm.card_id),
    amount: parseFloat(transactionForm.amount),
    merchant_name: transactionForm.merchant_name,
    merchant_category: transactionForm.merchant_category,
    transaction_location: transactionForm.transaction_location,
    transaction_date: transactionForm.transaction_date,
    transaction_type: transactionForm.transaction_type,
    status: transactionForm.status
  };
  
  addedTransactions.value.push(newTransaction);
  resetForm();
}

function resetForm() {
  Object.keys(transactionForm).forEach(key => {
    if (key === 'transaction_date') {
      transactionForm[key] = formatDateForInput(new Date());
    } else if (key === 'status') {
      transactionForm[key] = 'Completed';
    } else {
      transactionForm[key] = '';
    }
  });
  errors.value = {};
}

function validateForm() {
  errors.value = {};
  let isValid = true;
  
  if (!transactionForm.card_id) {
    errors.card_id = '请选择卡';
    isValid = false;
  }
  
  if (!transactionForm.transaction_type) {
    errors.transaction_type = '请选择交易类型';
    isValid = false;
  }
  
  if (!transactionForm.amount) {
    errors.amount = '请输入金额';
    isValid = false;
  } else if (isNaN(transactionForm.amount)) {
    errors.amount = '金额必须是数字';
    isValid = false;
  }
  
  if (!transactionForm.merchant_name) {
    errors.merchant_name = '请输入商户名称';
    isValid = false;
  } else if (transactionForm.merchant_name.length > 255) {
    errors.merchant_name = '商户名称不能超过255个字符';
    isValid = false;
  }
  
  if (!transactionForm.transaction_date) {
    errors.transaction_date = '请选择交易日期';
    isValid = false;
  }
  
  if (transactionForm.merchant_category && transactionForm.merchant_category.length > 50) {
    errors.merchant_category = '商户类别不能超过50个字符';
    isValid = false;
  }
  
  if (transactionForm.transaction_location && transactionForm.transaction_location.length > 255) {
    errors.transaction_location = '交易地点不能超过255个字符';
    isValid = false;
  }
  
  return isValid;
}

function removeTransaction(index) {
  addedTransactions.value.splice(index, 1);
}

function clearTransactions() {
  if (confirm('确定要清空所有已添加的卡交易记录吗？')) {
    addedTransactions.value = [];
  }
}

function submitTransactions() {
  if (addedTransactions.value.length === 0) {
    return;
  }
  
  showSubmitModal.value = true;
}

function confirmSubmit() {
  // 在实际应用中，这里应该调用API将交易记录保存到数据库
  console.log('提交卡交易记录:', addedTransactions.value);
  
  submittedCount.value = addedTransactions.value.length;
  showSubmitModal.value = false;
  showSuccessModal.value = true;
  
  // 提交成功后清空列表
  addedTransactions.value = [];
}

function closeSuccessModal() {
  showSuccessModal.value = false;
}

function closeAllModals() {
  showSubmitModal.value = false;
  showSuccessModal.value = false;
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
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
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

function handleTemplateChange(event) {
  const templateName = event.target.value;
  if (!templateName) return;
  
  const template = transactionTemplates.find(t => t.name === templateName);
  if (template) {
    applyTemplate(template);
  }
  
  // 重置选择框
  event.target.value = '';
}

// 初始化
onMounted(() => {
  console.log('卡交易模拟器已加载');
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

.template-dropdown {
  margin-right: auto;
}

.template-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
  color: #555;
  cursor: pointer;
  transition: border-color 0.2s;
}

.template-select:focus {
  border-color: #1e40af;
  outline: none;
  box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.1);
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
  
  .template-buttons {
    flex-direction: column;
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
</style>