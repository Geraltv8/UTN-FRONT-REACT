import { useState } from 'react';

const StarRating = ({ valor, onChange, deshabilitado = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="d-flex align-items-center gap-1">
      {[1, 2, 3, 4, 5].map((estrella) => (
        <button
          key={estrella}
          type="button"
          className="btn btn-link p-0 border-0 text-decoration-none"
          style={{ fontSize: '1.4rem', color: estrella <= (hover || valor) ? '#ffc107' : '#ced4da' }}
          disabled={deshabilitado}
          title={`Calificar con ${estrella}`}
          onClick={() => onChange(estrella)}
          onMouseEnter={() => setHover(estrella)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </button>
      ))}
      <small className="text-muted ms-1">{valor}/5</small>
    </div>
  );
};

export default StarRating;
