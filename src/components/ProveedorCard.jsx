const CALIFICACIONES = [1, 2, 3, 4, 5];

const ProveedorCard = ({ proveedor, onCalificar }) => {
    const { _id, razonSocial, cuit, contacto, direccion, calificacion, estadoActivo } = proveedor;

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title">{razonSocial}</h5>
                    <span className={`badge ${estadoActivo ? 'bg-success' : 'bg-secondary'}`}>
                        {estadoActivo ? 'Activo' : 'Inactivo'}
                    </span>
                </div>

                <p className="card-text text-muted mb-1">CUIT: {cuit}</p>
                <p className="card-text mb-1">{contacto.email}</p>
                {contacto.telefono && <p className="card-text mb-1">{contacto.telefono}</p>}
                {direccion?.ciudad && <p className="card-text mb-1">{direccion.ciudad}</p>}

                <div className="mt-3">
                    <small className="text-muted d-block mb-1">
                        Calificación actual: {calificacion} / 5
                    </small>
                    <div className="btn-group btn-group-sm" role="group" aria-label="Calificar proveedor">
                        {CALIFICACIONES.map((valor) => (
                            <button
                                key={valor}
                                type="button"
                                className={`btn ${valor === calificacion ? 'btn-warning' : 'btn-outline-warning'}`}
                                onClick={() => onCalificar(_id, valor)}
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