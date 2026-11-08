import api from './api.js';

const PROVEEDORES_URL = '/proveedores';

export async function obtenerProveedores() {
  const { data } = await api.get(PROVEEDORES_URL);
  if (!Array.isArray(data)) {
    throw new Error('La API devolvió una lista de proveedores inválida.');
  }
  return data;
}

export async function crearProveedor(datosProveedor) {
  const { data } = await api.post(PROVEEDORES_URL, datosProveedor);
  return data;
}

export async function actualizarCalificacion(id, calificacion) {
  const { data } = await api.patch(
    `${PROVEEDORES_URL}/${encodeURIComponent(id)}/calificacion`,
    { calificacion },
  );
  return data;
}
