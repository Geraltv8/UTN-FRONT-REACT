import axios from 'axios';

// Una sola instancia de axios para toda la app.
// baseURL evita repetir "http://localhost:3000/api" en cada llamada.
const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// Interceptor de peticiones: se ejecuta ANTES de que cada pedido salga del navegador.
// Su trabajo es inyectar el token JWT en la cabecera Authorization.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Hay que devolver config: es el pedido ya modificado que axios va a enviar.
    return config;
});

export default api;
