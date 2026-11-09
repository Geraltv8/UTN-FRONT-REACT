
import { useState } from 'react';
import { actualizarCalificacion } from '../services/proveedorService';

function ProveedorCalificacion({ proveedor, onCalificacionActualizada }) {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const calificar = async (valor) => {
    try {
      setCargando(true);
      setError('');

      await actualizarCalificacion(proveedor._id, valor);

      onCalificacionActualizada?.();
    } catch (err) {
      setError(
        err.response?.data?.mensaje || 'No se pudo actualizar la calificación.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="mt-3">
      <p className="mb-2">
        Calificación actual: <strong>{proveedor.calificacion} / 5</strong>
      </p>

      <div className="d-flex gap-2">
        {[1, 2, 3, 4, 5].map(valor => (
          <button
            key={valor}
            type="button"
            className={`btn btn-sm ${
              valor === proveedor.calificacion
                ? 'btn-warning'
                : 'btn-outline-warning'
            }`}
            disabled={cargando}
            onClick={() => calificar(valor)}
          >
            {valor} ★
          </button>
        ))}
      </div>

      {error && <small className="text-danger">{error}</small>}
    </div>
  );
}

export default ProveedorCalificacion;
