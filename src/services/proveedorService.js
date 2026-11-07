// src/services/proveedorService.js
import api from './api';

const ENTIDAD_URL = '/proveedores';

// 1. Obtener todos los proveedores (GET)
export const obtenerProveedores = async () => {
  const respuesta = await api.get(ENTIDAD_URL);
  return respuesta.data;
};

// 2. Crear un nuevo proveedor (POST)
export const crearProveedor = async (datosNuevo) => {
  const respuesta = await api.post(ENTIDAD_URL, datosNuevo);
  return respuesta.data;
};

// 3. Calificar a un proveedor (PATCH)
export const calificarProveedor = async (id, calificacion) => {
  const respuesta = await api.patch(`${ENTIDAD_URL}/${id}/calificacion`, { calificacion });
  return respuesta.data;
};