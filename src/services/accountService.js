import api from './api';
import authService from './authService';

const BASE_URL = 'http://localhost:8080/api/accounts';

export const accountService = {
  // Get all accounts for the current user
  getAccounts() {
    return api.get(`${BASE_URL}`);
  },

  // Get account details by ID
  getAccountById(accountId) {
    return api.get(`${BASE_URL}/${accountId}`);
  },

  // Get account balance
  getAccountBalance(accountId) {
    return api.get(`${BASE_URL}/${accountId}/balance`);
  },

  // Get account transactions
  getAccountTransactions(accountId, params) {
    return api.get(`${BASE_URL}/${accountId}/transactions`, { params });
  },

  // Transfer money between accounts
  transferMoney(transferData) {
    return api.post(`${BASE_URL}/transfer`, transferData);
  },

  // Open new account
  openNewAccount(accountData) {
    return api.post(`${BASE_URL}/open`, accountData);
  },
  
  // Get all account balances for a specific user
  getUserAccountBalances(userId) {
    const token = authService.getToken();
    if (!token) {
      return Promise.reject(new Error('No authentication token found'));
    }
    
    return fetch(`${BASE_URL}/user/${userId}/balances`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch account balances: ${response.status}`);
      }
      console.log(response)
      return response.json();
    });
  },
};

export default accountService;
