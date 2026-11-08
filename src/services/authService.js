import api from './api';

/**
 * Realiza login con email y password.
 * Almacena token y datos del usuario en localStorage.
 */
export async function login(email, password) {
  const response = await api.post('/auth/login', { email, password });
  const { token, usuario } = response.data;

  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));

  return response.data;
}

/**
 * Elimina credenciales de localStorage.
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

/**
 * Comprueba si existe un token en localStorage.
 */
export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

/**
 * Devuelve los datos del usuario almacenados.
 */
export function getUsuario() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

const authService = { login, logout, isAuthenticated, getUsuario };
export default authService;
