import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    obtenerProveedores,
    crearProveedor,
    calificarProveedor
} from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

// Estado inicial del formulario, aparte para poder reutilizarlo al resetear.
const FORM_VACIO = {
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    ciudad: ''
};

const Proveedores = () => {
    // 1. Estados: la memoria de la pantalla.
    const [lista, setLista] = useState([]);
    const [formData, setFormData] = useState(FORM_VACIO);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    const navegar = useNavigate();

    // 2. Efecto inicial: el array vacio [] hace que corra una sola vez al montar.
    // Definimos cargarDatos ADENTRO del efecto: asi no hace falta listarla
    // como dependencia y el lint queda limpio.
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const datos = await obtenerProveedores();
                setLista(datos);
            } catch (err) {
                // Si el token vencio o es invalido, el backend responde 401.
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navegar('/login');
                    return;
                }
                setError('No se pudieron cargar los proveedores');
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, [navegar]);

    // 3. Manejadores de eventos.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // El backend espera contacto y direccion como objetos anidados,
        // pero el formulario los maneja planos. Aca armamos la forma correcta.
        const nuevoProveedor = {
            razonSocial: formData.razonSocial,
            cuit: formData.cuit,
            contacto: {
                email: formData.email,
                telefono: formData.telefono
            },
            direccion: {
                ciudad: formData.ciudad
            }
        };

        try {
            const creado = await crearProveedor(nuevoProveedor);

            // Agregamos el nuevo a la lista local, sin volver a pedir todo al backend.
            setLista([...lista, creado]);
            setFormData(FORM_VACIO);
        } catch (err) {
            if (err.response?.status === 403) {
                setError('Tu usuario no tiene rol ADMIN: no puede crear proveedores');
                return;
            }
            setError(err.response?.data?.detalle || 'Error al guardar el proveedor');
        }
    };

    const handleCalificar = async (id, nota) => {
        try {
            const actualizado = await calificarProveedor(id, nota);

            // Reemplazamos solo el proveedor afectado y dejamos el resto igual.
            setLista(lista.map((p) => (p._id === id ? actualizado : p)));
        } catch {
            setError('No se pudo actualizar la calificación');
        }
    };

    const handleSalir = () => {
        localStorage.removeItem('token');
        navegar('/login');
    };

    // 4. Renderizado.
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Gestión de Proveedores</h1>
                <button className="btn btn-sm btn-outline-secondary" onClick={handleSalir}>
                    Salir
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                {/* Columna izquierda: formulario de alta */}
                <div className="col-md-4 mb-4">
                    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
                        <h5 className="mb-3">Nuevo proveedor</h5>

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Razón social"
                            value={formData.razonSocial}
                            onChange={(e) =>
                                setFormData({ ...formData, razonSocial: e.target.value })
                            }
                            required
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="CUIT (11 dígitos, sin guiones)"
                            value={formData.cuit}
                            onChange={(e) =>
                                setFormData({ ...formData, cuit: e.target.value })
                            }
                            pattern="\d{11}"
                            required
                        />
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email de contacto"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            required
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Teléfono"
                            value={formData.telefono}
                            onChange={(e) =>
                                setFormData({ ...formData, telefono: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Ciudad"
                            value={formData.ciudad}
                            onChange={(e) =>
                                setFormData({ ...formData, ciudad: e.target.value })
                            }
                        />

                        <button type="submit" className="btn btn-success w-100">
                            Guardar
                        </button>
                    </form>
                </div>

                {/* Columna derecha: listado */}
                <div className="col-md-8">
                    {cargando && <p className="text-muted">Cargando...</p>}

                    {!cargando && lista.length === 0 && (
                        <p className="text-muted">No hay proveedores registrados.</p>
                    )}

                    <div className="row">
                        {lista.map((proveedor) => (
                            <div className="col-md-6" key={proveedor._id}>
                                <ProveedorCard
                                    proveedor={proveedor}
                                    onCalificar={handleCalificar}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proveedores;
