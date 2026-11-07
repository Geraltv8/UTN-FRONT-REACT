import api from './api';

const ENTIDAD_URL = '/proveedores';

export const obtenerProveedores = async () => {
    const respuesta = await api.get(ENTIDAD_URL);
    return respuesta.data;
};

export const crearProveedor = async (datosNuevo) => {
    const respuesta = await api.post(ENTIDAD_URL, datosNuevo);
    return respuesta.data;
};

export const calificarProveedor = async (id, calificacion) => {
    const respuesta = await api.patch(`${ENTIDAD_URL}/${id}/calificacion`, {
        calificacion: Number(calificacion)
    });
    return respuesta.data;
};

