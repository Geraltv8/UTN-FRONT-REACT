// Devuelve el mensaje que manda el backend (si existe) o uno por defecto.
export const mensajeDeError = (error, porDefecto) => {
    const data = error.response?.data;
    return data?.detalle || data?.mensaje || porDefecto;
};
