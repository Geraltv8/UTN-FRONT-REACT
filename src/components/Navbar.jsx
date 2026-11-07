import { Link, useNavigate } from 'react-router-dom';
import { getPayload, logout } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const rol = getPayload()?.rol;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/dashboard">Panel Admin</Link>
      <div className="navbar-nav me-auto">
        <Link className="nav-link" to="/dashboard">Inicio</Link>
        <Link className="nav-link" to="/proveedores">Proveedores</Link>
      </div>
      {rol && <span className="badge text-bg-secondary me-3">{rol}</span>}
      <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Navbar;
