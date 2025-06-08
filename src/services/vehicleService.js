import axios from 'axios';

const API_URL = 'https://springbootvehicleproject.up.railway.app/';

// Create axios instance with timeout
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
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

// Add response interceptor
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
            const errorMessage = error.response.data?.message || error.response.data?.error || `Server error: ${error.response.status}`;
            console.error('Server Error Details:', error.response.data);
            throw new Error(errorMessage);
        }
        if (error.request) {
            throw new Error('No response from server. Please try again later.');
        }
        throw new Error(error.message || 'An unexpected error occurred');
    }
);

// Exported service with addVehicle
export const vehicleService = {
    addVehicle: async (formData) => {
        try {
            logFormData(formData);
            const cleanFormData = new FormData();

            cleanFormData.append('name', String(formData.get('name')).trim());
            cleanFormData.append('brand', String(formData.get('brand')).trim());
            cleanFormData.append('price', String(formData.get('price')).trim());
            cleanFormData.append('modelYear', String(formData.get('modelYear')).trim());
            cleanFormData.append('description', String(formData.get('description') || '').trim());
            cleanFormData.append('color', String(formData.get('color') || '').trim());
            cleanFormData.append('financeAvailable', formData.get('financeAvailable') === '1' ? '1' : '0');

            const imageFile = formData.get('vehicleimage');
            if (!imageFile || !(imageFile instanceof File)) {
                throw new Error('Vehicle image file is required');
            }
            cleanFormData.append('vehicleimage', imageFile);

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

            const response = await axiosInstance.post('/vehicle/addvehicle', cleanFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Add Vehicle Error:', error);
            throw error;
        }
    }
};
