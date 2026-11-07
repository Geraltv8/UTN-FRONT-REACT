import api from './api.js';

// Conserva el listado existente en el frontend de ejemplo del docente.
export async function obtenerProductos() {
  const response = await api.get('/productos');
  return response.data;
}
