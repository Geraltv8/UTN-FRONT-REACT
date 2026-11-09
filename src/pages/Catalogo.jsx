import { useState, useEffect } from 'react';
import { Container, Badge } from 'react-bootstrap';
import api from '../services/api';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .get('/productos')
      .then((response) => setProductos(response.data))
      .catch((error) => console.error('Error conectando al backend:', error))
      .finally(() => setCargando(false));
  }, []);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary h2 mb-0">Catálogo de Productos</h1>
        <span className="text-muted small">Módulo Público</span>
      </div>

      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-muted mt-2">Cargando productos...</p>
        </div>
      ) : productos.length === 0 ? (
        <div className="alert alert-light border text-center p-4">
          No hay productos disponibles en el catálogo en este momento.
        </div>
      ) : (
        <div className="row">
          {productos.map((producto) => (
            <div className="col-md-4 mb-3" key={producto._id || producto.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-dark">{producto.nombre}</h5>
                  <p className="card-text text-success fw-bold">${producto.precio}</p>
                  <Badge bg="secondary">{producto.categoria || 'General'}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Catalogo;

