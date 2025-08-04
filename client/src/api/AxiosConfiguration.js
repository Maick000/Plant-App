import axios from 'axios'

const API_URL = 'http://localhost:3000';

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default apiClient