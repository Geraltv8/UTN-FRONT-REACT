import { Navigate, Outlet } from "react-router-dom";
import { estaAutenticado } from "../services/authService";

// Componente centinela envuelve las rutas que requieren sesión iniciada
const ProtectedRoute = () => {
  // Si no hay token, redirige al login
  if (!estaAutenticado()) {
    return <Navigate to="/login" replace />;
  }

  // Si tiene token, muestra la ruta hija que corresponda
  return <Outlet />;
};

export default ProtectedRoute;
