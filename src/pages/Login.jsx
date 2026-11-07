import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/authService';

const obtenerMensajeError = (error) => {
    if (!error.response) {
        return 'No se pudo conectar con el servidor.';
    }
    return error.response.data?.mensaje || 'No se pudo iniciar sesión.';
};

const Login = () => {
    const navigate = useNavigate();
    const [credenciales, setCredenciales] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await iniciarSesion(credenciales.email, credenciales.password);
            navigate('/proveedores');
        } catch (err) {
            setError(obtenerMensajeError(err));
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                        <h2 className="mb-3">Iniciar sesión</h2>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <input
                            type="email"
                            name="email"
                            className="form-control mb-2"
                            placeholder="Email"
                            value={credenciales.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            className="form-control mb-3"
                            placeholder="Contraseña"
                            value={credenciales.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn btn-primary w-100">
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;