import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 12000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.endsWith('/login')) {
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('sesion-expirada'));
    }
    return Promise.reject(error);
  },
);

export function mensajeError(error) {
  if (!error.response) {
    return 'No se pudo conectar con el servidor. Verificá que el backend esté iniciado.';
  }
  return error.response.data?.mensaje ||
    error.response.data?.error ||
    error.response.data?.detalle ||
    'La operación no pudo completarse. Intentá nuevamente.';
}

export default api;
