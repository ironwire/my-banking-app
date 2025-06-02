<template>
  <div class="user-approval-page">
    <!-- Header -->
    <header class="page-header">
      <div class="container">
        <div class="header-content">
          <div class="header-left">
            <button @click="navigateBack" class="btn-back">
              ← 返回
            </button>
            <div class="header-info">
              <h1>用户申请审核转客户</h1>
              <p>审核新用户申请并转换为正式客户</p>
            </div>
          </div>
          <div class="header-actions">
            <button 
              @click="loadNewUsers" 
              class="btn-load-users"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="loading-spinner"></span>
              {{ isLoading ? '加载中...' : '加载新用户' }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="page-main">
      <div class="container">
        <!-- Statistics Cards -->
        <div class="stats-section" v-if="users.length > 0">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-info">
                <span class="stat-value">{{ users.length }}</span>
                <span class="stat-label">待审核用户</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-info">
                <span class="stat-value">{{ selectedUsers.length }}</span>
                <span class="stat-label">已选择用户</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📧</div>
              <div class="stat-info">
                <span class="stat-value">{{ activeUsersCount }}</span>
                <span class="stat-label">活跃用户</span>
              </div>
            </div>
          </div>
        </div>

        <!-- AG Grid Section -->
        <div class="grid-section" v-if="users.length > 0">
          <div class="grid-header">
            <div class="grid-title">
              <h2>用户列表</h2>
              <span class="grid-count">共 {{ users.length }} 条记录</span>
            </div>
            <div class="grid-actions">
              <div class="bulk-actions">
                <button 
                  @click="selectAllRows" 
                  class="btn-select-all"
                  :class="{ 'active': isAllSelected }"
                >
                  {{ isAllSelected ? '取消全选' : '全选' }}
                </button>
                <button 
                  @click="clearSelection" 
                  class="btn-clear"
                  :disabled="!selectedUsers.length"
                >
                  清空选择
                </button>
              </div>
              <button 
                @click="submitSelectedUsers" 
                class="btn-submit"
                :disabled="!selectedUsers.length || isSubmitting"
              >
                <span v-if="isSubmitting" class="loading-spinner"></span>
                {{ isSubmitting ? '提交中...' : `提交所选用户 (${selectedUsers.length})` }}
              </button>
            </div>
          </div>

          <!-- AG Grid -->
          <div class="ag-grid-container">
            <ag-grid-vue
              ref="agGrid"
              class="ag-theme-balham"
              style="height: 500px; width: 100%;"
              :columnDefs="columnDefs"
              :rowData="users"
              :defaultColDef="defaultColDef"
              rowSelection="multiple"
              :suppressRowClickSelection="true"
              :animateRows="true"
              :pagination="true"
              :paginationPageSize="20"
              :getRowId="getRowId"
              @grid-ready="onGridReady"
              @selection-changed="onSelectionChanged"
            />
          </div>
        </div>

        <!-- Empty State -->
        <div class="empty-state" v-else-if="!isLoading && hasLoadedOnce">
          <div class="empty-icon">📝</div>
          <h3>暂无待审核用户</h3>
          <p>当前没有需要审核的用户申请</p>
          <button @click="loadNewUsers" class="btn-reload">
            重新加载
          </button>
        </div>

        <!-- Loading State -->
        <div class="loading-state" v-else-if="isLoading">
          <div class="loading-spinner large"></div>
          <p>正在加载用户数据...</p>
        </div>
      </div>
    </main>

    <!-- Confirmation Modal -->
    <div class="modal" v-if="showConfirmModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>确认提交</h2>
          <button class="modal-close" @click="showConfirmModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <p>您确定要将以下 <strong>{{ selectedUsers.length }}</strong> 个用户转换为正式客户吗？</p>
          
          <div class="selected-users-preview">
            <div class="preview-header">选中的用户：</div>
            <div class="preview-list">
              <div 
                v-for="user in selectedUsers.slice(0, 5)" 
                :key="user.id"
                class="preview-item"
              >
                {{ user.username }} ({{ user.email }})
              </div>
              <div v-if="selectedUsers.length > 5" class="preview-more">
                还有 {{ selectedUsers.length - 5 }} 个用户...
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="showConfirmModal = false">
              取消
            </button>
            <button type="button" class="btn-confirm" @click="confirmSubmit">
              确认转换
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div class="modal" v-if="showSuccessModal">
      <div class="modal-content success-modal">
        <div class="modal-header">
          <h2>转换成功</h2>
          <button class="modal-close" @click="showSuccessModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="success-icon">✓</div>
          <p>已成功将 <strong>{{ submittedCount }}</strong> 个用户转换为正式客户！</p>
          
          <div class="form-actions">
            <button type="button" class="btn-confirm" @click="closeSuccessModal">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Overlay -->
    <div 
      class="modal-overlay" 
      v-if="showConfirmModal || showSuccessModal" 
      @click="closeAllModals"
    ></div>
  </div>
</template>

<script setup>
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ AllCommunityModule ]);
import 'ag-grid-community/styles/ag-theme-balham.css'
import { ref, computed, onMounted, watch } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import authService from '../../services/authService';

