import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import ProveedorCard from '../components/ProveedorCard';
import { actualizarCalificacion, crearProveedor, obtenerProveedores } from '../services/proveedorService';
import { getUserRole } from '../services/authService';

const formularioInicial = {
  razonSocial: '',
  cuit: '',
  contacto: { email: '', telefono: '' },
  direccion: { calle: '', ciudad: '', pais: 'Argentina' },
};

function mensajeError(error) {
  return error.response?.data?.detalle
    || error.response?.data?.mensaje
    || error.response?.data?.error
    || 'No se pudo completar la operación. Revisá la conexión con el backend.';
}

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [calificandoId, setCalificandoId] = useState('');
  const [formulario, setFormulario] = useState(formularioInicial);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState('');
  const esAdmin = getUserRole() === 'ADMIN';

  const cargarProveedores = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      setProveedores(await obtenerProveedores());
    } catch (requestError) {
      setError(mensajeError(requestError));
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let activa = true;
    obtenerProveedores()
      .then((data) => { if (activa) setProveedores(data); })
      .catch((requestError) => { if (activa) setError(mensajeError(requestError)); })
      .finally(() => { if (activa) setCargando(false); });
    return () => { activa = false; };
  }, []);

  function actualizarCampo(campo, valor) {
    setFormulario((actual) => ({ ...actual, [campo]: valor }));
  }

  function actualizarCampoAnidado(grupo, campo, valor) {
    setFormulario((actual) => ({ ...actual, [grupo]: { ...actual[grupo], [campo]: valor } }));
  }

  async function handleCrear(event) {
    event.preventDefault();
    setError('');
    setMensaje(null);
    setGuardando(true);
    try {
      await crearProveedor(formulario);
      setFormulario(formularioInicial);
      setMensaje('Proveedor registrado correctamente.');
      await cargarProveedores();
    } catch (requestError) {
      setError(mensajeError(requestError));
    } finally {
      setGuardando(false);
    }
  }

  async function handleCalificar(id, calificacion) {
    setError('');
    setMensaje(null);
    setCalificandoId(id);
    try {
      const actualizado = await actualizarCalificacion(id, calificacion);
      setProveedores((actuales) => actuales.map((proveedor) => (
        proveedor._id === id ? actualizado : proveedor
      )));
      setMensaje(`Calificación actualizada a ${calificacion} de 5.`);
    } catch (requestError) {
      setError(mensajeError(requestError));
    } finally {
      setCalificandoId('');
    }
  }

  return (
    <>
      <section className="page-heading mb-4 mb-lg-5">
        <div>
          <p className="eyebrow">Directorio de empresas</p>
          <h1>Proveedores</h1>
          <p className="text-secondary mb-0">Consultá los datos y valorá el desempeño de tus socios comerciales.</p>
        </div>
        <div className="provider-total"><strong>{proveedores.length}</strong><span>proveedores</span></div>
      </section>

      {mensaje && <Alert variant="success" dismissible onClose={() => setMensaje(null)}>{mensaje}</Alert>}
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

      {esAdmin && (
        <section className="form-section mb-5">
          <div className="section-heading mb-4">
            <div><p className="eyebrow">Nuevo registro</p><h2>Registrar proveedor</h2></div>
            <span className="admin-pill">Acceso administrador</span>
          </div>
          <Form onSubmit={handleCrear}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="razonSocial"><Form.Label>Razón social *</Form.Label>
                  <Form.Control maxLength={120} value={formulario.razonSocial} onChange={(e) => actualizarCampo('razonSocial', e.target.value)} required /></Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="cuit"><Form.Label>CUIT *</Form.Label>
                  <Form.Control inputMode="numeric" pattern="[0-9]{11}" minLength={11} maxLength={11} placeholder="11 dígitos, sin guiones" value={formulario.cuit} onChange={(e) => actualizarCampo('cuit', e.target.value.replace(/\D/g, '').slice(0, 11))} required />
                  <Form.Text className="text-secondary">Ingresá exactamente 11 números, sin guiones.</Form.Text></Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="emailProveedor"><Form.Label>Email de contacto *</Form.Label>
                  <Form.Control type="email" maxLength={254} value={formulario.contacto.email} onChange={(e) => actualizarCampoAnidado('contacto', 'email', e.target.value)} required /></Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="telefono"><Form.Label>Teléfono</Form.Label>
                  <Form.Control type="tel" value={formulario.contacto.telefono} onChange={(e) => actualizarCampoAnidado('contacto', 'telefono', e.target.value)} /></Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="calle"><Form.Label>Calle</Form.Label>
                  <Form.Control value={formulario.direccion.calle} onChange={(e) => actualizarCampoAnidado('direccion', 'calle', e.target.value)} /></Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="ciudad"><Form.Label>Ciudad</Form.Label>
                  <Form.Control value={formulario.direccion.ciudad} onChange={(e) => actualizarCampoAnidado('direccion', 'ciudad', e.target.value)} /></Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="pais"><Form.Label>País</Form.Label>
                  <Form.Control value={formulario.direccion.pais} onChange={(e) => actualizarCampoAnidado('direccion', 'pais', e.target.value)} /></Form.Group>
              </Col>
              <Col xs={12} className="d-flex justify-content-end pt-2">
                <Button type="submit" disabled={guardando}>
                  {guardando ? <><Spinner size="sm" className="me-2" />Guardando…</> : 'Registrar proveedor'}
                </Button>
              </Col>
            </Row>
          </Form>
        </section>
      )}

      <section aria-labelledby="listado-heading">
        <div className="section-heading mb-3">
          <div><p className="eyebrow">Tu red comercial</p><h2 id="listado-heading">Listado de proveedores</h2></div>
          <Button variant="outline-primary" size="sm" onClick={cargarProveedores} disabled={cargando}>
            {cargando ? 'Actualizando…' : 'Actualizar listado'}
          </Button>
        </div>

        {cargando ? (
          <div className="loading-state"><Spinner animation="border" role="status" /><span>Cargando proveedores desde el servidor…</span></div>
        ) : error && proveedores.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">!</div><h3>No pudimos conectar</h3><p>Verificá que el backend y MongoDB estén activos e intentá nuevamente.</p><Button variant="outline-primary" onClick={cargarProveedores}>Reintentar</Button></div>
        ) : proveedores.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">＋</div><h3>Aún no hay proveedores</h3><p>Cuando registres proveedores, aparecerán en este listado.</p></div>
        ) : (
          <Row className="g-3 g-lg-4">
            {proveedores.map((proveedor) => (
              <ProveedorCard key={proveedor._id} proveedor={proveedor} onCalificar={handleCalificar} actualizando={calificandoId === proveedor._id} />
            ))}
          </Row>
        )}
      </section>
    </>
  );
}
