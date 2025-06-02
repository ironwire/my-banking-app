import axios from 'axios'
import authService from './authService'

const API_URL = 'http://localhost:8082/api/myloans'

// Create axios instance with auth headers
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor to add auth token
apiClient.interceptors.request.use(
  config => {
    const token = authService.getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export const loanService = {
  // Get all loans for the current customer
  getLoans() {
    const user = this.getUserFromToken()
    if (!user || !user.id) {
      return Promise.reject(new Error('User ID not found'))
    }
    
    return apiClient.get(`/loans/customers/${user.id}`)
  },
  
  // Get loan details by ID
  getLoanById(loanId) {
    return apiClient.get(`/loans/${loanId}`)
  },
  
  // Make a loan payment
  makePayment(loanId, paymentData) {
    return apiClient.post(`/loans/${loanId}/payments`, paymentData)
  },
  
  // Apply for a new loan
  applyForLoan(loanData) {
    return apiClient.post('/loan-applications', loanData)
  },
  
  // Helper method to extract user ID from token
  getUserFromToken() {
    const token = localStorage.getItem('token')
    if (!token) return null
    
    try {
      const tokenParts = token.split('.')
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]))
        
        // Extract just the numeric ID from the id field
        let userId = payload.id || payload.sub || ''
        
        // If the ID contains a comma, extract just the number part
        if (typeof userId === 'string' && userId.includes(',')) {
          userId = userId.split(',')[0].trim()
        }
        
        console.log('Extracted user ID:', userId)
        
        return {
          id: userId
        }
      }
    } catch (error) {
      console.error('Error extracting user data from token:', error)
    }
    return null
  }
}; 
