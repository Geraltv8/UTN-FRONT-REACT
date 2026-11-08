import { Card, Badge } from 'react-bootstrap';
import StarRating from './StarRating';

const ProveedorCard = ({ proveedor, onCalificar, calificando }) => {
  const { razonSocial, cuit, contacto, direccion, calificacion, estadoActivo } = proveedor;

  return (
    <Card className="shadow-sm h-100">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{razonSocial}</Card.Title>
          <Badge bg={estadoActivo ? 'success' : 'secondary'}>
            {estadoActivo ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
        <Card.Subtitle className="text-muted small mb-3">CUIT {cuit}</Card.Subtitle>

        <ul className="list-unstyled small mb-3">
          <li>{contacto?.email}</li>
          {contacto?.telefono && <li>{contacto.telefono}</li>}
          {direccion?.ciudad && <li>{[direccion.calle, direccion.ciudad].filter(Boolean).join(', ')}</li>}
        </ul>

        <div className="mt-auto">
          <StarRating
            valor={calificacion}
            deshabilitado={calificando}
            onChange={(valor) => onCalificar(proveedor._id, valor)}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProveedorCard;
