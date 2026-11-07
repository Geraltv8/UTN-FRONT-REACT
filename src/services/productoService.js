import api from './api';

const ENDPOINT = '/productos';

/**
 * Obtiene la lista de productos del catálogo.
 * Reemplaza el antiguo fetch() directo de App.jsx por una abstracción en la capa de servicios.
 * @returns {Promise<Array>}
 */
export const obtenerProductos = async () => {
    try {
        const response = await api.get(ENDPOINT);
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

export default {
    obtenerProductos
};
