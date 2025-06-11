import axios from 'axios';
import authService from './authService';

// Create axios instance with base URL
const loanAxios = axios.create({
  baseURL: 'http://localhost:8082/api/myloans'
});

// Add request interceptor to include token
loanAxios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to extract user ID from token
const getUserIdFromToken = () => {
  const token = authService.getToken();
  if (!token) return null;
  
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      
      // Extract just the numeric ID from the sub field
      let userId = payload.id || payload.sub || '';
      
      // If the ID contains a comma (like in "7, sun@qq.com"), extract just the number part
      if (typeof userId === 'string' && userId.includes(',')) {
        userId = userId.split(',')[0].trim();
      }
      
      return userId;
    }
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
  }
  return null;
};

// Loan service methods
export const loanService = {
  // Get all loans for the current user
  async getLoans() {
    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        throw new Error('Unable to extract user ID from token');
      }
      
      console.log('Fetching loans for user ID:', userId);
      const response = await loanAxios.get(`/loans/customers/${userId}`);
      return response;
    } catch (error) {
      console.error('Error fetching loans:', error);
      
      // For development/testing, return mock data if the API fails
      return {
        data: [
          {
            id: 1,
            loanTypeName: '房贷',
            status: '正常',
            outstandingAmount: 245000,
            interestRate: 3.25,
            monthlyPayment: 1250,
            startDate: '2022-01-15',
            principalAmount: 300000,
            endDate: '2052-01-15',
            paymentFrequency: '月付'
          },
          {
            id: 2,
            loanTypeName: '汽车贷款',
            status: '正常',
            outstandingAmount: 18500,
            interestRate: 4.5,
            monthlyPayment: 350,
            startDate: '2023-03-10',
            principalAmount: 25000,
            endDate: '2028-03-10',
            paymentFrequency: '月付'
          }
        ]
      };
    }
  },
  
  // Get loan details by ID
  async getLoanById(loanId) {
    try {
      const response = await loanAxios.get(`/loans/${loanId}`);
      return response;
    } catch (error) {
      console.error(`Error fetching loan with ID ${loanId}:`, error);
      throw error;
    }
  },
  
  // Get loan types
  async getLoanTypes() {
    try {
      const response = await loanAxios.get('/loan-types');
      return response;
    } catch (error) {
      console.error('Error fetching loan types:', error);
      throw error;
    }
  }
};

export default loanService; 
