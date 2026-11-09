import { useState, useEffect, useCallback } from 'react';
import {
  obtenerProveedores,
  crearProveedor,
  calificarProveedor,
  eliminarProveedor,
} from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

const Proveedores = () => {
  // Estado para la lista de proveedores
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState(null); // { tipo: 'success' | 'danger' | 'info', texto: '' }
  const [filtroCiudad, setFiltroCiudad] = useState('');

  // Estado para el formulario de alta
  const initialFormState = {
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    calle: '',
    ciudad: '',
    calificacion: 3,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [enviando, setEnviando] = useState(false);

  const mostrarMensaje = useCallback((texto, tipo = 'success') => {
    setMensaje({ texto, tipo });
    setTimeout(() => {
      setMensaje(null);
    }, 4000);
  }, []);

  const cargarProveedores = async (ciudad) => {
    setCargando(true);
    try {
      const data = await obtenerProveedores(ciudad);
      setProveedores(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
      mostrarMensaje(
        error.response?.data?.mensaje || 'Error al conectar con la API de proveedores.',
        'danger'
      );
    } finally {
      setCargando(false);
    }
  };

  // Carga inicial de datos mediante useEffect
  useEffect(() => {
    let cancelado = false;

    const fetchInicial = async () => {
      try {
        const data = await obtenerProveedores();
        if (!cancelado) {
          setProveedores(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!cancelado) {
          console.error('Error al cargar proveedores:', error);
          mostrarMensaje(
            error.response?.data?.mensaje || 'Error al conectar con la API de proveedores.',
            'danger'
          );
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    };

    fetchInicial();

    return () => {
      cancelado = true;
    };
  }, [mostrarMensaje]);

  // Manejador del formulario de alta
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar CUIT (exactamente 11 dígitos numéricos sin guiones según el modelo de Mongoose)
    const cuitLimpio = formData.cuit.replace(/\D/g, '');
    if (cuitLimpio.length !== 11) {
      mostrarMensaje('El CUIT debe tener exactamente 11 números sin guiones.', 'danger');
      return;
    }

    const payload = {
      razonSocial: formData.razonSocial.trim().toUpperCase(),
      cuit: cuitLimpio,
      contacto: {
        email: formData.email.trim().toLowerCase(),
        telefono: formData.telefono.trim(),
      },
      direccion: {
        calle: formData.calle.trim(),
        ciudad: formData.ciudad.trim(),
        pais: 'Argentina',
      },
      calificacion: Number(formData.calificacion) || 3,
      estadoActivo: true,
    };

    setEnviando(true);
    try {
      const nuevoProveedor = await crearProveedor(payload);
      setProveedores((prev) => [nuevoProveedor, ...prev]);
      setFormData(initialFormState);
      mostrarMensaje('¡Proveedor registrado con éxito!', 'success');
    } catch (error) {
      console.error('Error al registrar proveedor:', error);
      const errorMsg =
        error.response?.data?.detalle ||
        error.response?.data?.mensaje ||
        'Error al guardar el proveedor. Verifique los datos ingresados.';
      mostrarMensaje(errorMsg, 'danger');
    } finally {
      setEnviando(false);
    }
  };

  // Lógica para calificar un proveedor (PATCH)
  const handleCalificar = async (id, nuevaCalificacion) => {
    try {
      const proveedorActualizado = await calificarProveedor(id, nuevaCalificacion);
      setProveedores((prev) =>
        prev.map((item) => (item._id === id ? proveedorActualizado : item))
      );
      mostrarMensaje(`Calificación actualizada a ${nuevaCalificacion} estrellas.`, 'success');
    } catch (error) {
      console.error('Error al calificar proveedor:', error);
      mostrarMensaje(
        error.response?.data?.mensaje || 'Error al actualizar la calificación.',
        'danger'
      );
    }
  };

  // Lógica para eliminar un proveedor
  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Está seguro de que desea eliminar este proveedor?');
    if (!confirmar) return;

    try {
      await eliminarProveedor(id);
      setProveedores((prev) => prev.filter((item) => item._id !== id));
      mostrarMensaje('Proveedor eliminado del registro.', 'success');
    } catch (error) {
      console.warn('Endpoint DELETE no disponible o falló en backend. Removiendo localmente:', error);
      setProveedores((prev) => prev.filter((item) => item._id !== id));
      mostrarMensaje('Proveedor removido del listado.', 'info');
    }
  };

  // Filtrado por búsqueda en cliente
  const proveedoresFiltrados = proveedores.filter((prov) => {
    if (!filtroCiudad.trim()) return true;
    const ciudad = prov.direccion?.ciudad || '';
    const razonSocial = prov.razonSocial || '';
    const termino = filtroCiudad.toLowerCase();
    return (
      ciudad.toLowerCase().includes(termino) ||
      razonSocial.toLowerCase().includes(termino)
    );
  });

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="h2 text-primary fw-bold mb-1">Módulo Proveedores</h1>
          <p className="text-muted mb-0">Gestión y calificación de proveedores homologados</p>
        </div>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => cargarProveedores()}
          disabled={cargando}
        >
          {cargando ? 'Actualizando...' : '↻ Refrescar Listado'}
        </button>
      </div>

      {/* Alerta de notificación */}
      {mensaje && (
        <div
          className={`alert alert-${mensaje.tipo} alert-dismissible fade show`}
          role="alert"
        >
          {mensaje.texto}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMensaje(null)}
          ></button>
        </div>
      )}

      <div className="row g-4">
        {/* Columna Izquierda: Formulario de Alta */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-primary text-white py-3">
              <h5 className="card-title mb-0 fw-semibold">Nuevo Proveedor</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Razón Social *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: DISTRIBUIDORA NORTE S.A."
                    value={formData.razonSocial}
                    onChange={(e) =>
                      setFormData({ ...formData, razonSocial: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">CUIT (11 números) *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: 20123456789"
                    maxLength={11}
                    value={formData.cuit}
                    onChange={(e) =>
                      setFormData({ ...formData, cuit: e.target.value })
                    }
                    required
                  />
                  <small className="text-muted">11 dígitos sin guiones ni espacios</small>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email de Contacto *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="contacto@proveedor.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: +54 9 362 4123456"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Ciudad</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej: Resistencia"
                      value={formData.ciudad}
                      onChange={(e) =>
                        setFormData({ ...formData, ciudad: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Calle y Nro</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej: Av. San Martín 450"
                      value={formData.calle}
                      onChange={(e) =>
                        setFormData({ ...formData, calle: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">
                    Calificación Inicial: <span className="text-primary fw-bold">{formData.calificacion} ★</span>
                  </label>
                  <select
                    className="form-select"
                    value={formData.calificacion}
                    onChange={(e) =>
                      setFormData({ ...formData, calificacion: Number(e.target.value) })
                    }
                  >
                    <option value={1}>1 Estrella - Deficiente</option>
                    <option value={2}>2 Estrellas - Regular</option>
                    <option value={3}>3 Estrellas - Bueno</option>
                    <option value={4}>4 Estrellas - Muy Bueno</option>
                    <option value={5}>5 Estrellas - Excelente</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 fw-semibold"
                  disabled={enviando}
                >
                  {enviando ? 'Guardando Proveedor...' : 'Registrar Proveedor'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Listado de Proveedores */}
        <div className="col-lg-8">
          {/* Barra de búsqueda / filtro */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-3">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">🔍</span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Buscar por Razón Social o Ciudad..."
                  value={filtroCiudad}
                  onChange={(e) => setFiltroCiudad(e.target.value)}
                />
                {filtroCiudad && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setFiltroCiudad('')}
                  >
                    Limpiar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Estado de carga */}
          {cargando ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando proveedores...</span>
              </div>
              <p className="text-muted mt-2">Cargando proveedores desde la API...</p>
            </div>
          ) : proveedoresFiltrados.length === 0 ? (
            <div className="card border-0 shadow-sm text-center py-5 p-4">
              <h5 className="text-muted">No se encontraron proveedores registrados</h5>
              <p className="text-secondary small">
                Utilice el formulario de la izquierda para registrar el primer proveedor en el sistema.
              </p>
            </div>
          ) : (
            <div className="row g-3">
              {proveedoresFiltrados.map((prov) => (
                <div className="col-md-6" key={prov._id || prov.cuit}>
                  <ProveedorCard
                    proveedor={prov}
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
