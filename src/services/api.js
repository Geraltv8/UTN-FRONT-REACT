import axios from 'axios';

// Instancia de Axios conectada al backend del TP
const api = axios.create({
    baseURL: 'http://localhost:3000/api' // Ajusta el puerto si tu backend corre en otro (ej: 4000 o 5000)
});

// Interceptor para inyectar el token JWT en cada petición
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;