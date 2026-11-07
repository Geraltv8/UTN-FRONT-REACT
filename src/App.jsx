import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Proveedores from './pages/Proveedores';

// App.jsx solo define el mapa de navegacion. No tiene logica de negocio.
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta publica */}
                <Route path="/login" element={<Login />} />

                {/* Todo lo que este adentro requiere token */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/proveedores" element={<Proveedores />} />
                </Route>

                {/* La raiz redirige al listado; si no hay token, el portero manda al login */}
                <Route path="/" element={<Navigate to="/proveedores" replace />} />

                {/* Cualquier ruta inexistente */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
