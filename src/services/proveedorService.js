import api from './api.js';

const RUTA_PROVEEDORES = '/proveedores';

export async function obtenerProveedores() {
  const response = await api.get(RUTA_PROVEEDORES);
  return response.data;
}

export async function crearProveedor(proveedor) {
  const response = await api.post(RUTA_PROVEEDORES, proveedor);
  return response.data;
}

export async function calificarProveedor(id, calificacion) {
  const response = await api.patch(
    RUTA_PROVEEDORES + '/' + encodeURIComponent(id) + '/calificacion',
    { calificacion },
  );
  return response.data;
}

// El backend del docente NO expone PUT ni DELETE para proveedores.
