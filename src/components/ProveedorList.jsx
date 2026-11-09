import ProveedorCard from "./ProveedorCard";

const ProveedorList = ({ proveedores, onActualizado }) => {
  if (proveedores.length === 0) {
    return <p className="text-muted">No hay proveedores para mostrar.</p>;
  }

  return (
    <div className="row g-3">
      {proveedores.map((proveedor) => (
        <div className="col-md-6" key={proveedor._id}>
          <ProveedorCard proveedor={proveedor} onActualizado={onActualizado} />
        </div>
      ))}
    </div>
  );
};

export default ProveedorList;
