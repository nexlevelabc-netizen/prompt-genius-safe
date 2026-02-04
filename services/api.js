// src/services/api.js
import axios from 'axios';

// IMPORTANT: Use your actual backend Railway URL
// This should match the URL you see in your backend service on Railway
const API_URL = import.meta.env.VITE_API_URL || 'https://patient-nurturing-production.up.railway.app';

console.log('Backend API URL:', API_URL);

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
    console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Don't log the full error in production, just show user-friendly message
    const userFriendlyError = {
      message: 'Unable to connect to AI service',
      details: 'Please check your internet connection and try again.'
    };
    
    return Promise.reject(userFriendlyError);
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

export default api;
