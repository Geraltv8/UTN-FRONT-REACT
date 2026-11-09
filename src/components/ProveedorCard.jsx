import Calificador from './Calificador';

// Componente "tonto": recibe datos por props y avisa al padre mediante funciones.
const ProveedorCard = ({ proveedor, onCalificar }) => {
    const { razonSocial, cuit, contacto, direccion, calificacion, _id } = proveedor;

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <h5 className="card-title">{razonSocial}</h5>
                <p className="card-text text-muted mb-1">CUIT: {cuit}</p>
                <p className="card-text text-muted mb-1">{contacto?.email}</p>
                <p className="card-text text-muted mb-1">{contacto?.telefono}</p>
                {direccion?.ciudad && <p className="card-text text-muted mb-1">{direccion.ciudad}</p>}

                <p className="my-2">
                    <strong>Calificación:</strong> {calificacion} / 5
                </p>

                <Calificador valor={calificacion} onCambiar={(puntaje) => onCalificar(_id, puntaje)} />
            </div>
        </div>
    );
};

export default ProveedorCard;
