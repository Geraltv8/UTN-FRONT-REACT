import api from './api';

export const iniciarSesion = async (email, password) => {
    const respuesta = await api.post('/login/login', { email, password });
    localStorage.setItem('token', respuesta.data.token);
    return respuesta.data;
};

// Un token es vigente si existe y su fecha de expiración (exp, en segundos) no pasó.
export const hayTokenVigente = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const cuerpo = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(cuerpo));
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};