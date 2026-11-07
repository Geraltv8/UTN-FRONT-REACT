import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Proveedores from './pages/Proveedores.jsx';
import Productos from './pages/Productos.jsx';
import { cerrarSesion } from './services/authService.js';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    const expirar = () => setToken(null);
    window.addEventListener('sesion-expirada', expirar);
    return () => window.removeEventListener('sesion-expirada', expirar);
  }, []);

  function iniciar(tokenNuevo) {
    localStorage.setItem('token', tokenNuevo);
    setToken(tokenNuevo);
  }

  function salir() {
    cerrarSesion();
    setToken(null);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={iniciar} autenticado={Boolean(token)} />} />
        <Route element={<ProtectedRoute autenticado={Boolean(token)} />}>
          <Route element={<Layout onLogout={salir} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/proveedores" element={<Proveedores />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/proveedores" replace />} />
        <Route path="*" element={<Navigate to="/proveedores" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
