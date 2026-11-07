import api from './api';

// Ojo con las rutas: en el backend authRoutes se monta en '/api/login',
// y dentro define POST '/' (registrar) y POST '/login' (iniciar sesion).
// Por eso las URLs finales quedan '/login' y '/login/login'.

export const login = async (credenciales) => {
    const respuesta = await api.post('/login/login', credenciales);
    return respuesta.data; // { mensaje, token }
};

export const registrar = async (datosUsuario) => {
    const respuesta = await api.post('/login', datosUsuario);
    return respuesta.data;
};
