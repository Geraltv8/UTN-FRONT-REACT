import api from './api';

const ENTIDAD_URL = '/proveedores';

// GET /api/proveedores  -> requiere token
export const obtenerProveedores = async () => {
    const respuesta = await api.get(ENTIDAD_URL);
    return respuesta.data;
};

// POST /api/proveedores -> requiere token + rol ADMIN
export const crearProveedor = async (datosNuevo) => {
    const respuesta = await api.post(ENTIDAD_URL, datosNuevo);
    return respuesta.data;
};

// PATCH /api/proveedores/:id/calificacion -> actualiza solo la calificación
export const calificarProveedor = async (id, calificacion) => {
    const respuesta = await api.patch(
        `${ENTIDAD_URL}/${id}/calificacion`,
        { calificacion }
    );
    return respuesta.data;
};
