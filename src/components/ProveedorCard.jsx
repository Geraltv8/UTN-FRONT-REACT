import { Badge, Button, Card, Col } from 'react-bootstrap';

export default function ProveedorCard({ proveedor, onCalificar, actualizando }) {
  const calificacion = Number(proveedor.calificacion || 0);

  return (
    <Col xs={12} md={6} xl={4}>
      <Card className="provider-card h-100 border-0 shadow-sm">
        <Card.Body className="d-flex flex-column p-4">
          <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
            <div>
              <p className="eyebrow mb-1">Proveedor</p>
              <Card.Title className="provider-name mb-0">{proveedor.razonSocial}</Card.Title>
            </div>
            <Badge bg={proveedor.estadoActivo === false ? 'secondary' : 'success'} pill>
              {proveedor.estadoActivo === false ? 'Inactivo' : 'Activo'}
            </Badge>
          </div>

          <div className="provider-details">
            <p><span>CUIT</span>{proveedor.cuit}</p>
            <p><span>Email</span>{proveedor.contacto?.email || 'Sin email'}</p>
            <p><span>Teléfono</span>{proveedor.contacto?.telefono || 'Sin teléfono'}</p>
            <p><span>Ubicación</span>{[proveedor.direccion?.ciudad, proveedor.direccion?.pais].filter(Boolean).join(', ') || 'Sin ubicación'}</p>
          </div>

          <div className="rating-panel mt-auto pt-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="eyebrow">Calificación</span>
              <strong className="rating-value">{calificacion.toFixed(1)} <span>/ 5</span></strong>
            </div>
            <div className="d-flex gap-2" aria-label={`Calificación actual: ${calificacion} de 5`}>
              {[1, 2, 3, 4, 5].map((valor) => (
                <Button
                  key={valor}
                  type="button"
                  size="sm"
                  variant={valor <= calificacion ? 'warning' : 'outline-secondary'}
                  className="rating-button flex-fill"
                  aria-label={`Calificar con ${valor}`}
                  aria-pressed={valor === calificacion}
                  disabled={actualizando}
                  onClick={() => onCalificar(proveedor._id, valor)}
                >
                  {valor}
                </Button>
              ))}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
