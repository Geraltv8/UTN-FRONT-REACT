const ProveedorCard = ({ proveedor, onEdit, onDelete }) => {
    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <h5 className="card-title">{proveedor.nombre}</h5>
                <p className="card-text text-muted mb-1">
                    <strong>Email:</strong> {proveedor.email || 'N/A'}
                </p>
                <p className="card-text text-muted mb-1">
                    <strong>Teléfono:</strong> {proveedor.telefono || 'N/A'}
                </p>
                {proveedor.calificacion !== undefined && (
                    <span className="badge bg-info text-dark mb-2">
                        Calificación: {proveedor.calificacion} / 5
                    </span>
                )}
                
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button 
                        className="btn btn-sm btn-outline-warning" 
                        onClick={() => onEdit(proveedor)}
                    >
                        Editar
                    </button>
                    <button 
                        className="btn btn-sm btn-outline-danger" 
                        onClick={() => onDelete(proveedor._id || proveedor.id)}
                    >
                        Borrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProveedorCard;