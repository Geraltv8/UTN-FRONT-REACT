import api from './api.js';

export async function iniciarSesion(email, password) {
  // El backend del docente monta auth.routes en /api/login y define POST /login.
  const response = await api.post('/login/login', { email, password });
  if (!response.data?.token) {
    throw new Error('El servidor no devolvió un token.');
  }
  return response.data.token;
}

export function cerrarSesion() {
  localStorage.removeItem('token');
}
