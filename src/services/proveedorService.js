import api from './api';

const ENTIDAD_URL = '/proveedores';

// GET /api/proveedores (admite ?ciudad=)
export const obtenerProveedores = async (ciudad) => {
    const respuesta = await api.get(ENTIDAD_URL, {
        params: ciudad ? { ciudad } : undefined
    });
    return respuesta.data;
};

// POST /api/proveedores (requiere token y rol ADMIN)
export const crearProveedor = async (datosNuevo) => {
    const respuesta = await api.post(ENTIDAD_URL, datosNuevo);
    return respuesta.data;
};

// PATCH /api/proveedores/:id/calificacion
export const calificarProveedor = async (id, calificacion) => {
    const respuesta = await api.patch(`${ENTIDAD_URL}/${id}/calificacion`, { calificacion });
    return respuesta.data;
};
