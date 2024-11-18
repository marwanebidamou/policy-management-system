import axios from "axios";
import { API_BASE_URL } from "../config/env";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000, // Request timeout in milliseconds
    headers: {
        "Content-Type": "application/json",
    },
});

// interceptors for request and response
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access 
            console.error("Unauthorized! Redirecting to login...");//TODO: redirect to login
        }
        return Promise.reject(error);
    }
);

export default apiClient;