// 响应式数据
const users = ref([]);
const selectedUsers = ref([]);
const isLoading = ref(false);
const isSubmitting = ref(false);
const hasLoadedOnce = ref(false);
const showConfirmModal = ref(false);
const showSuccessModal = ref(false);
const submittedCount = ref(0);
const error = ref(null);
const agGrid = ref(null);
const gridApi = ref(null);

// AG Grid 配置
const columnDefs = ref([
  {
    headerName: '',
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
    pinned: 'left',
    lockPosition: true,
    suppressMenu: true,
    suppressSorting: true,
    suppressFilter: true
  },
  {
    headerName: 'ID',
    field: 'userId',
    width: 80,
    pinned: 'left',
    cellClass: 'user-id-cell',
    suppressSizeToFit: true
  },
  {
    headerName: '用户名',
    field: 'username',
    width: 150,
    cellClass: 'username-cell',
    filter: 'agTextColumnFilter'
  },
  {
    headerName: '姓氏',
    field: 'lastName',
    width: 120,
    filter: 'agTextColumnFilter'
  },
  {
    headerName: '名字',
    field: 'firstName',
    width: 120,
    filter: 'agTextColumnFilter'
  },
  {
    headerName: '邮箱',
    field: 'email',
    width: 200,
    cellClass: 'email-cell',
    filter: 'agTextColumnFilter'
  },
  {
    headerName: '电话',
    field: 'phoneNumber',
    width: 140,
    valueFormatter: (params) => params.value || '-',
    filter: 'agTextColumnFilter'
  }
]);

const defaultColDef = ref({
  sortable: true,
  filter: true,
  resizable: true,
  minWidth: 100,
  flex: 1
});

// Add this watch to debug selectedUsers changes
watch(selectedUsers, (newVal, oldVal) => {
  console.log('selectedUsers changed:');
  console.log('Old value:', oldVal);
  console.log('New value:', newVal);
}, { deep: true });

// Add this to debug when users data changes
watch(() => users.value, (newUsers) => {
  console.log('Users data changed:', newUsers);
  
  // If grid is ready, update the row data
  if (gridApi.value) {
    console.log('Updating grid data');
    // Use the correct method to update row data
    gridApi.value.setRowData?.(newUsers) || console.log('setRowData not available, will update on next render');
  }
}, { deep: true });

// 计算属性
const isAllSelected = computed(() => {
  return users.value.length > 0 && selectedUsers.value.length === users.value.length;
});

const activeUsersCount = computed(() => {
  return users.value.filter(user => user.isActive).length;
});

// Function to get unique row ID
function getRowId(params) {
  return params.data.id || params.data.userId;
}

