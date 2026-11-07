import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout, getUsuarioActual } from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const usuario = getUsuarioActual();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
                    <span className="badge bg-primary fs-6">UTN</span>
                    <span>Admin Panel</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold text-white' : ''}`}
                                to="/"
                                end
                            >
                                Catálogo / Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold text-white' : ''}`}
                                to="/proveedores"
                            >
                                Gestión de Proveedores
                            </NavLink>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        {usuario && (
                            <span className="badge bg-secondary p-2 text-light">
                                👤 {usuario.email} <span className="badge bg-success ms-1">{usuario.rol}</span>
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                            title="Cerrar sesión actual"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
