import { useState } from 'react';
import { crear } from '../services/proveedorService';
import { mensajeDeError } from '../utils/errores';
import CampoFormulario from './CampoFormulario';

const FORM_INICIAL = { razonSocial: '', cuit: '', email: '', telefono: '', ciudad: '' };

// Formulario de alta: lleva consigo su estado, su validación y el POST a la API.
// Al padre solo le avisa (onCreado) cuando el proveedor se guardó bien.
const ProveedorForm = ({ onCreado }) => {
    const [formData, setFormData] = useState(FORM_INICIAL);
    const [error, setError] = useState('');
    const [guardando, setGuardando] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validar = () => {
        if (!formData.razonSocial.trim()) return 'La razón social es obligatoria';
        if (!/^\d{11}$/.test(formData.cuit)) return 'El CUIT debe tener 11 números, sin guiones';
        if (!formData.email.trim()) return 'El email de contacto es obligatorio';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mensajeValidacion = validar();
        if (mensajeValidacion) {
            setError(mensajeValidacion);
            return;
        }

        setGuardando(true);
        setError('');
        try {
            // El modelo del backend usa objetos anidados (contacto, direccion)
            const nuevo = await crear({
                razonSocial: formData.razonSocial.trim(),
                cuit: formData.cuit,
                contacto: { email: formData.email, telefono: formData.telefono },
                direccion: { ciudad: formData.ciudad },
            });
            setFormData(FORM_INICIAL);
            onCreado(nuevo);
        } catch (err) {
            setError(mensajeDeError(err, 'Error al guardar el proveedor'));
        } finally {
            setGuardando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
            <h5>Nuevo Proveedor</h5>
            <CampoFormulario name="razonSocial" placeholder="Razón social" value={formData.razonSocial} onChange={handleChange} />
            <CampoFormulario name="cuit" placeholder="CUIT (11 números, sin guiones)" value={formData.cuit} onChange={handleChange} />
            <CampoFormulario name="email" type="email" placeholder="Email de contacto" value={formData.email} onChange={handleChange} />
            <CampoFormulario name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
            <CampoFormulario name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} />

            {error && <div className="alert alert-danger py-2 mt-1">{error}</div>}

            <button type="submit" className="btn btn-success w-100 mt-2" disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
};

export default ProveedorForm;