// AG Grid 方法
function onGridReady(params) {
  console.log('AG Grid ready');
  gridApi.value = params.api;
  
  // Log grid API to verify it's available
  console.log('Grid API initialized:', !!gridApi.value);
  console.log('Grid API methods:', Object.keys(gridApi.value || {}));
  
  // Force refresh to ensure proper rendering
  setTimeout(() => {
    if (gridApi.value) {
      console.log('Refreshing grid cells');
      // Use a safer approach to refresh the grid
      if (typeof gridApi.value.refreshCells === 'function') {
        gridApi.value.refreshCells();
      }
    }
  }, 100);
}

// Add this function to debug selection issues
function debugGridSelection() {
  if (!gridApi.value) {
    console.log('Grid API not available');
    return;
  }
  
  const selectedNodes = gridApi.value.getSelectedNodes();
  const selectedData = gridApi.value.getSelectedRows();
  
  console.group('AG Grid Selection Debug');
  console.log('Selected Nodes:', selectedNodes);
  console.log('Selected Data:', selectedData);
  console.log('Current selectedUsers value:', selectedUsers.value);
  console.groupEnd();
}

function onSelectionChanged(event) {
  console.log('Selection changed event triggered');
  if (!event.api) return;
  
  // Get selected rows directly from the grid API
  const selectedRows = event.api.getSelectedRows();
  console.log('Selected rows from grid:', selectedRows);
  
  // Create a completely new array to ensure reactivity
  selectedUsers.value = [...selectedRows];
  
  console.log('Updated selectedUsers:', selectedUsers.value);
  
  // Debug selection state
  debugGridSelection();
}

function onRowClicked(event) {
  if (!event.data) return;
  console.log('Row clicked:', event.data);
}

function selectAllRows() {
  if (!gridApi.value) return;
  
  if (isAllSelected.value) {
    console.log('Deselecting all rows');
    gridApi.value.deselectAll();
  } else {
    console.log('Selecting all rows');
    gridApi.value.selectAll();
  }
}

function clearSelection() {
  if (!gridApi.value) return;
  console.log('Clearing selection');
  gridApi.value.deselectAll();
}

// 其他方法
async function loadNewUsers() {
  isLoading.value = true;
  error.value = null;
  
  try {
    console.log('Fetching unassigned users...');
    const response = await authService.getUnassignedUsers();
    console.log('Received response:', response);
    
    // Ensure the response is an array
    if (!Array.isArray(response)) {
      console.error('Expected array response but got:', typeof response);
      throw new Error('Invalid response format');
    }

    // Log the first item to check structure
    if (response.length > 0) {
      console.log('Sample user data:', response[0]);
    }
    
    users.value = response;
    hasLoadedOnce.value = true;
    
    // 清空之前的选择
    selectedUsers.value = [];
    
    // Update grid data if grid is ready
    if (gridApi.value) {
      gridApi.value.setRowData(response);
    }
    
    console.log('Updated users array:', users.value);
  } catch (err) {
    error.value = err.message || 'Failed to load unassigned users';
    console.error('Error loading unassigned users:', err);
  } finally {
    isLoading.value = false;
  }
}

function submitSelectedUsers() {
  if (selectedUsers.value.length === 0) {
    return;
  }
  
  showConfirmModal.value = true;
}

