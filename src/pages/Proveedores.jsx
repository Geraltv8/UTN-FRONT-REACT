import { useState, useEffect } from 'react';
import { obtenerTodos, crear, calificar } from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

const Proveedores = () => {
  const [lista, setLista] = useState([]);
  const [formData, setFormData] = useState({
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    calle: '',
    ciudad: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const datos = await obtenerTodos();
      setLista(datos);
    } catch (err) {
      console.error('Error al cargar proveedores', err);
      setError(err.response?.data?.mensaje || 'Error al cargar');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        razonSocial: formData.razonSocial,
        cuit: formData.cuit,
        contacto: {
          email: formData.email,
          telefono: formData.telefono,
        },
        direccion: {
          calle: formData.calle,
          ciudad: formData.ciudad,
        },
      };
      const nuevo = await crear(payload);
      setLista([...lista, nuevo]);
      setFormData({
        razonSocial: '',
        cuit: '',
        email: '',
        telefono: '',
        calle: '',
        ciudad: '',
      });
    } catch (err) {
      setError(err.response?.data?.detalle || err.response?.data?.mensaje || 'Error al crear');
    }
  };

  const handleCalificar = async (id) => {
    const nota = prompt('Ingresá la nueva calificación (1-5):');
    if (!nota) return;
    try {
      const actualizado = await calificar(id, Number(nota));
      setLista(lista.map((p) => (p._id === id ? actualizado : p)));
    } catch (err) {
      setError(err.response?.data?.detalle || 'Error al calificar');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gestión de Proveedores</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {/* Formulario */}
        <div className="col-md-4 mb-4">
          <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
            <h5>Nuevo Proveedor</h5>
            <input
              type="text"
              name="razonSocial"
              className="form-control mb-2"
              placeholder="Razón Social"
              value={formData.razonSocial}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cuit"
              className="form-control mb-2"
              placeholder="CUIT (11 números)"
              value={formData.cuit}
              onChange={handleChange}
              required
              maxLength={11}
            />
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              placeholder="Email de contacto"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="telefono"
              className="form-control mb-2"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
            />
            <input
              type="text"
              name="calle"
              className="form-control mb-2"
              placeholder="Calle"
              value={formData.calle}
              onChange={handleChange}
            />
            <input
              type="text"
              name="ciudad"
              className="form-control mb-3"
              placeholder="Ciudad"
              value={formData.ciudad}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-success w-100">
              Guardar
            </button>
          </form>
        </div>

        {/* Listado */}
        <div className="col-md-8">
          <div className="row">
            {lista.map((p) => (
              <div className="col-md-6" key={p._id}>
                <ProveedorCard proveedor={p} onCalificar={handleCalificar} />
              </div>
            ))}
            {lista.length === 0 && (
              <p className="text-muted">No hay proveedores cargados.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proveedores;
