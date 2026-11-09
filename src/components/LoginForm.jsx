import { useState } from 'react';
import { login } from '../services/authService';
import CampoFormulario from './CampoFormulario';

// Formulario de login con su propia lógica. Avisa al padre con onExito.
const LoginForm = ({ onExito }) => {
    const [credenciales, setCredenciales] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credenciales);
            onExito();
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error de conexión con el servidor');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
            <CampoFormulario name="email" type="email" placeholder="Email" value={credenciales.email} onChange={handleChange} required />
            <CampoFormulario name="password" type="password" placeholder="Contraseña" value={credenciales.password} onChange={handleChange} required />
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
    );
};

export default LoginForm;
