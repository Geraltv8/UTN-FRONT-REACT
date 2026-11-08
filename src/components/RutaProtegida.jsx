import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { hayToken } from '../services/authService';

// Componente envoltorio: si no hay token valido, expulsa al login y recuerda
// adonde queria ir el usuario para volver despues de iniciar sesion.
const RutaProtegida = () => {
    const ubicacion = useLocation();

    if (!hayToken()) {
        return <Navigate to="/login" state={{ desde: ubicacion.pathname }} replace />;
    }

    return <Outlet />;
};

export default RutaProtegida;
