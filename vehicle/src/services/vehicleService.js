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

// Helper function to log FormData contents
const logFormData = (formData) => {
    const entries = Array.from(formData.entries());
    console.log('FormData Contents:', entries.map(([key, value]) => ({
        key,
        value: value instanceof File 
            ? `File(${value.name}, ${value.type}, ${value.size}bytes)`
            : String(value)
    })));
};

// Add request interceptor for logging
axiosInstance.interceptors.request.use(request => {
    if (request.data instanceof FormData) {
        logFormData(request.data);
    }
    console.log('Request Config:', {
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data instanceof FormData ? 'FormData (see above)' : request.data
    });
    return request;
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', {
            status: response.status,
            data: response.data,
            headers: response.headers
        });
        return response;
    },
    (error) => {
        console.error('Error Response:', {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
            message: error.message
        });
        
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
            throw new Error('Unable to connect to server. Please make sure the backend server is running.');
        }
        if (error.response) {
            // Server responded with error status
            const errorMessage = error.response.data?.message || error.response.data?.error || `Server error: ${error.response.status}`;
            console.error('Server Error Details:', error.response.data);
            throw new Error(errorMessage);
        }
        if (error.request) {
            // Request made but no response
            throw new Error('No response from server. Please try again later.');
        }
        // Other errors
        throw new Error(error.message || 'An unexpected error occurred');
    }
);

