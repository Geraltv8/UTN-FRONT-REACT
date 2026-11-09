import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import Login from './pages/Login';
import Proveedores from './pages/Proveedores';
import ProtectedRoute from './components/ProtectedRoute';
import { getToken, getUserRole, logout } from './services/authService';
import './App.css';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setSesionExpirada] = useState(0);
  const autenticado = Boolean(getToken());
  useEffect(() => {
    const handleExpired = () => { setSesionExpirada((version) => version + 1); navigate('/login', { replace: true }); };
    window.addEventListener('auth:expired', handleExpired);
    return () => window.removeEventListener('auth:expired', handleExpired);
  }, [navigate]);

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="app-shell">
      {location.pathname !== '/login' && (
        <Navbar expand="lg" className="topbar">
          <Container>
            <Navbar.Brand as={Link} to={autenticado ? '/proveedores' : '/login'} className="brand-lockup">
              <span className="brand-mark brand-mark-small">TP</span>
              <span>Proveedores<span className="brand-suffix"> · UTN</span></span>
            </Navbar.Brand>
            <div className="d-flex align-items-center gap-3 ms-auto">
              {autenticado && <><Nav.Link as={Link} to="/proveedores" className="py-0">Proveedores</Nav.Link><span className="nav-role">{getUserRole() === 'ADMIN' ? 'Administrador' : 'Usuario'}</span><Button variant="outline-secondary" size="sm" onClick={handleLogout}>Cerrar sesión</Button></>}
            </div>
          </Container>
        </Navbar>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/proveedores" element={<main className="main-content"><Container><Outlet /></Container></main>}>
            <Route index element={<Proveedores />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to={autenticado ? '/proveedores' : '/login'} replace />} />
        <Route path="*" element={<Navigate to={autenticado ? '/proveedores' : '/login'} replace />} />
      </Routes>
      {location.pathname !== '/login' && <footer className="app-footer"><Container>Trabajo Práctico · Programación IV · UTN</Container></footer>}
    </div>
  );
}

export default function App() {
  return <BrowserRouter><AppLayout /></BrowserRouter>;
}
