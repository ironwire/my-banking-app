<template>
  <div class="account-type-container">
    <div class="account-type-header">
      <h1>账户类型管理</h1>
      <p>管理银行提供的各种账户类型及其利率</p>
    </div>

    <div class="management-panel">
      <div class="panel-actions">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索账户类型..." 
            @input="filterAccountTypes"
          />
        </div>
        <button class="btn-add" @click="openAddModal">
          <span class="btn-icon">+</span> 添加新账户类型
        </button>
      </div>

      <!-- Account Types Table -->
      <div class="account-types-table-container">
        <table class="account-types-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>描述</th>
              <th>利率 (%)</th>
              <th>创建日期</th>
              <th>更新日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredAccountTypes.length === 0">
              <td colspan="7" class="no-data">暂无账户类型数据</td>
            </tr>
            <tr v-for="accountType in filteredAccountTypes" :key="accountType.account_type_id">
              <td>{{ accountType.account_type_id }}</td>
              <td>{{ accountType.name }}</td>
              <td class="description-cell">{{ accountType.description }}</td>
              <td>{{ accountType.interest_rate }}%</td>
              <td>{{ formatDate(accountType.created_at) }}</td>
              <td>{{ formatDate(accountType.updated_at) }}</td>
              <td class="actions-cell">
                <button class="btn-edit" @click="openEditModal(accountType)">编辑</button>
                <button class="btn-delete" @click="confirmDelete(accountType)">删除</button>
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
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditing ? '编辑账户类型' : '添加新账户类型' }}</h2>
          <button class="modal-close" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="form-group">
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

            <div class="form-group">
              <label for="description">描述</label>
              <textarea 
                id="description" 
                v-model="formData.description" 
                rows="3"
                :class="{ 'error': errors.description }"
              ></textarea>
              <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
            </div>

            <div class="form-group">
              <label for="interest_rate">利率 (%) <span class="required">*</span></label>
              <input 
                type="number" 
                id="interest_rate" 
                v-model="formData.interest_rate" 
                step="0.01" 
                min="0" 
                max="100"
                required
                :class="{ 'error': errors.interest_rate }"
              />
              <div v-if="errors.interest_rate" class="error-message">{{ errors.interest_rate }}</div>
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
          <p>您确定要删除账户类型 <strong>"{{ accountTypeToDelete?.name }}"</strong> 吗？</p>
          <p class="warning-text">此操作无法撤销，并可能影响使用此账户类型的客户。</p>
          
          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="cancelDelete">取消</button>
            <button type="button" class="btn-delete-confirm" @click="deleteAccountType">确认删除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div class="modal-overlay" v-if="showModal || showDeleteModal" @click="closeAllModals"></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

// Sample data - in a real application, this would come from an API
const accountTypes = ref([
  {
    account_type_id: 1,
    name: '活期账户',
    description: '日常银行业务，无最低余额要求，无月费。',
    interest_rate: 0.35,
    created_at: '2023-01-15T08:30:00',
    updated_at: '2023-01-15T08:30:00'
  },
  {
    account_type_id: 2,
    name: '高收益储蓄账户',
    description: '获得有竞争力的储蓄利率，适合长期存款。',
    interest_rate: 2.75,
    created_at: '2023-01-15T09:15:00',
    updated_at: '2023-02-20T14:45:00'
  },
  {
    account_type_id: 3,
    name: '货币市场账户',
    description: '更高的利率，具有支票开具权限，适合大额存款。',
    interest_rate: 3.25,
    created_at: '2023-01-20T10:45:00',
    updated_at: '2023-01-20T10:45:00'
  },
  {
    account_type_id: 4,
    name: '定期存款',
    description: '固定期限，保证收益，提前取款有罚金。',
    interest_rate: 4.50,
    created_at: '2023-01-25T11:30:00',
    updated_at: '2023-03-10T16:20:00'
  },
  {
    account_type_id: 5,
    name: '青少年账户',
    description: '为18岁以下青少年设计的无费用账户，有基本利率。',
    interest_rate: 0.50,
    created_at: '2023-02-05T13:15:00',
    updated_at: '2023-02-05T13:15:00'
  },
  {
    account_type_id: 6,
    name: '退休金账户',
    description: '为退休人士设计的特殊账户，提供更高利率和额外福利。',
    interest_rate: 3.85,
    created_at: '2023-02-10T14:30:00',
    updated_at: '2023-02-10T14:30:00'
  }
]);

// Pagination
const itemsPerPage = 5;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(filteredAccountTypes.value.length / itemsPerPage));

