import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Catalogo from './pages/Catalogo';
import Proveedores from './pages/Proveedores';

// La Navbar se monta solo en rutas privadas, así se vuelve a crear en cada login
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
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutPrivado />}>
            <Route path="/" element={<Catalogo />} />
            <Route path="/proveedores" element={<Proveedores />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
