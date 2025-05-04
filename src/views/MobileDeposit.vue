<template>
    <div class="mobile-deposit-container">
      <div class="header">
        <h1>Mobile Deposit</h1>
        <p>Deposit checks securely from anywhere</p>
      </div>
  
      <div class="deposit-steps">
        <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
          <div class="step-number">1</div>
          <div class="step-label">Account</div>
        </div>
        <div class="step-connector"></div>
        <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
          <div class="step-number">2</div>
          <div class="step-label">Check Info</div>
        </div>
        <div class="step-connector"></div>
        <div class="step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
          <div class="step-number">3</div>
          <div class="step-label">Photos</div>
        </div>
        <div class="step-connector"></div>
        <div class="step" :class="{ active: currentStep === 4 }">
          <div class="step-number">4</div>
          <div class="step-label">Review</div>
        </div>
      </div>
  
      <!-- Step 1: Select Account -->
      <div v-if="currentStep === 1" class="step-content">
        <div class="form-section">
          <h2>Select Deposit Account</h2>
          <p class="section-description">Choose which account you'd like to deposit your check into.</p>
          
          <div class="account-list">
            <div 
              v-for="account in accounts" 
              :key="account.id" 
              class="account-item"
              :class="{ selected: depositForm.accountId === account.id }"
              @click="depositForm.accountId = account.id"
            >
              <div class="account-icon">
                <span v-if="account.name.includes('Checking')">💳</span>
                <span v-else-if="account.name.includes('Savings')">💰</span>
                <span v-else>📊</span>
              </div>
              <div class="account-details">
                <h3>{{ account.name }}</h3>
                <p class="account-balance">${{ account.balance.toFixed(2) }}</p>
              </div>
              <div class="account-radio">
                <div class="radio-circle" :class="{ filled: depositForm.accountId === account.id }"></div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="step-actions">
          <button class="btn btn-secondary" @click="cancel">Cancel</button>
          <button 
            class="btn btn-primary" 
            :disabled="!depositForm.accountId" 
            @click="currentStep = 2"
          >
            Continue
          </button>
        </div>
      </div>
  
      <!-- Step 2: Check Information -->
      <div v-if="currentStep === 2" class="step-content">
        <div class="form-section">
          <h2>Check Information</h2>
          <p class="section-description">Enter the details from your check.</p>
          
          <div class="form-group">
            <label for="amount">Check Amount</label>
            <div class="amount-input">
              <span class="currency-symbol">$</span>
              <input 
                id="amount" 
                v-model="depositForm.amount" 
                type="number" 
                min="0.01" 
                step="0.01" 
                required 
                class="form-control"
                placeholder="0.00"
              />
            </div>
            <p class="input-hint">Enter the exact amount written on the check</p>
          </div>
  
          <div class="form-group">
            <label for="checkNumber">Check Number (Optional)</label>
            <input 
              id="checkNumber" 
              v-model="depositForm.checkNumber" 
              type="text" 
              class="form-control"
              placeholder="Enter check number"
            />
            <p class="input-hint">Usually found in the top right corner of the check</p>
          </div>
  
          <div class="deposit-guidelines">
            <h3>Deposit Guidelines</h3>
            <ul>
              <li>Maximum deposit amount: $5,000 per check</li>
              <li>Daily deposit limit: $10,000</li>
              <li>Monthly deposit limit: $50,000</li>
              <li>Funds availability: Deposits made before 9 PM ET on business days are typically available the next business day</li>
            </ul>
          </div>
        </div>
  
        <div class="step-actions">
          <button class="btn btn-secondary" @click="currentStep = 1">Back</button>
          <button 
            class="btn btn-primary" 
            :disabled="!depositForm.amount || depositForm.amount <= 0" 
            @click="currentStep = 3"
          >
            Continue
          </button>
        </div>
      </div>
  
      <!-- Step 3: Check Photos -->
      <div v-if="currentStep === 3" class="step-content">
        <div class="form-section">
          <h2>Check Photos</h2>
          <p class="section-description">Take clear photos of the front and back of your check.</p>
          
          <div class="check-photos">
            <div class="photo-upload">
              <h3>Front of Check</h3>
              <div 
                class="photo-area" 
                :class="{ 'has-photo': depositForm.frontImage }"
                @click="captureImage('front')"
              >
                <div v-if="!depositForm.frontImage" class="photo-placeholder">
                  <div class="camera-icon">📷</div>
                  <p>Tap to capture front</p>
                </div>
                <img v-else :src="depositForm.frontImage" alt="Front of check" class="check-image" />
              </div>
              <p class="photo-tip">Ensure all four corners are visible and the check is well-lit</p>
            </div>
  
            <div class="photo-upload">
              <h3>Back of Check</h3>
              <div 
                class="photo-area" 
                :class="{ 'has-photo': depositForm.backImage }"
                @click="captureImage('back')"
              >
                <div v-if="!depositForm.backImage" class="photo-placeholder">
                  <div class="camera-icon">📷</div>
                  <p>Tap to capture back</p>
                </div>
                <img v-else :src="depositForm.backImage" alt="Back of check" class="check-image" />
              </div>
              <p class="photo-tip">Make sure you've signed the back of the check and written "For Mobile Deposit Only"</p>
            </div>
          </div>
  
          <div class="photo-guidelines">
            <h3>Photo Tips</h3>
            <ul>
              <li>Place the check on a dark, non-reflective surface</li>
              <li>Make sure the check is flat and all four corners are visible</li>
              <li>Ensure the image is clear and well-lit</li>
              <li>Avoid shadows and glare</li>
            </ul>
          </div>
        </div>
  
        <div class="step-actions">
          <button class="btn btn-secondary" @click="currentStep = 2">Back</button>
          <button 
            class="btn btn-primary" 
            :disabled="!depositForm.frontImage || !depositForm.backImage" 
            @click="currentStep = 4"
          >
            Continue
          </button>
        </div>
      </div>
  
      <!-- Step 4: Review and Submit -->
      <div v-if="currentStep === 4" class="step-content">
        <div class="form-section">
          <h2>Review Deposit</h2>
          <p class="section-description">Please review your deposit details before submitting.</p>
          
          <div class="review-details">
            <div class="detail-row">
              <span class="detail-label">Account:</span>
              <span class="detail-value">{{ getAccountName(depositForm.accountId) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount:</span>
              <span class="detail-value">${{ parseFloat(depositForm.amount).toFixed(2) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Check #:</span>
              <span class="detail-value">{{ depositForm.checkNumber || 'Not provided' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">{{ formatDate(new Date()) }}</span>
            </div>
          </div>
  
          <div class="review-photos">
            <div class="review-photo">
              <h3>Front of Check</h3>
              <img :src="depositForm.frontImage" alt="Front of check" class="check-image" />
            </div>
            <div class="review-photo">
              <h3>Back of Check</h3>
              <img :src="depositForm.backImage" alt="Back of check" class="check-image" />
            </div>
          </div>
  
          <div class="deposit-agreement">
            <label class="checkbox-label">
              <input type="checkbox" v-model="depositForm.agreement" required />
              <span>
                I confirm that I am depositing this check to my account and that the check has not been altered. 
                I agree to the <a href="#" class="text-link">Mobile Deposit Terms and Conditions</a>.
              </span>
            </label>
          </div>
        </div>
  
        <div class="step-actions">
          <button class="btn btn-secondary" @click="currentStep = 3">Back</button>
          <button 
            class="btn btn-primary" 
            :disabled="!depositForm.agreement || isSubmitting" 
            @click="submitDeposit"
          >
            {{ isSubmitting ? 'Processing...' : 'Submit Deposit' }}
          </button>
        </div>
      </div>
  
      <!-- Success Screen -->
      <div v-if="currentStep === 5" class="step-content">
        <div class="success-screen">
          <div class="success-icon">✓</div>
          <h2>Deposit Successful!</h2>
          <p>Your check deposit has been submitted successfully.</p>
          
          <div class="success-details">
            <div class="detail-row">
              <span class="detail-label">Amount:</span>
              <span class="detail-value">${{ parseFloat(depositForm.amount).toFixed(2) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Account:</span>
              <span class="detail-value">{{ getAccountName(depositForm.accountId) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Confirmation:</span>
              <span class="detail-value">{{ confirmationNumber }}</span>
            </div>
          </div>
          
          <div class="funds-availability">
            <h3>Funds Availability</h3>
            <p>
              The first $225 of your deposit will be available on {{ formatDate(availabilityDate) }}.
              The remaining funds will typically be available on the next business day.
            </p>
          </div>
          
          <div class="success-actions">
            <button class="btn btn-outline" @click="newDeposit">Make Another Deposit</button>
            <button class="btn btn-primary" @click="goToDashboard">Return to Dashboard</button>
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
  
  const currentStep = ref(1);
  const isSubmitting = ref(false);
  const confirmationNumber = ref('');
  const availabilityDate = ref(new Date());
  
  const depositForm = ref({
    accountId: '',
    amount: '',
    checkNumber: '',
    frontImage: '',
    backImage: '',
    agreement: false
  });
  
  const getAccountName = (accountId) => {
    const account = accounts.find(a => a.id === accountId);
    return account ? account.name : '';
  };
  
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Simulate capturing an image
  const captureImage = (side) => {
    // In a real app, this would open the camera
    // For demo purposes, we'll use placeholder images
    const placeholderImages = {
      front: 'https://via.placeholder.com/400x200/e2e8f0/64748b?text=Front+of+Check',
      back: 'https://via.placeholder.com/400x200/e2e8f0/64748b?text=Back+of+Check'
    };
    
    if (side === 'front') {
      depositForm.value.frontImage = placeholderImages.front;
    } else {
      depositForm.value.backImage = placeholderImages.back;
    }
  };
  
  const submitDeposit = () => {
    isSubmitting.value = true;
    
    // Simulate API call
    setTimeout(() => {
      isSubmitting.value = false;
      
      // Generate random confirmation number
      confirmationNumber.value = 'DEP' + Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
      
      // Set availability date (next business day)
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      // Skip weekends
      if (nextDay.getDay() === 0) nextDay.setDate(nextDay.getDate() + 1);
      if (nextDay.getDay() === 6) nextDay.setDate(nextDay.getDate() + 2);
      availabilityDate.value = nextDay;
      
      // Show success screen
      currentStep.value = 5;
    }, 2000);
  };
  
  const newDeposit = () => {
    depositForm.value = {
      accountId: '',
      amount: '',
      checkNumber: '',
      frontImage: '',
      backImage: '',
      agreement: false
    };
    currentStep.value = 1;
  };
  
  const goToDashboard = () => {
    // In a real app, this would navigate to the dashboard
    alert('Navigating to dashboard');
  };
  
  const cancel = () => {
    // In a real app, this would navigate back to the dashboard
    alert('Deposit cancelled');
  };
  </script>
  
  <style scoped>
  .mobile-deposit-container {
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
  
  .deposit-steps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  
  .step-number {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #e5e7eb;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-bottom: 0.5rem;
    transition: all 0.2s ease-in-out;
  }
  
  .step.active .step-number {
    background-color: #1e40af;
    color: white;
  }
  
  .step.completed .step-number {
    background-color: #10b981;
    color: white;
  }
  
  .step-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
  }
  
  .step.active .step-label {
    color: #1e40af;
    font-weight: 600;
  }
  
  .step.completed .step-label {
    color: #10b981;
  }
  
  .step-connector {
    flex: 1;
    height: 2px;
    background-color: #e5e7eb;
    margin: 0 0.5rem;
    position: relative;
    top: -0.75rem;
  }
  
  .step-content {
    margin-bottom: 2rem;
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
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .section-description {
    color: #6b7280;
    margin-bottom: 1.5rem;
  }
  
  .account-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .account-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    background-color: white;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
  }
  
  .account-item:hover {
    border-color: #93c5fd;
  }
  
  .account-item.selected {
    border-color: #1e40af;
    background-color: #eff6ff;
  }
  
  .account-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
  
  .account-details {
    flex: 1;
  }
  
  .account-details h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 0.25rem 0;
  }
  
  .account-balance {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
  }
  
  .account-radio {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .radio-circle {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid #d1d5db;
    position: relative;
    transition: all 0.15s ease-in-out;
  }
  
  .radio-circle.filled {
    border-color: #1e40af;
  }
  
  .radio-circle.filled::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background-color: #1e40af;
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
  
  .input-hint {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.5rem;
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
  
  .deposit-guidelines {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f3f4f6;
    border-radius: 0.375rem;
    border-left: 4px solid #1e40af;
  }
  
  .deposit-guidelines h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
  }
  
  .deposit-guidelines ul {
    padding-left: 1.5rem;
    margin: 0;
  }
  
  .deposit-guidelines li {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: #4b5563;
  }
  
  .check-photos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 640px) {
    .check-photos {
      grid-template-columns: 1fr;
    }
  }
  
  .photo-upload {
    display: flex;
    flex-direction: column;
  }
  
  .photo-upload h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
  }
  
  .photo-area {
    aspect-ratio: 16/9;
    border: 2px dashed #d1d5db;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.15s ease-in-out;
    background-color: white;
  }
  
  .photo-area:hover {
    border-color: #93c5fd;
  }
  
  .photo-area.has-photo {
    border-style: solid;
    border-color: #1e40af;
  }
  
  .photo-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #6b7280;
  }
  
  .camera-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .check-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .photo-tip {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.5rem;
  }
  
  .photo-guidelines {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f3f4f6;
    border-radius: 0.375rem;
  }
  
  .photo-guidelines h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
  }
  
  .photo-guidelines ul {
    padding-left: 1.5rem;
    margin: 0;
  }
  
  .photo-guidelines li {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: #4b5563;
  }
  
  .review-details {
    margin-bottom: 1.5rem;
    background-color: white;
    border-radius: 0.375rem;
    padding: 1rem;
    border: 1px solid #e5e7eb;
  }
  
  .detail-row {
    display: flex;
    margin-bottom: 0.75rem;
  }
  
  .detail-label {
    font-weight: 500;
    width: 6rem;
    color: #4b5563;
  }
  
  .detail-value {
    font-weight: 600;
    color: #111827;
  }
  
  .review-photos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 640px) {
    .review-photos {
      grid-template-columns: 1fr;
    }
  }
  
  .review-photo h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
  }
  
  .deposit-agreement {
    margin-top: 1.5rem;
  }
  
  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .checkbox-label input {
    margin-top: 0.25rem;
  }
  
  .text-link {
    color: #1e40af;
    text-decoration: underline;
  }
  
  .step-actions {
    display: flex;
    justify-content: space-between;
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
  
  .success-screen {
    text-align: center;
    padding: 2rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  }
  
  .success-icon {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #10b981;
    color: white;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
  }
  
  .success-screen h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.75rem;
  }
  
  .success-screen p {
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
  
  .success-details {
    max-width: 24rem;
    margin: 0 auto 2rem;
    background-color: white;
    border-radius: 0.375rem;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    text-align: left;
  }
  
  .funds-availability {
    max-width: 30rem;
    margin: 0 auto 2rem;
    background-color: #eff6ff;
    border-radius: 0.375rem;
    padding: 1rem;
    border: 1px solid #dbeafe;
    text-align: left;
  }
  
  .funds-availability h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 0.5rem;
  }
  
  .funds-availability p {
    color: #4b5563;
    margin: 0;
    font-size: 0.875rem;
  }
  
  .success-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  
  @media (max-width: 640px) {
    .success-actions {
      flex-direction: column;
    }
  }
  </style>