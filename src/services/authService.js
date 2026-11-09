import api from "./api";

// POST /api/login/login → el backend devuelve { mensaje, token }
export const login = async (email, password) => {
  const respuesta = await api.post("/login/login", { email, password });
  localStorage.setItem("token", respuesta.data.token);
  return respuesta.data;
};

// Cerrar sesion -- el backend no guarda sesiones (JWT es stateless),
// asi que alcanza con borrar el token del navegador
export const logout = () => {
  localStorage.removeItem("token");
};

// dara true si existe un oken guardado
export const estaAutenticado = () => {
  return localStorage.getItem("token") !== null;
};
