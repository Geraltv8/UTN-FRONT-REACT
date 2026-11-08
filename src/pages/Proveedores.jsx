import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { obtenerProveedores, crearProveedor, calificarProveedor } from '../services/proveedorService';
import { mensajeError } from '../services/api';
import ProveedorCard from '../components/ProveedorCard';

const FORM_VACIO = { razonSocial: '', cuit: '', email: '', telefono: '', calle: '', ciudad: '' };

const Proveedores = () => {
  const [lista, setLista] = useState([]);
  const [formData, setFormData] = useState(FORM_VACIO);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [calificandoId, setCalificandoId] = useState(null);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLista(await obtenerProveedores());
      } catch (err) {
        setError(mensajeError(err));
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    if (!/^\d{11}$/.test(formData.cuit)) {
      setError('El CUIT debe tener 11 números, sin guiones');
      return;
    }

    const nuevoProveedor = {
      razonSocial: formData.razonSocial,
      cuit: formData.cuit,
      contacto: { email: formData.email, telefono: formData.telefono },
      direccion: { calle: formData.calle, ciudad: formData.ciudad }
    };

    setGuardando(true);
    try {
      const creado = await crearProveedor(nuevoProveedor);
      setLista([...lista, creado]);
      setFormData(FORM_VACIO);
      setExito(`Proveedor ${creado.razonSocial} registrado`);
    } catch (err) {
      const mensaje = mensajeError(err);
      // E11000: índice unique de cuit en Mongo
      setError(mensaje.includes('E11000') ? 'Ya existe un proveedor con ese CUIT' : mensaje);
    } finally {
      setGuardando(false);
    }
  };

  const handleCalificar = async (id, calificacion) => {
    setError('');
    setCalificandoId(id);
    try {
      const actualizado = await calificarProveedor(id, calificacion);
      setLista(lista.map((p) => (p._id === id ? actualizado : p)));
    } catch (err) {
      setError(mensajeError(err));
    } finally {
      setCalificandoId(null);
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Proveedores</h1>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {exito && <Alert variant="success" dismissible onClose={() => setExito('')}>{exito}</Alert>}

      <Row>
        <Col md={4} className="mb-4">
          <Card className="p-3 shadow-sm">
            <h5>Nuevo proveedor</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Control className="mb-2" name="razonSocial" placeholder="Razón social"
                value={formData.razonSocial} onChange={handleChange} required />
              <Form.Control className="mb-2" name="cuit" placeholder="CUIT (11 números)" inputMode="numeric"
                maxLength={11} value={formData.cuit} onChange={handleChange} required />
              <Form.Control className="mb-2" type="email" name="email" placeholder="Email de contacto"
                value={formData.email} onChange={handleChange} required />
              <Form.Control className="mb-2" name="telefono" placeholder="Teléfono"
                value={formData.telefono} onChange={handleChange} />
              <Form.Control className="mb-2" name="calle" placeholder="Calle"
                value={formData.calle} onChange={handleChange} />
              <Form.Control className="mb-3" name="ciudad" placeholder="Ciudad"
                value={formData.ciudad} onChange={handleChange} />
              <Button type="submit" variant="success" className="w-100" disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar'}
              </Button>
            </Form>
          </Card>
        </Col>

        <Col md={8}>
          {cargando ? (
            <Spinner animation="border" />
          ) : (
            <Row>
              {lista.map((proveedor) => (
                <Col md={6} key={proveedor._id} className="mb-3">
                  <ProveedorCard
                    proveedor={proveedor}
                    onCalificar={handleCalificar}
                    calificando={calificandoId === proveedor._id}
                  />
                </Col>
              ))}
              {lista.length === 0 && <p className="text-muted">No hay proveedores registrados.</p>}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Proveedores;
