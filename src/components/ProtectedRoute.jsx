import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // Si no hay token en localStorage, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;
