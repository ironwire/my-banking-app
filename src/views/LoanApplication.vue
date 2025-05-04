<template>
    <div class="loan-application">
      <div class="application-header">
        <h1>Apply for a New Loan</h1>
        <p>Complete the application below to apply for a new loan</p>
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
            <span v-if="currentStep > index" class="step-check">&#10003;</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="step-label">{{ step.label }}</div>
        </div>
      </div>
  
      <!-- Step 1: Loan Selection -->
      <div v-if="currentStep === 0" class="application-step">
        <h2>Select Loan Type</h2>
        <p class="step-description">Choose the type of loan you'd like to apply for</p>
  
        <div class="loan-options">
          <div 
            v-for="loan in loanOptions" 
            :key="loan.id"
            class="loan-option"
            :class="{ 'selected': formData.loanType === loan.id }"
            @click="selectLoan(loan.id)"
          >
            <div class="loan-icon" :class="loan.color">
              <span class="icon-text">{{ loan.icon }}</span>
            </div>
            <div class="loan-info">
              <h3>{{ loan.name }}</h3>
              <p class="loan-description">{{ loan.description }}</p>
              <ul class="loan-features">
                <li v-for="(feature, index) in loan.features" :key="index">
                  {{ feature }}
                </li>
              </ul>
              <div class="loan-rates">
                <span>Interest rates from {{ loan.rateRange }}</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Loan Amount and Term -->
        <div v-if="formData.loanType" class="loan-details-form">
          <h3>Loan Details</h3>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="loanAmount">Loan Amount</label>
              <div class="input-with-prefix">
                <span class="input-prefix">$</span>
                <input 
                  id="loanAmount" 
                  v-model="formData.loanAmount" 
                  type="number" 
                  class="form-control"
                  min="1000"
                  :max="getMaxLoanAmount()"
                  step="1000"
                  required
                />
              </div>
              <p class="input-hint">{{ getLoanAmountHint() }}</p>
            </div>
            
            <div class="form-group">
              <label for="loanTerm">Loan Term</label>
              <div class="select-wrapper">
                <select 
                  id="loanTerm" 
                  v-model="formData.loanTerm" 
                  class="form-control"
                  required
                >
                  <option value="" disabled>Select term</option>
                  <option 
                    v-for="term in getAvailableTerms()" 
                    :key="term.value" 
                    :value="term.value"
                  >
                    {{ term.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
  
          <!-- Loan Purpose (for certain loan types) -->
          <div v-if="['personal', 'home-equity'].includes(formData.loanType)" class="form-group">
            <label for="loanPurpose">Loan Purpose</label>
            <select 
              id="loanPurpose" 
              v-model="formData.loanPurpose" 
              class="form-control"
              required
            >
              <option value="" disabled>Select purpose</option>
              <option 
                v-for="purpose in getLoanPurposes()" 
                :key="purpose.value" 
                :value="purpose.value"
              >
                {{ purpose.label }}
              </option>
            </select>
          </div>
  
          <!-- Payment Estimate -->
          <div v-if="formData.loanAmount && formData.loanTerm" class="payment-estimate">
            <h3>Estimated Monthly Payment</h3>
            <div class="estimate-amount">${{ calculateEstimatedPayment() }}</div>
            <p class="estimate-note">This is an estimate based on the selected loan type and your credit profile will determine your actual rate.</p>
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
  
        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="formData.existingCustomer" />
            <span>I am an existing customer</span>
          </label>
        </div>
  
        <div v-if="formData.existingCustomer" class="form-group">
          <label for="accountNumber">Account Number (Optional)</label>
          <input 
            id="accountNumber" 
            v-model="formData.accountNumber" 
            type="text" 
            class="form-control"
            placeholder="Enter your account number"
          />
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
            <label for="monthsAtAddress">Years at Current Address</label>
            <input 
              id="monthsAtAddress" 
              v-model="formData.yearsAtAddress" 
              type="number" 
              class="form-control"
              min="0"
              step="0.1"
              required
            />
          </div>
        </div>
  
        <!-- Previous Address (if less than 2 years at current) -->
        <div v-if="formData.yearsAtAddress && parseFloat(formData.yearsAtAddress) < 2" class="previous-address">
          <h3>Previous Address</h3>
          <p>Since you've lived at your current address for less than 2 years, please provide your previous address.</p>
          
          <div class="form-grid">
            <div class="form-group full-width">
              <label for="prevStreetAddress">Street Address</label>
              <input 
                id="prevStreetAddress" 
                v-model="formData.prevStreetAddress" 
                type="text" 
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="prevAptUnit">Apartment/Unit (Optional)</label>
              <input 
                id="prevAptUnit" 
                v-model="formData.prevAptUnit" 
                type="text" 
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="prevCity">City</label>
              <input 
                id="prevCity" 
                v-model="formData.prevCity" 
                type="text" 
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="prevState">State</label>
              <select 
                id="prevState" 
                v-model="formData.prevState" 
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
              <label for="prevZipCode">ZIP Code</label>
              <input 
                id="prevZipCode" 
                v-model="formData.prevZipCode" 
                type="text" 
                class="form-control"
                required
              />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Step 4: Employment & Financial Information -->
      <div v-if="currentStep === 3" class="application-step">
        <h2>Employment & Financial Information</h2>
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
            <p class="input-hint">Alimony, child support, or separate maintenance income need not be revealed if you do not wish to have it considered as a basis for repaying this obligation.</p>
          </div>
        </div>
  
        <!-- Previous Employment (if less than 2 years at current) -->
        <div v-if="['employed', 'self-employed'].includes(formData.employmentStatus) && formData.yearsEmployed && parseFloat(formData.yearsEmployed) < 2" class="previous-employment">
          <h3>Previous Employment</h3>
          <p>Since you've been at your current employer for less than 2 years, please provide your previous employment information.</p>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="prevEmployer">Previous Employer</label>
              <input 
                id="prevEmployer" 
                v-model="formData.prevEmployer" 
                type="text" 
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="prevJobTitle">Previous Job Title</label>
              <input 
                id="prevJobTitle" 
                v-model="formData.prevJobTitle" 
                type="text" 
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="prevYearsEmployed">Years at Previous Employer</label>
              <input 
                id="prevYearsEmployed" 
                v-model="formData.prevYearsEmployed" 
                type="number" 
                class="form-control"
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>
        </div>
  
        <!-- Additional Financial Information -->
        <div class="financial-info">
          <h3>Additional Financial Information</h3>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="monthlyHousingPayment">Monthly Housing Payment</label>
              <div class="input-with-prefix">
                <span class="input-prefix">$</span>
                <input 
                  id="monthlyHousingPayment" 
                  v-model="formData.monthlyHousingPayment" 
                  type="number" 
                  class="form-control"
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="totalMonthlyDebt">Total Monthly Debt Payments</label>
              <div class="input-with-prefix">
                <span class="input-prefix">$</span>
                <input 
                  id="totalMonthlyDebt" 
                  v-model="formData.totalMonthlyDebt" 
                  type="number" 
                  class="form-control"
                  min="0"
                  required
                />
              </div>
              <p class="input-hint">Include credit cards, auto loans, student loans, etc.</p>
            </div>
          </div>
        </div>
  
        <!-- Collateral Information (for secured loans) -->
        <div v-if="['auto', 'mortgage', 'home-equity'].includes(formData.loanType)" class="collateral-info">
          <h3>Collateral Information</h3>
          
          <div v-if="formData.loanType === 'auto'" class="form-grid">
            <div class="form-group">
              <label for="vehicleMake">Vehicle Make</label>
              <input 
                id="vehicleMake" 
                v-model="formData.vehicleMake" 
                type="text" 
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="vehicleModel">Vehicle Model</label>
              <input 
                id="vehicleModel" 
                v-model="formData.vehicleModel" 
                type="text" 
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="vehicleYear">Vehicle Year</label>
              <input 
                id="vehicleYear" 
                v-model="formData.vehicleYear" 
                type="number" 
                class="form-control"
                min="1900"
                :max="new Date().getFullYear() + 1"
                required
              />
            </div>
            <div class="form-group">
              <label for="vehiclePrice">Purchase Price</label>
              <div class="input-with-prefix">
                <span class="input-prefix">$</span>
                <input 
                  id="vehiclePrice" 
                  v-model="formData.vehiclePrice" 
                  type="number" 
                  class="form-control"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
          
          <div v-if="['mortgage', 'home-equity'].includes(formData.loanType)" class="form-grid">
            <div class="form-group full-width">
              <label for="propertyAddress">Property Address</label>
              <input 
                id="propertyAddress" 
                v-model="formData.propertyAddress" 
                type="text" 
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="propertyCity">City</label>
              <input 
                id="propertyCity" 
                v-model="formData.propertyCity" 
                type="text" 
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="propertyState">State</label>
              <select 
                id="propertyState" 
                v-model="formData.propertyState" 
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
              <label for="propertyZip">ZIP Code</label>
              <input 
                id="propertyZip" 
                v-model="formData.propertyZip" 
                type="text" 
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="propertyType">Property Type</label>
              <select 
                id="propertyType" 
                v-model="formData.propertyType" 
                class="form-control"
                required
              >
                <option value="" disabled>Select property type</option>
                <option value="single-family">Single Family Home</option>
                <option value="condo">Condominium</option>
                <option value="townhouse">Townhouse</option>
                <option value="multi-family">Multi-Family Home</option>
                <option value="manufactured">Manufactured Home</option>
              </select>
            </div>
            <div class="form-group">
              <label for="propertyValue">Estimated Property Value</label>
              <div class="input-with-prefix">
                <span class="input-prefix">$</span>
                <input 
                  id="propertyValue" 
                  v-model="formData.propertyValue" 
                  type="number" 
                  class="form-control"
                  min="0"
                  required
                />
              </div>
            </div>
            <div v-if="formData.loanType === 'home-equity'" class="form-group">
              <label for="mortgageBalance">Current Mortgage Balance</label>
              <div class="input-with-prefix">
                <span class="input-prefix">$</span>
                <input 
                  id="mortgageBalance" 
                  v-model="formData.mortgageBalance" 
                  type="number" 
                  class="form-control"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Step 5: Review and Submit -->
      <div v-if="currentStep === 4" class="application-step">
        <h2>Review and Submit</h2>
        <p class="step-description">Please review your application details before submitting</p>
  
        <div class="review-section">
          <h3>Loan Details</h3>
          <div class="review-item">
            <span class="review-label">Loan Type:</span>
            <span class="review-value">{{ getLoanName(formData.loanType) }}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Loan Amount:</span>
            <span class="review-value">${{ formatNumber(formData.loanAmount) }}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Loan Term:</span>
            <span class="review-value">{{ formatLoanTerm(formData.loanTerm) }}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Estimated Monthly Payment:</span>
            <span class="review-value">${{ calculateEstimatedPayment() }}</span>
          </div>
          <div v-if="formData.loanPurpose" class="review-item">
            <span class="review-label">Loan Purpose:</span>
            <span class="review-value">{{ formatLoanPurpose(formData.loanPurpose) }}</span>
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
            <span class="review-value">{{ formatDate(formData.dateOfBirth) }}</span>
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
            <span class="review-label">Current Address:</span>
            <span class="review-value">
              {{ formData.streetAddress }}{{ formData.aptUnit ? ', ' + formData.aptUnit : '' }}<br>
              {{ formData.city }}, {{ formData.state }} {{ formData.zipCode }}
            </span>
          </div>
          <div class="review-item">
            <span class="review-label">Time at Address:</span>
            <span class="review-value">{{ formData.yearsAtAddress }} years</span>
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
          <div class="review-item">
            <span class="review-label">Monthly Housing Payment:</span>
            <span class="review-value">${{ formatNumber(formData.monthlyHousingPayment) }}</span>
          </div>
          <div class="review-item">
            <span class="review-label">Monthly Debt Payments:</span>
            <span class="review-value">${{ formatNumber(formData.totalMonthlyDebt) }}</span>
          </div>
        </div>
  
        <!-- Collateral Review -->
        <div v-if="['auto', 'mortgage', 'home-equity'].includes(formData.loanType)" class="review-section">
          <h3>Collateral Information</h3>
          
          <div v-if="formData.loanType === 'auto'">
            <div class="review-item">
              <span class="review-label">Vehicle:</span>
              <span class="review-value">{{ formData.vehicleYear }} {{ formData.vehicleMake }} {{ formData.vehicleModel }}</span>
            </div>
            <div class="review-item">
              <span class="review-label">Purchase Price:</span>
              <span class="review-value">${{ formatNumber(formData.vehiclePrice) }}</span>
            </div>
          </div>
          
          <div v-if="['mortgage', 'home-equity'].includes(formData.loanType)">
            <div class="review-item">
              <span class="review-label">Property Address:</span>
              <span class="review-value">
                {{ formData.propertyAddress }}<br>
                {{ formData.propertyCity }}, {{ formData.propertyState }} {{ formData.propertyZip }}
              </span>
            </div>
            <div class="review-item">
              <span class="review-label">Property Type:</span>
              <span class="review-value">{{ formatPropertyType(formData.propertyType) }}</span>
            </div>
            <div class="review-item">
              <span class="review-label">Property Value:</span>
              <span class="review-value">${{ formatNumber(formData.propertyValue) }}</span>
            </div>
            <div v-if="formData.loanType === 'home-equity'" class="review-item">
              <span class="review-label">Mortgage Balance:</span>
              <span class="review-value">${{ formatNumber(formData.mortgageBalance) }}</span>
            </div>
          </div>
        </div>
  
        <div class="terms-section">
          <h3>Terms and Conditions</h3>
          <div class="terms-container">
            <p>By submitting this application, you:</p>
            <ul>
              <li>Certify that all information provided is true and complete</li>
              <li>Authorize us to obtain credit reports and verify your information</li>
              <li>Acknowledge receipt of the loan terms and conditions</li>
              <li>Understand that approval is subject to credit worthiness</li>
              <li>Agree to the <a href="#" class="text-link">Loan Agreement</a> and <a href="#" class="text-link">Privacy Policy</a></li>
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
              <input type="checkbox" v-model="formData.electronicCommunication" required />
              <span>I consent to receive electronic communications regarding my loan application</span>
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
          :disabled="!formData.termsAccepted || !formData.electronicCommunication || isSubmitting"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
        </button>
      </div>
  
      <!-- Success Modal -->
      <div v-if="showSuccessModal" class="modal-overlay">
        <div class="success-modal">
          <div class="success-icon">&#10003;</div>
          <h2>Application Submitted!</h2>
          <p>Thank you for your loan application. We've received your information and will begin processing it right away.</p>
          
          <div class="application-details">
            <div class="detail-row">
              <span class="detail-label">Application ID:</span>
              <span class="detail-value">{{ applicationId }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Loan Type:</span>
              <span class="detail-value">{{ getLoanName(formData.loanType) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount:</span>
              <span class="detail-value">${{ formatNumber(formData.loanAmount) }}</span>
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
              <li>If approved, we'll contact you to finalize the loan details</li>
              <li>Funds will be disbursed according to the loan type requirements</li>
            </ol>
          </div>
          
          <button @click="returnToDashboard" class="btn btn-primary">Return to Dashboard</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Application steps
  const steps = [
    { label: 'Loan Selection' },
    { label: 'Personal Info' },
    { label: 'Address' },
    { label: 'Financial Info' },
    { label: 'Review' }
  ];
  
  const currentStep = ref(0);
  const isSubmitting = ref(false);
  const showSuccessModal = ref(false);
  const applicationId = ref('');
  
  // Loan options
  const loanOptions = [
    {
      id: 'mortgage',
      name: 'Mortgage Loan',
      icon: '🏠',
      color: 'blue',
      description: 'Finance a new home purchase or refinance your existing mortgage.',
      features: [
        'Competitive fixed and adjustable rates',
        'Flexible terms from 10 to 30 years',
        'Low down payment options available',
        'No prepayment penalties',
        'Local servicing'
      ],
      rateRange: '3.25% - 5.75%'
    },
    {
      id: 'auto',
      name: 'Auto Loan',
      icon: '🚗',
      color: 'green',
      description: 'Finance a new or used vehicle with competitive rates.',
      features: [
        'New and used vehicle financing',
        'Terms up to 84 months',
        'No application fees',
        'Quick approval process',
        'Refinancing options available'
      ],
      rateRange: '4.25% - 6.50%'
    },
    {
      id: 'personal',
      name: 'Personal Loan',
      icon: '💼',
      color: 'purple',
      description: 'Flexible financing for your personal needs.',
      features: [
        'Unsecured loans up to $50,000',
        'Fixed rates and payments',
        'Terms from 12 to 60 months',
        'No collateral required',
        'Use for any purpose'
      ],
      rateRange: '6.99% - 18.00%'
    },
    {
      id: 'home-equity',
      name: 'Home Equity Loan',
      icon: '🏡',
      color: 'orange',
      description: 'Tap into your home\'s equity for major expenses.',
      features: [
        'Fixed-rate options',
        'Borrow up to 80% of your home\'s value',
        'Potential tax benefits',
        'Lower rates than personal loans',
        'Terms up to 20 years'
      ],
      rateRange: '4.50% - 7.25%'
    },
    {
      id: 'business',
      name: 'Business Loan',
      icon: '🏢',
      color: 'teal',
      description: 'Financing solutions for your business needs.',
      features: [
        'Term loans and lines of credit',
        'Equipment financing',
        'Commercial real estate loans',
        'SBA loan options',
        'Flexible repayment terms'
      ],
      rateRange: '5.00% - 12.00%'
    }
  ];
  
  // US States for dropdown
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
  
  // Form data
  const formData = ref({
    // Step 1: Loan Selection
    loanType: '',
    loanAmount: '',
    loanTerm: '',
    loanPurpose: '',
    
    // Step 2: Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    email: '',
    phone: '',
    citizenship: '',
    existingCustomer: false,
    accountNumber: '',
    
    // Step 3: Address Information
    streetAddress: '',
    aptUnit: '',
    city: '',
    state: '',
    zipCode: '',
    residenceType: '',
    yearsAtAddress: '',
    prevStreetAddress: '',
    prevAptUnit: '',
    prevCity: '',
    prevState: '',
    prevZipCode: '',
    
    // Step 4: Employment & Financial Information
    employmentStatus: '',
    employer: '',
    jobTitle: '',
    yearsEmployed: '',
    annualIncome: '',
    additionalIncome: '',
    prevEmployer: '',
    prevJobTitle: '',
    prevYearsEmployed: '',
    monthlyHousingPayment: '',
    totalMonthlyDebt: '',
    
    // Collateral Information - Auto
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehiclePrice: '',
    
    // Collateral Information - Property
    propertyAddress: '',
    propertyCity: '',
    propertyState: '',
    propertyZip: '',
    propertyType: '',
    propertyValue: '',
    mortgageBalance: '',
    
    // Step 5: Terms and Conditions
    termsAccepted: false,
    electronicCommunication: false
  });
  
  // Helper functions
  const selectLoan = (loanId) => {
    formData.value.loanType = loanId;
    
    // Reset loan-specific fields when changing loan type
    if (loanId === 'auto') {
      formData.value.loanTerm = '60'; // 5 years default for auto
    } else if (loanId === 'mortgage') {
      formData.value.loanTerm = '360'; // 30 years default for mortgage
    } else if (loanId === 'personal') {
      formData.value.loanTerm = '36'; // 3 years default for personal
    } else if (loanId === 'home-equity') {
      formData.value.loanTerm = '180'; // 15 years default for home equity
    } else if (loanId === 'business') {
      formData.value.loanTerm = '60'; // 5 years default for business
    }
  };
  
  const getLoanName = (loanId) => {
    const loan = loanOptions.find(loan => loan.id === loanId);
    return loan ? loan.name : '';
  };
  
  const getMaxLoanAmount = () => {
    switch (formData.value.loanType) {
      case 'mortgage':
        return 2000000;
      case 'auto':
        return 100000;
      case 'personal':
        return 50000;
      case 'home-equity':
        return 500000;
      case 'business':
        return 1000000;
      default:
        return 1000000;
    }
  };
  
  const getLoanAmountHint = () => {
    switch (formData.value.loanType) {
      case 'mortgage':
        return 'Enter loan amount from $50,000 to $2,000,000';
      case 'auto':
        return 'Enter loan amount from $5,000 to $100,000';
      case 'personal':
        return 'Enter loan amount from $1,000 to $50,000';
      case 'home-equity':
        return 'Enter loan amount from $10,000 to $500,000';
      case 'business':
        return 'Enter loan amount from $10,000 to $1,000,000';
      default:
        return 'Enter the loan amount you need';
    }
  };
  
  const getAvailableTerms = () => {
    switch (formData.value.loanType) {
      case 'mortgage':
        return [
          { value: '180', label: '15 Years' },
          { value: '240', label: '20 Years' },
          { value: '360', label: '30 Years' }
        ];
      case 'auto':
        return [
          { value: '36', label: '3 Years' },
          { value: '48', label: '4 Years' },
          { value: '60', label: '5 Years' },
          { value: '72', label: '6 Years' },
          { value: '84', label: '7 Years' }
        ];
      case 'personal':
        return [
          { value: '12', label: '1 Year' },
          { value: '24', label: '2 Years' },
          { value: '36', label: '3 Years' },
          { value: '48', label: '4 Years' },
          { value: '60', label: '5 Years' }
        ];
      case 'home-equity':
        return [
          { value: '60', label: '5 Years' },
          { value: '120', label: '10 Years' },
          { value: '180', label: '15 Years' },
          { value: '240', label: '20 Years' }
        ];
      case 'business':
        return [
          { value: '12', label: '1 Year' },
          { value: '24', label: '2 Years' },
          { value: '36', label: '3 Years' },
          { value: '60', label: '5 Years' },
          { value: '84', label: '7 Years' },
          { value: '120', label: '10 Years' }
        ];
      default:
        return [];
    }
  };
  
  const getLoanPurposes = () => {
    if (formData.value.loanType === 'personal') {
      return [
        { value: 'debt-consolidation', label: 'Debt Consolidation' },
        { value: 'home-improvement', label: 'Home Improvement' },
        { value: 'major-purchase', label: 'Major Purchase' },
        { value: 'medical', label: 'Medical Expenses' },
        { value: 'vacation', label: 'Vacation' },
        { value: 'wedding', label: 'Wedding' },
        { value: 'other', label: 'Other' }
      ];
    } else if (formData.value.loanType === 'home-equity') {
      return [
        { value: 'home-improvement', label: 'Home Improvement' },
        { value: 'debt-consolidation', label: 'Debt Consolidation' },
        { value: 'education', label: 'Education' },
        { value: 'major-purchase', label: 'Major Purchase' },
        { value: 'other', label: 'Other' }
      ];
    }
    return [];
  };
  
  const calculateEstimatedPayment = () => {
    if (!formData.value.loanAmount || !formData.value.loanTerm) {
      return '0.00';
    }
    
    // Get estimated interest rate based on loan type
    let rate;
    switch (formData.value.loanType) {
      case 'mortgage':
        rate = 0.0425 / 12; // 4.25% annual rate
        break;
      case 'auto':
        rate = 0.0495 / 12; // 4.95% annual rate
        break;
      case 'personal':
        rate = 0.0899 / 12; // 8.99% annual rate
        break;
      case 'home-equity':
        rate = 0.0575 / 12; // 5.75% annual rate
        break;
      case 'business':
        rate = 0.0750 / 12; // 7.50% annual rate
        break;
      default:
        rate = 0.05 / 12; // 5% annual rate
    }
    
    // Calculate monthly payment using amortization formula
    const principal = parseFloat(formData.value.loanAmount);
    const months = parseInt(formData.value.loanTerm);
    
    // P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const payment = principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    
    return isNaN(payment) ? '0.00' : payment.toFixed(2);
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
  
  const formatLoanTerm = (term) => {
    if (!term) return '';
    
    const months = parseInt(term);
    if (months >= 12) {
      const years = months / 12;
      return `${years} ${years === 1 ? 'Year' : 'Years'}`;
    }
    return `${months} Months`;
  };
  
  const formatLoanPurpose = (purpose) => {
    const purposeMap = {
      'debt-consolidation': 'Debt Consolidation',
      'home-improvement': 'Home Improvement',
      'major-purchase': 'Major Purchase',
      'medical': 'Medical Expenses',
      'vacation': 'Vacation',
      'wedding': 'Wedding',
      'education': 'Education',
      'other': 'Other'
    };
    return purposeMap[purpose] || purpose;
  };
  
  const formatPropertyType = (type) => {
    const typeMap = {
      'single-family': 'Single Family Home',
      'condo': 'Condominium',
      'townhouse': 'Townhouse',
      'multi-family': 'Multi-Family Home',
      'manufactured': 'Manufactured Home'
    };
    return typeMap[type] || type;
  };
  
  const formatNumber = (num) => {
    return num ? Number(num).toLocaleString() : '0';
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Navigation functions
  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 0:
        return formData.value.loanType && 
               formData.value.loanAmount && 
               formData.value.loanTerm &&
               (!['personal', 'home-equity'].includes(formData.value.loanType) || formData.value.loanPurpose);
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
                            formData.value.yearsAtAddress;
        
        const prevAddressValid = parseFloat(formData.value.yearsAtAddress) >= 2 || 
                                (formData.value.prevStreetAddress && 
                                 formData.value.prevCity && 
                                 formData.value.prevState && 
                                 formData.value.prevZipCode);
        
        return addressValid && prevAddressValid;
      case 3:
        const employmentValid = formData.value.employmentStatus;
        const employerValid = !['employed', 'self-employed'].includes(formData.value.employmentStatus) || 
                             (formData.value.employer && 
                              formData.value.jobTitle && 
                              formData.value.yearsEmployed);
        
        const prevEmploymentValid = !['employed', 'self-employed'].includes(formData.value.employmentStatus) || 
                                   parseFloat(formData.value.yearsEmployed) >= 2 || 
                                   (formData.value.prevEmployer && 
                                    formData.value.prevJobTitle && 
                                    formData.value.prevYearsEmployed);
        
        const financialValid = formData.value.annualIncome && 
                              formData.value.monthlyHousingPayment && 
                              formData.value.totalMonthlyDebt;
        
        // Collateral validation
        let collateralValid = true;
        if (formData.value.loanType === 'auto') {
          collateralValid = formData.value.vehicleMake && 
                           formData.value.vehicleModel && 
                           formData.value.vehicleYear && 
                           formData.value.vehiclePrice;
        } else if (['mortgage', 'home-equity'].includes(formData.value.loanType)) {
          collateralValid = formData.value.propertyAddress && 
                           formData.value.propertyCity && 
                           formData.value.propertyState && 
                           formData.value.propertyZip && 
                           formData.value.propertyType && 
                           formData.value.propertyValue;
          
          if (formData.value.loanType === 'home-equity') {
            collateralValid = collateralValid && formData.value.mortgageBalance;
          }
        }
        
        return employmentValid && employerValid && prevEmploymentValid && financialValid && collateralValid;
      case 4:
        return formData.value.termsAccepted && formData.value.electronicCommunication;
      default:
        return true;
    }
  });
  
  const nextStep = () => {
    if (currentStep.value < steps.length - 1 && canProceed.value) {
      currentStep.value++;
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--;
      window.scrollTo(0, 0);
    }
  };
  
  const submitApplication = () => {
    if (!formData.value.termsAccepted || !formData.value.electronicCommunication) return;
    
    isSubmitting.value = true;
    
    // Generate a random application ID
    applicationId.value = 'LOAN-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Simulate API call with a timeout
    setTimeout(() => {
      isSubmitting.value = false;
      showSuccessModal.value = true;
    }, 2000);
  };
  
  const returnToDashboard = () => {
    // In a real app, this would navigate back to the dashboard
    window.location.href = '/loans';
  };
  </script>
  
  <style scoped>
  .loan-application {
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
  
  .loan-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 768px) {
    .loan-options {
      grid-template-columns: 1fr;
    }
  }
  
  .loan-option {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 1.5rem;
  }
  
  .loan-option:hover {
    border-color: #93c5fd;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .loan-option.selected {
    border-color: #1e40af;
    background-color: #f0f7ff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .loan-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    flex-shrink: 0;
  }
  
  .loan-icon.blue {
    background-color: #dbeafe;
    color: #1e40af;
  }
  
  .loan-icon.green {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .loan-icon.purple {
    background-color: #ede9fe;
    color: #6d28d9;
  }
  
  .loan-icon.orange {
    background-color: #ffedd5;
    color: #c2410c;
  }
  
  .loan-icon.teal {
    background-color: #ccfbf1;
    color: #0f766e;
  }
  
  .icon-text {
    font-size: 1.5rem;
  }
  
  .loan-info {
    flex: 1;
  }
  
  .loan-info h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  
  .loan-description {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .loan-features {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .loan-features li {
    margin-bottom: 0.5rem;
    color: #4b5563;
    font-size: 0.875rem;
  }
  
  .loan-rates {
    font-size: 0.875rem;
    color: #1e40af;
    font-weight: 500;
  }
  
  .loan-details-form {
    background-color: #f9fafb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-top: 2rem;
    border: 1px solid #e5e7eb;
  }
  
  .loan-details-form h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1.5rem;
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
  
  .select-wrapper {
    position: relative;
  }
  
  .select-wrapper::after {
    content: '';
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #6b7280;
    pointer-events: none;
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
  
  .payment-estimate {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #f0f7ff;
    border-radius: 0.5rem;
    border: 1px solid #dbeafe;
    text-align: center;
  }
  
  .payment-estimate h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 0.75rem;
  }
  
  .estimate-amount {
    font-size: 2rem;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 0.75rem;
  }
  
  .estimate-note {
    font-size: 0.875rem;
    color: #4b5563;
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
  
  .previous-address,
  .previous-employment,
  .financial-info,
  .collateral-info {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .previous-address h3,
  .previous-employment h3,
  .financial-info h3,
  .collateral-info h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }
  
  .previous-address p,
  .previous-employment p {
    color: #6b7280;
    margin-bottom: 1.5rem;
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