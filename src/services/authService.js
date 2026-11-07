import api from './api';

export const loginUsuario = async (credenciales) => {
    const respuesta = await api.post('/login/login', credenciales);
    return respuesta.data;
};

export const registrarUsuario = async (datosUsuario) => {
    const respuesta = await api.post('/login', datosUsuario);
    return respuesta.data;
};

