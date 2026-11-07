import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { obtenerProductos } from '../services/productoService';

const Dashboard = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        obtenerProductos()
            .then((data) => {
                if (isMounted) {
                    setProductos(Array.isArray(data) ? data : []);
                    setCargando(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    console.error('Error al cargar productos:', err);
                    setError('No se pudieron cargar los productos del catálogo.');
                    setCargando(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div>
            <Navbar />

            <main className="container pb-5">
                {/* Hero / Banner */}
                <div className="p-4 p-md-5 mb-4 rounded-4 bg-light shadow-sm border border-light">
                    <div className="col-md-9 px-0">
                        <span className="badge bg-primary mb-2">Panel Principal</span>
                        <h1 className="display-6 fw-bold text-dark">Catálogo y Administración</h1>
                        <p className="lead my-3 text-secondary">
                            Arquitectura modular en React con servicios desacoplados, enrutamiento seguro mediante
                            React Router y consumo de API REST con Axios Interceptors.
                        </p>
                        <div className="d-flex gap-2">
                            <Link to="/proveedores" className="btn btn-primary fw-semibold px-4 py-2">
                                Ir a Gestión de Proveedores ➔
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold text-dark mb-0">Catálogo de Productos</h3>
                    <span className="badge bg-secondary">
                        {productos.length} {productos.length === 1 ? 'producto' : 'productos'}
                    </span>
                </div>

                {error && (
                    <div className="alert alert-warning" role="alert">
                        ⚠️ {error}
                    </div>
                )}

                {cargando ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando catálogo...</span>
                        </div>
                        <p className="text-muted mt-2">Cargando productos desde el backend...</p>
                    </div>
                ) : (
                    <div className="row g-3">
                        {productos.map((producto) => (
                            <div className="col-md-4 mb-3" key={producto._id || producto.id}>
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h5 className="card-title fw-bold text-dark mb-0">{producto.nombre}</h5>
                                            <span className="badge bg-info text-dark">{producto.categoria || 'General'}</span>
                                        </div>
                                        <p className="card-text text-muted small">{producto.descripcion || 'Sin descripción'}</p>
                                        <p className="card-text text-success fw-bold fs-5 mb-0">
                                            ${producto.precio?.toLocaleString('es-AR') || '0'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {productos.length === 0 && !error && (
                            <div className="col-12 text-center py-5 text-muted">
                                <p>No hay productos cargados en el catálogo.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
