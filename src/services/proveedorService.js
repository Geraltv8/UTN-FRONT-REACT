import api from './api';

const PROVEEDORES_URL = '/proveedores';

// GET /api/proveedores  (opcional: ?ciudad=...)
export const obtenerProveedores = async (ciudad) => {
  const respuesta = await api.get(PROVEEDORES_URL, {
    params: ciudad ? { ciudad } : {},
  });
  return respuesta.data;
};

// POST /api/proveedores  (requiere rol ADMIN)
export const crearProveedor = async (datosNuevo) => {
  const respuesta = await api.post(PROVEEDORES_URL, datosNuevo);
  return respuesta.data;
};

// PATCH /api/proveedores/:id/calificacion  (calificacion: 1 a 5)
export const calificarProveedor = async (id, calificacion) => {
  const respuesta = await api.patch(`${PROVEEDORES_URL}/${id}/calificacion`, { calificacion });
  return respuesta.data;
};

// Alias de compatibilidad según nomenclatura de la guía
export const obtenerTodos = obtenerProveedores;
export const crear = crearProveedor;
export const actualizarCalificacion = calificarProveedor;

