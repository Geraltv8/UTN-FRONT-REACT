
import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

import ProveedorForm from '../components/ProveedorForm';
import ProveedorCard from '../components/ProveedorCard';
import { obtenerProveedores } from '../services/proveedorService';

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarProveedores = useCallback(async () => {
    try {
      setError('');
      const datos = await obtenerProveedores();

      setProveedores(
        Array.isArray(datos) ? datos : datos.proveedores || []
      );
    } catch (err) {
      setError(
        err.response?.data?.mensaje ||
        'No se pudieron cargar los proveedores.'
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarProveedores();
  }, [cargarProveedores]);

  return (
    <Container className="py-4">
      <h1 className="text-primary mb-4">Gestión de proveedores</h1>

      <ProveedorForm onProveedorCreado={cargarProveedores} />

      <h3 className="mb-3">Listado de proveedores</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      {cargando ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando proveedores...</p>
        </div>
      ) : proveedores.length === 0 ? (
        <Alert variant="info">Todavía no hay proveedores registrados.</Alert>
      ) : (
        <Row>
          {proveedores.map(proveedor => (
            <Col md={6} lg={4} className="mb-3" key={proveedor._id}>
              <ProveedorCard
                proveedor={proveedor}
                onCalificacionActualizada={cargarProveedores}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Proveedores;
