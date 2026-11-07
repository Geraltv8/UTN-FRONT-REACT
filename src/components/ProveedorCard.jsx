// Componente "tonto": no tiene estado propio ni sabe de la API.
// Recibe un proveedor por props y avisa al padre cuando se lo quiere calificar.
const ProveedorCard = ({ proveedor, onCalificar }) => {
    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <h5 className="card-title">{proveedor.razonSocial}</h5>
                <p className="card-text text-muted mb-1">CUIT: {proveedor.cuit}</p>
                <p className="card-text text-muted mb-1">{proveedor.contacto?.email}</p>
                <p className="card-text text-muted">
                    {proveedor.direccion?.ciudad}
                </p>

                <p className="card-text">
                    Calificación: <strong>{proveedor.calificacion}</strong> / 5
                </p>

                {/* Un botón por nota. Al hacer clic avisamos al padre con el id y la nota. */}
                <div className="d-flex gap-1">
                    {[1, 2, 3, 4, 5].map((nota) => (
                        <button
                            key={nota}
                            className={
                                nota === proveedor.calificacion
                                    ? 'btn btn-sm btn-primary'
                                    : 'btn btn-sm btn-outline-primary'
                            }
                            onClick={() => onCalificar(proveedor._id, nota)}
                        >
                            {nota}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProveedorCard;
