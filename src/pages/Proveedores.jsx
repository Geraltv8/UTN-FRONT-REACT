import { useEffect, useState } from 'react';
import ProveedorRow from '../components/ProveedorRow.jsx';
import { crearProveedor, obtenerProveedores, calificarProveedor } from '../services/proveedorService.js';
import { mensajeError } from '../services/api.js';
import { crearPayloadProveedor, filtrarProveedores, validarProveedor, esCalificacionValida } from '../utils/proveedores.js';

function formularioVacio() {
  return {
    razonSocial: '',
    cuit: '',
    contacto: { email: '', telefono: '' },
    direccion: { calle: '', ciudad: '', pais: 'Argentina' },
  };
}

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [formData, setFormData] = useState(formularioVacio);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [calificandoId, setCalificandoId] = useState(null);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  useEffect(() => {
    let activa = true;
    obtenerProveedores()
      .then((datos) => { if (activa) setProveedores(Array.isArray(datos) ? datos : []); })
      .catch((err) => { if (activa) setError(mensajeError(err)); })
      .finally(() => { if (activa) setCargando(false); });
    return () => { activa = false; };
  }, []);

  async function recargar() {
    setCargando(true);
    setError('');
    try {
      const datos = await obtenerProveedores();
      setProveedores(Array.isArray(datos) ? datos : []);
    } catch (err) {
      setError(mensajeError(err));
    } finally {
      setCargando(false);
    }
  }

  function editarCampo(campo, valor, grupo) {
    setFormData((anterior) => grupo
      ? { ...anterior, [grupo]: { ...anterior[grupo], [campo]: valor } }
      : { ...anterior, [campo]: valor });
  }

  async function guardar(event) {
    event.preventDefault();
    setError('');
    setExito('');
    const errores = validarProveedor(formData);
    if (errores.length) { setError(errores.join(' ')); return; }
    setGuardando(true);
    try {
      const creado = await crearProveedor(crearPayloadProveedor(formData));
      setProveedores((actuales) => [creado, ...actuales]);
      setFormData(formularioVacio());
      setExito('El proveedor fue registrado correctamente.');
    } catch (err) {
      setError(mensajeError(err));
    } finally {
      setGuardando(false);
    }
  }

  async function calificar(id, valor) {
    if (!esCalificacionValida(valor) || calificandoId) return;
    setError('');
    setExito('');
    setCalificandoId(id);
    try {
      const actualizado = await calificarProveedor(id, valor);
      setProveedores((actuales) => actuales.map((proveedor) =>
        proveedor._id === id ? actualizado : proveedor));
      setExito('Calificación actualizada correctamente.');
    } catch (err) {
      setError(mensajeError(err));
    } finally {
      setCalificandoId(null);
    }
  }

  const visibles = filtrarProveedores(proveedores, busqueda);
  const activos = proveedores.filter((p) => p.estadoActivo !== false).length;

  return (
    <section className="providers-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">GESTIÓN / PROVEEDORES</span>
          <h1>Proveedores</h1>
          <p className="page-lead">Organizá los contactos de tu negocio y mantené sus calificaciones al día.</p>
        </div>
        <button className="secondary-button" type="button" onClick={recargar} disabled={cargando}>↻ Actualizar listado</button>
      </div>

      <div className="metrics">
        <div><span>Total de proveedores</span><strong>{proveedores.length}</strong></div>
        <div><span>Proveedores activos</span><strong>{activos}</strong></div>
        <div><span>Calificación promedio</span><strong>{proveedores.length
          ? (proveedores.reduce((suma, proveedor) => suma + Number(proveedor.calificacion || 0), 0) / proveedores.length).toFixed(1)
          : '—'} <small>/ 5</small></strong></div>
      </div>

      {error && <div className="alert-message notice" role="alert">{error}</div>}
      {exito && <div className="success-message notice" role="status">{exito}</div>}

      <div className="providers-grid">
        <div className="create-column">
          <div className="section-heading">
            <span className="eyebrow">ALTA DE PROVEEDORES</span><h2>Nuevo proveedor</h2>
            <p>Completá los datos obligatorios para incorporarlo al sistema.</p>
          </div>
          <form className="form-card" onSubmit={guardar}>
            <label htmlFor="razonSocial">Razón social <span>*</span></label>
            <input id="razonSocial" type="text" required maxLength="120"
              placeholder="Ej. Distribuidora del Litoral SA" value={formData.razonSocial}
              onChange={(e) => editarCampo('razonSocial', e.target.value)} />
            <label htmlFor="cuit">CUIT <span>*</span></label>
            <input id="cuit" type="text" inputMode="numeric" required pattern="[0-9]{11}"
              maxLength="11" title="11 dígitos sin guiones" placeholder="30712345678"
              value={formData.cuit} onChange={(e) => editarCampo('cuit', e.target.value)} />
            <label htmlFor="contacto-email">Correo electrónico <span>*</span></label>
            <input id="contacto-email" type="email" required placeholder="contacto@empresa.com"
              value={formData.contacto.email} onChange={(e) => editarCampo('email', e.target.value, 'contacto')} />
            <label htmlFor="contacto-telefono">Teléfono</label>
            <input id="contacto-telefono" type="tel" placeholder="+54 9 3777 000000"
              value={formData.contacto.telefono} onChange={(e) => editarCampo('telefono', e.target.value, 'contacto')} />
            <div className="two-fields">
              <div><label htmlFor="direccion-ciudad">Ciudad</label>
                <input id="direccion-ciudad" type="text" placeholder="Goya"
                  value={formData.direccion.ciudad} onChange={(e) => editarCampo('ciudad', e.target.value, 'direccion')} /></div>
              <div><label htmlFor="direccion-pais">País</label>
                <input id="direccion-pais" type="text" placeholder="Argentina"
                  value={formData.direccion.pais} onChange={(e) => editarCampo('pais', e.target.value, 'direccion')} /></div>
            </div>
            <label htmlFor="direccion-calle">Calle / dirección</label>
            <input id="direccion-calle" type="text" placeholder="Av. Principal 123"
              value={formData.direccion.calle} onChange={(e) => editarCampo('calle', e.target.value, 'direccion')} />
            <p className="form-hint">La calificación inicial será de 3 estrellas. Luego podrás modificarla desde el listado.</p>
            <button className="primary-button w-100" type="submit" disabled={guardando}>
              {guardando ? 'Guardando...' : '+ Registrar proveedor'}
            </button>
          </form>
        </div>

        <div className="list-column">
          <div className="section-heading list-heading">
            <div><span className="eyebrow">DIRECTORIO</span><h2>Proveedores registrados</h2>
              <p>{visibles.length} {visibles.length === 1 ? 'resultado' : 'resultados'} en el listado</p></div>
            <label className="search-box"><span className="visually-hidden">Buscar proveedores</span>
              <input type="search" placeholder="Buscar por nombre, CUIT o ciudad"
                value={busqueda} onChange={(e) => setBusqueda(e.target.value)} /></label>
          </div>
          {cargando ? <p className="empty-state" role="status">Cargando proveedores...</p>
            : visibles.length === 0
              ? <p className="empty-state">{busqueda
                  ? 'No se encontraron proveedores con esa búsqueda.'
                  : 'Todavía no hay proveedores registrados.'}</p>
              : <div className="supplier-list">{visibles.map((proveedor) => (
                  <ProveedorRow key={proveedor._id} proveedor={proveedor}
                    onCalificar={calificar} guardando={calificandoId !== null} />
                ))}</div>}
        </div>
      </div>
    </section>
  );
}
