import axios from 'axios';
import config from '../config';

const API_URL = config.url;

// Create axios instance with config timeout
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: config.apiTimeout,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Update the retryRequest function to use config values
const retryRequest = async (fn, retries = config.maxRetries, delay = 1000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
        return retryRequest(fn, retries - 1, delay * 2);
    }
};

// Update the addVehicle method to use a longer timeout for file uploads
const addVehicle = async (formData) => {
    try {
        const cleanFormData = new FormData();
        // ... existing FormData handling code ...

        const response = await axiosInstance.post('/vehicle/addvehicle', cleanFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
            timeout: 60000, // Keep 60 seconds for file uploads
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log('Upload progress:', percentCompleted + '%');
            }
        });

        if (!response.data) {
            throw new Error('No response data received from server');
        }
        return response.data;
    } catch (error) {
        console.error('Error adding vehicle:', error);
        throw error;
    }
}; 