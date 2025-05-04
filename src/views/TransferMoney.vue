<template>
    <div class="transfer-money-container">
      <div class="header">
        <h1>Transfer Money</h1>
        <p>Transfer funds between your accounts or to other recipients</p>
      </div>
  
      <form @submit.prevent="handleSubmit" class="transfer-form">
        <div class="form-section">
          <h2>From</h2>
          <div class="form-group">
            <label for="fromAccount">Select Account</label>
            <select id="fromAccount" v-model="form.fromAccount" required class="form-control">
              <option value="" disabled>Select an account</option>
              <option v-for="account in accounts" :key="account.id" :value="account.id">
                {{ account.name }} - ${{ account.balance.toFixed(2) }}
              </option>
            </select>
          </div>
        </div>
  
        <div class="form-section">
          <h2>To</h2>
          <div class="form-group">
            <label>Transfer Type</label>
            <div class="transfer-type-options">
              <label class="radio-option">
                <input type="radio" v-model="form.transferType" value="internal" />
                <span>My Accounts</span>
              </label>
              <label class="radio-option">
                <input type="radio" v-model="form.transferType" value="external" />
                <span>Someone Else</span>
              </label>
            </div>
          </div>
  
          <div v-if="form.transferType === 'internal'" class="form-group">
            <label for="toAccount">To Account</label>
            <select id="toAccount" v-model="form.toAccount" required class="form-control">
              <option value="" disabled>Select an account</option>
              <option 
                v-for="account in accounts.filter(a => a.id !== form.fromAccount)" 
                :key="account.id" 
                :value="account.id"
              >
                {{ account.name }} - ${{ account.balance.toFixed(2) }}
              </option>
            </select>
          </div>
  
          <div v-else class="recipient-fields">
            <div class="form-group">
              <label for="recipientName">Recipient Name</label>
              <input 
                id="recipientName" 
                v-model="form.recipientName" 
                type="text" 
                required 
                class="form-control"
                placeholder="Full name"
              />
            </div>
            <div class="form-group">
              <label for="accountNumber">Account Number</label>
              <input 
                id="accountNumber" 
                v-model="form.accountNumber" 
                type="text" 
                required 
                class="form-control"
                placeholder="Account number"
              />
            </div>
            <div class="form-group">
              <label for="routingNumber">Routing Number</label>
              <input 
                id="routingNumber" 
                v-model="form.routingNumber" 
                type="text" 
                required 
                class="form-control"
                placeholder="Routing number"
              />
            </div>
          </div>
        </div>
  
        <div class="form-section">
          <h2>Amount</h2>
          <div class="form-group">
            <label for="amount">Amount to Transfer</label>
            <div class="amount-input">
              <span class="currency-symbol">$</span>
              <input 
                id="amount" 
                v-model="form.amount" 
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
            <label for="transferDate">Transfer Date</label>
            <input 
              id="transferDate" 
              v-model="form.transferDate" 
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
              v-model="form.memo" 
              type="text" 
              class="form-control"
              placeholder="Add a note"
            />
          </div>
        </div>
  
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Processing...' : 'Transfer Funds' }}
          </button>
        </div>
      </form>
  
      <div v-if="showConfirmation" class="confirmation-modal">
        <div class="confirmation-content">
          <h2>Confirm Transfer</h2>
          <p>Please review the details of your transfer:</p>
          
          <div class="confirmation-details">
            <div class="detail-row">
              <span class="detail-label">From:</span>
              <span class="detail-value">{{ getAccountName(form.fromAccount) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">To:</span>
              <span class="detail-value">
                {{ form.transferType === 'internal' ? getAccountName(form.toAccount) : form.recipientName }}
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount:</span>
              <span class="detail-value">${{ parseFloat(form.amount).toFixed(2) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">{{ formatDate(form.transferDate) }}</span>
            </div>
          </div>
          
          <div class="confirmation-actions">
            <button class="btn btn-secondary" @click="showConfirmation = false">Edit</button>
            <button class="btn btn-primary" @click="confirmTransfer">Confirm Transfer</button>
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
    { id: 2, name: 'Savings Account', balance: 12580.00 },
    { id: 3, name: 'Investment Account', balance: 45325.00 }
  ];
  
  const form = ref({
    fromAccount: '',
    transferType: 'internal',
    toAccount: '',
    recipientName: '',
    accountNumber: '',
    routingNumber: '',
    amount: '',
    transferDate: new Date().toISOString().split('T')[0],
    memo: ''
  });
  
  const isSubmitting = ref(false);
  const showConfirmation = ref(false);
  const today = new Date().toISOString().split('T')[0];
  
  const getAccountName = (accountId) => {
    const account = accounts.find(a => a.id === accountId);
    return account ? account.name : '';
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleSubmit = () => {
    showConfirmation.value = true;
  };
  
  const confirmTransfer = () => {
    isSubmitting.value = true;
    
    // Simulate API call
    setTimeout(() => {
      isSubmitting.value = false;
      showConfirmation.value = false;
      
      // Show success message or redirect
      alert('Transfer completed successfully!');
      
      // Reset form
      form.value = {
        fromAccount: '',
        transferType: 'internal',
        toAccount: '',
        recipientName: '',
        accountNumber: '',
        routingNumber: '',
        amount: '',
        transferDate: new Date().toISOString().split('T')[0],
        memo: ''
      };
    }, 1500);
  };
  
  const cancel = () => {
    // Navigate back to dashboard
    alert('Transfer cancelled');
  };
  </script>
  
  <style scoped>
  .transfer-money-container {
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
  
  .form-section {
    background-color: #f9fafb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid #e5e7eb;
  }
  
  .form-section h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #374151;
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
  
  .transfer-type-options {
    display: flex;
    gap: 1.5rem;
  }
  
  .radio-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
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
  
  .recipient-fields {
    border-top: 1px solid #e5e7eb;
    margin-top: 1rem;
    padding-top: 1rem;
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