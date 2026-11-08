import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // El 401 del login son credenciales inválidas, no sesión vencida
    const esLogin = error.config?.url?.includes('/login');
    if (error.response?.status === 401 && !esLogin) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const mensajeError = (error) => {
  if (!error.response) return 'No se pudo conectar con el servidor';
  const data = error.response.data;
  return data?.detalle || data?.mensaje || data?.error || 'Ocurrió un error inesperado';
};

export default api;
