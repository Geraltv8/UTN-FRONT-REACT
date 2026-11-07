import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

/**
 * Componente envoltorio de Ruta Protegida.
 * Verifica si existe un token JWT válido en localStorage.
 * Si no está autenticado, redirige automáticamente a la pantalla de login.
 * Si está autenticado, renderiza las rutas hijas mediante <Outlet />.
 */
const ProtectedRoute = ({ children }) => {
    const autenticado = isAuthenticated();

    if (!autenticado) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
