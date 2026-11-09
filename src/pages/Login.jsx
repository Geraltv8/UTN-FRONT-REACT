import { useState } from 'react';
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getToken, login } from '../services/authService';

function mensajeError(error) {
  return error.response?.data?.mensaje
    || error.response?.data?.error
    || 'No se pudo iniciar sesión. Revisá tus credenciales y la conexión con el servidor.';
}

export default function Login() {
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (getToken()) return <Navigate to="/proveedores" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setCargando(true);
    try {
      await login(credenciales);
      navigate(location.state?.from?.pathname || '/proveedores', { replace: true });
    } catch (requestError) {
      setError(mensajeError(requestError));
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-intro">
        <div className="brand-mark">TP</div>
        <p className="eyebrow text-white-50 mt-4">Administración · UTN</p>
        <h1>Relaciones que impulsan tu negocio.</h1>
        <p className="login-copy">Gestioná tus proveedores y mantené toda la información importante en un solo lugar.</p>
        <div className="login-caption"><span className="status-dot" /> Plataforma de gestión de proveedores</div>
      </section>
      <section className="login-form-wrap">
        <Card className="login-card border-0 shadow-lg">
          <Card.Body className="p-4 p-md-5">
            <p className="eyebrow">Bienvenido</p>
            <h2 className="login-heading">Ingresar a tu cuenta</h2>
            <p className="text-secondary mb-4">Usá las credenciales de tu usuario registrado.</p>
            {error && <Alert variant="danger" role="alert">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="username"
                  placeholder="nombre@empresa.com"
                  value={credenciales.email}
                  onChange={(event) => setCredenciales({ ...credenciales, email: event.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="current-password"
                  placeholder="Tu contraseña"
                  value={credenciales.password}
                  onChange={(event) => setCredenciales({ ...credenciales, password: event.target.value })}
                  required
                />
              </Form.Group>
              <Button className="w-100 py-2" type="submit" disabled={cargando}>
                {cargando ? <><Spinner size="sm" className="me-2" />Ingresando…</> : 'Iniciar sesión'}
              </Button>
            </Form>
            <div className="login-footnote mt-4">
              <span>¿Necesitás un usuario?</span> Solicitalo al administrador del sistema.
            </div>
            <div className="text-center mt-3"><Link className="small text-decoration-none" to="/">Volver al inicio</Link></div>
          </Card.Body>
        </Card>
      </section>
    </main>
  );
}
