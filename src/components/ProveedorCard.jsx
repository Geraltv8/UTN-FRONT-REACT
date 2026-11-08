const ProveedorCard = ({ item, onCalificar }) => {
  const puntajes = [1, 2, 3, 4, 5];

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{item.razonSocial}</h5>
          <span className="badge bg-warning text-dark">
            ★ {item.calificacion}/5
          </span>
        </div>

        <p className="card-text text-muted mb-1">
          <strong>CUIT:</strong> {item.cuit}
        </p>
        <p className="card-text text-muted mb-1">
          <strong>Email:</strong> {item.contacto?.email}
        </p>
        {item.contacto?.telefono && (
          <p className="card-text text-muted mb-1">
            <strong>Teléfono:</strong> {item.contacto.telefono}
          </p>
        )}
        {item.direccion?.ciudad && (
          <p className="card-text text-muted mb-2">
            <strong>Ubicación:</strong> {item.direccion.calle ? `${item.direccion.calle}, ` : ''}{item.direccion.ciudad}
          </p>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
          <small className="text-muted">Calificar:</small>
          <div className="d-flex gap-1">
            {puntajes.map((valor) => (
              <button
                key={valor}
                type="button"
                className={`btn btn-sm ${valor <= item.calificacion ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => onCalificar(item._id, valor)}
              >
                {valor}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProveedorCard;
