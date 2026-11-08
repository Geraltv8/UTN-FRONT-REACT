import api from './api';

export const login = async (email, password) => {
    const respuesta = await api.post('/login/login', { email, password });
    localStorage.setItem('token', respuesta.data.token);
    return respuesta.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};