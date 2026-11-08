import api from './api';

const PROVEEDORES_URL = '/proveedores';

export const obtenerProveedores = async (ciudad) => {
  const params = ciudad ? { ciudad } : {};
  const respuesta = await api.get(PROVEEDORES_URL, { params });
  return respuesta.data;
};

export const crearProveedor = async (datosProveedor) => {
  const respuesta = await api.post(PROVEEDORES_URL, datosProveedor);
  return respuesta.data;
};

export const actualizarCalificacion = async (id, calificacion) => {
  const respuesta = await api.patch(`${PROVEEDORES_URL}/${id}/calificacion`, { calificacion });
  return respuesta.data;
};

// Alias adicionales según nomenclaturas de la consigna y convenciones CRUD
export const obtenerTodos = obtenerProveedores;
export const getProveedores = obtenerProveedores;
export const crear = crearProveedor;
export const postProveedor = crearProveedor;
export const actualizar = actualizarCalificacion;
export const updateCalificacion = actualizarCalificacion;

