import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import authService from '../services/authService';

function Navbar() {
  const navigate = useNavigate();
  const autenticado = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          UTN Proveedores
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="navbar-nav" />
        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Catálogo
            </Nav.Link>
            <Nav.Link as={Link} to="/proveedores">
              Proveedores
            </Nav.Link>
          </Nav>
          <Nav>
            {autenticado ? (
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-light">
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;

