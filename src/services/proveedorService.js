import api from './api';

const ENDPOINT = '/proveedores';

/**
 * Obtiene el listado completo de proveedores desde el backend.
 * Soporta filtrado opcional por ciudad (?ciudad=...)
 * @param {string} [ciudad] - Nombre de la ciudad a filtrar (opcional)
 * @returns {Promise<Array>} Lista de proveedores
 */
export const obtenerProveedores = async (ciudad = '') => {
    try {
        const config = ciudad ? { params: { ciudad } } : {};
        const response = await api.get(ENDPOINT, config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        throw error;
    }
};

/**
 * Registra un nuevo proveedor en la base de datos (POST).
 * Requiere rol de ADMIN (el interceptor adjunta el token JWT correspondiente).
 * 
 * Estructura esperada por el backend:
 * {
 *   razonSocial: string (requerido),
 *   cuit: string 11 dígitos numéricos (requerido),
 *   contacto: { email: string (requerido), telefono?: string },
 *   direccion?: { calle?: string, ciudad?: string, pais?: string },
 *   calificacion?: number (1 a 5, default 3),
 *   estadoActivo?: boolean (default true)
 * }
 * 
 * @param {Object} datosProveedor - Objeto con la información del nuevo proveedor
 * @returns {Promise<Object>} Proveedor registrado
 */
export const crearProveedor = async (datosProveedor) => {
    try {
        const response = await api.post(ENDPOINT, datosProveedor);
        return response.data;
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        throw error;
    }
};

/**
 * Actualiza la calificación de un proveedor existente mediante PATCH.
 * Endpoint del backend: PATCH /api/proveedores/:id/calificacion
 * 
 * @param {string} id - ID del proveedor en MongoDB (_id)
 * @param {number} calificacion - Nueva calificación (entero de 1 a 5)
 * @returns {Promise<Object>} Proveedor actualizado
 */
export const actualizarCalificacion = async (id, calificacion) => {
    try {
        const response = await api.patch(`${ENDPOINT}/${id}/calificacion`, {
            calificacion: Number(calificacion)
        });
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la calificación del proveedor ${id}:`, error);
        throw error;
    }
};

// Alias compatible con la consigna "Calificar un proveedor"
export const calificarProveedor = actualizarCalificacion;

export default {
    obtenerProveedores,
    crearProveedor,
    actualizarCalificacion,
    calificarProveedor
};
