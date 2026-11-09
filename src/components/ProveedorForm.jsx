// Componente presentacional para el formulario de alta de proveedor
const ProveedorForm = ({ formData, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="card p-3 shadow-sm">
      <h5>Nuevo Proveedor</h5>
      <input
        name="razonSocial"
        className="form-control mb-2"
        placeholder="Razón social"
        value={formData.razonSocial}
        onChange={onChange}
        required
      />
      <input
        name="cuit"
        className="form-control mb-2"
        placeholder="CUIT (11 números, sin guiones)"
        value={formData.cuit}
        onChange={onChange}
        required
        pattern="\d{11}"
        title="Deben ser exactamente 11 números"
      />
      <input
        name="email"
        type="email"
        className="form-control mb-2"
        placeholder="Email de contacto"
        value={formData.email}
        onChange={onChange}
        required
      />
      <input
        name="telefono"
        className="form-control mb-2"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={onChange}
      />
      <input
        name="calle"
        className="form-control mb-2"
        placeholder="Calle"
        value={formData.calle}
        onChange={onChange}
      />
      <input
        name="ciudad"
        className="form-control mb-3"
        placeholder="Ciudad"
        value={formData.ciudad}
        onChange={onChange}
      />
      <button type="submit" className="btn btn-success w-100">
        Guardar
      </button>
    </form>
  );
};

export default ProveedorForm;
