import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import BarraNavegacion from './components/BarraNavegacion';
import RutaProtegida from './components/RutaProtegida';
import Login from './pages/Login';
import Proveedores from './pages/Proveedores';
import Catalogo from './pages/Catalogo';

function App() {
    return (
        <BrowserRouter>
            <BarraNavegacion />
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* Todas las rutas de acá adentro requieren autenticación */}
                <Route element={<RutaProtegida />}>
                    <Route path="/proveedores" element={<Proveedores />} />
                    <Route path="/productos" element={<Catalogo />} />
                </Route>

                <Route path="/" element={<Navigate to="/proveedores" replace />} />
                <Route path="*" element={<Navigate to="/proveedores" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