// Search and filtering
const searchQuery = ref('');
const filteredAccountTypes = computed(() => {
  if (!searchQuery.value) {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return accountTypes.value.slice(startIndex, startIndex + itemsPerPage);
  }
  
  const filtered = accountTypes.value.filter(type => 
    type.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filtered.slice(startIndex, startIndex + itemsPerPage);
});

const filterAccountTypes = () => {
  currentPage.value = 1; // Reset to first page when filtering
};

const changePage = (page) => {
  currentPage.value = page;
};

// Modal state
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const accountTypeToDelete = ref(null);

// Form data
const formData = reactive({
  name: '',
  description: '',
  interest_rate: 0.00
});

// Validation errors
const errors = reactive({});

// Open modal for adding new account type
const openAddModal = () => {
  isEditing.value = false;
  formData.name = '';
  formData.description = '';
  formData.interest_rate = 0.00;
  errors.value = {};
  showModal.value = true;
};

// Open modal for editing existing account type
const openEditModal = (accountType) => {
  isEditing.value = true;
  formData.name = accountType.name;
  formData.description = accountType.description;
  formData.interest_rate = accountType.interest_rate;
  formData.account_type_id = accountType.account_type_id;
  errors.value = {};
  showModal.value = true;
};

// Close modal
const closeModal = () => {
  showModal.value = false;
};

// Open delete confirmation modal
const confirmDelete = (accountType) => {
  accountTypeToDelete.value = accountType;
  showDeleteModal.value = true;
};

// Cancel delete
const cancelDelete = () => {
  accountTypeToDelete.value = null;
  showDeleteModal.value = false;
};

// Close all modals
const closeAllModals = () => {
  showModal.value = false;
  showDeleteModal.value = false;
  accountTypeToDelete.value = null;
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
  
  if (formData.interest_rate === null || formData.interest_rate === '') {
    errors.interest_rate = '利率是必填项';
    isValid = false;
  } else if (isNaN(formData.interest_rate) || formData.interest_rate < 0 || formData.interest_rate > 100) {
    errors.interest_rate = '利率必须是0到100之间的数字';
    isValid = false;
  }
  
  // Check for duplicate name when adding or editing
  const duplicateName = accountTypes.value.find(
    type => type.name.toLowerCase() === formData.name.toLowerCase() && 
    (!isEditing.value || type.account_type_id !== formData.account_type_id)
  );
  
  if (duplicateName) {
    errors.name = '此账户类型名称已存在';
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
    // Update existing account type
    const index = accountTypes.value.findIndex(type => type.account_type_id === formData.account_type_id);
    if (index !== -1) {
      accountTypes.value[index] = {
        ...accountTypes.value[index],
        name: formData.name,
        description: formData.description,
        interest_rate: parseFloat(formData.interest_rate),
        updated_at: new Date().toISOString()
      };
    }
  } else {
    // Add new account type
    const newId = Math.max(...accountTypes.value.map(type => type.account_type_id), 0) + 1;
    const now = new Date().toISOString();
    
    accountTypes.value.push({
      account_type_id: newId,
      name: formData.name,
      description: formData.description,
      interest_rate: parseFloat(formData.interest_rate),
      created_at: now,
      updated_at: now
    });
  }
  
  closeModal();
};

// Delete account type
const deleteAccountType = () => {
  if (accountTypeToDelete.value) {
    const index = accountTypes.value.findIndex(type => type.account_type_id === accountTypeToDelete.value.account_type_id);
    if (index !== -1) {
      accountTypes.value.splice(index, 1);
    }
  }
  
  cancelDelete();
  
  // Adjust current page if necessary
  if (filteredAccountTypes.value.length === 0 && currentPage.value > 1) {
    currentPage.value--;
  }
};

// Initialize
onMounted(() => {
  // In a real application, this would fetch data from an API
  console.log('Component mounted, account types loaded');
});
</script>

<style scoped>
.account-type-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
}

.account-type-header {
  text-align: center;
  margin-bottom: 2rem;
}

.account-type-header h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.account-type-header p {
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
.account-types-table-container {
  overflow-x: auto;
}

.account-types-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.account-types-table th,
.account-types-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.account-types-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #4b5563;
}

.account-types-table tr:hover {
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
.btn-delete {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
}

.btn-edit {
  background-color: #3b82f6;
  color: white;
  margin-right: 0.5rem;
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

.delete-modal {
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
.form-group {
  margin-bottom: 1.5rem;
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-cancel,
.btn-submit,
.btn-delete-confirm {
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
  
  .account-types-table th,
  .account-types-table td {
    padding: 0.5rem;
  }
  
  .description-cell {
    max-width: 150px;
  }
}

@media (max-width: 480px) {
  .form-actions {
    flex-direction: column;
  }
  
  .btn-cancel,
  .btn-submit,
  .btn-delete-confirm {
    width: 100%;
  }
}
</style>