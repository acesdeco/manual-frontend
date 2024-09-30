import axios from 'axios';

const baseConfig = axios.create({
    baseURL: 'http://localhost:2000/api/v1', // Replace with your API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default baseConfig;