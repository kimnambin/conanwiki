import {Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {SiNamuwiki} from 'react-icons/si';
import style from './App.module.css';
import {Link} from 'react-router-dom';

export default function App_navbar() {
  const navItems = [
    {title: '캐릭터 소개', link: '/conanwiki/characters'},
    {title: '극장판 소개', link: '/conanwiki/movies'},
    {title: '에피소드 소개', link: '/conanwiki/episodes'},
  ];
  return (
    <>
      <Navbar expand="lg" className={style.Navbar}>
        <Container>
          <Navbar.Brand
            as={Link}
            to="/conanwiki/"
            className={style.NavbarTitle}>
            <SiNamuwiki />
          </Navbar.Brand>
          <Nav.Link as={Link} to="/conanwiki/" className={style.Navbarintro}>
            명탐정 코난을 소개하는 위키
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {navItems.map((item, index) => (
                <Nav.Link
                  as={Link}
                  to={item.link}
                  className="navtext"
                  key={index}>
                  {item.title}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
