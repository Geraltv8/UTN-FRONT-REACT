// Componente visual reutilizable: recibe los datos y las funciones por props
const ProveedorCard = ({ item, onCalificar }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{item.razonSocial}</h5>
        <p className="card-text text-muted mb-1">CUIT: {item.cuit}</p>
        <p className="card-text text-muted mb-1">Email: {item.contacto?.email}</p>
        <p className="card-text text-muted mb-1">Ciudad: {item.direccion?.ciudad}</p>
        <p className="card-text">Calificación: {item.calificacion} / 5</p>

        <div className="d-flex justify-content-end gap-2 mt-3">
          {/* Botones de acción conectados a la función pasada por el componente Padre */}
          {[1, 2, 3, 4, 5].map((numero) => (
            <button
              key={numero}
              className="btn btn-sm btn-outline-warning"
              onClick={() => onCalificar(item._id, numero)}
            >
              {numero}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProveedorCard;
