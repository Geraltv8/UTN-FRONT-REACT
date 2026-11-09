import api from './api';

const ENDPOINT_PROVEEDORES = '/proveedores';

/**
 * Obtiene la lista completa de proveedores registrados en la API.
 * Soporta filtro opcional por ciudad: obtenerProveedores('Resistencia')
 */
export const obtenerProveedores = async (ciudad) => {
  const params = ciudad ? { ciudad } : {};
  const respuesta = await api.get(ENDPOINT_PROVEEDORES, { params });
  return respuesta.data;
};

export const getProveedores = obtenerProveedores;

/**
 * Registra un nuevo proveedor en la base de datos.
 * @param {Object} datosProveedor - Datos del proveedor a crear
 */
export const crearProveedor = async (datosProveedor) => {
  const respuesta = await api.post(ENDPOINT_PROVEEDORES, datosProveedor);
  return respuesta.data;
};

/**
 * Actualiza la calificación de un proveedor mediante PATCH.
 * Endpoint del backend: PATCH /api/proveedores/:id/calificacion
 * @param {string} id - ID del proveedor
 * @param {number|Object} calificacion - Número del 1 al 5 o { calificacion: number }
 */
export const calificarProveedor = async (id, calificacion) => {
  const payload = typeof calificacion === 'object' && calificacion !== null
    ? calificacion
    : { calificacion: Number(calificacion) };

  const respuesta = await api.patch(`${ENDPOINT_PROVEEDORES}/${id}/calificacion`, payload);
  return respuesta.data;
};

export const actualizarCalificacion = calificarProveedor;

/**
 * Elimina un proveedor por su ID.
 * @param {string} id - ID del proveedor
 */
export const eliminarProveedor = async (id) => {
  const respuesta = await api.delete(`${ENDPOINT_PROVEEDORES}/${id}`);
  return respuesta.data;
};

export default {
  obtenerProveedores,
  getProveedores,
  crearProveedor,
  calificarProveedor,
  actualizarCalificacion,
  eliminarProveedor,
};

