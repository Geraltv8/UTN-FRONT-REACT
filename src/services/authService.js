import api from './api.js';

export const iniciarSesion = async (credenciales) => {
  const respuesta = await api.post('/login/login', credenciales);
  return respuesta.data;
};
