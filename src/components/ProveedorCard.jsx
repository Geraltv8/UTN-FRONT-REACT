// src/components/ProveedorCard.jsx
import React from 'react';

const ProveedorCard = ({ item, onCalificar }) => {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between align-items-center">
          <span>{item.razonSocial}</span>
          <span className="badge bg-info text-dark">
            ⭐ {item.calificacion ?? 'Sin calificar'}
          </span>
        </h5>
        
        <p className="card-text text-muted mb-1">
          <strong>CUIT:</strong> {item.cuit}
        </p>
        <p className="card-text text-muted mb-1">
          <strong>Email:</strong> {item.contacto?.email || 'Sin especificar'}
        </p>
        <p className="card-text text-muted mb-1">
          <strong>Teléfono:</strong> {item.contacto?.telefono || 'Sin especificar'}
        </p>
        <p className="card-text text-muted">
          <strong>Categorías:</strong> {item.categorias?.length > 0 ? item.categorias.join(', ') : 'General'}
        </p>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => onCalificar(item)}
          >
            Calificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProveedorCard;