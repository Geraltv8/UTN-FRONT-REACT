import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Badge } from 'react-bootstrap';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from 'react-router-dom';
import Proveedores from './pages/Proveedores';

const RutaProtegida = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? children || <Outlet /> : <Navigate to="/" />;
};

const Catalogo = () => {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error("error conectando al backend", error));
  }, []);

  return (
    <Container>
      <h1 className="text-primary">Catálogo (React)</h1>
      <div className="row"></div>
      {productos.map(producto => (
        <div className="col-md-4 mb-3" key={producto._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text text-success fw-bold">${producto.precio}</p>
                <Badge variant="secondary">{producto.categoria}</Badge>
              </div>
            </div>
          </div>
        ))}
    </Container>
  )
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route element={<RutaProtegida />}>
          <Route path="/proveedores" element={<Proveedores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
