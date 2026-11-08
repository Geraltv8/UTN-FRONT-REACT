import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/authService';

const Login = () => {
    const navegar = useNavigate();
    const ubicacion = useLocation();
    const destino = ubicacion.state?.desde || '/proveedores';

    const [credenciales, setCredenciales] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [enviando, setEnviando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setEnviando(true);
        try {
            await iniciarSesion(credenciales);
            navegar(destino, { replace: true });
        } catch (error) {
            setError(error.response?.data?.mensaje || 'No se pudo iniciar sesión');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '420px' }}>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <h1 className="h4 mb-3">Iniciar sesión</h1>

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={credenciales.email}
                    onChange={(e) => setCredenciales({ ...credenciales, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Contraseña"
                    value={credenciales.password}
                    onChange={(e) => setCredenciales({ ...credenciales, password: e.target.value })}
                    required
                />
                <button type="submit" className="btn btn-primary w-100" disabled={enviando}>
                    {enviando ? 'Ingresando…' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
};

export default Login;
