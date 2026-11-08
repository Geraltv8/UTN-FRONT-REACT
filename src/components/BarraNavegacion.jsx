import { NavLink, useNavigate } from 'react-router-dom';
import { cerrarSesion, hayToken, obtenerUsuario } from '../services/authService';

const BarraNavegacion = () => {
    const navegar = useNavigate();
    const usuario = obtenerUsuario();

    if (!hayToken()) return null;

    const salir = () => {
        cerrarSesion();
        navegar('/login', { replace: true });
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
            <div className="container">
                <span className="navbar-brand">Panel de administración</span>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/proveedores">Proveedores</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/productos">Catálogo</NavLink>
                    </li>
                </ul>
                <span className="navbar-text me-3">{usuario?.rol}</span>
                <button type="button" className="btn btn-sm btn-outline-light" onClick={salir}>
                    Cerrar sesión
                </button>
            </div>
        </nav>
    );
};

export default BarraNavegacion;
