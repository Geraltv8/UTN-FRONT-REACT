import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import proveedorService from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

function Proveedores() {
  // Estado de la lista
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  // Estado del formulario
  const [formData, setFormData] = useState({
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    calle: '',
    ciudad: '',
  });

  // Cargar proveedores al montar el componente
  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    setCargando(true);
    setError('');
    try {
      const data = await proveedorService.obtenerProveedores();
      setProveedores(data);
    } catch (err) {
      setError('Error al cargar los proveedores.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validación y envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');

    // Validar CUIT: exactamente 11 dígitos numéricos
    const cuitLimpio = formData.cuit.replace(/-/g, '');
    if (!/^\d{11}$/.test(cuitLimpio)) {
      setError('El CUIT debe tener exactamente 11 dígitos numéricos (sin guiones).');
      return;
    }

    // Validar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Ingresá un email válido.');
      return;
    }

    // Validar campos requeridos
    if (!formData.razonSocial.trim()) {
      setError('La razón social es requerida.');
      return;
    }

    const nuevoProveedor = {
      razonSocial: formData.razonSocial.trim(),
      cuit: cuitLimpio,
      contacto: {
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
      },
      direccion: {
        calle: formData.calle.trim(),
        ciudad: formData.ciudad.trim(),
      },
    };

    try {
      const creado = await proveedorService.crearProveedor(nuevoProveedor);
      // Actualización instantánea de la lista local
      setProveedores((prev) => [...prev, creado]);
      setMensajeExito('Proveedor creado exitosamente.');
      setFormData({
        razonSocial: '',
        cuit: '',
        email: '',
        telefono: '',
        calle: '',
        ciudad: '',
      });
    } catch (err) {
      const mensaje =
        err.response?.data?.mensaje ||
        err.response?.data?.message ||
        'Error al crear el proveedor.';
      setError(mensaje);
    }
  };

  // Manejo de calificación
  const handleCalificar = async (id, nuevaNota) => {
    try {
      await proveedorService.actualizarCalificacion(id, nuevaNota);
      // Actualizar el estado local sin recargar
      setProveedores((prev) =>
        prev.map((p) => (p._id === id ? { ...p, calificacion: nuevaNota } : p))
      );
    } catch (err) {
      console.error('Error al calificar:', err);
      setError('Error al actualizar la calificación.');
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Gestión de Proveedores</h2>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {mensajeExito && (
        <Alert variant="success" dismissible onClose={() => setMensajeExito('')}>
          {mensajeExito}
        </Alert>
      )}

      <Row>
        {/* Columna izquierda: Formulario de alta */}
        <Col md={5} className="mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Nuevo Proveedor</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="razonSocial">
                  <Form.Label>Razón Social *</Form.Label>
                  <Form.Control
                    type="text"
                    name="razonSocial"
                    value={formData.razonSocial}
                    onChange={handleChange}
                    placeholder="Ej: Distribuidora Norte S.A."
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cuit">
                  <Form.Label>CUIT (11 dígitos) *</Form.Label>
                  <Form.Control
                    type="text"
                    name="cuit"
                    value={formData.cuit}
                    onChange={handleChange}
                    placeholder="Ej: 30712345678"
                    required
                    maxLength={11}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contacto@empresa.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="telefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 011-4444-5555"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="calle">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control
                    type="text"
                    name="calle"
                    value={formData.calle}
                    onChange={handleChange}
                    placeholder="Ej: Av. Siempre Viva 742"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ciudad">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    placeholder="Ej: Buenos Aires"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Crear Proveedor
                </Button>
              </Form>
            </div>
          </div>
        </Col>

        {/* Columna derecha: Lista de proveedores */}
        <Col md={7}>
          <h5 className="mb-3">
            Proveedores registrados{' '}
            <span className="badge bg-primary">{proveedores.length}</span>
          </h5>

          {cargando && <p className="text-muted">Cargando proveedores...</p>}

          {!cargando && proveedores.length === 0 && (
            <Alert variant="info">No hay proveedores registrados aún.</Alert>
          )}

          {proveedores.map((proveedor) => (
            <ProveedorCard
              key={proveedor._id}
              proveedor={proveedor}
              onCalificar={handleCalificar}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Proveedores;

