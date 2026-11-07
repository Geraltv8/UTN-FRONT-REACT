import { useState, useEffect } from 'react';
import { obtenerTodos, crear, actualizar, eliminar } from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

const Proveedores = () => {
    // 1. Estados (La memoria de nuestra pantalla)
    const [lista, setLista] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', calificacion: '' });
    const [editandoId, setEditandoId] = useState(null);

    // 2. Efecto inicial al cargar la página
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const datos = await obtenerTodos();
                setLista(datos);
            } catch (error) {
                console.error("Error al cargar los proveedores", error);
            }
        };

        cargarDatos();
    }, []);

    // 3. Manejadores de Eventos (Lógica del CRUD)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editandoId) {
                // Modo Edición
                const itemActualizado = await actualizar(editandoId, formData);
                setLista(lista.map(item => (item._id === editandoId || item.id === editandoId) ? itemActualizado : item));
            } else {
                // Modo Creación
                const itemNuevo = await crear(formData);
                setLista([...lista, itemNuevo]);
            }
            // Reseteamos el formulario
            setFormData({ nombre: '', email: '', telefono: '', calificacion: '' });
            setEditandoId(null);
        } catch (error) {
            console.error(error);
            alert("Error al guardar el proveedor");
        }
    };

    const handleBorrar = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este proveedor?")) {
            try {
                await eliminar(id);
                setLista(lista.filter(item => item._id !== id && item.id !== id));
            } catch (error) {
                console.error(error);
                alert("Error al eliminar");
            }
        }
    };

    const prepararEdicion = (item) => {
        setFormData({ 
            nombre: item.nombre || '', 
            email: item.email || '', 
            telefono: item.telefono || '', 
            calificacion: item.calificacion || '' 
        });
        setEditandoId(item._id || item.id);
    };

    // 4. Renderizado (JSX) - ¡El return DEBE estar dentro de la función Proveedores!
    return (
        <div className="container mt-4">
            <h1 className="mb-4">Gestión de Proveedores</h1>
                        
            <div className="row">
                {/* Columna Izquierda: Formulario (Crear / Editar) */}
                <div className="col-md-4 mb-4">
                    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
                        <h5 className="mb-3">{editandoId ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h5>
                        
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Nombre"
                            value={formData.nombre} 
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})} 
                            required 
                        />
                        <input 
                            type="email" 
                            className="form-control mb-2" 
                            placeholder="Correo electrónico"
                            value={formData.email} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Teléfono"
                            value={formData.telefono} 
                            onChange={(e) => setFormData({...formData, telefono: e.target.value})} 
                        />
                        <input 
                            type="number" 
                            className="form-control mb-3" 
                            placeholder="Calificación (1 a 5)"
                            min="1"
                            max="5"
                            value={formData.calificacion} 
                            onChange={(e) => setFormData({...formData, calificacion: e.target.value})} 
                        />

                        <button type="submit" className={`btn w-100 ${editandoId ? 'btn-warning' : 'btn-success'}`}>
                            {editandoId ? 'Actualizar Proveedor' : 'Guardar Proveedor'}
                        </button>
                    </form>
                </div>

                {/* Columna Derecha: Listado de Proveedores */}
                <div className="col-md-8">
                    <div className="row">
                        {lista.map(item => (
                            <div className="col-md-6" key={item._id || item.id}>
                                <ProveedorCard 
                                    proveedor={item} 
                                    onEdit={prepararEdicion} 
                                    onDelete={handleBorrar} 
                                />
                            </div>
                        ))}
                        {lista.length === 0 && <p className="text-muted">No hay proveedores registrados.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proveedores;