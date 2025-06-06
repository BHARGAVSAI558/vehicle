import axios from 'axios';

const API_URL = 'http://localhost:2027';

// Create axios instance with timeout
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000, // 5 seconds timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
            throw new Error('Unable to connect to server. Please make sure the backend server is running.');
        }
        if (error.response) {
            // Server responded with error status
            throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
        }
        if (error.request) {
            // Request made but no response
            throw new Error('No response from server. Please try again later.');
        }
        // Other errors
        throw new Error(error.message || 'An unexpected error occurred');
    }
);

export const adminService = {
    // Admin login
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/admin/checkadminlogin', credentials);
            if (response.data) {
                return { success: true, data: response.data };
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    // Add vehicle
    addVehicle: async (vehicle) => {
        try {
            const response = await axiosInstance.post('/admin/addvehicle', vehicle);
            return response.data;
        } catch (error) {
            console.error('Error adding vehicle:', error);
            throw error;
        }
    },

    // Get all vehicles
    getAllVehicles: async () => {
        try {
            const response = await axiosInstance.get('/admin/viewallvehicles');
            return response.data;
        } catch (error) {
            console.error('Error getting vehicles:', error);
            throw error;
        }
    },

    // Delete vehicle
    deleteVehicle: async (vid) => {
        try {
            const response = await axiosInstance.delete(`/admin/deletevehicle?vid=${vid}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            throw error;
        }
    },

    // Get vehicle count
    getVehicleCount: async () => {
        try {
            const response = await axiosInstance.get('/admin/vehiclecount');
            return response.data;
        } catch (error) {
            console.error('Error getting vehicle count:', error);
            throw error;
        }
    },

    // Get vehicle by ID
    getVehicleById: async (vid) => {
        try {
            const response = await axiosInstance.get(`/admin/displayvehiclebyid/${vid}`);
            return response.data;
        } catch (error) {
            console.error('Error getting vehicle:', error);
            throw error;
        }
    }
}; 