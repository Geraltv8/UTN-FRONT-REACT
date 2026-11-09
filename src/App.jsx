import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Proveedores from './pages/Proveedores';

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light">
        <Navbar />
        <main className="container-fluid px-3 px-md-4">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Catalogo />} />
            <Route path="/login" element={<Login />} />

            {/* Rutas Protegidas (requieren token en localStorage) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/proveedores" element={<Proveedores />} />
            </Route>

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/proveedores" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
