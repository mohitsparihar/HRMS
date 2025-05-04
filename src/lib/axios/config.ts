import axios from 'axios';
import { read_cookie } from 'sfcookies';

const TOKEN = read_cookie( "tokenServer" );

const baseConfig = {
    baseURL: 'http://localhost:34567',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `${TOKEN}`
    }
}

export const axiosInstance = axios.create(baseConfig)