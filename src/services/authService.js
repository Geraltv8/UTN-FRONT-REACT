import api from './api';

const LOGIN_ENDPOINT = '/login/login';

/**
 * Autentica al usuario contra el backend mediante POST /api/login/login.
 * Guarda el token JWT y los datos de sesión en localStorage.
 * 
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} Respuesta con mensaje y token
 */
export const login = async (email, password) => {
    try {
        const response = await api.post(LOGIN_ENDPOINT, { email, password });
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            
            // Decodificar payload básico de JWT para extraer el rol e ID
            try {
                const base64Url = response.data.token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split('')
                        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                        .join('')
                );
                const decoded = JSON.parse(jsonPayload);
                const usuario = {
                    email,
                    rol: decoded.rol || 'ADMIN',
                    id: decoded.id
                };
                localStorage.setItem('user', JSON.stringify(usuario));
            } catch {
                localStorage.setItem('user', JSON.stringify({ email, rol: 'ADMIN' }));
            }
        }
        return response.data;
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        throw error;
    }
};

/**
 * Cierra la sesión activa removiendo los tokens almacenados.
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Verifica si el usuario actual posee un token almacenado.
 * @returns {boolean}
 */
export const isAuthenticated = () => {
    return Boolean(localStorage.getItem('token'));
};

/**
 * Obtiene el token JWT actual.
 * @returns {string|null}
 */
export const getToken = () => {
    return localStorage.getItem('token');
};

/**
 * Obtiene los datos del usuario almacenado en la sesión.
 * @returns {Object|null}
 */
export const getUsuarioActual = () => {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export default {
    login,
    logout,
    isAuthenticated,
    getToken,
    getUsuarioActual
};
