import { useState, useEffect } from 'react';
import { Container, Badge } from 'react-bootstrap';
import api from '../services/api';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/productos')
      .then((response) => setProductos(response.data))
      .catch((error) => console.error('error conectando al backend', error));
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-primary mb-4">Catálogo (React)</h1>
      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-4 mb-3" key={producto._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text text-success fw-bold">${producto.precio}</p>
                <Badge bg="secondary">{producto.categoria}</Badge>
              </div>
            </div>
          </div>
        ))}
        {productos.length === 0 && (
          <p className="text-muted">No hay productos cargados.</p>
        )}
      </div>
    </Container>
  );
};

export default Catalogo;
