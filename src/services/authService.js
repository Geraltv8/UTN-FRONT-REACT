import api from './api';

export const login = async (email, password) => {
  const respuesta = await api.post('/login/login', { email, password });
  localStorage.setItem('token', respuesta.data.token);
  return respuesta.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const estaAutenticado = () => Boolean(localStorage.getItem('token'));

// El payload del JWT trae { id, rol }. Solo se usa para la UI, el back valida el rol.
export const obtenerRol = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload.rol;
  } catch {
    return null;
  }
};
