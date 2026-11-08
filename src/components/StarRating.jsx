import { useState } from 'react';

function StarRating({ calificacion = 0, onCalificar }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="d-flex align-items-center gap-1">
      {[1, 2, 3, 4, 5].map((estrella) => (
        <span
          key={estrella}
          role="button"
          style={{
            cursor: 'pointer',
            fontSize: '1.4rem',
            color: estrella <= (hover || calificacion) ? '#ffc107' : '#e4e5e9',
            transition: 'color 0.15s',
          }}
          onClick={() => onCalificar && onCalificar(estrella)}
          onMouseEnter={() => setHover(estrella)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      ))}
      <small className="text-muted ms-1">({calificacion}/5)</small>
    </div>
  );
}

export default StarRating;

