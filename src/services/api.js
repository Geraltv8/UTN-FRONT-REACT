import axios from 'axios';

/**
 * Instancia centralizada de Axios.
 * Configura la URL base y aplica el patrón Interceptor para inyectar el token JWT
 * en todas las solicitudes salientes si existe en localStorage.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor de peticiones (Aduanero)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuestas para capturar sesiones expiradas
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token inválido o expirado
            const isLoginRequest = error.config.url?.includes('/login');
            if (!isLoginRequest) {
                console.warn('Sesión expirada o token no válido. Redirigiendo a login...');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // Si estamos en el navegador, emitir evento o redirigir
                window.dispatchEvent(new Event('auth-expired'));
            }
        }
        return Promise.reject(error);
    }
);

export default api;
