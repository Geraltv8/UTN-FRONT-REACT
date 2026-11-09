import api from "./api";

const PROVEEDORES_URL = "/proveedores";

// GET /api/proveedores  necesita un token
export const obtenerProveedores = async () => {
  const respuesta = await api.get(PROVEEDORES_URL);
  return respuesta.data;
};

// POST /api/proveedores  necesita un token y el rol admin
export const crearProveedor = async (datosProveedor) => {
  const respuesta = await api.post(PROVEEDORES_URL, datosProveedor);
  return respuesta.data;
};

// PATCH /api/proveedores/:id/calificacion actualiza la calificacin
export const calificarProveedor = async (id, calificacion) => {
  const respuesta = await api.patch(`${PROVEEDORES_URL}/${id}/calificacion`, {
    calificacion,
  });
  return respuesta.data;
};
