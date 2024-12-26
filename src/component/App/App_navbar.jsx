import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import {SiNamuwiki} from 'react-icons/si';
import style from './App.module.css';
import {useState} from 'react';
import {setSearchTextText} from '../../redux/slices/characterSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function App_navbar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  // const {searchList} = useSelector(state => state.characterKey);

  const handleSearch = () => {
    // dispatch(setSearchTextText(search));
    console.log(`${search} 건색함 `);
  };

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
              <Nav.Link href="/character">캐릭터 소개</Nav.Link>
              <Nav.Link href="/movie">극장판 소개</Nav.Link>
              <Nav.Link href="/episodes">에피소드 소개</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* ========================================================================== */}
      <Container>
        <Row className=" p-5 rounded text-center">
          <Col>
            <h1 className="display-4">ConanWiKi</h1>
            <p className="lead">명탐정 코난을 소개하는 위키</p>

            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="궁금한 걸 검색해보세요"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />

              <Button
                variant="primary"
                onClick={handleSearch}
                className={style.Navbar}>
                검색
              </Button>
            </InputGroup>

            {/* {searchList.map(character => (
              <div key={character.id}>
                <h5>{character.name.korean.name}</h5>
              </div>
            ))} */}
          </Col>
        </Row>
      </Container>
    </>
  );
}
