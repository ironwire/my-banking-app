import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { role } from './directives/role'

const app = createApp(App)

// Register the role directive
app.directive('role', role)

// Add global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err);
  console.error('Error occurred in component:', instance);
  console.error('Error info:', info);
}

app.use(router)
app.mount('#app')
