import { useEffect, useState } from 'react';
import ProveedorCard from '../components/ProveedorCard';
import {
    actualizarCalificacion,
    crearProveedor,
    obtenerProveedores
} from '../services/proveedorService';

const proveedorInicial = {
    razonSocial: '',
    cuit: '',
    contacto: {
        email: '',
        telefono: ''
    },
    direccion: {
        calle: '',
        ciudad: '',
        pais: 'Argentina'
    }
};

const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState(proveedorInicial);

    useEffect(() => {
        const cargarProveedores = async () => {
            try {
                const datos = await obtenerProveedores();
                setProveedores(datos);
            } catch (error) {
                console.error('Error al cargar los proveedores', error);
            }
        };

        cargarProveedores();
    }, []);

    const handleSubmit = async (evento) => {
        evento.preventDefault();

        try {
            const proveedorNuevo = await crearProveedor(formData);
            setProveedores([...proveedores, proveedorNuevo]);
            setFormData(proveedorInicial);
        } catch (error) {
            console.error('Error al crear el proveedor', error);
            alert('Error al guardar el proveedor');
        }
    };

    const handleCalificar = async (id, calificacion) => {
        if (!calificacion || calificacion < 1 || calificacion > 5) {
            alert('La calificación debe ser un número entre 1 y 5');
            return;
        }

        try {
            const proveedorActualizado = await actualizarCalificacion(
                id,
                calificacion
            );

            setProveedores(proveedores.map((proveedor) =>
                proveedor._id === id ? proveedorActualizado : proveedor
            ));
        } catch (error) {
            console.error('Error al actualizar la calificación', error);
            alert('Error al actualizar la calificación');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Gestión de Proveedores</h1>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <form
                        onSubmit={handleSubmit}
                        className="card p-3 shadow-sm"
                    >
                        <h5 className="mb-3">Nuevo proveedor</h5>

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Razón social"
                            value={formData.razonSocial}
                            onChange={(evento) => setFormData({
                                ...formData,
                                razonSocial: evento.target.value
                            })}
                            required
                        />

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="CUIT"
                            value={formData.cuit}
                            onChange={(evento) => setFormData({
                                ...formData,
                                cuit: evento.target.value
                            })}
                            required
                        />

                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email de contacto"
                            value={formData.contacto.email}
                            onChange={(evento) => setFormData({
                                ...formData,
                                contacto: {
                                    ...formData.contacto,
                                    email: evento.target.value
                                }
                            })}
                            required
                        />

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Teléfono"
                            value={formData.contacto.telefono}
                            onChange={(evento) => setFormData({
                                ...formData,
                                contacto: {
                                    ...formData.contacto,
                                    telefono: evento.target.value
                                }
                            })}
                        />

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Calle"
                            value={formData.direccion.calle}
                            onChange={(evento) => setFormData({
                                ...formData,
                                direccion: {
                                    ...formData.direccion,
                                    calle: evento.target.value
                                }
                            })}
                        />

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ciudad"
                            value={formData.direccion.ciudad}
                            onChange={(evento) => setFormData({
                                ...formData,
                                direccion: {
                                    ...formData.direccion,
                                    ciudad: evento.target.value
                                }
                            })}
                        />

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="País"
                            value={formData.direccion.pais}
                            onChange={(evento) => setFormData({
                                ...formData,
                                direccion: {
                                    ...formData.direccion,
                                    pais: evento.target.value
                                }
                            })}
                        />

                        <button type="submit" className="btn btn-success w-100">
                            Guardar proveedor
                        </button>
                    </form>
                </div>

                <div className="col-md-8">
                    <div className="row">
                        {proveedores.map((proveedor) => (
                            <div className="col-md-6" key={proveedor._id}>
                                <ProveedorCard
                                    proveedor={proveedor}
                                    onCalificar={handleCalificar}
                                />
                            </div>
                        ))}

                        {proveedores.length === 0 && (
                            <p className="text-muted">
                                No hay proveedores para mostrar.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proveedores;
