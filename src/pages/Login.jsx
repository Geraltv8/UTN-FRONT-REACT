import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            await login(credenciales.email, credenciales.password);
            // Redirige al panel protegido de proveedores tras autenticación exitosa
            navigate('/proveedores');
        } catch (err) {
            const mensajeServidor = err.response?.data?.mensaje || err.response?.data?.error;
            setError(mensajeServidor || 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
        } finally {
            setCargando(false);
        }
    };

    // Atajo para presentaciones rápidas
    const handleAutocompletarAdmin = () => {
        setCredenciales({
            email: 'admin@utn.com',
            password: 'admin'
        });
        setError('');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-12 col-md-8 col-lg-5">
                <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                    <div className="bg-primary text-white p-4 text-center">
                        <span className="badge bg-light text-primary mb-2 fw-bold px-3 py-2">
                            UTN - Programación IV
                        </span>
                        <h2 className="fw-bold mb-1">Panel de Gestión</h2>
                        <p className="mb-0 text-white-50 small">
                            Arquitectura por Capas en React & Autenticación JWT
                        </p>
                    </div>

                    <div className="card-body p-4 p-md-5">
                        {error && (
                            <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                                <span className="me-2">⚠️</span>
                                <div className="small">{error}</div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="form-control form-control-lg"
                                    placeholder="ejemplo@utn.com"
                                    value={credenciales.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="form-control form-control-lg"
                                    placeholder="••••••••"
                                    value={credenciales.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={cargando}
                                className="btn btn-primary btn-lg w-100 fw-bold mb-3 shadow-sm"
                            >
                                {cargando ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Ingresando...
                                    </>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </button>
                        </form>

                        <div className="d-grid mt-3">
                            <button
                                type="button"
                                onClick={handleAutocompletarAdmin}
                                className="btn btn-outline-secondary btn-sm"
                            >
                                ⚡ Autocompletar Admin de Prueba (admin@utn.com)
                            </button>
                        </div>

                        <div className="mt-4 pt-3 border-top text-center text-muted small">
                            <span>Backend conectado: <code>http://localhost:3000/api</code></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
