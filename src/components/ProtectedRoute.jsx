import { Navigate, Outlet } from 'react-router-dom';

/**
 * Componente de orden superior (HOC / Layout) para proteger rutas privadas.
 * Verifica si existe un token en localStorage; si no existe, redirige al usuario a /login.
 */
const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

