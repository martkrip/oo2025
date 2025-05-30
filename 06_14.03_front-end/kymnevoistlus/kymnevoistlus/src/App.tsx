
import { Container, Navbar, NavbarBrand, Nav } from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AthletesPage from './pages/AthletesPage';
import EditAthlete from './pages/EditAthlete';
import MapPage from "./pages/MapPage"
import { useTranslation } from "react-i18next";
import i18n from './i18n';


function App() {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar bg="white" variant='light' expand="lg">
        <Container>
          <NavbarBrand href='/'>{t('nav.brand-name')}</NavbarBrand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/athletes">{t('nav.athletes')}</Nav.Link>
            <Nav.Link as={Link} to="/map">{t('nav.map')}</Nav.Link>
          </Nav>
          <Nav>
            <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => i18n.changeLanguage('en')}>EN</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => i18n.changeLanguage('et')}>ET</button>
          </Nav>
        </Container>
      </Navbar>

      <Container className='mt-4'>
        <Routes>
          <Route path='/athletes' element={<AthletesPage />} />
          <Route path="/" element={<h1>{t('home.welcome')}</h1>} />
          <Route path="/athletes/edit/:id" element={<EditAthlete />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </Container>
    </div>
  );
}


export default App
