const ProveedorCard = ({ proveedor, onCalificar }) => {
    const estrellas = [1, 2, 3, 4, 5];

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <h5 className="card-title">{proveedor.razonSocial}</h5>
                <p className="card-text mb-1"><strong>CUIT:</strong> {proveedor.cuit}</p>
                <p className="card-text mb-1"><strong>Email:</strong> {proveedor.contacto?.email}</p>
                {proveedor.contacto?.telefono && (
                    <p className="card-text mb-1"><strong>Teléfono:</strong> {proveedor.contacto.telefono}</p>
                )}
                {proveedor.direccion?.ciudad && (
                    <p className="card-text mb-1"><strong>Ciudad:</strong> {proveedor.direccion.ciudad}</p>
                )}

                <div className="mt-3">
                    <small className="text-muted d-block mb-1">
                        Calificación actual: {proveedor.calificacion}/5
                    </small>
                    {estrellas.map((valor) => (
                        <button
                            key={valor}
                            type="button"
                            className={`btn btn-sm me-1 ${valor <= proveedor.calificacion ? 'btn-warning' : 'btn-outline-secondary'}`}
                            onClick={() => onCalificar(proveedor._id, valor)}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProveedorCard;