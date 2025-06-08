import axios from 'axios';
import config from '../config';

const API_URL = config.url;

// Create axios instance with timeout and default JSON headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: config.apiTimeout, // Use timeout from config
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry logic for failed requests
const retryRequest = async (fn, retries = config.maxRetries, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryRequest(fn, retries - 1, delay * 2);
  }
};

// Wrap all API calls with retry logic
export const adminService = {
  login: async (credentials) => {
    return retryRequest(() => 
      axiosInstance.post('/admin/login', credentials)
        .then(response => response.data)
    );
  },
  
  // Add retry logic to other admin service methods
  // ... existing code ...
}; 