import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const GenAiURL = process.env.NEXT_PUBLIC_GENAI_URL;
const api = axios.create({
  baseURL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default api;
