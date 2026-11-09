import api from './api';

export const obtenerProveedores = async () => {
  const response = await api.get('/proveedores');
  return response.data;
};

export const crearProveedor = async (proveedor) => {
  const response = await api.post('/proveedores', proveedor);
  return response.data;
};

export const actualizarCalificacion = async (id, calificacion) => {
  const response = await api.patch(
    `/proveedores/${id}/calificacion`,
    { calificacion }
  );
  return response.data;
};