const ProveedorCard = ({ proveedor, onCalificar }) => {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">{proveedor.razonSocial}</h5>
        <p className="card-text text-muted mb-1">
          <strong>CUIT:</strong> {proveedor.cuit}
        </p>
        <p className="card-text text-muted mb-1">
          <strong>Email:</strong> {proveedor.contacto?.email}
        </p>
        <p className="card-text text-muted mb-1">
          <strong>Ciudad:</strong> {proveedor.direccion?.ciudad || '—'}
        </p>
        <p className="card-text">
          <strong>Calificación:</strong> {proveedor.calificacion} ⭐
        </p>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => onCalificar(proveedor._id)}
        >
          Calificar
        </button>
      </div>
    </div>
  );
};

export default ProveedorCard;
