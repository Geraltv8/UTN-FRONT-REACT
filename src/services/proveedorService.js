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

export const actualizar = async (id, datosActualizados) => {
    const respuesta = await api.put(`${ENTIDAD_URL}/${id}`, datosActualizados);
    return respuesta.data;
};

export const eliminar = async (id) => {
    const respuesta = await api.delete(`${ENTIDAD_URL}/${id}`);
    return respuesta.data;
};

