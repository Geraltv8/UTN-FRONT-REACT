import api from './api';

const ENDPOINT = '/proveedores';

// Obtener todos los proveedores
export const obtenerProveedores = async () => {
  const response = await api.get(ENDPOINT);
  return response.data;
};

// Crear un nuevo proveedor
export const crearProveedor = async (proveedorData) => {
  const response = await api.post(ENDPOINT, proveedorData);
  return response.data;
};

// Calificar un proveedor (PATCH /api/proveedores/:id/calificacion)
export const calificarProveedor = async (id, calificacion) => {
  const response = await api.patch(`${ENDPOINT}/${id}/calificacion`, {
    calificacion: Number(calificacion),
  });
  return response.data;
};

// Actualizar datos de un proveedor (PUT/PATCH opcional para CRUD completo)
export const actualizarProveedor = async (id, datosActualizados) => {
  const response = await api.put(`${ENDPOINT}/${id}`, datosActualizados);
  return response.data;
};

// Eliminar un proveedor (DELETE opcional para CRUD completo)
export const eliminarProveedor = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`);
  return response.data;
};
