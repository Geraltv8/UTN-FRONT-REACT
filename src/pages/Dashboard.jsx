import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getProductos } from '../services/productoService';
import ProductoCard from '../components/ProductoCard';

// Es el catálogo que antes vivía en App.jsx, ahora separado en capas.
const Dashboard = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            try {
                setProductos(await getProductos());
            } catch (error) {
                console.error('Error conectando al backend', error);
            }
        };
        cargar();
    }, []);

    return (
        <Container className="mt-4">
            <h1 className="text-primary mb-4">Catálogo (React)</h1>
            <div className="row">
                {productos.map((producto) => (
                    <div className="col-md-4 mb-3" key={producto._id}>
                        <ProductoCard producto={producto} />
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Dashboard;
