import { Navigate, Outlet } from 'react-router-dom';
import { hayTokenVigente } from '../services/authService';

const ProtectedRoute = () => {
    if (!hayTokenVigente()) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;