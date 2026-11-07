import { useState, useEffect } from 'react';
import { Container, Badge } from 'react-bootstrap';
import { getProductos } from '../services/productoService';

const Dashboard = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await getProductos();
                setProductos(data);
            } catch (error) {
                console.error('Error conectando al backend', error);
            }
        };

        cargarProductos();
    }, []);

    return (
        <Container className="text-start mt-4">
            <h1 className="text-primary mb-4">Catalogo de Productos</h1>
            <div className="row">
                {productos.map((producto) => (
                    <div className="col-md-4 mb-3" key={producto._id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text text-success fw-bold">${producto.precio}</p>
                                <Badge bg="secondary">{producto.categoria}</Badge>
                            </div>
                        </div>
                    </div>
                ))}
                {productos.length === 0 && (
                    <p className="text-muted">No hay productos cargados.</p>
                )}
            </div>
        </Container>
    );
};

export default Dashboard;

