import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <span className="navbar-brand">Panel</span>
            <div className="navbar-nav me-auto">
                <Link className="nav-link" to="/dashboard">Catálogo</Link>
                <Link className="nav-link" to="/proveedores">Proveedores</Link>
            </div>
            <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                Cerrar sesión
            </button>
        </nav>
    );
};

export default Navbar;
