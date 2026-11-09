// Componente "tonto": recibe datos por props y avisa al padre mediante callbacks.
const ProveedorCard = ({ proveedor, onCalificar }) => {
  const { razonSocial, cuit, contacto, direccion, calificacion, estadoActivo } = proveedor;

  return (
    <div className="card shadow-sm mb-3 h-100 text-start">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title">{razonSocial}</h5>
          <span className={`badge ${estadoActivo ? 'text-bg-success' : 'text-bg-secondary'}`}>
            {estadoActivo ? 'Activo' : 'Inactivo'}
          </span>
        </div>
        <p className="card-text text-muted mb-1">CUIT: {cuit}</p>
        <p className="card-text mb-1">
          {contacto?.email}
          {contacto?.telefono && ` · ${contacto.telefono}`}
        </p>
        <p className="card-text text-muted">
          {[direccion?.calle, direccion?.ciudad, direccion?.pais].filter(Boolean).join(', ')}
        </p>

        <div className="d-flex align-items-center gap-1 mt-3">
          <span className="me-2 small">Calificar:</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={`btn btn-sm ${n <= calificacion ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => onCalificar(proveedor._id, n)}
              title={`Calificar con ${n}`}
            >
              ★
            </button>
          ))}
          <span className="ms-2 fw-bold">{calificacion}/5</span>
        </div>
      </div>
    </div>
  );
};

export default ProveedorCard;
