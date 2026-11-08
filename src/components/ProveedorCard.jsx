import { useState } from 'react';

const ProveedorCard = ({ proveedor, onCalificar }) => {
    const [calificacion, setCalificacion] = useState('');

    const handleCalificar = (evento) => {
        evento.preventDefault();
        onCalificar(proveedor._id, Number(calificacion));
        setCalificacion('');
    };

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <h5 className="card-title">{proveedor.razonSocial}</h5>
                <p className="card-text mb-1">
                    <strong>CUIT:</strong> {proveedor.cuit}
                </p>
                <p className="card-text mb-1">
                    <strong>Email:</strong> {proveedor.contacto.email}
                </p>
                <p className="card-text mb-3">
                    <strong>Calificación:</strong> {proveedor.calificacion}
                </p>

                <form onSubmit={handleCalificar}>
                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Calificación del 1 al 5"
                        min="1"
                        max="5"
                        value={calificacion}
                        onChange={(evento) => setCalificacion(evento.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-outline-primary"
                    >
                        Calificar proveedor
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProveedorCard;