async function confirmSubmit() {
  isSubmitting.value = true;
  showConfirmModal.value = false;
  
  try {
    // Debug the selected users to see their structure
    console.log('Selected users:', selectedUsers.value);
    
    // Extract IDs, ensuring they're not null
    const selectedUserIds = selectedUsers.value
      .map(user => {
        // Check different possible ID fields
        const userId = user.id || user.userId || user._id;
        console.log(`User ${user.username || user.email || 'unknown'} has ID:`, userId);
        return userId;
      })
      .filter(id => id != null); // Filter out any null/undefined IDs
    
    console.log('Extracted user IDs:', selectedUserIds);
    
    // Verify we have IDs to submit
    if (selectedUserIds.length === 0) {
      throw new Error('No valid user IDs found in selection');
    }
    
    // Create the request object in the format expected by the backend
    const requestData = {
      userIds: selectedUserIds
    };
    
    console.log('Converting users to customers - request data:', requestData);
    
    // Make API call to convert users to customers
    const response = await fetch('http://localhost:8085/api/bankdesk/users/convert-to-customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    submittedCount.value = selectedUsers.value.length;
    
    // From the list, remove users that were successfully converted
    const submittedIds = new Set(selectedUserIds);
    const filteredUsers = users.value.filter(user => {
      const userId = user.id || user.userId || user._id;
      return !submittedIds.has(userId);
    });
    
    // Update users array
    users.value = filteredUsers;
    
    // Clear selection
    selectedUsers.value = [];
    
    showSuccessModal.value = true;
    
  } catch (error) {
    console.error('Failed to convert users to customers:', error);
    alert('提交失败，请重试: ' + error.message);
  } finally {
    isSubmitting.value = false;
  }
}

function closeSuccessModal() {
  showSuccessModal.value = false;
}

function closeAllModals() {
  showConfirmModal.value = false;
  showSuccessModal.value = false;
}

function navigateBack() {
  console.log('返回管理员首页');
  // 在实际应用中使用 router.push('/admin')
}

function formatDateTime(dateString) {
  if (!dateString) return '-';
  
  try {
    const date = new Date(dateString);
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
    console.error('Error formatting date:', error);
    return '-';
  }
}

// 组件挂载时的初始化
onMounted(() => {
  console.log('用户申请审核页面已加载');
  loadNewUsers();
});
</script>

<style scoped>
/* Import AG Grid theme */
@import 'ag-grid-community/styles/ag-grid.css';
@import 'ag-grid-community/styles/ag-theme-alpine.css';

.user-approval-page {
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header */
.page-header {
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

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-back {
  background-color: transparent;
  border: none;
  color: #4b5563;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.btn-back:hover {
  color: #1e40af;
}

.header-info h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e3a8a;
  margin: 0 0 0.25rem;
}

.header-info p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.btn-load-users {
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.btn-load-users:hover {
  background-color: #1e3a8a;
}

.btn-load-users:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

/* Main Content */
.page-main {
  padding: 2rem 0;
}

/* Stats Section */
.stats-section {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.stat-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 1.75rem;
  background-color: #e0e7ff;
  color: #4f46e5;
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e3a8a;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Grid Section */
.grid-section {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
}

.grid-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.grid-title {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.grid-title h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e3a8a;
  margin: 0;
}

.grid-count {
  font-size: 0.875rem;
  color: #6b7280;
}

.grid-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bulk-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-select-all,
.btn-clear {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-select-all:hover,
.btn-clear:hover {
  background-color: #e5e7eb;
}

.btn-select-all.active {
  background-color: #dbeafe;
  border-color: #93c5fd;
  color: #1e40af;
}

.btn-clear:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-submit {
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #1e3a8a;
}

.btn-submit:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

/* AG Grid Container */
.ag-grid-container {
  height: 500px;
  width: 100%;
}

/* Empty State */
.empty-state {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 3rem 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e3a8a;
  margin: 0 0 0.5rem;
}

.empty-state p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1.5rem;
}

.btn-reload {
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-reload:hover {
  background-color: #1e3a8a;
}

/* Loading State */
.loading-state {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 3rem 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

.loading-spinner.large {
  width: 3rem;
  height: 3rem;
  border-width: 3px;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* Modal */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
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

.selected-users-preview {
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  padding: 1rem;
  margin: 1rem 0;
}

.preview-header {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #4b5563;
}

.preview-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-item {
  font-size: 0.875rem;
  color: #1f2937;
}

.preview-more {
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-cancel {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background-color: #e5e7eb;
}

.btn-confirm {
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-confirm:hover {
  background-color: #1e3a8a;
}

.success-icon {
  background-color: #10b981;
  color: white;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-content,
  .grid-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions,
  .grid-actions {
    margin-top: 1rem;
    width: 100%;
  }
  
  .grid-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .bulk-actions {
    width: 100%;
  }
  
  .btn-select-all,
  .btn-clear {
    flex: 1;
  }
  
  .btn-submit {
    width: 100%;
  }
}
</style>






