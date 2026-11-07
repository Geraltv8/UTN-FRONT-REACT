import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/authService.js';
import { mensajeError } from '../services/api.js';

export default function Login({ onLogin, autenticado }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (autenticado) return <Navigate to="/proveedores" replace />;

  async function enviar(event) {
    event.preventDefault();
    setError('');
    setEnviando(true);
    try {
      const token = await iniciarSesion(email.trim(), password);
      onLogin(token);
      navigate(location.state?.from?.pathname || '/proveedores', { replace: true });
    } catch (err) {
      setError(err.response ? mensajeError(err) : err.message || mensajeError(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-panel">
        <div className="login-illustration">
          <span className="eyebrow">UTN · Programación IV</span>
          <div className="login-mark">P</div>
          <h1>Una forma más clara de gestionar proveedores.</h1>
          <p>Panel desarrollado con arquitectura por capas, React Router y servicios Axios.</p>
          <div className="login-stripes" aria-hidden="true"><span /><span /><span /></div>
        </div>
        <div className="login-form-column">
          <span className="eyebrow">ACCESO AL SISTEMA</span>
          <h2>Iniciar sesión</h2>
          <p>Ingresá con las credenciales registradas en el backend de la materia.</p>
          <form onSubmit={enviar}>
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" autoComplete="username" required value={email}
              onChange={(event) => setEmail(event.target.value)} placeholder="tu@email.com" />
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" autoComplete="current-password" required value={password}
              onChange={(event) => setPassword(event.target.value)} placeholder="Tu contraseña" />
            {error && <p className="alert-message" role="alert">{error}</p>}
            <button className="primary-button w-100" type="submit" disabled={enviando}>
              {enviando ? 'Validando...' : 'Ingresar al panel'}
            </button>
          </form>
          <p className="login-note">Para registrar proveedores, el usuario debe tener rol ADMIN.</p>
        </div>
      </section>
    </main>
  );
}
