import axios from 'axios';

const baseConfig = {
    baseURL: 'http://localhost:34567',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const axiosInstance = axios.create(baseConfig)