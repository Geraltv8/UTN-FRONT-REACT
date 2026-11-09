
import ProveedorCalificacion from './ProveedorCalificacion';

function ProveedorCard({ proveedor, onCalificacionActualizada }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title">{proveedor.razonSocial}</h5>

        <p className="mb-1">
          <strong>CUIT:</strong> {proveedor.cuit}
        </p>

        <p className="mb-1">
          <strong>Email:</strong> {proveedor.contacto?.email}
        </p>

        <p className="mb-1">
          <strong>Teléfono:</strong> {proveedor.contacto?.telefono || 'No informado'}
        </p>

        <p className="mb-1">
          <strong>Ciudad:</strong> {proveedor.direccion?.ciudad || 'No informada'}
        </p>

        <span className={`badge ${
          proveedor.estadoActivo ? 'bg-success' : 'bg-secondary'
        }`}>
          {proveedor.estadoActivo ? 'Activo' : 'Inactivo'}
        </span>

        <ProveedorCalificacion
          proveedor={proveedor}
          onCalificacionActualizada={onCalificacionActualizada}
        />
      </div>
    </div>
  );
}

export default ProveedorCard;
