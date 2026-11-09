import api from './api';

export async function obtenerProveedores(ciudad) {
  const { data } = await api.get('/proveedores', {
    params: ciudad ? { ciudad } : undefined,
  });
  return data;
}

export async function crearProveedor(proveedor) {
  const { data } = await api.post('/proveedores', proveedor);
  return data;
}

export async function actualizarCalificacion(id, calificacion) {
  const { data } = await api.patch(`/proveedores/${id}/calificacion`, { calificacion });
  return data;
}
