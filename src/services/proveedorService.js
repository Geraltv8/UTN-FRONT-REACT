import api from './api.js';

export const obtenerProveedores = async (config) => {
  const { data } = await api.get('/proveedores', config);
  return data;
};

export const crearProveedor = async (proveedor) => {
  const { data } = await api.post('/proveedores', proveedor);
  return data;
};

export const actualizarProveedor = async (id, proveedor) => {
  const { data } = await api.put(`/proveedores/${id}`, proveedor);
  return data;
};

export const eliminarProveedor = async (id) => {
  const { data } = await api.delete(`/proveedores/${id}`);
  return data;
};

export const calificarProveedor = async (id, calificacion) => {
  const { data } = await api.patch(`/proveedores/${id}/calificacion`, { calificacion });
  return data;
};
