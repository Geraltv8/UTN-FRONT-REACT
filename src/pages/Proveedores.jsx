import { useState, useEffect } from 'react';
import { obtenerTodos, crear, calificar } from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

const estadoInicial = {
  razonSocial: '',
  cuit: '',
  email: '',
  telefono: '',
  calle: '',
  ciudad: '',
  calificacion: 3
};

const Proveedores = () => {
  const [lista, setLista] = useState([]);
  const [formData, setFormData] = useState(estadoInicial);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await obtenerTodos();
        setLista(datos);
      } catch (error) {
        console.error('Error al cargar los proveedores', error);
      }
    };
    cargarDatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        },
        calificacion: Number(formData.calificacion)
      };

      const itemNuevo = await crear(nuevoProveedor);
      setLista([...lista, itemNuevo]);
      setFormData(estadoInicial);
    } catch (error) {
      alert(error.response?.data?.detalle || error.response?.data?.mensaje || 'Error al guardar el proveedor');
    }
  };

  const handleCalificar = async (id, nuevaCalificacion) => {
    try {
      const itemActualizado = await calificar(id, nuevaCalificacion);
      setLista(lista.map((item) => (item._id === id ? itemActualizado : item)));
    } catch (error) {
      console.error('Error al calificar', error);
      alert('Error al actualizar la calificación');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gestión de Proveedores</h1>
      <div className="row">
        <div className="col-md-4 mb-4">
          <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
            <h5>Nuevo Proveedor</h5>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Razón Social"
              value={formData.razonSocial}
              onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
              required
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="CUIT (11 números sin guiones)"
              pattern="\d{11}"
              maxLength={11}
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
            <select
              className="form-select mb-3"
              value={formData.calificacion}
              onChange={(e) => setFormData({ ...formData, calificacion: e.target.value })}
            >
              <option value={1}>Calificación inicial: 1</option>
              <option value={2}>Calificación inicial: 2</option>
              <option value={3}>Calificación inicial: 3</option>
              <option value={4}>Calificación inicial: 4</option>
              <option value={5}>Calificación inicial: 5</option>
            </select>
            <button type="submit" className="btn btn-success w-100">
              Guardar
            </button>
          </form>
        </div>

        <div className="col-md-8">
          <div className="row">
            {lista.map((item) => (
              <div className="col-md-6" key={item._id}>
                <ProveedorCard
                  item={item}
                  onCalificar={handleCalificar}
                />
              </div>
            ))}
            {lista.length === 0 && (
              <p className="text-muted">No hay proveedores para mostrar.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proveedores;
