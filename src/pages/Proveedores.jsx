import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProveedorCard from '../components/ProveedorCard.jsx';
import {
  actualizarCalificacion,
  crearProveedor,
  obtenerProveedores,
} from '../services/proveedorService.js';

const FORMULARIO_VACIO = {
  razonSocial: '',
  cuit: '',
  email: '',
  telefono: '',
  calle: '',
  ciudad: '',
  pais: 'Argentina',
};

const mensajeDeError = (error) => (
  error.response?.data?.mensaje
  || error.response?.data?.detalle
  || error.response?.data?.error
  || error.message
  || 'Ocurrió un error inesperado.'
);

function Proveedores() {
  const navigate = useNavigate();
  const [proveedores, setProveedores] = useState([]);
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [calificandoId, setCalificandoId] = useState('');
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');

  useEffect(() => {
    let activo = true;

    obtenerProveedores()
      .then((datos) => {
        if (!Array.isArray(datos)) {
          throw new Error('La respuesta del servidor no tiene el formato esperado.');
        }
        if (activo) {
          setProveedores(datos);
          setError('');
        }
      })
      .catch((errorSolicitud) => {
        if (activo) {
          setError(`No se pudieron cargar los proveedores: ${mensajeDeError(errorSolicitud)}`);
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  const actualizarCampo = (evento) => {
    setFormulario((actual) => ({
      ...actual,
      [evento.target.name]: evento.target.value,
    }));
  };

  const handleCrear = async (evento) => {
    evento.preventDefault();
    setError('');
    setAviso('');
    setGuardando(true);

    const datosProveedor = {
      razonSocial: formulario.razonSocial.trim(),
      cuit: formulario.cuit.trim(),
      contacto: {
        email: formulario.email.trim(),
        telefono: formulario.telefono.trim(),
      },
      direccion: {
        calle: formulario.calle.trim(),
        ciudad: formulario.ciudad.trim(),
        pais: formulario.pais.trim() || 'Argentina',
      },
    };

    try {
      const nuevoProveedor = await crearProveedor(datosProveedor);
      setProveedores((actuales) => [nuevoProveedor, ...actuales]);
      setFormulario(FORMULARIO_VACIO);
      setAviso('El proveedor se registró correctamente.');
    } catch (errorSolicitud) {
      setError(`No se pudo registrar el proveedor: ${mensajeDeError(errorSolicitud)}`);
    } finally {
      setGuardando(false);
    }
  };

  const handleCalificar = async (id, calificacion) => {
    setError('');
    setAviso('');
    setCalificandoId(id);

    try {
      const proveedorActualizado = await actualizarCalificacion(id, calificacion);
      setProveedores((actuales) => actuales.map((proveedor) => (
        proveedor._id === id ? proveedorActualizado : proveedor
      )));
      setAviso('La calificación se actualizó correctamente.');
    } catch (errorSolicitud) {
      setError(`No se pudo actualizar la calificación: ${mensajeDeError(errorSolicitud)}`);
    } finally {
      setCalificandoId('');
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const cargarProveedores = async () => {
    setCargando(true);
    setError('');
    try {
      const datos = await obtenerProveedores();
      if (!Array.isArray(datos)) {
        throw new Error('La respuesta del servidor no tiene el formato esperado.');
      }
      setProveedores(datos);
    } catch (errorSolicitud) {
      setError(`No se pudieron cargar los proveedores: ${mensajeDeError(errorSolicitud)}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container page-content d-flex align-items-center justify-content-between py-3">
          <div className="d-flex align-items-center gap-3">
            <span className="brand-mark">P</span>
            <div>
              <span className="fw-bold d-block">Panel UTN</span>
              <span className="small text-secondary">Administración</span>
            </div>
          </div>
          <button className="btn btn-outline-secondary btn-sm" type="button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="container page-content py-5">
        <div className="mb-4">
          <p className="eyebrow mb-2">Directorio</p>
          <div className="d-flex flex-wrap align-items-end justify-content-between gap-3">
            <div>
              <h1 className="display-6 mb-1">Proveedores</h1>
              <p className="text-secondary mb-0">Registrá, consultá y calificá tus proveedores.</p>
            </div>
            <span className="badge rounded-pill text-bg-light border px-3 py-2">
              {proveedores.length} {proveedores.length === 1 ? 'proveedor' : 'proveedores'}
            </span>
          </div>
        </div>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {aviso && <div className="alert alert-success" role="status">{aviso}</div>}

        <div className="row g-4 align-items-start">
          <section className="col-lg-4" aria-labelledby="form-title">
            <div className="panel p-4">
              <p className="eyebrow mb-2">Nuevo registro</p>
              <h2 className="h4 mb-4" id="form-title">Agregar proveedor</h2>

              <form onSubmit={handleCrear}>
                <label className="field-label d-block mb-1" htmlFor="razonSocial">Razón social</label>
                <input
                  className="form-control mb-3"
                  id="razonSocial"
                  name="razonSocial"
                  value={formulario.razonSocial}
                  onChange={actualizarCampo}
                  autoComplete="organization"
                  required
                />

                <label className="field-label d-block mb-1" htmlFor="cuit">CUIT</label>
                <input
                  className="form-control mb-3"
                  id="cuit"
                  name="cuit"
                  inputMode="numeric"
                  pattern="[0-9]{11}"
                  title="Ingresá 11 números sin guiones"
                  value={formulario.cuit}
                  onChange={actualizarCampo}
                  placeholder="11 dígitos, sin guiones"
                  required
                />

                <label className="field-label d-block mb-1" htmlFor="email">Email de contacto</label>
                <input
                  className="form-control mb-3"
                  id="email"
                  name="email"
                  type="email"
                  value={formulario.email}
                  onChange={actualizarCampo}
                  autoComplete="email"
                  required
                />

                <label className="field-label d-block mb-1" htmlFor="telefono">Teléfono</label>
                <input
                  className="form-control mb-3"
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formulario.telefono}
                  onChange={actualizarCampo}
                  autoComplete="tel"
                />

                <label className="field-label d-block mb-1" htmlFor="calle">Calle</label>
                <input
                  className="form-control mb-3"
                  id="calle"
                  name="calle"
                  value={formulario.calle}
                  onChange={actualizarCampo}
                  autoComplete="street-address"
                />

                <div className="row g-3">
                  <div className="col-sm-7">
                    <label className="field-label d-block mb-1" htmlFor="ciudad">Ciudad</label>
                    <input
                      className="form-control mb-3"
                      id="ciudad"
                      name="ciudad"
                      value={formulario.ciudad}
                      onChange={actualizarCampo}
                      autoComplete="address-level2"
                    />
                  </div>
                  <div className="col-sm-5">
                    <label className="field-label d-block mb-1" htmlFor="pais">País</label>
                    <input
                      className="form-control mb-3"
                      id="pais"
                      name="pais"
                      value={formulario.pais}
                      onChange={actualizarCampo}
                      autoComplete="country-name"
                    />
                  </div>
                </div>

                <button className="btn btn-primary w-100 py-2 mt-2" type="submit" disabled={guardando}>
                  {guardando ? 'Registrando…' : 'Registrar proveedor'}
                </button>
              </form>
              <p className="small text-secondary mt-3 mb-0">
                El backend requiere una cuenta con rol ADMIN para registrar proveedores.
              </p>
            </div>
          </section>

          <section className="col-lg-8" aria-labelledby="list-title">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="h4 mb-0" id="list-title">Listado</h2>
              <button
                className="btn btn-sm btn-outline-secondary"
                type="button"
                onClick={cargarProveedores}
                disabled={cargando}
              >
                Actualizar
              </button>
            </div>

            {cargando ? (
              <div className="panel p-5 text-center" role="status">
                <span className="spinner-border spinner-border-sm text-primary me-2" aria-hidden="true" />
                Cargando proveedores…
              </div>
            ) : proveedores.length === 0 ? (
              <div className="panel p-5 text-center">
                <h3 className="h5">Todavía no hay proveedores</h3>
                <p className="text-secondary mb-0">Cuando registres uno, aparecerá en este listado.</p>
              </div>
            ) : (
              <div className="row g-3">
                {proveedores.map((proveedor) => (
                  <div className="col-md-6" key={proveedor._id}>
                    <ProveedorCard
                      proveedor={proveedor}
                      onCalificar={handleCalificar}
                      calificando={calificandoId === proveedor._id}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Proveedores;
