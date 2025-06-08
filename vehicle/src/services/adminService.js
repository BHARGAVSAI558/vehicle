import axios from 'axios';
<<<<<<< Updated upstream

const API_URL = 'https://springbootvehicleproject.up.railway.app';
=======
import config from '../config';
>>>>>>> Stashed changes

// Create axios instance with timeout and default JSON headers
const axiosInstance = axios.create({
<<<<<<< Updated upstream
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
=======
    baseURL: config.url,
    timeout: config.apiTimeout,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
>>>>>>> Stashed changes
});

// Request logging interceptor (for debugging)
axiosInstance.interceptors.request.use((request) => {
  if (request.data instanceof FormData) {
    // Log FormData keys and file info (not full contents)
    const entries = Array.from(request.data.entries()).map(([k, v]) =>
      v instanceof File
        ? `${k}: File(${v.name}, ${v.type}, ${v.size} bytes)`
        : `${k}: ${v}`
    );
    console.log('Request FormData:', entries);
  } else {
    console.log('Request Data:', request.data);
  }
  return request;
});

// Response interceptor with improved error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.response) {
      const errMsg =
        error.response.data?.message ||
        error.response.data?.error ||
        `Server error: ${error.response.status}`;
      console.error('Server Error:', errMsg);
      return Promise.reject(new Error(errMsg));
    } else if (error.request) {
      console.error('No response from server:', error.message);
      return Promise.reject(
        new Error('No response from server. Please try again later.')
      );
    } else {
      console.error('Error setting up request:', error.message);
      return Promise.reject(new Error(error.message));
    }
  }
);

export const adminService = {
  // Admin login
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/admin/checkadminlogin', credentials);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  },

  // Add vehicle (multipart/form-data)
  addVehicle: async (formData) => {
    try {
      const response = await axiosInstance.post('/admin/addvehicle', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Add vehicle error:', error.message);
      throw error;
    }
  },

  // Get all vehicles
  getAllVehicles: async () => {
    try {
      const response = await axiosInstance.get('/admin/viewallvehicles');
      return response.data;
    } catch (error) {
      console.error('Get all vehicles error:', error.message);
      throw error;
    }
  },

  // Delete vehicle by ID
  deleteVehicle: async (vid) => {
    try {
      const response = await axiosInstance.delete(`/admin/deletevehicle?vid=${vid}`);
      return response.data;
    } catch (error) {
      console.error('Delete vehicle error:', error.message);
      throw error;
    }
  },

  // Get vehicle count
  getVehicleCount: async () => {
    try {
      const response = await axiosInstance.get('/admin/vehiclecount');
      return response.data;
    } catch (error) {
      console.error('Get vehicle count error:', error.message);
      throw error;
    }
  },

  // Get vehicle by ID
  getVehicleById: async (vid) => {
    try {
      const response = await axiosInstance.get(`/admin/displayvehiclebyid/${vid}`);
      return response.data;
    } catch (error) {
      console.error('Get vehicle by ID error:', error.message);
      throw error;
    }
  },
};
