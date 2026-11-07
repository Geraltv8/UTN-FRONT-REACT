import { useState } from 'react';

/**
 * Componente visual reutilizable para mostrar los datos de un proveedor.
 * Recibe por props los datos del item y los callbacks de acción.
 * 
 * @param {Object} props
 * @param {Object} props.proveedor - Datos del proveedor
 * @param {Function} props.onCalificar - Callback para actualizar calificación (id, nuevaNota)
 */
const ProveedorCard = ({ proveedor, onCalificar }) => {
    const [cargando, setCargando] = useState(false);

    const handleCalificarClick = async (nuevaNota) => {
        if (nuevaNota === proveedor.calificacion) return;
        try {
            setCargando(true);
            await onCalificar(proveedor._id, nuevaNota);
        } finally {
            setCargando(false);
        }
    };

    // Formateo de CUIT estilo XX-XXXXXXXX-X para mejor legibilidad
    const formatearCuit = (cuit) => {
        if (!cuit || cuit.length !== 11) return cuit || 'N/A';
        return `${cuit.slice(0, 2)}-${cuit.slice(2, 10)}-${cuit.slice(10)}`;
    };

    const renderEstrellas = (calificacion) => {
        const rating = Math.round(calificacion || 0);
        return [1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                style={{ cursor: 'pointer', fontSize: '1.25rem', userSelect: 'none' }}
                className={star <= rating ? 'text-warning' : 'text-secondary opacity-50'}
                title={`Asignar ${star} estrellas`}
                onClick={() => !cargando && handleCalificarClick(star)}
            >
                ★
            </span>
        ));
    };

    return (
        <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
            <div className="card-body d-flex flex-column">
                {/* Cabecera de la tarjeta */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold text-dark mb-0 text-truncate" title={proveedor.razonSocial}>
                        {proveedor.razonSocial}
                    </h5>
                    <span className={`badge ${proveedor.estadoActivo ? 'bg-success' : 'bg-secondary'}`}>
                        {proveedor.estadoActivo ? 'Activo' : 'Inactivo'}
                    </span>
                </div>

                {/* CUIT */}
                <p className="text-muted small mb-3">
                    <strong>CUIT:</strong> {formatearCuit(proveedor.cuit)}
                </p>

                {/* Información de Contacto */}
                <div className="mb-2 small">
                    <div className="d-flex align-items-center mb-1 text-truncate">
                        <span className="me-2 text-primary">✉</span>
                        <a href={`mailto:${proveedor.contacto?.email}`} className="text-decoration-none text-secondary">
                            {proveedor.contacto?.email || 'Sin email'}
                        </a>
                    </div>
                    {proveedor.contacto?.telefono && (
                        <div className="d-flex align-items-center text-truncate">
                            <span className="me-2 text-primary">☎</span>
                            <span className="text-secondary">{proveedor.contacto.telefono}</span>
                        </div>
                    )}
                </div>

                {/* Dirección / Ubicación */}
                <div className="mb-3 small text-muted">
                    <span className="me-2 text-primary">📍</span>
                    <span>
                        {proveedor.direccion?.calle ? `${proveedor.direccion.calle}, ` : ''}
                        <strong>{proveedor.direccion?.ciudad || 'Ciudad no especificada'}</strong>
                        {proveedor.direccion?.pais ? ` (${proveedor.direccion.pais})` : ''}
                    </span>
                </div>

                {/* Sección Calificación y Botones de Acción */}
                <div className="mt-auto pt-3 border-top">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small fw-semibold text-secondary">Calificación:</span>
                        <div className="d-flex align-items-center gap-1">
                            {renderEstrellas(proveedor.calificacion)}
                            <span className="badge bg-light text-dark border ms-1 fw-bold">
                                {proveedor.calificacion} / 5
                            </span>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between gap-1 mt-2">
                        <span className="small text-muted">Calificar:</span>
                        <div className="btn-group btn-group-sm" role="group" aria-label="Calificar proveedor">
                            {[1, 2, 3, 4, 5].map((nota) => (
                                <button
                                    key={nota}
                                    type="button"
                                    disabled={cargando}
                                    onClick={() => handleCalificarClick(nota)}
                                    className={`btn btn-sm ${
                                        proveedor.calificacion === nota
                                            ? 'btn-warning fw-bold text-dark'
                                            : 'btn-outline-secondary'
                                    }`}
                                    title={`Calificar con ${nota}`}
                                >
                                    {nota}★
                                </button>
                            ))}
                        </div>
                    </div>

                    {cargando && (
                        <div className="text-center mt-2">
                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                                <span className="visually-hidden">Guardando calificación...</span>
                            </div>
                            <span className="small text-primary ms-1">Guardando...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProveedorCard;
