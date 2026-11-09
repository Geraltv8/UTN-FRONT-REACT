import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Proveedores from './pages/Proveedores';
import ProtectedRoute from './components/ProtectedRoute';

// Barra de navegación para rutas protegidas
function NavigationBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!token) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/proveedores">
          🏢 UTN - Gestión Enterprise
        </Link>
        <div className="d-flex align-items-center gap-3">
          <Link className="nav-link text-white fw-semibold" to="/proveedores">
            Proveedores
          </Link>
          <button
            type="button"
            className="btn btn-outline-light btn-sm fw-semibold"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light">
        <NavigationBar />
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />

          {/* Bloque de Rutas Protegidas (Exigido en Criterio 4) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/proveedores" replace />} />
            <Route path="/proveedores" element={<Proveedores />} />
          </Route>

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/proveedores" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
