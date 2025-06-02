import api from './api';

const BASE_URL = 'http://localhost:8083/api/settings';

export const settingService = {
  // Get user profile
  getUserProfile() {
    return api.get(`${BASE_URL}/profile`);
  },

  // Update user profile
  updateUserProfile(profileData) {
    return api.put(`${BASE_URL}/profile`, profileData);
  },

  // Update notification preferences
  updateNotificationPreferences(preferences) {
    return api.put(`${BASE_URL}/notifications`, preferences);
  },

  // Get notification preferences
  getNotificationPreferences() {
    return api.get(`${BASE_URL}/notifications`);
  },

  // Update security settings
  updateSecuritySettings(securityData) {
    return api.put(`${BASE_URL}/security`, securityData);
  },

  // Change password
  changePassword(passwordData) {
    return api.post(`${BASE_URL}/change-password`, passwordData);
  },

  // Update contact information
  updateContactInfo(contactData) {
    return api.put(`${BASE_URL}/contact`, contactData);
  }
}; 