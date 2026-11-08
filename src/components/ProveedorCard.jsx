import { Badge } from 'react-bootstrap';
import StarRating from './StarRating';

function ProveedorCard({ proveedor, onCalificar }) {
  const { _id, razonSocial, cuit, contacto, direccion, calificacion, estadoActivo } = proveedor;

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{razonSocial}</h5>
          <Badge bg={estadoActivo ? 'success' : 'secondary'}>
            {estadoActivo ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>

        <p className="card-text mb-1">
          <strong>CUIT:</strong> {cuit}
        </p>

        {contacto && (
          <>
            {contacto.email && (
              <p className="card-text mb-1">
                <strong>Email:</strong> {contacto.email}
              </p>
            )}
            {contacto.telefono && (
              <p className="card-text mb-1">
                <strong>Teléfono:</strong> {contacto.telefono}
              </p>
            )}
          </>
        )}

        {direccion && (
          <p className="card-text mb-2">
            <strong>Dirección:</strong> {direccion.calle}
            {direccion.ciudad ? `, ${direccion.ciudad}` : ''}
          </p>
        )}

        <div className="mt-2">
          <small className="text-muted d-block mb-1">Calificación:</small>
          <StarRating
            calificacion={calificacion || 0}
            onCalificar={(nuevaNota) => onCalificar(_id, nuevaNota)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProveedorCard;

