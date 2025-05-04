<template>
    <div class="pay-bills-container">
      <div class="header">
        <h1>Pay Bills</h1>
        <p>Manage and pay your bills from one place</p>
      </div>
  
      <div class="tabs">
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'upcoming' }" 
          @click="activeTab = 'upcoming'"
        >
          Upcoming Bills
        </button>
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'payee' }" 
          @click="activeTab = 'payee'"
        >
          Pay a Payee
        </button>
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'history' }" 
          @click="activeTab = 'history'"
        >
          Payment History
        </button>
      </div>
  
      <!-- Upcoming Bills Tab -->
      <div v-if="activeTab === 'upcoming'" class="tab-content">
        <div v-if="upcomingBills.length > 0" class="bills-list">
          <div v-for="bill in upcomingBills" :key="bill.id" class="bill-item">
            <div class="bill-info">
              <div class="bill-payee">
                <div class="payee-icon" :style="{ backgroundColor: bill.color }">
                  {{ bill.payee.charAt(0) }}
                </div>
                <div class="payee-details">
                  <h3>{{ bill.payee }}</h3>
                  <p>Due {{ formatDate(bill.dueDate) }}</p>
                </div>
              </div>
              <div class="bill-amount">${{ bill.amount.toFixed(2) }}</div>
            </div>
            <div class="bill-actions">
              <button 
                class="btn btn-outline" 
                @click="scheduleBill(bill)"
              >
                Schedule
              </button>
              <button 
                class="btn btn-primary" 
                @click="payNow(bill)"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <div class="empty-icon">📅</div>
          <h3>No Upcoming Bills</h3>
          <p>You don't have any bills due in the next 30 days.</p>
          <button class="btn btn-primary" @click="activeTab = 'payee'">Pay a Bill</button>
        </div>
      </div>
  
      <!-- Pay a Payee Tab -->
      <div v-if="activeTab === 'payee'" class="tab-content">
        <form @submit.prevent="handlePayeeSubmit" class="pay-form">
          <div class="form-section">
            <div class="form-group">
              <label for="payee">Select Payee</label>
              <select id="payee" v-model="payeeForm.payeeId" required class="form-control">
                <option value="" disabled>Select a payee</option>
                <option v-for="payee in savedPayees" :key="payee.id" :value="payee.id">
                  {{ payee.name }}
                </option>
                <option value="new">+ Add New Payee</option>
              </select>
            </div>
  
            <div v-if="payeeForm.payeeId === 'new'" class="new-payee-form">
              <div class="form-group">
                <label for="newPayeeName">Payee Name</label>
                <input 
                  id="newPayeeName" 
                  v-model="payeeForm.newPayeeName" 
                  type="text" 
                  required 
                  class="form-control"
                  placeholder="Enter payee name"
                />
              </div>
              <div class="form-group">
                <label for="accountNumber">Account Number</label>
                <input 
                  id="accountNumber" 
                  v-model="payeeForm.accountNumber" 
                  type="text" 
                  required 
                  class="form-control"
                  placeholder="Enter account number"
                />
              </div>
              <div class="form-group">
                <label for="payeeAddress">Payee Address</label>
                <textarea 
                  id="payeeAddress" 
                  v-model="payeeForm.address" 
                  class="form-control"
                  rows="3"
                  placeholder="Enter payee address"
                ></textarea>
              </div>
            </div>
  
            <div class="form-group">
              <label for="fromAccount">Pay From</label>
              <select id="fromAccount" v-model="payeeForm.fromAccount" required class="form-control">
                <option value="" disabled>Select an account</option>
                <option v-for="account in accounts" :key="account.id" :value="account.id">
                  {{ account.name }} - ${{ account.balance.toFixed(2) }}
                </option>
              </select>
            </div>
  
            <div class="form-group">
              <label for="paymentAmount">Amount</label>
              <div class="amount-input">
                <span class="currency-symbol">$</span>
                <input 
                  id="paymentAmount" 
                  v-model="payeeForm.amount" 
                  type="number" 
                  min="0.01" 
                  step="0.01" 
                  required 
                  class="form-control"
                  placeholder="0.00"
                />
              </div>
            </div>
  
            <div class="form-group">
              <label for="paymentDate">Payment Date</label>
              <input 
                id="paymentDate" 
                v-model="payeeForm.paymentDate" 
                type="date" 
                required 
                class="form-control"
                :min="today"
              />
            </div>
  
            <div class="form-group">
              <label for="memo">Memo (Optional)</label>
              <input 
                id="memo" 
                v-model="payeeForm.memo" 
                type="text" 
                class="form-control"
                placeholder="Add a note"
              />
            </div>
  
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="payeeForm.recurring" />
                <span>Make this a recurring payment</span>
              </label>
            </div>
  
            <div v-if="payeeForm.recurring" class="recurring-options">
              <div class="form-group">
                <label for="frequency">Frequency</label>
                <select id="frequency" v-model="payeeForm.frequency" required class="form-control">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
              <div class="form-group">
                <label for="endDate">End Date (Optional)</label>
                <input 
                  id="endDate" 
                  v-model="payeeForm.endDate" 
                  type="date" 
                  class="form-control"
                  :min="payeeForm.paymentDate"
                />
              </div>
            </div>
          </div>
  
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="resetPayeeForm">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Processing...' : 'Schedule Payment' }}
            </button>
          </div>
        </form>
      </div>
  
      <!-- Payment History Tab -->
      <div v-if="activeTab === 'history'" class="tab-content">
        <div class="history-filters">
          <div class="form-group">
            <label for="dateRange">Date Range</label>
            <select id="dateRange" v-model="historyFilters.dateRange" class="form-control">
              <option value="30">Last 30 days</option>
              <option value="60">Last 60 days</option>
              <option value="90">Last 90 days</option>
              <option value="custom">Custom range</option>
            </select>
          </div>
          <div v-if="historyFilters.dateRange === 'custom'" class="date-range-inputs">
            <div class="form-group">
              <label for="startDate">Start Date</label>
              <input 
                id="startDate" 
                v-model="historyFilters.startDate" 
                type="date" 
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="endDate">End Date</label>
              <input 
                id="endDate" 
                v-model="historyFilters.endDate" 
                type="date" 
                class="form-control"
                :max="today"
              />
            </div>
          </div>
        </div>
  
        <div class="history-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Payee</th>
                <th>Account</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in paymentHistory" :key="payment.id">
                <td>{{ formatDate(payment.date) }}</td>
                <td>{{ payment.payee }}</td>
                <td>{{ getAccountName(payment.accountId) }}</td>
                <td>${{ payment.amount.toFixed(2) }}</td>
                <td>
                  <span class="status-badge" :class="payment.status.toLowerCase()">
                    {{ payment.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Payment Confirmation Modal -->
      <div v-if="showConfirmation" class="confirmation-modal">
        <div class="confirmation-content">
          <h2>Confirm Payment</h2>
          <p>Please review the details of your payment:</p>
          
          <div class="confirmation-details">
            <div class="detail-row">
              <span class="detail-label">To:</span>
              <span class="detail-value">{{ selectedBill ? selectedBill.payee : getPayeeName(payeeForm.payeeId) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">From:</span>
              <span class="detail-value">{{ getAccountName(payeeForm.fromAccount) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount:</span>
              <span class="detail-value">${{ parseFloat(selectedBill ? selectedBill.amount : payeeForm.amount).toFixed(2) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">{{ formatDate(payeeForm.paymentDate) }}</span>
            </div>
            <div v-if="payeeForm.recurring" class="detail-row">
              <span class="detail-label">Recurring:</span>
              <span class="detail-value">{{ payeeForm.frequency }}</span>
            </div>
          </div>
          
          <div class="confirmation-actions">
            <button class="btn btn-secondary" @click="showConfirmation = false">Edit</button>
            <button class="btn btn-primary" @click="confirmPayment">Confirm Payment</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Sample account data
  const accounts = [
    { id: 1, name: 'Checking Account', balance: 5240.00 },
    { id: 2, name: 'Savings Account', balance: 12580.00 }
  ];
  
  // Sample payee data
  const savedPayees = [
    { id: 1, name: 'Electric Company' },
    { id: 2, name: 'Water Utility' },
    { id: 3, name: 'Internet Provider' },
    { id: 4, name: 'Credit Card Company' }
  ];
  
  // Sample upcoming bills
  const upcomingBills = [
    { 
      id: 1, 
      payee: 'Electric Company', 
      amount: 125.45, 
      dueDate: '2025-05-15', 
      color: '#4f46e5' 
    },
    { 
      id: 2, 
      payee: 'Water Utility', 
      amount: 78.32, 
      dueDate: '2025-05-20', 
      color: '#0ea5e9' 
    },
    { 
      id: 3, 
      payee: 'Internet Provider', 
      amount: 89.99, 
      dueDate: '2025-05-22', 
      color: '#10b981' 
    }
  ];
  
  // Sample payment history
  const paymentHistory = [
    { 
      id: 1, 
      date: '2025-04-15', 
      payee: 'Electric Company', 
      accountId: 1, 
      amount: 118.72, 
      status: 'Completed' 
    },
    { 
      id: 2, 
      date: '2025-04-10', 
      payee: 'Water Utility', 
      accountId: 1, 
      amount: 76.50, 
      status: 'Completed' 
    },
    { 
      id: 3, 
      date: '2025-04-05', 
      payee: 'Credit Card Company', 
      accountId: 1, 
      amount: 350.00, 
      status: 'Completed' 
    },
    { 
      id: 4, 
      date: '2025-05-22', 
      payee: 'Internet Provider', 
      accountId: 1, 
      amount: 89.99, 
      status: 'Scheduled' 
    }
  ];
  
  const activeTab = ref('upcoming');
  const isSubmitting = ref(false);
  const showConfirmation = ref(false);
  const selectedBill = ref(null);
  const today = new Date().toISOString().split('T')[0];
  
  const payeeForm = ref({
    payeeId: '',
    newPayeeName: '',
    accountNumber: '',
    address: '',
    fromAccount: '',
    amount: '',
    paymentDate: today,
    memo: '',
    recurring: false,
    frequency: 'monthly',
    endDate: ''
  });
  
  const historyFilters = ref({
    dateRange: '30',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: today
  });
  
  const getAccountName = (accountId) => {
    const account = accounts.find(a => a.id === accountId);
    return account ? account.name : '';
  };
  
  const getPayeeName = (payeeId) => {
    if (payeeId === 'new') return payeeForm.value.newPayeeName;
    const payee = savedPayees.find(p => p.id === payeeId);
    return payee ? payee.name : '';
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const payNow = (bill) => {
    selectedBill.value = bill;
    payeeForm.value.payeeId = savedPayees.find(p => p.name === bill.payee)?.id || '';
    payeeForm.value.fromAccount = accounts[0].id;
    payeeForm.value.amount = bill.amount;
    payeeForm.value.paymentDate = today;
    showConfirmation.value = true;
  };
  
  const scheduleBill = (bill) => {
    selectedBill.value = bill;
    payeeForm.value.payeeId = savedPayees.find(p => p.name === bill.payee)?.id || '';
    payeeForm.value.fromAccount = accounts[0].id;
    payeeForm.value.amount = bill.amount;
    payeeForm.value.paymentDate = bill.dueDate;
    showConfirmation.value = true;
  };
  
  const handlePayeeSubmit = () => {
    showConfirmation.value = true;
  };
  
  const resetPayeeForm = () => {
    payeeForm.value = {
      payeeId: '',
      newPayeeName: '',
      accountNumber: '',
      address: '',
      fromAccount: '',
      amount: '',
      paymentDate: today,
      memo: '',
      recurring: false,
      frequency: 'monthly',
      endDate: ''
    };
  };
  
  const confirmPayment = () => {
    isSubmitting.value = true;
    
    // Simulate API call
    setTimeout(() => {
      isSubmitting.value = false;
      showConfirmation.value = false;
      selectedBill.value = null;
      
      // Show success message or redirect
      alert('Payment scheduled successfully!');
      
      // Reset form
      resetPayeeForm();
      
      // Switch to history tab to show the new payment
      activeTab.value = 'history';
    }, 1500);
  };
  </script>
  
  <style scoped>
  .pay-bills-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .header {
    margin-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1rem;
  }
  
  .header h1 {
    color: #1e40af;
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .header p {
    color: #6b7280;
    font-size: 1rem;
  }
  
  .tabs {
    display: flex;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1.5rem;
  }
  
  .tab-button {
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
    position: relative;
  }
  
  .tab-button:hover {
    color: #1e40af;
  }
  
  .tab-button.active {
    color: #1e40af;
    font-weight: 600;
  }
  
  .tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #1e40af;
  }
  
  .tab-content {
    padding: 1rem 0;
  }
  
  .bills-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .bill-item {
    background-color: #f9fafb;
    border-radius: 0.5rem;
    padding: 1.25rem;
    border: 1px solid #e5e7eb;
  }
  
  .bill-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .bill-payee {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .payee-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 1.25rem;
  }
  
  .payee-details h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 0.25rem 0;
  }
  
  .payee-details p {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
  }
  
  .bill-amount {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }
  
  .bill-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    border: 1px dashed #d1d5db;
  }
  
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .empty-state h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .empty-state p {
    color: #6b7280;
    margin-bottom: 1.5rem;
  }
  
  .form-section {
    background-color: #f9fafb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid #e5e7eb;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4b5563;
  }
  
  .form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 1rem;
    transition: border-color 0.15s ease-in-out;
  }
  
  .form-control:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .new-payee-form {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .amount-input {
    position: relative;
  }
  
  .currency-symbol {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    color: #4b5563;
  }
  
  .amount-input input {
    padding-left: 1.5rem;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .recurring-options {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #f3f4f6;
    border-radius: 0.375rem;
  }
  
  .date-range-inputs {
    display: flex;
    gap: 1rem;
  }
  
  .date-range-inputs .form-group {
    flex: 1;
  }
  
  .history-filters {
    margin-bottom: 1.5rem;
  }
  
  .history-table {
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th {
    text-align: left;
    padding: 0.75rem;
    font-weight: 600;
    color: #4b5563;
    border-bottom: 1px solid #e5e7eb;
  }
  
  td {
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .status-badge.completed {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .status-badge.scheduled {
    background-color: #dbeafe;
    color: #1e40af;
  }
  
  .status-badge.pending {
    background-color: #fef3c7;
    color: #92400e;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
  }
  
  .btn-primary {
    background-color: #1e40af;
    color: white;
    border: none;
  }
  
  .btn-primary:hover:not(:disabled) {
    background-color: #1e3a8a;
  }
  
  .btn-primary:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
  
  .btn-secondary {
    background-color: white;
    color: #4b5563;
    border: 1px solid #d1d5db;
  }
  
  .btn-secondary:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }
  
  .btn-outline {
    background-color: transparent;
    color: #1e40af;
    border: 1px solid #1e40af;
  }
  
  .btn-outline:hover {
    background-color: #eff6ff;
  }
  
  .confirmation-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }
  
  .confirmation-content {
    background-color: white;
    border-radius: 0.5rem;
    padding: 2rem;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .confirmation-content h2 {
    color: #1e40af;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .confirmation-details {
    margin: 1.5rem 0;
    background-color: #f9fafb;
    border-radius: 0.375rem;
    padding: 1rem;
  }
  
  .detail-row {
    display: flex;
    margin-bottom: 0.75rem;
  }
  
  .detail-label {
    font-weight: 500;
    width: 5rem;
    color: #4b5563;
  }
  
  .detail-value {
    font-weight: 600;
    color: #111827;
  }
  
  .confirmation-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  </style>