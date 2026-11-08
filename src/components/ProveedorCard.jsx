import { useState } from 'react';
import { Button, Card, Form, Stack } from 'react-bootstrap';

export default function ProveedorCard({ proveedor, onCalificar, onEditar, onEliminar }) {
  const [calificacion, setCalificacion] = useState(String(proveedor.calificacion || 3));

  const handleCalificar = (event) => {
    event.preventDefault();
    onCalificar(proveedor._id, Number(calificacion));
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{proveedor.razonSocial}</Card.Title>
        <Card.Text className="mb-1">CUIT: {proveedor.cuit}</Card.Text>
        <Card.Text className="mb-1">
          Contacto: {proveedor.contacto?.email || 'No informado'}
        </Card.Text>
        <Card.Text className="mb-1">
          Teléfono: {proveedor.contacto?.telefono || 'No informado'}
        </Card.Text>
        <Card.Text className="mb-1">
          Ubicación: {[proveedor.direccion?.ciudad, proveedor.direccion?.pais]
            .filter(Boolean).join(', ') || 'No informada'}
        </Card.Text>
        <Card.Text>
          Estado: {proveedor.estadoActivo ? 'Activo' : 'Inactivo'}
          {' · '}Calificación: {proveedor.calificacion || '—'}/5
        </Card.Text>

        <Form onSubmit={handleCalificar} className="mb-3">
          <Stack direction="horizontal" gap={2}>
            <Form.Select
              aria-label={`Calificación para ${proveedor.razonSocial}`}
              value={calificacion}
              onChange={(event) => setCalificacion(event.target.value)}
            >
              {[1, 2, 3, 4, 5].map((valor) => (
                <option key={valor} value={valor}>{valor} / 5</option>
              ))}
            </Form.Select>
            <Button type="submit" variant="outline-primary">Calificar</Button>
          </Stack>
        </Form>

        <Stack direction="horizontal" gap={2}>
          <Button
            type="button"
            variant="outline-secondary"
            onClick={() => onEditar(proveedor)}
            disabled={!proveedor.estadoActivo}
          >
            Editar
          </Button>
          <Button
            type="button"
            variant="outline-danger"
            onClick={() => onEliminar(proveedor._id)}
            disabled={!proveedor.estadoActivo}
          >
            Eliminar
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
