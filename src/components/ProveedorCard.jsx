import { useState } from 'react';

const ProveedorCard = ({ proveedor, item, onCalificar, onUpdateCalificacion }) => {
  const p = proveedor || item || {};
  const handlerCalificar = onCalificar || onUpdateCalificacion;

  const [hoverRating, setHoverRating] = useState(0);
  const [actualizando, setActualizando] = useState(false);

  const calificacionActual = p.calificacion || 0;

  const handleStarClick = async (puntuacion) => {
    if (!handlerCalificar || actualizando) return;
    try {
      setActualizando(true);
      await handlerCalificar(p._id, puntuacion);
    } catch (error) {
      console.error('Error al actualizar calificación:', error);
    } finally {
      setActualizando(false);
    }
  };

  return (
    <div className="card shadow-sm h-100 border-0 mb-3" style={{ background: '#ffffff', borderRadius: '12px' }}>
      <div className="card-body d-flex flex-column justify-content-between p-4">
        <div>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold text-dark mb-0">{p.razonSocial}</h5>
            <span className={`badge ${p.estadoActivo !== false ? 'bg-success' : 'bg-secondary'}`}>
              {p.estadoActivo !== false ? 'Activo' : 'Inactivo'}
            </span>
          </div>

          <p className="text-muted small mb-3">
            <i className="bi bi-file-earmark-text me-1"></i>CUIT: <span className="fw-semibold text-secondary">{p.cuit}</span>
          </p>

          <div className="mb-3">
            <h6 className="fw-bold text-muted small text-uppercase mb-2">Contacto</h6>
            <div className="small text-secondary mb-1">
              <strong>Email:</strong> {p.contacto?.email || 'No registrado'}
            </div>
            {p.contacto?.telefono && (
              <div className="small text-secondary">
                <strong>Teléfono:</strong> {p.contacto.telefono}
              </div>
            )}
          </div>

          {(p.direccion?.ciudad || p.direccion?.calle) && (
            <div className="mb-3">
              <h6 className="fw-bold text-muted small text-uppercase mb-2">Ubicación</h6>
              <div className="small text-secondary">
                {[p.direccion?.calle, p.direccion?.ciudad, p.direccion?.pais || 'Argentina']
                  .filter(Boolean)
                  .join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* Interfaz de Calificación Interactiva */}
        <div className="border-top pt-3 mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="small fw-bold text-muted d-block">Calificación:</span>
              <span className="badge bg-warning text-dark fw-bold me-2">
                {calificacionActual} / 5
              </span>
            </div>

            <div
              className="d-flex align-items-center"
              role="group"
              aria-label="Calificar proveedor"
            >
              {[1, 2, 3, 4, 5].map((estrella) => {
                const marcada = (hoverRating || calificacionActual) >= estrella;
                return (
                  <button
                    key={estrella}
                    type="button"
                    className="btn btn-link p-1 text-decoration-none border-0"
                    style={{
                      fontSize: '1.4rem',
                      lineHeight: '1',
                      cursor: actualizando ? 'wait' : 'pointer',
                      transition: 'transform 0.15s ease',
                      transform: (hoverRating || calificacionActual) >= estrella ? 'scale(1.15)' : 'scale(1)',
                    }}
                    onMouseEnter={() => setHoverRating(estrella)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleStarClick(estrella)}
                    title={`Puntuar ${estrella} estrellas`}
                    disabled={actualizando}
                  >
                    <span style={{ color: marcada ? '#ffc107' : '#dee2e6' }}>
                      ★
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          {actualizando && (
            <div className="text-end mt-1">
              <span className="spinner-border spinner-border-sm text-warning" role="status"></span>
              <span className="small text-muted ms-1">Guardando...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProveedorCard;

