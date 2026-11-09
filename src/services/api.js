import axios from "axios";

// Instancia de axios con la URL base del backend
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Interceptor: antes de cada petición, agrega el token JWT si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
