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
                :rowSelection="'multiple'"
                :suppressRowClickSelection="true"
                :checkboxSelection="true"
                :headerCheckboxSelection="true"
                :headerCheckboxSelectionFilteredOnly="true"
                :animateRows="true"
                :enableRangeSelection="true"
                :pagination="true"
                :paginationPageSize="20"
                :enableSorting="true"
                :enableFilter="true"
                :enableColResize="true"
                :getRowId="getRowId"
                @grid-ready="onGridReady"
                @selection-changed="onSelectionChanged"
                @row-clicked="onRowClicked"
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
  import 'ag-grid-community/styles/ag-theme-balham.css' // Change this line
  import { ref, computed, onMounted } from 'vue';
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
  
  // 计算属性
  const isAllSelected = computed(() => {
    return users.value.length > 0 && selectedUsers.value.length === users.value.length;
  });
  
  const activeUsersCount = computed(() => {
    return users.value.filter(user => user.isActive).length;
  });
  
  // AG Grid 方法
  function onGridReady(params) {
    console.log('AG Grid ready');
    console.log('Initial row data:', users.value);
    // Set the grid API
    agGrid.value = params.api;
  }
  
  function onSelectionChanged(event) {
    if (!event.api) return;
    selectedUsers.value = event.api.getSelectedRows();
    console.log('Selection changed:', selectedUsers.value.length);
  }
  
  function onRowClicked(event) {
    if (!event.data) return;
    console.log('Row clicked:', event.data);
  }
  
  function getRowId(params) {
    return params.data.id;
  }
  
  function selectAllRows() {
    if (!agGrid.value) return;
    if (isAllSelected.value) {
      agGrid.value.deselectAll();
    } else {
      agGrid.value.selectAll();
    }
  }
  
  function clearSelection() {
    if (!agGrid.value) return;
    agGrid.value.deselectAll();
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
      if (agGrid.value) {
        agGrid.value.setRowData(response);
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
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('提交用户审核:', selectedUsers.value.map(u => u.id));
      
      submittedCount.value = selectedUsers.value.length;
      
      // 从列表中移除已提交的用户
      const submittedIds = selectedUsers.value.map(u => u.id);
      users.value = users.value.filter(user => !submittedIds.includes(user.id));
      
      // 清空选择
      selectedUsers.value = [];
      
      showSuccessModal.value = true;
      
    } catch (error) {
      console.error('提交用户审核失败:', error);
      alert('提交失败，请重试');
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
    background-color: #f3f4f6;
    color: #374151;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .btn-back:hover {
    background-color: #e5e7eb;
  }
  
  .header-info h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e40af;
    margin: 0 0 0.25rem 0;
  }
  
  .header-info p {
    color: #6b7280;
    margin: 0;
    font-size: 0.875rem;
  }
  
  .btn-load-users {
    background-color: #1e40af;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .btn-load-users:hover:not(:disabled) {
    background-color: #1e3a8a;
  }
  
  .btn-load-users:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
  
  /* Main Content */
  .page-main {
    padding: 2rem 0;
  }
  
  /* Statistics */
  .stats-section {
    margin-bottom: 2rem;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .stat-card {
    background-color: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .stat-icon {
    font-size: 2rem;
  }
  
  .stat-info {
    display: flex;
    flex-direction: column;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e40af;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  /* Grid Section */
  .grid-section {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .grid-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .grid-title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .grid-title h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e40af;
    margin: 0;
  }
  
  .grid-count {
    background-color: #f3f4f6;
    color: #6b7280;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
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
    color: #374151;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .btn-select-all.active {
    background-color: #1e40af;
    color: white;
  }
  
  .btn-select-all:hover,
  .btn-clear:hover:not(:disabled) {
    background-color: #e5e7eb;
  }
  
  .btn-clear:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .btn-submit {
    background-color: #059669;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .btn-submit:hover:not(:disabled) {
    background-color: #047857;
  }
  
  .btn-submit:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
  
  /* AG Grid Container */
  .ag-grid-container {
    padding: 1.5rem;
  }
  
  /* AG Grid Custom Styles */
  :deep(.ag-theme-alpine) {
    --ag-border-color: #e5e7eb;
    --ag-header-background-color: #f9fafb;
    --ag-odd-row-background-color: #ffffff;
    --ag-row-hover-color: #f3f4f6;
    --ag-selected-row-background-color: #eff6ff;
    --ag-range-selection-background-color: rgba(30, 64, 175, 0.1);
    --ag-font-family: inherit;
    --ag-font-size: 14px;
  }
  
  :deep(.user-id-cell) {
    font-weight: 500;
    color: #1e40af;
  }
  
  :deep(.username-cell) {
    font-weight: 500;
    color: #374151;
  }
  
  :deep(.email-cell) {
    color: #6b7280;
  }
  
  :deep(.status-badge) {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  :deep(.status-active) {
    background-color: #dcfce7;
    color: #166534;
  }
  
  :deep(.status-inactive) {
    background-color: #fee2e2;
    color: #991b1b;
  }
  
  /* Empty and Loading States */
  .empty-state,
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    color: #6b7280;
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .empty-state h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #374151;
  }
  
  .btn-reload {
    background-color: #1e40af;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.2s;
  }
  
  .btn-reload:hover {
    background-color: #1e3a8a;
  }
  
  .loading-state p {
    margin-top: 1rem;
    font-size: 1rem;
  }
  
  /* Loading Spinner */
  .loading-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .loading-spinner.large {
    width: 2rem;
    height: 2rem;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
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
    margin: 1.5rem 0;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.375rem;
  }
  
  .preview-header {
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.75rem;
  }
  
  .preview-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .preview-item {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .preview-more {
    font-size: 0.875rem;
    color: #9ca3af;
    font-style: italic;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .btn-cancel,
  .btn-confirm {
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
  
  .btn-confirm {
    background-color: #1e40af;
    color: white;
    border: none;
  }
  
  .btn-confirm:hover {
    background-color: #1e3a8a;
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
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      gap: 1rem;
    }
    
    .header-left {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .grid-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
    
    .grid-actions {
      width: 100%;
      justify-content: space-between;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .ag-grid-container {
      padding: 0.5rem;
    }
    
    :deep(.ag-theme-alpine) {
      --ag-font-size: 12px;
    }
  }
  
  @media (max-width: 480px) {
    .bulk-actions {
      flex-direction: column;
      width: 100%;
    }
    
    .btn-select-all,
    .btn-clear,
    .btn-submit {
      width: 100%;
    }
    
    .form-actions {
      flex-direction: column;
    }
    
    .container {
      max-width: 100%;
      padding: 0 0.5rem;
    }
  }
  </style>