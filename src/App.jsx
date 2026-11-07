import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Proveedores from './pages/Proveedores';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige la raíz directamente a /proveedores */}
        <Route path="/" element={<Navigate to="/proveedores" replace />} />
        
        {/* Ruta principal del TP Proveedores */}
        <Route path="/proveedores" element={<Proveedores />} />
        
        {/* Ruta por si ingresan cualquier otra URL */}
        <Route path="*" element={<Navigate to="/proveedores" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;