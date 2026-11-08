import api from './api';

/**
 * Obtiene todos los proveedores. Soporta filtro opcional por ciudad.
 */
export async function obtenerProveedores(ciudad = null) {
  const params = ciudad ? { ciudad } : {};
  const response = await api.get('/proveedores', { params });
  return response.data;
}

/**
 * Crea un nuevo proveedor.
 * @param {Object} datosProveedor - { razonSocial, cuit, contacto, direccion }
 */
export async function crearProveedor(datosProveedor) {
  const response = await api.post('/proveedores', datosProveedor);
  return response.data;
}

/**
 * Actualiza la calificación de un proveedor.
 * @param {string} id - ID del proveedor
 * @param {number} calificacion - Valor de 1 a 5
 */
export async function actualizarCalificacion(id, calificacion) {
  const response = await api.patch(`/proveedores/${id}/calificacion`, { calificacion });
  return response.data;
}

const proveedorService = { obtenerProveedores, crearProveedor, actualizarCalificacion };
export default proveedorService;
