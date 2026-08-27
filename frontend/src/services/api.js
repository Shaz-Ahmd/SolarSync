import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Request interceptor
if (api && api.interceptors && api.interceptors.request) {
  api.interceptors.request.use(
    (config) => {
      const storedUser = localStorage.getItem("user");

      let user = null;

      try {
        user = storedUser ? JSON.parse(storedUser) : null;
      } catch (error) {
        user = null;
      }

      if (user && user.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${user.token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

// Response interceptor
if (api && api.interceptors && api.interceptors.response) {
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
}

export default api;