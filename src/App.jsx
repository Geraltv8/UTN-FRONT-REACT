import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Proveedores from './pages/Proveedores';

// Componente de ruta protegida según la arquitectura del TP
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : children; 
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección automática al módulo de proveedores */}
        <Route path="/" element={<Navigate to="/proveedores" replace />} />

        {/* Ruta protegida requerida por el TP */}
        <Route 
          path="/proveedores" 
          element={
            <ProtectedRoute>
              <Proveedores />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;