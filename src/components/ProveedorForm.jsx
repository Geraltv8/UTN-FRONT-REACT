
import { useState } from 'react';
import { crearProveedor } from '../services/proveedorService';

function ProveedorForm({ onProveedorCreado }) {
  const [formulario, setFormulario] = useState({
    razonSocial: '',
    cuit: '',
    contacto: {
      email: '',
      telefono: ''
    },
    direccion: {
      calle: '',
      ciudad: '',
      pais: 'Argentina'
    }
  });

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    if (name === 'email' || name === 'telefono') {
      setFormulario(prev => ({
        ...prev,
        contacto: { ...prev.contacto, [name]: value }
      }));
    } else if (['calle', 'ciudad', 'pais'].includes(name)) {
      setFormulario(prev => ({
        ...prev,
        direccion: { ...prev.direccion, [name]: value }
      }));
    } else {
      setFormulario(prev => ({ ...prev, [name]: value }));
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^\d{11}$/.test(formulario.cuit)) {
      setError('El CUIT debe tener exactamente 11 números.');
      return;
    }

    try {
      setCargando(true);
      const nuevoProveedor = await crearProveedor(formulario);

      setFormulario({
        razonSocial: '',
        cuit: '',
        contacto: { email: '', telefono: '' },
        direccion: { calle: '', ciudad: '', pais: 'Argentina' }
      });

      onProveedorCreado?.(nuevoProveedor);
    } catch (err) {
      setError(
        err.response?.data?.detalle ||
        err.response?.data?.mensaje ||
        'No se pudo registrar el proveedor.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="card card-body shadow-sm mb-4">
      <h4>Registrar proveedor</h4>

      <label className="form-label">Razón social *</label>
      <input
        className="form-control mb-3"
        name="razonSocial"
        value={formulario.razonSocial}
        onChange={manejarCambio}
        required
      />

      <label className="form-label">CUIT *</label>
      <input
        className="form-control mb-3"
        name="cuit"
        value={formulario.cuit}
        onChange={manejarCambio}
        maxLength={11}
        inputMode="numeric"
        required
      />

      <label className="form-label">Email *</label>
      <input
        className="form-control mb-3"
        type="email"
        name="email"
        value={formulario.contacto.email}
        onChange={manejarCambio}
        required
      />

      <label className="form-label">Teléfono</label>
      <input
        className="form-control mb-3"
        name="telefono"
        value={formulario.contacto.telefono}
        onChange={manejarCambio}
      />

      <label className="form-label">Calle</label>
      <input
        className="form-control mb-3"
        name="calle"
        value={formulario.direccion.calle}
        onChange={manejarCambio}
      />

      <label className="form-label">Ciudad</label>
      <input
        className="form-control mb-3"
        name="ciudad"
        value={formulario.direccion.ciudad}
        onChange={manejarCambio}
      />

      <label className="form-label">País</label>
      <input
        className="form-control mb-3"
        name="pais"
        value={formulario.direccion.pais}
        onChange={manejarCambio}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <button
        className="btn btn-primary"
        type="submit"
        disabled={cargando}
      >
        {cargando ? 'Registrando...' : 'Registrar proveedor'}
      </button>
    </form>
  );
}

export default ProveedorForm;
