import axios, {AxiosError} from 'axios';
const API_URL = process.env.API_URL
const baseConfig = axios.create({
    baseURL: `${API_URL}/api/v1`, // Replace with your API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export {baseConfig, axios, AxiosError};