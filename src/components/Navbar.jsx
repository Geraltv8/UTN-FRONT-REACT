import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 mb-4 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-info" to="/">
          UTN Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Catálogo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/proveedores">
                Proveedores <span className="badge bg-secondary ms-1">Protegido</span>
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            {token ? (
              <>
                <span className="badge bg-success">Sesión Activa</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-sm btn-outline-light">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

