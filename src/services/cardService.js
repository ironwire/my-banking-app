import axios from 'axios';
import authService from './authService';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:8080/api';

const cardService = {
  // Get all cards for the current user
  async getUserCards() {
    const token = authService.getToken();
    return axios.get(`${API_URL}/cards`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  
  // Get recent card transactions
  async getRecentCardTransactions(phoneNumber, date) {
    try {
      const token = authService.getToken();
      return axios.get(`${API_URL}/cards/transactions`, {
        params: { phoneNumber, date },
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error fetching card transactions:', error);
      // Return mock data for development
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
    const token = authService.getToken();
    return axios.post(`${API_URL}/cards/apply`, cardData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

 
