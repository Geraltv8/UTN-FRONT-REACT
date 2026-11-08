import { useState, useEffect } from 'react';
import { Container, Badge } from 'react-bootstrap';

function Catalogo() {
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
      <div className="row">
        {productos.map(producto => (
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
      </div>
    </Container>
  );
}

export default Catalogo;