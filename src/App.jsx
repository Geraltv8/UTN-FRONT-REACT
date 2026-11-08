import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login.jsx';
import Proveedores from './pages/Proveedores.jsx';

function RutaProtegida() {
  return localStorage.getItem('token') ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RutaProtegida />}>
          <Route path="/" element={<Navigate to="/proveedores" replace />} />
          <Route path="/proveedores" element={<Proveedores />} />
        </Route>
        <Route path="*" element={<Navigate to="/proveedores" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
