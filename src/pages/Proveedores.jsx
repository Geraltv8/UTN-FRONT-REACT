import { useState, useEffect } from 'react';
import { obtenerProveedores, crearProveedor, calificarProveedor } from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

const estadoInicialFormulario = {
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    calle: '',
    ciudad: '',
    calificacion: 3
};

const Proveedores = () => {
    const [lista, setLista] = useState([]);
    const [formData, setFormData] = useState(estadoInicialFormulario);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const datos = await obtenerProveedores();
                setLista(datos);
            } catch (error) {
                console.error('Error al cargar los proveedores', error);
            }
        };

        cargarDatos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoProveedor = {
                razonSocial: formData.razonSocial,
                cuit: formData.cuit,
                contacto: {
                    email: formData.email,
                    telefono: formData.telefono
                },
                direccion: {
                    calle: formData.calle,
                    ciudad: formData.ciudad,
                    pais: 'Argentina'
                },
                calificacion: Number(formData.calificacion)
            };

            const proveedorCreado = await crearProveedor(nuevoProveedor);
            setLista([...lista, proveedorCreado]);
            setFormData(estadoInicialFormulario);
        } catch (error) {
            const mensaje = error.response?.data?.detalle || error.response?.data?.mensaje || 'Error al guardar el proveedor';
            alert(mensaje);
        }
    };

    const handleCalificar = async (id, nuevaCalificacion) => {
        try {
            const proveedorActualizado = await calificarProveedor(id, nuevaCalificacion);
            setLista(lista.map((item) => (item._id === id ? proveedorActualizado : item)));
        } catch (error) {
            console.error('Error al calificar', error);
            alert('Error al actualizar la calificacion');
        }
    };

    return (
        <div className="container mt-4 text-start">
            <h1 className="mb-4">Gestion de Proveedores</h1>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
                        <h5 className="mb-3">Nuevo Proveedor</h5>

                        <label className="form-label small mb-1">Razon Social</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ej: Tech Solutions S.A."
                            value={formData.razonSocial}
                            onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                            required
                        />

                        <label className="form-label small mb-1">CUIT (11 numeros sin guiones)</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ej: 30712345678"
                            pattern="\d{11}"
                            title="Debe contener exactamente 11 numeros sin guiones"
                            value={formData.cuit}
                            onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
                            required
                        />

                        <label className="form-label small mb-1">Email de Contacto</label>
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="contacto@empresa.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />

                        <label className="form-label small mb-1">Telefono</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ej: +54 11 5555-4444"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        />

                        <label className="form-label small mb-1">Calle</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ej: Av. Siempre Viva 123"
                            value={formData.calle}
                            onChange={(e) => setFormData({ ...formData, calle: e.target.value })}
                        />

                        <label className="form-label small mb-1">Ciudad</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ej: Cordoba"
                            value={formData.ciudad}
                            onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                        />

                        <label className="form-label small mb-1">Calificacion Inicial</label>
                        <select
                            className="form-select mb-3"
                            value={formData.calificacion}
                            onChange={(e) => setFormData({ ...formData, calificacion: Number(e.target.value) })}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>

                        <button type="submit" className="btn btn-success w-100">
                            Guardar Proveedor
                        </button>
                    </form>
                </div>

                <div className="col-md-8">
                    <div className="row">
                        {lista.map((proveedor) => (
                            <div className="col-md-6" key={proveedor._id}>
                                <ProveedorCard
                                    proveedor={proveedor}
                                    onCalificar={handleCalificar}
                                />
                            </div>
                        ))}
                        {lista.length === 0 && (
                            <p className="text-muted">No hay proveedores registrados para mostrar.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proveedores;

