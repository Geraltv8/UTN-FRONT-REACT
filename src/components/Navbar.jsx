import { Navbar as BsNavbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout, obtenerRol } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();

  const salir = () => {
    logout();
    navigate('/login');
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        <BsNavbar.Brand as={NavLink} to="/">Panel UTN</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="nav-principal" />
        <BsNavbar.Collapse id="nav-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Catálogo</Nav.Link>
            <Nav.Link as={NavLink} to="/proveedores">Proveedores</Nav.Link>
          </Nav>
          <span className="text-light small me-3">{obtenerRol()}</span>
          <Button variant="outline-light" size="sm" onClick={salir}>Salir</Button>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
