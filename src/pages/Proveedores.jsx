import { useEffect, useState } from 'react';
import {
    obtenerProveedores,
    crearProveedor,
    calificarProveedor
} from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';
import { esAdmin } from '../services/authService';

const FORMULARIO_VACIO = {
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    calle: '',
    ciudad: '',
    pais: 'Argentina',
    calificacion: 3
};

const Proveedores = () => {
    // 1. Estados (la memoria de la pantalla)
    const [lista, setLista] = useState([]);
    const [formData, setFormData] = useState(FORMULARIO_VACIO);
    const [filtroCiudad, setFiltroCiudad] = useState('');
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [calificandoId, setCalificandoId] = useState(null);
    const [error, setError] = useState('');
    const [aviso, setAviso] = useState('');

    const puedeCrear = esAdmin();

    const cargarDatos = async (ciudad) => {
        setCargando(true);
        setError('');
        try {
            setLista(await obtenerProveedores(ciudad));
        } catch (error) {
            console.error('Error al cargar los proveedores', error);
            setError(error.response?.data?.mensaje || 'No se pudieron cargar los proveedores');
        } finally {
            setCargando(false);
        }
    };

    // 2. Efecto inicial: al montarse la pantalla, pide los datos al servicio.
    useEffect(() => {
        let vigente = true;

        const cargarInicial = async () => {
            try {
                const datos = await obtenerProveedores();
                if (vigente) setLista(datos);
            } catch (error) {
                console.error('Error al cargar los proveedores', error);
                if (vigente) {
                    setError(error.response?.data?.mensaje || 'No se pudieron cargar los proveedores');
                }
            } finally {
                if (vigente) setCargando(false);
            }
        };

        cargarInicial();

        // Evita actualizar el estado si la pantalla se desmontó mientras respondía.
        return () => {
            vigente = false;
        };
    }, []);

    // 3. Manejadores de eventos (lógica del CRUD)
    const handleBuscar = (e) => {
        e.preventDefault();
        cargarDatos(filtroCiudad.trim() || undefined);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setAviso('');

        if (!/^\d{11}$/.test(formData.cuit)) {
            setError('El CUIT debe tener exactamente 11 números, sin guiones');
            return;
        }

        setGuardando(true);
        try {
            const proveedorNuevo = await crearProveedor({
                razonSocial: formData.razonSocial,
                cuit: formData.cuit,
                contacto: {
                    email: formData.email,
                    telefono: formData.telefono || undefined
                },
                direccion: {
                    calle: formData.calle || undefined,
                    ciudad: formData.ciudad || undefined,
                    pais: formData.pais || undefined
                },
                calificacion: Number(formData.calificacion)
            });

            setLista([...lista, proveedorNuevo]);
            setFormData(FORMULARIO_VACIO);
            setAviso('Proveedor registrado');
        } catch (error) {
            console.error('Error al guardar el proveedor', error);
            setError(
                error.response?.status === 403
                    ? 'Solo un usuario con rol ADMIN puede registrar proveedores'
                    : error.response?.data?.detalle ||
                      error.response?.data?.mensaje ||
                      'Error al guardar los datos'
            );
        } finally {
            setGuardando(false);
        }
    };

    const handleCalificar = async (id, calificacion) => {
        setError('');
        setAviso('');
        setCalificandoId(id);
        try {
            const actualizado = await calificarProveedor(id, calificacion);
            // Actualizamos la lista local sin volver a pedirle todo al servidor.
            setLista(lista.map((item) => (item._id === id ? actualizado : item)));
        } catch (error) {
            console.error('Error al calificar', error);
            setError(error.response?.data?.mensaje || 'No se pudo actualizar la calificación');
        } finally {
            setCalificandoId(null);
        }
    };

    // 4. Renderizado (JSX)
    return (
        <div className="container mt-4">
            <h1 className="mb-4">Gestión de Proveedores</h1>

            {error && <div className="alert alert-danger">{error}</div>}
            {aviso && <div className="alert alert-success">{aviso}</div>}

            <div className="row">
                {/* Columna izquierda: formulario de alta */}
                <div className="col-md-4 mb-4">
                    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
                        <h5>Nuevo proveedor</h5>

                        {!puedeCrear && (
                            <div className="alert alert-warning py-2 small">
                                Tu usuario no tiene rol ADMIN: el servidor va a rechazar el alta.
                            </div>
                        )}

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Razón social"
                            value={formData.razonSocial}
                            onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="CUIT (11 números)"
                            value={formData.cuit}
                            onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
                            pattern="[0-9]{11}"
                            title="11 números, sin guiones"
                            required
                        />
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email de contacto"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Teléfono"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Calle"
                            value={formData.calle}
                            onChange={(e) => setFormData({ ...formData, calle: e.target.value })}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ciudad"
                            value={formData.ciudad}
                            onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="País"
                            value={formData.pais}
                            onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                        />

                        <label className="form-label mb-1">
                            Calificación inicial: {formData.calificacion}
                        </label>
                        <input
                            type="range"
                            className="form-range mb-3"
                            min="1"
                            max="5"
                            value={formData.calificacion}
                            onChange={(e) => setFormData({ ...formData, calificacion: e.target.value })}
                        />

                        <button type="submit" className="btn btn-success w-100" disabled={guardando}>
                            {guardando ? 'Guardando...' : 'Guardar'}
                        </button>
                    </form>
                </div>

                {/* Columna derecha: listado consumido de la API */}
                <div className="col-md-8">
                    <form onSubmit={handleBuscar} className="d-flex gap-2 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filtrar por ciudad"
                            value={filtroCiudad}
                            onChange={(e) => setFiltroCiudad(e.target.value)}
                        />
                        <button type="submit" className="btn btn-outline-primary">Buscar</button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                setFiltroCiudad('');
                                cargarDatos();
                            }}
                        >
                            Limpiar
                        </button>
                    </form>

                    {cargando && <p className="text-muted">Cargando proveedores...</p>}

                    <div className="row">
                        {lista.map((item) => (
                            <div className="col-md-6" key={item._id}>
                                <ProveedorCard
                                    proveedor={item}
                                    onCalificar={handleCalificar}
                                    calificando={calificandoId === item._id}
                                />
                            </div>
                        ))}
                    </div>

                    {!cargando && lista.length === 0 && (
                        <p className="text-muted">No hay proveedores para mostrar.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Proveedores;
