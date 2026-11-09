import axios from 'axios';

// Instancia única de Axios para toda la app
const api = axios.create({ baseURL: 'http://localhost:3000/api' });

// Interceptor de request: inyecta el JWT en cada petición
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Interceptor de response: si el token venció o es inválido, volvemos al login.
// (No aplica al propio login, así se puede mostrar "credenciales inválidas".)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const esLogin = error.config?.url?.includes('/login');
        if (error.response?.status === 401 && !esLogin) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
