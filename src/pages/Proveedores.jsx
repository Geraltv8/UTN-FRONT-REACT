import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProveedorCard from '../components/ProveedorCard';
import {
    obtenerProveedores,
    crearProveedor,
    actualizarCalificacion
} from '../services/proveedorService';

const ESTADO_INICIAL_FORM = {
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    calle: '',
    ciudad: '',
    calificacion: 3
};

const Proveedores = () => {
    // 1. Estados principales (memoria de la pantalla)
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState(ESTADO_INICIAL_FORM);
    const [filtroCiudad, setFiltroCiudad] = useState('');
    const [cargandoLista, setCargandoLista] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [mensajeExito, setMensajeExito] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    // Función para obtener datos desde la capa de servicios
    const cargarProveedores = async (ciudad = '') => {
        try {
            setCargandoLista(true);
            setMensajeError('');
            const data = await obtenerProveedores(ciudad);
            setProveedores(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error al cargar proveedores:', error);
            setMensajeError(
                error.response?.data?.mensaje || 'Error al conectar con la API de proveedores.'
            );
        } finally {
            setCargandoLista(false);
        }
    };

    // 2. Efecto de carga inicial
    useEffect(() => {
        let isMounted = true;
        obtenerProveedores()
            .then((data) => {
                if (isMounted) {
                    setProveedores(Array.isArray(data) ? data : []);
                    setCargandoLista(false);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    console.error('Error al cargar proveedores:', error);
                    setMensajeError(
                        error.response?.data?.mensaje || 'Error al conectar con la API de proveedores.'
                    );
                    setCargandoLista(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    // Manejador del filtro por ciudad
    const handleBuscarCiudad = (e) => {
        e.preventDefault();
        cargarProveedores(filtroCiudad.trim());
    };

    const handleLimpiarFiltro = () => {
        setFiltroCiudad('');
        cargarProveedores('');
    };

    // Manejador de cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Manejador del submit para registrar un nuevo proveedor (POST)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensajeExito('');
        setMensajeError('');

        // Validación de CUIT: exactamente 11 números
        const cuitLimpio = formData.cuit.replace(/\D/g, '');
        if (cuitLimpio.length !== 11) {
            setMensajeError('El CUIT debe contener exactamente 11 dígitos numéricos sin guiones.');
            return;
        }

        // Construcción del payload según el modelo de Mongoose
        const payloadNuevoProveedor = {
            razonSocial: formData.razonSocial.trim(),
            cuit: cuitLimpio,
            contacto: {
                email: formData.email.trim().toLowerCase(),
                telefono: formData.telefono.trim()
            },
            direccion: {
                calle: formData.calle.trim(),
                ciudad: formData.ciudad.trim(),
                pais: 'Argentina'
            },
            calificacion: Number(formData.calificacion) || 3
        };

        try {
            setGuardando(true);
            const proveedorCreado = await crearProveedor(payloadNuevoProveedor);

            // Actualización optimista del estado local en React
            setProveedores([proveedorCreado, ...proveedores]);
            setMensajeExito(`Proveedor "${proveedorCreado.razonSocial}" registrado exitosamente.`);
            setFormData(ESTADO_INICIAL_FORM);

            // Auto-ocultar mensaje de éxito a los 4 segundos
            setTimeout(() => setMensajeExito(''), 4000);
        } catch (error) {
            console.error('Error al registrar proveedor:', error);
            const detalle = error.response?.data?.detalle || error.response?.data?.mensaje;
            setMensajeError(detalle || 'Error al guardar el proveedor. Verifica que no esté duplicado el CUIT.');
        } finally {
            setGuardando(false);
        }
    };

    // Manejador de la acción Calificar (PATCH /:id/calificacion)
    const handleCalificar = async (id, nuevaCalificacion) => {
        try {
            const proveedorActualizado = await actualizarCalificacion(id, nuevaCalificacion);

            // Actualiza inmediatamente la lista en memoria sin recargar la página
            setProveedores((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? { ...item, calificacion: proveedorActualizado.calificacion || nuevaCalificacion }
                        : item
                )
            );

            setMensajeExito(`Calificación actualizada a ${nuevaCalificacion}★ para ${proveedorActualizado.razonSocial || 'el proveedor'}.`);
            setTimeout(() => setMensajeExito(''), 3000);
        } catch (error) {
            console.error('Error al calificar proveedor:', error);
            alert(error.response?.data?.mensaje || 'No se pudo actualizar la calificación.');
        }
    };

    return (
        <div>
            <Navbar />

            <main className="container pb-5">
                {/* Título de la sección */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
                    <div>
                        <h2 className="fw-bold text-dark mb-0">Gestión de Proveedores</h2>
                        <p className="text-muted small mb-0">
                            CRUD completo conectado a la API REST (Node.js & MongoDB) mediante Axios Interceptors.
                        </p>
                    </div>
                    <span className="badge bg-primary fs-6 px-3 py-2">
                        Total: {proveedores.length} {proveedores.length === 1 ? 'proveedor' : 'proveedores'}
                    </span>
                </div>

                {/* Notificaciones de éxito y error */}
                {mensajeExito && (
                    <div className="alert alert-success alert-dismissible fade show d-flex align-items-center" role="alert">
                        <span className="me-2">✅</span>
                        <div>{mensajeExito}</div>
                        <button type="button" className="btn-close" onClick={() => setMensajeExito('')}></button>
                    </div>
                )}

                {mensajeError && (
                    <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center" role="alert">
                        <span className="me-2">⚠️</span>
                        <div>{mensajeError}</div>
                        <button type="button" className="btn-close" onClick={() => setMensajeError('')}></button>
                    </div>
                )}

                <div className="row g-4">
                    {/* Columna Izquierda: Formulario para registrar nuevo proveedor */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px', zIndex: 10 }}>
                            <div className="card-header bg-dark text-white py-3">
                                <h5 className="mb-0 fw-bold fs-6">➕ Registrar Nuevo Proveedor</h5>
                            </div>
                            <div className="card-body p-3 p-md-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">
                                            Razón Social *
                                        </label>
                                        <input
                                            type="text"
                                            name="razonSocial"
                                            required
                                            placeholder="Ej: DISTRIBUIDORA NORTE S.A."
                                            className="form-control"
                                            value={formData.razonSocial}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">
                                            CUIT (11 números) *
                                        </label>
                                        <input
                                            type="text"
                                            name="cuit"
                                            required
                                            maxLength={11}
                                            placeholder="Ej: 30123456789"
                                            className="form-control"
                                            value={formData.cuit}
                                            onChange={handleInputChange}
                                        />
                                        <small className="text-muted">Exactamente 11 dígitos, sin guiones.</small>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">
                                            Email de Contacto *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="ventas@proveedor.com"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">
                                            Teléfono
                                        </label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            placeholder="+54 9 11 5555-0000"
                                            className="form-control"
                                            value={formData.telefono}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="row g-2 mb-3">
                                        <div className="col-md-7">
                                            <label className="form-label small fw-semibold text-secondary">
                                                Calle y N°
                                            </label>
                                            <input
                                                type="text"
                                                name="calle"
                                                placeholder="Av. Santa Fe 1234"
                                                className="form-control"
                                                value={formData.calle}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label small fw-semibold text-secondary">
                                                Ciudad
                                            </label>
                                            <input
                                                type="text"
                                                name="ciudad"
                                                placeholder="Buenos Aires"
                                                className="form-control"
                                                value={formData.ciudad}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label small fw-semibold text-secondary d-flex justify-content-between">
                                            <span>Calificación Inicial</span>
                                            <span className="badge bg-warning text-dark">{formData.calificacion} ★</span>
                                        </label>
                                        <input
                                            type="range"
                                            name="calificacion"
                                            min="1"
                                            max="5"
                                            step="1"
                                            className="form-range"
                                            value={formData.calificacion}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={guardando}
                                        className="btn btn-primary w-100 fw-bold shadow-sm"
                                    >
                                        {guardando ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Guardando...
                                            </>
                                        ) : (
                                            'Guardar Proveedor'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Filtros y Listado de Proveedores */}
                    <div className="col-lg-8">
                        {/* Barra de Filtro por Ciudad */}
                        <div className="card shadow-sm border-0 mb-4">
                            <div className="card-body p-3">
                                <form onSubmit={handleBuscarCiudad} className="row g-2 align-items-center">
                                    <div className="col-sm-8">
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">🔍</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Filtrar por ciudad (ej: Buenos Aires, Cordoba)..."
                                                value={filtroCiudad}
                                                onChange={(e) => setFiltroCiudad(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 d-flex gap-2">
                                        <button type="submit" className="btn btn-outline-primary flex-grow-1">
                                            Filtrar
                                        </button>
                                        {filtroCiudad && (
                                            <button
                                                type="button"
                                                onClick={handleLimpiarFiltro}
                                                className="btn btn-outline-secondary"
                                                title="Limpiar filtro"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Estado de carga */}
                        {cargandoLista ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando proveedores...</span>
                                </div>
                                <p className="text-muted mt-2">Cargando proveedores desde la API...</p>
                            </div>
                        ) : (
                            /* Grilla de ProveedorCards */
                            <div className="row g-3">
                                {proveedores.map((item) => (
                                    <div className="col-md-6" key={item._id}>
                                        <ProveedorCard
                                            proveedor={item}
                                            onCalificar={handleCalificar}
                                        />
                                    </div>
                                ))}

                                {proveedores.length === 0 && (
                                    <div className="col-12 text-center py-5">
                                        <div className="card border-0 bg-light p-5">
                                            <span className="fs-1 mb-2">📭</span>
                                            <h5 className="text-muted">No se encontraron proveedores</h5>
                                            <p className="text-muted small mb-3">
                                                {filtroCiudad
                                                    ? `No hay registros que coincidan con la ciudad "${filtroCiudad}".`
                                                    : 'Aún no hay proveedores registrados. Utiliza el formulario para crear el primero.'}
                                            </p>
                                            {filtroCiudad && (
                                                <div>
                                                    <button onClick={handleLimpiarFiltro} className="btn btn-sm btn-primary">
                                                        Ver todos los proveedores
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Proveedores;
