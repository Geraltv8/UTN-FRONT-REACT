import api from './api'; // Nuestra instancia configurada de Axios

const ENTIDAD_URL = '/proveedores';

// GET /api/proveedores
export const obtenerTodos = async () => {
  const respuesta = await api.get(ENTIDAD_URL);
  return respuesta.data;
};

// POST /api/proveedores
export const crear = async (datosNuevo) => {
  const respuesta = await api.post(ENTIDAD_URL, datosNuevo);
  return respuesta.data;
};

// PATCH /api/proveedores/:id/calificacion
export const calificar = async (id, calificacion) => {
  const respuesta = await api.patch(`${ENTIDAD_URL}/${id}/calificacion`, { calificacion });
  return respuesta.data;
};
