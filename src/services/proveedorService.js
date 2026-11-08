import api from './api';

const PROVEEDORES_URL = '/proveedores';

export const obtenerProveedores = async () => {
    const respuesta = await api.get(PROVEEDORES_URL);
    return respuesta.data;
};

export const crearProveedor = async (datosNuevo) => {
    const respuesta = await api.post(PROVEEDORES_URL, datosNuevo);
    return respuesta.data;
};

export const actualizarCalificacion = async (id, calificacion) => {
    const respuesta = await api.patch(
        `${PROVEEDORES_URL}/${id}/calificacion`,
        { calificacion }
    );
    return respuesta.data;
};
