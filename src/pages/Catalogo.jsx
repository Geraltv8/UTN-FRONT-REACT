import { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/productoService';

// La vista original del repo, ahora consumiendo la capa de servicios en vez
// de llamar a fetch con la URL escrita a mano.
const Catalogo = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setProductos(await obtenerProductos());
            } catch (error) {
                console.error('Error al cargar los productos', error);
                setError('No se pudieron cargar los productos');
            }
        };
        cargarDatos();
    }, []);

    return (
        <div className="container">
            <h1 className="h3 mb-4">Catálogo</h1>
            {error && <div className="alert alert-warning">{error}</div>}
            <div className="row">
                {productos.map((producto) => (
                    <div className="col-md-4 mb-3" key={producto._id}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text text-success fw-bold">${producto.precio}</p>
                                <span className="badge bg-secondary">{producto.categoria}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {productos.length === 0 && !error && (
                    <p className="text-muted">No hay productos para mostrar.</p>
                )}
            </div>
        </div>
    );
};

export default Catalogo;
