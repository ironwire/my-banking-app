<template>
    <div class="registration-container">
      <div class="registration-header">
        <h1>创建您的账户</h1>
        <p>加入我们的网上银行平台，安全管理您的财务</p>
      </div>
  
      <div class="registration-progress">
        <div class="progress-step" :class="{ 'active': currentStep >= 1, 'completed': currentStep > 1 }">
          <div class="step-number">1</div>
          <div class="step-label">个人信息</div>
        </div>
        <div class="progress-connector"></div>
        <div class="progress-step" :class="{ 'active': currentStep >= 2, 'completed': currentStep > 2 }">
          <div class="step-number">2</div>
          <div class="step-label">联系方式</div>
        </div>
        <div class="progress-connector"></div>
        <div class="progress-step" :class="{ 'active': currentStep >= 3, 'completed': currentStep > 3 }">
          <div class="step-number">3</div>
          <div class="step-label">账户设置</div>
        </div>
      </div>
  
      <div class="registration-form-container">
        <form @submit.prevent="submitForm" class="registration-form">
          <!-- Step 1: Personal Information -->
          <div v-if="currentStep === 1" class="form-step">
            <h2>个人信息</h2>
            
            <div class="form-row">
              <div class="form-group">
                <label for="lastName">姓 <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="lastName" 
                  v-model="formData.lastName" 
                  required
                  :class="{ 'error': errors.lastName }"
                />
                <div v-if="errors.lastName" class="error-message">{{ errors.lastName }}</div>
              </div>
              
              <div class="form-group">
                <label for="firstName">名 <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="firstName" 
                  v-model="formData.firstName" 
                  required
                  :class="{ 'error': errors.firstName }"
                />
                <div v-if="errors.firstName" class="error-message">{{ errors.firstName }}</div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="dateOfBirth">出生日期 <span class="required">*</span></label>
                <input 
                  type="date" 
                  id="dateOfBirth" 
                  v-model="formData.dateOfBirth" 
                  required
                  :max="maxDateOfBirth"
                  :class="{ 'error': errors.dateOfBirth }"
                />
                <div v-if="errors.dateOfBirth" class="error-message">{{ errors.dateOfBirth }}</div>
              </div>
            </div>
          </div>
          
          <!-- Step 2: Contact Details -->
          <div v-if="currentStep === 2" class="form-step">
            <h2>联系方式</h2>
            
            <div class="form-section">
              <h3>地址信息</h3>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="province">省份/自治区/直辖市 <span class="required">*</span></label>
                  <select 
                    id="province" 
                    v-model="formData.province" 
                    required
                    :class="{ 'error': errors.province }"
                  >
                    <option value="">请选择省份</option>
                    <option v-for="province in provinces" :key="province.code" :value="province.code">{{ province.name }}</option>
                  </select>
                  <div v-if="errors.province" class="error-message">{{ errors.province }}</div>
                </div>
                
                <div class="form-group">
                  <label for="city">城市 <span class="required">*</span></label>
                  <input 
                    type="text" 
                    id="city" 
                    v-model="formData.city" 
                    required
                    :class="{ 'error': errors.city }"
                  />
                  <div v-if="errors.city" class="error-message">{{ errors.city }}</div>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="district">区/县 <span class="required">*</span></label>
                  <input 
                    type="text" 
                    id="district" 
                    v-model="formData.district" 
                    required
                    :class="{ 'error': errors.district }"
                  />
                  <div v-if="errors.district" class="error-message">{{ errors.district }}</div>
                </div>
                
                <div class="form-group">
                  <label for="zipCode">邮政编码 <span class="required">*</span></label>
                  <input 
                    type="text" 
                    id="zipCode" 
                    v-model="formData.zipCode" 
                    required
                    :class="{ 'error': errors.zipCode }"
                    placeholder="100000"
                    maxlength="6"
                  />
                  <div v-if="errors.zipCode" class="error-message">{{ errors.zipCode }}</div>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group full-width">
                  <label for="address">详细地址 <span class="required">*</span></label>
                  <input 
                    type="text" 
                    id="address" 
                    v-model="formData.address" 
                    required
                    :class="{ 'error': errors.address }"
                    placeholder="街道、小区、楼栋、单元、门牌号等"
                  />
                  <div v-if="errors.address" class="error-message">{{ errors.address }}</div>
                </div>
              </div>
            </div>
            
            <div class="form-section">
              <h3>联系信息</h3>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="email">电子邮箱 <span class="required">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="formData.email" 
                    required
                    :class="{ 'error': errors.email }"
                    placeholder="your.email@example.com"
                  />
                  <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
                </div>
                
                <div class="form-group">
                  <label for="confirmEmail">确认电子邮箱 <span class="required">*</span></label>
                  <input 
                    type="email" 
                    id="confirmEmail" 
                    v-model="formData.confirmEmail" 
                    required
                    :class="{ 'error': errors.confirmEmail }"
                    placeholder="your.email@example.com"
                  />
                  <div v-if="errors.confirmEmail" class="error-message">{{ errors.confirmEmail }}</div>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="phoneNumber">手机号码 <span class="required">*</span></label>
                  <input 
                    type="tel" 
                    id="phoneNumber" 
                    v-model="formData.phoneNumber" 
                    required
                    :class="{ 'error': errors.phoneNumber }"
                    placeholder="13812345678"
                  />
                  <div v-if="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Step 3: Account Setup -->
          <div v-if="currentStep === 3" class="form-step">
            <h2>账户设置</h2>
            
            <div class="form-section">
              <h3>账户类型</h3>
              
              <div class="form-row">
                <div class="form-group full-width">
                  <label>选择账户类型 <span class="required">*</span></label>
                  <div class="account-type-options">
                    <div 
                      v-for="type in accountTypes" 
                      :key="type.id" 
                      class="account-type-option" 
                      :class="{ 'selected': formData.accountType === type.id }"
                      @click="formData.accountType = type.id"
                    >
                      <div class="account-type-icon">{{ type.icon }}</div>
                      <div class="account-type-details">
                        <h4>{{ type.name }}</h4>
                        <p>{{ type.description }}</p>
                      </div>
                      <div class="account-type-radio">
                        <input 
                          type="radio" 
                          :id="'accountType-' + type.id" 
                          :value="type.id" 
                          v-model="formData.accountType" 
                          required
                        />
                        <span class="radio-checkmark"></span>
                      </div>
                    </div>
                  </div>
                  <div v-if="errors.accountType" class="error-message">{{ errors.accountType }}</div>
                </div>
              </div>
            </div>
            
            <div class="form-section">
              <h3>安全凭证</h3>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="password">密码 <span class="required">*</span></label>
                  <input 
                    type="password" 
                    id="password" 
                    v-model="formData.password" 
                    required
                    :class="{ 'error': errors.password }"
                  />
                  <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
                  <div class="password-strength" :class="passwordStrength">
                    <div class="strength-bar"></div>
                    <div class="strength-bar"></div>
                    <div class="strength-bar"></div>
                    <div class="strength-bar"></div>
                    <span class="strength-text">{{ passwordStrengthTextChinese }}</span>
                  </div>
                  <div class="field-note">
                    密码必须至少8个字符，包含至少一个大写字母、一个小写字母、一个数字和一个特殊字符。
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="confirmPassword">确认密码 <span class="required">*</span></label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    v-model="formData.confirmPassword" 
                    required
                    :class="{ 'error': errors.confirmPassword }"
                  />
                  <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
                </div>
              </div>
            </div>
            
            <div class="form-section">
              <h3>条款与协议</h3>
              
              <div class="form-row">
                <div class="form-group full-width">
                  <div class="terms-container">
                    <div class="terms-content">
                      <h4>服务条款</h4>
                      <p>创建账户即表示您同意我们的服务条款、隐私政策和电子通信政策。您也同意接收我们的电子通信。</p>
                      <p>本协议构成您与我们银行之间的完整协议，并管理您对我们网上银行服务的使用。</p>
                      <p>您理解，通过勾选下面的复选框，您提供的电子签名与手写签名具有相同的法律效力。</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group full-width">
                  <label class="checkbox-label terms-checkbox">
                    <input 
                      type="checkbox" 
                      v-model="formData.termsAgreed" 
                      required
                      :class="{ 'error': errors.termsAgreed }"
                    />
                    <span class="checkbox-text">
                      我已阅读并同意服务条款、隐私政策和电子通信政策 <span class="required">*</span>
                    </span>
                  </label>
                  <div v-if="errors.termsAgreed" class="error-message">{{ errors.termsAgreed }}</div>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group full-width">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="formData.marketingOptIn" />
                    <span class="checkbox-text">
                      我愿意接收银行的产品、服务和促销信息
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Form Navigation -->
          <div class="form-navigation">
            <button 
              type="button" 
              class="btn-back" 
              v-if="currentStep > 1" 
              @click="prevStep"
            >
              上一步
            </button>
            
            <button 
              type="button" 
              class="btn-next" 
              v-if="currentStep < 3" 
              @click="nextStep"
            >
              下一步
            </button>
            
            <button 
              type="submit" 
              class="btn-submit" 
              v-if="currentStep === 3"
            >
              创建账户
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, reactive } from 'vue';
  
  // Current step in the registration process
  const currentStep = ref(1);
  
  // Get today's date for date input min/max values
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate max date of birth (must be at least 18 years old)
  const maxDateOfBirth = computed(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split('T')[0];
  });
  
  // Form data - aligned with the database schema but adapted for Chinese market
  const formData = reactive({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    
    // Contact Details
    province: '',
    city: '',
    district: '',
    address: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
    confirmEmail: '',
    
    // Account Setup
    accountType: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
    marketingOptIn: false
  });
  
  // Validation errors
  const errors = reactive({});
  
  // Account types
  const accountTypes = [
    {
      id: 'checking',
      name: '活期账户',
      description: '日常银行业务，无最低余额要求，无月费。',
      icon: '💳'
    },
    {
      id: 'savings',
      name: '高收益储蓄账户',
      description: '获得有竞争力的储蓄利率。',
      icon: '💰'
    },
    {
      id: 'money-market',
      name: '货币市场账户',
      description: '更高的利率，具有支票开具权限。',
      icon: '📈'
    },
    {
      id: 'cd',
      name: '定期存款',
      description: '固定期限，保证收益。',
      icon: '🔒'
    }
  ];
  
  // Chinese Provinces
  const provinces = [
    { code: 'BJ', name: '北京市' },
    { code: 'TJ', name: '天津市' },
    { code: 'HE', name: '河北省' },
    { code: 'SX', name: '山西省' },
    { code: 'NM', name: '内蒙古自治区' },
    { code: 'LN', name: '辽宁省' },
    { code: 'JL', name: '吉林省' },
    { code: 'HL', name: '黑龙江省' },
    { code: 'SH', name: '上海市' },
    { code: 'JS', name: '江苏省' },
    { code: 'ZJ', name: '浙江省' },
    { code: 'AH', name: '安徽省' },
    { code: 'FJ', name: '福建省' },
    { code: 'JX', name: '江西省' },
    { code: 'SD', name: '山东省' },
    { code: 'HA', name: '河南省' },
    { code: 'HB', name: '湖北省' },
    { code: 'HN', name: '湖南省' },
    { code: 'GD', name: '广东省' },
    { code: 'GX', name: '广西壮族自治区' },
    { code: 'HI', name: '海南省' },
    { code: 'CQ', name: '重庆市' },
    { code: 'SC', name: '四川省' },
    { code: 'GZ', name: '贵州省' },
    { code: 'YN', name: '云南省' },
    { code: 'XZ', name: '西藏自治区' },
    { code: 'SN', name: '陕西省' },
    { code: 'GS', name: '甘肃省' },
    { code: 'QH', name: '青海省' },
    { code: 'NX', name: '宁夏回族自治区' },
    { code: 'XJ', name: '新疆维吾尔自治区' },
    { code: 'HK', name: '香港特别行政区' },
    { code: 'MO', name: '澳门特别行政区' },
    { code: 'TW', name: '台湾省' }
  ];
  
  // Password strength computation
  const passwordStrength = computed(() => {
    if (!formData.password) return '';
    
    let strength = 0;
    
    // Length check
    if (formData.password.length >= 8) strength += 1;
    
    // Uppercase check
    if (/[A-Z]/.test(formData.password)) strength += 1;
    
    // Lowercase check
    if (/[a-z]/.test(formData.password)) strength += 1;
    
    // Number check
    if (/[0-9]/.test(formData.password)) strength += 1;
    
    // Special character check
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
    
    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'medium';
    if (strength <= 4) return 'strong';
    return 'very-strong';
  });
  
  const passwordStrengthTextChinese = computed(() => {
    switch (passwordStrength.value) {
      case 'weak': return '弱';
      case 'medium': return '中';
      case 'strong': return '强';
      case 'very-strong': return '非常强';
      default: return '';
    }
  });
  
  // Form navigation methods
  const validateCurrentStep = () => {
    errors.value = {};
    let isValid = true;
    
    // Step 1 validation
    if (currentStep.value === 1) {
      if (!formData.firstName) {
        errors.firstName = '名字是必填项';
        isValid = false;
      }
      
      if (!formData.lastName) {
        errors.lastName = '姓氏是必填项';
        isValid = false;
      }
      
      if (!formData.dateOfBirth) {
        errors.dateOfBirth = '出生日期是必填项';
        isValid = false;
      } else {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (age < 18) {
          errors.dateOfBirth = '您必须年满18岁';
          isValid = false;
        }
      }
    }
    
    // Step 2 validation
    else if (currentStep.value === 2) {
      if (!formData.province) {
        errors.province = '省份是必填项';
        isValid = false;
      }
      
      if (!formData.city) {
        errors.city = '城市是必填项';
        isValid = false;
      }
      
      if (!formData.district) {
        errors.district = '区/县是必填项';
        isValid = false;
      }
      
      if (!formData.address) {
        errors.address = '详细地址是必填项';
        isValid = false;
      }
      
      if (!formData.zipCode) {
        errors.zipCode = '邮政编码是必填项';
        isValid = false;
      } else if (!/^\d{6}$/.test(formData.zipCode)) {
        errors.zipCode = '请输入有效的邮政编码（6位数字）';
        isValid = false;
      }
      
      if (!formData.email) {
        errors.email = '电子邮箱是必填项';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = '请输入有效的电子邮箱地址';
        isValid = false;
      }
      
      if (!formData.confirmEmail) {
        errors.confirmEmail = '请确认您的电子邮箱';
        isValid = false;
      } else if (formData.email !== formData.confirmEmail) {
        errors.confirmEmail = '两次输入的电子邮箱不一致';
        isValid = false;
      }
      
      if (!formData.phoneNumber) {
        errors.phoneNumber = '手机号码是必填项';
        isValid = false;
      } else if (!/^1[3-9]\d{9}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = '请输入有效的手机号码';
        isValid = false;
      }
    }
    
    // Step 3 validation
    else if (currentStep.value === 3) {
      if (!formData.accountType) {
        errors.accountType = '请选择账户类型';
        isValid = false;
      }
      
      if (!formData.password) {
        errors.password = '密码是必填项';
        isValid = false;
      } else if (formData.password.length < 8) {
        errors.password = '密码必须至少8个字符';
        isValid = false;
      } else if (!/[A-Z]/.test(formData.password)) {
        errors.password = '密码必须包含至少一个大写字母';
        isValid = false;
      } else if (!/[a-z]/.test(formData.password)) {
        errors.password = '密码必须包含至少一个小写字母';
        isValid = false;
      } else if (!/[0-9]/.test(formData.password)) {
        errors.password = '密码必须包含至少一个数字';
        isValid = false;
      } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
        errors.password = '密码必须包含至少一个特殊字符';
        isValid = false;
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = '请确认您的密码';
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = '两次输入的密码不一致';
        isValid = false;
      }
      
      if (!formData.termsAgreed) {
        errors.termsAgreed = '您必须同意服务条款';
        isValid = false;
      }
    }
    
    return isValid;
  };
  
  const nextStep = () => {
    if (validateCurrentStep()) {
      currentStep.value++;
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    currentStep.value--;
    window.scrollTo(0, 0);
  };
  
  const submitForm = () => {
    if (validateCurrentStep()) {
      // 在实际应用中，这里会：
      // 1. 在发送到服务器之前对密码进行哈希处理
      // 2. 格式化数据以匹配数据库架构
      // 3. 通过API将数据发送到服务器
      
      const customerData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        address: `${formData.province} ${formData.city} ${formData.district} ${formData.address}`,
        city: formData.city,
        state: formData.province, // 使用省份代码作为state字段
        zip_code: formData.zipCode,
        phone_number: formData.phoneNumber,
        email: formData.email,
        password: formData.password, // 在服务器端会进行哈希处理
        // keycloak_id 将在身份验证设置期间生成
        // is_active 将默认设置为1
        // created_at 和 updated_at 将由数据库设置
      };
      
      console.log('表单已提交:', customerData);
      alert('账户注册成功提交！');
      // 重定向到成功页面或登录页面
    }
  };
  </script>
  
  <style scoped>
  .registration-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #333;
  }
  
  .registration-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .registration-header h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 0.5rem;
  }
  
  .registration-header p {
    font-size: 1.125rem;
    color: #555;
  }
  
  /* Progress Indicator */
  .registration-progress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    position: relative;
  }
  
  .progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  
  .step-number {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: #e5e7eb;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
  }
  
  .step-label {
    font-size: 0.875rem;
    color: #6b7280;
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .progress-connector {
    flex: 1;
    height: 2px;
    background-color: #e5e7eb;
    position: relative;
    z-index: 0;
  }
  
  .progress-step.active .step-number {
    background-color: #1e40af;
    color: white;
  }
  
  .progress-step.active .step-label {
    color: #1e40af;
    font-weight: 500;
  }
  
  .progress-step.completed .step-number {
    background-color: #4caf50;
    color: white;
  }
  
  /* Form Container */
  .registration-form-container {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .registration-form {
    padding: 2rem;
  }
  
  .form-step h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 1.5rem;
  }
  
  .form-section {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .form-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  .form-section h3 {
    font-size: 1.25rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .form-row:last-child {
    margin-bottom: 0;
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
  .form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: border-color 0.2s;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    border-color: #1e40af;
    outline: none;
    box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.1);
  }
  
  .form-group input.error,
  .form-group select.error {
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
  
  .field-note {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }
  
  /* Checkbox Styles */
  .checkbox-label {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
  }
  
  .checkbox-label input[type="checkbox"] {
    width: auto;
    margin-right: 0.5rem;
    margin-top: 0.25rem;
  }
  
  .checkbox-text {
    font-size: 0.875rem;
    color: #333;
  }
  
  /* Account Type Selection */
  .account-type-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1rem;
  }
  
  .account-type-option {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .account-type-option:hover {
    border-color: #1e40af;
    background-color: #f0f7ff;
  }
  
  .account-type-option.selected {
    border-color: #1e40af;
    background-color: #f0f7ff;
  }
  
  .account-type-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
  
  .account-type-details {
    flex: 1;
  }
  
  .account-type-details h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .account-type-details p {
    font-size: 0.875rem;
    color: #555;
  }
  
  .account-type-radio {
    margin-left: 1rem;
  }
  
  .account-type-radio input {
    width: auto;
  }
  
  /* Password Strength Indicator */
  .password-strength {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
  }
  
  .strength-bar {
    height: 4px;
    width: 25%;
    margin-right: 2px;
    background-color: #e5e7eb;
    border-radius: 2px;
  }
  
  .weak .strength-bar:nth-child(1) {
    background-color: #ef4444;
  }
  
  .medium .strength-bar:nth-child(1),
  .medium .strength-bar:nth-child(2) {
    background-color: #f59e0b;
  }
  
  .strong .strength-bar:nth-child(1),
  .strong .strength-bar:nth-child(2),
  .strong .strength-bar:nth-child(3) {
    background-color: #10b981;
  }
  
  .very-strong .strength-bar {
    background-color: #10b981;
  }
  
  .strength-text {
    margin-left: 0.5rem;
    font-size: 0.75rem;
  }
  
  .weak .strength-text {
    color: #ef4444;
  }
  
  .medium .strength-text {
    color: #f59e0b;
  }
  
  .strong .strength-text,
  .very-strong .strength-text {
    color: #10b981;
  }
  
  /* Terms Container */
  .terms-container {
    max-height: 150px;
    overflow-y: auto;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
  }
  
  .terms-content {
    padding: 1rem;
  }
  
  .terms-content h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .terms-content p {
    font-size: 0.875rem;
    color: #555;
    margin-bottom: 0.5rem;
  }
  
  .terms-checkbox {
    margin-bottom: 1rem;
  }
  
  /* Form Navigation */
  .form-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .btn-back,
  .btn-next,
  .btn-submit {
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .btn-back {
    background-color: white;
    color: #555;
    border: 1px solid #d1d5db;
  }
  
  .btn-back:hover {
    background-color: #f9fafb;
  }
  
  .btn-next,
  .btn-submit {
    background-color: #1e40af;
    color: white;
    border: none;
  }
  
  .btn-next:hover,
  .btn-submit:hover {
    background-color: #1e3a8a;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .registration-progress {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .progress-connector {
      display: none;
    }
    
    .progress-step {
      flex-direction: row;
      width: 100%;
    }
    
    .step-number {
      margin-bottom: 0;
      margin-right: 0.5rem;
    }
    
    .account-type-options {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .registration-form {
      padding: 1.5rem;
    }
    
    .form-group {
      min-width: 100%;
    }
  }
  </style>