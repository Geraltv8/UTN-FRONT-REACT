import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

// Si no hay token, expulsa al usuario al login; si hay, muestra la ruta hija.
const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/login" replace />;

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default ProtectedRoute;
