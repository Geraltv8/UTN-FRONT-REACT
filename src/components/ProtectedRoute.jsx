import { Outlet } from 'react-router-dom';

// Componente envoltorio: verifica si hay un token guardado.
// Si lo hay, muestra la ruta hija (<Outlet />). Si no, bloquea el acceso.
const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <p className="container mt-4 text-danger">Acceso denegado: no hay token.</p>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
