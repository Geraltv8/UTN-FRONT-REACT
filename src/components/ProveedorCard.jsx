const ProveedorCard = ({ proveedor, onCalificar }) => {
    return (
    <div className="card shadow-sm mb-3">
        <div className="card-body">
            <h5 className="card-title">(proveedor.nombre)</h5>
            <p className="card-text text-muted">
                <strong>Rubro / Contacto:</strong> {proveedor.contacto || 'Sin especificar'}
            </p>
            <p className="card-text">
                <span ClassName="badge bg-info text-dark">
                    Calificación: {proveedor.califacion ?? 'Sin calificar'}
                </span>
            </p>

            <div className="d-flex justify-content-end gap-2 mt-3">
                {/* Botón de acción para calificar conectado a la función enviada desde la Vista*/}
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onCalificar(proveedor._id || proveedor.id)}
                >
                    Calificar
                </button>
            </div>
        </div>
    </div>
    );
};

export default ProveedorCard;
