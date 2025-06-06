import axios from 'axios';
import authService from './authService';

// Define API URLs
const API_URL = 'http://localhost:8080/api';
const CARDS_API_URL = 'http://localhost:8081/api';

// Create axios instance with default config
const cardAxios = axios.create({
  baseURL: CARDS_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token
cardAxios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    
    // Log the token (masked for security) for debugging
    if (token) {
      console.log(`Using token: ${token.substring(0, 10)}...${token.substring(token.length - 5)}`);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No authentication token available');
    }
    
    // Log the request for debugging
    console.log('Card API Request:', {
      method: config.method.toUpperCase(),
      url: config.baseURL + config.url,
      params: config.params,
      headers: {
        ...config.headers,
        Authorization: config.headers.Authorization ? 
          `Bearer ${config.headers.Authorization.split(' ')[1].substring(0, 10)}...` : 
          'None'
      }
    });
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
cardAxios.interceptors.response.use(
  (response) => {
    console.log('Card API Response:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Card API error response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
      
      if (error.response.status === 401) {
        // Token expired, redirect to login
        console.warn('Authentication token expired or invalid');
        authService.logout();
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        console.error('Forbidden: You do not have permission to access this resource');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Card API no response:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Card API request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

const cardService = {
  // Get all cards for the current user
  async getUserCards() {
    try {
      // Try with different endpoint variations
      try {
        // Make request without userId parameter
        const response = await cardAxios.get('/cards/user/cards');
        return response;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Try alternative endpoint
          console.log('Trying alternative endpoint...');
          const altResponse = await cardAxios.get('/user/cards');
          return altResponse;
        }
        throw error;
      }
    } catch (error) {
      console.error('Error fetching user cards:', error);
      
      // For development/testing, return mock data if the API fails
      console.log('Returning mock card data for development');
      return {
        data: [
          {
            id: 1,
            cardId: 'card123',
            cardNumber: '4111 1111 1111 1111',
            cardTypeName: '信用卡',
            cardName: '银联信用卡',
            expiryMonth: 12,
            expiryYear: 2025,
            balance: 0,
            limitAmount: 50000,
            availableCredit: 45000
          },
          {
            id: 2,
            cardId: 'card456',
            cardNumber: '6222 0000 0000 0000',
            cardTypeName: '借记卡',
            cardName: '银联借记卡',
            expiryMonth: 6,
            expiryYear: 2026,
            balance: 12500,
            limitAmount: 0,
            availableCredit: 0
          }
        ]
      };
    }
  },
  
  // Get recent card transactions
  async getRecentCardTransactions(phoneNumber, date) {
    try {
      const response = await cardAxios.get('/cards/transactions', {
        params: { phoneNumber, date }
      });
      return response;
    } catch (error) {
      console.error('Error fetching card transactions:', error);
      
      // For development/testing, return mock data
      return {
        data: [
          { id: 1, date: '2023-05-01', description: '超市购物', amount: -120.50, type: 'debit' },
          { id: 2, date: '2023-05-03', description: '餐厅消费', amount: -85.00, type: 'debit' },
          { id: 3, date: '2023-05-05', description: '工资入账', amount: 5000.00, type: 'credit' }
        ]
      };
    }
  },
  
  // Apply for a new card
  async applyForCard(cardData) {
    try {
      const response = await cardAxios.post('/cards/apply', cardData);
      return response;
    } catch (error) {
      console.error('Error applying for card:', error);
      throw error;
    }
  }
};

export default cardService;

 
