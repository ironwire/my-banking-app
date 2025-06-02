import api from './api';

const BASE_URL = 'http://localhost:8085/api/bankdesk';

export const bankDeskService = {
  // Get available branches
  getBranches() {
    return api.get(`${BASE_URL}/branches`);
  },

  // Get branch details
  getBranchDetails(branchId) {
    return api.get(`${BASE_URL}/branches/${branchId}`);
  },

  // Schedule appointment
  scheduleAppointment(appointmentData) {
    return api.post(`${BASE_URL}/appointments`, appointmentData);
  },

  // Get user appointments
  getUserAppointments() {
    return api.get(`${BASE_URL}/appointments`);
  },

  // Cancel appointment
  cancelAppointment(appointmentId) {
    return api.delete(`${BASE_URL}/appointments/${appointmentId}`);
  },

  // Get branch services
  getBranchServices(branchId) {
    return api.get(`${BASE_URL}/branches/${branchId}/services`);
  },

  // Get branch hours
  getBranchHours(branchId) {
    return api.get(`${BASE_URL}/branches/${branchId}/hours`);
  }
}; 