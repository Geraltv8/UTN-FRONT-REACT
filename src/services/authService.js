import api from './api';

export const login = async (credenciales) => {
  try {
    // El backend monta authRoutes en '/api/login' y la ruta de login es '/login' -> '/api/login/login'
    const respuesta = await api.post('/login/login', credenciales);
    if (respuesta.data?.token) {
      localStorage.setItem('token', respuesta.data.token);
    }
    return respuesta.data;
  } catch (error) {
    // Si la ruta alternativa '/login' fuese utilizada
    if (error.response?.status === 404) {
      const respuesta = await api.post('/login', credenciales);
      if (respuesta.data?.token) {
        localStorage.setItem('token', respuesta.data.token);
      }
      return respuesta.data;
    }
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem('token'));
};

