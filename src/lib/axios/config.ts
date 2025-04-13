import axios from 'axios';

const baseConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:34567',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const axiosInstance = axios.create(baseConfig)