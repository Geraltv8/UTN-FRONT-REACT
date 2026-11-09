import api from './api';

// El backend monta el router en /api/login y define POST /login dentro.
export const login = async (email, password) => {
  const respuesta = await api.post('/login/login', { email, password });
  localStorage.setItem('token', respuesta.data.token);
  return respuesta.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

// Decodifica el payload del JWT (id, rol, exp). No verifica la firma: eso lo hace el backend.
export const getPayload = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

export const estaAutenticado = () => {
  const payload = getPayload();
  if (!payload) return false;
  if (payload.exp && payload.exp * 1000 < Date.now()) {
    logout();
    return false;
  }
  return true;
};
