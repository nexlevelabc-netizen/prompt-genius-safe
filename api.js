// src/services/api.js
import axios from 'axios';

// Use environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
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
    
    if (error.response) {
      // Server responded with error
      console.error('Error Details:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('No response received');
    } else {
      // Request setup error
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Template API calls
export const templateAPI = {
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
  
  // Health check
  healthCheck: () => api.get('/api/health'),
};

export default api;