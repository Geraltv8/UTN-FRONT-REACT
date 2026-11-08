import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from 'react-bootstrap';
import ProveedorCard from '../components/ProveedorCard.jsx';
import {
  actualizarProveedor,
  calificarProveedor,
  crearProveedor,
  eliminarProveedor,
  obtenerProveedores,
} from '../services/proveedorService.js';

const formularioInicial = {
  razonSocial: '',
  cuit: '',
  email: '',
  telefono: '',
  calle: '',
  ciudad: '',
  pais: 'Argentina',
};

const mensajeDeError = (error) => (
  error.response?.data?.detalle
  || error.response?.data?.mensaje
  || error.message
);

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarErrorCarga = useCallback((requestError) => {
    if (requestError.name === 'CanceledError') return;
    if (requestError.response?.status === 401) {
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    } else {
      setError(mensajeDeError(requestError));
    }
  }, [navigate]);

  const cargarProveedores = useCallback((signal) => (
    obtenerProveedores({ signal })
      .then(setProveedores)
      .catch(manejarErrorCarga)
      .finally(() => {
        if (!signal?.aborted) setCargando(false);
      })
  ), [manejarErrorCarga]);

  useEffect(() => {
    const controller = new AbortController();
    cargarProveedores(controller.signal);
    return () => controller.abort();
  }, [cargarProveedores]);

  const recargarProveedores = async () => {
    setCargando(true);
    setError('');
    try {
      await cargarProveedores();
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      } else {
        setError(mensajeDeError(requestError));
      }
      setCargando(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const proveedor = {
      razonSocial: formulario.razonSocial.trim(),
      cuit: formulario.cuit.trim(),
      contacto: {
        email: formulario.email.trim(),
        telefono: formulario.telefono.trim(),
      },
      direccion: {
        calle: formulario.calle.trim(),
        ciudad: formulario.ciudad.trim(),
        pais: formulario.pais.trim() || 'Argentina',
      },
    };

    setGuardando(true);
    setError('');
    try {
      if (editandoId) {
        const actualizado = await actualizarProveedor(editandoId, proveedor);
        setProveedores((actuales) => actuales.map((item) => (
          item._id === editandoId ? actualizado : item
        )));
      } else {
        const creado = await crearProveedor(proveedor);
        setProveedores((actuales) => [...actuales, creado]);
      }
      setFormulario(formularioInicial);
      setEditandoId(null);
    } catch (requestError) {
      setError(mensajeDeError(requestError));
    } finally {
      setGuardando(false);
    }
  };

  const editarProveedor = (proveedor) => {
    setFormulario({
      razonSocial: proveedor.razonSocial || '',
      cuit: proveedor.cuit || '',
      email: proveedor.contacto?.email || '',
      telefono: proveedor.contacto?.telefono || '',
      calle: proveedor.direccion?.calle || '',
      ciudad: proveedor.direccion?.ciudad || '',
      pais: proveedor.direccion?.pais || 'Argentina',
    });
    setEditandoId(proveedor._id);
    setError('');
  };

  const cancelarEdicion = () => {
    setFormulario(formularioInicial);
    setEditandoId(null);
  };

  const borrarProveedor = async (id) => {
    if (!window.confirm('¿Querés eliminar este proveedor?')) return;
    setError('');
    try {
      const eliminado = await eliminarProveedor(id);
      setProveedores((actuales) => actuales.map((item) => (
        item._id === id ? eliminado : item
      )));
      if (editandoId === id) cancelarEdicion();
    } catch (requestError) {
      setError(mensajeDeError(requestError));
    }
  };

  const handleCalificar = async (id, calificacion) => {
    setError('');
    try {
      const actualizado = await calificarProveedor(id, calificacion);
      setProveedores((actuales) => actuales.map((item) => (
        item._id === id ? actualizado : item
      )));
    } catch (requestError) {
      setError(mensajeDeError(requestError));
    }
  };

  const actualizarCampo = (event) => {
    setFormulario((actual) => ({ ...actual, [event.target.name]: event.target.value }));
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <Container className="py-4">
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <div>
          <h1 className="h2 mb-1">Proveedores</h1>
          <p className="text-secondary mb-0">Administración de proveedores</p>
        </div>
        <Button type="button" variant="outline-secondary" onClick={cerrarSesion}>
          Cerrar sesión
        </Button>
      </Stack>

      {error && <Alert variant="danger" role="alert">{error}</Alert>}

      <Row className="g-4">
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="h5 mb-3">{editandoId ? 'Editar proveedor' : 'Registrar proveedor'}</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="razonSocial">
                  <Form.Label>Razón social</Form.Label>
                  <Form.Control
                    name="razonSocial"
                    value={formulario.razonSocial}
                    onChange={actualizarCampo}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cuit">
                  <Form.Label>CUIT (11 dígitos)</Form.Label>
                  <Form.Control
                    name="cuit"
                    value={formulario.cuit}
                    onChange={actualizarCampo}
                    pattern="\d{11}"
                    maxLength={11}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email de contacto</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={formulario.email}
                    onChange={actualizarCampo}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="telefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    name="telefono"
                    value={formulario.telefono}
                    onChange={actualizarCampo}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="calle">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control
                    name="calle"
                    value={formulario.calle}
                    onChange={actualizarCampo}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="ciudad">
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Control
                        name="ciudad"
                        value={formulario.ciudad}
                        onChange={actualizarCampo}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="pais">
                      <Form.Label>País</Form.Label>
                      <Form.Control
                        name="pais"
                        value={formulario.pais}
                        onChange={actualizarCampo}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Stack direction="horizontal" gap={2}>
                  <Button type="submit" disabled={guardando}>
                    {guardando ? 'Guardando...' : editandoId ? 'Guardar cambios' : 'Registrar'}
                  </Button>
                  {editandoId && (
                    <Button type="button" variant="outline-secondary" onClick={cancelarEdicion}>
                      Cancelar
                    </Button>
                  )}
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Stack direction="horizontal" className="justify-content-between mb-3">
            <h2 className="h5 mb-0">Listado de proveedores</h2>
            <Button
              type="button"
              variant="outline-primary"
              onClick={recargarProveedores}
              disabled={cargando}
            >
              Actualizar
            </Button>
          </Stack>

          {cargando ? (
            <p>Cargando proveedores...</p>
          ) : proveedores.length ? (
            <Row className="g-3">
              {proveedores.map((proveedor) => (
                <Col md={6} key={proveedor._id}>
                  <ProveedorCard
                    proveedor={proveedor}
                    onCalificar={handleCalificar}
                    onEditar={editarProveedor}
                    onEliminar={borrarProveedor}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Card body className="text-secondary">No hay proveedores registrados.</Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
