import { Navigate, Outlet } from 'react-router-dom';
import { estaAutenticado } from '../services/authService';

// Ruta protegida: si no hay token válido, expulsa al login.
const ProtectedRoute = () => {
  return estaAutenticado() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
