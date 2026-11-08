function ProveedorCard({ proveedor, onRate, calificando }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onRate(proveedor._id, Number(formData.get('calificacion')));
  }

  return (
    <article className="provider-card">
      <div className="provider-card-heading">
        <div className="provider-avatar" aria-hidden="true">
          {(proveedor.razonSocial || 'P').slice(0, 1)}
        </div>
        <div className="provider-title">
          <h3>{proveedor.razonSocial}</h3>
          <span className={`status-pill ${proveedor.estadoActivo ? 'is-active' : 'is-inactive'}`}>
            {proveedor.estadoActivo ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>

      <dl className="provider-details">
        <div>
          <dt>CUIT</dt>
          <dd>{proveedor.cuit}</dd>
        </div>
        <div>
          <dt>Contacto</dt>
          <dd>{proveedor.contacto?.email || 'Sin correo'}</dd>
        </div>
        <div>
          <dt>Teléfono</dt>
          <dd>{proveedor.contacto?.telefono || 'No informado'}</dd>
        </div>
        <div>
          <dt>Ubicación</dt>
          <dd>
            {[proveedor.direccion?.ciudad, proveedor.direccion?.pais].filter(Boolean).join(', ')
              || 'No informada'}
          </dd>
        </div>
      </dl>

      <form className="rating-form" onSubmit={handleSubmit}>
        <label htmlFor={`rating-${proveedor._id}`}>
          Calificación <strong>{proveedor.calificacion ?? '—'}/5</strong>
        </label>
        <div className="rating-controls">
          <select
            id={`rating-${proveedor._id}`}
            name="calificacion"
            className="form-select"
            defaultValue={proveedor.calificacion ?? 3}
            aria-label={`Nueva calificación para ${proveedor.razonSocial}`}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>{value} de 5</option>
            ))}
          </select>
          <button className="btn btn-outline-primary" type="submit" disabled={calificando}>
            {calificando ? 'Guardando…' : 'Calificar'}
          </button>
        </div>
      </form>
    </article>
  );
}

export default ProveedorCard;
