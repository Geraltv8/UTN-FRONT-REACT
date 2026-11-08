// Componente "tonto": recibe el proveedor por props y avisa al padre cuando
// el usuario elige una calificación. No sabe nada de la API.
const ProveedorCard = ({ proveedor, onCalificar, calificando = false }) => {
    const estrellas = [1, 2, 3, 4, 5];

    return (
        <div className="card shadow-sm mb-3 h-100">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title mb-1">{proveedor.razonSocial}</h5>
                    <span className={`badge ${proveedor.estadoActivo ? 'bg-success' : 'bg-secondary'}`}>
                        {proveedor.estadoActivo ? 'Activo' : 'Inactivo'}
                    </span>
                </div>

                <p className="card-text text-muted mb-1">CUIT {proveedor.cuit}</p>
                <p className="card-text mb-1">
                    <small>{proveedor.contacto?.email}</small>
                    {proveedor.contacto?.telefono && (
                        <small className="text-muted"> · {proveedor.contacto.telefono}</small>
                    )}
                </p>
                <p className="card-text text-muted">
                    <small>
                        {[proveedor.direccion?.calle, proveedor.direccion?.ciudad, proveedor.direccion?.pais]
                            .filter(Boolean)
                            .join(', ')}
                    </small>
                </p>

                <div className="mt-auto pt-2 border-top">
                    <span className="d-block text-muted mb-1"><small>Calificar proveedor</small></span>
                    <div className="btn-group" role="group" aria-label="Calificación del proveedor">
                        {estrellas.map((valor) => (
                            <button
                                key={valor}
                                type="button"
                                disabled={calificando}
                                className={`btn btn-sm ${
                                    valor <= proveedor.calificacion ? 'btn-warning' : 'btn-outline-warning'
                                }`}
                                onClick={() => onCalificar(proveedor._id, valor)}
                                title={`Calificar con ${valor}`}
                            >
                                ★
                            </button>
                        ))}
                        <span className="btn btn-sm btn-light disabled">{proveedor.calificacion}/5</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProveedorCard;
