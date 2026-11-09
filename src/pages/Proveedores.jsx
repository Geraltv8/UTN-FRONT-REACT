import { useState, useEffect } from 'react';
import { obtenerTodos, calificar } from '../services/proveedorService';
import { mensajeDeError } from '../utils/errores';
import ProveedorForm from '../components/ProveedorForm';
import ProveedorList from '../components/ProveedorList';

// La página solo maneja la lista (estado) y coordina a los componentes.
const Proveedores = () => {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLista(await obtenerTodos());
            } catch (error) {
                console.error('Error al cargar los proveedores', error);
            }
        };
        cargarDatos();
    }, []);

    const agregarProveedor = (nuevo) => setLista([...lista, nuevo]);

    const handleCalificar = async (id, puntaje) => {
        try {
            const actualizado = await calificar(id, puntaje);
            setLista(lista.map((p) => (p._id === id ? actualizado : p)));
        } catch (error) {
            alert(mensajeDeError(error, 'Error al calificar el proveedor'));
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Gestión de Proveedores</h1>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <ProveedorForm onCreado={agregarProveedor} />
                </div>
                <div className="col-md-8">
                    <ProveedorList proveedores={lista} onCalificar={handleCalificar} />
                </div>
            </div>
        </div>
    );
};

export default Proveedores;
