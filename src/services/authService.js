import api from './api';

export const login = async (email, password) => {
  const respuesta = await api.post('/login/login', { email, password });
  if (respuesta.data.token) {
    localStorage.setItem('token', respuesta.data.token);
  }
  return respuesta.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
