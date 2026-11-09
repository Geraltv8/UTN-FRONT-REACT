import ProveedorCard from './ProveedorCard';

// Itera la lista y renderiza una card por proveedor.
const ProveedorList = ({ proveedores, onCalificar }) => {
    if (proveedores.length === 0) {
        return <p className="text-muted">No hay proveedores para mostrar.</p>;
    }

    return (
        <div className="row">
            {proveedores.map((p) => (
                <div className="col-md-6" key={p._id}>
                    <ProveedorCard proveedor={p} onCalificar={onCalificar} />
                </div>
            ))}
        </div>
    );
};

export default ProveedorList;
