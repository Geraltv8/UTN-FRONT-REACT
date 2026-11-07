import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Proveedores from './pages/Proveedores';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Layout de las rutas autenticadas: barra de navegación + la página actual.
const LayoutPrivado = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Todas las rutas aquí dentro requieren autenticación */}
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutPrivado />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/proveedores" element={<Proveedores />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
