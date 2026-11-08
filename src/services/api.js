import axios from 'axios';

// Instancia única de Axios: todas las peticiones salen desde acá
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor ("el aduanero"): le agrega el token JWT a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
