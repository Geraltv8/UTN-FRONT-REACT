import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerProveedores, crearProveedor, calificarProveedor } from '../services/proveedorService';
import { logout } from '../services/authService';
import ProveedorCard from '../components/ProveedorCard';

const formularioVacio = {
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    calle: '',
    ciudad: ''
};

const Proveedores = () => {
    // 1. Estados
    const [lista, setLista] = useState([]);
    const [formData, setFormData] = useState(formularioVacio);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 2. Carga inicial
    useEffect(() => {
        const cargarProveedores = async () => {
            try {
                const datos = await obtenerProveedores();
                setLista(datos);
            } catch (err) {
                if (err.response?.status === 401) {
                    logout();
                    navigate('/login');
                } else {
                    setError('Error al cargar los proveedores');
                }
            }
        };
        cargarProveedores();
    }, [navigate]);

    // 3. Manejadores
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Armamos el objeto con la estructura que espera el backend
        const nuevoProveedor = {
            razonSocial: formData.razonSocial,
            cuit: formData.cuit,
            contacto: {
                email: formData.email,
                telefono: formData.telefono
            },
            direccion: {
                calle: formData.calle,
                ciudad: formData.ciudad
            }
        };
        try {
            const creado = await crearProveedor(nuevoProveedor);
            setLista([...lista, creado]);
            setFormData(formularioVacio);
        } catch (err) {
            setError(err.response?.data?.detalle || err.response?.data?.mensaje || 'Error al guardar el proveedor');
        }
    };

    const handleCalificar = async (id, valor) => {
        try {
            const actualizado = await calificarProveedor(id, valor);
            setLista(lista.map((p) => (p._id === id ? actualizado : p)));
        } catch (err) {
            setError('Error al calificar el proveedor');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // 4. Renderizado
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Gestión de Proveedores</h1>
                <button className="btn btn-outline-secondary" onClick={handleLogout}>Cerrar sesión</button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                {/* Formulario */}
                <div className="col-md-4 mb-4">
                    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
                        <h5>Nuevo Proveedor</h5>
                        <input name="razonSocial" className="form-control mb-2" placeholder="Razón social *"
                            value={formData.razonSocial} onChange={handleChange} required />
                        <input name="cuit" className="form-control mb-2" placeholder="CUIT (11 números) *"
                            value={formData.cuit} onChange={handleChange} required
                            pattern="\d{11}" title="El CUIT debe tener exactamente 11 números sin guiones" />
                        <input name="email" type="email" className="form-control mb-2" placeholder="Email *"
                            value={formData.email} onChange={handleChange} required />
                        <input name="telefono" className="form-control mb-2" placeholder="Teléfono"
                            value={formData.telefono} onChange={handleChange} />
                        <input name="calle" className="form-control mb-2" placeholder="Calle"
                            value={formData.calle} onChange={handleChange} />
                        <input name="ciudad" className="form-control mb-3" placeholder="Ciudad"
                            value={formData.ciudad} onChange={handleChange} />
                        <button type="submit" className="btn btn-success w-100">Guardar</button>
                    </form>
                </div>

                {/* Listado */}
                <div className="col-md-8">
                    <div className="row">
                        {lista.map((proveedor) => (
                            <div className="col-md-6" key={proveedor._id}>
                                <ProveedorCard proveedor={proveedor} onCalificar={handleCalificar} />
                            </div>
                        ))}
                        {lista.length === 0 && <p className="text-muted">No hay proveedores para mostrar.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proveedores;