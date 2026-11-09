import api from './api';

// Backend: app.use('/api/login', authRoutes) + router.post('/login', ...)
const AUTH_URL = '/login/login';

export const login = async (credenciales) => {
    const respuesta = await api.post(AUTH_URL, credenciales); // { email, password }
    const { token } = respuesta.data;
    localStorage.setItem('token', token);
    return respuesta.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};
