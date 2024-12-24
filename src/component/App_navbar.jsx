import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import {SiNamuwiki} from 'react-icons/si';

import style from './App.module.css';
import {useState} from 'react';

export default function App_navbar() {
  const [selectOption, setSelectOption] = useState('옵션');
  const [search, setSearch] = useState('');

  const handleSelect = e => {
    setSelectOption(e);
  };

  const handleSearch = () => {
    console.log(`${selectOption}으로 ${search}이걸 검색했구나 `);
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
          {' '}
          <Col>
            <h1 className="display-4">ConanWiKi</h1>
            <p className="lead">궁금한 걸 검색해 보세요!!</p>

            <InputGroup className="mb-3">
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className={style.Navbar}>
                  {selectOption}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="캐릭터">캐릭터</Dropdown.Item>
                  <Dropdown.Item eventKey="극장판">극장판</Dropdown.Item>
                  <Dropdown.Item eventKey="에피소드">에피소드</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Form.Control
                type="text"
                placeholder="옵션을 선택 후 검색하면 됩니다"
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
          </Col>
        </Row>
      </Container>
    </>
  );
}
