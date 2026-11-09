import { Badge } from 'react-bootstrap';

const ProductoCard = ({ producto }) => {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text text-success fw-bold">${producto.precio}</p>
                <Badge bg="secondary">{producto.categoria}</Badge>
            </div>
        </div>
    );
};

export default ProductoCard;
