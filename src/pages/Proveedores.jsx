import { useState, useEffect } from 'react';
import {
  obtenerProveedores,
  crearProveedor,
  actualizarCalificacion,
} from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

const formInicial = {
  razonSocial: '',
  cuit: '',
  contacto: {
    email: '',
    telefono: '',
  },
  direccion: {
    calle: '',
    ciudad: '',
    pais: 'Argentina',
  },
  calificacion: 3,
  estadoActivo: true,
};

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [formData, setFormData] = useState(formInicial);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [filtroCiudad, setFiltroCiudad] = useState('');
  const [notificacion, setNotificacion] = useState({ tipo: '', mensaje: '' });

  const mostrarNotificacion = (tipo, mensaje) => {
    setNotificacion({ tipo, mensaje });
    setTimeout(() => {
      setNotificacion({ tipo: '', mensaje: '' });
    }, 4000);
  };

  useEffect(() => {
    let isMounted = true;

    const cargarInicial = async () => {
      try {
        const data = await obtenerProveedores();
        if (isMounted) {
          setProveedores(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
        if (isMounted) {
          mostrarNotificacion(
            'danger',
            error.response?.data?.mensaje || 'Error al conectar con la API de proveedores.'
          );
        }
      } finally {
        if (isMounted) {
          setCargando(false);
        }
      }
    };

    cargarInicial();

    return () => {
      isMounted = false;
    };
  }, []);

  const buscarProveedores = async (ciudad) => {
    try {
      setCargando(true);
      const data = await obtenerProveedores(ciudad);
      setProveedores(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al filtrar proveedores:', error);
      mostrarNotificacion(
        'danger',
        error.response?.data?.mensaje || 'Error al conectar con la API de proveedores.'
      );
    } finally {
      setCargando(false);
    }
  };

  const handleInputChange = (campo, valor) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleContactoChange = (campo, valor) => {
    setFormData((prev) => ({
      ...prev,
      contacto: {
        ...prev.contacto,
        [campo]: valor,
      },
    }));
  };

  const handleDireccionChange = (campo, valor) => {
    setFormData((prev) => ({
      ...prev,
      direccion: {
        ...prev.direccion,
        [campo]: valor,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del formato de CUIT (exactamente 11 dígitos numéricos sin guiones)
    const cuitLimpio = formData.cuit.trim();
    if (!/^\d{11}$/.test(cuitLimpio)) {
      mostrarNotificacion('warning', 'El CUIT debe tener exactamente 11 números sin guiones.');
      return;
    }

    try {
      setGuardando(true);
      const payload = {
        ...formData,
        cuit: cuitLimpio,
        calificacion: Number(formData.calificacion) || 3,
      };

      const nuevoProveedor = await crearProveedor(payload);
      setProveedores((prev) => [...prev, nuevoProveedor]);
      setFormData(formInicial);
      mostrarNotificacion('success', 'Proveedor registrado exitosamente.');
    } catch (error) {
      console.error('Error al crear proveedor:', error);
      const errorMsg =
        error.response?.data?.detalle ||
        error.response?.data?.mensaje ||
        'No se pudo registrar el proveedor. Asegúrese de tener rol ADMIN o credenciales válidas.';
      mostrarNotificacion('danger', errorMsg);
    } finally {
      setGuardando(false);
    }
  };

  const handleCalificar = async (id, nuevaPuntuacion) => {
    try {
      const proveedorActualizado = await actualizarCalificacion(id, nuevaPuntuacion);
      setProveedores((prev) =>
        prev.map((prov) =>
          prov._id === id
            ? { ...prov, calificacion: proveedorActualizado?.calificacion ?? nuevaPuntuacion }
            : prov
        )
      );
      mostrarNotificacion('success', `Calificación actualizada a ${nuevaPuntuacion} estrellas.`);
    } catch (error) {
      console.error('Error al calificar proveedor:', error);
      mostrarNotificacion(
        'danger',
        error.response?.data?.mensaje || 'Error al actualizar la calificación del proveedor.'
      );
      throw error;
    }
  };

  const handleFiltrarCiudad = (e) => {
    e.preventDefault();
    buscarProveedores(filtroCiudad.trim());
  };

  const handleLimpiarFiltro = () => {
    setFiltroCiudad('');
    buscarProveedores('');
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold text-dark mb-1">Módulo Proveedores</h1>
          <p className="text-muted mb-0">
            Administración, registro y calificación de la red de proveedores.
          </p>
        </div>
      </div>

      {notificacion.mensaje && (
        <div className={`alert alert-${notificacion.tipo} alert-dismissible fade show`} role="alert">
          {notificacion.mensaje}
        </div>
      )}

      <div className="row g-4">
        {/* Columna Izquierda: Formulario de Registro */}
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border-0" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-primary text-white py-3" style={{ borderRadius: '12px 12px 0 0' }}>
              <h5 className="mb-0 fw-semibold">Nuevo Proveedor</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Razón Social *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej. TECH SOLUTIONS S.A."
                    value={formData.razonSocial}
                    onChange={(e) => handleInputChange('razonSocial', e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold small">CUIT (11 dígitos sin guiones) *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="30712345678"
                    maxLength={11}
                    value={formData.cuit}
                    onChange={(e) => handleInputChange('cuit', e.target.value)}
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Email Contacto *</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="ventas@empresa.com"
                      value={formData.contacto.email}
                      onChange={(e) => handleContactoChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+54 9 11 5555-4444"
                      value={formData.contacto.telefono}
                      onChange={(e) => handleContactoChange('telefono', e.target.value)}
                    />
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Calle / Dirección</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Av. Corrientes 1234"
                      value={formData.direccion.calle}
                      onChange={(e) => handleDireccionChange('calle', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Ciudad</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buenos Aires"
                      value={formData.direccion.ciudad}
                      onChange={(e) => handleDireccionChange('ciudad', e.target.value)}
                    />
                  </div>
                </div>

                <div className="row g-2 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Calificación Inicial</label>
                    <select
                      className="form-select"
                      value={formData.calificacion}
                      onChange={(e) => handleInputChange('calificacion', Number(e.target.value))}
                    >
                      <option value={1}>1 Estrella ⭐</option>
                      <option value={2}>2 Estrellas ⭐⭐</option>
                      <option value={3}>3 Estrellas ⭐⭐⭐</option>
                      <option value={4}>4 Estrellas ⭐⭐⭐⭐</option>
                      <option value={5}>5 Estrellas ⭐⭐⭐⭐⭐</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Estado</label>
                    <div className="form-check form-switch mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="estadoActivoCheck"
                        checked={formData.estadoActivo}
                        onChange={(e) => handleInputChange('estadoActivo', e.target.checked)}
                      />
                      <label className="form-check-label small" htmlFor="estadoActivoCheck">
                        {formData.estadoActivo ? 'Proveedor Activo' : 'Inactivo'}
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  disabled={guardando}
                >
                  {guardando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Guardando Proveedor...
                    </>
                  ) : (
                    'Guardar Proveedor'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Listado y Filtros */}
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0 mb-3" style={{ borderRadius: '12px' }}>
            <div className="card-body p-3">
              <form onSubmit={handleFiltrarCiudad} className="row g-2 align-items-center">
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filtrar por ciudad..."
                    value={filtroCiudad}
                    onChange={(e) => setFiltroCiudad(e.target.value)}
                  />
                </div>
                <div className="col-sm-3">
                  <button type="submit" className="btn btn-outline-primary w-100">
                    Filtrar
                  </button>
                </div>
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={handleLimpiarFiltro}
                    disabled={!filtroCiudad}
                  >
                    Limpiar
                  </button>
                </div>
              </form>
            </div>
          </div>

          {cargando ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Cargando proveedores...</p>
            </div>
          ) : proveedores.length === 0 ? (
            <div className="card border-0 shadow-sm text-center p-5" style={{ borderRadius: '12px' }}>
              <h5 className="text-muted mb-2">No se encontraron proveedores</h5>
              <p className="text-secondary small mb-0">
                Utiliza el formulario de la izquierda para registrar un nuevo proveedor o verifica tus filtros.
              </p>
            </div>
          ) : (
            <div className="row g-3">
              {proveedores.map((prov) => (
                <div className="col-12 col-md-6" key={prov._id || prov.cuit}>
                  <ProveedorCard proveedor={prov} onCalificar={handleCalificar} />
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
