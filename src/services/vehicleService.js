import axios from 'axios';
import config from '../config';

// Create axios instance with timeout
const axiosInstance = axios.create({
    baseURL: config.url,
    timeout: config.apiTimeout,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add request interceptor for logging
axiosInstance.interceptors.request.use(request => {
    console.log('Making request to:', `${config.url}${request.url}`);
    return request;
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.status);
        return response;
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            throw new Error('Request timed out. Please try again.');
        }
        
        if (!error.response) {
            console.error('Network error:', error.message);
            throw new Error('Network error. Please check your internet connection.');
        }

        // Handle specific HTTP errors
        switch (error.response.status) {
            case 401:
                throw new Error('Unauthorized. Please login again.');
            case 403:
                throw new Error('Access forbidden.');
            case 404:
                throw new Error('Resource not found.');
            case 500:
                throw new Error('Server error. Please try again later.');
            default:
                throw new Error(error.response.data?.message || 'An error occurred');
        }
    }
);

export const vehicleService = {
    // Get all vehicles
    getAllVehicles: async () => {
        try {
            const response = await axiosInstance.get('/vehicle/viewallvehicles');
            return response.data;
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            throw error;
        }
    },

    // Get vehicle by ID
    getVehicleById: async (id) => {
        try {
            const response = await axiosInstance.get(`/vehicle/displayvehiclebyid/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching vehicle:', error);
            throw error;
        }
    },

    // Add vehicle
    addVehicle: async (formData) => {
        try {
            const response = await axiosInstance.post('/vehicle/addvehicle', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error adding vehicle:', error);
            throw error;
        }
    },

    // Delete vehicle
    deleteVehicle: async (id) => {
        try {
            const response = await axiosInstance.delete(`/vehicle/deletevehicle/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            throw error;
        }
    },

    // Update vehicle
    updateVehicle: async (id, formData) => {
        try {
            const response = await axiosInstance.put(`/vehicle/updatevehicle/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating vehicle:', error);
            throw error;
        }
    }
}; 