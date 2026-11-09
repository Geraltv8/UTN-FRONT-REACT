import { useState, useEffect } from 'react';
import {
  obtenerProveedores,
  crearProveedor,
  calificarProveedor,
  eliminarProveedor,
} from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

const Proveedores = () => {
  // 1. Estados
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState(null);

  const [formData, setFormData] = useState({
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    ciudad: '',
    calle: '',
    calificacion: 3,
  });

  // 2. Ciclo de vida: Cargar datos al montar la página
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const data = await obtenerProveedores();
      setLista(Array.isArray(data) ? data : []);
    } catch (error) {
      console.warn('No se pudo conectar al backend, cargando datos iniciales de ejemplo:', error);
      // Muestra datos de ejemplo si el backend no está corriendo en ese momento
      setLista([
        {
          _id: 'mock-1',
          razonSocial: 'DISTRIBUIDORA NORTE S.A.',
          cuit: '30712345678',
          contacto: { email: 'contacto@distnorte.com', telefono: '011-4567-8901' },
          direccion: { calle: 'Av. Corrientes 1234', ciudad: 'Resistencia', pais: 'Argentina' },
          calificacion: 4,
          estadoActivo: true,
        },
        {
          _id: 'mock-2',
          razonSocial: 'LOGÍSTICA INTEGRAL S.R.L.',
          cuit: '30998877665',
          contacto: { email: 'info@logistica.com', telefono: '362-4412345' },
          direccion: { calle: 'Ruta 16 Km 12', ciudad: 'Corrientes', pais: 'Argentina' },
          calificacion: 5,
          estadoActivo: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const mostrarMensaje = (texto, tipo = 'success') => {
    setAlerta({ texto, tipo });
    setTimeout(() => setAlerta(null), 4000);
  };

  // 3. Manejadores de eventos (CRUD)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar CUIT de 11 dígitos como exige el backend
    if (!/^\d{11}$/.test(formData.cuit)) {
      mostrarMensaje('El CUIT debe tener exactamente 11 números sin guiones.', 'danger');
      return;
    }

    const nuevoProveedorPayload = {
      razonSocial: formData.razonSocial.trim().toUpperCase(),
      cuit: formData.cuit.trim(),
      contacto: {
        email: formData.email.trim().toLowerCase(),
        telefono: formData.telefono.trim(),
      },
      direccion: {
        calle: formData.calle.trim(),
        ciudad: formData.ciudad.trim(),
        pais: 'Argentina',
      },
      calificacion: Number(formData.calificacion),
    };

    try {
      const proveedorCreado = await crearProveedor(nuevoProveedorPayload);
      setLista((prev) => [...prev, proveedorCreado]);
      mostrarMensaje('¡Proveedor registrado con éxito!');
    } catch (error) {
      console.warn('Error al enviar al backend, agregando en estado local:', error);
      // Fallback local en caso de simulación
      const proveedorSimulado = {
        ...nuevoProveedorPayload,
        _id: 'local-' + Date.now(),
        estadoActivo: true,
      };
      setLista((prev) => [...prev, proveedorSimulado]);
      mostrarMensaje('Proveedor registrado localmente.');
    }

    // Resetear formulario
    setFormData({
      razonSocial: '',
      cuit: '',
      email: '',
      telefono: '',
      ciudad: '',
      calle: '',
      calificacion: 3,
    });
  };

  // Acción: Calificar proveedor conectado al servicio
  const handleCalificar = async (id, nuevaCalificacion) => {
    try {
      await calificarProveedor(id, nuevaCalificacion);
      setLista((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, calificacion: nuevaCalificacion } : item
        )
      );
      mostrarMensaje(`Se actualizó la calificación a ${nuevaCalificacion} ⭐`);
    } catch (error) {
      console.warn('Actualizando calificación en estado local:', error);
      setLista((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, calificacion: nuevaCalificacion } : item
        )
      );
      mostrarMensaje(`Calificación actualizada a ${nuevaCalificacion} ⭐ (Modo local)`);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este proveedor?')) return;
    try {
      await eliminarProveedor(id);
    } catch (error) {
      console.warn('Eliminando de la vista local:', error);
    }
    setLista((prev) => prev.filter((item) => item._id !== id));
    mostrarMensaje('Proveedor eliminado.');
  };

  // 4. Renderizado
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-0">Gestión de Proveedores</h2>
          <p className="text-muted mb-0">Módulo CRUD con Calificación de Proveedores</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={cargarDatos}>
          🔄 Refrescar datos
        </button>
      </div>

      {alerta && (
        <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
          {alerta.texto}
          <button type="button" className="btn-close" onClick={() => setAlerta(null)}></button>
        </div>
      )}

      <div className="row g-4">
        {/* Columna Izquierda: Formulario para registrar nuevo proveedor */}
        <div className="col-lg-4 col-md-5">
          <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-primary text-white py-3">
              <h5 className="card-title mb-0 fw-bold">Registrar Proveedor</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label small fw-bold">Razón Social *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Ej: DISTRIBUIDORA S.A."
                    value={formData.razonSocial}
                    onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-bold">CUIT (11 números) *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Ej: 30123456789"
                    maxLength={11}
                    value={formData.cuit}
                    onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-bold">Email de Contacto *</label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    placeholder="contacto@proveedor.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-bold">Teléfono</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Ej: 011-5555-5555"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>

                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="form-label small fw-bold">Ciudad</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Ej: Resistencia"
                      value={formData.ciudad}
                      onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Calle / Dirección</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Ej: Calle 123"
                      value={formData.calle}
                      onChange={(e) => setFormData({ ...formData, calle: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Calificación Inicial (1 a 5)</label>
                  <select
                    className="form-select form-select-sm"
                    value={formData.calificacion}
                    onChange={(e) => setFormData({ ...formData, calificacion: e.target.value })}
                  >
                    <option value={1}>1 Estrella ⭐</option>
                    <option value={2}>2 Estrellas ⭐⭐</option>
                    <option value={3}>3 Estrellas ⭐⭐⭐</option>
                    <option value={4}>4 Estrellas ⭐⭐⭐⭐</option>
                    <option value={5}>5 Estrellas ⭐⭐⭐⭐⭐</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold">
                  ➕ Guardar Proveedor
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Listado de Proveedores */}
        <div className="col-lg-8 col-md-7">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Cargando proveedores...</p>
            </div>
          ) : lista.length === 0 ? (
            <div className="card text-center py-5 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="text-muted">No hay proveedores registrados</h5>
                <p className="text-muted small">Utiliza el formulario de la izquierda para registrar el primero.</p>
              </div>
            </div>
          ) : (
            <div className="row g-3">
              {lista.map((item) => (
                <div className="col-xl-6 col-12" key={item._id}>
                  <ProveedorCard
                    proveedor={item}
                    onCalificar={handleCalificar}
                    onDelete={handleEliminar}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proveedores;
