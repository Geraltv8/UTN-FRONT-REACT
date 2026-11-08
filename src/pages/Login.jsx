import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { login, estaAutenticado } from '../services/authService';
import { mensajeError } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  if (estaAutenticado()) return <Navigate to="/proveedores" replace />;

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      await login(credenciales.email, credenciales.password);
      navigate('/proveedores');
    } catch (err) {
      setError(mensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="shadow-sm p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h4 className="mb-3">Iniciar sesión</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={credenciales.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={credenciales.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
