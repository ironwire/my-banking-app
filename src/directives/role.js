import authService from '../services/authService'

export const role = {
  mounted(el, binding) {
    const { value } = binding
    
    if (value) {
      const hasPermission = Array.isArray(value)
        ? authService.hasAnyRole(value)
        : authService.hasRole(value)
      
      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    }
  }
} 