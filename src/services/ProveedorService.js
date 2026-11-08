import api from './api';

const ENDPOINT = './proveedores';

export const getProveedores = async () => {
  const respuesta = await api.get(ENDPOINT);
  return respuesta.data;
};

export const crearProveedor = async (datosProveedor) => {
  const respuesta = await api.post(ENDPOINT, datosProveedor);
  return respuesta.data;
};

export const calificarProveedor = async (id, calificacion) => {
  const respuesta = await api.patch(`$(ENDPOINT)/${id}`, { calificacion });
  return respuesta.data;
};
