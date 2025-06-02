<template>
  <div class="loan-type-container">
    <div class="loan-type-header">
      <h1>贷款类型管理</h1>
      <p>管理银行提供的各种贷款类型、利率范围及期限</p>
    </div>

    <div class="management-panel">
      <div class="panel-actions">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索贷款类型..." 
            @input="filterLoanTypes"
          />
        </div>
        <button class="btn-add" @click="openAddModal">
          <span class="btn-icon">+</span> 添加新贷款类型
        </button>
      </div>

      <!-- Loan Types Table -->
      <div class="loan-types-table-container">
        <table class="loan-types-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>描述</th>
              <th>利率范围 (%)</th>
              <th>期限范围 (月)</th>
              <th>金额范围 (¥)</th>
              <th>状态</th>
              <th>创建日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredLoanTypes.length === 0">
              <td colspan="9" class="no-data">暂无贷款类型数据</td>
            </tr>
            <tr v-for="loanType in filteredLoanTypes" :key="loanType.loan_type_id">
              <td>{{ loanType.loan_type_id }}</td>
              <td>{{ loanType.name }}</td>
              <td class="description-cell">{{ loanType.description }}</td>
              <td>{{ loanType.min_interest_rate }}% - {{ loanType.max_interest_rate }}%</td>
              <td>{{ loanType.min_term }} - {{ loanType.max_term }}个月</td>
              <td>{{ formatCurrency(loanType.minimum_amount) }} - {{ formatCurrency(loanType.maximum_amount) }}</td>
              <td>
                <span 
                  class="status-badge" 
                  :class="{ 'active': loanType.is_active, 'inactive': !loanType.is_active }"
                >
                  {{ loanType.is_active ? '启用' : '禁用' }}
                </span>
              </td>
              <td>{{ formatDate(loanType.created_at) }}</td>
              <td class="actions-cell">
                <button class="btn-edit" @click="openEditModal(loanType)">编辑</button>
                <button 
                  class="btn-toggle" 
                  :class="{ 'btn-activate': !loanType.is_active, 'btn-deactivate': loanType.is_active }"
                  @click="toggleStatus(loanType)"
                >
                  {{ loanType.is_active ? '禁用' : '启用' }}
                </button>
                <button class="btn-delete" @click="confirmDelete(loanType)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination" v-if="totalPages > 1">
        <button 
          class="pagination-btn" 
          :disabled="currentPage === 1" 
          @click="changePage(currentPage - 1)"
        >
          上一页
        </button>
        <div class="pagination-info">
          {{ currentPage }} / {{ totalPages }}
        </div>
        <button 
          class="pagination-btn" 
          :disabled="currentPage === totalPages" 
          @click="changePage(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal" v-if="showModal">
      <div class="modal-content loan-modal">
        <div class="modal-header">
          <h2>{{ isEditing ? '编辑贷款类型' : '添加新贷款类型' }}</h2>
          <button class="modal-close" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group full-width">
                <label for="name">名称 <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  required
                  :class="{ 'error': errors.name }"
                />
                <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <label for="description">描述</label>
                <textarea 
                  id="description" 
                  v-model="formData.description" 
                  rows="3"
                  :class="{ 'error': errors.description }"
                ></textarea>
                <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
              </div>
            </div>

            <div class="form-section">
              <h3>利率设置</h3>
              <div class="form-row">
                <div class="form-group">
                  <label for="min_interest_rate">最低利率 (%) <span class="required">*</span></label>
                  <input 
                    type="number" 
                    id="min_interest_rate" 
                    v-model="formData.min_interest_rate" 
                    step="0.01" 
                    min="0"
                    required
                    :class="{ 'error': errors.min_interest_rate }"
                  />
                  <div v-if="errors.min_interest_rate" class="error-message">{{ errors.min_interest_rate }}</div>
                </div>
                
                <div class="form-group">
                  <label for="max_interest_rate">最高利率 (%) <span class="required">*</span></label>
                  <input 
                    type="number" 
                    id="max_interest_rate" 
                    v-model="formData.max_interest_rate" 
                    step="0.01" 
                    min="0"
                    required
                    :class="{ 'error': errors.max_interest_rate }"
                  />
                  <div v-if="errors.max_interest_rate" class="error-message">{{ errors.max_interest_rate }}</div>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3>期限设置</h3>
              <div class="form-row">
                <div class="form-group">
                  <label for="min_term">最短期限 (月) <span class="required">*</span></label>
                  <input 
                    type="number" 
                    id="min_term" 
                    v-model="formData.min_term" 
                    step="1" 
                    min="1"
                    required
                    :class="{ 'error': errors.min_term }"
                  />
                  <div v-if="errors.min_term" class="error-message">{{ errors.min_term }}</div>
                </div>
                
                <div class="form-group">
                  <label for="max_term">最长期限 (月) <span class="required">*</span></label>
                  <input 
                    type="number" 
                    id="max_term" 
                    v-model="formData.max_term" 
                    step="1" 
                    min="1"
                    required
                    :class="{ 'error': errors.max_term }"
                  />
                  <div v-if="errors.max_term" class="error-message">{{ errors.max_term }}</div>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3>金额设置</h3>
              <div class="form-row">
                <div class="form-group">
                  <label for="minimum_amount">最低金额 (¥) <span class="required">*</span></label>
                  <div class="input-with-prefix">
                    <span class="input-prefix">¥</span>
                    <input 
                      type="number" 
                      id="minimum_amount" 
                      v-model="formData.minimum_amount" 
                      step="0.01" 
                      min="0"
                      required
                      :class="{ 'error': errors.minimum_amount }"
                    />
                  </div>
                  <div v-if="errors.minimum_amount" class="error-message">{{ errors.minimum_amount }}</div>
                </div>
                
                <div class="form-group">
                  <label for="maximum_amount">最高金额 (¥) <span class="required">*</span></label>
                  <div class="input-with-prefix">
                    <span class="input-prefix">¥</span>
                    <input 
                      type="number" 
                      id="maximum_amount" 
                      v-model="formData.maximum_amount" 
                      step="0.01" 
                      min="0"
                      required
                      :class="{ 'error': errors.maximum_amount }"
                    />
                  </div>
                  <div v-if="errors.maximum_amount" class="error-message">{{ errors.maximum_amount }}</div>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.is_active" />
                  <span class="checkbox-text">启用此贷款类型</span>
                </label>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-cancel" @click="closeModal">取消</button>
              <button type="submit" class="btn-submit">{{ isEditing ? '保存更改' : '添加' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" v-if="showDeleteModal">
      <div class="modal-content delete-modal">
        <div class="modal-header">
          <h2>确认删除</h2>
          <button class="modal-close" @click="cancelDelete">&times;</button>
        </div>
        <div class="modal-body">
          <p>您确定要删除贷款类型 <strong>"{{ loanTypeToDelete?.name }}"</strong> 吗？</p>
          <p class="warning-text">此操作无法撤销，并可能影响使用此贷款类型的客户。</p>
          
          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="cancelDelete">取消</button>
            <button type="button" class="btn-delete-confirm" @click="deleteLoanType">确认删除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Toggle Confirmation Modal -->
    <div class="modal" v-if="showStatusModal">
      <div class="modal-content status-modal">
        <div class="modal-header">
          <h2>确认{{ loanTypeToToggle?.is_active ? '禁用' : '启用' }}</h2>
          <button class="modal-close" @click="cancelStatusToggle">&times;</button>
        </div>
        <div class="modal-body">
          <p>您确定要{{ loanTypeToToggle?.is_active ? '禁用' : '启用' }}贷款类型 <strong>"{{ loanTypeToToggle?.name }}"</strong> 吗？</p>
          <p v-if="loanTypeToToggle?.is_active" class="warning-text">禁用后，客户将无法申请此类型的贷款。</p>
          
          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="cancelStatusToggle">取消</button>
            <button 
              type="button" 
              :class="loanTypeToToggle?.is_active ? 'btn-deactivate-confirm' : 'btn-activate-confirm'"
              @click="confirmStatusToggle"
            >
              确认{{ loanTypeToToggle?.is_active ? '禁用' : '启用' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div class="modal-overlay" v-if="showModal || showDeleteModal || showStatusModal" @click="closeAllModals"></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

// Sample data - in a real application, this would come from an API
const loanTypes = ref([
  {
    loan_type_id: 1,
    name: '个人消费贷款',
    description: '用于个人消费用途的短期贷款，如装修、旅游、教育等。',
    min_interest_rate: 4.35,
    max_interest_rate: 7.50,
    min_term: 6,
    max_term: 36,
    minimum_amount: 10000.00,
    maximum_amount: 300000.00,
    is_active: true,
    created_at: '2023-01-15T08:30:00',
    updated_at: '2023-01-15T08:30:00'
  },
  {
    loan_type_id: 2,
    name: '住房按揭贷款',
    description: '用于购买住房的长期贷款，提供较低利率和较长还款期。',
    min_interest_rate: 3.25,
    max_interest_rate: 5.10,
    min_term: 60,
    max_term: 360,
    minimum_amount: 100000.00,
    maximum_amount: 5000000.00,
    is_active: true,
    created_at: '2023-01-15T09:15:00',
    updated_at: '2023-02-20T14:45:00'
  },
  {
    loan_type_id: 3,
    name: '汽车贷款',
    description: '用于购买新车或二手车的贷款，车辆作为抵押物。',
    min_interest_rate: 4.50,
    max_interest_rate: 8.00,
    min_term: 12,
    max_term: 60,
    minimum_amount: 50000.00,
    maximum_amount: 500000.00,
    is_active: true,
    created_at: '2023-01-20T10:45:00',
    updated_at: '2023-01-20T10:45:00'
  },
  {
    loan_type_id: 4,
    name: '小微企业贷款',
    description: '为小微企业提供的经营周转贷款，支持企业发展。',
    min_interest_rate: 5.00,
    max_interest_rate: 9.50,
    min_term: 3,
    max_term: 36,
    minimum_amount: 50000.00,
    maximum_amount: 2000000.00,
    is_active: false,
    created_at: '2023-01-25T11:30:00',
    updated_at: '2023-03-10T16:20:00'
  },
  {
    loan_type_id: 5,
    name: '创业贷款',
    description: '为创业者提供的创业启动资金贷款，支持创新创业。',
    min_interest_rate: 4.75,
    max_interest_rate: 8.50,
    min_term: 12,
    max_term: 60,
    minimum_amount: 100000.00,
    maximum_amount: 1000000.00,
    is_active: true,
    created_at: '2023-02-05T13:15:00',
    updated_at: '2023-02-05T13:15:00'
  },
  {
    loan_type_id: 6,
    name: '农村小额贷款',
    description: '为农村地区居民提供的小额贷款，支持农业生产和农村发展。',
    min_interest_rate: 3.85,
    max_interest_rate: 6.50,
    min_term: 6,
    max_term: 24,
    minimum_amount: 5000.00,
    maximum_amount: 100000.00,
    is_active: true,
    created_at: '2023-02-10T14:30:00',
    updated_at: '2023-02-10T14:30:00'
  }
]);

// Pagination
const itemsPerPage = 5;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(filteredLoanTypes.value.length / itemsPerPage));

// Search and filtering
const searchQuery = ref('');
const filteredLoanTypes = computed(() => {
  if (!searchQuery.value) {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return loanTypes.value.slice(startIndex, startIndex + itemsPerPage);
  }
  
  const filtered = loanTypes.value.filter(type => 
    type.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filtered.slice(startIndex, startIndex + itemsPerPage);
});

const filterLoanTypes = () => {
  currentPage.value = 1; // Reset to first page when filtering
};

const changePage = (page) => {
  currentPage.value = page;
};

// Modal state
const showModal = ref(false);
const showDeleteModal = ref(false);
const showStatusModal = ref(false);
const isEditing = ref(false);
const loanTypeToDelete = ref(null);
const loanTypeToToggle = ref(null);

// Form data
const formData = reactive({
  name: '',
  description: '',
  min_interest_rate: 0.00,
  max_interest_rate: 0.00,
  min_term: 1,
  max_term: 12,
  minimum_amount: 0.00,
  maximum_amount: 0.00,
  is_active: true
});

// Validation errors
const errors = reactive({});

// Open modal for adding new loan type
const openAddModal = () => {
  isEditing.value = false;
  formData.name = '';
  formData.description = '';
  formData.min_interest_rate = 0.00;
  formData.max_interest_rate = 0.00;
  formData.min_term = 1;
  formData.max_term = 12;
  formData.minimum_amount = 0.00;
  formData.maximum_amount = 0.00;
  formData.is_active = true;
  errors.value = {};
  showModal.value = true;
};

// Open modal for editing existing loan type
const openEditModal = (loanType) => {
  isEditing.value = true;
  formData.name = loanType.name;
  formData.description = loanType.description;
  formData.min_interest_rate = loanType.min_interest_rate;
  formData.max_interest_rate = loanType.max_interest_rate;
  formData.min_term = loanType.min_term;
  formData.max_term = loanType.max_term;
  formData.minimum_amount = loanType.minimum_amount;
  formData.maximum_amount = loanType.maximum_amount;
  formData.is_active = loanType.is_active;
  formData.loan_type_id = loanType.loan_type_id;
  errors.value = {};
  showModal.value = true;
};

// Close modal
const closeModal = () => {
  showModal.value = false;
};

// Open delete confirmation modal
const confirmDelete = (loanType) => {
  loanTypeToDelete.value = loanType;
  showDeleteModal.value = true;
};

// Cancel delete
const cancelDelete = () => {
  loanTypeToDelete.value = null;
  showDeleteModal.value = false;
};

// Toggle loan type status
const toggleStatus = (loanType) => {
  loanTypeToToggle.value = loanType;
  showStatusModal.value = true;
};

// Cancel status toggle
const cancelStatusToggle = () => {
  loanTypeToToggle.value = null;
  showStatusModal.value = false;
};

// Confirm status toggle
const confirmStatusToggle = () => {
  if (loanTypeToToggle.value) {
    const index = loanTypes.value.findIndex(type => type.loan_type_id === loanTypeToToggle.value.loan_type_id);
    if (index !== -1) {
      loanTypes.value[index] = {
        ...loanTypes.value[index],
        is_active: !loanTypes.value[index].is_active,
        updated_at: new Date().toISOString()
      };
    }
  }
  
  cancelStatusToggle();
};

// Close all modals
const closeAllModals = () => {
  showModal.value = false;
  showDeleteModal.value = false;
  showStatusModal.value = false;
  loanTypeToDelete.value = null;
  loanTypeToToggle.value = null;
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

// Validate form
const validateForm = () => {
  errors.value = {};
  let isValid = true;
  
  if (!formData.name) {
    errors.name = '名称是必填项';
    isValid = false;
  } else if (formData.name.length > 50) {
    errors.name = '名称不能超过50个字符';
    isValid = false;
  }
  
  if (formData.description && formData.description.length > 255) {
    errors.description = '描述不能超过255个字符';
    isValid = false;
  }
  
  // Validate interest rates
  if (formData.min_interest_rate === null || formData.min_interest_rate === '') {
    errors.min_interest_rate = '最低利率是必填项';
    isValid = false;
  } else if (isNaN(formData.min_interest_rate) || formData.min_interest_rate < 0) {
    errors.min_interest_rate = '最低利率必须是大于或等于0的数字';
    isValid = false;
  }
  
  if (formData.max_interest_rate === null || formData.max_interest_rate === '') {
    errors.max_interest_rate = '最高利率是必填项';
    isValid = false;
  } else if (isNaN(formData.max_interest_rate) || formData.max_interest_rate < 0) {
    errors.max_interest_rate = '最高利率必须是大于或等于0的数字';
    isValid = false;
  }
  
  if (parseFloat(formData.min_interest_rate) > parseFloat(formData.max_interest_rate)) {
    errors.min_interest_rate = '最低利率不能大于最高利率';
    errors.max_interest_rate = '最高利率不能小于最低利率';
    isValid = false;
  }
  
  // Validate terms
  if (formData.min_term === null || formData.min_term === '') {
    errors.min_term = '最短期限是必填项';
    isValid = false;
  } else if (isNaN(formData.min_term) || formData.min_term < 1) {
    errors.min_term = '最短期限必须是大于或等于1的整数';
    isValid = false;
  }
  
  if (formData.max_term === null || formData.max_term === '') {
    errors.max_term = '最长期限是必填项';
    isValid = false;
  } else if (isNaN(formData.max_term) || formData.max_term < 1) {
    errors.max_term = '最长期限必须是大于或等于1的整数';
    isValid = false;
  }
  
  if (parseInt(formData.min_term) > parseInt(formData.max_term)) {
    errors.min_term = '最短期限不能大于最长期限';
    errors.max_term = '最长期限不能小于最短期限';
    isValid = false;
  }
  
  // Validate amounts
  if (formData.minimum_amount === null || formData.minimum_amount === '') {
    errors.minimum_amount = '最低金额是必填项';
    isValid = false;
  } else if (isNaN(formData.minimum_amount) || formData.minimum_amount < 0) {
    errors.minimum_amount = '最低金额必须是大于或等于0的数字';
    isValid = false;
  }
  
  if (formData.maximum_amount === null || formData.maximum_amount === '') {
    errors.maximum_amount = '最高金额是必填项';
    isValid = false;
  } else if (isNaN(formData.maximum_amount) || formData.maximum_amount < 0) {
    errors.maximum_amount = '最高金额必须是大于或等于0的数字';
    isValid = false;
  }
  
  if (parseFloat(formData.minimum_amount) > parseFloat(formData.maximum_amount)) {
    errors.minimum_amount = '最低金额不能大于最高金额';
    errors.maximum_amount = '最高金额不能小于最低金额';
    isValid = false;
  }
  
  // Check for duplicate name when adding or editing
  const duplicateName = loanTypes.value.find(
    type => type.name.toLowerCase() === formData.name.toLowerCase() && 
    (!isEditing.value || type.loan_type_id !== formData.loan_type_id)
  );
  
  if (duplicateName) {
    errors.name = '此贷款类型名称已存在';
    isValid = false;
  }
  
  return isValid;
};

// Submit form
const submitForm = () => {
  if (!validateForm()) {
    return;
  }
  
  if (isEditing.value) {
    // Update existing loan type
    const index = loanTypes.value.findIndex(type => type.loan_type_id === formData.loan_type_id);
    if (index !== -1) {
      loanTypes.value[index] = {
        ...loanTypes.value[index],
        name: formData.name,
        description: formData.description,
        min_interest_rate: parseFloat(formData.min_interest_rate),
        max_interest_rate: parseFloat(formData.max_interest_rate),
        min_term: parseInt(formData.min_term),
        max_term: parseInt(formData.max_term),
        minimum_amount: parseFloat(formData.minimum_amount),
        maximum_amount: parseFloat(formData.maximum_amount),
        is_active: formData.is_active,
        updated_at: new Date().toISOString()
      };
    }
  } else {
    // Add new loan type
    const newId = Math.max(...loanTypes.value.map(type => type.loan_type_id), 0) + 1;
    const now = new Date().toISOString();
    
    loanTypes.value.push({
      loan_type_id: newId,
      name: formData.name,
      description: formData.description,
      min_interest_rate: parseFloat(formData.min_interest_rate),
      max_interest_rate: parseFloat(formData.max_interest_rate),
      min_term: parseInt(formData.min_term),
      max_term: parseInt(formData.max_term),
      minimum_amount: parseFloat(formData.minimum_amount),
      maximum_amount: parseFloat(formData.maximum_amount),
      is_active: formData.is_active,
      created_at: now,
      updated_at: now
    });
  }
  
  closeModal();
};

// Delete loan type
const deleteLoanType = () => {
  if (loanTypeToDelete.value) {
    const index = loanTypes.value.findIndex(type => type.loan_type_id === loanTypeToDelete.value.loan_type_id);
    if (index !== -1) {
      loanTypes.value.splice(index, 1);
    }
  }
  
  cancelDelete();
  
  // Adjust current page if necessary
  if (filteredLoanTypes.value.length === 0 && currentPage.value > 1) {
    currentPage.value--;
  }
};

// Initialize
onMounted(() => {
  // In a real application, this would fetch data from an API
  console.log('Component mounted, loan types loaded');
});
</script>

<style scoped>
.loan-type-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
}

.loan-type-header {
  text-align: center;
  margin-bottom: 2rem;
}

.loan-type-header h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.loan-type-header p {
  font-size: 1.125rem;
  color: #555;
}

/* Management Panel */
.management-panel {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 1.5rem;
}

.panel-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.search-box {
  flex: 1;
  max-width: 400px;
}

.search-box input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.btn-add {
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.btn-add:hover {
  background-color: #1e3a8a;
}

.btn-icon {
  margin-right: 0.5rem;
  font-size: 1.25rem;
  line-height: 1;
}

/* Table Styles */
.loan-types-table-container {
  overflow-x: auto;
}

.loan-types-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.loan-types-table th,
.loan-types-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.loan-types-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #4b5563;
}

.loan-types-table tr:hover {
  background-color: #f9fafb;
}

.description-cell {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions-cell {
  white-space: nowrap;
}

.btn-edit,
.btn-delete,
.btn-toggle {
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
  margin-right: 0.25rem;
}

.btn-edit {
  background-color: #3b82f6;
  color: white;
}

.btn-edit:hover {
  background-color: #2563eb;
}

.btn-delete {
  background-color: #ef4444;
  color: white;
}

.btn-delete:hover {
  background-color: #dc2626;
}

.btn-activate {
  background-color: #10b981;
  color: white;
}

.btn-activate:hover {
  background-color: #059669;
}

.btn-deactivate {
  background-color: #f59e0b;
  color: white;
}

.btn-deactivate:hover {
  background-color: #d97706;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.active {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background-color: #fee2e2;
  color: #991b1b;
}

.no-data {
  text-align: center;
  color: #6b7280;
  padding: 2rem 0;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background-color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  margin: 0 1rem;
  color: #4b5563;
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
  max-width: 600px;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.loan-modal {
  max-width: 700px;
}

.delete-modal,
.status-modal {
  max-width: 450px;
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

/* Form Styles */
.form-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.form-section h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

.form-group.full-width {
  flex-basis: 100%;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input,
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
.form-group textarea:focus {
  border-color: #1e40af;
  outline: none;
  box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.1);
}

.form-group input.error,
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

/* Checkbox Styles */
.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin-right: 0.5rem;
}

.checkbox-text {
  font-size: 0.875rem;
  color: #333;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-cancel,
.btn-submit,
.btn-delete-confirm,
.btn-activate-confirm,
.btn-deactivate-confirm {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancel {
  background-color: white;
  color: #555;
  border: 1px solid #d1d5db;
}

.btn-cancel:hover {
  background-color: #f9fafb;
}

.btn-submit {
  background-color: #1e40af;
  color: white;
  border: none;
}

.btn-submit:hover {
  background-color: #1e3a8a;
}

.btn-delete-confirm {
  background-color: #ef4444;
  color: white;
  border: none;
}

.btn-delete-confirm:hover {
  background-color: #dc2626;
}

.btn-activate-confirm {
  background-color: #10b981;
  color: white;
  border: none;
}

.btn-activate-confirm:hover {
  background-color: #059669;
}

.btn-deactivate-confirm {
  background-color: #f59e0b;
  color: white;
  border: none;
}

.btn-deactivate-confirm:hover {
  background-color: #d97706;
}

.warning-text {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .panel-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .search-box {
    max-width: none;
  }
  
  .loan-types-table th,
  .loan-types-table td {
    padding: 0.5rem;
  }
  
  .description-cell {
    max-width: 150px;
  }
  
  .actions-cell {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .btn-edit,
  .btn-delete,
  .btn-toggle {
    margin-right: 0;
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .form-actions {
    flex-direction: column;
  }
  
  .btn-cancel,
  .btn-submit,
  .btn-delete-confirm,
  .btn-activate-confirm,
  .btn-deactivate-confirm {
    width: 100%;
  }
}
</style>