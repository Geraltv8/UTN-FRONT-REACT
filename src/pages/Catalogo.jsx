import { useState, useEffect } from 'react';
import { Container, Badge } from 'react-bootstrap';
import { obtenerProductos } from '../services/productoService';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch((error) => console.error('Error al cargar productos', error));
  }, []);

  return (
    <Container>
      <h1 className="text-primary mb-4">Catálogo</h1>
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
        {productos.length === 0 && <p className="text-muted">No hay productos cargados.</p>}
      </div>
    </Container>
  );
};

export default Catalogo;