export const vehicleService = {
    // Add a new vehicle
    addVehicle: async (formData) => {
        try {
            // Log the exact FormData contents before sending
            logFormData(formData);

            // Create a new FormData instance to ensure clean data
            const cleanFormData = new FormData();
            
            // Match EXACTLY what the backend expects
            // Note: backend expects 'vehicleimage' as the key for the image file
            cleanFormData.append('name', String(formData.get('name')).trim());
            cleanFormData.append('brand', String(formData.get('brand')).trim());
            cleanFormData.append('price', String(formData.get('price')).trim());
            cleanFormData.append('modelYear', String(formData.get('modelYear')).trim());
            cleanFormData.append('description', String(formData.get('description') || '').trim());
            cleanFormData.append('color', String(formData.get('color') || '').trim());
            cleanFormData.append('financeAvailable', formData.get('financeAvailable') === '1' ? '1' : '0');
            
            // Handle image - make sure we're using the correct key 'vehicleimage'
            const imageFile = formData.get('vehicleimage');
            if (!imageFile || !(imageFile instanceof File)) {
                throw new Error('Vehicle image file is required');
            }
            cleanFormData.append('vehicleimage', imageFile);

            // Log the exact request we're about to send
            console.log('Sending request to backend:', {
                url: '/vehicle/addvehicle',
                method: 'POST',
                formData: {
                    name: cleanFormData.get('name'),
                    brand: cleanFormData.get('brand'),
                    price: cleanFormData.get('price'),
                    modelYear: cleanFormData.get('modelYear'),
                    description: cleanFormData.get('description'),
                    color: cleanFormData.get('color'),
                    financeAvailable: cleanFormData.get('financeAvailable'),
                    imageFile: {
                        name: imageFile.name,
                        type: imageFile.type,
                        size: imageFile.size
                    }
                }
            });

            // Make the request using axiosInstance
            const response = await axiosInstance.post('/vehicle/addvehicle', cleanFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                },
                // Increase timeout for large files
                timeout: 60000, // 60 seconds
                // Add upload progress tracking
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log('Upload progress:', percentCompleted + '%');
                }
            });

            // Log the complete response
            console.log('Server Response:', {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                data: response.data
            });

            if (!response.data) {
                throw new Error('No response data received from server');
            }

            return response.data;
        } catch (error) {
            // Enhanced error logging with more details
            console.error('Error Details:', {
                message: error.message,
                code: error.code,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                headers: error.response?.headers,
                request: error.config ? {
                    url: error.config.url,
                    method: error.config.method,
                    headers: error.config.headers,
                    data: error.config.data instanceof FormData 
                        ? {
                            name: formData.get('name'),
                            brand: formData.get('brand'),
                            price: formData.get('price'),
                            modelYear: formData.get('modelYear'),
                            description: formData.get('description'),
                            color: formData.get('color'),
                            financeAvailable: formData.get('financeAvailable'),
                            hasImage: !!formData.get('vehicleimage')
                        }
                        : error.config.data
                } : null
            });

            // Handle specific error cases with more detailed messages
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Connection to server failed. Please check if the backend server is running on port 2027 and try again.');
            }
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timed out. The server took too long to respond. Please try again.');
            }
            if (error.response) {
                // Server responded with error status
                const errorMessage = error.response.data?.message || 
                                   error.response.data?.error || 
                                   `Server error (${error.response.status}): ${error.response.statusText}`;
                throw new Error(errorMessage);
            }
            if (error.request) {
                throw new Error('No response from server. Please check if the backend server is running and accessible.');
            }
            throw new Error(`Failed to add bike: ${error.message}`);
        }
    },

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
        if (!id) {
            throw new Error('Vehicle ID is required');
        }

        // Convert to number to ensure it's a valid ID
        const vehicleId = Number(id);
        if (isNaN(vehicleId)) {
            throw new Error('Invalid vehicle ID format');
        }

        try {
            console.log('Fetching vehicle with ID:', vehicleId);
            // Update to use the correct endpoint from the backend controller
            const response = await axiosInstance.get(`/vehicle/displayvehiclebyid?id=${vehicleId}`);
            console.log('Vehicle data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching vehicle:', {
                id: vehicleId,
                error: error.message,
                response: error.response?.data
            });

            if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
                throw new Error('Unable to connect to server. Please make sure the backend server is running on port 2027');
            }
            throw error;
        }
    },

    // Get vehicles by brand
    getVehiclesByBrand: async (brand) => {
        try {
            const response = await axiosInstance.get(`/vehicle/viewvehiclesbybrand/${brand}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching vehicles by brand:', error);
            throw error;
        }
    },

    // Delete vehicle
    deleteVehicle: async (vid) => {
        if (!vid) {
            throw new Error('Vehicle ID is required');
        }
        
        // Convert to number to ensure it's a valid ID
        const vehicleId = Number(vid);
        if (isNaN(vehicleId)) {
            throw new Error('Invalid vehicle ID format');
        }

        try {
            console.log('Deleting vehicle with ID:', vehicleId);
            const response = await axiosInstance.delete(`/admin/deletevehicle?vid=${vehicleId}`);
            console.log('Delete response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting vehicle:', {
                id: vid,
                error: error.message,
                response: error.response?.data
            });
            throw error;
        }
    },

    // Delete all vehicles
    deleteAllVehicles: async () => {
        try {
            const response = await axiosInstance.delete('/admin/deleteallvehicles');
            return response.data;
        } catch (error) {
            console.error('Error deleting all vehicles:', error);
            throw error;
        }
    },

    // Get vehicle images
    getVehicleImages: (vid) => {
        if (!vid) {
            console.error('getVehicleImages called with undefined vid');
            return '/placeholder-bike.png';
        }
        
        // Convert to number to ensure it's a valid ID
        const vehicleId = Number(vid);
        if (isNaN(vehicleId)) {
            console.error('getVehicleImages called with invalid vid:', vid);
            return '/placeholder-bike.png';
        }

        console.log('Getting image for vehicle:', vehicleId);
        return `${API_URL}/vehicle/displayvehicleimage?id=${vehicleId}`;
    },

    // Get vehicle count
    getVehicleCount: async () => {
        try {
            const response = await axiosInstance.get('/vehicle/count');
            return response.data;
        } catch (error) {
            console.error('Error getting vehicle count:', error);
            throw error;
        }
    }
}; 