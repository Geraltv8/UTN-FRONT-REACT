export const obtenerMensajeError = (error, mensajePorDefecto = "Ocurrió un error inesperado") => {
  if (!error.response) {
    return "No se pudo conectar con el servidor";
  }

  const { status, data } = error.response;

  if (status === 403) {
    return "No tenés permisos para realizar esta acción";
  }

  if (status >= 500) {
    return data?.mensaje || data?.error || "Error interno del servidor";
  }

  return data?.detalle || data?.mensaje || data?.error || mensajePorDefecto;
};
