import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    // Un solo estado para los dos campos del formulario.
    const [credenciales, setCredenciales] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    // useNavigate nos da una funcion para cambiar de ruta por codigo.
    const navegar = useNavigate();

    const handleSubmit = async (e) => {
        // Sin esto el navegador recarga la pagina y se pierde todo.
        e.preventDefault();
        setError(null);

        try {
            const datos = await login(credenciales);

            // Guardamos el token: el interceptor de api.js lo va a leer de aca.
            localStorage.setItem('token', datos.token);

            navegar('/proveedores');
        } catch (err) {
            setError(err.response?.data?.mensaje || 'No se pudo iniciar sesion');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '420px' }}>
            <h1 className="mb-4">Iniciar sesión</h1>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={credenciales.email}
                    onChange={(e) =>
                        setCredenciales({ ...credenciales, email: e.target.value })
                    }
                    required
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Contraseña"
                    value={credenciales.password}
                    onChange={(e) =>
                        setCredenciales({ ...credenciales, password: e.target.value })
                    }
                    required
                />

                <button type="submit" className="btn btn-primary w-100">
                    Entrar
                </button>

                {error && <p className="text-danger mt-3 mb-0">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
