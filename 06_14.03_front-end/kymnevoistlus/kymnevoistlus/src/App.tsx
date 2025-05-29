
import { Container, Navbar, NavbarBrand, Nav } from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AthletesPage from './pages/AthletesPage';
import ResultsPage from "./pages/ResultsPage";
import EditAthlete from './pages/EditAthlete';


function App() {
  return (
    <div>
      <Navbar bg="white" variant='light' expand="lg">
        <Container>
          <NavbarBrand href='/'>Decathlon App</NavbarBrand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/athletes">Athletes</Nav.Link>
            <Nav.Link as={Link} to="/results">Results</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className='mt-4'>
        <Routes>
          <Route path='/athletes' element={<AthletesPage />} />
          <Route path='/results' element={<ResultsPage />} />
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/athletes/edit/:id" element={<EditAthlete />} />
        </Routes>
      </Container>
    </div>
  );
}


export default App
