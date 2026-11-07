import { Navigate, Outlet } from 'react-router-dom';

// Portero de rutas: si no hay token en localStorage, redirige al login.
const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    // replace evita que el usuario vuelva con el botón "atrás" a la ruta protegida.
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Outlet renderiza la ruta hija que coincidió (ej: /proveedores).
    return <Outlet />;
};

export default ProtectedRoute;
