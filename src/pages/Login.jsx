import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';
import { iniciarSesion } from '../services/authService.js';
import { getApiErrorMessage } from '../services/api.js';

function Login() {
  const { token, iniciarSesion: guardarSesion } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (token) {
    return <Navigate to="/proveedores" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setEnviando(true);

    try {
      const accessToken = await iniciarSesion({ email, password });
      guardarSesion(accessToken);
      navigate(location.state?.from?.pathname || '/proveedores', { replace: true });
    } catch (loginError) {
      setError(getApiErrorMessage(loginError));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand-mark" aria-hidden="true">P</div>
        <p className="eyebrow">Panel de administración</p>
        <h1 id="login-title">Bienvenido</h1>
        <p className="muted-copy">Ingresá para gestionar tus proveedores.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nombre@empresa.com"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Tu contraseña"
            required
          />

          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <button className="btn btn-primary w-100 login-submit" type="submit" disabled={enviando}>
            {enviando ? 'Ingresando…' : 'Iniciar sesión'}
          </button>
        </form>
        <p className="login-footnote">Acceso protegido · Proveedores</p>
      </section>
    </main>
  );
}

export default Login;
