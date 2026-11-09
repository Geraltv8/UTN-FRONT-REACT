import { useState } from "react";
import Calificacion from "./Calificacion";
import { calificarProveedor } from "../services/proveedorService";
import { obtenerMensajeError } from "../utils/obtenerMensajeError";

const ProveedorCard = ({ proveedor, onActualizado }) => {
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const handleCalificar = async (calificacion) => {
    setGuardando(true);
    setError("");
    try {
      const proveedorActualizado = await calificarProveedor(proveedor._id, calificacion);
      onActualizado(proveedorActualizado);
    } catch (err) {
      setError(obtenerMensajeError(err, "Error al calificar"));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{proveedor.razonSocial}</h5>
          <span className={`badge ${proveedor.estadoActivo ? "bg-success" : "bg-secondary"}`}>
            {proveedor.estadoActivo ? "Activo" : "Inactivo"}
          </span>
        </div>
        <p className="card-text text-muted small mb-2">CUIT: {proveedor.cuit}</p>
        <p className="card-text mb-1">{proveedor.contacto?.email}</p>
        {proveedor.contacto?.telefono && (
          <p className="card-text mb-1">{proveedor.contacto.telefono}</p>
        )}
        {proveedor.direccion?.ciudad && (
          <p className="card-text mb-2">
            {[proveedor.direccion.calle, proveedor.direccion.ciudad].filter(Boolean).join(", ")}
          </p>
        )}
        <Calificacion
          valor={proveedor.calificacion}
          onChange={handleCalificar}
          deshabilitado={guardando}
        />
        {error && <p className="text-danger small mt-2 mb-0">{error}</p>}
      </div>
    </div>
  );
};

export default ProveedorCard;
