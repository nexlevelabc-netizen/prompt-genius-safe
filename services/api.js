// src/services/api.js
import axios from 'axios';

// Use your actual backend Railway URL from .env file
const API_URL = import.meta.env.VITE_API_URL || 'https://patient-nurturing-production-903c.up.railway.app';

// Debug logging
console.log('=== API Configuration Debug ===');
console.log('VITE_API_URL from env:', import.meta.env.VITE_API_URL);
console.log('Full backend URL:', API_URL);
console.log('=============================');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for AI requests
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error Full Details:', error);
    console.error('Error config:', error.config);
    console.error('Error URL attempted:', error.config?.baseURL + error.config?.url);
    
    // Better error messages
    let userMessage = 'Network error. Please check your connection.';
    let details = '';
    
    if (error.code === 'ECONNABORTED') {
      userMessage = 'Request timeout. The server is taking too long to respond.';
      details = 'Try again in a moment.';
    } else if (error.response) {
      // Server responded with error status
      userMessage = `Server error: ${error.response.status}`;
      details = error.response.data?.error || 'Please try again.';
    } else if (error.request) {
      // No response received
      userMessage = 'Cannot connect to backend server.';
      details = `Make sure ${API_URL} is running.`;
    }
    
    console.log('User-friendly error:', { userMessage, details });
    
    return Promise.reject({
      message: userMessage,
      details: details,
      originalError: error
    });
  }
);

// Template API calls
export const templateAPI = {
  // Health check
  healthCheck: () => api.get('/api/health'),
  
  // Get all templates
  getTemplates: () => api.get('/api/templates'),
  
  // Generate prompt from template
  generatePrompt: (templateId, variables) => 
    api.post('/api/generate/premium', { templateId, variables }),
  
  // Generate AI content
  generateAI: (prompt, provider = 'openai') => 
    api.post('/api/ai/generate', { prompt, provider }),
  
  // Compare AI providers
  compareAI: (prompt) => 
    api.post('/api/ai/compare', { prompt }),
  
  // Complete workflow
  completeWorkflow: (templateId, variables, provider = 'openai') => 
    api.post('/api/generate/complete', { templateId, variables, provider }),
};

// Test connection function
export const testConnection = async () => {
  try {
    console.log('🔍 Testing connection to:', API_URL);
    const response = await api.get('/api/health');
    console.log('✅ Connection successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Connection failed:', error);
    return { 
      success: false, 
      error: error.message || 'Connection failed',
      url: API_URL
    };
  }
};

export default api;
