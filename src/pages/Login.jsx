import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/authService.js';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [ingresando, setIngresando] = useState(false);

  if (localStorage.getItem('token')) {
    return <Navigate to="/proveedores" replace />;
  }

  const actualizarCampo = (evento) => {
    setCredenciales((actuales) => ({
      ...actuales,
      [evento.target.name]: evento.target.value,
    }));
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setError('');
    setIngresando(true);

    try {
      const respuesta = await iniciarSesion(credenciales);
      if (!respuesta.token) {
        throw new Error('El servidor no devolvió un token de acceso.');
      }

      localStorage.setItem('token', respuesta.token);
      navigate(location.state?.from?.pathname || '/proveedores', { replace: true });
    } catch (errorSolicitud) {
      setError(
        errorSolicitud.response?.data?.mensaje
        || errorSolicitud.response?.data?.error
        || errorSolicitud.message
        || 'No se pudo iniciar sesión. Verificá tus credenciales.',
      );
    } finally {
      setIngresando(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="d-flex align-items-center gap-3 mb-4">
          <span className="brand-mark">P</span>
          <div>
            <p className="eyebrow mb-1">Panel de administración</p>
            <h1 className="h4 mb-0">Gestión de proveedores</h1>
          </div>
        </div>

        <p className="text-secondary mb-4">Ingresá con tu cuenta para continuar.</p>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="field-label d-block mb-1" htmlFor="email">Email</label>
          <input
            className="form-control mb-3"
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            value={credenciales.email}
            onChange={actualizarCampo}
            required
          />

          <label className="field-label d-block mb-1" htmlFor="password">Contraseña</label>
          <input
            className="form-control mb-4"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={credenciales.password}
            onChange={actualizarCampo}
            required
          />

          <button className="btn btn-primary w-100 py-2" type="submit" disabled={ingresando}>
            {ingresando ? 'Ingresando…' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="small text-secondary text-center mt-4 mb-0">
          La cuenta debe estar registrada en el backend.
        </p>
      </section>
    </main>
  );
}

export default Login;
