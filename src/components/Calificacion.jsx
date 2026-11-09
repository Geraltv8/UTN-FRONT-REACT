import { useState } from "react";

// Componente genérico de estrellas.
// Props:
//   valor        → calificación actual (número)
//   onChange     → función que se llama con el nuevo valor. Si no se pasa, es solo lectura
//   max          → cantidad de estrellas (por defecto 5)
//   deshabilitado → bloquea los clics (ej: mientras se guarda en la API)
const Calificacion = ({ valor, onChange, max = 5, deshabilitado = false }) => {
  // Estado local solo visual: que estrella tiene el mouse encima
  const [hover, setHover] = useState(0);

  const soloLectura = !onChange || deshabilitado;
  const valorMostrado = hover || valor;

  // Array [1, 2, 3, 4, 5] para dibujar una estrella por cada numero
  const estrellas = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className="d-flex gap-1" onMouseLeave={() => setHover(0)}>
      {estrellas.map((numero) => (
        <button
          key={numero}
          type="button"
          className="btn btn-link p-0 text-decoration-none fs-4"
          style={{ color: numero <= valorMostrado ? "#ffc107" : "#ced4da" }}
          disabled={soloLectura}
          onMouseEnter={() => !soloLectura && setHover(numero)}
          onClick={() => onChange(numero)}
          aria-label={`Calificar con ${numero} de ${max}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default Calificacion;
