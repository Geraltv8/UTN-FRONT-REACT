import { useState, useEffect } from 'react';
import { Container, Badge } from 'react-bootstrap';
import { getProductos } from '../services/productoService';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const cargarProductos = async () => {
      try {
        setCargando(true);
        const data = await getProductos();
        if (isMounted) {
          setProductos(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        if (isMounted) {
          setCargando(false);
        }
      }
    };

    cargarProductos();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold text-primary mb-1">Catálogo (React)</h1>
          <p className="text-muted mb-0">Listado general de productos disponibles</p>
        </div>
      </div>

      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Cargando productos...</p>
        </div>
      ) : productos.length === 0 ? (
        <div className="card border-0 shadow-sm text-center p-5">
          <p className="text-muted mb-0">No hay productos disponibles.</p>
        </div>
      ) : (
        <div className="row g-3">
          {productos.map((producto) => (
            <div className="col-12 col-md-6 col-lg-4" key={producto._id || producto.codigoSKU}>
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{producto.nombre}</h5>
                  <p className="card-text text-success fw-bold fs-5">${producto.precio}</p>
                  {producto.categoria && (
                    <Badge bg="secondary">{producto.categoria}</Badge>
                  )}
                  {producto.stock !== undefined && (
                    <p className="text-muted small mt-2 mb-0">Stock: {producto.stock} unidades</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Productos;
