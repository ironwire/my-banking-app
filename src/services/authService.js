// AuthService.js - A service for handling authentication operations

/**
 * Gets the headers with authentication token
 * @returns {Object} Headers object with authentication token
 */
function getAuthHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
}

/**
 * Registers a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Registration response
 */
async function register(userData) {
    console.log('Sending registration request with data:', userData);
    
    try {
      const response = await fetch('http://localhost:8080/api/accounts/public/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      console.log('Registration response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || `Registration failed: ${response.status}`);
        } catch (e) {
          throw new Error(`Registration failed: ${response.status} - ${errorText.substring(0, 100)}`);
        }
      }
      
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
}

/**
 * Logs in a user
 * @param {Object} credentials - User login credentials
 * @returns {Promise<Object>} - Login response with JWT token
 */
async function login(credentials) {
    try {
      const response = await fetch('http://localhost:8080/api/accounts/public/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Login failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Store the token and user data in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user || {}));
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
}

/**
 * Makes an authenticated request to the API
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - API response
 */
async function authenticatedFetch(url, options = {}) {
  const headers = getAuthHeaders();
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid
      logout();
      throw new Error('Session expired. Please login again.');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Logs out the current user
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

/**
 * Gets the current authentication token
 * @returns {string|null} - The JWT token or null if not logged in
 */
function getToken() {
    return localStorage.getItem('token');
}

/**
 * Checks if the user is authenticated
 * @returns {boolean} - True if the user is authenticated
 */
function isAuthenticated() {
    return !!getToken();
}

/**
 * Gets recent card transactions for the authenticated user
 * @param {string} date - The date to get transactions for
 * @returns {Promise<Object>} - Transaction data
 */
async function getRecentCardTransactions(date) {
  const token = getToken();
  if (!token) {
    throw new Error('Authentication token not found');
  }
  
  // Try to get user data from localStorage
  let user = JSON.parse(localStorage.getItem('user') || '{}');
  let phoneNumber = user.phoneNumber;
  
  // If phone number is not in user data, try to extract from token
  if (!phoneNumber) {
    try {
      // JWT tokens are in format: header.payload.signature
      // We need the payload part which is the second part
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        phoneNumber = payload.phoneNumber || payload.phone || '';
        
        // If found in token but not in user data, update user data
        if (phoneNumber && !user.phoneNumber) {
          user.phoneNumber = phoneNumber;
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
    } catch (tokenError) {
      console.error('Error extracting data from token:', tokenError);
    }
  }
  
  // If still no phone number, use a default for development
  if (!phoneNumber) {
    console.warn('No phone number found, using default for development');
    phoneNumber = '13800138000'; // Default phone number for development
  }
  
  console.log(`Fetching transactions for phone: ${phoneNumber}, date: ${date}`);
  console.log(`Using token: ${token.substring(0, 20)}...`);
  
  try {
    const response = await fetch(`http://localhost:8081/api/cards/transactions/recent-transactions?phoneNumber=${phoneNumber}&date=${date}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders()
      }
    });
    
    console.log(`Transaction API response status: ${response.status}`);
    
    if (!response.ok) {
      // Handle different error types properly
      if (response.status === 401) {
        // Token expired or invalid
        logout();
        throw new Error('Session expired. Please login again.');
      } else if (response.status === 403) {
        // Forbidden - token might be invalid or user doesn't have permission
        const errorText = await response.text().catch(() => 'Forbidden');
        console.error('403 Forbidden error:', errorText);
        throw new Error(`Access forbidden: ${errorText}`);
      } else {
        // Other errors
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`Failed to fetch transactions: ${response.status} - ${errorText}`);
      }
    }
    
    const data = await response.json();
    console.log('Transaction data received:', data);
    
    // Handle case where API returns object with numbered keys instead of array
    if (data && typeof data === 'object' && data.length !== undefined) {
      // Convert object with numbered keys to proper array
      const transactionsArray = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i]) {
          transactionsArray.push(data[i]);
        }
      }
      console.log('Converted to array:', transactionsArray);
      return { data: transactionsArray };
    }
    
    return data;
    
  } catch (error) {
    console.error('Error fetching card transactions:', error);
    
    // Only return mock data for network errors, not auth errors
    if (error.message.includes('Session expired') || 
        error.message.includes('Access forbidden') || 
        error.message.includes('Authentication token not found')) {
      // Re-throw authentication errors so the UI can handle them properly
      throw error;
    }
    
    // For network errors or other non-auth issues, we can return mock data
    console.warn('Returning mock data due to network error');
    return {
      data: [
        { id: 1, date: '2023-05-01', description: '超市购物', amount: -120.50, type: 'debit', merchantName: '全家超市', time: '14:30', cardType: '借记卡' },
        { id: 2, date: '2023-05-03', description: '餐厅消费', amount: -85.00, type: 'debit', merchantName: '小南国餐厅', time: '19:45', cardType: '信用卡' },
        { id: 3, date: '2023-05-05', description: '工资入账', amount: 5000.00, type: 'credit', merchantName: '工资转账', time: '09:15', cardType: '借记卡' }
      ]
    };
  }
}

// Add these new methods for role-based authorization
const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const base64 = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padding = base64.length % 4;
      const paddedBase64 = padding ? base64 + '='.repeat(4 - padding) : base64;
      const payload = JSON.parse(decodeURIComponent(escape(atob(paddedBase64))));
      return payload.role || null;
    }
  } catch (error) {
    console.error('Error extracting role from token:', error);
  }
  return null;
};

const hasRole = (requiredRole) => {
  const userRole = getUserRole();
  if (!userRole) return false;

  // Define role hierarchy
  const roleHierarchy = {
    'ADMIN': 3,
    'MANAGER': 2,
    'USER': 1
  };

  // Check if user's role has sufficient privileges
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

const hasAnyRole = (roles) => {
  const userRole = getUserRole();
  return roles.includes(userRole);
};

const hasAllRoles = (roles) => {
  const userRole = getUserRole();
  return roles.every(role => hasRole(role));
};

// Get unassigned users
async function getUnassignedUsers() {
  try {
    const response = await fetch('http://localhost:8085/api/bankdesk/users/unassigned', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch unassigned users');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching unassigned users:', error);
    throw error;
  }
}

const authService = {
    register,
    login,
    logout,
    getToken,
    isAuthenticated,
    authenticatedFetch,
    getAuthHeaders,
    getRecentCardTransactions,
    getUserRole,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    getUnassignedUsers
};

export default authService;