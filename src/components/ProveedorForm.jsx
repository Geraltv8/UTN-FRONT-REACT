import { useState } from "react";
import { crearProveedor } from "../services/proveedorService";
import { obtenerMensajeError } from "../utils/obtenerMensajeError";

const FORM_INICIAL = {
  razonSocial: "",
  cuit: "",
  email: "",
  telefono: "",
  calle: "",
  ciudad: "",
};

const validar = (datos) => {
  const errores = {};

  if (!datos.razonSocial.trim()) {
    errores.razonSocial = "La razón social es obligatoria";
  }

  if (!/^\d{11}$/.test(datos.cuit)) {
    errores.cuit = "El CUIT debe tener exactamente 11 números sin guiones";
  }

  if (!datos.email.trim()) {
    errores.email = "El email de contacto es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
    errores.email = "El email no tiene un formato válido";
  }

  return errores;
};

const ProveedorForm = ({ onCreado }) => {
  const [formData, setFormData] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [guardando, setGuardando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrores({ ...errores, [name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral("");

    const erroresValidacion = validar(formData);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    setGuardando(true);
    try {
      const nuevoProveedor = await crearProveedor({
        razonSocial: formData.razonSocial.trim(),
        cuit: formData.cuit,
        contacto: {
          email: formData.email.trim(),
          telefono: formData.telefono.trim(),
        },
        direccion: {
          calle: formData.calle.trim(),
          ciudad: formData.ciudad.trim(),
        },
      });
      setFormData(FORM_INICIAL);
      setErrores({});
      onCreado(nuevoProveedor);
    } catch (err) {
      setErrorGeneral(obtenerMensajeError(err, "Error al crear el proveedor"));
    } finally {
      setGuardando(false);
    }
  };

  const claseInput = (campo) => `form-control ${errores[campo] ? "is-invalid" : ""}`;

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm" noValidate>
      <h5 className="mb-3">Nuevo proveedor</h5>

      <div className="mb-2">
        <input
          name="razonSocial"
          className={claseInput("razonSocial")}
          placeholder="Razón social *"
          value={formData.razonSocial}
          onChange={handleChange}
        />
        <div className="invalid-feedback">{errores.razonSocial}</div>
      </div>

      <div className="mb-2">
        <input
          name="cuit"
          className={claseInput("cuit")}
          placeholder="CUIT (11 números) *"
          value={formData.cuit}
          onChange={handleChange}
          inputMode="numeric"
          maxLength={11}
        />
        <div className="invalid-feedback">{errores.cuit}</div>
      </div>

      <div className="mb-2">
        <input
          name="email"
          type="email"
          className={claseInput("email")}
          placeholder="Email de contacto *"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="invalid-feedback">{errores.email}</div>
      </div>

      <input
        name="telefono"
        className="form-control mb-2"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
      />
      <input
        name="calle"
        className="form-control mb-2"
        placeholder="Calle"
        value={formData.calle}
        onChange={handleChange}
      />
      <input
        name="ciudad"
        className="form-control mb-3"
        placeholder="Ciudad"
        value={formData.ciudad}
        onChange={handleChange}
      />

      {errorGeneral && <div className="alert alert-danger py-2">{errorGeneral}</div>}

      <button type="submit" className="btn btn-success w-100" disabled={guardando}>
        {guardando ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default ProveedorForm;
