import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Proveedores from './pages/Proveedores';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/" element={<Navigate to="/proveedores" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
