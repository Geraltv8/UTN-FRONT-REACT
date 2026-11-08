import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Proveedores from './pages/Proveedores';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark px-3 mb-3">
        <span className="navbar-brand">Panel de Administración</span>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-sm btn-outline-light">Catálogo</Link>
          <Link to="/proveedores" className="btn btn-sm btn-outline-light">Proveedores</Link>
          <Link to="/login" className="btn btn-sm btn-outline-warning">Login</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/proveedores" element={<Proveedores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
