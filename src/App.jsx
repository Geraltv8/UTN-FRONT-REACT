import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Proveedores from './pages/Proveedores';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark px-3 mb-3">
        <span className="navbar-brand">Panel UTN</span>
        <div>
          <Link to="/" className="btn btn-sm btn-outline-light me-2">Catálogo</Link>
          <Link to="/proveedores" className="btn btn-sm btn-outline-light">Proveedores</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          {/* Todas las rutas aquí dentro requieren autenticación */}
          <Route path="/proveedores" element={<Proveedores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;