import { useState, useEffect } from 'react';
import { obtenerTodos, crear, calificar } from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

const Proveedores = () => {
  // 1. Estados (La memoria de nuestra pantalla)
  const [lista, setLista] = useState([]);
  const [formData, setFormData] = useState({ razonSocial: '', cuit: '', email: '', ciudad: '' });

  // Pide los datos al servicio y los guarda en el estado
  const cargarDatos = async () => {
    try {
      const datos = await obtenerTodos();
      setLista(datos);
    } catch (error) {
      console.error('Error al cargar los datos', error);
    }
  };

  // 2. Efecto inicial (Se ejecuta solo una vez al cargar la página)
  useEffect(() => {
    cargarDatos();
  }, []);

  // 3. Manejadores de Eventos (Lógica del CRUD)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Armamos el objeto con la forma que espera el modelo Proveedor del backend
      const nuevoProveedor = {
        razonSocial: formData.razonSocial,
        cuit: formData.cuit,
        contacto: { email: formData.email },
        direccion: { ciudad: formData.ciudad },
      };
      const itemNuevo = await crear(nuevoProveedor);
      setLista([...lista, itemNuevo]);
      // Reseteamos el formulario
      setFormData({ razonSocial: '', cuit: '', email: '', ciudad: '' });
    } catch (error) {
      console.error('Error al guardar', error);
      alert('Error al guardar los datos');
    }
  };

  const handleCalificar = async (id, calificacion) => {
    try {
      const itemActualizado = await calificar(id, calificacion);
      // Actualizamos la lista local sin necesidad de recargar la página
      setLista(lista.map(item => item._id === id ? itemActualizado : item));
    } catch (error) {
      console.error('Error al calificar', error);
      alert('Error al calificar el proveedor');
    }
  };

  // 4. Renderizado (JSX)
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gestión de Proveedores</h1>
      <div className="row">
        {/* Columna Izquierda: Formulario */}
        <div className="col-md-4 mb-4">
          <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
            <h5>Nuevo Proveedor</h5>
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
              placeholder="CUIT (11 números sin guiones)"
              value={formData.cuit}
              onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
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
              className="form-control mb-3"
              placeholder="Ciudad"
              value={formData.ciudad}
              onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
            />
            <button type="submit" className="btn btn-success w-100">
              Guardar
            </button>
          </form>
        </div>

        {/* Columna Derecha: Listado (Iteramos el estado con map) */}
        <div className="col-md-8">
          <div className="row">
            {lista.map(item => (
              <div className="col-md-6" key={item._id}>
                <ProveedorCard item={item} onCalificar={handleCalificar} />
              </div>
            ))}
            {lista.length === 0 && <p className="text-muted">No hay registros para mostrar.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proveedores;
