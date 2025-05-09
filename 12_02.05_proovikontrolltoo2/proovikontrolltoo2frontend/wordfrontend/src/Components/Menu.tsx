import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; // !import

function Menu() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
        <Navbar.Brand as={Link} to="/">Word</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

          </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
    );
}

export default Menu;