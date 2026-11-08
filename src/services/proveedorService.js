import api from './api';

const ENTIDAD_URL = '/proveedores';

export const obtenerTodos = async () => {
  const respuesta = await api.get(ENTIDAD_URL);
  return respuesta.data;
};

export const crear = async (datosNuevo) => {
  const respuesta = await api.post(ENTIDAD_URL, datosNuevo);
  return respuesta.data;
};

export const calificar = async (id, calificacion) => {
  const respuesta = await api.patch(`${ENTIDAD_URL}/${id}/calificacion`, { calificacion });
  return respuesta.data;
};
