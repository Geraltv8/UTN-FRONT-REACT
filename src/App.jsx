import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Proveedores from "./pages/Proveedores";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/proveedores" element={<Proveedores />} />
        </Route>
        <Route path="*" element={<Navigate to="/proveedores" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
