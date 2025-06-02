import api from './api';

const BASE_URL = 'http://localhost:8080/api/accounts/public';

export const authService = {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post(`${BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await api.post(`${BASE_URL}/login`, credentials);
      // Store the token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Authentication failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Request failed');
    }
  }
}; 