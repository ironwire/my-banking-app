import api from './api';

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

  // Close account
  closeAccount(accountId) {
    return api.post(`${BASE_URL}/${accountId}/close`);
  }
}; 