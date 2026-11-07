import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">Panel de Administracion</Link>
                <div className="navbar-nav me-auto">
                    {token && (
                        <>
                            <Link className="nav-link" to="/dashboard">Catalogo</Link>
                            <Link className="nav-link" to="/proveedores">Proveedores</Link>
                        </>
                    )}
                </div>
                <div className="d-flex">
                    {token ? (
                        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                            Cerrar Sesion
                        </button>
                    ) : (
                        <Link className="btn btn-outline-light btn-sm" to="/login">
                            Iniciar Sesion
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

