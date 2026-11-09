const ProveedorCard = ({ proveedor, onCalificar, onEdit, onDelete }) => {
  const {
    _id,
    razonSocial,
    cuit,
    contacto = {},
    direccion = {},
    calificacion = 3,
    estadoActivo = true,
  } = proveedor;

  const renderEstrellas = (puntuacion) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <span
          key={i}
          style={{ cursor: 'pointer', fontSize: '1.2rem', color: i <= puntuacion ? '#ffc107' : '#e4e5e9' }}
          title={`Calificar con ${i} estrella${i > 1 ? 's' : ''}`}
          onClick={() => onCalificar && onCalificar(_id, i)}
        >
          ★
        </span>
      );
    }
    return estrellas;
  };

  return (
    <div className="card shadow-sm mb-3 h-100 border-0 shadow">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0 text-primary fw-bold">{razonSocial}</h5>
        <span className={`badge ${estadoActivo ? 'bg-success' : 'bg-secondary'}`}>
          {estadoActivo ? 'Activo' : 'Inactivo'}
        </span>
      </div>
      <div className="card-body">
        <p className="card-text mb-1">
          <strong>CUIT:</strong> <span className="text-muted">{cuit}</span>
        </p>
        <p className="card-text mb-1">
          <strong>Email:</strong> <span className="text-muted">{contacto.email || 'No especificado'}</span>
        </p>
        {contacto.telefono && (
          <p className="card-text mb-1">
            <strong>Teléfono:</strong> <span className="text-muted">{contacto.telefono}</span>
          </p>
        )}
        {(direccion.ciudad || direccion.calle) && (
          <p className="card-text mb-2">
            <strong>Ubicación:</strong>{' '}
            <span className="text-muted">
              {[direccion.calle, direccion.ciudad, direccion.pais].filter(Boolean).join(', ')}
            </span>
          </p>
        )}

        <div className="mt-3 p-2 bg-light rounded d-flex justify-content-between align-items-center">
          <small className="fw-bold text-secondary">Calificación:</small>
          <div>
            {renderEstrellas(calificacion)}
            <span className="ms-2 badge bg-warning text-dark fw-bold">
              {calificacion}/5
            </span>
          </div>
        </div>
      </div>

      <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center">
        <div className="btn-group btn-group-sm">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type="button"
              className={`btn btn-sm ${calificacion === val ? 'btn-warning text-dark fw-bold' : 'btn-outline-warning'}`}
              onClick={() => onCalificar && onCalificar(_id, val)}
              title={`Calificar ${val}`}
            >
              {val}⭐
            </button>
          ))}
        </div>
        {onDelete && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(_id)}
          >
            Borrar
          </button>
        )}
      </div>
    </div>
  );
};

export default ProveedorCard;
