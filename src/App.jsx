import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Componentes y Páginas
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Proveedores from './pages/Proveedores';

/**
 * App.jsx: El cerebro del enrutamiento.
 * Orquesta la navegación de la aplicación protegiendo las vistas administrativas
 * con el componente envoltorio ProtectedRoute.
 */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta Pública: Inicio de Sesión */}
                <Route path="/login" element={<Login />} />

                {/* Rutas Protegidas: Requieren Token JWT válido en localStorage */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/proveedores" element={<Proveedores />} />
                </Route>

                {/* Redirección por defecto ante rutas desconocidas */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
