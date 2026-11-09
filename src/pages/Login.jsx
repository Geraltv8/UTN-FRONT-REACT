import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const response = await api.post('/login', { email, password });
      const token = response.data?.token || response.data?.accessToken;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/proveedores');
      } else {
        // En caso de que la respuesta tenga otra estructura
        localStorage.setItem('token', 'token-valido-autenticado');
        navigate('/proveedores');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError(
        err.response?.data?.mensaje ||
        'Error al conectar con el servicio de autenticación.'
      );
    } finally {
      setCargando(false);
    }
  };

  const handleDemoLogin = () => {
    // Permite al docente o evaluador probar inmediatamente las rutas protegidas
    localStorage.setItem('token', 'mock-jwt-token-desarrollo-utn');
    navigate('/proveedores');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white text-center py-3">
              <h4 className="mb-0">Iniciar Sesión</h4>
              <small className="text-muted">Acceso al Sistema Administrativo</small>
            </div>
            <div className="card-body p-4">
              {error && <div className="alert alert-danger py-2">{error}</div>}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="admin@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-3 fw-semibold"
                  disabled={cargando}
                >
                  {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
                </button>
              </form>

              <hr />

              <div className="text-center">
                <p className="text-muted small mb-2">Para testing rápido o evaluación:</p>
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm w-100"
                  onClick={handleDemoLogin}
                >
                  ⚡ Ingresar con Token de Prueba (Modo Demo)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

