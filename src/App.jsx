import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Proveedores from './pages/Proveedores';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    {/* Todas las rutas aquí dentro requieren autenticación */}
                    <Route path="/proveedores" element={<Proveedores />} />
                </Route>
                <Route path="*" element={<Navigate to="/proveedores" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;