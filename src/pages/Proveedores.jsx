import { useEffect, useState } from 'react';
import ProveedorCard from '../components/ProveedorCard.jsx';
import { useAuth } from '../context/useAuth.js';
import { getApiErrorMessage } from '../services/api.js';
import {
  actualizarCalificacion,
  crearProveedor,
  obtenerProveedores,
} from '../services/proveedorService.js';

const formularioInicial = {
  razonSocial: '',
  cuit: '',
  contacto: { email: '', telefono: '' },
  direccion: { calle: '', ciudad: '', pais: 'Argentina' },
  calificacion: 3,
};

function Proveedores() {
  const { cerrarSesion } = useAuth();
  const [proveedores, setProveedores] = useState([]);
  const [formData, setFormData] = useState(formularioInicial);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [calificandoId, setCalificandoId] = useState(null);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    let mounted = true;

    obtenerProveedores()
      .then((data) => {
        if (mounted) setProveedores(data);
      })
      .catch((loadError) => {
        if (mounted) setError(getApiErrorMessage(loadError));
      })
      .finally(() => {
        if (mounted) setCargando(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  function handleFieldChange(event) {
    const { name, value } = event.target;
    if (name.startsWith('contacto.')) {
      const field = name.split('.')[1];
      setFormData((current) => ({
        ...current,
        contacto: { ...current.contacto, [field]: value },
      }));
      return;
    }
    if (name.startsWith('direccion.')) {
      const field = name.split('.')[1];
      setFormData((current) => ({
        ...current,
        direccion: { ...current.direccion, [field]: value },
      }));
      return;
    }
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMensaje('');
    setGuardando(true);

    try {
      const proveedor = await crearProveedor({
        ...formData,
        calificacion: Number(formData.calificacion),
      });
      setProveedores((current) => [proveedor, ...current]);
      setFormData(formularioInicial);
      setMensaje('Proveedor registrado correctamente.');
    } catch (saveError) {
      setError(getApiErrorMessage(saveError));
    } finally {
      setGuardando(false);
    }
  }

  async function handleRate(id, calificacion) {
    setError('');
    setMensaje('');
    setCalificandoId(id);

    try {
      const actualizado = await actualizarCalificacion(id, calificacion);
      setProveedores((current) => current.map((proveedor) => (
        proveedor._id === id ? actualizado : proveedor
      )));
      setMensaje('Calificación actualizada.');
    } catch (rateError) {
      setError(getApiErrorMessage(rateError));
    } finally {
      setCalificandoId(null);
    }
  }

  return (
    <div className="dashboard">
      <header className="topbar">
        <a className="topbar-brand" href="/proveedores" aria-label="Panel de proveedores">
          <span className="brand-mark brand-mark-small" aria-hidden="true">P</span>
          <span>Panel<span className="brand-dot">.</span></span>
        </a>
        <div className="topbar-actions">
          <span className="topbar-section">Gestión de proveedores</span>
          <button className="btn btn-outline-secondary btn-sm" type="button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="page-intro">
          <div>
            <p className="eyebrow">Administración · Directorio</p>
            <h1>Proveedores</h1>
            <p className="muted-copy">Gestioná tus contactos y mantené sus calificaciones al día.</p>
          </div>
          <div className="provider-count">
            <span>{proveedores.length}</span>
            <small>proveedores</small>
          </div>
        </section>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {mensaje && <div className="alert alert-success" role="status">{mensaje}</div>}

        <div className="dashboard-grid">
          <section className="form-panel" aria-labelledby="new-provider-title">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Directorio</p>
                <h2 id="new-provider-title">Nuevo proveedor</h2>
              </div>
              <span className="panel-icon" aria-hidden="true">+</span>
            </div>

            <form onSubmit={handleSubmit} className="provider-form">
              <label htmlFor="razonSocial">Razón social</label>
              <input
                id="razonSocial"
                name="razonSocial"
                value={formData.razonSocial}
                onChange={handleFieldChange}
                placeholder="Ej. Acme S.A."
                required
              />

              <label htmlFor="cuit">CUIT</label>
              <input
                id="cuit"
                name="cuit"
                inputMode="numeric"
                pattern="[0-9]{11}"
                maxLength={11}
                title="Ingresá 11 números sin guiones."
                value={formData.cuit}
                onChange={handleFieldChange}
                placeholder="11 dígitos, sin guiones"
                required
              />

              <label htmlFor="contacto.email">Correo de contacto</label>
              <input
                id="contacto.email"
                name="contacto.email"
                type="email"
                value={formData.contacto.email}
                onChange={handleFieldChange}
                placeholder="contacto@empresa.com"
                required
              />

              <label htmlFor="contacto.telefono">Teléfono <span>(opcional)</span></label>
              <input
                id="contacto.telefono"
                name="contacto.telefono"
                type="tel"
                value={formData.contacto.telefono}
                onChange={handleFieldChange}
                placeholder="+54 11 1234 5678"
              />

              <div className="form-row">
                <div>
                  <label htmlFor="direccion.ciudad">Ciudad <span>(opcional)</span></label>
                  <input
                    id="direccion.ciudad"
                    name="direccion.ciudad"
                    value={formData.direccion.ciudad}
                    onChange={handleFieldChange}
                    placeholder="Buenos Aires"
                  />
                </div>
                <div>
                  <label htmlFor="direccion.pais">País</label>
                  <input
                    id="direccion.pais"
                    name="direccion.pais"
                    value={formData.direccion.pais}
                    onChange={handleFieldChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor="direccion.calle">Calle <span>(opcional)</span></label>
              <input
                id="direccion.calle"
                name="direccion.calle"
                value={formData.direccion.calle}
                onChange={handleFieldChange}
                placeholder="Av. Corrientes 123"
              />

              <button className="btn btn-primary submit-provider" type="submit" disabled={guardando}>
                {guardando ? 'Guardando…' : 'Registrar proveedor'}
              </button>
              <p className="form-note">El CUIT debe tener 11 dígitos sin guiones.</p>
            </form>
          </section>

          <section className="list-panel" aria-labelledby="provider-list-title">
            <div className="panel-heading list-heading">
              <div>
                <p className="eyebrow">Tu organización</p>
                <h2 id="provider-list-title">Directorio de proveedores</h2>
              </div>
              <span className="list-total">{proveedores.length} total</span>
            </div>

            {cargando ? (
              <div className="list-state" role="status">Cargando proveedores…</div>
            ) : proveedores.length === 0 ? (
              <div className="empty-state">
                <span className="empty-state-icon" aria-hidden="true">◇</span>
                <h3>Aún no hay proveedores</h3>
                <p>Cuando registres uno, aparecerá en este directorio.</p>
              </div>
            ) : (
              <div className="provider-list">
                {proveedores.map((proveedor) => (
                  <ProveedorCard
                    key={proveedor._id}
                    proveedor={proveedor}
                    onRate={handleRate}
                    calificando={calificandoId === proveedor._id}
                  />
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
