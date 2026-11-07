import { useState, useEffect } from 'react';
import { obtenerProveedores, crearProveedor, calificarProveedor } from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

const FORMULARIO_INICIAL = { razonSocial: '', cuit: '', email: '', telefono: '', ciudad: '' };

// Traduce el error de Axios a un mensaje para mostrar al usuario.
const obtenerMensajeError = (error) => {
    if (error.response?.status === 403) {
        return 'Solo un administrador puede registrar proveedores.';
    }
    const datos = error.response?.data;
    return datos?.detalle || datos?.mensaje || 'No se pudo completar la operación.';
};

const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState(FORMULARIO_INICIAL);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarProveedores = async () => {
            try {
                const datos = await obtenerProveedores();
                setProveedores(datos);
            } catch (err) {
                setError(obtenerMensajeError(err));
            }
        };

        cargarProveedores();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const nuevo = await crearProveedor({
                razonSocial: formData.razonSocial,
                cuit: formData.cuit,
                contacto: { email: formData.email, telefono: formData.telefono },
                direccion: { ciudad: formData.ciudad }
            });
            setProveedores([...proveedores, nuevo]);
            setFormData(FORMULARIO_INICIAL);
        } catch (err) {
            setError(obtenerMensajeError(err));
        }
    };

    const handleCalificar = async (id, calificacion) => {
        setError('');
        try {
            const actualizado = await calificarProveedor(id, calificacion);
            setProveedores(proveedores.map((p) => (p._id === id ? actualizado : p)));
        } catch (err) {
            setError(obtenerMensajeError(err));
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Gestión de Proveedores</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                <div className="col-md-4 mb-4">
                    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
                        <h5>Nuevo Proveedor</h5>
                        <input
                            type="text"
                            name="razonSocial"
                            className="form-control mb-2"
                            placeholder="Razón social"
                            value={formData.razonSocial}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="cuit"
                            className="form-control mb-2"
                            placeholder="CUIT (11 números, sin guiones)"
                            value={formData.cuit}
                            onChange={handleChange}
                            inputMode="numeric"
                            pattern="\d{11}"
                            title="El CUIT debe tener exactamente 11 números, sin guiones"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            className="form-control mb-2"
                            placeholder="Email de contacto"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="telefono"
                            className="form-control mb-2"
                            placeholder="Teléfono (opcional)"
                            value={formData.telefono}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="ciudad"
                            className="form-control mb-3"
                            placeholder="Ciudad (opcional)"
                            value={formData.ciudad}
                            onChange={handleChange}
                        />
                        <button type="submit" className="btn btn-success w-100">
                            Guardar
                        </button>
                    </form>
                </div>

                <div className="col-md-8">
                    <div className="row">
                        {proveedores.map((proveedor) => (
                            <div className="col-md-6" key={proveedor._id}>
                                <ProveedorCard proveedor={proveedor} onCalificar={handleCalificar} />
                            </div>
                        ))}
                        {proveedores.length === 0 && (
                            <p className="text-muted">No hay proveedores para mostrar.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proveedores;