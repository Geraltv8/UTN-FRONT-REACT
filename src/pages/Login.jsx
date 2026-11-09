import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Intenta autenticarse contra el backend
      const res = await api.post('/login/login', { email, password });
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/proveedores');
        return;
      }
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  // Permite ingresar directamente para probar el frontend
  const handleDemoLogin = () => {
    localStorage.setItem('token', 'token-jwt-simulado-para-pruebas');
    navigate('/proveedores');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '420px', width: '100%', borderRadius: '12px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Iniciar Sesión</h2>
          <p className="text-muted">Panel de Administración - UTN</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="ejemplo@utn.edu.ar"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <hr className="my-4" />

        <div className="text-center">
          <p className="small text-muted mb-2">¿Quieres probar la interfaz sin backend activo?</p>
          <button
            type="button"
            className="btn btn-outline-success btn-sm w-100 fw-semibold"
            onClick={handleDemoLogin}
          >
            Acceder en Modo Demo / Pruebas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
