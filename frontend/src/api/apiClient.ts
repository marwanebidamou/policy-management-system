import axios from "axios";
import { API_BASE_URL } from "../config/env";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 400) {
      const errorResponse = error.response.data;
      console.error("Validation Error:", errorResponse.message);
    }
    else if (error.response?.status === 401) {
      // Handle unauthorized access 
      localStorage.setItem('username', '');
      localStorage.setItem('token', '');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
