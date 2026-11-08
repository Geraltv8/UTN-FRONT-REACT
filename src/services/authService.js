import api from './api';

// El backend monta la autenticacion en /api/login:
//   POST /api/login        -> registrar usuario
//   POST /api/login/login  -> iniciar sesion
const AUTH_URL = '/login';

export const iniciarSesion = async ({ email, password }) => {
    const respuesta = await api.post(`${AUTH_URL}/login`, { email, password });
    localStorage.setItem('token', respuesta.data.token);
    return respuesta.data;
};

export const registrarUsuario = async (datos) => {
    const respuesta = await api.post(AUTH_URL, datos);
    return respuesta.data;
};

export const cerrarSesion = () => {
    localStorage.removeItem('token');
};

export const hayToken = () => Boolean(localStorage.getItem('token'));

// Lee el payload del JWT para saber el rol. No reemplaza la validacion del
// servidor: sirve solo para no mostrar botones que el backend va a rechazar.
export const obtenerUsuario = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const carga = token.split('.')[1];
        return JSON.parse(atob(carga.replace(/-/g, '+').replace(/_/g, '/')));
    } catch {
        return null;
    }
};

export const esAdmin = () => obtenerUsuario()?.rol === 'ADMIN';
