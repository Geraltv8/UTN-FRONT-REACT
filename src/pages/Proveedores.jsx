import { useState, useEffect } from 'react';
import {
  obtenerProveedores,
  crearProveedor,
  calificarProveedor,
} from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';
import ProveedorForm from '../components/ProveedorForm';

const FORM_INICIAL = {
  razonSocial: '',
  cuit: '',
  email: '',
  telefono: '',
  calle: '',
  ciudad: '',
};

const Proveedores = () => {
  // 1. Estados
  const [lista, setLista] = useState([]);
  const [formData, setFormData] = useState(FORM_INICIAL);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState(null); // { tipo: 'success' | 'danger', texto }

  // 2. Efecto inicial: carga el listado al montar la página
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLista(await obtenerProveedores());
      } catch (error) {
        setMensaje({
          tipo: 'danger',
          texto: error.response?.data?.mensaje || 'Error al cargar los proveedores',
        });
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  // 3. Manejadores
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    // El backend espera contacto y direccion como objetos anidados.
    const nuevo = {
      razonSocial: formData.razonSocial,
      cuit: formData.cuit,
      contacto: { email: formData.email, telefono: formData.telefono },
      direccion: { calle: formData.calle, ciudad: formData.ciudad },
    };

    try {
      const creado = await crearProveedor(nuevo);
      setLista([...lista, creado]);
      setFormData(FORM_INICIAL);
      setMensaje({ tipo: 'success', texto: 'Proveedor registrado correctamente' });
    } catch (error) {
      const data = error.response?.data;
      setMensaje({
        tipo: 'danger',
        texto: data?.detalle || data?.mensaje || 'Error al guardar el proveedor',
      });
    }
  };

  const handleCalificar = async (id, calificacion) => {
    try {
      const actualizado = await calificarProveedor(id, calificacion);
      setLista(lista.map((p) => (p._id === id ? actualizado : p)));
    } catch (error) {
      setMensaje({
        tipo: 'danger',
        texto: error.response?.data?.detalle || 'Error al actualizar la calificación',
      });
    }
  };

  // 4. Render
  return (
    <div className="container mt-4 text-start">
      <h1 className="mb-4">Gestión de Proveedores</h1>

      {mensaje && (
        <div className={`alert alert-${mensaje.tipo} alert-dismissible`}>
          {mensaje.texto}
          <button type="button" className="btn-close" onClick={() => setMensaje(null)} />
        </div>
      )}

      <div className="row">
        <div className="col-md-4 mb-4">
          <ProveedorForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="col-md-8">
          <div className="row">
            {cargando && <p className="text-muted">Cargando...</p>}
            {lista.map((proveedor) => (
              <div className="col-md-6 mb-3" key={proveedor._id}>
                <ProveedorCard proveedor={proveedor} onCalificar={handleCalificar} />
              </div>
            ))}
            {!cargando && lista.length === 0 && (
              <p className="text-muted">No hay proveedores para mostrar.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proveedores;
