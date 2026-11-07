import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ autenticado }) {
  const location = useLocation();
  return autenticado
    ? <Outlet />
    : <Navigate to="/login" state={{ from: location }} replace />;
}
