import api from './api';

const ENTIDAD_URL = '/productos';

export const obtenerProductos = async () => {
    const respuesta = await api.get(ENTIDAD_URL);
    return respuesta.data;
};
