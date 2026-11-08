import api from './api.js';

export async function iniciarSesion(credenciales) {
  const { data } = await api.post('/login/login', credenciales);
  if (!data.token) {
    throw new Error('La respuesta del servidor no contiene un token de acceso.');
  }
  return data.token;
}
