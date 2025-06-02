<template>
    <div class="card-application">
      <div class="application-header">
        <h1>Apply for a New Card</h1>
        <p>Complete the application below to apply for a new credit or debit card</p>
      </div>
  
      <!-- Application Progress -->
      <div class="application-progress">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="progress-step"
          :class="{ 
            'active': currentStep === index,
            'completed': currentStep > index
          }"
        >
          <div class="step-indicator">
            <span v-if="currentStep > index" class="step-check">✓</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="step-label">{{ step.label }}</div>
        </div>
      </div>
  
      <!-- Step 1: Card Selection -->
      <div v-if="currentStep === 0" class="application-step">
        <h2>Select Card Type</h2>
        <p class="step-description">Choose the type of card you'd like to apply for</p>
  
        <div class="card-options">
          <div 
            v-for="card in cardOptions" 
            :key="card.id"
            class="card-option"
            :class="{ 'selected': formData.cardType === card.id }"
            @click="selectCard(card.id)"
          >
            <div class="card-preview" :class="card.color">
              <div class="card-type">{{ card.type }}</div>
              <div class="card-name">{{ card.name }}</div>
              <div class="card-details">
                <div class="card-number">**** **** **** ****</div>
                <div class="card-expiry">MM/YY</div>
              </div>
            </div>
            <div class="card-info">
              <h3>{{ card.name }}</h3>
              <p class="card-description">{{ card.description }}</p>
              <ul class="card-benefits">
                <li v-for="(benefit, index) in card.benefits" :key="index">
                  {{ benefit }}
                </li>
              </ul>
              <div v-if="card.annualFee" class="card-fee">
                Annual Fee: {{ card.annualFee }}
              </div>
              <div v-if="card.apr" class="card-apr">
                APR: {{ card.apr }}
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Step 2: Personal Information -->
      <div v-if="currentStep === 1" class="application-step">
        <h2>Personal Information</h2>
        <p class="step-description">Please provide your personal details</p>
  
        <div class="form-grid">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input 
              id="firstName" 
              v-model="formData.firstName" 
              type="text" 
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input 
              id="lastName" 
              v-model="formData.lastName" 
              type="text" 
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="dateOfBirth">Date of Birth</label>
            <input 
              id="dateOfBirth" 
              v-model="formData.dateOfBirth" 
              type="date" 
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="ssn">Social Security Number</label>
            <input 
              id="ssn" 
              v-model="formData.ssn" 
              type="text" 
              class="form-control"
              placeholder="XXX-XX-XXXX"
              required
            />
          </div>
          <div class="form-group full-width">
            <label for="email">Email Address</label>
            <input 
              id="email" 
              v-model="formData.email" 
              type="email" 
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input 
              id="phone" 
              v-model="formData.phone" 
              type="tel" 
              class="form-control"
              placeholder="(XXX) XXX-XXXX"
              required
            />
          </div>
          <div class="form-group">
            <label for="citizenship">Citizenship Status</label>
            <select 
              id="citizenship" 
              v-model="formData.citizenship" 
              class="form-control"
              required
            >
              <option value="" disabled>Select citizenship status</option>
              <option value="us-citizen">U.S. Citizen</option>
              <option value="permanent-resident">Permanent Resident</option>
              <option value="non-resident">Non-Resident</option>
            </select>
          </div>
        </div>
      </div>
  
      <!-- Step 3: Address Information -->
      <div v-if="currentStep === 2" class="application-step">
        <h2>Address Information</h2>
        <p class="step-description">Please provide your current residential address</p>
  
        <div class="form-grid">
          <div class="form-group full-width">
            <label for="streetAddress">Street Address</label>
            <input 
              id="streetAddress" 
              v-model="formData.streetAddress" 
              type="text" 
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="aptUnit">Apartment/Unit (Optional)</label>
            <input 
              id="aptUnit" 
              v-model="formData.aptUnit" 
              type="text" 
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="city">City</label>
            <input 
              id="city" 
              v-model="formData.city" 
              type="text" 
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="state">State</label>
            <select 
              id="state" 
              v-model="formData.state" 
              class="form-control"
              required
            >
              <option value="" disabled>Select state</option>
              <option v-for="state in states" :key="state.code" :value="state.code">
                {{ state.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="zipCode">ZIP Code</label>
            <input 
              id="zipCode" 
              v-model="formData.zipCode" 
              type="text" 
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="residenceType">Residence Type</label>
            <select 
              id="residenceType" 
              v-model="formData.residenceType" 
              class="form-control"
              required
            >
              <option value="" disabled>Select residence type</option>
              <option value="own">Own</option>
              <option value="rent">Rent</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="monthsAtAddress">Months at Current Address</label>
            <input 
              id="monthsAtAddress" 
              v-model="formData.monthsAtAddress" 
              type="number" 
              class="form-control"
              min="0"
              required
            />
          </div>
        </div>
  
        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="formData.mailingAddressSame" />
            <span>Mailing address is the same as residential address</span>
          </label>
        </div>
  
        <div v-if="!formData.mailingAddressSame" class="mailing-address">
          <h3>Mailing Address</h3>
          <div class="form-grid">
            <div class="form-group full-width">
              <label for="mailingStreetAddress">Street Address</label>
              <input 
                id="mailingStreetAddress" 
                v-model="formData.mailingStreetAddress" 
                type="text" 
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="mailingAptUnit">Apartment/Unit (Optional)</label>
              <input 
                id="mailingAptUnit" 
                v-model="formData.mailingAptUnit" 
                type="text" 
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="mailingCity">City</label>
              <input 
                id="mailingCity" 
                v-model="formData.mailingCity" 
                type="text" 
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="mailingState">State</label>
              <select 
                id="mailingState" 
                v-model="formData.mailingState" 
                class="form-control"
                required
              >
                <option value="" disabled>Select state</option>
                <option v-for="state in states" :key="state.code" :value="state.code">
                  {{ state.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="mailingZipCode">ZIP Code</label>
              <input 
                id="mailingZipCode" 
                v-model="formData.mailingZipCode" 
                type="text" 
                class="form-control"
                required
              />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Step 4: Financial Information -->
      <div v-if="currentStep === 3" class="application-step">
        <h2>Financial Information</h2>
        <p class="step-description">Please provide your employment and income details</p>
  
        <div class="form-grid">
          <div class="form-group">
            <label for="employmentStatus">Employment Status</label>
            <select 
              id="employmentStatus" 
              v-model="formData.employmentStatus" 
              class="form-control"
              required
            >
              <option value="" disabled>Select employment status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="retired">Retired</option>
              <option value="student">Student</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </div>
          
          <div v-if="['employed', 'self-employed'].includes(formData.employmentStatus)" class="form-group">
            <label for="employer">Employer Name</label>
            <input 
              id="employer" 
              v-model="formData.employer" 
              type="text" 
              class="form-control"
              required
            />
          </div>
          
          <div v-if="['employed', 'self-employed'].includes(formData.employmentStatus)" class="form-group">
            <label for="jobTitle">Job Title</label>
            <input 
              id="jobTitle" 
              v-model="formData.jobTitle" 
              type="text" 
              class="form-control"
              required
            />
          </div>
          
          <div v-if="['employed', 'self-employed'].includes(formData.employmentStatus)" class="form-group">
            <label for="yearsEmployed">Years at Current Employer</label>
            <input 
              id="yearsEmployed" 
              v-model="formData.yearsEmployed" 
              type="number" 
              class="form-control"
              min="0"
              step="0.1"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="annualIncome">Annual Income</label>
            <div class="input-with-prefix">
              <span class="input-prefix">$</span>
              <input 
                id="annualIncome" 
                v-model="formData.annualIncome" 
                type="number" 
                class="form-control"
                min="0"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="additionalIncome">Additional Annual Income (Optional)</label>
            <div class="input-with-prefix">
              <span class="input-prefix">$</span>
              <input 
                id="additionalIncome" 
                v-model="formData.additionalIncome" 
                type="number" 
                class="form-control"
                min="0"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="housingPayment">Monthly Housing Payment</label>
            <div class="input-with-prefix">
              <span class="input-prefix">$</span>
              <input 
                id="housingPayment" 
                v-model="formData.housingPayment" 
                type="number" 
                class="form-control"
                min="0"
                required
              />
            </div>
          </div>
        </div>
  
        <div class="form-group">
          <label for="bankAccount">Select Account to Link (Optional)</label>
          <select 
            id="bankAccount" 
            v-model="formData.bankAccount" 
            class="form-control"
          >
            <option value="">None</option>
            <option value="checking">Everyday Checking - ****1234</option>
            <option value="savings">Savings Account - ****5678</option>
          </select>
          <p class="input-hint">Linking an account allows for easy payments and may improve your chances of approval</p>
        </div>
      </div>
  
      <!-- Step 5: Review and Submit -->
      <div v-if="currentStep === 4" class="application-step">
        <h2>Review and Submit</h2>
        <p class="step-description">Please review your application details before submitting</p>
  
        <div class="review-section">
          <h3>Card Selection</h3>
          <div class="review-item">
            <span class="review-label">Card Type:</span>
            <span class="review-value">{{ getCardName(formData.cardType) }}</span>
          </div>
        </div>
  
        <div class="review-section">
          <h3>Personal Information</h3>
          <div class="review-item">
            <span class="review-label">Name:</span>
            <span class="review-value">{{ formData.firstName }} {{ formData.lastName }}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Date of Birth:</span>
            <span class="review-value">{{ formData.dateOfBirth }}</span>
          </div>
          <div class="review-item">
            <span class="review-label">SSN:</span>
            <span class="review-value">XXX-XX-{{ formData.ssn ? formData.ssn.slice(-4) : '' }}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Email:</span>
            <span class="review-value">{{ formData.email }}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Phone:</span>
            <span class="review-value">{{ formData.phone }}</span>
          </div>
        </div>
  
        <div class="review-section">
          <h3>Address Information</h3>
          <div class="review-item">
            <span class="review-label">Residential Address:</span>
            <span class="review-value">
              {{ formData.streetAddress }}{{ formData.aptUnit ? ', ' + formData.aptUnit : '' }}<br>
              {{ formData.city }}, {{ formData.state }} {{ formData.zipCode }}
            </span>
          </div>
          <div v-if="!formData.mailingAddressSame" class="review-item">
            <span class="review-label">Mailing Address:</span>
            <span class="review-value">
              {{ formData.mailingStreetAddress }}{{ formData.mailingAptUnit ? ', ' + formData.mailingAptUnit : '' }}<br>
              {{ formData.mailingCity }}, {{ formData.mailingState }} {{ formData.mailingZipCode }}
            </span>
          </div>
        </div>
  
        <div class="review-section">
          <h3>Financial Information</h3>
          <div class="review-item">
            <span class="review-label">Employment Status:</span>
            <span class="review-value">{{ formatEmploymentStatus(formData.employmentStatus) }}</span>
          </div>
          <div v-if="['employed', 'self-employed'].includes(formData.employmentStatus)" class="review-item">
            <span class="review-label">Employer:</span>
            <span class="review-value">{{ formData.employer }}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Annual Income:</span>
            <span class="review-value">${{ formatNumber(formData.annualIncome) }}</span>
          </div>
          <div v-if="formData.additionalIncome" class="review-item">
            <span class="review-label">Additional Income:</span>
            <span class="review-value">${{ formatNumber(formData.additionalIncome) }}</span>
          </div>
        </div>
  
        <div class="terms-section">
          <h3>Terms and Conditions</h3>
          <div class="terms-container">
            <p>By submitting this application, you:</p>
            <ul>
              <li>Certify that all information provided is true and complete</li>
              <li>Authorize us to obtain credit reports and verify your information</li>
              <li>Acknowledge receipt of the credit card terms and conditions</li>
              <li>Understand that approval is subject to credit worthiness</li>
              <li>Agree to the <a href="#" class="text-link">Cardholder Agreement</a> and <a href="#" class="text-link">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.termsAccepted" required />
              <span>I have read and agree to the terms and conditions</span>
            </label>
          </div>
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.marketingOptIn" />
              <span>I would like to receive special offers and promotions (Optional)</span>
            </label>
          </div>
        </div>
      </div>
  
      <!-- Application Navigation -->
      <div class="application-navigation">
        <button 
          v-if="currentStep > 0" 
          @click="prevStep" 
          class="btn btn-secondary"
        >
          Back
        </button>
        <button 
          v-if="currentStep < steps.length - 1" 
          @click="nextStep" 
          class="btn btn-primary"
          :disabled="!canProceed"
        >
          Continue
        </button>
        <button 
          v-if="currentStep === steps.length - 1" 
          @click="submitApplication" 
          class="btn btn-primary"
          :disabled="!formData.termsAccepted || isSubmitting"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
        </button>
      </div>
  
      <!-- Success Modal -->
      <div v-if="showSuccessModal" class="modal-overlay">
        <div class="success-modal">
          <div class="success-icon">✓</div>
          <h2>Application Submitted!</h2>
          <p>Thank you for your application. We've received your information and will begin processing it right away.</p>
          
          <div class="application-details">
            <div class="detail-row">
              <span class="detail-label">Application ID:</span>
              <span class="detail-value">{{ applicationId }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Card Type:</span>
              <span class="detail-value">{{ getCardName(formData.cardType) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Submitted:</span>
              <span class="detail-value">{{ formatDate(new Date()) }}</span>
            </div>
          </div>
          
          <div class="next-steps">
            <h3>What's Next?</h3>
            <ol>
              <li>We'll review your application (typically within 1-3 business days)</li>
              <li>You'll receive an email notification with our decision</li>
              <li>If approved, your card will arrive within 7-10 business days</li>
            </ol>
          </div>
          
          <button @click="returnToDashboard" class="btn btn-primary">Return to Dashboard</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const currentStep = ref(0);
  const isSubmitting = ref(false);
  const showSuccessModal = ref(false);
  const applicationId = ref('');
  
  const steps = [
    { label: 'Card Type', key: 'cardType' },
    { label: 'Personal Info', key: 'personalInfo' },
    { label: 'Address', key: 'address' },
    { label: 'Financial Info', key: 'financialInfo' },
    { label: 'Review', key: 'review' }
  ];
  
  const cardOptions = [
    {
      id: 'platinum',
      type: 'Credit Card',
      name: 'Platinum Rewards',
      color: 'gradient-platinum',
      description: 'Premium credit card with exclusive benefits',
      benefits: [
        '2% cash back on all purchases',
        'Travel insurance',
        'Airport lounge access',
        'No foreign transaction fees'
      ],
      annualFee: '$195',
      apr: '15.99% - 22.99%'
    },
    {
      id: 'gold',
      type: 'Credit Card',
      name: 'Gold Rewards',
      color: 'gradient-gold',
      description: 'Mid-tier credit card with great rewards',
      benefits: [
        '1.5% cash back on all purchases',
        'Extended warranty protection',
        'Purchase protection',
        'No foreign transaction fees'
      ],
      annualFee: '$95',
      apr: '16.99% - 23.99%'
    },
    {
      id: 'debit',
      type: 'Debit Card',
      name: 'Everyday Banking',
      color: 'gradient-blue',
      description: 'Standard debit card for daily use',
      benefits: [
        'No annual fee',
        'ATM fee reimbursement',
        'Purchase protection',
        'Zero liability protection'
      ],
      annualFee: 'None',
      apr: 'N/A'
    }
  ];
  
  const states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
    { code: 'DC', name: 'District of Columbia' }
  ];
  
  const formData = ref({
    cardType: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    email: '',
    phone: '',
    citizenship: '',
    streetAddress: '',
    aptUnit: '',
    city: '',
    state: '',
    zipCode: '',
    residenceType: '',
    monthsAtAddress: '',
    mailingAddressSame: true,
    mailingStreetAddress: '',
    mailingAptUnit: '',
    mailingCity: '',
    mailingState: '',
    mailingZipCode: '',
    employmentStatus: '',
    employer: '',
    jobTitle: '',
    yearsEmployed: '',
    annualIncome: '',
    additionalIncome: '',
    housingPayment: '',
    bankAccount: '',
    termsAccepted: false,
    marketingOptIn: false
  });
  
  const selectCard = (cardId) => {
    console.log('Selecting card:', cardId);
    formData.value.cardType = cardId;
  };
  
  const getCardName = (cardId) => {
    const card = cardOptions.find(card => card.id === cardId);
    return card ? card.name : '';
  };
  
  const formatEmploymentStatus = (status) => {
    const statusMap = {
      'employed': 'Employed',
      'self-employed': 'Self-Employed',
      'retired': 'Retired',
      'student': 'Student',
      'unemployed': 'Unemployed'
    };
    return statusMap[status] || status;
  };
  
  const formatNumber = (num) => {
    return num ? Number(num).toLocaleString() : '0';
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 0:
        return !!formData.value.cardType;
      case 1:
        return formData.value.firstName && 
               formData.value.lastName && 
               formData.value.dateOfBirth && 
               formData.value.ssn && 
               formData.value.email && 
               formData.value.phone && 
               formData.value.citizenship;
      case 2:
        const addressValid = formData.value.streetAddress && 
                            formData.value.city && 
                            formData.value.state && 
                            formData.value.zipCode && 
                            formData.value.residenceType && 
                            formData.value.monthsAtAddress;
        
        const mailingValid = formData.value.mailingAddressSame || 
                            (formData.value.mailingStreetAddress && 
                             formData.value.mailingCity && 
                             formData.value.mailingState && 
                             formData.value.mailingZipCode);
        
        return addressValid && mailingValid;
      case 3:
        const employmentValid = formData.value.employmentStatus;
        const employerValid = !['employed', 'self-employed'].includes(formData.value.employmentStatus) || 
                             (formData.value.employer && 
                              formData.value.jobTitle && 
                              formData.value.yearsEmployed);
        
        return employmentValid && 
               employerValid && 
               formData.value.annualIncome && 
               formData.value.housingPayment;
      case 4:
        return formData.value.termsAccepted;
      default:
        return true;
    }
  });
  
  const nextStep = () => {
    console.log('Current step:', currentStep.value);
    console.log('Can proceed:', canProceed.value);
    console.log('Form data:', formData.value);
    
    if (currentStep.value === 0) {
      // For card selection step
      if (formData.value.cardType) {
        currentStep.value++;
      } else {
        errors.value = { cardType: 'Please select a card type' };
      }
    } else if (currentStep.value < steps.length - 1) {
      if (validateStep(currentStep.value)) {
        currentStep.value++;
      }
    } else {
      submitApplication();
    }
  };
  
  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  };
  
  const submitApplication = async () => {
    if (!formData.value.termsAccepted) return;
    
    isSubmitting.value = true;
    
    // Generate a random application ID
    applicationId.value = 'APP-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    try {
      // Here you would typically make an API call to submit the application
      console.log('Submitting application:', formData.value);
      // After successful submission
      router.push('/cards');
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle error appropriately
    } finally {
      isSubmitting.value = false;
      showSuccessModal.value = true;
    }
  };
  
  const returnToDashboard = () => {
    // In a real app, this would navigate back to the dashboard
    window.location.href = '/dashboard';
  };
  
  const validateStep = (stepIndex) => {
    console.log('Validating step:', stepIndex);
    const step = steps[stepIndex];
    const stepFields = getStepFields(step.key);
    const stepErrors = {};
    
    stepFields.forEach(field => {
      const value = formData.value[field];
      const rule = validationRules[field];
      if (rule) {
        const error = rule(value);
        if (error) {
          console.log('Validation error for field:', field, error);
          stepErrors[field] = error;
        }
      }
    });
    
    errors.value = stepErrors;
    const isValid = Object.keys(stepErrors).length === 0;
    console.log('Step validation result:', isValid);
    return isValid;
  };
  
  const getStepFields = (stepKey) => {
    const fieldMap = {
      cardType: ['cardType'],
      personalInfo: ['firstName', 'lastName', 'dateOfBirth', 'ssn', 'email', 'phone', 'citizenship'],
      address: ['streetAddress', 'aptUnit', 'city', 'state', 'zipCode', 'residenceType', 'monthsAtAddress'],
      financialInfo: ['employmentStatus', 'annualIncome', 'employer', 'jobTitle', 'yearsEmployed'],
      review: []
    };
    return fieldMap[stepKey] || [];
  };
  
  const validationRules = {
    cardType: (value) => {
      console.log('Validating cardType:', value);
      return !!value || 'Please select a card type';
    },
    firstName: (value) => !!value || 'First name is required',
    lastName: (value) => !!value || 'Last name is required',
    dateOfBirth: (value) => {
      if (!value) return 'Date of birth is required';
      const age = calculateAge(value);
      return age >= 18 || 'You must be at least 18 years old';
    },
    ssn: (value) => /^\d{3}-\d{2}-\d{4}$/.test(value) || 'Please enter a valid SSN (XXX-XX-XXXX)',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address',
    phone: (value) => /^\(\d{3}\) \d{3}-\d{4}$/.test(value) || 'Please enter a valid phone number',
    citizenship: (value) => !!value || 'Please select your citizenship status',
    streetAddress: (value) => !!value || 'Street address is required',
    city: (value) => !!value || 'City is required',
    state: (value) => !!value || 'State is required',
    zipCode: (value) => /^\d{5}(-\d{4})?$/.test(value) || 'Please enter a valid ZIP code',
    residenceType: (value) => !!value || 'Please select your residence type',
    monthsAtAddress: (value) => {
      if (!value) return 'Months at address is required';
      return parseInt(value) > 0 || 'Please enter a valid number of months';
    }
  };
  
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
  
  const errors = ref({});
  </script>
  
  <style scoped>
  .card-application {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .application-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .application-header h1 {
    color: #1e40af;
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .application-header p {
    color: #6b7280;
    font-size: 1rem;
  }
  
  .application-progress {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    position: relative;
  }
  
  .application-progress::before {
    content: '';
    position: absolute;
    top: 1rem;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #e5e7eb;
    z-index: 0;
  }
  
  .progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  
  .step-indicator {
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
  
  .progress-step.active .step-indicator {
    background-color: #1e40af;
    color: white;
  }
  
  .progress-step.completed .step-indicator {
    background-color: #10b981;
    color: white;
  }
  
  .step-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    text-align: center;
    max-width: 100px;
  }
  
  .progress-step.active .step-label {
    color: #1e40af;
    font-weight: 600;
  }
  
  .progress-step.completed .step-label {
    color: #10b981;
  }
  
  .application-step {
    margin-bottom: 2rem;
  }
  
  .application-step h2 {
    color: #1e40af;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .step-description {
    color: #6b7280;
    margin-bottom: 1.5rem;
  }
  
  .card-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 768px) {
    .card-options {
      grid-template-columns: 1fr;
    }
  }
  
  .card-option {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  
  .card-option:hover {
    border-color: #93c5fd;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .card-option.selected {
    border-color: #1e40af;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .card-preview {
    height: 180px;
    padding: 1.5rem;
    color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .card-preview.gradient-platinum {
    background: linear-gradient(135deg, #E5E4E2 0%, #B4B4B4 100%);
  }
  
  .card-preview.gradient-gold {
    background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%);
  }
  
  .card-preview.gradient-blue {
    background: linear-gradient(135deg, #1E90FF 0%, #0000CD 100%);
  }
  
  .card-type {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.8;
  }
  
  .card-name {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 0.5rem;
  }
  
  .card-details {
    margin-top: auto;
  }
  
  .card-number {
    font-size: 1rem;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
  
  .card-expiry {
    font-size: 0.75rem;
    opacity: 0.8;
  }
  
  .card-info {
    padding: 1.5rem;
  }
  
  .card-info h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  
  .card-description {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .card-benefits {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .card-benefits li {
    margin-bottom: 0.5rem;
    color: #4b5563;
    font-size: 0.875rem;
  }
  
  .card-fee, .card-apr {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.5rem;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 640px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group.full-width {
    grid-column: span 2;
  }
  
  @media (max-width: 640px) {
    .form-group.full-width {
      grid-column: span 1;
    }
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
  
  .input-with-prefix {
    position: relative;
  }
  
  .input-prefix {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    color: #4b5563;
  }
  
  .input-with-prefix .form-control {
    padding-left: 1.5rem;
  }
  
  .input-hint {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }
  
  .checkbox-group {
    margin-top: 1rem;
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
  
  .mailing-address {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .mailing-address h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }
  
  .review-section {
    margin-bottom: 1.5rem;
    padding: 1.5rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  }
  
  .review-section h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .review-item {
    display: flex;
    margin-bottom: 0.75rem;
  }
  
  .review-label {
    font-weight: 500;
    width: 8rem;
    color: #4b5563;
  }
  
  .review-value {
    font-weight: 400;
    color: #111827;
  }
  
  .terms-section {
    margin-bottom: 1.5rem;
  }
  
  .terms-section h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }
  
  .terms-container {
    padding: 1.5rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    margin-bottom: 1.5rem;
  }
  
  .terms-container p {
    margin-bottom: 0.75rem;
  }
  
  .terms-container ul {
    padding-left: 1.5rem;
  }
  
  .terms-container li {
    margin-bottom: 0.5rem;
  }
  
  .text-link {
    color: #1e40af;
    text-decoration: underline;
  }
  
  .application-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
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
  
  .modal-overlay {
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
  
  .success-modal {
    background-color: white;
    border-radius: 0.5rem;
    padding: 2rem;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    text-align: center;
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
  
  .success-modal h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.75rem;
  }
  
  .success-modal p {
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
  
  .application-details {
    background-color: #f9fafb;
    border-radius: 0.375rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
    text-align: left;
  }
  
  .detail-row {
    display: flex;
    margin-bottom: 0.5rem;
  }
  
  .detail-label {
    font-weight: 500;
    width: 8rem;
    color: #4b5563;
  }
  
  .detail-value {
    font-weight: 600;
    color: #111827;
  }
  
  .next-steps {
    text-align: left;
    margin-bottom: 1.5rem;
  }
  
  .next-steps h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
  }
  
  .next-steps ol {
    padding-left: 1.5rem;
  }
  
  .next-steps li {
    margin-bottom: 0.5rem;
    color: #4b5563;
  }
  </style>