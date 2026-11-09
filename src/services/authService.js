import api from './api';

const TOKEN_KEY = 'token';

export async function login(credenciales) {
  const { data } = await api.post('/login/login', credenciales);
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUserRole() {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload)).rol ?? null;
  } catch {
    return null;
  }
}
