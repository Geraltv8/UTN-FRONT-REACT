import { useState } from 'react';

function ProveedorCard({ proveedor, onCalificar, calificando }) {
  const [calificacion, setCalificacion] = useState(proveedor.calificacion ?? 3);
  const nombre = proveedor.razonSocial || 'Proveedor sin razón social';
  const direccion = [
    proveedor.direccion?.calle,
    proveedor.direccion?.ciudad,
    proveedor.direccion?.pais,
  ].filter(Boolean).join(', ');

  const handleSubmit = (evento) => {
    evento.preventDefault();
    onCalificar(proveedor._id, Number(calificacion));
  };

  return (
    <article className="provider-card h-100">
      <div className="d-flex align-items-start gap-3">
        <div className="provider-initial" aria-hidden="true">{nombre.charAt(0)}</div>
        <div className="min-w-0 flex-grow-1">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <h3 className="h5 mb-0 text-break">{nombre}</h3>
            <span className={`status-pill${proveedor.estadoActivo === false ? ' inactive' : ''}`}>
              {proveedor.estadoActivo === false ? 'Inactivo' : 'Activo'}
            </span>
          </div>
          <p className="small text-secondary mt-2 mb-0">CUIT {proveedor.cuit || 'No informado'}</p>
        </div>
      </div>

      <div className="border-top mt-3 pt-3">
        <p className="mb-1 text-break">
          <span className="text-secondary">Contacto:</span>{' '}
          {proveedor.contacto?.email || 'Sin email'}
        </p>
        {proveedor.contacto?.telefono && (
          <p className="mb-1 text-secondary">{proveedor.contacto.telefono}</p>
        )}
        <p className="mb-0 text-secondary">{direccion || 'Dirección no informada'}</p>
      </div>

      <form className="d-flex align-items-end gap-2 mt-4" onSubmit={handleSubmit}>
        <label className="flex-grow-1">
          <span className="field-label d-block mb-1">Calificación</span>
          <select
            className="form-select"
            value={calificacion}
            onChange={(evento) => setCalificacion(evento.target.value)}
            aria-label={`Calificación para ${nombre}`}
          >
            {[1, 2, 3, 4, 5].map((valor) => (
              <option key={valor} value={valor}>
                {valor} {valor === 1 ? 'estrella' : 'estrellas'}
              </option>
            ))}
          </select>
        </label>
        <button className="btn btn-outline-primary" type="submit" disabled={calificando}>
          {calificando ? 'Guardando…' : 'Calificar'}
        </button>
      </form>
    </article>
  );
}

export default ProveedorCard;
