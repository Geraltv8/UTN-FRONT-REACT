import api from './api';

const PROVEEDOR_URL = '/proveedores';

// GET /api/proveedores: listar todos los proveedores (requiere token)
export const obtenerTodos = async () => {
    const respuesta = await api.get(PROVEEDOR_URL);
    return respuesta.data;
};

// POST /api/proveedores: registrar un proveedor (requiere token y rol ADMIN)
export const crear = async (datosNuevo) => {
    const respuesta = await api.post(PROVEEDOR_URL, datosNuevo);
    return respuesta.data;
};

// PATCH /api/proveedores/:id/calificacion: calificar (número de 1 a 5)
export const calificar = async (id, calificacion) => {
    const respuesta = await api.patch(`${PROVEEDOR_URL}/${id}/calificacion`, { calificacion });
    return respuesta.data;
};
