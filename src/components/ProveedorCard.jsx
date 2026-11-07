const ProveedorCard = ({ proveedor, onCalificar }) => {
    const notas = [1, 2, 3, 4, 5];

    return (
        <div className="card shadow-sm mb-3 text-start">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{proveedor.razonSocial}</h5>
                    <span className="badge bg-primary">
                        Calificacion: {proveedor.calificacion}/5
                    </span>
                </div>

                <p className="card-text text-muted mb-1">
                    <strong>CUIT:</strong> {proveedor.cuit}
                </p>
                <p className="card-text text-muted mb-1">
                    <strong>Email:</strong> {proveedor.contacto?.email}
                </p>
                {proveedor.contacto?.telefono && (
                    <p className="card-text text-muted mb-1">
                        <strong>Telefono:</strong> {proveedor.contacto.telefono}
                    </p>
                )}
                {proveedor.direccion?.ciudad && (
                    <p className="card-text text-muted mb-2">
                        <strong>Ubicacion:</strong> {proveedor.direccion.calle ? `${proveedor.direccion.calle}, ` : ''}{proveedor.direccion.ciudad} ({proveedor.direccion.pais || 'Argentina'})
                    </p>
                )}

                <hr />

                <div className="d-flex align-items-center justify-content-between">
                    <span className="small text-secondary">Calificar proveedor:</span>
                    <div className="d-flex gap-1">
                        {notas.map((nota) => (
                            <button
                                key={nota}
                                type="button"
                                className={`btn btn-sm ${proveedor.calificacion === nota ? 'btn-warning' : 'btn-outline-secondary'}`}
                                onClick={() => onCalificar(proveedor._id, nota)}
                            >
                                {nota}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProveedorCard;

