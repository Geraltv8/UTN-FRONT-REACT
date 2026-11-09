import { useState } from 'react';

const ProveedorCard = ({ proveedor, item, onCalificar, onDelete, onEliminar }) => {
  // Soporte tanto para prop `proveedor` como `item`
  const prov = proveedor || item || {};
  const {
    _id,
    razonSocial = 'Sin Razón Social',
    cuit = 'Sin CUIT',
    contacto = {},
    direccion = {},
    calificacion = 3,
    estadoActivo = true,
  } = prov;

  const [ratingInput, setRatingInput] = useState(calificacion);
  const [isEditingRating, setIsEditingRating] = useState(false);

  const handleRatingSubmit = (nuevaCalificacion) => {
    const fnCalificar = onCalificar;
    if (fnCalificar) {
      fnCalificar(_id, nuevaCalificacion);
    }
    setIsEditingRating(false);
  };

  const handleDelete = () => {
    const fnEliminar = onDelete || onEliminar;
    if (fnEliminar) {
      fnEliminar(_id);
    }
  };

  return (
    <div className="card shadow-sm h-100 border-0 mb-3 bg-white">
      <div className="card-body d-flex flex-column justify-content-between p-3">
        <div>
          {/* Encabezado: Razón Social y Estado */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold text-primary mb-0">{razonSocial}</h5>
            <span className={`badge ${estadoActivo ? 'bg-success' : 'bg-secondary'}`}>
              {estadoActivo ? 'Activo' : 'Inactivo'}
            </span>
          </div>

          {/* CUIT */}
          <p className="card-subtitle text-muted small mb-2">
            <strong>CUIT:</strong> {cuit}
          </p>

          <hr className="my-2" />

          {/* Información de Contacto */}
          <div className="small mb-2">
            <div>
              <span className="text-secondary fw-semibold">Email: </span>
              <span>{contacto.email || 'No especificado'}</span>
            </div>
            {contacto.telefono && (
              <div>
                <span className="text-secondary fw-semibold">Tel: </span>
                <span>{contacto.telefono}</span>
              </div>
            )}
          </div>

          {/* Información de Dirección */}
          {(direccion.calle || direccion.ciudad) && (
            <div className="small text-muted mb-2">
              <span className="fw-semibold">Ubicación: </span>
              <span>
                {[direccion.calle, direccion.ciudad, direccion.pais || 'Argentina']
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </div>
          )}

          {/* Calificación */}
          <div className="mt-3 p-2 rounded bg-light border">
            <div className="d-flex justify-content-between align-items-center">
              <span className="small fw-semibold text-secondary">Calificación:</span>
              <span className="badge bg-warning text-dark fw-bold">
                {'★'.repeat(calificacion)}{'☆'.repeat(Math.max(0, 5 - calificacion))} ({calificacion}/5)
              </span>
            </div>

            {/* Controles para Calificar */}
            {isEditingRating ? (
              <div className="mt-2 pt-2 border-top">
                <label className="form-label small text-muted mb-1">
                  Seleccionar nueva puntuación (1 a 5):
                </label>
                <div className="d-flex gap-1 justify-content-center">
                  {[1, 2, 3, 4, 5].map((estrella) => (
                    <button
                      key={estrella}
                      type="button"
                      className={`btn btn-sm ${
                        estrella <= ratingInput ? 'btn-warning text-dark' : 'btn-outline-secondary'
                      }`}
                      onClick={() => {
                        setRatingInput(estrella);
                        handleRatingSubmit(estrella);
                      }}
                      title={`Calificar con ${estrella} estrellas`}
                    >
                      {estrella} ★
                    </button>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary ms-1"
                    onClick={() => setIsEditingRating(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="d-flex justify-content-end gap-2 mt-3 pt-2 border-top">
          <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={() => setIsEditingRating(!isEditingRating)}
          >
            {isEditingRating ? 'Cerrar' : 'Calificar'}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProveedorCard;

