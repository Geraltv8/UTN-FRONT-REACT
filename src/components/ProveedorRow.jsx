import { esCalificacionValida } from '../utils/proveedores.js';

export default function ProveedorRow({ proveedor, onCalificar, guardando }) {
  const puntuacion = Number(proveedor.calificacion) || 0;
  return (
    <article className="supplier-card">
      <div className="supplier-head">
        <span className="supplier-avatar" aria-hidden="true">
          {proveedor.razonSocial?.slice(0, 1).toUpperCase() || 'P'}
        </span>
        <div className="supplier-identity">
          <h3>{proveedor.razonSocial}</h3>
          <span className="supplier-cuit">CUIT {proveedor.cuit}</span>
        </div>
        <span className={proveedor.estadoActivo === false ? 'status inactive' : 'status'}>
          {proveedor.estadoActivo === false ? 'Inactivo' : 'Activo'}
        </span>
      </div>

      <dl className="supplier-details">
        <div><dt>Correo electrónico</dt><dd>{proveedor.contacto?.email || 'Sin registrar'}</dd></div>
        <div><dt>Teléfono</dt><dd>{proveedor.contacto?.telefono || 'Sin registrar'}</dd></div>
        <div><dt>Ubicación</dt><dd>{[proveedor.direccion?.ciudad, proveedor.direccion?.pais].filter(Boolean).join(', ') || 'Sin registrar'}</dd></div>
      </dl>

      <div className="supplier-rating">
        <div><strong>Calificación</strong><small>Seleccioná una estrella para actualizar</small></div>
        <div className="rating-controls" role="group" aria-label={'Calificación de ' + proveedor.razonSocial}>
          {[1, 2, 3, 4, 5].map((numero) => (
            <button
              key={numero}
              type="button"
              className={numero <= puntuacion ? 'star selected' : 'star'}
              aria-label={'Calificar con ' + numero + (numero === 1 ? ' estrella' : ' estrellas')}
              aria-pressed={esCalificacionValida(puntuacion) && numero === puntuacion}
              title={numero + ' de 5'}
              onClick={() => onCalificar(proveedor._id, numero)}
              disabled={guardando}
            >★</button>
          ))}
          <span className="rating-value">{puntuacion}/5</span>
        </div>
      </div>
    </article>
  );
}
