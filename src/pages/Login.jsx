import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import api from '../services/api.js';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  if (localStorage.getItem('token')) {
    return <Navigate to="/proveedores" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setCargando(true);
    const form = new FormData(event.currentTarget);

    try {
      const { data } = await api.post('/login/login', {
        email: form.get('email'),
        password: form.get('password'),
      });
      if (!data.token) throw new Error('El servidor no devolvió un token.');
      localStorage.setItem('token', data.token);
      navigate('/proveedores', { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.mensaje
        || requestError.response?.data?.error
        || requestError.message,
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: 480 }}>
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h1 className="h3 mb-3">Iniciar sesión</h1>
          <p className="text-secondary">Ingresá para gestionar proveedores.</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" autoComplete="username" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </Form.Group>
            <Button type="submit" disabled={cargando}>
              {cargando ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
