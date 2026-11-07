// src/pages/Proveedores.jsx
import { useState, useEffect } from 'react';
import { 
  obtenerProveedores, 
  crearProveedor, 
  calificarProveedor 
} from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

const Proveedores = () => {
  const [lista, setLista] = useState([]);
  const [formData, setFormData] = useState({
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    categoria: 'Hardware'
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const datos = await obtenerProveedores();
      // Soporta tanto array directo como objeto { proveedores: [...] } o { data: [...] }
      const arrayProveedores = Array.isArray(datos) ? datos : (datos.proveedores || datos.data || []);
      setLista(arrayProveedores);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        razonSocial: formData.razonSocial,
        cuit: formData.cuit,
        contacto: {
          email: formData.email,
          telefono: formData.telefono
        },
        categorias: [formData.categoria]
      };

      const respuesta = await crearProveedor(payload);
      const itemNuevo = respuesta.proveedor || respuesta.data || respuesta;
      setLista([...lista, itemNuevo]);

      setFormData({
        razonSocial: '',
        cuit: '',
        email: '',
        telefono: '',
        categoria: 'Hardware'
      });
    } catch (error) {
      const msg = error.response?.data?.errores?.[0]?.msg || error.response?.data?.mensaje || "Error al crear proveedor";
      alert(msg);
    }
  };

  const handleCalificar = async (item) => {
    const input = window.prompt("Ingrese una calificación (1 al 5):", item.calificacion || 5);
    if (input !== null) {
      const calificacion = Number(input);
      if (isNaN(calificacion) || calificacion < 1 || calificacion > 5) {
        alert("Por favor ingrese un número entre 1 y 5");
        return;
      }
      try {
        const respuesta = await calificarProveedor(item._id, calificacion);
        const actualizado = respuesta.proveedor || respuesta.data || { ...item, calificacion };
        setLista(lista.map(p => p._id === item._id ? actualizado : p));
      } catch (error) {
        alert(error.response?.data?.mensaje || "Error al calificar proveedor");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gestión de Proveedores</h1>
      
      <div className="row">
        {/* Formulario de Registro */}
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
              placeholder="CUIT (11 dígitos sin guiones)"
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

            <select
              className="form-select mb-3"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            >
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Insumo">Insumo</option>
              <option value="Servicio">Servicio</option>
            </select>

            <button type="submit" className="btn btn-success w-100">
              Guardar Proveedor
            </button>
          </form>
        </div>

        {/* Listado de Proveedores */}
        <div className="col-md-8">
          <div className="row">
            {lista.map(item => (
              <div className="col-md-6" key={item._id}>
                <ProveedorCard
                  item={item}
                  onCalificar={handleCalificar}
                />
              </div>
            ))}
            {lista.length === 0 && (
              <p className="text-muted">No hay proveedores registrados para mostrar.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proveedores;