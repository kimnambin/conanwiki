import {Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {SiNamuwiki} from 'react-icons/si';
import style from './App.module.css';
import {Link} from 'react-router-dom';

export default function App_navbar() {
  return (
    <>
      <Navbar expand="lg" className={style.Navbar}>
        <Container>
          <Navbar.Brand href="/" className={style.NavbarTitle}>
            <SiNamuwiki />
          </Navbar.Brand>
          <Nav.Link href="/" className={style.Navbarintro}>
            명탐정 코난을 소개하는 위키
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="navtext" href="/conanwiki/character">
                캐릭터 소개
              </Nav.Link>
              <Nav.Link className="navtext" href="/conanwiki/movie">
                극장판 소개
              </Nav.Link>
              <Nav.Link className="navtext" href="/conanwiki/episodes">
                에피소드 소개
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
