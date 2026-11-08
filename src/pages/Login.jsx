import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/proveedores');
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <h3 className="mb-3 text-center">Iniciar sesión</h3>
                {error && <div className="alert alert-danger py-2">{error}</div>}
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;